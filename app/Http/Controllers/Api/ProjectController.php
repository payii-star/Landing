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
    // Route: GET /front/projects (halaman /projects, 17 item)
    public function index()
    {
        $projects = Project::orderBy('urutan')->get();

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    // Route: GET /front/best-projects (Home, cuma yang featured)
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

    public function showBySlug(string $slug)
    {
        $project = Project::where('slug', $slug)->first();

        if (!$project) {
            return response()->json([
                'message' => 'Project tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project,
        ]);
    }

    public function adminIndex()
    {
        return response()->json([
            'success' => true,
            'data' => Project::orderBy('urutan')->get(),
        ]);
    }

    public function show(Project $project)
    {
        return response()->json([
            'success' => true,
            'data' => $project,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url',
            'urutan' => 'required|integer',
            'is_featured' => 'nullable|boolean',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(5),
            'description' => $request->description,
            'link_project' => $request->url,
            'urutan' => $request->urutan,
            'is_featured' => $request->boolean('is_featured'),
        ];

        if ($request->hasFile('thumbnail')) {
            $data['image'] = $request->file('thumbnail')->store('projects', 'public');
        }

        $project = Project::create($data);

        return response()->json([
            'success' => true,
            'data' => $project,
        ], 201);
    }

    public function update(Request $request, Project $project)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url',
            'urutan' => 'required|integer',
            'is_featured' => 'nullable|boolean',
            'thumbnail' => 'nullable|image|max:2048',
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
            'link_project' => $request->url,
            'urutan' => $request->urutan,
            'is_featured' => $request->boolean('is_featured'),
        ];

        if ($request->hasFile('thumbnail')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $data['image'] = $request->file('thumbnail')->store('projects', 'public');
        }

        $project->update($data);

        return response()->json([
            'success' => true,
            'data' => $project,
        ]);
    }

    public function destroy(Project $project)
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return response()->json(['success' => true]);
    }
}