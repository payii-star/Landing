<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LandingContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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

        $result = $data->toArray();

        // client_logos sekarang datanya beneran di E-pkl (tabel landing_client_logos),
        // bukan lagi di landing_contents. Ambil dari sana; kalau E-pkl lagi nggak
        // bisa diakses, fallback ke value lama di landing_contents (kalau ada).
        $result['client_logos'] = $this->fetchClientLogosFromEpkl()
            ?? (isset($result['client_logos']) ? json_decode($result['client_logos']) : []);

        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    private function fetchClientLogosFromEpkl(): ?array
    {
        $epklUrl = config('services.epkl_api.url');
        if (!$epklUrl) {
            return null;
        }

        try {
            $res = Http::timeout(5)->get(rtrim($epklUrl, '/') . '/front/client-logos');
        } catch (\Throwable) {
            return null;
        }

        if ($res->failed()) {
            return null;
        }

        return $res->json('data') ?? [];
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

    public function projectsPage()
    {
        $data = LandingContent::pluck('value', 'key');

        return response()->json([
            'setting' => [
                'label' => $data['projects_page_label'] ?? null,
                'title' => $data['projects_page_title'] ?? null,
                'subtitle' => $data['projects_page_subtitle'] ?? null,
            ],
        ]);
    }
}