<template>
  <section class="cta-section" v-if="ctaData && ctaData.title">
    <div class="container-xxl">
      <div class="cta-box">

        <!-- Ambient glow orbs -->
        <div class="cta-orb cta-orb-left"></div>
        <div class="cta-orb cta-orb-right"></div>

        <!-- Dot grid -->
        <div class="cta-dots"></div>

        <!-- Top border glow -->
        <div class="cta-top-line"></div>

        <!-- Eyebrow -->
        <div class="cta-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">MULAI SEKARANG</span>
          <span class="eyebrow-line"></span>
        </div>

        <!-- Title -->
        <h2 class="cta-title" v-html="formattedTitle"></h2>

        <!-- Sub text if available -->
        <p v-if="ctaData.description" class="cta-desc">{{ ctaData.description }}</p>

        <!-- CTA Button -->
        <a :href="ctaData.button_link" class="cta-btn">
          <span class="cta-btn-fill"></span>
          <span class="cta-btn-content">
            {{ ctaData.button_text }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </a>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const ctaData = ref(null);

const fetchCtaData = async () => {
  try {
    const response = await axios.get('/front/landing-cta');
    ctaData.value = response.data.data || response.data;
  } catch (error) {
    console.error('Gagal memuat data CTA:', error);
  }
};

// Highlight kata pertama dengan warna aksen
const formattedTitle = computed(() => {
  if (!ctaData.value?.title) return '';
  const words = ctaData.value.title.split(' ');
  if (words.length <= 3) return ctaData.value.title;
  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(' ');
  const line2 = words.slice(half).join(' ');
  return `${line1}<br/><span class="cta-title-accent">${line2}</span>`;
});

onMounted(() => {
  fetchCtaData();
});
</script>

<style scoped>
/* ── Section ── */
.cta-section {
  padding: 80px 20px 100px;
  position: relative;
  z-index: 10;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
}

/* ── Box ── */
.cta-box {
  position: relative;
  max-width: 1060px;
  margin: 0 auto;
  padding: 88px 48px;
  border-radius: 28px;
  background: transparent;
  border: 1px solid rgba(59, 130, 246, 0.12);
  box-shadow: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  overflow: hidden;
}

/* Top accent line */
.cta-top-line {
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.6), rgba(139,92,246,0.4), transparent);
}

/* Dot grid */
.cta-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.065) 1px, transparent 1px);
  background-size: 36px 36px;
  pointer-events: none;
}

/* Glow orbs */
.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.cta-orb-left {
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(29,78,216,0.22) 0%, transparent 70%);
  top: -100px; left: -80px;
}
.cta-orb-right {
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%);
  bottom: -80px; right: -60px;
}

/* ── Eyebrow ── */
.cta-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}
.eyebrow-line {
  width: 32px; height: 1.5px;
  background: linear-gradient(90deg, transparent, #3b82f6);
  border-radius: 2px;
}
.eyebrow-line:last-child { transform: scaleX(-1); }
.eyebrow-text {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  color: #3b82f6;
}

/* ── Title ── */
.cta-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #e8eeff;
  line-height: 1.25;
  max-width: 720px;
  margin: 0;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 1;
}
.cta-title :deep(.cta-title-accent) {
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Desc ── */
.cta-desc {
  font-size: 1rem;
  color: #4a5e80;
  line-height: 1.75;
  max-width: 520px;
  margin: -8px 0 0;
  position: relative;
  z-index: 1;
}

/* ── Button ── */
.cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 15px 36px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  overflow: hidden;
  border: 1.5px solid rgba(59, 130, 246, 0.5);
  background: transparent;
  letter-spacing: 0.02em;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 24px rgba(29, 78, 216, 0.2);
}
.cta-btn:hover {
  transform: translateY(-3px);
  border-color: #3b82f6;
  box-shadow: 0 8px 32px rgba(29, 78, 216, 0.45);
  color: #fff;
}
.cta-btn:active { transform: translateY(0); }

/* Liquid fill */
.cta-btn-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8, #2563eb);
  transform: translateY(101%);
  transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
  border-radius: 50px;
}
.cta-btn:hover .cta-btn-fill { transform: translateY(0); }

.cta-btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 9px;
}
.cta-btn-content svg {
  transition: transform 0.3s ease;
}
.cta-btn:hover .cta-btn-content svg {
  transform: translateX(3px);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .cta-section { padding: 60px 16px 80px; }
  .cta-box { padding: 56px 24px; gap: 22px; border-radius: 22px; }
  .cta-btn { padding: 13px 30px; font-size: 0.9rem; }
}

@media (max-width: 480px) {
  .cta-box { padding: 44px 20px; }
  .cta-btn { width: 100%; justify-content: center; }
}
</style>