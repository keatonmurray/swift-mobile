<?php

namespace App\Services;

use Exception;

use App\Models\Accounts\Personal\Transfer;
use App\Models\Accounts\Personal\Wallet;

use Illuminate\Support\Facades\DB;

class TransferService
{
    protected RapydService $rapydService;

    public function __construct(
        RapydService $rapydService
    ) {
        $this->rapydService =
            $rapydService;
    }

    public function transferBetweenWallets(
        array $validated
    ) {

        DB::beginTransaction();

        try {

            /* ===================================================== */
            /* Call Rapyd                                            */
            /* ===================================================== */

            $payload = [

                'amount' =>
                    (float) $validated['amount'],

                'currency' =>
                    strtoupper(
                        $validated['currency']
                    ),

                'destination_ewallet' =>
                    $validated[
                        'destination_ewallet'
                    ],

                'source_ewallet' =>
                    $validated[
                        'source_ewallet'
                    ],

                'expiration' =>
                    $validated[
                        'expiration'
                    ] ?? null,
            ];

            $callRapyd =
                $this->rapydService
                ->transferFundsBetweenWallets(
                    $payload
                );

            /* ===================================================== */
            /* Rapyd Response                                        */
            /* ===================================================== */

            $transferData =
                $callRapyd['data']
                ?? null;

            if (!$transferData) {

                throw new Exception(
                    'Invalid Rapyd transfer response.'
                );
            }

            /* ===================================================== */
            /* Sender Wallet                                         */
            /* ===================================================== */

            $senderWallet =
                Wallet::where(
                    'rapyd_ewallet_token',

                    $transferData[
                        'source_ewallet_id'
                    ]
                )->first();

            /* ===================================================== */
            /* Recipient Wallet                                      */
            /* ===================================================== */

            $recipientWallet =
                Wallet::where(
                    'rapyd_ewallet_token',

                    $transferData[
                        'destination_ewallet_id'
                    ]
                )->first();

            if (
                !$senderWallet ||
                !$recipientWallet
            ) {

                throw new Exception(
                    'Unable to locate wallets.'
                );
            }

            /* ===================================================== */
            /* Wallet Owners                                         */
            /* ===================================================== */

            $senderUser =
                $senderWallet->user;

            $recipientUser =
                $recipientWallet->user;

            if (
                !$senderUser ||
                !$recipientUser
            ) {

                throw new Exception(
                    'Unable to locate wallet owners.'
                );
            }

            /* ===================================================== */
            /* Save Transfer                                         */
            /* ===================================================== */

            $transfer =
                Transfer::create([

                'sender_user_id' =>
                    $senderUser->id,

                'recipient_user_id' =>
                    $recipientUser->id,

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
                    $transferData[
                        'amount'
                    ],

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

            DB::commit();

            return [

                'success' => true,

                'transfer' =>
                    $transfer,

                'rapyd' =>
                    $transferData,
            ];

        } catch (\Throwable $e) {

            DB::rollBack();

            return [

                'success' => false,

                'message' =>
                    $e->getMessage(),
            ];
        }
    }
}