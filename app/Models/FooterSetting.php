<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $fillable = [
        'company_name', 'description', 'address', 'email', 'phone', 'copyright',
    ];
}