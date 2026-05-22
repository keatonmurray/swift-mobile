<?php

namespace App\Http\Controllers\Accounts\Business;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\PayrollBatch;
use App\Models\PayrollItem;
use App\Models\EmployeePaymentAccount;

class PayrollController extends Controller
{
    public function approve(Request $request)
    {
        $user = auth('sanctum')->user();

        /* ------------------------------------------------------------ */
        /* Validate user                                                */
        /* ------------------------------------------------------------ */

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        /* ------------------------------------------------------------ */
        /* Validate employees                                           */
        /* ------------------------------------------------------------ */

        $employees = $request->employees;

        if (
            !$employees ||
            !is_array($employees) ||
            count($employees) === 0
        ) {
            return response()->json([
                'success' => false,
                'message' => 'No employees selected.',
            ], 422);
        }

        /* ------------------------------------------------------------ */
        /* Calculate total payroll                                      */
        /* ------------------------------------------------------------ */

        $totalAmount = collect($employees)->sum(
            function ($employee) {

                return (float) (
                    $employee['amount'] ?? 0
                );
            }
        );

        /* ------------------------------------------------------------ */
        /* Create payroll batch                                         */
        /* ------------------------------------------------------------ */

        $batch = PayrollBatch::create([
            'user_id' => $user->id,

            'total_amount' => $totalAmount,

            'currency' => 'USD',

            'status' => 'pending',

            'employees_count' => count($employees),
        ]);

        /* ------------------------------------------------------------ */
        /* Create payroll items                                         */
        /* ------------------------------------------------------------ */

        foreach ($employees as $employee) {

            PayrollItem::create([
                'payroll_batch_id' => $batch->id,

                'employee_qb_id' =>
                    $employee['id'] ?? null,

                'employee_name' =>
                    $employee['name']
                    ?? 'Unknown Employee',

                'amount' =>
                    $employee['amount']
                    ?? 0,

                'currency' =>
                    $employee['currency']
                    ?? 'USD',

                'status' => 'pending',

                'meta' => $employee,
            ]);
        }

        /* ------------------------------------------------------------ */
        /* Success response                                             */
        /* ------------------------------------------------------------ */

        return response()->json([
            'success' => true,

            'message' =>
                'Payroll batch created successfully.',

            'data' => [
                'batch_id' =>
                    $batch->id,

                'total_amount' =>
                    $batch->total_amount,

                'currency' =>
                    $batch->currency,

                'employees_count' =>
                    $batch->employees_count,

                'status' =>
                    $batch->status,

                'created_at' =>
                    $batch->created_at,
            ],
        ]);
    }

    public function send(PayrollBatch $batch)
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        if ($batch->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized payroll batch.',
            ], 403);
        }

        $businessWallet =
            \App\Models\Accounts\Personal\Wallet::where(
                'user_id',
                $user->id
            )->first();

        if (!$businessWallet) {
            return response()->json([
                'success' => false,
                'message' => 'Business wallet not found.',
            ], 404);
        }

        $batch->update([
            'status' => 'processing',
        ]);

        $items = PayrollItem::where(
            'payroll_batch_id',
            $batch->id
        )->get();

        foreach ($items as $item) {

            $mapping =
                EmployeePaymentAccount::where(
                    'user_id',
                    $user->id
                )
                ->where(
                    'employee_qb_id',
                    $item->employee_qb_id
                )
                ->first();

            if (
                !$mapping ||
                !$mapping->rapyd_wallet_id
            ) {

                $item->update([
                    'status' => 'failed',

                    'meta' => [
                        ...($item->meta ?? []),

                        'failure_reason' =>
                            'No linked wallet found.',
                    ],
                ]);

                continue;
            }

            try {

                $payload = [

                    'amount' =>
                        (float) $item->amount,

                    'currency' =>
                        strtoupper(
                            $item->currency
                        ),

                    'destination_ewallet' =>
                        $mapping->rapyd_wallet_id,

                    'source_ewallet' =>
                        $businessWallet
                        ->rapyd_ewallet_token,

                    'expiration' => null,
                ];

                $callRapyd =
                    app(
                        \App\Services\RapydService::class
                    )->transferFundsBetweenWallets(
                        $payload
                    );

                $transferData =
                    $callRapyd['data']
                    ?? null;

                if (!$transferData) {

                    $item->update([
                        'status' => 'failed',

                        'meta' => [
                            ...($item->meta ?? []),

                            'failure_reason' =>
                                'Invalid Rapyd response.',
                        ],
                    ]);

                    continue;
                }

                $recipientWallet =
                    \App\Models\Accounts\Personal\Wallet::where(
                        'rapyd_ewallet_token',
                        $transferData[
                            'destination_ewallet_id'
                        ]
                    )->first();

                if (!$recipientWallet) {

                    $item->update([
                        'status' => 'failed',

                        'meta' => [
                            ...($item->meta ?? []),

                            'failure_reason' =>
                                'Recipient wallet not found.',
                        ],
                    ]);

                    continue;
                }

                $transfer =
                    \App\Models\Accounts\Personal\Transfer::create([

                    'sender_user_id' =>
                        $user->id,

                    'recipient_user_id' =>
                        $recipientWallet->user_id,

                    'rapyd_transfer_id' =>
                        $transferData['id'],

                    'source_ewallet_id' =>
                        $transferData[
                            'source_ewallet_id'
                        ],

                    'destination_ewallet_id' =>
                        $transferData[
                            'destination_ewallet_id'
                        ],

                    'amount' =>
                        $transferData['amount'],

                    'currency' =>
                        $transferData[
                            'currency_code'
                        ] ?? 'USD',

                    'status' =>
                        $transferData[
                            'status'
                        ] ?? 'PEN',

                    'metadata' =>
                        $transferData[
                            'metadata'
                        ] ?? [],

                    'expiration' =>
                        $transferData[
                            'expiration'
                        ] ?? null,
                ]);

                $item->update([
                    'status' => 'processing',

                    'meta' => [
                        ...($item->meta ?? []),

                        'rapyd_transfer_id' =>
                            $transfer->rapyd_transfer_id,

                        'source_ewallet' =>
                            $transfer
                            ->source_ewallet_id,

                        'destination_ewallet' =>
                            $transfer
                            ->destination_ewallet_id,

                        'transfer_status' =>
                            $transfer->status,
                    ],
                ]);

            } catch (\Throwable $e) {

                $item->update([
                    'status' => 'failed',

                    'meta' => [
                        ...($item->meta ?? []),

                        'failure_reason' =>
                            $e->getMessage(),
                    ],
                ]);
            }
        }

        return response()->json([
            'success' => true,

            'message' =>
                'Payroll processing started.',

            'data' => [
                'batch_id' => $batch->id,
                'status' => 'processing',
            ],
        ]);
    }
}