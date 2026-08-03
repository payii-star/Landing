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
  client_logos: [
    { url: "/media/clients/client-placeholder-1.png", name: "[Klien 1 — perlu dikonfirmasi]" },
    { url: "/media/clients/client-placeholder-2.png", name: "[Klien 2 — perlu dikonfirmasi]" },
    { url: "/media/clients/client-placeholder-3.png", name: "[Klien 3 — perlu dikonfirmasi]" },
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
    address: "Surabaya, Jawa Timur", // [TENTATIF]
    email: "info@mcflyon.co.id", // [TENTATIF]
    phone: "031-99165759",
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
  { id: 1, icon: "briefcase", statistic: "10+", label: "Proyek Selesai" },
  { id: 2, icon: "users", statistic: "8+", label: "Klien Terpercaya" },
  { id: 3, icon: "calendar", statistic: "3+", label: "Tahun Pengalaman" },
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
    // asli (seizin beliau) sebelum publish, jangan biarkan foto orang lain
    // ditempel dengan nama beliau.
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
  email: "info@mcflyon.co.id", // [TENTATIF]
  whatsapp: "6231991657590", // dari nomor telepon resmi 031-99165759, format WA — [TENTATIF, cek ulang]
  phone: "031-99165759", // [SIAP] dari Instagram resmi @mcflyon.id
  address: "Surabaya, Jawa Timur", // [TENTATIF] alamat lengkap belum terkonfirmasi
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
// Dipakai oleh LandingClientLogos.vue. Logo di bawah ini PLACEHOLDER murni
// (path belum tentu ada filenya) — perlu logo asli klien yang boleh dipublikasikan,
// dikonfirmasi dulu ke pembimbing (etika menampilkan logo klien tanpa izin).
export interface ClientLogo {
  url: string;
  name: string;
}

export const mockClientLogos: ClientLogo[] = [
  { url: "/media/clients/client-placeholder-1.png", name: "[Klien 1 — perlu dikonfirmasi]" },
  { url: "/media/clients/client-placeholder-2.png", name: "[Klien 2 — perlu dikonfirmasi]" },
  { url: "/media/clients/client-placeholder-3.png", name: "[Klien 3 — perlu dikonfirmasi]" },
];

// ── 10. BEST PROJECTS (endpoint /front/best-projects) [TENTATIF — cuma SIPALAPA yang siap] ──
// Dipakai oleh LandingBestProject.vue (Home). `link_project` = link eksternal ke
// website/demo proyek (bukan halaman internal), makanya tombolnya target="_blank".
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
    title: "SIPALAPA", // [SIAP] satu-satunya proyek yang datanya terkonfirmasi
    image: "/media/projects/sipalapa-placeholder.png", // [TENTATIF] belum ada file asli
    description:
      "Sistem informasi yang dikembangkan untuk mendukung proses administrasi dan pelayanan secara terintegrasi.", // [TENTATIF]
    link_project: "", // [TENTATIF] belum ada link publik, kosongkan dulu
  },
  {
    id: 2,
    title: "[Proyek 2 — perlu dikonfirmasi]",
    image: "/media/projects/project-placeholder-2.png",
    description: "[Deskripsi proyek — perlu dikonfirmasi]",
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

// ── 12. PROJECTS LIST (endpoint SEHARUSNYA /front/best-projects juga — PERLU DIKONFIRMASI
// ke Tim 2, karena stores/project.ts saat ini masih pakai /landing/projects, endpoint
// LAMA yang menurut briefing seharusnya tidak dipakai lagi. Field `slug` dipakai untuk
// link detail internal (/projects/:slug) — beda dari BestProject yang pakai
// link_project (link eksternal). ──
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
    title: "SIPALAPA", // [SIAP]
    description:
      "Sistem informasi yang dikembangkan untuk mendukung proses administrasi dan pelayanan secara terintegrasi.", // [TENTATIF]
    image: "/media/projects/sipalapa-placeholder.png",
    slug: "sipalapa",
  },
  {
    id: 2,
    title: "[Proyek 2 — perlu dikonfirmasi]",
    description: "[Deskripsi proyek — perlu dikonfirmasi]",
    image: "/media/projects/project-placeholder-2.png",
    slug: "proyek-2",
  },
];