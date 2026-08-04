<template>
  <section class="services-section" v-if="whyUsItems.length > 0">
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
          v-for="(item, idx) in whyUsItems"
          :key="item.id"
          class="service-card"
        >
          <!-- Icon -->
          <div class="icon-wrapper">
            <!-- 6 icon baru sesuai urutan "Keuntungan Jasa dan Produk" di PDF —
                 dipilih berdasarkan INDEX (bukan keyword judul lagi, karena
                 sumber datanya sekarang array kalimat polos tanpa judul) -->
            <svg v-if="idx === 0" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>

            <svg v-else-if="idx === 1" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 11 14 11 22 21 10 13 10 13 2" />
            </svg>

            <svg v-else-if="idx === 2" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.6 3.24L4 3a1 1 0 0 0-1 1l.24 5.6a2 2 0 0 0 .59 1.4l9.58 9.58a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.82Z" />
              <circle cx="8.5" cy="8.5" r="1.5" />
            </svg>

            <svg v-else-if="idx === 3" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>

            <svg v-else-if="idx === 4" class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
            </svg>

            <svg v-else class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 7V5a2 2 0 0 1 2-2h2" /><path d="M4 17v2a2 2 0 0 0 2 2h2" />
              <path d="M20 7V5a2 2 0 0 0-2-2h-2" /><path d="M20 17v2a2 2 0 0 1-2 2h-2" />
              <line x1="9" y1="12" x2="15" y2="12" />
            </svg>
          </div>

          <!-- Cuma icon + 1 kalimat, tanpa judul terpisah — sesuai poin
               "Keuntungan Jasa dan Produk" di PDF yang memang berupa kalimat
               polos, bukan judul+deskripsi seperti card "6 Layanan" -->
          <div class="card-body">
            <p class="card-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { mockAbout } from '@/mocks/landingMock';

// Section ini isinya "Keuntungan Jasa dan Produk" — data yang SAMA dengan
// mockAbout.features (dipakai juga di halaman About), bukan daftar layanan
// (mockServices) seperti sebelumnya. Dua konten itu beda konsep: mockServices
// = "apa yang kami kerjakan", features ini = "kenapa pilih kami" — makanya
// sekarang disambungkan ke sumber yang benar.
// Statis langsung dari mock (bukan fetch axios terpisah) karena ini bagian
// dari data About yang sama, belum ada endpoint /front/services-nya sendiri
// yang terpisah untuk konten ini.
const whyUsItems = computed(() =>
  mockAbout.features.map((description, idx) => ({ id: idx + 1, description }))
);
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto;
}
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
  flex: 1 1 300px;
  max-width: 340px;
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
.card-desc {
  font-size: 0.98rem; color: #94a3b8;
  line-height: 1.75; margin: 0;
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
}

</style>