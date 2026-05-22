<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\RapydService;

class CurrencyController extends Controller
{

    protected RapydService $rapyd;

    public function __construct(RapydService $rapyd)
    {
        $this->rapyd = $rapyd;
    }

    public function retrieveCurrencies()
    {
        $rapydCurrencies = $this->rapyd->listCurrencies();

        return response()->json([
            'success' => true,
            'currencies' => $rapydCurrencies
        ], 200);
    }
}
