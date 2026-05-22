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
        Schema::create('transfers', function (Blueprint $table) {

            $table->id();

            // ======================================================
            // User relationships
            // ======================================================

            // Sender user
            $table->foreignId('sender_user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // Recipient user
            $table->foreignId('recipient_user_id')
                ->constrained('users')
                ->cascadeOnDelete();


            // ======================================================
            // Rapyd transfer data
            // ======================================================

            // Rapyd transfer ID
            $table->string('rapyd_transfer_id')->unique();

            // Rapyd wallet IDs
            $table->string('source_ewallet_id');
            $table->string('destination_ewallet_id');

            // Amount + currency
            $table->decimal('amount', 18, 2);

            $table->string('currency', 10)->default('USD');

            // PEN / ACT / REJ / EXP etc.
            $table->string('status', 20)->default('PEN');

            // Raw Rapyd metadata
            $table->json('metadata')->nullable();

            // Transfer expiration timestamp
            $table->unsignedBigInteger('expiration')->nullable();

            // When recipient accepted/rejected
            $table->timestamp('responded_at')->nullable();

            // ======================================================
            // Laravel timestamps
            // ======================================================

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfers');
    }
};
