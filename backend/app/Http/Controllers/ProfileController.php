<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function profile() 
    {
        $user = Auth::user();

        return response()->json([
            'user' => $user
        ]);
    }
}
