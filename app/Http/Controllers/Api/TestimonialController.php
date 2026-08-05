<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // Route: GET /front/testimonials?placement=beranda|services
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
}