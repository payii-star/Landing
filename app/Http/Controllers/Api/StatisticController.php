<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatisticController extends Controller
{
    public function index()
    {
        $statistics = Statistic::where('is_active', true)
            ->orderBy('urutan')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $statistics,
        ]);
    }

    public function adminIndex()
    {
        return response()->json([
            'success' => true,
            'data' => Statistic::orderBy('urutan')->get(),
        ]);
    }

    public function show(Statistic $statistic)
    {
        return response()->json([
            'success' => true,
            'data' => $statistic,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'icon' => 'nullable|string|max:100',
            'statistic' => 'required|string|max:50',
            'label' => 'required|string|max:255',
            'urutan' => 'required|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $statistic = Statistic::create([
            'icon' => $request->icon,
            'statistic' => $request->statistic,
            'label' => $request->label,
            'urutan' => $request->urutan,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return response()->json([
            'success' => true,
            'data' => $statistic,
        ], 201);
    }

    public function update(Request $request, Statistic $statistic)
    {
        $validator = Validator::make($request->all(), [
            'icon' => 'nullable|string|max:100',
            'statistic' => 'required|string|max:50',
            'label' => 'required|string|max:255',
            'urutan' => 'required|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $statistic->update([
            'icon' => $request->icon,
            'statistic' => $request->statistic,
            'label' => $request->label,
            'urutan' => $request->urutan,
            'is_active' => $request->boolean('is_active'),
        ]);

        return response()->json([
            'success' => true,
            'data' => $statistic,
        ]);
    }

    public function destroy(Statistic $statistic)
    {
        $statistic->delete();

        return response()->json(['success' => true]);
    }
}