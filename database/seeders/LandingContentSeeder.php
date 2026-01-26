<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LandingContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            ['hero_title', 'Solusi Digital Terbaik', 'text'],
            ['hero_desc', 'Kami membantu bisnis Anda berkembang dengan teknologi terkini.', 'text'],
            ['contact_email', 'info@mcflyon.com', 'text'],
            ['contact_phone', '+62 812 3456 7890', 'text'],
            ['about_us', 'McFlyon adalah perusahaan teknologi yang berfokus pada...', 'text'],
        ];

        foreach ($contents as $content) {
            \App\Models\LandingContent::updateOrCreate(
                ['key' => $content[0]], // Cek berdasarkan key
                ['value' => $content[1], 'type' => $content[2]]
            );
        }
    }
}
