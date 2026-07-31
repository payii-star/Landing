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