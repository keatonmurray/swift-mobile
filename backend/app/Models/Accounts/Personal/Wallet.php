<?php

namespace App\Models\Accounts\Personal;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $fillable = [
        'user_id',
        'rapyd_ewallet_token',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
