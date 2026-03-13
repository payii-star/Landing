<template>
  <section v-if="clientLogos.length > 0" class="cls-section">

    <div class="cls-bg"></div>
    <div class="cls-top-fade"></div>
    <div class="cls-bottom-fade"></div>

    <!-- Header -->
    <div class="cls-header">
      <div class="cls-line"></div>
      <span class="cls-label">OUR CLIENTS</span>
      <div class="cls-line"></div>
    </div>

    <!-- Outer: clip overflow-x tapi biarkan y untuk tooltip -->
    <div class="cls-outer">
      <div class="cls-fade left"></div>
      <div class="cls-fade right"></div>

      <!-- Inner: scrollable via drag -->
      <div
        class="cls-inner"
        ref="wrapRef"
        @mouseenter="pauseMarquee"
        @mouseleave="resumeMarquee"
        @mousedown="onDragStart"
        @mousemove="onDragMove"
        @mouseup="onDragEnd"
      >
        <div
          class="cls-track"
          :style="trackStyle"
          :class="{ paused: isPaused, dragging: isDragging }"
        >
          <div
            v-for="(logo, idx) in repeatedLogos"
            :key="`logo-${idx}`"
            class="cls-logo-item"
          >
            <div class="cls-logo-card">
              <img
                :src="logo.url"
                :alt="logo.name"
                class="cls-logo-img"
                draggable="false"
              />
              <div class="cls-tooltip">{{ logo.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useLandingStore } from '@/stores/landing';

const landingStore = useLandingStore();
const wrapRef = ref(null);
const isPaused = ref(false);
const isDragging = ref(false);

let dragStartX = 0;
let dragScrollLeft = 0;

const clientLogos = computed(() => landingStore.content?.client_logos || []);

const repeatedLogos = computed(() => {
  const logos = clientLogos.value;
  if (!logos.length) return [];
  return [...logos, ...logos, ...logos];
});

const trackStyle = computed(() => {
  const count = clientLogos.value.length;
  const duration = Math.max(20, count * 3.5);
  return { '--duration': `${duration}s` };
});

const pauseMarquee  = () => { isPaused.value = true; };
const resumeMarquee = () => { if (!isDragging.value) isPaused.value = false; };

const onDragStart = (e) => {
  isDragging.value  = true;
  isPaused.value    = true;
  dragStartX        = e.pageX - wrapRef.value.offsetLeft;
  dragScrollLeft    = wrapRef.value.scrollLeft;
  wrapRef.value.style.cursor = 'grabbing';
};
const onDragMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const x    = e.pageX - wrapRef.value.offsetLeft;
  const walk = (x - dragStartX) * 1.6;
  wrapRef.value.scrollLeft = dragScrollLeft - walk;
};
const onDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value  = false;
  isPaused.value    = false;
  if (wrapRef.value) wrapRef.value.style.cursor = 'grab';
};

onMounted(() => {
  if (wrapRef.value) wrapRef.value.style.cursor = 'grab';
  window.addEventListener('mouseup', onDragEnd);
});
onUnmounted(() => {
  window.removeEventListener('mouseup', onDragEnd);
});
</script>

<style scoped>
/* ════════════════════════════════
   Section — dark navy #020617
════════════════════════════════ */
.cls-section {
  position: relative;
  padding: 60px 0 68px;
  
  /* 👇 INI YANG DIRUBAH AGAR PARTIKEL TERLIHAT 👇 */
  background: transparent !important;
}

.cls-bg {
  position: absolute; inset: 0;
  
  /* 👇 INI JUGA DIRUBAH AGAR PARTIKEL TERLIHAT 👇 */
  background: transparent !important;
  pointer-events: none;
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
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.15em;
  color: #3b5080; white-space: nowrap; flex-shrink: 0;
}
.cls-line {
  flex: 1; max-width: 180px; height: 1px;
  background: linear-gradient(to right, transparent, rgba(59,130,246,0.18));
}
.cls-header .cls-line:last-child {
  background: linear-gradient(to left, transparent, rgba(59,130,246,0.18));
}

/* ══════════════════════════════════════════════════════
   KUNCI TOOLTIP TIDAK TERPOTONG:
   CSS spec: jika overflow-x != visible maka overflow-y
   otomatis jadi hidden juga. Solusi: gunakan clip-path
   pada outer agar x terpotong, tapi y tetap visible.
══════════════════════════════════════════════════════ */
.cls-outer {
  position: relative;
  width: 100%;
  /* clip kiri-kanan tapi beri ruang 80px ke atas untuk tooltip */
  clip-path: inset(0px 0px -60px 0px);
}

/* Edge fades */
.cls-fade {
  position: absolute; top: 0; bottom: 0;
  width: 160px; z-index: 10; pointer-events: none;
}
/* 👇 Efek pinggiran (fade) juga ditransparankan agar partikel tidak terpotong di tepi 👇 */
.cls-fade.left  { left: 0;  background: transparent !important; }
.cls-fade.right { right: 0; background: transparent !important; }

/* ── Inner: overflow-x scroll, overflow-y HARUS visible ── */
.cls-inner {
  width: 100%;
  overflow-x: scroll;
  overflow-y: visible;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  /* Padding bawah untuk ruang tooltip */
  padding: 16px 0 52px;
}
.cls-inner::-webkit-scrollbar { display: none; }

/* ── Track ── */
.cls-track {
  display: inline-flex;
  align-items: center;
  width: max-content;
  animation: marqueeScroll var(--duration, 30s) linear infinite;
  padding: 0 20px;
}
.cls-track.paused,
.cls-track.dragging { animation-play-state: paused; }

@keyframes marqueeScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

/* ── Logo item & card ── */
.cls-logo-item {
  padding: 0 16px;
  flex-shrink: 0;
}

.cls-logo-card {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  padding: 20px 36px;
  border-radius: 16px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition:
    background   0.3s ease,
    border-color 0.3s ease,
    transform    0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow   0.3s ease;
}
.cls-logo-card:hover {
  background: rgba(255,255,255,0.03);
  border-color: rgba(59,130,246,0.2);
  transform: translateY(-6px) scale(1.07);
  box-shadow:
    0 12px 36px rgba(0,0,0,0.4),
    0 0 0 1px rgba(59,130,246,0.07),
    0 0 24px rgba(29,78,216,0.1);
}

/* ── Logo image ── */
.cls-logo-img {
  height: 64px;
  max-width: 160px;
  object-fit: contain;
  opacity: 0.3;
  filter: grayscale(100%) brightness(1.5);
  transition:
    opacity 0.35s ease,
    filter  0.35s ease;
  display: block;
  pointer-events: none;
  user-select: none;
}
.cls-logo-card:hover .cls-logo-img {
  opacity: 1;
  filter: grayscale(0%) brightness(1);
}

/* ── Tooltip ── */
.cls-tooltip {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(-6px) scale(0.88);
  transform-origin: top center;

  background: rgba(8, 12, 30, 0.97);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #e2eaff;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 6px 14px;
  border-radius: 9px;
  white-space: nowrap;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 100;

  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  transition:
    opacity    0.2s ease,
    transform  0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
    visibility 0s 0.2s;
}
/* Panah di ATAS tooltip (menunjuk ke logo) */
.cls-tooltip::after {
  content: '';
  position: absolute;
  bottom: 100%; left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-bottom-color: rgba(8, 12, 30, 0.97);
}
.cls-logo-card:hover .cls-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0) scale(1);
  transition:
    opacity    0.2s ease,
    transform  0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
    visibility 0s 0s;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .cls-section { padding: 44px 0 52px; }
  .cls-logo-img { height: 48px; max-width: 120px; }
  .cls-fade { width: 60px; }
}
@media (max-width: 480px) {
  .cls-logo-img { height: 38px; max-width: 100px; }
  .cls-logo-card { padding: 14px 20px; }
}
</style>