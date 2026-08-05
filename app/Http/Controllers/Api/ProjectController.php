<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;

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
}