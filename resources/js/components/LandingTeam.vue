<template>
  <section class="team-section">
    <div class="container-xxl">

      <!-- Header -->
      <div class="team-header">
        <div class="team-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">TIM KAMI</span>
          <span class="eyebrow-line"></span>
        </div>
        <h2 class="team-title">Tim Kami yang Luar Biasa</h2>
        <p class="team-subtitle">Orang-orang berdedikasi di balik setiap solusi yang kami hadirkan untuk Anda.</p>
      </div>

      <!-- Skeleton loading -->
      <div v-if="landingStore.loading" class="team-grid">
        <div v-for="n in 4" :key="n" class="team-card team-skeleton">
          <div class="sk-photo"></div>
          <div class="sk-body">
            <div class="sk-line sk-name"></div>
            <div class="sk-line sk-pos"></div>
          </div>
          <div class="skeleton-sweep"></div>
        </div>
      </div>

      <!-- Grid -->
      <div v-else class="team-grid">

        <div
          v-for="(team, index) in landingStore.teams"
          :key="team.id"
          class="team-card"
          :style="{ '--delay': `${index * 80}ms` }"
        >
          <div class="card-top-line"></div>
          <div class="team-photo-wrap">
            <img :src="team.image_url" :alt="team.name" class="team-photo"/>
            <!-- Overlay muncul saat hover -->
            <div class="photo-hover-overlay">
              <div class="hover-info">
                <div class="hover-divider"></div>
                <h4 class="hover-name">{{ team.name }}</h4>
                <p class="hover-position">{{ team.position }}</p>
              </div>
            </div>
          </div>
          <!-- Info statis di bawah -->
          <div class="team-info">
            <h4 class="team-name">{{ team.name }}</h4>
            <p class="team-position">{{ team.position }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLandingStore } from '@/stores/landing';

const landingStore = useLandingStore();
</script>

<style scoped>
.team-section {
  position: relative;
  z-index: 10;
  padding: 100px 24px 110px;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
}

/* ── Header ── */
.team-header {
  text-align: center; margin-bottom: 64px;
  max-width: 580px; margin-left: auto; margin-right: auto;
}
.team-eyebrow {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; margin-bottom: 20px;
}
.eyebrow-line {
  flex: 1; max-width: 48px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5));
}
.eyebrow-line:last-child { transform: scaleX(-1); }
.eyebrow-text {
  font-size: 0.65rem; font-weight: 800;
  letter-spacing: 0.22em; color: #3b82f6; text-transform: uppercase;
}
.team-title {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800;
  color: #e8eeff; margin: 0 0 14px; letter-spacing: -0.025em; line-height: 1.2;
}
.team-subtitle { font-size: 0.975rem; color: #4a5e80; line-height: 1.75; margin: 0; }

/* ── Grid ── */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px; max-width: 1100px; margin: 0 auto;
}

/* ── Card ── */
.team-card {
  position: relative; border-radius: 18px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.07);
  overflow: hidden; display: flex; flex-direction: column;
  animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
  animation-delay: var(--delay, 0ms);
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s;
}
.team-card:hover {
  transform: translateY(-6px);
  border-color: rgba(59,130,246,0.28);
  box-shadow: 0 20px 48px rgba(0,0,0,0.3), 0 0 28px rgba(59,130,246,0.08);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-top-line {
  position: absolute; top: 0; left: 15%; right: 15%; height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.7), rgba(139,92,246,0.5), transparent);
  opacity: 0; transition: opacity 0.3s; z-index: 2;
}
.team-card:hover .card-top-line { opacity: 1; }

.team-photo-wrap {
  position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden;
}
.team-photo {
  width: 100%; height: 100%; object-fit: cover; object-position: top;
  transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
}
.team-card:hover .team-photo { transform: scale(1.08); }

.team-info {
  padding: 18px 20px 20px; background: transparent;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.team-name {
  font-size: 0.95rem; font-weight: 700; color: #e8eeff;
  margin: 0 0 5px; line-height: 1.3; transition: color 0.2s;
}
.team-card:hover .team-name { color: #fff; }
.team-position { font-size: 0.75rem; font-weight: 500; color: #60a5fa; margin: 0; }



/* ── Photo hover overlay ── */
.photo-hover-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(2,6,23,0.1) 0%,
    rgba(2,6,23,0.35) 40%,
    rgba(2,6,23,0.92) 100%
  );
  display: flex; align-items: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
}
.team-card:hover .photo-hover-overlay { opacity: 1; }

.hover-info {
  width: 100%;
  transform: translateY(10px);
  transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
}
.team-card:hover .hover-info { transform: translateY(0); }

.hover-divider {
  width: 28px; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  margin-bottom: 8px;
  box-shadow: 0 0 8px rgba(59,130,246,0.6);
}
.hover-name {
  font-size: 0.95rem; font-weight: 700;
  color: #fff; margin: 0 0 4px; line-height: 1.2;
  text-shadow: 0 1px 8px rgba(0,0,0,0.5);
}
.hover-position {
  font-size: 0.72rem; font-weight: 600;
  color: #60a5fa; margin: 0; letter-spacing: 0.03em;
}

/* ── Skeleton ── */
.team-skeleton {
  pointer-events: none; animation: none !important;
  border-color: rgba(59,130,246,0.06) !important;
}
.sk-photo { width: 100%; aspect-ratio: 1/1; background: rgba(59,130,246,0.07); }
.sk-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 8px; }
.sk-line { border-radius: 6px; background: rgba(59,130,246,0.07); }
.sk-name { height: 14px; width: 70%; }
.sk-pos  { height: 11px; width: 50%; }
.skeleton-sweep {
  position: absolute; inset: 0; border-radius: 18px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(59,130,246,0.1) 40%,
    rgba(99,179,255,0.2) 50%,
    rgba(59,130,246,0.1) 60%,
    transparent 100%
  );
  background-size: 200% 100%; background-position: -200% 0;
  animation: shimmerSweep 1.6s ease-in-out infinite; pointer-events: none;
}
@keyframes shimmerSweep {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .team-section { padding: 72px 16px 80px; }
  .team-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }

}
@media (max-width: 480px) {
  .team-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
}
</style>