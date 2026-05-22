<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollBatch extends Model
{
    protected $fillable = [
        'user_id',
        'total_amount',
        'currency',
        'status',
        'employees_count',
        'processed_at',
    ];
}