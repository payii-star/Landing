<?php

namespace Database\Seeders;

use App\Models\LandingContent;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        $about = [
            'about_title' => 'Tentang Kami',
            'about_subtitle' => 'Kami Profesional Software Developer Menyediakan Solusi Untuk Kebutuhan Anda.',
            'about_description' => "CV. MCFLYON TEKNOLOGI INDONESIA adalah perusahaan swasta nasional yang bergerak di bidang pembuatan aplikasi serta perancangan sistem yang terintegrasi. Berdiri secara resmi pada awal Januari 2018, didukung tim dengan SDM yang unggul dan berkualitas.",
            'about_vision' => 'Menjadi perusahaan teknologi informasi yang berdaya saing dengan memberikan layanan dan solusi terbaik bagi customer dan stakeholder.',
            'about_mission' => json_encode([
                'Memberikan pelayanan terbaik demi tercapainya kepuasan pelanggan dengan jaminan kualitas pekerjaan, kecepatan, ketepatan, dan harga yang kompetitif.',
                'Meningkatkan benefit dan value bagi konsumen dan stakeholder.',
                'Mengoptimalkan penggunaan teknologi yang handal, aman, dan menguntungkan.',
                'Meningkatkan kemampuan dan mengoptimalkan pengelolaan sumber daya manusia yang unggul dan dapat dipercaya.',
                'Mengembangkan riset yang terpadu, berkesinambungan, dan terarah untuk meningkatkan kompetensi di dalam industri TI.',
            ]),
            'about_image' => null,
            'about_features' => json_encode([
                'Pelayanan yang diberikan selalu prima',
                'Proses pemesanan dilakukan cepat dan tepat waktu',
                'Harga bersaing namun jaminan kualitas dan mutu terbaik',
                'Aplikasi yang kami buat bisa custom sesuai kebutuhan Anda',
                'Aplikasi yang kami kembangkan bisa terintegrasi dengan aplikasi lain',
            ]),
        ];

        foreach ($about as $key => $value) {
            LandingContent::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'type' => 'text']
            );
        }
    }
}