<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuickbooksIntegration extends Model
{
    protected $fillable = [
        'user_id',
        'access_token',
        'refresh_token',
        'realm_id',
        'access_token_expires_at',
        'refresh_token_expires_at',
    ];

    protected $casts = [
        'access_token_expires_at' => 'datetime',
        'refresh_token_expires_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function accessTokenExpired()
    {
        if (!$this->access_token_expires_at) {
            return true;
        }

        return now()->greaterThanOrEqualTo(
            $this->access_token_expires_at
        );
    }

    public function refreshTokenExpired()
    {
        if (!$this->refresh_token_expires_at) {
            return true;
        }

        return now()->greaterThanOrEqualTo(
            $this->refresh_token_expires_at
        );
    }
}