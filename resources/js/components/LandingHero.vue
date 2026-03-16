<template>
  <section class="hero-section" ref="heroRef">

    <!-- ── Background layers ── -->
    <div class="hero-grid"></div>
    <div class="hero-noise"></div>

    <!-- ── Content ── -->
    <div class="hero-container">


      <!-- Headline -->
      <h1 class="hero-title" :class="{ visible: animate }">
        <template v-for="line in titleLines" :key="line.text">
          <span class="title-line" :style="{ animationDelay: line.delay }">
            <span v-if="line.highlight" class="title-highlight">{{ line.text }}</span>
            <span v-else>{{ line.text }}</span>
          </span>
        </template>
      </h1>

      <!-- Description -->
      <p class="hero-desc" :class="{ visible: animate }">
        {{ content.hero_desc || 'Satu platform terintegrasi untuk mencatat, menganalisa, dan mengelola arus kas perusahaan dengan akurat dan real-time.' }}
      </p>

      <!-- CTA Buttons -->
      <div class="hero-cta" :class="{ visible: animate }">
        <a :href="content.cta_primary_url || '#'" class="btn-primary">
          <span class="btn-fill"></span>
          <span class="btn-content">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2.5A5.5 5.5 0 1 0 13.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M11 2h3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 2L9.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            {{ content.cta_primary_label || 'Mulai Gratis Sekarang' }}
          </span>
        </a>

        <a :href="content.cta_secondary_url || '#'" class="btn-secondary">
          <span class="btn-play">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
              <path d="M1 1.5l8 4.5-8 4.5V1.5z"/>
            </svg>
          </span>
          {{ content.cta_secondary_label || 'Lihat Demo' }}
        </a>
      </div>

      <!-- Social proof -->
      <div class="hero-proof" :class="{ visible: animate }">
        <div class="proof-avatars">
          <div v-for="i in 5" :key="i" class="avatar-tooltip-wrapper">
            <div
              class="proof-avatar"
              :style="{ backgroundImage: `url(${content['proof_avatar_'+i] || ''})`, animationDelay: `${i * 60}ms` }"
            >
              <span v-if="!content[`proof_avatar_${i}`]" class="avatar-placeholder">{{ 'ABCDE'[i-1] }}</span>
              <!-- Ring pulse on hover -->
              <span class="avatar-ring"></span>
            </div>

            <!-- Tooltip -->
            <div class="custom-tooltip">
              <div class="tt-avatar-mini" :style="{ backgroundImage: `url(${content['proof_avatar_'+i] || ''})` }">
                <span v-if="!content[`proof_avatar_${i}`]" class="tt-avatar-letter">{{ 'ABCDE'[i-1] }}</span>
              </div>
              <div class="tt-body">
                <p class="tt-name">{{ content[`proof_name_${i}`] || `User ${i}` }}</p>
                <p class="tt-role">{{ content[`proof_role_${i}`] || 'Pelanggan Setia' }}</p>
                <div class="tt-stars">
                  <svg v-for="s in 5" :key="s" width="9" height="9" viewBox="0 0 12 12" fill="#f59e0b">
                    <path d="M6 1l1.236 2.636L10 4.118l-2 1.99.472 2.892L6 7.636 3.528 9 4 6.108 2 4.118l2.764-.482L6 1z"/>
                  </svg>
                </div>
              </div>
              <div class="tt-arrow"></div>
            </div>
          </div>
        </div>
        <div class="proof-text">
          <div class="proof-stars">
            <svg v-for="s in 5" :key="s" width="12" height="12" viewBox="0 0 12 12" fill="#f59e0b">
              <path d="M6 1l1.236 2.636L10 4.118l-2 1.99.472 2.892L6 7.636 3.528 9 4 6.108 2 4.118l2.764-.482L6 1z"/>
            </svg>
          </div>
          <span>{{ content.proof_text || 'Dipercaya 2.000+ bisnis di Indonesia' }}</span>
        </div>
      </div>

      <!-- Dashboard Preview -->
      <div class="hero-preview" :class="{ visible: animate }">
        <!-- Main preview frame -->
        <div class="preview-frame">
          <div class="preview-chrome">
            <span class="chrome-dot"></span>
            <span class="chrome-dot"></span>
            <span class="chrome-dot"></span>
            <span class="chrome-bar"></span>
          </div>
          <div class="preview-body">
            <img
              v-if="content.hero_image"
              :src="content.hero_image"
              alt="Dashboard Preview"
              class="preview-img"
            />
            <!-- Placeholder jika belum ada gambar dari backend -->
            <div v-else class="preview-placeholder">
              <div class="ph-sidebar">
                <div class="ph-logo"></div>
                <div v-for="i in 5" :key="i" class="ph-nav-item" :style="{ width: `${[70,50,65,45,55][i-1]}%`, animationDelay: `${i * 100}ms` }"></div>
              </div>
              <div class="ph-main">
                <div class="ph-header">
                  <div class="ph-title"></div>
                  <div class="ph-btn"></div>
                </div>
                <div class="ph-stats">
                  <div v-for="i in 4" :key="i" class="ph-stat-card">
                    <div class="ph-stat-icon"></div>
                    <div class="ph-stat-val"></div>
                    <div class="ph-stat-label"></div>
                  </div>
                </div>
                <div class="ph-chart">
                  <div class="ph-chart-bars">
                    <div v-for="(h, i) in [40,65,45,80,55,90,70]" :key="i" class="ph-bar" :style="{ height: `${h}%`, animationDelay: `${i * 80 + 600}ms` }"></div>
                  </div>
                </div>
                <div class="ph-table">
                  <div v-for="i in 4" :key="i" class="ph-row" :style="{ animationDelay: `${i * 60 + 800}ms` }">
                    <div class="ph-cell wide"></div>
                    <div class="ph-cell medium"></div>
                    <div class="ph-cell short"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Glow under frame -->
        <div class="preview-glow"></div>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLandingStore } from '@/stores/landing';

const landingStore = useLandingStore();
const heroRef = ref<HTMLElement | null>(null);
const animate = ref(false);

// ── Content dari store (fallback ke default jika belum ada) ──
const content = computed(() => landingStore.content || {});

// ── Split title jadi baris dengan highlight ──
const titleLines = computed(() => {
  const raw = content.value.hero_title || 'Kelola Keuangan\nBisnis Lebih\nCerdas & Cepat';
  return raw.split('\n').map((text: string, i: number) => ({
    text,
    highlight: i === 1, // baris kedua diberi highlight gradient
    delay: `${i * 80 + 200}ms`,
  }));
});


onMounted(() => {
  setTimeout(() => { animate.value = true; }, 100);
});

</script>

<style scoped>
/* ════════════════════════════════════════
   TOKENS — matches navbar dark navy theme
════════════════════════════════════════ */
.hero-section {
  --p:  #3b82f6;
  --p2: #1d4ed8;
  --p3: #60a5fa;
  --green: #34d399;
  --amber: #f59e0b;
  --text: #e2eaff;
  --muted: #5c6e96;
  --glass: rgba(2, 6, 23, 0.7);
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  
  position: relative;
  min-height: calc(100vh - 72px);
  width: 100%;
  display: block;
  overflow: hidden;
  padding-top: 60px;
  padding-bottom: 80px;
  box-sizing: border-box;
  
  /* 👇 INI YANG DIRUBAH AGAR PARTIKEL TERLIHAT 👇 */
  background: transparent !important;
  z-index: 1;
  
}

/* ── Backgrounds ── */
.hero-bg-base { display: none; }
.hero-stars { display: none; }
.hero-gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.orb-1 {
  width: 700px; height: 700px;
  top: -200px; left: -150px;
  background: radial-gradient(circle, rgba(29, 78, 216, 0.18) 0%, transparent 70%);
  animation: orbFloat 12s ease-in-out infinite;
}
.orb-2 {
  width: 500px; height: 500px;
  top: 100px; right: -100px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
  animation: orbFloat 16s ease-in-out infinite reverse;
}
.orb-3 {
  width: 400px; height: 400px;
  bottom: 0; left: 40%;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, transparent 70%);
  animation: orbFloat 10s ease-in-out infinite 2s;
}
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -40px) scale(1.05); }
  66%       { transform: translate(-20px, 20px) scale(0.97); }
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 100%);
  pointer-events: none;
}
.hero-noise {
  position: absolute;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px;
  pointer-events: none;
}
.hero-vignette { display: none; }
.hero-bottom-fade {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 180px;
  background: linear-gradient(to bottom, transparent 0%, #020617 100%);
  pointer-events: none;
  z-index: 2;
}

/* ── Container ── */
.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ── Badge ── */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 10px;
  border-radius: 50px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: var(--p3);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s var(--ease-spring), transform 0.6s var(--ease-spring);
}
.hero-badge.visible {
  opacity: 1;
  transform: translateY(0);
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--p3);
  animation: pulseDot 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.7); }
}
.badge-arrow { opacity: 0.6; display: flex; }

/* ── Title ── */
.hero-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text);
  margin: 0 0 24px;
  max-width: 820px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--ease-spring) 0.1s, transform 0.7s var(--ease-spring) 0.1s;
}
.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}
.title-line {
  display: block;
  opacity: 0;
  transform: translateY(20px);
  animation: none;
}
.hero-title.visible .title-line {
  animation: lineReveal 0.7s var(--ease-spring) both;
}
@keyframes lineReveal {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.title-highlight {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 40%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

/* ── Description ── */
.hero-desc {
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--muted);
  line-height: 1.75;
  max-width: 560px;
  margin: 0 0 36px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s var(--ease-spring) 0.25s, transform 0.7s var(--ease-spring) 0.25s;
}
.hero-desc.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── CTA Buttons ── */
.hero-cta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s var(--ease-spring) 0.35s, transform 0.7s var(--ease-spring) 0.35s;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-cta.visible {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 13px 28px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  overflow: hidden;
  border: 1.5px solid rgba(59, 130, 246, 0.6);
  background: transparent;
  letter-spacing: 0.02em;
  transition: transform 0.3s var(--ease-spring), border-color 0.3s ease, color 0.3s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  border-color: var(--p3);
}
.btn-primary:active { transform: translateY(1px); }
.btn-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8, #2563eb);
  transform: translateY(101%);
  transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
  border-radius: 50px;
}
.btn-primary:hover .btn-fill { transform: translateY(0); }
.btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
}
.btn-secondary:hover {
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}
.btn-play {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--p3);
  flex-shrink: 0;
  transition: background 0.25s ease;
}
.btn-secondary:hover .btn-play {
  background: rgba(59, 130, 246, 0.25);
}

/* ── Social Proof ── */
.hero-proof {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 56px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s var(--ease-spring) 0.45s, transform 0.7s var(--ease-spring) 0.45s;
}
.hero-proof.visible { opacity: 1; transform: translateY(0); }

/* Avatar wrapper + tooltip */
.proof-avatars {
  display: flex;
  align-items: center;
}
.avatar-tooltip-wrapper {
  position: relative;
  margin-left: -10px;
  cursor: pointer;
  z-index: 1;
  transition: z-index 0s 0.1s;
}
.avatar-tooltip-wrapper:first-child { margin-left: 0; }
.avatar-tooltip-wrapper:hover { z-index: 20; transition: z-index 0s; }

/* Avatar circle */
.proof-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 2.5px solid #020617;
  background: rgba(59, 130, 246, 0.25) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--p3);
  position: relative;
  opacity: 0;
  animation: avatarPop 0.4s var(--ease-spring) both;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease;
  overflow: visible;
}
.hero-proof.visible .proof-avatar { animation: avatarPop 0.45s var(--ease-spring) both; }
@keyframes avatarPop {
  from { opacity: 0; transform: scale(0.4) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.avatar-tooltip-wrapper:hover .proof-avatar {
  transform: scale(1.18) translateY(-4px);
  border-color: rgba(96, 165, 250, 0.7);
}

/* Glow ring on hover */
.avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid rgba(96, 165, 250, 0);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  pointer-events: none;
}
.avatar-tooltip-wrapper:hover .avatar-ring {
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
}

.avatar-placeholder { pointer-events: none; position: relative; z-index: 1; }

/* ── Custom Tooltip ── */
.custom-tooltip {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) translateY(8px) scale(0.92);
  transform-origin: bottom center;
  background: rgba(8, 12, 30, 0.96);
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(20px);
  padding: 10px 12px;
  border-radius: 14px;
  white-space: nowrap;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255,255,255,0.04),
    0 0 20px rgba(59,130,246,0.08);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    visibility 0s 0.25s;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 50;
}
.avatar-tooltip-wrapper:hover .custom-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0) scale(1);
  transition:
    opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    visibility 0s 0s;
}

/* Mini avatar inside tooltip */
.tt-avatar-mini {
  width: 36px; height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  background: rgba(59, 130, 246, 0.25) center/cover no-repeat;
  border: 1.5px solid rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--p3);
}
.tt-avatar-letter { pointer-events: none; }

.tt-body { display: flex; flex-direction: column; gap: 3px; }
.tt-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: #e2eaff;
  margin: 0;
  letter-spacing: 0.01em;
}
.tt-role {
  font-size: 0.68rem;
  color: #5c6e96;
  margin: 0;
  font-weight: 500;
}
.tt-stars {
  display: flex;
  gap: 1px;
  margin-top: 2px;
}

/* Arrow */
.tt-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0; height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(8, 12, 30, 0.96);
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
}

/* Proof text */
.proof-text { display: flex; flex-direction: column; gap: 3px; text-align: left; }
.proof-stars { display: flex; gap: 2px; }
.proof-text span {
  font-size: 0.78rem;
  color: var(--muted);
  font-weight: 500;
}

/* ── Dashboard Preview ── */
.hero-preview {
  position: relative;
  width: 100%;
  max-width: 1000px;
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  transition: opacity 0.9s var(--ease-spring) 0.55s, transform 0.9s var(--ease-spring) 0.55s;
}
.hero-preview.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Floating cards */
.float-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(10, 12, 28, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 10;
  white-space: nowrap;
}
.card-revenue {
  top: 60px; left: -40px;
  animation: floatCardA 6s ease-in-out infinite 0.5s;
}
.card-users {
  top: 180px; right: -30px;
  animation: floatCardB 7s ease-in-out infinite 1s;
}
.card-alert {
  bottom: 80px; left: -20px;
  animation: floatCardA 8s ease-in-out infinite 2s;
}
@keyframes floatCardA {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%       { transform: translateY(-10px) rotate(0deg); }
}
@keyframes floatCardB {
  0%, 100% { transform: translateY(0) rotate(1deg); }
  50%       { transform: translateY(-8px) rotate(0deg); }
}
.fcard-icon {
  width: 32px; height: 32px;
  border-radius: 9px;
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fcard-icon.users {
  background: rgba(96, 165, 250, 0.12);
  border-color: rgba(96, 165, 250, 0.2);
}
.fcard-icon.alert {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.2);
}
.fcard-body { display: flex; flex-direction: column; gap: 1px; }
.fcard-label { font-size: 0.65rem; color: var(--muted); font-weight: 500; }
.fcard-value { font-size: 0.85rem; font-weight: 700; color: var(--text); line-height: 1.2; }
.fcard-delta { font-size: 0.65rem; font-weight: 600; }
.fcard-delta.up { color: var(--green); }

/* Preview frame */
.preview-frame {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 10, 24, 0.95);
  box-shadow:
    0 0 0 1px rgba(59, 130, 246, 0.1),
    0 40px 100px rgba(0, 0, 0, 0.7),
    0 0 80px rgba(29, 78, 216, 0.08);
}
.preview-chrome {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.chrome-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}
.chrome-dot:nth-child(1) { background: rgba(239, 68, 68, 0.4); }
.chrome-dot:nth-child(2) { background: rgba(245, 158, 11, 0.4); }
.chrome-dot:nth-child(3) { background: rgba(34, 197, 94, 0.4); }
.chrome-bar {
  flex: 1;
  height: 18px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin: 0 8px;
}
.preview-img {
  width: 100%;
  display: block;
}

/* ── Placeholder Dashboard (sebelum gambar dari backend) ── */
.preview-placeholder {
  display: flex;
  height: 380px;
  overflow: hidden;
}
.ph-sidebar {
  width: 180px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.02);
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ph-logo {
  width: 80px; height: 24px;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.2);
  margin-bottom: 14px;
}
.ph-nav-item {
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  animation: shimmer 1.8s ease-in-out infinite both;
}
.ph-main {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
}
.ph-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ph-title {
  width: 140px; height: 14px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
}
.ph-btn {
  width: 80px; height: 26px;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.25);
}
.ph-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.ph-stat-card {
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ph-stat-icon { width: 24px; height: 24px; border-radius: 6px; background: rgba(59, 130, 246, 0.15); }
.ph-stat-val  { width: 60%; height: 12px; border-radius: 4px; background: rgba(255, 255, 255, 0.1); animation: shimmer 1.8s ease-in-out infinite; }
.ph-stat-label{ width: 80%; height: 7px;  border-radius: 4px; background: rgba(255, 255, 255, 0.05); animation: shimmer 1.8s ease-in-out infinite 0.2s; }
.ph-chart {
  flex: 1;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 12px;
}
.ph-chart-bars {
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.ph-bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(to top, rgba(29, 78, 216, 0.6), rgba(59, 130, 246, 0.3));
  transform-origin: bottom;
  animation: barGrow 0.6s var(--ease-spring) both;
}
@keyframes barGrow {
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
}
.ph-table { display: flex; flex-direction: column; gap: 6px; }
.ph-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  animation: shimmer 1.8s ease-in-out infinite;
}
.ph-cell { height: 7px; border-radius: 4px; background: rgba(255, 255, 255, 0.06); }
.ph-cell.wide { flex: 3; }
.ph-cell.medium { flex: 2; }
.ph-cell.short { flex: 1; }

@keyframes shimmer {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.8; }
}

/* Glow under frame */
.preview-glow {
  position: absolute;
  bottom: -60px;
  left: 10%;
  right: 10%;
  height: 100px;
  background: radial-gradient(ellipse, rgba(29, 78, 216, 0.35) 0%, transparent 70%);
  filter: blur(20px);
  pointer-events: none;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero-section { padding-top: 100px; padding-bottom: 60px; }
  .hero-container { padding: 0 20px; }
  .float-card { display: none; }
  .preview-placeholder { height: 240px; }
  .ph-sidebar { display: none; }
  .ph-stats { grid-template-columns: repeat(2, 1fr); }
  .hero-proof { flex-direction: column; align-items: center; }
  .proof-text { text-align: center; }
}
@media (max-width: 480px) {
  .hero-section { padding-top: 88px; padding-bottom: 48px; }
  .hero-container { padding: 0 16px; }
  .hero-cta { flex-direction: column; width: 100%; }
  .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
  .preview-placeholder { height: 180px; }
  .ph-chart { display: none; }
}
@media (max-width: 360px) {
  .hero-title { font-size: 1.9rem; }
  .hero-desc { font-size: 0.88rem; }
  .proof-avatars { display: none; }
  .preview-placeholder { height: 150px; }
  .hero-container { padding: 0 14px; }
}
</style>