<?php

namespace App\Models\Accounts\Personal;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
