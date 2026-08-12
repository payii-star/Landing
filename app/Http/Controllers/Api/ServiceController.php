<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    // Route: GET /front/services (publik)
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('urutan')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ]);
    }

    // Route: POST /master/services (list dashboard, dipakai komponen paginate)
    public function adminIndex(Request $request)
    {
        $per = $request->per ?? 10;
        $page = $request->page ? $request->page - 1 : 0;

        $data = Service::when($request->search, function ($q, $search) {
                $q->where('title', 'like', "%{$search}%");
            })
            ->orderBy('urutan')
            ->paginate($per, ['*'], 'page', $page + 1);

        $data->getCollection()->transform(fn (Service $service) => $this->format($service));

        return response()->json($data);
    }

    // Route: GET /master/services/{service}
    public function show(Service $service)
    {
        return response()->json([
            'success' => true,
            'service' => $this->format($service),
        ]);
    }

    // Route: POST /master/services/store
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order' => 'required|integer',
            'icon' => 'nullable|image|mimes:jpg,jpeg,png,svg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'urutan' => $request->order,
        ];

        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('services', 'public');
        }

        $service = Service::create($data);

        return response()->json([
            'success' => true,
            'service' => $this->format($service),
            'message' => 'Service berhasil disimpan',
        ], 201);
    }

    // Route: PUT /master/services/{service}
    public function update(Request $request, Service $service)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order' => 'required|integer',
            'icon' => 'nullable|image|mimes:jpg,jpeg,png,svg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'urutan' => $request->order,
        ];

        if ($request->hasFile('icon')) {
            if ($service->icon) {
                Storage::disk('public')->delete($service->icon);
            }
            $data['icon'] = $request->file('icon')->store('services', 'public');
        }

        $service->update($data);

        return response()->json([
            'success' => true,
            'service' => $this->format($service),
            'message' => 'Service berhasil diperbarui',
        ]);
    }

    // Route: DELETE /master/services/{service}
    public function destroy(Service $service)
    {
        if ($service->icon) {
            Storage::disk('public')->delete($service->icon);
        }
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service berhasil dihapus',
        ]);
    }

    private function format(Service $service): array
    {
        return [
            'id' => $service->id,
            'uuid' => (string) $service->id,
            'title' => $service->title,
            'description' => $service->description,
            'icon' => $service->icon,
            'order' => $service->urutan,
        ];
    }
}