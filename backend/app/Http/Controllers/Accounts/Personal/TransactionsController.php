<?php

namespace App\Http\Controllers\Accounts\Personal;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\RapydService;
use Illuminate\Support\Facades\Auth;

class TransactionsController extends Controller
{
   protected RapydService $rapyd;

    public function __construct(RapydService $rapyd)
    {
        $this->rapyd = $rapyd;
    }

    public function getTransactionsByWallet()
    {
        $user_id = auth('sanctum')->id();
        $user = User::with('wallets')->findOrFail($user_id);

        $transactions = $user->wallets->first();

        if (!$transactions) {
            return response()->json([
                'success' => false,
                'message' => 'Wallet not found'
            ], 404);
        }

        $transactions = $this->rapyd->listWalletTransactions(
            $transactions->rapyd_ewallet_token
        );

        return response()->json([
            'success' => true,
            'transactions' => $transactions['data'],
            'user_id' => $transactions
        ]);
    }
}