<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Accounts\Personal\Transaction;
use App\Models\Accounts\Personal\Transfer;
use App\Models\Accounts\Personal\VirtualAccount;
use App\Models\Accounts\Personal\Wallet;
use App\Models\QuickbooksIntegration;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'country',
        'account_type',
        'company_name',
        'email',
        'profile_avatar',
        'id_photo',
        'kyc_status',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    // ======================================================
    // Wallets
    // ======================================================

    public function wallets()
    {
        return $this->hasMany(Wallet::class);
    }


    // ======================================================
    // Virtual accounts
    // ======================================================

    public function virtualAccounts()
    {
        return $this->hasMany(VirtualAccount::class);
    }


    // ======================================================
    // Transactions
    // ======================================================

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }


    // ======================================================
    // Transfers SENT by this user
    // ======================================================

    public function sentTransfers()
    {
        return $this->hasMany(
            Transfer::class,
            'sender_user_id'
        );
    }


    // ======================================================
    // Transfers RECEIVED by this user
    // ======================================================

    public function receivedTransfers()
    {
        return $this->hasMany(
            Transfer::class,
            'recipient_user_id'
        );
    }

    // ======================================================
    // STORE QUICBOOKS INTEGRATION 
    // ======================================================

    public function quickbooksIntegration()
    {
        return $this->hasOne(
            QuickbooksIntegration::class
        );
    }
}