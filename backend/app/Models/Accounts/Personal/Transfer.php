<?php

namespace App\Models\Accounts\Personal;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transfer extends Model
{
    use HasFactory;

    protected $fillable = [

        // User relationships
        'sender_user_id',
        'recipient_user_id',

        // Rapyd transfer identifiers
        'rapyd_transfer_id',

        // Wallet IDs
        'source_ewallet_id',
        'destination_ewallet_id',

        // Money
        'amount',
        'currency',

        // PEN / ACT / REJ / EXP
        'status',

        // Metadata
        'metadata',

        // Expiration timestamp
        'expiration',

        // Acceptance/rejection timestamp
        'responded_at',
    ];

    protected $casts = [

        // Decimal amount
        'amount' => 'decimal:2',

        // JSON metadata
        'metadata' => 'array',

        // Datetime casting
        'responded_at' => 'datetime',
    ];


    // ======================================================
    // Relationships
    // ======================================================

    public function sender()
    {
        return $this->belongsTo(
            User::class,
            'sender_user_id'
        );
    }

    public function recipient()
    {
        return $this->belongsTo(
            User::class,
            'recipient_user_id'
        );
    }
}