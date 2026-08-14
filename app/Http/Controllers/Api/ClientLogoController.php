<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LandingContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ClientLogoController extends Controller
{
    private const KEY = 'client_logos';

    /**
     * Ambil semua data client_logos dari tabel landing_content.
     * Data lama (hasil seeder) belum punya 'id', jadi di sini kita
     * tambahkan id sekali saja (backfill) supaya bisa di-edit/hapus per item.
     */
    private function getLogos(): array
    {
        $row = LandingContent::where('key', self::KEY)->first();
        $logos = $row ? json_decode($row->value, true) : [];

        if (!is_array($logos)) {
            $logos = [];
        }

        $changed = false;
        foreach ($logos as &$logo) {
            if (empty($logo['id'])) {
                $logo['id'] = (string) Str::uuid();
                $changed = true;
            }
        }
        unset($logo);

        if ($changed) {
            $this->saveLogos($logos);
        }

        return array_values($logos);
    }

    private function saveLogos(array $logos): void
    {
        LandingContent::updateOrCreate(
            ['key' => self::KEY],
            ['value' => json_encode(array_values($logos)), 'type' => 'json']
        );
    }

    /**
     * File lama (hasil seeder) disimpan langsung di public/media/clients/*,
     * BUKAN lewat storage disk. Cuma file yang di-upload lewat fitur ini
     * (path /storage/clients/...) yang boleh dihapus otomatis dari disk.
     */
    private function urlToPath(?string $url): ?string
    {
        if (!$url || !str_starts_with($url, '/storage/')) {
            return null;
        }
        return substr($url, strlen('/storage/'));
    }

    // Route: GET /master/client-logos
    public function adminIndex()
    {
        return response()->json([
            'success' => true,
            'data' => $this->getLogos(),
        ]);
    }

    // Route: GET /master/client-logos/{id}
    public function show(string $id)
    {
        $logo = collect($this->getLogos())->firstWhere('id', $id);

        if (!$logo) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json([
            'success' => true,
            'client' => $logo,
        ]);
    }

    // Route: POST /master/client-logos/store
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'short' => 'nullable|string|max:100',
            'logo' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $path = $request->file('logo')->store('clients', 'public');

        $logos = $this->getLogos();
        $logos[] = [
            'id' => (string) Str::uuid(),
            'url' => Storage::url($path),
            'name' => $request->name,
            'short' => $request->short ?: $request->name,
        ];

        $this->saveLogos($logos);

        return response()->json([
            'success' => true,
            'message' => 'Client berhasil ditambahkan',
        ], 201);
    }

    // Route: PUT /master/client-logos/{id}
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'short' => 'nullable|string|max:100',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $logos = $this->getLogos();
        $index = collect($logos)->search(fn ($logo) => $logo['id'] === $id);

        if ($index === false) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $logos[$index]['name'] = $request->name;
        $logos[$index]['short'] = $request->short ?: $request->name;

        if ($request->hasFile('logo')) {
            $oldPath = $this->urlToPath($logos[$index]['url']);
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('logo')->store('clients', 'public');
            $logos[$index]['url'] = Storage::url($path);
        }

        $this->saveLogos($logos);

        return response()->json([
            'success' => true,
            'message' => 'Client berhasil diperbarui',
        ]);
    }

    // Route: DELETE /master/client-logos/{id}
    public function destroy(string $id)
    {
        $logos = $this->getLogos();
        $index = collect($logos)->search(fn ($logo) => $logo['id'] === $id);

        if ($index === false) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $oldPath = $this->urlToPath($logos[$index]['url']);
        if ($oldPath && Storage::disk('public')->exists($oldPath)) {
            Storage::disk('public')->delete($oldPath);
        }

        unset($logos[$index]);
        $this->saveLogos($logos);

        return response()->json([
            'success' => true,
            'message' => 'Client berhasil dihapus',
        ]);
    }

    // Route: POST /master/client-logos/reorder
    public function reorder(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|string',
        ]);

        $logos = collect($this->getLogos())->keyBy('id');
        $ordered = [];

        foreach ($request->ids as $id) {
            if ($logos->has($id)) {
                $ordered[] = $logos[$id];
            }
        }

        $this->saveLogos($ordered);

        return response()->json([
            'success' => true,
            'message' => 'Urutan berhasil disimpan',
        ]);
    }
}