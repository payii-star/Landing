<template>
  <section class="stats-section">
    <div class="container-xxl">

      <!-- Eyebrow -->
      <div class="stats-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-text">PENCAPAIAN KAMI</span>
        <span class="eyebrow-line"></span>
      </div>

      <!-- Loading -->
      <div v-if="landingStore.loading" class="stats-loading">
        <div class="stats-spinner"></div>
        <span>Memuat statistik...</span>
      </div>

      <!-- Error -->
      <div v-else-if="landingStore.error" class="stats-error">
        {{ landingStore.error }}
      </div>

      <!-- Stats -->
      <div v-else class="stats-grid">
        <div
          v-for="(stat, index) in landingStore.statistics"
          :key="stat.id"
          class="stat-card"
          :style="{ '--delay': `${index * 100}ms` }"
          @click="onCardClick"
        >
          <!-- Glow orb -->
          <div class="stat-glow"></div>

          <!-- Top accent line -->
          <div class="stat-top-line"></div>

          <!-- Ripple container -->
          <div class="ripple-container"></div>

          <!-- Icon -->
          <div class="stat-icon-wrap">
            <div class="stat-icon-bg"></div>
            <i :class="['fa-solid', `fa-${stat.icon}`]" class="stat-icon-el"></i>
          </div>

          <!-- Value -->
          <div class="stat-value">{{ stat.statistic }}</div>

          <!-- Label -->
          <div class="stat-label">{{ stat.label }}</div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useLandingStore } from '@/stores/landing';

const landingStore = useLandingStore();

const onCardClick = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top  = `${y}px`;

  const container = card.querySelector('.ripple-container');
  container?.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
};
</script>

<style scoped>
.stats-section {
  position: relative;
  z-index: 10;
  padding: 80px 24px 100px;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
}

/* ── Eyebrow ── */
.stats-eyebrow {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; margin-bottom: 52px;
}
.eyebrow-line {
  flex: 1; max-width: 60px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5));
  border-radius: 2px;
}
.eyebrow-line:last-child { transform: scaleX(-1); }
.eyebrow-text {
  font-size: 0.65rem; font-weight: 800;
  letter-spacing: 0.22em; color: #3b82f6; text-transform: uppercase;
}

/* ── Loading / Error ── */
.stats-loading {
  display: flex; align-items: center; justify-content: center;
  gap: 10px; color: #4a5e80; font-size: 0.875rem; padding: 40px;
}
.stats-spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(59,130,246,0.2);
  border-top-color: #3b82f6;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.stats-error { text-align: center; color: #ef4444; font-size: 0.875rem; }

/* ── Grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 960px;
  margin: 0 auto;
}

/* ── Card ── */
.stat-card {
  position: relative;
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  padding: 40px 28px 36px;
  border-radius: 20px;
  background: rgba(10, 14, 39, 0.6);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
  cursor: pointer;
  animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
  animation-delay: var(--delay, 0ms);
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-6px);
  border-color: rgba(59,130,246,0.3);
  box-shadow: 0 20px 48px rgba(0,0,0,0.35), 0 0 32px rgba(59,130,246,0.1);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Glow orb */
.stat-glow {
  position: absolute;
  top: -20px; left: 50%; transform: translateX(-50%);
  width: 120px; height: 120px; border-radius: 50%;
  background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
  pointer-events: none; transition: opacity 0.3s;
}
.stat-card:hover .stat-glow { opacity: 1.5; }

/* Top accent line */
.stat-top-line {
  position: absolute;
  top: 0; left: 15%; right: 15%; height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.7), rgba(139,92,246,0.5), transparent);
  border-radius: 2px; opacity: 0; transition: opacity 0.3s;
}
.stat-card:hover .stat-top-line { opacity: 1; }

/* ── Ripple ── */
.ripple-container {
  position: absolute; inset: 0;
  pointer-events: none; overflow: hidden;
  border-radius: 20px; z-index: 2;
}
.ripple-container :deep(.ripple) {
  position: absolute;
  width: 10px; height: 10px; border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.18) 50%, transparent 70%);
  animation: rippleAnim 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  pointer-events: none;
}
@keyframes rippleAnim {
  0%   { transform: translate(-50%, -50%) scale(0);  opacity: 1; }
  60%  { transform: translate(-50%, -50%) scale(28); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(40); opacity: 0; }
}

/* ── Icon ── */
.stat-icon-wrap {
  position: relative;
  width: 64px; height: 64px;
  margin-bottom: 20px; flex-shrink: 0;
}
.stat-icon-bg {
  position: absolute; inset: 0; border-radius: 18px;
  background: linear-gradient(135deg, rgba(29,78,216,0.2) 0%, rgba(139,92,246,0.12) 100%);
  border: 1px solid rgba(59,130,246,0.22);
  box-shadow: 0 0 24px rgba(59,130,246,0.12);
  transition: border-color 0.3s, box-shadow 0.3s;
}
.stat-card:hover .stat-icon-bg {
  border-color: rgba(59,130,246,0.4);
  box-shadow: 0 0 32px rgba(59,130,246,0.22);
}
.stat-icon-el {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; color: #60a5fa;
  transition: color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.stat-card:hover .stat-icon-el { color: #93c5fd; transform: scale(1.12); }

/* ── Value — biru ── */
.stat-value {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800; line-height: 1; letter-spacing: -0.04em;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 16px rgba(59,130,246,0.4));
  margin-bottom: 8px;
  transition: filter 0.3s;
}
.stat-card:hover .stat-value {
  filter: drop-shadow(0 0 24px rgba(59,130,246,0.65));
}

/* ── Label ── */
.stat-label {
  font-size: 0.82rem; font-weight: 600;
  color: #4a5e80; letter-spacing: 0.06em;
  text-transform: uppercase; transition: color 0.3s;
}
.stat-card:hover .stat-label { color: #64748b; }

/* ── Responsive ── */
@media (max-width: 640px) {
  .stats-section { padding: 60px 16px 80px; }
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  .stat-card { padding: 30px 20px 26px; }
  .stats-eyebrow { margin-bottom: 36px; }
}
@media (max-width: 400px) {
  .stats-grid { grid-template-columns: 1fr; }
}
</style>