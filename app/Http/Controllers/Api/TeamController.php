<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    // Route: GET /front/teams (publik)
    public function index()
    {
        $teams = Team::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $teams,
        ]);
    }

    // Route: POST /master/teams (list dashboard, dipakai komponen paginate)
    public function adminIndex(Request $request)
    {
        $per = $request->per ?? 10;
        $page = $request->page ? $request->page - 1 : 0;

        $data = Team::when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%");
            })
            ->orderBy('order')
            ->paginate($per, ['*'], 'page', $page + 1);

        $data->getCollection()->transform(fn (Team $team) => $this->format($team));

        return response()->json($data);
    }

    // Route: GET /master/teams/{team}
    public function show(Team $team)
    {
        return response()->json([
            'success' => true,
            'team' => $this->format($team),
        ]);
    }

    // Route: POST /master/teams/store
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
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
            'order' => $request->order,
            'is_active' => true,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('teams', 'public');
        }

        $team = Team::create($data);

        return response()->json([
            'success' => true,
            'team' => $this->format($team),
            'message' => 'Team member berhasil disimpan',
        ], 201);
    }

    // Route: PUT /master/teams/{team}
    public function update(Request $request, Team $team)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
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
            'order' => $request->order,
        ];

        if ($request->hasFile('image')) {
            if ($team->image) {
                Storage::disk('public')->delete($team->image);
            }
            $data['image'] = $request->file('image')->store('teams', 'public');
        }

        $team->update($data);

        return response()->json([
            'success' => true,
            'team' => $this->format($team),
            'message' => 'Team member berhasil diperbarui',
        ]);
    }

    // Route: DELETE /master/teams/{team}
    public function destroy(Team $team)
    {
        if ($team->image) {
            Storage::disk('public')->delete($team->image);
        }
        $team->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team member berhasil dihapus',
        ]);
    }

    private function format(Team $team): array
    {
        return [
            'id' => $team->id,
            'uuid' => (string) $team->id,
            'name' => $team->name,
            'position' => $team->position,
            'image' => $team->image,
            'image_url' => $team->image_url,
            'order' => $team->order,
        ];
    }
}
