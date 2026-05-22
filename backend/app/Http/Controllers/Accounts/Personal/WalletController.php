<?php

namespace App\Http\Controllers\Accounts\Personal;

use App\Http\Controllers\Controller;
use App\Models\Accounts\Personal\Wallet;
use App\Models\User;
use App\Services\RapydService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    protected RapydService $rapyd;

    public function __construct(RapydService $rapyd)
    {
        $this->rapyd = $rapyd;
    }

    /**
     * Create a Rapyd wallet 
     */
    public function createWallet(Request $request): JsonResponse
    {

        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name'  => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255'],
            'country'    => ['required', 'string', 'size:2'],
            'phone_number' => ['nullable', 'string'],
        ]);

        $payload = [
            'ewallet_reference_id' => 'test_user_' . uniqid(),
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'type'       => 'person',
            'email'      => $data['email'],

            'contact' => [
                'country'     => strtoupper($data['country']),
                'email'       => $data['email'],
                'first_name'  => $data['first_name'],
                'last_name'   => $data['last_name'],
                'phone_number'=> $data['phone_number'] ?? '+10000000000',
            ],

            'metadata' => [
                'source' => 'laravel-test',
            ],
        ];

        try {
            $rapydServerResponse = $this->rapyd->createWallet($payload);

            // RAPYD ERROR
            if (
                isset($rapydServerResponse['status']) &&
                $rapydServerResponse['status']['status'] === 'ERROR'
            ) {

                $errorCode = $rapydServerResponse['status']['error_code'] ?? null;

                // EMAIL ALREADY EXISTS
                if ($errorCode === 'INVALID_EMAIL') {

                    return response()->json([
                        'success' => false,
                        'wallet_exists' => true,
                        'message' => 'You already have an active wallet',
                    ], 409);
                }

                return response()->json([
                    'success' => false,
                    'message' => $rapydServerResponse['status']['message']
                        ?? 'Rapyd request failed.',
                ], 400);
            }

            $this->storeWalletIntoDB($rapydServerResponse);

            return response()->json([
                'success' => true,
                'message' => 'Wallet created successfully',
                'data'    => $rapydServerResponse,
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create wallet',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    private function storeWalletIntoDB($rapydServerResponse)
    {
        $user = auth('sanctum')->id();
        $walletToken = $rapydServerResponse['data']['id'] ?? null;

        if (!$walletToken) {
            throw new \Exception('Wallet ID missing from Rapyd response');
        }

        $dbData = [
            'user_id' => $user,
            'rapyd_ewallet_token' => $walletToken
        ];

        Wallet::create($dbData);
    }

    public function retrieveWallet()
    {
        $user_id = auth('sanctum')->id();
        $user = User::with('wallets')->findOrFail($user_id);

        $wallet = $user->wallets->first();

        if (!$wallet) {
            return response()->json([
                'success' => false,
                'message' => 'Wallet not found'
            ], 404);
        }

        if (!$wallet->rapyd_ewallet_token) {
            return response()->json([
                'success' => false,
                'message' => 'Wallet token missing'
            ], 404);
        }

        $rapydWallet = $this->rapyd->retrieveWallet($wallet->rapyd_ewallet_token);

        return response()->json([
            'success' => true,
            'data' => [
                'wallet_db'   => $wallet,
                'wallet_rapyd' => $rapydWallet['data'] ?? null,
            ]
        ]);
    }

}