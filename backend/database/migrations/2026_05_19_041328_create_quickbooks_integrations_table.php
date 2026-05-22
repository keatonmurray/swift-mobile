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
        Schema::create('quickbooks_integrations', function (Blueprint $table) {
            $table->id();

            // User relation
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // OAuth tokens
            $table->longText('access_token')->nullable();

            $table->longText('refresh_token')->nullable();

            // QuickBooks company ID
            $table->string('realm_id')->nullable();

            // Expiry tracking
            $table->timestamp('access_token_expires_at')
                ->nullable();

            $table->timestamp('refresh_token_expires_at')
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quickbooks_integrations');
    }
};
