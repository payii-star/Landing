<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterSetting;
use App\Models\FooterSocial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function adminShow()
    {
        return response()->json([
            'success' => true,
            'setting' => FooterSetting::first(),
            'socials' => FooterSocial::orderBy('urutan')->get(),
        ]);
    }

    public function updateSetting(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'copyright' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $setting = FooterSetting::first();
        $data = $request->only(['company_name', 'description', 'address', 'email', 'phone', 'copyright']);

        if ($setting) {
            $setting->update($data);
        } else {
            $setting = FooterSetting::create($data);
        }

        return response()->json([
            'success' => true,
            'data' => $setting,
        ]);
    }

    public function socialStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'platform' => 'required|string|max:100',
            'url' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $social = FooterSocial::create([
            'platform' => $request->platform,
            'url' => $request->url,
            'urutan' => (FooterSocial::max('urutan') ?? 0) + 1,
        ]);

        return response()->json([
            'success' => true,
            'data' => $social,
        ], 201);
    }

    public function socialUpdate(Request $request, FooterSocial $footerSocial)
    {
        $validator = Validator::make($request->all(), [
            'platform' => 'required|string|max:100',
            'url' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $footerSocial->update($request->only(['platform', 'url']));

        return response()->json([
            'success' => true,
            'data' => $footerSocial,
        ]);
    }

    public function socialDestroy(FooterSocial $footerSocial)
    {
        $footerSocial->delete();

        return response()->json(['success' => true]);
    }
}