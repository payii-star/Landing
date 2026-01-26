<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LandingContent;
use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function index()
    {

        $data = LandingContent::all();
        $formatted = $data->pluck('value', 'key');
        
        return response()->json([
            'status' => true,
            'data' => $formatted
        ]);
    }
}
