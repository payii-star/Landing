<template>
  <section v-if="clientLogos.length > 0" class="cls-section">

    <div class="cls-top-fade"></div>
    <div class="cls-bottom-fade"></div>

    <div class="cls-header">
      <div class="cls-line"></div>
      <span class="cls-label">OUR CLIENTS</span>
      <div class="cls-line"></div>
    </div>

    <div class="cls-outer">
      <div class="cls-fade left"></div>
      <div class="cls-fade right"></div>

      <div
        class="cls-viewport"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
      >
        <!--
          CARA KERJA SEAMLESS LOOP:
          Track = [Set A] + [Set B]  ← keduanya identik
          Animasi geser dari 0 → -50% (= tepat lebar Set A)
          Ketika animasi reset ke 0%:
            posisi Set B sudah menggantikan Set A persis
          → Logo terakhir Set A langsung disambung Logo pertama Set B
          → Tidak ada lompatan, berputar terus selamanya ♻️
        -->
        <div
          class="cls-track"
          :class="{ paused: isPaused }"
          :style="{ '--dur': duration + 's' }"
        >
          <!-- Set A -->
          <div v-for="(logo, i) in paddedLogos" :key="'a' + i" class="cls-item">
            <div class="cls-card">
              <img v-if="logo.url" :src="resolveLogoUrl(logo.url)" :alt="logo.name" class="cls-img" draggable="false"/>
              <span v-else class="cls-badge">{{ logo.short || logo.name }}</span>
              <span class="cls-tip">{{ logo.name }}</span>
            </div>
          </div>
          <!-- Set B — salinan identik, untuk sambungan seamless -->
          <div v-for="(logo, i) in paddedLogos" :key="'b' + i" class="cls-item" aria-hidden="true">
            <div class="cls-card">
              <img v-if="logo.url" :src="resolveLogoUrl(logo.url)" :alt="logo.name" class="cls-img" draggable="false"/>
              <span v-else class="cls-badge">{{ logo.short || logo.name }}</span>
              <span class="cls-tip">{{ logo.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useLandingStore } from '@/stores/landing';

const landingStore = useLandingStore();
const isPaused     = ref(false);
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Logo dari seeder/DB disimpan sebagai path relatif ("/media/clients/xxx.png").
// Harus diarahkan ke origin BACKEND, bukan origin frontend (Vite dev server).
const resolveLogoUrl = (url) => {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  const backendUrl = API_URL.replace('/api', '');
  return url.startsWith('/') ? `${backendUrl}${url}` : `${backendUrl}/${url}`;
};

const clientLogos = computed(() => landingStore.content?.client_logos || []);

// Pastikan minimal 10 logo agar memenuhi layar
// Caranya: ulangi logo asli sampai cukup
const paddedLogos = computed(() => {
  const src = clientLogos.value;
  if (!src.length) return [];
  const min = 10;
  const out = [];
  while (out.length < min) out.push(...src);
  return out;
});

// Kecepatan scroll: ~100px/detik, tiap logo ~200px → count × 2s
const duration = computed(() => {
  return Math.max(15, paddedLogos.value.length * 2);
});
</script>

<style scoped>
/* ── Section ── */
.cls-section {
  position: relative;
  padding: 60px 0 68px;
  background: transparent !important;
}
.cls-top-fade {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right, transparent, rgba(59,130,246,0.18), transparent);
}
.cls-bottom-fade {
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right, transparent, rgba(59,130,246,0.1), transparent);
}

/* ── Header ── */
.cls-header {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: center;
  gap: 18px; margin-bottom: 44px; padding: 0 40px;
}
.cls-label {
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.22em;
  color: #3b82f6; text-transform: uppercase;
  white-space: nowrap; flex-shrink: 0;
}
.cls-line {
  flex: 1; max-width: 180px; height: 1px;
  background: linear-gradient(to right, transparent, rgba(59,130,246,0.18));
}
.cls-header .cls-line:last-child {
  background: linear-gradient(to left, transparent, rgba(59,130,246,0.18));
}

/* ── Outer ── */
.cls-outer {
  position: relative;
  width: 100%;
}
.cls-fade {
  position: absolute; top: 0; bottom: 0;
  width: 140px; z-index: 10; pointer-events: none;
}
.cls-fade.left {
  left: 0;
  background: linear-gradient(to right, #020617, transparent);
}
.cls-fade.right {
  right: 0;
  background: linear-gradient(to left, #020617, transparent);
}

/* ── Viewport: sembunyikan overflow X ── */
.cls-viewport {
  width: 100%;
  overflow: hidden;
  padding: 12px 0 48px;
}

/* ── Track ── */
.cls-track {
  display: flex;
  width: max-content;  /* melebar sesuai isi */
  align-items: center;
  animation: scroll linear var(--dur, 30s) infinite;
  will-change: transform;
}
.cls-track.paused {
  animation-play-state: paused;
}

/*
  Kunci: geser TEPAT -50%
  Karena track = Set A + Set B (ukuran sama),
  -50% = tepat lebar Set A.
  Saat animasi ulang dari 0, Set B sudah di posisi Set A semula.
  Logo pertama langsung menyambung setelah logo terakhir. ✓
*/
@keyframes scroll {
  from { transform: translateX(0%); }
  to   { transform: translateX(-50%); }
}

/* ── Item ── */
.cls-item {
  flex-shrink: 0;
  padding: 0 20px;
}

/* ── Card ── */
.cls-card {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  padding: 18px 32px;
  min-height: 56px;
  border-radius: 16px;
  border: 1px solid transparent;
  transition:
    background   0.3s ease,
    border-color 0.3s ease,
    transform    0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow   0.3s ease;
}
.cls-card:hover {
  background: rgba(255,255,255,0.03);
  border-color: rgba(59,130,246,0.2);
  transform: translateY(-6px) scale(1.07);
  box-shadow: 0 12px 36px rgba(0,0,0,0.4), 0 0 24px rgba(29,78,216,0.1);
}

/* ── Image ── */
.cls-img {
  height: 84px; max-width: 200px;
  object-fit: contain; display: block;
  opacity: 0.75;
  filter: grayscale(35%) brightness(1.05);
  transition: opacity 0.3s, filter 0.3s, transform 0.3s;
  pointer-events: none; user-select: none;
  -webkit-user-drag: none;
}
.cls-card:hover .cls-img {
  opacity: 1;
  filter: none;
  transform: scale(1.05);
}

/* ── Badge (fallback teks kalau logo/url belum ada) ── */
.cls-badge {
  display: inline-flex; align-items: center;
  white-space: nowrap;
  font-size: 0.78rem; font-weight: 700; letter-spacing: 0.02em;
  color: rgba(226,234,255,0.4);
  border: 1px solid rgba(59,130,246,0.2);
  border-radius: 8px;
  padding: 8px 16px;
  transition: color 0.3s, border-color 0.3s, background 0.3s;
  pointer-events: none; user-select: none;
}
.cls-card:hover .cls-badge {
  color: #e2eaff;
  border-color: rgba(59,130,246,0.45);
  background: rgba(59,130,246,0.06);
}

/* ── Tooltip ── */
.cls-tip {
  position: absolute;
  top: calc(100% + 8px); left: 50%;
  transform: translateX(-50%) translateY(-4px) scale(0.9);
  transform-origin: top center;
  background: rgba(8,12,30,0.97);
  border: 1px solid rgba(59,130,246,0.25);
  color: #e2eaff;
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.05em;
  padding: 5px 12px; border-radius: 8px;
  white-space: nowrap;
  opacity: 0; pointer-events: none;
  z-index: 50;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  transition: opacity 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.cls-tip::before {
  content: '';
  position: absolute;
  bottom: 100%; left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-bottom-color: rgba(59,130,246,0.25);
}
.cls-tip::after {
  content: '';
  position: absolute;
  bottom: calc(100% - 1px); left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-bottom-color: rgba(8,12,30,0.97);
}
.cls-card:hover .cls-tip {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .cls-section { padding: 44px 0 52px; }
  .cls-img { height: 66px; max-width: 160px; }
  .cls-badge { font-size: 0.7rem; padding: 7px 12px; }
  .cls-fade { width: 60px; }
  .cls-header { margin-bottom: 32px; }
}
@media (max-width: 480px) {
  .cls-img { height: 54px; max-width: 130px; }
  .cls-badge { font-size: 0.65rem; padding: 6px 10px; }
  .cls-card { padding: 12px 18px; }
  .cls-fade { width: 40px; }
}
@media (max-width: 360px) {
  .cls-section { padding: 36px 0 44px; }
  .cls-img { height: 42px; max-width: 100px; }
  .cls-badge { font-size: 0.6rem; padding: 5px 8px; }
  .cls-card { padding: 10px 14px; }
  .cls-label { font-size: 0.6rem; }
}
</style>