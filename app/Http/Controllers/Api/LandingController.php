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

    public function frontContent()
    {
        $data = LandingContent::pluck('value', 'key');

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function landingCta()
    {
        $data = LandingContent::pluck('value', 'key');

        return response()->json([
            'success' => true,
            'data' => [
                'title' => $data['landing_cta_title'] ?? null,
                'description' => $data['landing_cta_description'] ?? null,
                'button_text' => $data['landing_cta_button_text'] ?? null,
                'button_link' => $data['landing_cta_button_link'] ?? null,
            ],
        ]);
    }
    
    public function landingAbout()
    {
        $data = LandingContent::pluck('value', 'key');

        return response()->json([
            'success' => true,
            'data' => [
                'title' => $data['about_title'] ?? null,
                'subtitle' => $data['about_subtitle'] ?? null,
                'description' => $data['about_description'] ?? null,
                'vision' => $data['about_vision'] ?? null,
                'mission' => isset($data['about_mission']) ? json_decode($data['about_mission']) : [],
                'image' => $data['about_image'] ?? null,
                'features' => isset($data['about_features']) ? json_decode($data['about_features']) : [],
            ],
        ]);
    }
}