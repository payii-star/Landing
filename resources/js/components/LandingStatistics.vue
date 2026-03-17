<template>
  <section class="stats-section">
    <div class="container-xxl">

      <!-- Header -->
      <div class="stats-header">
        <div class="stats-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">PENCAPAIAN KAMI</span>
          <span class="eyebrow-line"></span>
        </div>
      </div>

      <!-- Skeleton -->
      <div v-if="landingStore.loading" class="stats-grid">
        <div v-for="n in 3" :key="n" class="stat-card stat-skeleton">
          <div class="sk-icon"></div>
          <div class="sk-value"></div>
          <div class="sk-label"></div>
          <div class="skeleton-sweep"></div>
        </div>
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
          :style="{ '--delay': `${index * 100}ms`, '--i': index }"
          @click="onCardClick"
        >
          <!-- Animated border -->
          <div class="stat-border-glow"></div>

          <!-- Ripple -->
          <div class="ripple-container"></div>

          <!-- Number badge top-right -->
          <span class="stat-num">#{{ String(index + 1).padStart(2,'0') }}</span>

          <!-- Icon -->
          <div class="stat-icon-wrap">
            <div class="stat-icon-bg"></div>
            <i :class="['fa-solid', `fa-${stat.icon}`]" class="stat-icon-el"></i>
          </div>

          <!-- Value -->
          <div class="stat-value">{{ stat.statistic }}</div>

          <!-- Label -->
          <div class="stat-label">{{ stat.label }}</div>

          <!-- Bottom accent -->
          <div class="stat-bottom-line"></div>

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
  padding: 88px 24px 108px;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
}

/* ── Header ── */
.stats-header {
  text-align: center;
  margin-bottom: 52px;
}
.stats-eyebrow {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; margin-bottom: 16px;
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


/* ── Error ── */
.stats-error { text-align: center; color: #ef4444; font-size: 0.875rem; }

/* ── Grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  max-width: 980px;
  margin: 0 auto;
}

/* ── Card ── */
.stat-card {
  position: relative;
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  padding: 44px 28px 40px;
  border-radius: 22px;
  background: rgba(8, 12, 32, 0.65);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow: hidden;
  cursor: pointer;
  animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
  animation-delay: var(--delay, 0ms);
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
              border-color 0.35s, box-shadow 0.35s;
}
.stat-card:hover {
  transform: translateY(-8px);
  border-color: rgba(59,130,246,0.35);
  box-shadow:
    0 24px 56px rgba(0,0,0,0.45),
    0 0 40px rgba(59,130,246,0.12),
    0 0 0 1px rgba(59,130,246,0.08) inset;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Animated border glow on hover */
.stat-border-glow {
  position: absolute; inset: -1px; border-radius: 22px;
  background: linear-gradient(135deg,
    rgba(59,130,246,0) 0%,
    rgba(59,130,246,0.4) 50%,
    rgba(139,92,246,0.3) 75%,
    rgba(59,130,246,0) 100%
  );
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none; z-index: 0;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
}
.stat-card:hover .stat-border-glow { opacity: 1; }

/* Number badge */
.stat-num {
  position: absolute; top: 14px; right: 16px;
  font-size: 0.6rem; font-weight: 800;
  color: rgba(59,130,246,0.3); letter-spacing: 0.05em;
  transition: color 0.3s;
}
.stat-card:hover .stat-num { color: rgba(59,130,246,0.6); }

/* ── Ripple ── */
.ripple-container {
  position: absolute; inset: 0;
  pointer-events: none; overflow: hidden;
  border-radius: 22px; z-index: 2;
}
.ripple-container :deep(.ripple) {
  position: absolute;
  width: 10px; height: 10px; border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.15) 50%, transparent 70%);
  animation: rippleAnim 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
  pointer-events: none;
}
@keyframes rippleAnim {
  0%   { transform: translate(-50%, -50%) scale(0);  opacity: 1; }
  60%  { transform: translate(-50%, -50%) scale(30); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(44); opacity: 0; }
}

/* ── Icon ── */
.stat-icon-wrap {
  position: relative;
  width: 68px; height: 68px;
  margin-bottom: 22px; flex-shrink: 0; z-index: 1;
}
.stat-icon-bg {
  position: absolute; inset: 0; border-radius: 20px;
  background: linear-gradient(135deg,
    rgba(29,78,216,0.22) 0%,
    rgba(139,92,246,0.14) 100%);
  border: 1px solid rgba(59,130,246,0.25);
  box-shadow: 0 0 24px rgba(59,130,246,0.1), 0 8px 24px rgba(0,0,0,0.3);
  transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.stat-card:hover .stat-icon-bg {
  border-color: rgba(59,130,246,0.5);
  box-shadow: 0 0 40px rgba(59,130,246,0.28), 0 8px 32px rgba(0,0,0,0.4);
  transform: scale(1.05);
}
.stat-icon-el {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.55rem; color: #60a5fa; z-index: 1;
  transition: color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.stat-card:hover .stat-icon-el { color: #93c5fd; transform: scale(1.1) rotate(-5deg); }

/* ── Value ── */
.stat-value {
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 800; line-height: 1; letter-spacing: -0.045em;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 18px rgba(59,130,246,0.45));
  margin-bottom: 10px; z-index: 1;
  transition: filter 0.35s;
}
.stat-card:hover .stat-value {
  filter: drop-shadow(0 0 28px rgba(59,130,246,0.7));
}

/* ── Label ── */
.stat-label {
  font-size: 0.75rem; font-weight: 700;
  color: #3d5070; letter-spacing: 0.1em;
  text-transform: uppercase; z-index: 1;
  transition: color 0.3s;
}
.stat-card:hover .stat-label { color: #5a7090; }

/* Bottom sweep line */
.stat-bottom-line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg,
    transparent 0%, transparent 25%,
    rgba(59,130,246,0.8) 50%,
    transparent 75%, transparent 100%
  );
  background-size: 200% 100%;
  background-position: 200% 0;
  opacity: 0; z-index: 3;
  transition: opacity 0.25s;
}
.stat-card:hover .stat-bottom-line {
  opacity: 1;
  animation: sweepLine 2s linear infinite;
}
@keyframes sweepLine {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Skeleton ── */
.stat-skeleton {
  pointer-events: none; animation: none !important;
  border-color: rgba(59,130,246,0.05) !important;
}
.sk-icon  { width: 68px; height: 68px; border-radius: 20px; background: rgba(59,130,246,0.07); margin-bottom: 22px; }
.sk-value { width: 80px; height: 40px; border-radius: 8px; background: rgba(59,130,246,0.07); margin-bottom: 10px; }
.sk-label { width: 60px; height: 12px; border-radius: 6px; background: rgba(59,130,246,0.05); }
.skeleton-sweep {
  position: absolute; inset: 0; border-radius: 22px;
  background: linear-gradient(90deg,
    transparent 0%, rgba(59,130,246,0.08) 40%,
    rgba(99,179,255,0.18) 50%, rgba(59,130,246,0.08) 60%, transparent 100%
  );
  background-size: 200% 100%; background-position: -200% 0;
  animation: shimmerSweep 1.6s ease-in-out infinite; pointer-events: none;
}
@keyframes shimmerSweep {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .stats-section { padding: 60px 16px 80px; }
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .stat-card { padding: 32px 18px 28px; }
  .stats-header { margin-bottom: 40px; }
}
@media (max-width: 400px) {
  .stats-grid { grid-template-columns: 1fr; }
}
</style>