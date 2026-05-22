<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add salary / compensation fields to employee_payment_accounts
     * so each QB employee can have a manually configured pay profile.
     */
    public function up(): void
    {
        Schema::table(
            'employee_payment_accounts',
            function (Blueprint $table) {

                /* -------------------------------------------------------- */
                /* Compensation                                             */
                /* -------------------------------------------------------- */

                $table->decimal(
                    'salary', 12, 2
                )->nullable()
                 ->after('employee_name')
                 ->comment('Gross salary per pay period');

                $table->decimal(
                    'hourly_rate', 10, 2
                )->nullable()
                 ->after('salary')
                 ->comment('Hourly pay rate');

                $table->decimal(
                    'hours_per_period', 8, 2
                )->nullable()
                 ->default(160.00)
                 ->after('hourly_rate')
                 ->comment('Standard hours per pay period');

                /* -------------------------------------------------------- */
                /* Role / Title                                             */
                /* -------------------------------------------------------- */

                $table->string('job_title')
                    ->nullable()
                    ->after('hours_per_period');

                /* -------------------------------------------------------- */
                /* Pay Schedule                                             */
                /* -------------------------------------------------------- */

                $table->enum(
                    'pay_frequency',
                    [
                        'weekly',
                        'biweekly',
                        'semimonthly',
                        'monthly',
                    ]
                )->default('monthly')
                 ->after('job_title');
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(
            'employee_payment_accounts',
            function (Blueprint $table) {
                $table->dropColumn([
                    'salary',
                    'hourly_rate',
                    'hours_per_period',
                    'job_title',
                    'pay_frequency',
                ]);
            }
        );
    }
};
