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
 * ============================================================
 */

// ── 1. CONTENT UTAMA (Navbar/Hero — endpoint /front/content) ──
export const mockContent = {
  app_name: "Mcflyon Teknologi Indonesia",
  logo: "/media/logo/logo-placeholder.png",
  description:
    "Perusahaan swasta nasional yang bergerak di bidang pembuatan aplikasi serta perancangan sistem yang terintegrasi.",
  email: "info@mcflyon.co.id", // [TENTATIF]
  telepon: "031-99165759", // dari Instagram resmi @mcflyon.id [SIAP]
  alamat: "Surabaya, Jawa Timur", // [TENTATIF] alamat lengkap belum terkonfirmasi

  // Field untuk LandingHero.vue [TENTATIF — copy belum final]
  hero_title: "Konsultasi IT &\nPembuatan Aplikasi\nUntuk Bisnis Anda",
  hero_desc:
    "Kami membantu merancang dan membangun sistem terintegrasi — dari konsultasi, pengembangan aplikasi, hingga infrastruktur jaringan.",
  cta_primary_label: "Konsultasi Sekarang",
  cta_primary_url: "/contact",
  cta_secondary_label: "Lihat Proyek Kami",
  cta_secondary_url: "/projects",
  proof_text: "Dipercaya oleh berbagai instansi & klien di Indonesia",
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
    address: "Surabaya, Jawa Timur", // [TENTATIF]
    email: "info@mcflyon.co.id", // [TENTATIF]
    phone: "031-99165759",
    copyright: `© ${new Date().getFullYear()} Mcflyon Teknologi Indonesia. All rights reserved.`,
  },
  socials: [
    { id: 1, platform: "Instagram", url: "https://www.instagram.com/mcflyon.id/" },
  ],
};

// ── 4. TESTIMONIALS (endpoint /front/testimonials) [TENTATIF — isi karangan, dummy] ──
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
    // Nama & jabatan di bawah ini KARANGAN (contoh dari develop awal), BUKAN
    // klien asli — jangan dipublish sebelum dikonfirmasi ke pembimbing.
    // Khusus dipakai di section testimonial Beranda (LandingTestimonials.vue).
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
  image: string | null;
  features: string[];
}

export const mockAbout: AboutData = {
  title: "Tentang Kami",
  subtitle:
    "Kami Profesional Software Developer Menyediakan Solusi Untuk Kebutuhan Anda.",
  description:
    "CV. MCFLYON TEKNOLOGI INDONESIA adalah Software Developer yang termotivasi untuk memberikan solusi dalam setiap masalah maupun bisnis.\n\nMemiliki tim dengan SDM yang unggul dan berkualitas dapat menjawab setiap permasalahan yang ada, hingga membantu mengembangkan bisnis Anda meningkat pesat.",
  image: null,
  features: [
    "Tim berpengalaman & profesional",
    "Solusi teknologi berbasis kebutuhan bisnis",
    "Support & maintenance jangka panjang",
    "Desain modern & performa optimal",
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
    title: "Konsultasi IT & Bisnis",
    description: "Analisis kebutuhan teknologi untuk mendukung pertumbuhan bisnis Anda.",
    icon: null,
    order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: "Pengembangan Website",
    description: "Pembuatan website custom, company profile, hingga sistem berbasis web.",
    icon: null,
    order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: "Pengembangan Aplikasi Mobile",
    description: "Aplikasi Android & iOS sesuai kebutuhan operasional bisnis Anda.",
    icon: null,
    order: 3,
    is_active: true,
  },
  {
    id: 4,
    title: "Software Analysis & Engineering",
    description: "Analisis dan perancangan sistem perangkat lunak yang terstruktur.",
    icon: null,
    order: 4,
    is_active: true,
  },
  {
    id: 5,
    title: "Network Engineering",
    description: "Instalasi dan konfigurasi infrastruktur jaringan yang stabil dan aman.",
    icon: null,
    order: 5,
    is_active: true,
  },
  {
    id: 6,
    title: "REST API & Integrasi Sistem",
    description: "Pengembangan API untuk menghubungkan berbagai sistem/aplikasi.",
    icon: null,
    order: 6,
    is_active: true,
  },
];
