<template>
  <section class="about-section">
    <div class="container-xxl">
      <div class="about-grid">

        <!-- ── Image Block ── -->
        <div class="about-img-block">

          <!-- Glow behind image -->
          <div class="img-glow"></div>

          <!-- Main image frame -->
          <div class="about-img-frame">
            <img :src="getImageUrl(aboutData.image)" alt="About Us" class="about-img"/>
            <div class="about-img-overlay"></div>
          </div>

          <!-- Corner brackets -->
          <div class="bracket br-tl"></div>
          <div class="bracket br-tr"></div>
          <div class="bracket br-bl"></div>
          <div class="bracket br-br"></div>

          <!-- Side accent bar -->
          <div class="side-bar"></div>

        </div>

        <!-- ── Text Block ── -->
        <div class="about-text-block">

          <!-- Eyebrow -->
          <div class="about-eyebrow">
            <span class="eyebrow-dot"></span>
            <span class="eyebrow-text">{{ aboutData.title }}</span>
          </div>

          <!-- Title -->
          <h2 class="about-title">{{ aboutData.subtitle }}</h2>

          <!-- Glowing divider -->
          <div class="about-divider">
            <span class="divider-line"></span>
            <span class="divider-orb"></span>
            <span class="divider-line divider-line-fade"></span>
          </div>

          <!-- Description -->
          <p class="about-desc" style="white-space: pre-line;">{{ aboutData.description }}</p>

          <!-- Feature list -->
          <ul class="about-features">
            <li v-for="feat in aboutData.features" :key="feat">
              <span class="feat-icon">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5l2.5 2.5L9 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              {{ feat }}
            </li>
          </ul>
      </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { mockAbout } from '@/mocks/landingMock';

const aboutData = ref({ ...mockAbout });

// Sama seperti pola di stores/landing.ts — bisa dimatikan lewat .env kalau perlu
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK !== "false";

const fetchAboutData = async () => {
  try {
    const response = await axios.get('/front/landing-about');
    if (response.data.data) aboutData.value = response.data.data;
  } catch (error) {
    console.error('❌ Gagal memuat data About:', error);

    if (USE_MOCK_FALLBACK) {
      console.warn('⚠️ Pakai mockAbout — backend belum tersedia. JANGAN lupa dicabut sebelum production.');
      aboutData.value = { ...mockAbout };
    }
  }
};

const getImageUrl = (path: string | null) => {
  return path
    ? `http://localhost:8000/storage/${path}`
    : 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};

onMounted(() => fetchAboutData());
</script>

<style scoped>
/* ══════════════════════════════════════════
   SECTION
══════════════════════════════════════════ */
.about-section {
  position: relative;
  z-index: 10;
  padding: 120px 24px 130px;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
}

/* ══════════════════════════════════════════
   GRID
══════════════════════════════════════════ */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
  max-width: 1160px;
  margin: 0 auto;
}

/* ══════════════════════════════════════════
   IMAGE BLOCK
══════════════════════════════════════════ */
.about-img-block {
  position: relative;
  padding: 12px;
}

/* Ambient glow behind */
.img-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at 40% 50%, rgba(29,78,216,0.18) 0%, transparent 65%);
  pointer-events: none;
  filter: blur(24px);
}

/* Image frame */
.about-img-frame {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow:
    0 0 0 1px rgba(59,130,246,0.07) inset,
    0 40px 100px rgba(0,0,0,0.55),
    0 0 0 8px rgba(59,130,246,0.04);
}

.about-img {
  width: 100%;
  display: block;
  object-fit: cover;
  aspect-ratio: 5 / 4;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.about-img-block:hover .about-img { transform: scale(1.04); }

.about-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(29,78,216,0.08) 0%,
    transparent 50%,
    rgba(2,6,23,0.4) 100%
  );
  pointer-events: none;
}

/* Corner brackets — all 4 corners */
.bracket {
  position: absolute;
  width: 20px; height: 20px;
  pointer-events: none;
  z-index: 2;
}
.br-tl { top: 0;  left: 0;
  border-top: 2px solid rgba(59,130,246,0.7);
  border-left: 2px solid rgba(59,130,246,0.7);
  border-radius: 4px 0 0 0;
}
.br-tr { top: 0;  right: 0;
  border-top: 2px solid rgba(59,130,246,0.35);
  border-right: 2px solid rgba(59,130,246,0.35);
  border-radius: 0 4px 0 0;
}
.br-bl { bottom: 0; left: 0;
  border-bottom: 2px solid rgba(59,130,246,0.35);
  border-left: 2px solid rgba(59,130,246,0.35);
  border-radius: 0 0 0 4px;
}
.br-br { bottom: 0; right: 0;
  border-bottom: 2px solid rgba(139,92,246,0.7);
  border-right: 2px solid rgba(139,92,246,0.7);
  border-radius: 0 0 4px 0;
}

/* Left side accent bar */
.side-bar {
  position: absolute;
  left: -2px; top: 15%; bottom: 15%;
  width: 3px;
  border-radius: 2px;
  background: linear-gradient(to bottom, transparent, #3b82f6, #8b5cf6, transparent);
  box-shadow: 0 0 16px rgba(59,130,246,0.5);
}

/* ══════════════════════════════════════════
   TEXT BLOCK
══════════════════════════════════════════ */
.about-text-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

/* Eyebrow */
.about-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 20px;
  padding: 5px 13px 5px 9px;
  border-radius: 20px;
  background: rgba(59,130,246,0.08);
  border: 1px solid rgba(59,130,246,0.2);
}
.eyebrow-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 8px rgba(59,130,246,0.8);
  flex-shrink: 0;
}
.eyebrow-text {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #60a5fa;
  text-transform: uppercase;
}

/* Title */
.about-title {
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #e8eeff;
  line-height: 1.28;
  letter-spacing: -0.025em;
  margin: 0 0 28px;
}

/* Animated divider */
.about-divider {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 26px;
}
.divider-line {
  height: 1.5px;
  width: 48px;
  background: linear-gradient(90deg, #3b82f6, rgba(59,130,246,0.3));
  border-radius: 2px;
}
.divider-line-fade {
  width: 24px;
  background: linear-gradient(90deg, rgba(59,130,246,0.3), transparent);
}
.divider-orb {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 10px rgba(59,130,246,0.7), 0 0 24px rgba(59,130,246,0.35);
  flex-shrink: 0;
}

/* Description */
.about-desc {
  font-size: 0.96rem;
  color: #4a5e80;
  line-height: 1.9;
  margin: 0 0 30px;
}

/* Feature list */
.about-features {
  list-style: none;
  padding: 0; margin: 0 0 36px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.about-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
}
.feat-icon {
  width: 22px; height: 22px;
  border-radius: 6px;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #3b82f6;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(59,130,246,0.35), inset 0 0 8px rgba(59,130,246,0.15);

}



/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media (max-width: 640px) {
  .about-section { padding: 80px 16px 90px; }
  .about-title { font-size: 1.6rem; }

  .about-img-block {
    max-width: 540px;
    margin: 0 auto;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .about-section { padding: 80px 16px 90px; }
  .about-title { font-size: 1.6rem; }
}
</style>
