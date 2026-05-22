<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{

    /**
     * Returns user info as a JSON formatted response for UI consumption
     */
    public function index()
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'first_name'     => 'required|string|max:50',
            'last_name'      => 'required|string|max:50',

            'company_name'   => 'nullable|string|max:100',

            'account_type'   => 'required|in:business,personal',

            'country'        => 'required|string|max:100',

            'email'          => 'required|email|max:100|unique:users,email',

            'profile_avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',

            'kyc_status'     => 'nullable|in:pending,approved,rejected',

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
                'regex:/[a-z]/',      // lowercase
                'regex:/[A-Z]/',      // uppercase
                'regex:/[0-9]/',      // number
                'regex:/[@$!%*?&#]/'  // special char
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'company_name' => $request->company_name,
            'account_type' => $request->account_type,
            'country'    => $request->country,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Registration Success!",
            'user'    => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $id = auth('sanctum')->id();

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:50',
            'last_name'  => 'required|string|max:50',
            'country'    => 'required|string|max:100',
            'email'      => 'required|email|max:100|unique:users,email,' . $id,

            'profile_avatar' => 'nullable|file|image|max:2048',
            'id_photo'       => 'nullable|file|image|max:4096',

            'kyc_status' => 'nullable|in:pending,approved,rejected',

            'password' => [
                'nullable',
                'string',
                'min:8',
                'confirmed',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&#]/'
            ],
        ]);

        if ($validator->fails()) {
            // Prepare dynamic error messages
            $errors = [];
            foreach ($validator->errors()->getMessages() as $field => $messages) {
                $errors[$field] = $messages[0]; // first message per field
            }

            return response()->json([
                'success' => false,
                'errors'  => $errors
            ], 422);
        }

        $user = User::findOrFail($id);

        $data = $request->only([
            'first_name', 
            'last_name', 
            'country', 
            'email', 
            'profile_avatar', 
            'id_photo', 
            'kyc_status', 
            'password'
        ]);

        // Hash password if present
        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        if ($request->hasFile('profile_avatar')) {
            $path = $request->file('profile_avatar')->store('avatars', 'public');
            $data['profile_avatar'] = $path;
        }

        if ($request->hasFile('id_photo')) {
            $path = $request->file('id_photo')->store('ids', 'public');
            $data['id_photo'] = $path;
        }

        $user->update($data);

        return response()->json([
            'success' => true,
            'user'    => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
