<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;

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
}