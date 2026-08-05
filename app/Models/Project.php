<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'image',
        'link_project', 'is_featured', 'urutan',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}