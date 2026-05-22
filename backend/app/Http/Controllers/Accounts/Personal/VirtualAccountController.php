<?php

namespace App\Http\Controllers\Accounts\Personal;

use App\Http\Controllers\Controller;
use App\Models\Accounts\Personal\VirtualAccount;
use App\Models\User;
use App\Services\RapydService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VirtualAccountController extends Controller
{

    protected RapydService $rapyd;

    public function __construct(RapydService $rapyd)
    {
        $this->rapyd = $rapyd;
    }

    public function createVirtualAccount(Request $request)
    {

        $data = $request->validate([
            'country' => 'required|string',
            'currency' => 'required|string',
            'ewallet' => 'required|string',
            'description' => 'nullable|string',
            'merchant_reference_id' => 'required|string',
            'metadata' => 'nullable|array',
            'requested_currency' => 'required|string',
        ]);

        $rapydServerResponse = $this->rapyd->issueVirtualAccountToWallet($data);

        $this->storeVirtualAccountIntoDb($rapydServerResponse);
        
        return response()->json([
            'success' => true,
            'message' => 'Virtual account issued successfully',
            'data' => $rapydServerResponse
        ]);
    }

    private function storeVirtualAccountIntoDb($rapydServerResponse)
    {
        $user = auth('sanctum')->id();

        $walletToken = $rapydServerResponse['data']['ewallet'] ?? null;

        if (!$walletToken) {
            throw new \Exception('You already have an existing wallet.');
        }

        $dbData = [
            'user_id' => $user,
            'rapyd_ewallet_token' => $walletToken
        ];

        VirtualAccount::create($dbData);
    }

    public function retrieveVirtualAccount()
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }

        // Load relations properly
        $user->load(['wallets', 'virtualAccounts']);

        $virtualAccount = $user->virtualAccounts->first();

        if (!$virtualAccount) {
            return response()->json([
                'success' => false,
                'message' => 'Virtual account not found'
            ], 404);
        }

        if (!$virtualAccount->rapyd_ewallet_token) {
            return response()->json([
                'success' => false,
                'message' => 'Wallet token missing'
            ], 404);
        }

        $rapydVirtualAccount = $this->rapyd->listVirtualAccountsByWallet(
            $virtualAccount->rapyd_ewallet_token
        );

        $bankAccounts = $rapydVirtualAccount['data']['bank_accounts'] ?? [];

        $activeAccounts = array_values(array_filter($bankAccounts, function ($account) {
            return ($account['status'] ?? null) === 'ACT';
        }));

        return response()->json([
            'success' => true,
            'data' => [
                'wallet_db' => $virtualAccount,
                'wallet_rapyd' => array_merge(
                    $rapydVirtualAccount['data'] ?? [],
                    [
                        'bank_accounts' => $activeAccounts
                    ]
                ),
            ]
        ]);
    }

}
