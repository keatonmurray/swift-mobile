<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CurrencyController;

use App\Http\Controllers\Llm\GeminiController;

use App\Http\Controllers\Personal\TransferMoneyController;

use App\Http\Controllers\Accounts\Personal\WalletController;
use App\Http\Controllers\Accounts\Personal\TransactionsController;
use App\Http\Controllers\Accounts\Personal\VirtualAccountController;

use App\Http\Controllers\Accounts\Business\PayrollController;
use App\Http\Controllers\Accounts\Business\QuickbooksController;
use App\Http\Controllers\Accounts\Business\EmployeePaymentAccountController;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

Route::post(
    '/login',
    [LoginController::class, 'login']
);

Route::post(
    '/logout',
    [LoginController::class, 'logout']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| USER ROUTES
|--------------------------------------------------------------------------
*/

Route::post(
    '/register',
    [UserController::class, 'store']
);

Route::get(
    '/user',
    [UserController::class, 'index']
)->middleware('auth:sanctum');

Route::put(
    '/update',
    [UserController::class, 'update']
);

/*
|--------------------------------------------------------------------------
| PROFILE ROUTES
|--------------------------------------------------------------------------
*/

Route::get(
    '/profile',
    [ProfileController::class, 'profile']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| WALLET ROUTES
|--------------------------------------------------------------------------
*/

Route::post(
    '/create-personal-wallet',
    [WalletController::class, 'createWallet']
)->middleware('auth:sanctum');

Route::get(
    '/retrieve-personal-wallet',
    [WalletController::class, 'retrieveWallet']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| VIRTUAL ACCOUNT ROUTES
|--------------------------------------------------------------------------
*/

Route::post(
    '/create-personal-currency-account',
    [VirtualAccountController::class, 'createVirtualAccount']
)->middleware('auth:sanctum');

Route::get(
    '/retrieve-personal-currency',
    [VirtualAccountController::class, 'retrieveVirtualAccount']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| CURRENCY ROUTES
|--------------------------------------------------------------------------
*/

Route::get(
    '/retrieve-currencies',
    [CurrencyController::class, 'retrieveCurrencies']
);

/*
|--------------------------------------------------------------------------
| TRANSFER ROUTES
|--------------------------------------------------------------------------
*/

Route::post(
    '/transfer-personal-money',
    [TransferMoneyController::class, 'transferToOtherWallet']
)->middleware('auth:sanctum');

Route::get(
    '/get-pending-wallet-transactions',
    [TransferMoneyController::class, 'getPendingWalletTransfers']
)->middleware('auth:sanctum');

Route::post(
    '/accept-wallet-transfer',
    [TransferMoneyController::class, 'acceptPendingWalletTransfers']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| TRANSACTION ROUTES
|--------------------------------------------------------------------------
*/

Route::get(
    '/get-wallet-transactions',
    [TransactionsController::class, 'getTransactionsByWallet']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| GEMINI ROUTES
|--------------------------------------------------------------------------
*/

Route::get(
    '/test-gemini',
    [GeminiController::class, 'test']
);

Route::post(
    '/gemini/personal-summary',
    [GeminiController::class, 'personalSummary']
)->middleware('auth:sanctum');

Route::post(
    '/gemini/generate-report',
    [GeminiController::class, 'generateReport']
)->middleware('auth:sanctum');

Route::post(
    '/gemini/suggest-goals',
    [GeminiController::class, 'suggestGoals']
)->middleware('auth:sanctum');

Route::post(
    '/gemini/review-payroll',
    [GeminiController::class, 'reviewPayroll']
)->middleware('auth:sanctum');

Route::post(
    '/gemini/analyze-employee-payroll',
    [GeminiController::class, 'analyzeEmployeePayroll']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| QUICKBOOKS ROUTES
|--------------------------------------------------------------------------
*/

Route::get(
    '/integrations/quickbooks/connect',
    [QuickbooksController::class, 'connect']
);

Route::get(
    '/integrations/quickbooks/callback',
    [QuickbooksController::class, 'callback']
);

Route::get(
    '/integrations/quickbooks/status',
    [QuickbooksController::class, 'status']
);

Route::get(
    '/integrations/quickbooks/employees',
    [QuickbooksController::class, 'employees']
)->middleware('auth:sanctum');

Route::get(
    '/integrations/quickbooks/bills',
    [QuickbooksController::class, 'bills']
)->middleware('auth:sanctum');

Route::get(
    '/integrations/quickbooks/invoices',
    [QuickbooksController::class, 'invoices']
)->middleware('auth:sanctum');

Route::get(
    '/integrations/quickbooks/vendors',
    [QuickbooksController::class, 'vendors']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| EMPLOYEE PAYMENT ACCOUNT ROUTES
|--------------------------------------------------------------------------
*/

Route::get(
    '/employee-payment-accounts',
    [EmployeePaymentAccountController::class, 'index']
)->middleware('auth:sanctum');

Route::post(
    '/employee-payment-accounts',
    [EmployeePaymentAccountController::class, 'store']
)->middleware('auth:sanctum');

Route::get(
    '/employee-payment-accounts/{qbId}',
    [EmployeePaymentAccountController::class, 'show']
)->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| PAYROLL ROUTES
|--------------------------------------------------------------------------
*/

Route::post(
    '/payroll/approve',
    [PayrollController::class, 'approve']
)->middleware('auth:sanctum');

Route::post(
    '/payroll/send/{batch}',
    [PayrollController::class, 'send']
)->middleware('auth:sanctum');