<?php

namespace App\Models\Accounts\Personal;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class VirtualAccount extends Model
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
