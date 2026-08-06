<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    protected $fillable = ['icon', 'statistic', 'label', 'urutan', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}