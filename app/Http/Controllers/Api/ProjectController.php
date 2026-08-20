<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * GET /api/front/projects
     * Semua project untuk halaman Projects.
     */
    public function index()
    {
        $projects = Project::orderBy('urutan')->get();

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    /**
     * GET /api/front/best-projects
     * Hanya project yang Featured.
     */
    public function featured()
    {
        $projects = Project::where('is_featured', true)
            ->orderBy('urutan')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    /**
     * GET /api/front/projects/{slug}
     */
    public function showBySlug(string $slug)
    {
        $project = Project::where('slug', $slug)->first();

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project,
        ]);
    }

    /**
     * GET /api/master/projects
     * Data untuk admin.
     */
    public function adminIndex()
    {
        return response()->json([
            'success' => true,
            'data' => Project::orderBy('urutan')->get(),
        ]);
    }

    /**
     * GET /api/master/projects/{project}
     */
    public function show(Project $project)
    {
        return response()->json([
            'success' => true,
            'data' => $project,
        ]);
    }

    /**
     * POST /api/master/projects
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url',
            'category' => 'nullable|in:web,mobile',
            'urutan' => 'required|integer',
            'is_featured' => 'nullable|boolean',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(5),
            'description' => $request->description,
            'url' => $request->url,
            'category' => $request->category ?? 'web',
            'urutan' => $request->urutan,
            'is_featured' => $request->boolean('is_featured'),
        ];

        /*
         * Simpan thumbnail ke:
         *
         * storage/app/public/landing/projects
         *
         * sehingga URL frontend:
         *
         * /storage/landing/projects/nama-file.jpg
         */
        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request
                ->file('thumbnail')
                ->store('landing/projects', 'public');
        }

        $project = Project::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Project berhasil ditambahkan',
            'data' => $project,
        ], 201);
    }

    /**
     * PUT /api/master/projects/{project}
     */
    public function update(Request $request, Project $project)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url',
            'category' => 'nullable|in:web,mobile',
            'urutan' => 'required|integer',
            'is_featured' => 'nullable|boolean',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'url' => $request->url,
            'category' => $request->category ?? $project->category ?? 'web',
            'urutan' => $request->urutan,
            'is_featured' => $request->boolean('is_featured'),
        ];

        /*
         * Kalau upload thumbnail baru,
         * hapus thumbnail lama lalu simpan yang baru.
         */
        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail) {
                Storage::disk('public')->delete($project->thumbnail);
            }

            $data['thumbnail'] = $request
                ->file('thumbnail')
                ->store('landing/projects', 'public');
        }

        $project->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Project berhasil diperbarui',
            'data' => $project->fresh(),
        ]);
    }

    /**
     * DELETE /api/master/projects/{project}
     */
    public function destroy(Project $project)
    {
        if ($project->thumbnail) {
            Storage::disk('public')->delete($project->thumbnail);
        }

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project berhasil dihapus',
        ]);
    }
}