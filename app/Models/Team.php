<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Team extends Model
{
    protected $fillable = ['name', 'position', 'image', 'order', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // 'image_url' ikut disertakan tiap kali model di-serialize ke JSON,
    // supaya field-nya sama persis dengan TeamMember interface di frontend
    // (resources/js/stores/landing.ts) yang butuh 'image' DAN 'image_url'.
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            // Kalau suatu saat image disimpan sebagai URL penuh (mis. CDN), jangan di-prefix lagi.
            if (Str::startsWith($this->image, ['http://', 'https://'])) {
                return $this->image;
            }

            return asset('storage/' . $this->image);
        }

        // Fallback avatar inisial (bukan broken image icon) selama foto asli
        // belum di-upload ke storage. Konsisten dengan pola fallback yang
        // sudah dipakai di LandingTestimonialsCust.vue.
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name)
            . '&background=3b82f6&color=fff&size=256';
    }
}
