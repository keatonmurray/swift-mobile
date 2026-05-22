<?php

namespace App\Http\Controllers\Accounts\Business;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\EmployeePaymentAccount;

class EmployeePaymentAccountController extends Controller
{
    /**
     * List all employee payment accounts for the authenticated user.
     */
    public function index()
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $accounts = EmployeePaymentAccount::where(
            'user_id', $user->id
        )->get();

        return response()->json([
            'success' => true,
            'data'    => $accounts,
        ]);
    }

    /**
     * Create or update an employee payment account with optional salary data.
     */
    public function store(Request $request)
    {
        $user = auth('sanctum')->user();

        /* ------------------------------------------------------------ */
        /* Validate User                                                */
        /* ------------------------------------------------------------ */

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        /* ------------------------------------------------------------ */
        /* Validate Request                                             */
        /* ------------------------------------------------------------ */

        $validated = $request->validate([
            'employee_qb_id' => 'required|string',

            'employee_name' => 'required|string',

            // Compensation fields
            'salary'          => 'nullable|numeric|min:0',
            'hourly_rate'     => 'nullable|numeric|min:0',
            'hours_per_period' => 'nullable|numeric|min:0|max:744',
            'job_title'       => 'nullable|string|max:255',
            'pay_frequency'   => 'nullable|in:weekly,biweekly,semimonthly,monthly',

            'rapyd_wallet_id' => 'nullable|string',

            'rapyd_contact_id' => 'nullable|string',

            'payout_method' => 'nullable|string',

            'currency' => 'nullable|string',
        ]);

        /* ------------------------------------------------------------ */
        /* Create / Update Mapping                                      */
        /* ------------------------------------------------------------ */

        $mapping =
            EmployeePaymentAccount::updateOrCreate(
                [
                    'user_id' => $user->id,

                    'employee_qb_id' =>
                        $validated[
                            'employee_qb_id'
                        ],
                ],

                [
                    'employee_name' =>
                        $validated[
                            'employee_name'
                        ],

                    // Compensation
                    'salary' =>
                        $validated['salary'] ?? null,

                    'hourly_rate' =>
                        $validated['hourly_rate'] ?? null,

                    'hours_per_period' =>
                        $validated['hours_per_period'] ?? 160.00,

                    'job_title' =>
                        $validated['job_title'] ?? null,

                    'pay_frequency' =>
                        $validated['pay_frequency'] ?? 'monthly',

                    'rapyd_wallet_id' =>
                        $validated[
                            'rapyd_wallet_id'
                        ] ?? null,

                    'rapyd_contact_id' =>
                        $validated[
                            'rapyd_contact_id'
                        ] ?? null,

                    'payout_method' =>
                        $validated[
                            'payout_method'
                        ] ?? 'wallet',

                    'currency' =>
                        $validated[
                            'currency'
                        ] ?? 'USD',

                    'status' => 'active',
                ]
            );

        /* ------------------------------------------------------------ */
        /* Success Response                                             */
        /* ------------------------------------------------------------ */

        return response()->json([
            'success' => true,

            'message' =>
                'Employee payout account saved successfully.',

            'data' => $mapping,
        ]);
    }

    /**
     * Get a single employee payment account by QB ID.
     */
    public function show($qbId)
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $account = EmployeePaymentAccount::where('user_id', $user->id)
            ->where('employee_qb_id', $qbId)
            ->first();

        if (!$account) {
            return response()->json([
                'success' => false,
                'message' => 'Employee not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $account,
        ]);
    }
}