/**
 * ============================================================
 * DUMMY DATA TERPUSAT — TIM LANDING PAGE
 * Perusahaan: CV. Mcflyon Teknologi Indonesia (mcflyon.co.id)
 * ============================================================
 * File ini dipakai SEMENTARA sampai backend Tim 2 selesai.
 *
 * PENTING soal isi data: data seed lama di database masih berisi
 * identitas "e-SAKIP DLH / Dinas Lingkungan Hidup Jatim" — itu bukan
 * identitas perusahaan ini. Isi di file ini sudah disesuaikan ke
 * identitas Mcflyon berdasarkan data publik — TAPI beberapa detail
 * (alamat lengkap, email resmi, daftar tim, statistik, hero copy)
 * masih [TENTATIF] dan perlu dikonfirmasi ke pembimbing/HR.
 *
 * [SIAP]     -> field sudah dikonfirmasi dari kode asli / sumber publik
 * [TENTATIF] -> boleh disesuaikan saat develop, kabari tim kalau berubah
 *
 * UPDATE (Chika): berdasarkan Company Profile PDF resmi Mcflyon, "SI-LABI"
 * (lihat mockProjects) kemungkinan besar SUMBER ASLI dari data seed
 * "e-SAKIP DLH / Dinas Lingkungan Hidup Jatim" yang disebut di atas — itu
 * proyek asli Mcflyon untuk UPT Laboratorium DLH Provinsi Jatim, bukan sisa
 * data yang salah. Perlu dikabari ke Tim 2 untuk klarifikasi.
 * ============================================================
 */

// ── 1. CONTENT UTAMA (Navbar/Hero — endpoint /front/content) ──
export const mockContent = {
  app_name: "Mcflyon Teknologi Indonesia",
  logo: "/media/logo/logo-placeholder.png",
  description:
    "Perusahaan swasta nasional yang bergerak di bidang pembuatan aplikasi serta perancangan sistem yang terintegrasi.",
  email: "admin@mcflyon.co.id", // [SIAP]
  whatsapp: "6285174323674", // [PERLU KONFIRMASI] beda dari hotline di company profile PDF, belum tentu WA aktif sama
  phone: "0897-7266-144", // [PERLU KONFIRMASI] dari company profile PDF (hotline) — beda dari versi web resmi 085174323674, konfirmasi ke pembimbing sebelum final
  address: "JL. Dk. Bungkal no 25b Gang II RT.010 RW.003 Kel. Sambikerep Kec. Sambikerep Kota Surabaya", // [SIAP] dari company profile PDF, lebih lengkap dari versi sebelumnya

  // Field untuk LandingHero.vue [TENTATIF — copy belum final]
  hero_title: "Konsultasi IT &\nPembuatan Aplikasi\nUntuk Bisnis Anda",
  hero_desc:
    "Kami membantu merancang dan membangun sistem terintegrasi — dari konsultasi, pengembangan aplikasi, hingga infrastruktur jaringan.",
  cta_primary_label: "Konsultasi Sekarang",
  cta_primary_url: "/contact",
  cta_secondary_label: "Lihat Proyek Kami",
  cta_secondary_url: "/projects",
  proof_text: "Dipercaya oleh berbagai instansi & klien di Indonesia",
  // [SIAP] 11 klien resmi dari company profile PDF. `url` sengaja dikosongkan dulu
  // (belum ada file logo yang bisa diekstrak dari PDF) — LandingClientLogos.vue
  // otomatis nampilin badge teks kalau url kosong. `short` = label singkat untuk
  // badge; `name` = nama lengkap untuk tooltip saat hover.
  client_logos: [
    { url: "", name: "Pemerintah Provinsi Jawa Timur", short: "Pemprov Jatim" },
    { url: "", name: "Pemerintah Kabupaten Lamongan", short: "Pemkab Lamongan" },
    { url: "", name: "Pemerintah Kabupaten Halmahera Timur", short: "Pemkab Halmahera Timur" },
    { url: "", name: "Kementerian Perhubungan RI", short: "Kemenhub RI" },
    { url: "", name: "Pemerintah Kabupaten Tulungagung", short: "Pemkab Tulungagung" },
    { url: "", name: "Pemerintah Kabupaten Trenggalek", short: "Pemkab Trenggalek" },
    { url: "", name: "Pemerintah Kabupaten Lumajang", short: "Pemkab Lumajang" },
    { url: "", name: "Pemerintah Kabupaten Gresik", short: "Pemkab Gresik" },
    { url: "", name: "Pemerintah Kabupaten Blitar", short: "Pemkab Blitar" },
    { url: "", name: "Dinas Perpustakaan dan Kearsipan Kabupaten Pamekasan", short: "Disperpusip Pamekasan" },
    { url: "", name: "Pemerintah Kabupaten Bangkalan", short: "Pemkab Bangkalan" },
  ],
};

// ── 2. NAVBAR MENU (endpoint /front/navbar?device=mobile|desktop) [SIAP] ──
export const mockNavbar = [
  {
    id: 1,
    label: "Beranda",
    mobile_label: "Home",
    url: "/",
    type: "link" as const,
    target: "_self" as const,
    visibility: "all" as const,
    is_active: true,
    has_dropdown: false,
    show_on_mobile: true,
    show_on_desktop: true,
    urutan: 1,
    icon_class: "",
    custom_class: "",
    badge_text: "",
    badge_color: "",
    rel_attribute: "",
    children: [],
  },
  {
    id: 2,
    label: "Tentang Kami",
    mobile_label: "Tentang",
    url: "/about",
    type: "link" as const,
    target: "_self" as const,
    visibility: "all" as const,
    is_active: true,
    has_dropdown: false,
    show_on_mobile: true,
    show_on_desktop: true,
    urutan: 2,
    children: [],
  },
  {
    id: 3,
    label: "Layanan",
    mobile_label: "Layanan",
    url: "/services",
    type: "link" as const,
    target: "_self" as const,
    visibility: "all" as const,
    is_active: true,
    has_dropdown: false,
    show_on_mobile: true,
    show_on_desktop: true,
    urutan: 3,
    children: [],
  },
  {
    id: 4,
    label: "Proyek",
    mobile_label: "Proyek",
    url: "/projects",
    type: "link" as const,
    target: "_self" as const,
    visibility: "all" as const,
    is_active: true,
    has_dropdown: false,
    show_on_mobile: true,
    show_on_desktop: true,
    urutan: 4,
    children: [],
  },
  {
    id: 5,
    label: "Kontak",
    mobile_label: "Kontak",
    url: "/contact",
    type: "link" as const,
    target: "_self" as const,
    visibility: "all" as const,
    is_active: true,
    has_dropdown: false,
    show_on_mobile: true,
    show_on_desktop: true,
    urutan: 5,
    children: [],
  },
  {
    id: 6,
    label: "Masuk",
    url: "#", // TODO: isi URL sistem Tim 2 kalau nanti dibutuhkan
    type: "button-primary" as const,
    target: "_self" as const,
    visibility: "guest" as const,
    is_active: true,
    has_dropdown: false,
    show_on_mobile: true,
    show_on_desktop: true,
    urutan: 6,
    children: [],
  },
];

// ── 3. FOOTER (endpoint /footer/landing) [SIAP] ──
export const mockFooter = {
  setting: {
    company_name: "Mcflyon Teknologi Indonesia",
    description:
      "Konsultan Informasi Teknologi | Jasa Pembuatan Aplikasi | Pembuatan Website.",
    address: "JL. Dk. Bungkal no 25b Gang II RT.010 RW.003 Kel. Sambikerep Kec. Sambikerep Kota Surabaya", // [SIAP] dari company profile PDF
    email: "admin@mcflyon.co.id", // [SIAP]
    phone: "0897-7266-144", // [PERLU KONFIRMASI] dari company profile PDF (hotline) — beda dari versi web resmi
    copyright: `© ${new Date().getFullYear()} Mcflyon Teknologi Indonesia. All rights reserved.`,
  },
  socials: [
    { id: 1, platform: "Instagram", url: "https://www.instagram.com/mcflyon.id/" },
  ],
};

// ── 4. STATISTICS (endpoint /front/statistics) [TENTATIF — angka masih placeholder] ──
// Angka di bawah ini KARANGAN sebagai placeholder struktur — WAJIB dikonfirmasi
// ke pembimbing/HR sebelum jadi konten final yang dipublikasikan.
// icon pakai nama Font Awesome solid (tanpa prefix "fa-"), karena komponen
// LandingStatistics.vue merender sebagai `fa-${stat.icon}`.
export const mockStatistics = [
  { id: 1, icon: "briefcase", statistic: "10+", label: "Proyek Selesai", is_active: true, order: 1 }, // [PERLU KONFIRMASI] belum ada angka pasti dari pembimbing, dan beda dgn klaim web resmi ("2+ Proyek") — CATATAN: company profile PDF konfirmasi 17 proyek nyata, angka ini perlu direvisi
  { id: 2, icon: "users", statistic: "8+", label: "Klien Terpercaya", is_active: true, order: 2 }, // [PERLU KONFIRMASI] web resmi klaim "15+ Klien" — company profile PDF konfirmasi 11 instansi klien, angka ini perlu direvisi
  { id: 3, icon: "calendar", statistic: "8+", label: "Tahun Pengalaman", is_active: true, order: 3 }, // [SIAP] dari company profile PDF: berdiri resmi Januari 2018 -> ~8 tahun per 2026
];

// ── 4b. TEAM (endpoint /front/teams) [TENTATIF — cuma 1 nama terkonfirmasi publik] ──
// CEO yang terkonfirmasi publik: Aang Kurniawan (Group CEO, dari LinkedIn).
// Anggota lain masih placeholder — perlu daftar struktur tim resmi dari kantor,
// JANGAN publish nama karangan sebagai anggota tim asli.
export interface TeamMemberMock {
  id: number;
  name: string;
  position: string;
  image: string;
  image_url: string;
  order: number;
  is_active: boolean;
}

export const mockTeams: TeamMemberMock[] = [
  {
    id: 1,
    name: "Aang Kurniawan",
    position: "Group CEO",
    image: "/media/team/placeholder.jpg",
    image_url: "/media/team/placeholder.jpg",
    order: 1,
    is_active: true,
  },
  {
    id: 2,
    name: "[Nama — perlu dikonfirmasi]",
    position: "[Jabatan — perlu dikonfirmasi]",
    image: "/media/team/placeholder.jpg",
    image_url: "/media/team/placeholder.jpg",
    order: 2,
    is_active: true,
  },
];

// ── 5. TESTIMONIALS (endpoint /front/testimonials) [TENTATIF — isi karangan, dummy] ──
// Dipakai bersama oleh 2 tampilan: LandingTestimonials.vue (spotlight/carousel di
// Beranda) dan LandingTestimonialsCust.vue (marquee wall di halaman Layanan).
// Skema data HARUS satu sumber (satu endpoint /front/testimonials) biar Tim 2
// tidak perlu bikin 2 backend untuk hal yang sama — pemisahan tampilan dilakukan
// lewat field `placement`, BUKAN lewat fetch/endpoint terpisah.
// PENTING: nama & isi kutipan di bawah ini KARANGAN placeholder — jangan dipakai
// sebagai testimoni asli sebelum dikonfirmasi ke klien/pembimbing yang bersangkutan.
export interface Testimonial {
  id: number;
  name: string;
  position: string; // jabatan / perusahaan, mis. "CEO & CTO"
  avatar: string | null;
  content: string; // isi kutipan testimoni
  rating: number; // 1-5
  order: number;
  is_active: boolean;
  // 'beranda'  -> tampil di LandingTestimonials.vue (carousel spotlight)
  // 'services' -> tampil di LandingTestimonialsCust.vue (marquee klien)
  placement: "beranda" | "services";
}

export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    // PENTING: nama & jabatan ini adalah CEO ASLI perusahaan (dikonfirmasi
    // langsung, bukan karangan seperti tercatat sebelumnya di file ini).
    // avatar masih null -> fallback ke foto acak i.pravatar.cc di
    // LandingTestimonials.vue, itu BUKAN foto beliau -- ganti dengan foto
    // asli (seizin beliau) sebelum publish.
    name: "Fahrur Rozi",
    position: "CEO & CTO",
    avatar: null,
    content:
      "Menjadi perusahaan teknologi informasi yang berdaya saing dengan memberikan layanan dan solusi yang terbaik bagi customer dan stakeholder.",
    rating: 5,
    order: 1,
    is_active: true,
    placement: "beranda",
  },
  {
    id: 2,
    name: "[Nama Klien — perlu dikonfirmasi]",
    position: "[Jabatan/Perusahaan — perlu dikonfirmasi]",
    avatar: null,
    content: "[Kutipan testimoni — perlu dikonfirmasi]",
    rating: 5,
    order: 1,
    is_active: true,
    placement: "services",
  },
  {
    id: 3,
    name: "[Nama Klien — perlu dikonfirmasi]",
    position: "[Jabatan/Perusahaan — perlu dikonfirmasi]",
    avatar: null,
    content: "[Kutipan testimoni — perlu dikonfirmasi]",
    rating: 5,
    order: 2,
    is_active: true,
    placement: "services",
  },
  {
    id: 4,
    name: "[Nama Klien — perlu dikonfirmasi]",
    position: "[Jabatan/Perusahaan — perlu dikonfirmasi]",
    avatar: null,
    content: "[Kutipan testimoni — perlu dikonfirmasi]",
    rating: 5,
    order: 3,
    is_active: true,
    placement: "services",
  },
];

// ── 5. ABOUT (endpoint /front/landing-about) [SIAP — teks sama dgn default lama LandingAbout.vue] ──
// PENTING: teks title/subtitle/description di bawah ini BUKAN karangan baru — ini
// persis teks yang sebelumnya hardcode langsung di ref() dalam LandingAbout.vue.
// Cuma dipindah ke sini biar satu sumber data terpusat, isinya TIDAK diubah.
// `image: null` -> fallback ke foto Unsplash yang sudah ada di getImageUrl().
export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  vision: string;
  mission: string[];
  image: string | null;
  features: string[];
}

export const mockAbout: AboutData = {
  title: "Tentang Kami",
  subtitle:
    "Kami Profesional Software Developer Menyediakan Solusi Untuk Kebutuhan Anda.",
  // [SIAP] disamakan dengan mockContent.description + company profile PDF —
  // sebelumnya dua sumber teks "tentang perusahaan" ini beda kalimat & tidak
  // menyebut tahun berdiri sama sekali.
  description:
    "CV. MCFLYON TEKNOLOGI INDONESIA adalah perusahaan swasta nasional yang bergerak di bidang pembuatan aplikasi serta perancangan sistem yang terintegrasi. Berdiri secara resmi pada awal Januari 2018, didukung tim dengan SDM yang unggul dan berkualitas.",
  // [SIAP] Visi & Misi resmi — disalin persis dari halaman "VISI & MISI" company
  // profile PDF (COMPRO.pdf, hal. 3). Ditampilkan sebagai section tersendiri
  // (card di bawah foto, di kolom teks) di LandingAbout.vue.
  vision:
    "Menjadi perusahaan teknologi informasi yang berdaya saing dengan memberikan layanan dan solusi terbaik bagi customer dan stakeholder.",
  mission: [
    "Memberikan pelayanan terbaik demi tercapainya kepuasan pelanggan dengan jaminan kualitas pekerjaan, kecepatan, ketepatan, dan harga yang kompetitif.",
    "Meningkatkan benefit dan value bagi konsumen dan stakeholder.",
    "Mengoptimalkan penggunaan teknologi yang handal, aman, dan menguntungkan.",
    "Meningkatkan kemampuan dan mengoptimalkan pengelolaan sumber daya manusia yang unggul dan dapat dipercaya.",
    "Mengembangkan riset yang terpadu, berkesinambungan, dan terarah untuk meningkatkan kompetensi di dalam industri TI.",
  ],
  image: null,
  // [SIAP] diganti dari 4 bullet generik ke poin "Keuntungan Jasa dan Produk"
  // resmi di company profile PDF — sebelumnya isinya teks generik lama yang
  // tidak berasal dari PDF/sumber resmi manapun.
  features: [
    "Pelayanan yang diberikan selalu prima",
    "Proses pemesanan dilakukan cepat dan tepat waktu",
    "Harga bersaing namun jaminan kualitas dan mutu terbaik",
    "Aplikasi yang kami buat bisa custom sesuai kebutuhan Anda",
    "Aplikasi yang kami kembangkan bisa terintegrasi dengan aplikasi lain",
  ],
};

// ── 6. SERVICES (endpoint /front/services) [TENTATIF — berdasarkan riset publik] ──
// Dipakai oleh LandingServices.vue (grid "Kenapa Memilih Kami?") dan
// LandingServicesHero.vue (grid layanan di halaman /services).
// Isi 6 layanan ini DITURUNKAN dari sumber publik resmi Mcflyon (bio Instagram
// @mcflyon.id, listing perusahaan di Glints, dan pengalaman kerja mantan karyawan
// di LinkedIn) — bukan karangan bebas tanpa dasar. TAPI tetap perlu dikonfirmasi
// ke pembimbing/Tim 2 sebelum jadi final, karena bukan daftar resmi dari internal.
export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string | null; // null -> fallback ke icon outline netral sesuai kata kunci judul (bukan emoji lagi)
  order: number;
  is_active: boolean;
}

export const mockServices: ServiceItem[] = [
  {
    id: 1,
    title: "Informasi Teknologi",
    description: "Konsultasi dan solusi teknologi informasi sesuai kebutuhan bisnis Anda.", // [TENTATIF] kalimat sendiri, judul dari PDF
    icon: null,
    order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: "Software Asli",
    description: "Pengembangan software original, bukan bajakan, dengan lisensi yang jelas.", // [TENTATIF]
    icon: null,
    order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: "E-Commerce",
    description: "Pembuatan platform jual-beli online untuk mendukung penjualan digital Anda.", // [TENTATIF]
    icon: null,
    order: 3,
    is_active: true,
  },
  {
    id: 4,
    title: "Jasa Konsultasi",
    description: "Pendampingan dan analisis kebutuhan sistem sebelum pengembangan dimulai.", // [TENTATIF]
    icon: null,
    order: 4,
    is_active: true,
  },
  {
    id: 5,
    title: "Pengadaan Hardware",
    description: "Penyediaan perangkat keras (hardware) sesuai kebutuhan infrastruktur IT Anda.", // [TENTATIF]
    icon: null,
    order: 5,
    is_active: true,
  },
  {
    id: 6,
    title: "Web Developer",
    description: "Pembuatan website custom, company profile, hingga sistem berbasis web.", // [TENTATIF]
    icon: null,
    order: 6,
    is_active: true,
  },
];

// ── 7. CONTACT (endpoint /contact/setting) [TENTATIF — nomor WA & alamat perlu dicek ulang] ──
// Dipakai oleh LandingContact.vue. Field `whatsapp` dipakai untuk link wa.me,
// jadi HARUS berupa angka saja (kode negara + nomor, tanpa +/spasi/strip).
export interface ContactSetting {
  hero_title: string;
  hero_subtitle: string;
  email: string;
  whatsapp: string;
  phone: string;
  address: string;
  maps_url: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export const mockContactSetting: ContactSetting = {
  hero_title: "Hubungi Kami",
  hero_subtitle:
    "Punya kebutuhan sistem atau ingin konsultasi? Tim kami siap membantu.",
  email: "admin@mcflyon.co.id", // [SIAP]
  whatsapp: "6285174323674", // [PERLU KONFIRMASI] tiga sumber beda: Instagram, web resmi, PDF — cek mana nomor WA aktif
  phone: "0897-7266-144", // [PERLU KONFIRMASI] dari company profile PDF (hotline) — beda dari web resmi 085174323674 & Instagram 031-99165759
  address: "JL. Dk. Bungkal no 25b Gang II RT.010 RW.003 Kel. Sambikerep Kec. Sambikerep Kota Surabaya", // [SIAP] dari company profile PDF
  maps_url: "", // [TENTATIF] belum ada, kosongkan dulu biar tombol alamat tidak nunjuk ke mana-mana
  socials: {
    instagram: "https://www.instagram.com/mcflyon.id/", // [SIAP]
    // facebook, twitter, linkedin, youtube, tiktok -> sengaja dikosongkan
    // (belum terkonfirmasi ada/tidaknya akun resmi), biar tombol sosmed
    // yang tidak relevan otomatis tidak muncul (LandingContact.vue pakai v-if)
  },
};

// ── 8. CTA (endpoint /front/landing-cta) [TENTATIF — copy karangan, perlu direview] ──
// Dipakai oleh LandingCta.vue. `title` boleh multi-kata; komponen otomatis
// membagi jadi 2 baris & menyorot baris kedua kalau kata > 3.
export interface CtaData {
  title: string;
  description: string;
  button_text: string;
  button_link: string;
}

export const mockCta: CtaData = {
  title: "Siap Mengembangkan Bisnis Anda Bersama Kami",
  description:
    "Konsultasikan kebutuhan sistem atau aplikasi Anda dengan tim kami — gratis, tanpa komitmen.",
  button_text: "Hubungi Kami",
  button_link: "/contact",
};

// ── 9. CLIENT LOGOS (field client_logos di /front/content, ATAU endpoint terpisah — perlu dikonfirmasi ke Tim 2) ──
// Dipakai oleh LandingClientLogos.vue. [SIAP] 11 klien resmi dari company profile
// PDF. `url` dikosongkan (belum ada file logo yang bisa diekstrak dari PDF).
export interface ClientLogo {
  url: string;
  name: string;
  short?: string; // label singkat buat badge kalau logo (url) belum ada
}

// CATATAN: export ini saat ini tidak dipakai komponen manapun (LandingClientLogos.vue
// baca dari mockContent.client_logos, bukan dari sini) — disinkronkan isinya biar
// tidak beda data kalau nanti dipakai/endpoint terpisah jadi kesepakatan final Tim 2.
export const mockClientLogos: ClientLogo[] = [
  { url: "", name: "Pemerintah Provinsi Jawa Timur", short: "Pemprov Jatim" },
  { url: "", name: "Pemerintah Kabupaten Lamongan", short: "Pemkab Lamongan" },
  { url: "", name: "Pemerintah Kabupaten Halmahera Timur", short: "Pemkab Halmahera Timur" },
  { url: "", name: "Kementerian Perhubungan RI", short: "Kemenhub RI" },
  { url: "", name: "Pemerintah Kabupaten Tulungagung", short: "Pemkab Tulungagung" },
  { url: "", name: "Pemerintah Kabupaten Trenggalek", short: "Pemkab Trenggalek" },
  { url: "", name: "Pemerintah Kabupaten Lumajang", short: "Pemkab Lumajang" },
  { url: "", name: "Pemerintah Kabupaten Gresik", short: "Pemkab Gresik" },
  { url: "", name: "Pemerintah Kabupaten Blitar", short: "Pemkab Blitar" },
  { url: "", name: "Dinas Perpustakaan dan Kearsipan Kabupaten Pamekasan", short: "Disperpusip Pamekasan" },
  { url: "", name: "Pemerintah Kabupaten Bangkalan", short: "Pemkab Bangkalan" },
];

// ── 10. BEST PROJECTS (endpoint /front/best-projects) [SIAP] ──
// Dipakai oleh LandingBestProject.vue (Home). Cuma 2 proyek unggulan yang
// ditampilkan di Home — sisa 15 proyek lainnya ada di mockProjects (section 12,
// halaman /projects). `link_project` dikosongkan karena semua proyek ini sistem
// internal instansi pemerintah, tidak ada URL publik.
export interface BestProject {
  id: number;
  title: string;
  image: string;
  description: string;
  link_project: string;
}

export const mockBestProjects: BestProject[] = [
  {
    id: 1,
    title: "E-TPP",
    image: "/media/projects/e-tpp-placeholder.png",
    description:
      "Pemerintah Daerah Kabupaten Halmahera Timur. Mempermudah rekap dan pelaporan tunjangan kinerja pegawai beserta absensi pegawai.",
    link_project: "",
  },
  {
    id: 2,
    title: "SIJAWARA+",
    image: "/media/projects/sijawara-plus-placeholder.png",
    description:
      "Dinas Koperasi Usaha Mikro Kecil dan Menengah Provinsi Jawa Timur. Pengembangan fitur dan konten aplikasi untuk mempercepat pelayanan pelatihan di UPT Pelatihan Koperasi.",
    link_project: "",
  },
];

// ── 11. PROJECTS PAGE HERO (endpoint /projects-page) [TENTATIF — copy karangan] ──
// Dipakai oleh HeroProjects.vue di halaman /projects.
export interface ProjectsPageSetting {
  label: string;
  title: string;
  subtitle: string;
}

export const mockProjectsPageSetting: ProjectsPageSetting = {
  label: "PORTOFOLIO KAMI",
  title: "Proyek yang Telah Kami Kerjakan",
  subtitle:
    "Kumpulan proyek yang telah kami bangun bersama klien dari berbagai latar belakang industri.",
};

// ── 12. PROJECTS LIST (endpoint SEHARUSNYA /front/best-projects juga — PERLU
// DIKONFIRMASI ke Tim 2, karena stores/project.ts saat ini masih pakai
// /landing/projects, endpoint LAMA yang menurut briefing seharusnya tidak
// dipakai lagi. Field `slug` dipakai untuk link detail internal (/projects/:slug).
//
// [SIAP] 15 proyek dari company profile PDF resmi (sisa dari 17 total, 2 sudah
// jadi "featured" di mockBestProjects/Home: E-TPP & SIJAWARA+). Halaman detail
// per-slug (/projects/:slug) BELUM dicek apakah sudah dibuat developer
// sebelumnya — worth diverifikasi sebelum publish, tombol "View Case Study"
// bisa jadi link mati (404) kalau route-nya belum ada. ──
export interface ProjectListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export const mockProjects: ProjectListItem[] = [
  {
    id: 1,
    title: "SIMELA",
    description:
      "Badan Perencanaan Pembangunan Daerah (BAPPEDA) Kabupaten Lamongan. Mempermudah evaluasi Renja, monitoring, evaluasi, dan penyusunan laporan berkala pelaksanaan pembangunan daerah.",
    image: "/media/projects/simela-placeholder.png",
    slug: "simela",
  },
  {
    id: 2,
    title: "E-SPJ",
    description:
      "Pemerintahan Provinsi Jawa Timur (Biro Umum Sekretariat Daerah). Mempercepat proses pelaksanaan SPJ dengan penomoran otomatis dan mempermudah tracking.",
    image: "/media/projects/e-spj-placeholder.png",
    slug: "e-spj",
  },
  {
    id: 3,
    title: "SI-KARESOI",
    description:
      "Dinas Perhubungan, Badan Layanan Umum Politeknik Pelayaran Barombong. Mempermudah pengukuran kinerja dan rekap absensi pegawai untuk pembayaran remunerasi.",
    image: "/media/projects/si-karesoi-placeholder.png",
    slug: "si-karesoi",
  },
  {
    id: 4,
    title: "SI-LABI",
    description:
      "UPT Laboratorium, Dinas Lingkungan Hidup Provinsi Jawa Timur. Mempercepat proses pendaftaran dan pengujian sampel hingga terbitnya sertifikat produk, menggantikan proses manual sebelumnya.",
    image: "/media/projects/si-labi-placeholder.png",
    slug: "si-labi",
  },
  {
    id: 5,
    title: "SI-MANIS",
    description:
      "Badan Perencanaan dan Penelitian Pengembangan Pembangunan Daerah Kabupaten Lamongan (Bapelitbang). Mempermudah pengukuran kinerja dan rekap absensi pegawai untuk pembayaran remunerasi.",
    image: "/media/projects/si-manis-placeholder.png",
    slug: "si-manis",
  },
  {
    id: 6,
    title: "LKR-ESAKIP",
    description:
      "Dinas Pekerjaan Umum Sumber Daya Air (PU SDA). Mempermudah pelaporan IKI, Perjanjian Kinerja, dan pengukuran kinerja per triwulan/tahunan, serta penyusunan laporan LKJIP dan LKR.",
    image: "/media/projects/lkr-esakip-placeholder.png",
    slug: "lkr-esakip",
  },
  {
    id: 7,
    title: "SI-PALAPA (Web)",
    description:
      "Dinas Perpustakaan dan Kearsipan Kabupaten Pamekasan. Aplikasi perpustakaan untuk mempermudah peminjaman buku secara online, terintegrasi dengan Aplikasi Perpustakaan SLIM.",
    image: "/media/projects/si-palapa-placeholder.png",
    slug: "si-palapa",
  },
  {
    id: 8,
    title: "SI-INEM",
    description:
      "BP3IP Jakarta. Mempermudah pengukuran kinerja dan rekap absensi pegawai untuk pembayaran remunerasi.",
    image: "/media/projects/si-inem-placeholder.png",
    slug: "si-inem",
  },
  {
    id: 9,
    title: "SI-PADI",
    description:
      "Dinas Tanaman Pangan, Hortikultura dan Perkebunan. Mempermudah pemantauan laporan luas lahan, luas tanam, dan panen, termasuk harga jual padi, jagung, dan komoditas lainnya.",
    image: "/media/projects/si-padi-placeholder.png",
    slug: "si-padi",
  },
  {
    id: 10,
    title: "SIKENEL",
    description:
      "Dinas Kelautan dan Perikanan Provinsi Jawa Timur. Sistem informasi kenelayanan untuk mempermudah pemberian hibah kepada nelayan dan merekap data secara online.",
    image: "/media/projects/sikenel-placeholder.png",
    slug: "sikenel",
  },
  {
    id: 11,
    title: "SI-ARIF",
    description:
      "Kementerian Perhubungan, Direktorat Jenderal Perkeretaapian. Meningkatkan kualitas kearsipan kereta api dan optimalisasi perlindungan data perkeretaapian.",
    image: "/media/projects/si-arif-placeholder.png",
    slug: "si-arif",
  },
  {
    id: 12,
    title: "SI-RAJA",
    description:
      "BPSDM Kementerian Perhubungan. Aplikasi surat-menyurat untuk mengatur seluruh jenis surat masuk dan keluar, dilengkapi laporan dan jadwal tugas/kerja.",
    image: "/media/projects/si-raja-placeholder.png",
    slug: "si-raja",
  },
  {
    id: 13,
    title: "Mobile SI-PALAPA",
    description:
      "Dinas Perpustakaan dan Kearsipan Kabupaten Pamekasan. Versi aplikasi mobile dari SI-PALAPA untuk mempermudah peminjaman buku, terintegrasi dengan Aplikasi Perpustakaan SLIM.",
    image: "/media/projects/mobile-si-palapa-placeholder.png",
    slug: "mobile-si-palapa",
  },
  {
    id: 14,
    title: "Mobile SIJAWARA+",
    description:
      "Dinas Koperasi Usaha Mikro Kecil dan Menengah Provinsi Jawa Timur. Versi aplikasi mobile dari SIJAWARA+ untuk mempercepat pelayanan pelatihan di UPT Pelatihan Koperasi.",
    image: "/media/projects/mobile-sijawara-plus-placeholder.png",
    slug: "mobile-sijawara-plus",
  },
  {
    id: 15,
    title: "Mobile E-TPP",
    description:
      "Pemerintah Daerah Kabupaten Halmahera Timur. Versi aplikasi mobile dari E-TPP untuk mempermudah rekap dan pelaporan tunjangan kinerja beserta absensi pegawai.",
    image: "/media/projects/mobile-e-tpp-placeholder.png",
    slug: "mobile-e-tpp",
  },
];
