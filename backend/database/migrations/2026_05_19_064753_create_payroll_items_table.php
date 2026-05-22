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
        Schema::create('payroll_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('payroll_batch_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('employee_qb_id');

            $table->string('employee_name');

            $table->decimal('amount', 15, 2);

            $table->string('currency')
                ->default('USD');

            $table->string('status')
                ->default('pending');

            $table->json('meta')
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_items');
    }
};
