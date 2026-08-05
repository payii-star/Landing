<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\FooterSocial;
use App\Models\LandingContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function setting()
    {
        $data = LandingContent::pluck('value', 'key');

        $socials = FooterSocial::orderBy('urutan')
            ->get()
            ->mapWithKeys(fn ($social) => [strtolower($social->platform) => $social->url]);

        return response()->json([
            'success' => true,
            'data' => [
                'hero_title'    => $data['contact_hero_title'] ?? 'Hubungi Kami',
                'hero_subtitle' => $data['contact_hero_subtitle'] ?? null,
                'email'         => $data['email'] ?? null,
                'whatsapp'      => $data['whatsapp'] ?? null,
                'phone'         => $data['phone'] ?? null,
                'address'       => $data['address'] ?? null,
                'maps_url'      => $data['contact_maps_url'] ?? '',
                'socials'       => $socials,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'phone'   => ['nullable', 'string', 'max:30'],
            'message' => ['required', 'string', 'max:5000'],
            'source'  => ['nullable', 'string', 'max:100'],
            'file'    => ['nullable', 'file', 'max:5120', 'mimes:pdf,doc,docx,jpg,jpeg,png'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'errors'  => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = '/storage/' . $request->file('file')->store('contact-attachments', 'public');
        }

        $contactMessage = ContactMessage::create([
            'name'    => $validated['name'],
            'email'   => $validated['email'],
            'company' => $validated['company'] ?? null,
            'phone'   => $validated['phone'] ?? null,
            'message' => $validated['message'],
            'source'  => $validated['source'] ?? null,
            'file_path' => $filePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim.',
            'data' => $contactMessage,
        ], 201);
    }
}