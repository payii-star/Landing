<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'name', 'position', 'avatar', 'content',
        'rating', 'urutan', 'is_active', 'placement',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}