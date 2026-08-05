<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterSetting;
use App\Models\FooterSocial;

class FooterController extends Controller
{
    public function index()
    {
        $setting = FooterSetting::first();
        $socials = FooterSocial::orderBy('urutan')->get();

        return response()->json([
            'setting' => $setting,
            'socials' => $socials,
        ]);
    }
}