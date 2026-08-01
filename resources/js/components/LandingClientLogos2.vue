<template>
  <section v-if="clientLogos.length > 0" class="cls-section">

    <div class="cls-top-line"></div>
    <div class="cls-bottom-line"></div>

    <!-- Header -->
    <div class="cls-header">
      <div class="cls-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-text">DIPERCAYA OLEH</span>
        <span class="eyebrow-line"></span>
      </div>
      <p class="cls-subtitle">Kami telah bekerja sama dengan berbagai instansi dan perusahaan terkemuka.</p>
    </div>

    <!-- Marquee rows — 2 baris berlawanan arah -->
    <div class="cls-marquee-wrap">

      <!-- Fade kiri & kanan -->
      <div class="cls-fade left"></div>
      <div class="cls-fade right"></div>

      <!-- Baris 1 — kiri ke kanan -->
      <div
        class="cls-row"
        @mouseenter="paused1 = true"
        @mouseleave="paused1 = false"
      >
        <div class="cls-track" :class="{ paused: paused1 }" :style="{ '--dur': dur1 + 's' }">
          <div v-for="(logo, i) in row1" :key="'a' + i" class="cls-item">
            <div class="cls-card">
              <img :src="logo.url" :alt="logo.name" class="cls-img" draggable="false"/>
              <div class="cls-card-name">{{ logo.name }}</div>
            </div>
          </div>
          <div v-for="(logo, i) in row1" :key="'b' + i" class="cls-item" aria-hidden="true">
            <div class="cls-card">
              <img :src="logo.url" :alt="logo.name" class="cls-img" draggable="false"/>
              <div class="cls-card-name">{{ logo.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Baris 2 — kanan ke kiri (reverse) -->
      <div
        class="cls-row"
        @mouseenter="paused2 = true"
        @mouseleave="paused2 = false"
      >
        <div class="cls-track reverse" :class="{ paused: paused2 }" :style="{ '--dur': dur2 + 's' }">
          <div v-for="(logo, i) in row2" :key="'c' + i" class="cls-item">
            <div class="cls-card">
              <img :src="logo.url" :alt="logo.name" class="cls-img" draggable="false"/>
              <div class="cls-card-name">{{ logo.name }}</div>
            </div>
          </div>
          <div v-for="(logo, i) in row2" :key="'d' + i" class="cls-item" aria-hidden="true">
            <div class="cls-card">
              <img :src="logo.url" :alt="logo.name" class="cls-img" draggable="false"/>
              <div class="cls-card-name">{{ logo.name }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useLandingStore } from '@/stores/landing';
import { mockClientLogos } from '@/mocks/landingMock';

const landingStore = useLandingStore();
const isPaused     = ref(false);

// ── SEMENTARA: isi dummy client_logos kalau belum ada dari API
onMounted(() => {
  if (!landingStore.content?.client_logos) {
    landingStore.content = {
      ...landingStore.content,
      client_logos: mockClientLogos,
    };
  }
});

const clientLogos = computed(() =>
  (landingStore.content?.client_logos || []).filter(l => l.url)
);

// Pad agar minimal 8 per baris
const pad = (arr, min = 8) => {
  if (!arr.length) return [];
  const out = [];
  while (out.length < min) out.push(...arr);
  return out;
};

const half = computed(() => Math.ceil(clientLogos.value.length / 2));
const row1 = computed(() => pad(clientLogos.value.slice(0, half.value)));
const row2 = computed(() => pad(clientLogos.value.slice(half.value)));

const dur1 = computed(() => Math.max(18, row1.value.length * 2.2));
const dur2 = computed(() => Math.max(20, row2.value.length * 2.4));
</script>

<style scoped>
/* ── Section ── */
.cls-section {
  position: relative;
  z-index: 10;
  padding: 80px 0 88px;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
  overflow: hidden;
}
.cls-top-line, .cls-bottom-line {
  position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right, transparent, rgba(59,130,246,0.22), transparent);
}
.cls-top-line { top: 0; }
.cls-bottom-line { bottom: 0; }

/* ── Header ── */
.cls-header {
  text-align: center;
  margin-bottom: 52px;
  padding: 0 24px;
}
.cls-eyebrow {
  display: inline-flex; align-items: center; gap: 16px;
  margin-bottom: 14px;
}
.eyebrow-line {
  width: 52px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.55));
}
.eyebrow-line:last-child { transform: scaleX(-1); }
.eyebrow-text {
  font-size: 0.65rem; font-weight: 800;
  letter-spacing: 0.22em; color: #3b82f6;
  text-transform: uppercase; white-space: nowrap;
}
.cls-subtitle {
  font-size: 0.88rem; color: #3d5070; max-width: 460px;
  margin: 0 auto; line-height: 1.7;
}

/* ── Marquee wrap ── */
.cls-marquee-wrap {
  position: relative;
  display: flex; flex-direction: column; gap: 16px;
}

/* Edge fades */
.cls-fade {
  position: absolute; top: 0; bottom: 0; width: 160px;
  z-index: 10; pointer-events: none;
}
.cls-fade.left  { left: 0;  background: linear-gradient(to right, #020617 20%, transparent); }
.cls-fade.right { right: 0; background: linear-gradient(to left,  #020617 20%, transparent); }

/* ── Row ── */
.cls-row {
  width: 100%;
  overflow: hidden;
  padding: 6px 0;
}

/* ── Track ── */
.cls-track {
  display: flex;
  width: max-content;
  align-items: center;
  animation: scrollLeft linear var(--dur, 28s) infinite;
  will-change: transform;
}
.cls-track.reverse {
  animation-name: scrollRight;
}
.cls-track.paused {
  animation-play-state: paused;
}
@keyframes scrollLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
@keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

/* ── Item ── */
.cls-item {
  flex-shrink: 0;
  padding: 0 10px;
}

/* ── Card ── */
.cls-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 136px;
  padding: 20px 16px 16px;
  border-radius: 16px;
  background: rgba(8, 12, 35, 0.6);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(8px);
  overflow: hidden;
  transition:
    background 0.3s,
    border-color 0.3s,
    transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
    box-shadow 0.3s;
  cursor: default;
}
.cls-card:hover {
  background: rgba(14, 20, 55, 0.9);
  border-color: rgba(59,130,246,0.3);
  transform: translateY(-5px) scale(1.04);
  box-shadow:
    0 16px 40px rgba(0,0,0,0.4),
    0 0 20px rgba(59,130,246,0.1);
}

/* Top accent line on hover */
.cls-card::before {
  content: '';
  position: absolute; top: 0; left: 20%; right: 20%; height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent);
  opacity: 0; transition: opacity 0.3s;
}
.cls-card:hover::before { opacity: 1; }

/* ── Logo ── */
.cls-img {
  width: 64px; height: 64px;
  object-fit: contain; display: block;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s;
  pointer-events: none; user-select: none; -webkit-user-drag: none;
  flex-shrink: 0;
}
.cls-card:hover .cls-img {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 16px rgba(59,130,246,0.35));
}

/* ── Name — always visible below logo ── */
.cls-card-name {
  font-size: 0.6rem; font-weight: 700;
  color: #3d5070; letter-spacing: 0.04em;
  text-align: center; line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s;
  max-width: 100%;
}
.cls-card:hover .cls-card-name {
  color: #60a5fa;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .cls-section { padding: 56px 0 64px; }
  .cls-card { width: 112px; padding: 16px 12px 12px; }
  .cls-img  { width: 52px; height: 52px; }
  .cls-fade { width: 80px; }
  .cls-marquee-wrap { gap: 12px; }
}
@media (max-width: 480px) {
  .cls-card { width: 96px; padding: 14px 10px 10px; }
  .cls-img  { width: 44px; height: 44px; }
  .cls-fade { width: 48px; }
}
</style>