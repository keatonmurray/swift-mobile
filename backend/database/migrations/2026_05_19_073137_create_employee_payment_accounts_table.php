<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(
            'employee_payment_accounts',
            function (Blueprint $table) {

                $table->id();

                /* ------------------------------------------------------------ */
                /* Business Owner                                               */
                /* ------------------------------------------------------------ */

                $table->foreignId('user_id')
                    ->constrained()
                    ->cascadeOnDelete();

                /* ------------------------------------------------------------ */
                /* QuickBooks Employee                                          */
                /* ------------------------------------------------------------ */

                $table->string(
                    'employee_qb_id'
                );

                $table->string(
                    'employee_name'
                );

                /* ------------------------------------------------------------ */
                /* Rapyd Mapping                                                */
                /* ------------------------------------------------------------ */

                $table->string(
                    'rapyd_wallet_id'
                )->nullable();

                $table->string(
                    'rapyd_contact_id'
                )->nullable();

                /* ------------------------------------------------------------ */
                /* Payout Details                                               */
                /* ------------------------------------------------------------ */

                $table->string(
                    'payout_method'
                )->default('wallet');

                $table->string(
                    'currency'
                )->default('USD');

                /* ------------------------------------------------------------ */
                /* Status                                                       */
                /* ------------------------------------------------------------ */

                $table->enum(
                    'status',
                    [
                        'active',
                        'inactive',
                    ]
                )->default('active');

                $table->timestamps();

                /* ------------------------------------------------------------ */
                /* Prevent Duplicate Employee Mappings                          */
                /* ------------------------------------------------------------ */

                $table->unique([
                    'user_id',
                    'employee_qb_id',
                ]);
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(
            'employee_payment_accounts'
        );
    }
};