<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'company',
        'phone',
        'message',
        'source',
        'file_path',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}