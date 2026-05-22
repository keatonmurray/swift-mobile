<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeePaymentAccount extends Model
{
    protected $fillable = [
        'user_id',

        'employee_qb_id',

        'employee_name',

        // Compensation
        'salary',
        'hourly_rate',
        'hours_per_period',
        'job_title',
        'pay_frequency',

        'rapyd_wallet_id',

        'rapyd_contact_id',

        'payout_method',

        'currency',

        'status',
    ];

    protected $casts = [
        'salary'          => 'decimal:2',
        'hourly_rate'     => 'decimal:2',
        'hours_per_period' => 'decimal:2',
    ];
}