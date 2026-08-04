<template>
  <section class="services-section" v-if="services.length > 0">
    <div class="container-xxl">

      <!-- Header -->
      <div class="services-header">
        <div class="header-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">KEUNGGULAN KAMI</span>
          <span class="eyebrow-line"></span>
        </div>
        <h2 class="section-title">Kenapa Memilih Kami?</h2>
        <p class="section-subtitle">Fitur unggulan yang dirancang khusus untuk mempercepat dan mempermudah alur kerja bisnis Anda setiap harinya.</p>
      </div>

      <!-- Grid -->
      <div class="services-grid">
        <div
          v-for="service in services"
          :key="service.id"
          class="service-card"
        >
          <!-- Icon -->
          <div class="icon-wrapper">
            <img
              v-if="service.icon"
              :src="getImageUrl(service.icon)"
              :alt="service.title"
              class="service-icon"
            />

            <svg v-else-if="getIconType(service.title) === 'consult'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>

            <svg v-else-if="getIconType(service.title) === 'web'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>

            <svg v-else-if="getIconType(service.title) === 'mobile'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>

            <svg v-else-if="getIconType(service.title) === 'software'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>

            <svg v-else-if="getIconType(service.title) === 'network'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="5" cy="6" r="2.5" />
              <circle cx="19" cy="6" r="2.5" />
              <circle cx="12" cy="18" r="2.5" />
              <line x1="7" y1="7.5" x2="10.3" y2="16" />
              <line x1="17" y1="7.5" x2="13.7" y2="16" />
            </svg>

            <svg v-else-if="getIconType(service.title) === 'api'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>

            <svg v-else-if="getIconType(service.title) === 'infotech'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="13" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>

            <svg v-else-if="getIconType(service.title) === 'ecommerce'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="18" cy="21" r="1.5" />
              <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" />
            </svg>

            <svg v-else-if="getIconType(service.title) === 'hardware'" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="6" width="12" height="12" rx="1.5" />
              <line x1="9" y1="2" x2="9" y2="6" /><line x1="15" y1="2" x2="15" y2="6" />
              <line x1="9" y1="18" x2="9" y2="22" /><line x1="15" y1="18" x2="15" y2="22" />
              <line x1="2" y1="9" x2="6" y2="9" /><line x1="2" y1="15" x2="6" y2="15" />
              <line x1="18" y1="9" x2="22" y2="9" /><line x1="18" y1="15" x2="22" y2="15" />
            </svg>
          </div>

          <!-- Judul + deskripsi -->
          <div class="card-body">
            <h3 class="card-title">{{ service.title }}</h3>
            <p class="card-desc">{{ service.description }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { mockServices } from '@/mocks/landingMock';

// Diisi mockServices dari awal (bukan array kosong) supaya section langsung
// kelihatan lengkap saat halaman dibuka, tidak nunggu fetch selesai dulu.
// Kalau backend berhasil, isinya akan ditimpa data asli di fetchServices().
const services = ref([...mockServices]);

// Sama seperti pola di stores/landing.ts — bisa dimatikan lewat .env kalau perlu
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK !== "false";

// Icon fallback dipilih berdasarkan kata kunci di judul layanan —
// jadi kalau backend belum kirim field icon, tetap tampil icon yang relevan
// (bukan kotak generik yang sama untuk semua card).
const getIconType = (title = '') => {
  const t = title.toLowerCase();
  if (t.includes('konsultasi')) return 'consult';
  if (t.includes('informasi teknologi')) return 'infotech'; // cek dulu sebelum 'web'
  if (t.includes('e-commerce') || t.includes('ecommerce')) return 'ecommerce';
  if (t.includes('hardware')) return 'hardware';
  if (t.includes('web')) return 'web';
  if (t.includes('mobile') || t.includes('aplikasi')) return 'mobile';
  if (t.includes('network') || t.includes('jaringan')) return 'network';
  if (t.includes('api') || t.includes('integrasi')) return 'api';
  if (t.includes('software') || t.includes('engineering') || t.includes('analysis')) return 'software';
  return 'default';
};

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const backendUrl = 'http://localhost:8000';
  if (path.includes('storage/')) {
    return path.startsWith('/') ? `${backendUrl}${path}` : `${backendUrl}/${path}`;
  } else {
    return path.startsWith('/') ? `${backendUrl}/storage${path}` : `${backendUrl}/${path}`;
  }
};

const fetchServices = async () => {
  try {
    const response = await axios.get('/front/services');
    services.value = response.data;
  } catch (error) {
    console.error('❌ Gagal memuat layanan:', error);

    if (USE_MOCK_FALLBACK) {
      console.warn('⚠️ Pakai mockServices — backend belum tersedia. JANGAN lupa dicabut sebelum production.');
      services.value = [...mockServices];
    }
  }
};

onMounted(() => fetchServices());
</script>

<style scoped>
.services-section {
  padding: 100px 24px 110px;
  background: transparent;
  position: relative;
  z-index: 10;
}

/* Header */
.services-header {
  text-align: center;
  margin-bottom: 64px;
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}
.header-eyebrow {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; margin-bottom: 20px;
}
.eyebrow-line {
  height: 1px; width: 40px;
  background: rgba(255,255,255,0.2);
}
.eyebrow-line:last-child { transform: scaleX(-1); }
.eyebrow-text {
  font-size: 0.68rem; font-weight: 800;
  letter-spacing: 0.18em; color: #94a3b8; text-transform: uppercase;
}
.section-title {
  font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800;
  color: #e2eaff; margin: 0 0 16px;
  letter-spacing: -0.03em; line-height: 1.15;
}
.section-subtitle {
  font-size: 1rem; color: #5c6e96; line-height: 1.7; margin: 0;
}

/* Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto;
}

/* Card — smooth zoom saja, tanpa warna/angka/emoji */
.service-card {
  background: rgba(12, 18, 38, 0.85);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 28px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  cursor: default;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: scale(1.03);
}

/* Icon — netral, satu warna untuk semua card */
.icon-wrapper {
  width: 52px; height: 52px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: #e2eaff;
}
.service-icon {
  width: 26px; height: 26px; object-fit: contain;
}
img.service-icon {
  filter: brightness(0) invert(1);
}

/* Body */
.card-body { display: flex; flex-direction: column; gap: 12px; }
.card-title {
  font-size: 1.25rem; font-weight: 700;
  color: #f1f5f9; margin: 0;
  letter-spacing: -0.01em; line-height: 1.3;
}
.card-desc {
  font-size: 0.9rem; color: #4b5e7a;
  line-height: 1.7; margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .services-section { padding: 72px 16px 80px; }
  .section-title { font-size: 1.9rem; }
  .services-grid { grid-template-columns: 1fr; gap: 14px; }
  .service-card { padding: 24px 22px 28px; }
}
@media (max-width: 480px) {
  .services-section { padding: 56px 14px 64px; }
  .section-title { font-size: 1.6rem; }
  .services-header { margin-bottom: 40px; }
}
@media (max-width: 360px) {
  .section-title { font-size: 1.4rem; }
  .service-card { padding: 20px 16px 24px; }
  .card-title { font-size: 1.1rem; }
}
@media (min-width: 1024px) {
  .services-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
