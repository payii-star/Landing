<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;

class TeamController extends Controller
{
    // Route: GET /front/teams
    public function index()
    {
        $teams = Team::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $teams,
        ]);
    }
}
