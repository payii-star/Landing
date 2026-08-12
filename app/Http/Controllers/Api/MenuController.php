<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $device = $request->query('device', 'desktop');
        $column = $device === 'mobile' ? 'show_on_mobile' : 'show_on_desktop';

        $menus = Menu::whereNull('parent_id')
            ->where('is_active', true)
            ->where($column, true)
            ->orderBy('urutan')
            ->with(['children' => function ($q) use ($column) {
                $q->where('is_active', true)
                  ->where($column, true)
                  ->orderBy('urutan');
            }])
            ->get();

        return response()->json([
            'success' => true,
            'data' => $menus,
        ]);
    }

    public function trackClick($menuId)
    {
        $menu = Menu::find($menuId);

        if ($menu) {
            $menu->increment('click_count');
        }

        return response()->json(['success' => true]);
    }

    public function adminIndex(Request $request)
    {
        $per = $request->per ?? 10;
        $page = $request->page ? $request->page - 1 : 0;

        $data = Menu::whereNull('parent_id')
            ->when($request->search, function ($q, $search) {
                $q->where('label', 'like', "%{$search}%");
            })
            ->orderBy('urutan')
            ->paginate($per, ['*'], 'page', $page + 1);

        $data->getCollection()->transform(fn (Menu $menu) => $this->format($menu));

        return response()->json($data);
    }

    public function show(Menu $menu)
    {
        return response()->json([
            'success' => true,
            'menu' => $this->format($menu),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $menu = Menu::create([
            'label' => $request->name,
            'url' => $request->url,
            'urutan' => $request->order,
            'type' => 'link',
            'target' => '_self',
            'visibility' => 'all',
            'is_active' => true,
            'show_on_mobile' => true,
            'show_on_desktop' => true,
        ]);

        return response()->json([
            'success' => true,
            'menu' => $this->format($menu),
            'message' => 'Menu berhasil disimpan',
        ], 201);
    }

    public function update(Request $request, Menu $menu)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $menu->update([
            'label' => $request->name,
            'url' => $request->url,
            'urutan' => $request->order,
        ]);

        return response()->json([
            'success' => true,
            'menu' => $this->format($menu),
            'message' => 'Menu berhasil diperbarui',
        ]);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return response()->json([
            'success' => true,
            'message' => 'Menu berhasil dihapus',
        ]);
    }

    private function format(Menu $menu): array
    {
        return [
            'id' => $menu->id,
            'uuid' => (string) $menu->id,
            'name' => $menu->label,
            'url' => $menu->url,
            'order' => $menu->urutan,
        ];
    }
}