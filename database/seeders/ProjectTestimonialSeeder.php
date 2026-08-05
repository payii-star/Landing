<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Testimonial;
use App\Models\LandingContent;
use Illuminate\Database\Seeder;

class ProjectTestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedProjects();
        $this->seedTestimonials();
        $this->seedLandingCta();
    }

    private function seedProjects(): void
    {
        // 2 featured (tampil di Home)
        $featured = [
            [
                'title' => 'E-TPP',
                'slug' => 'e-tpp',
                'image' => '/media/projects/e-tpp-placeholder.png',
                'description' => 'Pemerintah Daerah Kabupaten Halmahera Timur. Mempermudah rekap dan pelaporan tunjangan kinerja pegawai beserta absensi pegawai.',
                'is_featured' => true,
                'urutan' => 1,
            ],
            [
                'title' => 'SIJAWARA+',
                'slug' => 'sijawara-plus',
                'image' => '/media/projects/sijawara-plus-placeholder.png',
                'description' => 'Dinas Koperasi Usaha Mikro Kecil dan Menengah Provinsi Jawa Timur. Pengembangan fitur dan konten aplikasi untuk mempercepat pelayanan pelatihan di UPT Pelatihan Koperasi.',
                'is_featured' => true,
                'urutan' => 2,
            ],
        ];

        // 15 sisanya (halaman /projects)
        $rest = [
            ['title' => 'SIMELA', 'slug' => 'simela', 'description' => 'Badan Perencanaan Pembangunan Daerah (BAPPEDA) Kabupaten Lamongan. Mempermudah evaluasi Renja, monitoring, evaluasi, dan penyusunan laporan berkala pelaksanaan pembangunan daerah.', 'image' => '/media/projects/simela-placeholder.png'],
            ['title' => 'E-SPJ', 'slug' => 'e-spj', 'description' => 'Pemerintahan Provinsi Jawa Timur (Biro Umum Sekretariat Daerah). Mempercepat proses pelaksanaan SPJ dengan penomoran otomatis dan mempermudah tracking.', 'image' => '/media/projects/e-spj-placeholder.png'],
            ['title' => 'SI-KARESOI', 'slug' => 'si-karesoi', 'description' => 'Dinas Perhubungan, Badan Layanan Umum Politeknik Pelayaran Barombong. Mempermudah pengukuran kinerja dan rekap absensi pegawai untuk pembayaran remunerasi.', 'image' => '/media/projects/si-karesoi-placeholder.png'],
            ['title' => 'SI-LABI', 'slug' => 'si-labi', 'description' => 'UPT Laboratorium, Dinas Lingkungan Hidup Provinsi Jawa Timur. Mempercepat proses pendaftaran dan pengujian sampel hingga terbitnya sertifikat produk, menggantikan proses manual sebelumnya.', 'image' => '/media/projects/si-labi-placeholder.png'],
            ['title' => 'SI-MANIS', 'slug' => 'si-manis', 'description' => 'Badan Perencanaan dan Penelitian Pengembangan Pembangunan Daerah Kabupaten Lamongan (Bapelitbang). Mempermudah pengukuran kinerja dan rekap absensi pegawai untuk pembayaran remunerasi.', 'image' => '/media/projects/si-manis-placeholder.png'],
            ['title' => 'LKR-ESAKIP', 'slug' => 'lkr-esakip', 'description' => 'Dinas Pekerjaan Umum Sumber Daya Air (PU SDA). Mempermudah pelaporan IKI, Perjanjian Kinerja, dan pengukuran kinerja per triwulan/tahunan, serta penyusunan laporan LKJIP dan LKR.', 'image' => '/media/projects/lkr-esakip-placeholder.png'],
            ['title' => 'SI-PALAPA (Web)', 'slug' => 'si-palapa', 'description' => 'Dinas Perpustakaan dan Kearsipan Kabupaten Pamekasan. Aplikasi perpustakaan untuk mempermudah peminjaman buku secara online, terintegrasi dengan Aplikasi Perpustakaan SLIM.', 'image' => '/media/projects/si-palapa-placeholder.png'],
            ['title' => 'SI-INEM', 'slug' => 'si-inem', 'description' => 'BP3IP Jakarta. Mempermudah pengukuran kinerja dan rekap absensi pegawai untuk pembayaran remunerasi.', 'image' => '/media/projects/si-inem-placeholder.png'],
            ['title' => 'SI-PADI', 'slug' => 'si-padi', 'description' => 'Dinas Tanaman Pangan, Hortikultura dan Perkebunan. Mempermudah pemantauan laporan luas lahan, luas tanam, dan panen, termasuk harga jual padi, jagung, dan komoditas lainnya.', 'image' => '/media/projects/si-padi-placeholder.png'],
            ['title' => 'SIKENEL', 'slug' => 'sikenel', 'description' => 'Dinas Kelautan dan Perikanan Provinsi Jawa Timur. Sistem informasi kenelayanan untuk mempermudah pemberian hibah kepada nelayan dan merekap data secara online.', 'image' => '/media/projects/sikenel-placeholder.png'],
            ['title' => 'SI-ARIF', 'slug' => 'si-arif', 'description' => 'Kementerian Perhubungan, Direktorat Jenderal Perkeretaapian. Meningkatkan kualitas kearsipan kereta api dan optimalisasi perlindungan data perkeretaapian.', 'image' => '/media/projects/si-arif-placeholder.png'],
            ['title' => 'SI-RAJA', 'slug' => 'si-raja', 'description' => 'BPSDM Kementerian Perhubungan. Aplikasi surat-menyurat untuk mengatur seluruh jenis surat masuk dan keluar, dilengkapi laporan dan jadwal tugas/kerja.', 'image' => '/media/projects/si-raja-placeholder.png'],
            ['title' => 'Mobile SI-PALAPA', 'slug' => 'mobile-si-palapa', 'description' => 'Dinas Perpustakaan dan Kearsipan Kabupaten Pamekasan. Versi aplikasi mobile dari SI-PALAPA untuk mempermudah peminjaman buku, terintegrasi dengan Aplikasi Perpustakaan SLIM.', 'image' => '/media/projects/mobile-si-palapa-placeholder.png'],
            ['title' => 'Mobile SIJAWARA+', 'slug' => 'mobile-sijawara-plus', 'description' => 'Dinas Koperasi Usaha Mikro Kecil dan Menengah Provinsi Jawa Timur. Versi aplikasi mobile dari SIJAWARA+ untuk mempercepat pelayanan pelatihan di UPT Pelatihan Koperasi.', 'image' => '/media/projects/mobile-sijawara-plus-placeholder.png'],
            ['title' => 'Mobile E-TPP', 'slug' => 'mobile-e-tpp', 'description' => 'Pemerintah Daerah Kabupaten Halmahera Timur. Versi aplikasi mobile dari E-TPP untuk mempermudah rekap dan pelaporan tunjangan kinerja beserta absensi pegawai.', 'image' => '/media/projects/mobile-e-tpp-placeholder.png'],
        ];

        $urutan = 3;
        foreach ($rest as $project) {
            $project['is_featured'] = false;
            $project['urutan'] = $urutan++;
            $featured[] = $project;
        }

        foreach ($featured as $project) {
            Project::updateOrCreate(
                ['slug' => $project['slug']],
                $project
            );
        }
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            [
                'name' => 'Fahrur Rozi',
                'position' => 'CEO & CTO',
                'avatar' => null,
                'content' => 'Menjadi perusahaan teknologi informasi yang berdaya saing dengan memberikan layanan dan solusi yang terbaik bagi customer dan stakeholder.',
                'rating' => 5,
                'urutan' => 1,
                'is_active' => true,
                'placement' => 'beranda',
            ],
            [
                'name' => '[Nama Klien — perlu dikonfirmasi]',
                'position' => '[Jabatan/Perusahaan — perlu dikonfirmasi]',
                'avatar' => null,
                'content' => '[Kutipan testimoni — perlu dikonfirmasi]',
                'rating' => 5,
                'urutan' => 1,
                'is_active' => true,
                'placement' => 'services',
            ],
            [
                'name' => '[Nama Klien — perlu dikonfirmasi]',
                'position' => '[Jabatan/Perusahaan — perlu dikonfirmasi]',
                'avatar' => null,
                'content' => '[Kutipan testimoni — perlu dikonfirmasi]',
                'rating' => 5,
                'urutan' => 2,
                'is_active' => true,
                'placement' => 'services',
            ],
            [
                'name' => '[Nama Klien — perlu dikonfirmasi]',
                'position' => '[Jabatan/Perusahaan — perlu dikonfirmasi]',
                'avatar' => null,
                'content' => '[Kutipan testimoni — perlu dikonfirmasi]',
                'rating' => 5,
                'urutan' => 3,
                'is_active' => true,
                'placement' => 'services',
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(
                ['name' => $t['name'], 'placement' => $t['placement'], 'urutan' => $t['urutan']],
                $t
            );
        }
    }

    private function seedLandingCta(): void
    {
        $cta = [
            'landing_cta_title' => 'Siap Mengembangkan Bisnis Anda Bersama Kami',
            'landing_cta_description' => 'Konsultasikan kebutuhan sistem atau aplikasi Anda dengan tim kami — gratis, tanpa komitmen.',
            'landing_cta_button_text' => 'Hubungi Kami',
            'landing_cta_button_link' => '/contact',
        ];

        foreach ($cta as $key => $value) {
            LandingContent::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'type' => 'text']
            );
        }
    }
}