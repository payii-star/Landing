<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = [
        'parent_id', 'label', 'mobile_label', 'url', 'type', 'target',
        'visibility', 'is_active', 'has_dropdown', 'show_on_mobile',
        'show_on_desktop', 'urutan', 'icon_class', 'custom_class',
        'badge_text', 'badge_color', 'rel_attribute', 'click_count',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'has_dropdown' => 'boolean',
        'show_on_mobile' => 'boolean',
        'show_on_desktop' => 'boolean',
    ];

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('urutan');
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }
}