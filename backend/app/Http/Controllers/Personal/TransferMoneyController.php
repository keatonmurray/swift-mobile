<?php

namespace App\Http\Controllers\Personal;

use App\Http\Controllers\Controller;
use App\Models\Accounts\Personal\Transfer;
use App\Models\Accounts\Personal\Wallet;
use App\Services\RapydService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransferMoneyController extends Controller
{
    protected RapydService $rapydService;

    public function __construct(RapydService $rapydService)
    {
        $this->rapydService = $rapydService;
    }

    public function transferToOtherWallet(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0.01'],
            'currency' => ['required', 'string'],
            'destination_ewallet' => ['required', 'string'],
            'source_ewallet' => ['required', 'string'],
            'expiration' => ['nullable', 'string'],
        ]);

        DB::beginTransaction();

        try {

            // ======================================================
            // Call Rapyd transfer
            // ======================================================

            $payload = [
                'amount' => (float) $validated['amount'],

                'currency'
                    => strtoupper($validated['currency']),

                'destination_ewallet'
                    => $validated['destination_ewallet'],

                'source_ewallet'
                    => $validated['source_ewallet'],

                'expiration'
                    => $validated['expiration'] ?? null,
            ];

            $callRapyd = $this->rapydService
                ->transferFundsBetweenWallets($payload);


            // ======================================================
            // Rapyd response object
            // ======================================================

            $transferData = $callRapyd['data'] ?? null;

            if (!$transferData) {
                throw new \Exception(
                    'Invalid Rapyd transfer response.'
                );
            }


            // ======================================================
            // Find sender wallet
            // ======================================================

            $senderWallet = Wallet::where(
                'rapyd_ewallet_token',
                $transferData['source_ewallet_id']
            )->first();


            // ======================================================
            // Find recipient wallet
            // ======================================================

            $recipientWallet = Wallet::where(
                'rapyd_ewallet_token',
                $transferData['destination_ewallet_id']
            )->first();


            if (!$senderWallet || !$recipientWallet) {
                throw new \Exception(
                    'Unable to locate wallets.'
                );
            }


            // ======================================================
            // Get wallet owners
            // ======================================================

            $senderUser = $senderWallet->user;

            $recipientUser = $recipientWallet->user;


            if (!$senderUser || !$recipientUser) {
                throw new \Exception(
                    'Unable to locate wallet owners.'
                );
            }


            // ======================================================
            // Save transfer locally
            // ======================================================

            $transfer = Transfer::create([

                // User relationships
                'sender_user_id'
                    => $senderUser->id,

                'recipient_user_id'
                    => $recipientUser->id,


                // Rapyd identifiers
                'rapyd_transfer_id'
                    => $transferData['id'],


                // Wallet IDs
                'source_ewallet_id'
                    => $transferData['source_ewallet_id'],

                'destination_ewallet_id'
                    => $transferData['destination_ewallet_id'],


                // Money
                'amount'
                    => $transferData['amount'],

                'currency'
                    => $transferData['currency_code'] ?? 'USD',


                // PEN / ACT / REJ / EXP
                'status'
                    => $transferData['status'] ?? 'PEN',


                // Metadata
                'metadata'
                    => $transferData['metadata'] ?? [],


                // Expiration timestamp
                'expiration'
                    => $transferData['expiration'] ?? null,
            ]);


            DB::commit();


            return response()->json([
                'success' => true,

                'message'
                    => 'Transfer created successfully.',

                'data' => [
                    'transfer' => $transfer,
                    'rapyd' => $transferData,
                ],
            ]);

        } catch (\Throwable $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getPendingWalletTransfers()
    {
        try {

            // ======================================================
            // Get authenticated user via Sanctum
            // ======================================================

            $user = auth('sanctum')->id();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized.',
                ], 401);
            }

            // ======================================================
            // Fetch pending transfers
            //
            // Only transfers:
            // - intended for this user
            // - still pending
            // ======================================================

            $pendingTransfers = Transfer::with([
                    'sender:id,first_name,last_name,email',
                    'recipient:id,first_name,last_name,email',
                ])
                ->where('recipient_user_id', $user)
                ->where('status', 'PEN')
                ->latest()
                ->get();


            // ======================================================
            // Return response
            // ======================================================

            return response()->json([
                'success' => true,

                'count' => $pendingTransfers->count(),

                'data' => $pendingTransfers,
            ]);

        } catch (\Throwable $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function acceptPendingWalletTransfers(Request $request)
    {
        $validated = $request->validate([
            'transfer_id' => ['required', 'string'],
        ]);

        DB::beginTransaction();

        try {

            // ======================================================
            // Get authenticated user
            // ======================================================

            $user = auth('sanctum')->id();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized.',
                ], 401);
            }


            // ======================================================
            // Find pending transfer
            // ======================================================

            $transfer = Transfer::where(
                'rapyd_transfer_id',
                $validated['transfer_id']
            )
            ->where('recipient_user_id', $user)
            ->first();


            if (!$transfer) {

                return response()->json([
                    'success' => false,
                    'message' => 'Transfer not found.',
                ], 404);
            }


            // ======================================================
            // Prevent duplicate processing
            // ======================================================

            if ($transfer->status !== 'PEN') {

                return response()->json([
                    'success' => false,
                    'message' => 'Transfer already processed.',
                ], 400);
            }


            // ======================================================
            // Accept transfer via Rapyd
            // ======================================================

            $payload = [
                'id' => $transfer->rapyd_transfer_id,

                'status' => 'accept',

                'metadata' => [],
            ];


            $rapydResponse = $this->rapydService
                ->setTransferResponse($payload);


            // ======================================================
            // Update local DB
            // ======================================================

            $transfer->update([

                // ACT = accepted
                'status' => 'ACT',

                'responded_at' => now(),
            ]);


            DB::commit();


            return response()->json([
                'success' => true,

                'message'
                    => 'Transfer accepted successfully.',

                'data' => [
                    'transfer' => $transfer,
                    'rapyd' => $rapydResponse,
                ],
            ]);

        } catch (\Throwable $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}