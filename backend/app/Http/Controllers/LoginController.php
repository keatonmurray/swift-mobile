<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * API-friendly login using Laravel Sanctum tokens
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'        => 'required|email',
            'password'     => 'required',
            'account_type' => 'required|in:personal,business',
        ]);

        if (!Auth::attempt([
            'email'        => $credentials['email'],
            'password'     => $credentials['password'],
            'account_type' => $credentials['account_type'],
        ])) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        // Create a token for API authentication
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in',
            'user'    => $user,
            'token'   => $token
        ]);
    }

    /**
     * API logout (revokes all tokens)
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            // Revoke all tokens for the authenticated user
            $user->tokens()->delete();
        }

        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}