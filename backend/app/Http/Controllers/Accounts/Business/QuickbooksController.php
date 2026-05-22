<?php

namespace App\Http\Controllers\Accounts\Business;

use App\Http\Controllers\Controller;
use App\Models\QuickbooksIntegration;
use App\Services\QuickbooksService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class QuickbooksController extends Controller
{
    protected $quickbooksService;

    public function __construct(
        QuickbooksService $quickbooksService
    ) {
        $this->quickbooksService = $quickbooksService;
    }

    public function connect(Request $request)
    {
        $token = $request->token;

        $user = \Laravel\Sanctum\PersonalAccessToken::findToken($token)?->tokenable;

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $clientId = env('QUICKBOOKS_CLIENT_ID');

        $redirectUri = urlencode(
            env('QUICKBOOKS_REDIRECT_URI')
        );

        $scope = urlencode(
            'com.intuit.quickbooks.accounting'
        );

        // SAFE STATE
        $state =
            $user->id .
            '|' .
            bin2hex(random_bytes(16));

        $authUrl =
            "https://appcenter.intuit.com/connect/oauth2" .
            "?client_id={$clientId}" .
            "&response_type=code" .
            "&scope={$scope}" .
            "&redirect_uri={$redirectUri}" .
            "&state={$state}";

        return redirect($authUrl);
    }

    public function callback(Request $request)
    {
        // Make sure authorization code exists
        if (!$request->code) {
            return response()->json([
                'success' => false,
                'message' => 'Authorization code missing.',
            ], 400);
        }

        // Validate OAuth state
        if (!$request->state) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OAuth state.',
            ], 401);
        }

        // Parse state
        $parts = explode('|', $request->state);

        $userId = $parts[0] ?? null;

        if (!$userId || !is_numeric($userId)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OAuth state.',
            ], 401);
        }

        try {
            // Exchange authorization code for tokens
            $response = Http::asForm()
                ->withBasicAuth(
                    env('QUICKBOOKS_CLIENT_ID'),
                    env('QUICKBOOKS_CLIENT_SECRET')
                )
                ->withOptions([
                    'verify' => false,
                    'connect_timeout' => 60,
                    'timeout' => 60,
                ])
                ->post(
                    'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
                    [
                        'grant_type' => 'authorization_code',

                        'code' => $request->code,

                        'redirect_uri' => env(
                            'QUICKBOOKS_REDIRECT_URI'
                        ),
                    ]
                );

            // Handle failed response
            if (!$response->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to exchange QuickBooks tokens.',
                    'error' => $response->body(),
                ], 500);
            }

            $tokens = $response->json();

            // Store integration
            QuickbooksIntegration::updateOrCreate(
                [
                    'user_id' => $userId,
                ],
                [
                    'access_token' =>
                        $tokens['access_token'] ?? null,

                    'refresh_token' =>
                        $tokens['refresh_token'] ?? null,

                    'realm_id' =>
                        $request->realmId ?? null,

                    'access_token_expires_at' =>
                        now()->addSeconds(
                            $tokens['expires_in'] ?? 3600
                        ),

                    'refresh_token_expires_at' =>
                        now()->addSeconds(
                            $tokens['x_refresh_token_expires_in']
                                ?? 8726400
                        ),
                ]
            );

            // Redirect frontend
            return response("
            <!DOCTYPE html>
            <html>
            <head>
                <title>QuickBooks Connected</title>
            </head>
            <body>
                <script>
                    if (window.opener) {
                        window.opener.postMessage(
                            {
                                type: 'QUICKBOOKS_CONNECTED'
                            },
                            '*'
                        );

                        window.close();
                    } else {
                        window.location.href = '" . env('FRONTEND_URL') . "/business/integrations';
                    }
                </script>
            </body>
            </html>
            ");
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'QuickBooks connection failed.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Get Integration Status
    public function status()
    {
        $integration = auth('sanctum')->user()
            ->quickbooksIntegration;

        if (!$integration) {
            return response()->json([
                'connected' => false,
            ]);
        }

        return response()->json([
            'connected' => true,

            'integration' => [
                'realm_id' =>
                    $integration->realm_id,

                'access_token_expires_at' =>
                    $integration->access_token_expires_at,

                'refresh_token_expires_at' =>
                    $integration->refresh_token_expires_at,
            ],
        ]);
    }

    // Get Employees
    public function employees()
    {
        return response()->json(
            $this->quickbooksService->employees()
        );
    }

    // Get Bills
    public function bills()
    {
        return response()->json(
            $this->quickbooksService->bills()
        );
    }

    // Get Invoices
    public function invoices()
    {
        return response()->json(
            $this->quickbooksService->invoices()
        );
    }

    // Get Vendors
    public function vendors()
    {
        return response()->json(
            $this->quickbooksService->vendors()
        );
    }
}