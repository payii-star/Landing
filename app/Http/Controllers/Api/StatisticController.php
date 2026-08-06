<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Statistic;

class StatisticController extends Controller
{
    public function index()
    {
        $statistics = Statistic::where('is_active', true)
            ->orderBy('urutan')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $statistics,
        ]);
    }
}