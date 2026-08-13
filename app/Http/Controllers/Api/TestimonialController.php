<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    // Route: GET /front/testimonials?placement=beranda|services (publik)
    public function index(Request $request)
    {
        $query = Testimonial::where('is_active', true);

        if ($request->filled('placement')) {
            $query->where('placement', $request->query('placement'));
        }

        $testimonials = $query->orderBy('urutan')->get();

        return response()->json([
            'success' => true,
            'data' => $testimonials,
        ]);
    }

    // Route: POST /master/testimonials (list dashboard, dipakai komponen paginate)
    public function adminIndex(Request $request)
    {
        $per = $request->per ?? 10;
        $page = $request->page ? $request->page - 1 : 0;

        $data = Testimonial::when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%");
            })
            ->orderBy('urutan')
            ->paginate($per, ['*'], 'page', $page + 1);

        $data->getCollection()->transform(fn (Testimonial $testimonial) => $this->format($testimonial));

        return response()->json($data);
    }

    // Route: GET /master/testimonials/{testimonial}
    public function show(Testimonial $testimonial)
    {
        return response()->json([
            'success' => true,
            'testimonial' => $this->format($testimonial),
        ]);
    }

    // Route: POST /master/testimonials/store
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
    'name' => 'required|string|max:255',
    'position' => 'required|string|max:255',
    'message' => 'required|string',
    'placement' => 'required|in:beranda,services',
    'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
    'name' => $request->name,
    'position' => $request->position,
    'content' => $request->message,
    'placement' => $request->placement,
    'is_active' => true,
    // Testimonial baru ditaruh paling akhir urutan tampil.
    'urutan' => Testimonial::max('urutan') + 1,
];

        if ($request->hasFile('photo')) {
            $data['avatar'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial = Testimonial::create($data);

        return response()->json([
            'success' => true,
            'testimonial' => $this->format($testimonial),
            'message' => 'Testimonial berhasil disimpan',
        ], 201);
    }

    // Route: PUT /master/testimonials/{testimonial}
    public function update(Request $request, Testimonial $testimonial)
    {
        $validator = Validator::make($request->all(), [
    'name' => 'required|string|max:255',
    'position' => 'required|string|max:255',
    'message' => 'required|string',
    'placement' => 'required|in:beranda,services',
    'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
            'name' => $request->name,
            'position' => $request->position,
            'content' => $request->message,
            'placement' => $request->placement,
        ];

        if ($request->hasFile('photo')) {
            if ($testimonial->avatar) {
                Storage::disk('public')->delete($testimonial->avatar);
            }
            $data['avatar'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial->update($data);

        return response()->json([
            'success' => true,
            'testimonial' => $this->format($testimonial),
            'message' => 'Testimonial berhasil diperbarui',
        ]);
    }

    // Route: DELETE /master/testimonials/{testimonial}
    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->avatar) {
            Storage::disk('public')->delete($testimonial->avatar);
        }
        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Testimonial berhasil dihapus',
        ]);
    }

    private function format(Testimonial $testimonial): array
    {
        return [
            'id' => $testimonial->id,
            'uuid' => (string) $testimonial->id,
            'name' => $testimonial->name,
            'position' => $testimonial->position,
            'message' => $testimonial->content,
            'photo' => $testimonial->avatar,
            'order' => $testimonial->urutan,
            'placement' => $testimonial->placement,
        ];
    }
}
