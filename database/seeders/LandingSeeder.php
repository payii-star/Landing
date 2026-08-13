<?php

namespace Database\Seeders;

use App\Models\LandingContent;
use App\Models\Menu;
use App\Models\FooterSetting;
use App\Models\FooterSocial;
use Illuminate\Database\Seeder;

class LandingSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedContent();
        $this->seedMenus();
        $this->seedFooter();
    }

    private function seedContent(): void
    {
        $content = [
            'app_name' => 'Mcflyon Teknologi Indonesia',
            'logo' => '/media/logo/logo-placeholder.png',
            'description' => 'Perusahaan swasta nasional yang bergerak di bidang pembuatan aplikasi serta perancangan sistem yang terintegrasi.',
            'email' => 'admin@mcflyon.co.id',
            'whatsapp' => '6285174323674',
            'phone' => '0897-7266-144',
            'address' => 'JL. Dk. Bungkal no 25b Gang II RT.010 RW.003 Kel. Sambikerep Kec. Sambikerep Kota Surabaya',
            'hero_title' => "Konsultasi IT &\nPembuatan Aplikasi\nUntuk Bisnis Anda",
            'hero_desc' => 'Kami membantu merancang dan membangun sistem terintegrasi — dari konsultasi, pengembangan aplikasi, hingga infrastruktur jaringan.',
            'cta_primary_label' => 'Konsultasi Sekarang',
            'cta_primary_url' => '/contact',
            'cta_secondary_label' => 'Lihat Proyek Kami',
            'cta_secondary_url' => '/projects',
            'proof_text' => 'Dipercaya oleh berbagai instansi & klien di Indonesia',
            'contact_hero_title' => 'Hubungi Kami',
            'contact_hero_subtitle' => 'Punya kebutuhan sistem atau ingin konsultasi? Tim kami siap membantu.',
            'contact_maps_url' => '',
            'client_logos' => json_encode([
                ['url' => '/media/clients/pemprov-jatim.png', 'name' => 'Pemerintah Provinsi Jawa Timur', 'short' => 'Pemprov Jatim'],
                ['url' => '/media/clients/pemkab-lamongan.png', 'name' => 'Pemerintah Kabupaten Lamongan', 'short' => 'Pemkab Lamongan'],
                ['url' => '/media/clients/pemkab-halmahera-timur.png', 'name' => 'Pemerintah Kabupaten Halmahera Timur', 'short' => 'Pemkab Halmahera Timur'],
                ['url' => '/media/clients/kemenhub-ri.png', 'name' => 'Kementerian Perhubungan RI', 'short' => 'Kemenhub RI'],
                ['url' => '/media/clients/pemkab-tulungagung.png', 'name' => 'Pemerintah Kabupaten Tulungagung', 'short' => 'Pemkab Tulungagung'],
                ['url' => '/media/clients/pemkab-trenggalek.png', 'name' => 'Pemerintah Kabupaten Trenggalek', 'short' => 'Pemkab Trenggalek'],
                ['url' => '/media/clients/pemkab-lumajang.png', 'name' => 'Pemerintah Kabupaten Lumajang', 'short' => 'Pemkab Lumajang'],
                ['url' => '/media/clients/pemkab-gresik.png', 'name' => 'Pemerintah Kabupaten Gresik', 'short' => 'Pemkab Gresik'],
                ['url' => '/media/clients/pemkab-blitar.png', 'name' => 'Pemerintah Kabupaten Blitar', 'short' => 'Pemkab Blitar'],
                ['url' => '/media/clients/pemkab-bangkalan.png', 'name' => 'Pemerintah Kabupaten Bangkalan', 'short' => 'Pemkab Bangkalan'],
            ]),
            'ceo_name' => 'Fahrur Rozi',
              'ceo_position' => 'CEO & CTO',
              'ceo_comment' => 'Menjadi perusahaan teknologi informasi yang berdaya saing dengan memberikan layanan dan solusi yang terbaik bagi customer dan stakeholder.',
            'projects_page_label' => 'PORTOFOLIO KAMI',
            'projects_page_title' => 'Proyek yang Telah Kami Kerjakan',
            'projects_page_subtitle' => 'Kumpulan proyek yang telah kami bangun bersama klien dari berbagai latar belakang industri.',
        ];

        foreach ($content as $key => $value) {
            LandingContent::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'type' => 'text']
            );
        }
    }

    private function seedMenus(): void
    {
        $menus = [
            ['label' => 'Beranda', 'mobile_label' => 'Home', 'url' => '/', 'urutan' => 1],
            ['label' => 'Tentang Kami', 'mobile_label' => 'Tentang', 'url' => '/about', 'urutan' => 2],
            ['label' => 'Layanan', 'mobile_label' => 'Layanan', 'url' => '/services', 'urutan' => 3],
            ['label' => 'Proyek', 'mobile_label' => 'Proyek', 'url' => '/projects', 'urutan' => 4],
            ['label' => 'Kontak', 'mobile_label' => 'Kontak', 'url' => '/contact', 'urutan' => 5],
            ['label' => 'Masuk', 'url' => '/sign-in', 'type' => 'button-primary', 'visibility' => 'guest', 'urutan' => 6],
        ];

        foreach ($menus as $menu) {
            Menu::updateOrCreate(
                ['label' => $menu['label']],
                array_merge([
                    'type' => 'link',
                    'target' => '_self',
                    'visibility' => 'all',
                    'is_active' => true,
                    'has_dropdown' => false,
                    'show_on_mobile' => true,
                    'show_on_desktop' => true,
                ], $menu)
            );
        }
    }

    private function seedFooter(): void
    {
        FooterSetting::updateOrCreate(
            ['company_name' => 'Mcflyon Teknologi Indonesia'],
            [
                'description' => 'Konsultan Informasi Teknologi | Jasa Pembuatan Aplikasi | Pembuatan Website.',
                'address' => 'JL. Dk. Bungkal no 25b Gang II RT.010 RW.003 Kel. Sambikerep Kec. Sambikerep Kota Surabaya',
                'email' => 'admin@mcflyon.co.id',
                'phone' => '0897-7266-144', // [PERLU KONFIRMASI] — update kalau sudah fix
                'copyright' => '© ' . date('Y') . ' Mcflyon Teknologi Indonesia. All rights reserved.',
            ]
        );

        FooterSocial::updateOrCreate(
            ['platform' => 'Instagram'],
            ['url' => 'https://www.instagram.com/mcflyon.id/', 'urutan' => 1]
        );
    }
}