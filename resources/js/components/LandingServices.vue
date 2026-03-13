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

      <!-- Grid 2 kolom -->
      <div class="services-grid">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="service-card"
          :style="{ '--delay': `${index * 0.08}s`, '--accent': accentColors[index % accentColors.length] }"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave"
        >
          <!-- Top row: icon kiri + nomor/stat kanan -->
          <div class="card-top-row">
            <div class="icon-wrapper">
              <img
                v-if="service.icon"
                :src="getImageUrl(service.icon)"
                :alt="service.title"
                class="service-icon"
              />
              <div v-else class="default-icon">✨</div>
            </div>
            <div class="card-stat">
              <span class="stat-num">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="stat-label">LAYANAN</span>
            </div>
          </div>

          <!-- Bottom: judul + deskripsi -->
          <div class="card-body">
            <h3 class="card-title">{{ service.title }}</h3>
            <p class="card-desc">{{ service.description }}</p>
          </div>

          <!-- Sweep line -->
          <div class="card-sweep"></div>

          <!-- Featured bottom border -->
          <div class="card-bottom-line"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const services = ref([]);

const accentColors = [
  'rgba(59,130,246,0.9)',
  'rgba(239,68,68,0.9)',
  'rgba(34,197,94,0.9)',
  'rgba(245,158,11,0.9)',
  'rgba(168,85,247,0.9)',
  'rgba(20,184,166,0.9)',
];

const onMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  card.style.setProperty('--my', `${e.clientY - rect.top}px`);
};
const onMouseLeave = (e) => {
  const card = e.currentTarget;
  card.style.setProperty('--mx', '-100px');
  card.style.setProperty('--my', '-100px');
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
    console.error('Gagal memuat layanan:', error);
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
  background: linear-gradient(90deg, transparent, rgba(96,165,250,0.5));
}
.eyebrow-line:last-child { transform: scaleX(-1); }
.eyebrow-text {
  font-size: 0.68rem; font-weight: 800;
  letter-spacing: 0.18em; color: #3b82f6; text-transform: uppercase;
}
.section-title {
  font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800;
  color: #e2eaff; margin: 0 0 16px;
  letter-spacing: -0.03em; line-height: 1.15;
}
.section-subtitle {
  font-size: 1rem; color: #5c6e96; line-height: 1.7; margin: 0;
}

/* Grid — 3 kolom */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto;
}

/* Card */
.service-card {
  position: relative;
  background: rgba(12, 18, 38, 0.85);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 28px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.25s, box-shadow 0.3s;
  animation: cardIn 0.5s ease both;
  animation-delay: var(--delay, 0s);
  cursor: default;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Spotlight layer — ikut kursor */
.service-card::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(
    400px circle at var(--mx, -100px) var(--my, -100px),
    rgba(99, 130, 255, 0.10),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
  border-radius: 16px;
}

/* Shimmer border layer */
.service-card::after {
  content: '';
  position: absolute; inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: radial-gradient(
    300px circle at var(--mx, -100px) var(--my, -100px),
    rgba(99, 130, 255, 0.55),
    transparent 60%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.service-card:hover::before,
.service-card:hover::after {
  opacity: 1;
}

.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.35);
}

/* Sweep line — full width loop seperti Metronic */
.service-card .card-sweep {
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    transparent 25%,
    var(--accent, rgba(59,130,246,0.9)) 50%,
    transparent 75%,
    transparent 100%
  );
  background-size: 200% 100%;
  background-position: 200% 0;
  opacity: 0;
  pointer-events: none;
  z-index: 3;
  transition: opacity 0.3s;
}
.service-card:hover .card-sweep {
  opacity: 1;
  animation: sweepLine 2s linear infinite;
}
@keyframes sweepLine {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.card-bottom-line { display: none; }

/* Top row */
.card-top-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

/* Icon */
.icon-wrapper {
  width: 52px; height: 52px;
  background: color-mix(in srgb, var(--accent, rgba(59,130,246,0.9)) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent, rgba(59,130,246,0.9)) 25%, transparent);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s;
}
.service-card:hover .icon-wrapper { transform: scale(1.06); }
.service-icon {
  width: 26px; height: 26px; object-fit: contain;
  filter: brightness(0) invert(1);
}
.default-icon { font-size: 22px; }

/* Stat (pojok kanan atas) */
.card-stat {
  text-align: right;
  display: flex; flex-direction: column; gap: 2px;
}
.stat-num {
  font-size: 1.6rem; font-weight: 800; line-height: 1;
  color: #e2eaff; letter-spacing: -0.02em;
}
.stat-label {
  font-size: 0.62rem; font-weight: 700;
  letter-spacing: 0.1em; color: #475569;
  text-transform: uppercase;
}

/* Body */
.card-body { display: flex; flex-direction: column; gap: 12px; }
.card-title {
  font-size: 1.25rem; font-weight: 700;
  color: #f1f5f9; margin: 0;
  letter-spacing: -0.01em; line-height: 1.3;
  transition: color 0.2s;
}
.service-card:hover .card-title { color: #ffffff; }
.card-desc {
  font-size: 0.9rem; color: #4b5e7a;
  line-height: 1.7; margin: 0;
  transition: color 0.2s;
}
.service-card:hover .card-desc { color: #5c7099; }

/* Responsive */
@media (max-width: 768px) {
  .services-section { padding: 72px 16px 80px; }
  .section-title { font-size: 1.9rem; }
  .services-grid { grid-template-columns: 1fr; gap: 14px; }
  .service-card { padding: 24px 22px 28px; }
}

@media (min-width: 1024px) {
  .services-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>