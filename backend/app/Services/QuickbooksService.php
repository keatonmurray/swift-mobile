<?php

namespace App\Services;

use App\Models\QuickbooksIntegration;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class QuickbooksService
{
    protected function integration()
    {
        $user = auth('sanctum')->user();
        if (!$user) {
            return null;
        }

        return QuickbooksIntegration::where(
            'user_id',
            $user->id
        )->first();
    }

    public function getAccessToken()
    {
        return $this->integration()?->access_token;
    }

    public function getRefreshToken()
    {
        return $this->integration()?->refresh_token;
    }

    public function getRealmId()
    {
        return $this->integration()?->realm_id;
    }

    public function refreshAccessToken()
    {
        $integration =
            $this->integration();

        if (
            !$integration ||
            !$integration->refresh_token
        ) {
            return false;
        }

        $response =
            Http::asForm()
            ->withBasicAuth(
                env('QUICKBOOKS_CLIENT_ID'),
                env('QUICKBOOKS_CLIENT_SECRET')
            )
            ->post(
                'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
                [
                    'grant_type' =>
                        'refresh_token',

                    'refresh_token' =>
                        $integration
                        ->refresh_token,
                ]
            );

        if (!$response->successful()) {

            return false;
        }

        $tokens =
            $response->json();

        $integration->update([

            'access_token' =>

                $tokens[
                    'access_token'
                ] ?? null,

            'refresh_token' =>

                $tokens[
                    'refresh_token'
                ] ?? null,

            'access_token_expires_at' =>

                now()->addSeconds(
                    $tokens[
                        'expires_in'
                    ] ?? 3600
                ),

            'refresh_token_expires_at' =>

                now()->addSeconds(
                    $tokens[
                        'x_refresh_token_expires_in'
                    ] ?? 8726400
                ),
        ]);

        return true;
    }

    public function query($query)
    {
        
        $accessToken = $this->getAccessToken();

        $realmId = $this->getRealmId();

        if (!$accessToken || !$realmId) {
            return [
                'success' => false,
                'message' => 'QuickBooks is not connected.',
            ];
        }

        $response = Http::withToken($accessToken)
            ->acceptJson()
            ->withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/text',
            ])
            ->get(
                "https://sandbox-quickbooks.api.intuit.com/v3/company/{$realmId}/query",
                [
                    'query' => $query,
                    'minorversion' => 75,
                ]
            );

        if (
            $response->status() === 401
            ) {

                $refreshed =
                    $this->refreshAccessToken();

                if (!$refreshed) {

                    return [
                        'success' => false,

                        'message' =>
                            'QuickBooks token refresh failed.',
                    ];
                }

                /* ====================================================== */
                /* Retry Query                                            */
                /* ====================================================== */

                return $this->query($query);
            }

            if (!$response->successful()) {

                return [

                    'success' => false,

                    'status' =>
                        $response->status(),

                    'error' =>
                        $response->json(),
                ];
            }

        return [
            'success' => true,
            'data' => $response->json(),
        ];
    }

    public function employees()
    {
        return $this->query(
            "SELECT * FROM Employee"
        );
    }

    public function bills()
    {
        return $this->query(
            "SELECT * FROM Bill"
        );
    }

    public function invoices()
    {
        return $this->query(
            "SELECT * FROM Invoice"
        );
    }

    public function vendors()
    {
        return $this->query(
            "SELECT * FROM Vendor"
        );
    }
}