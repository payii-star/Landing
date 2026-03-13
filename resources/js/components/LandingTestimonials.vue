<template>
  <section class="ceo-section">

    <div class="ceo-bg-grid"></div>
    <div class="ceo-bg-orb orb-l"></div>
    <div class="ceo-bg-orb orb-r"></div>

    <div class="ceo-wrap">

      <!-- Eyebrow -->
      <div class="ceo-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-text">KOMENTAR</span>
        <span class="eyebrow-line"></span>
      </div>

      <!-- Avatar di luar card, jadi jembatan -->
      <div class="ceo-avatar-wrap">
        <div class="ceo-avatar-ring"></div>
        <div class="ceo-avatar-ring ring-2"></div>
        <transition name="avatar-fade" mode="out-in">
          <img
            :key="current.avatar"
            :src="current.avatar || 'https://i.pravatar.cc/200?u=ceo'"
            :alt="current.name"
            class="ceo-avatar"
          />
        </transition>
      </div>

      <!-- Card — avatar tidak di dalamnya lagi -->
      <div class="ceo-card">
        <div class="corner-accent tl"></div>
        <div class="corner-accent br"></div>

        <!-- Identitas -->
        <div class="ceo-identity">
          <p class="ceo-label">Pesan dari Pemimpin</p>
          <transition name="txt-fade" mode="out-in">
            <h3 class="ceo-name" :key="current.name">{{ current.name }}</h3>
          </transition>
          <transition name="txt-fade" mode="out-in">
            <p class="ceo-role" :key="current.username">{{ current.username }}</p>
          </transition>
          <p class="ceo-company">{{ appName }}</p>
        </div>

        <!-- Divider -->
        <div class="ceo-divider-full"></div>

        <!-- Quote -->
        <div class="quote-mark" aria-hidden="true">"</div>
        <div class="ceo-quote-wrap">
          <transition :name="slideDir" mode="out-in">
            <blockquote class="ceo-quote" :key="activeIndex">
              <p
                v-for="(para, i) in currentParagraphs"
                :key="i"
                class="quote-para"
                :style="{ animationDelay: `${i * 0.1}s` }"
              >{{ para }}</p>
            </blockquote>
          </transition>
        </div>

        <!-- Signature row -->
        <div class="ceo-sig-row">
          <div class="sig-block">
            <div class="sig-line"></div>
            <transition name="txt-fade" mode="out-in">
              <span class="sig-name" :key="current.name">{{ current.name }}</span>
            </transition>
            <transition name="txt-fade" mode="out-in">
              <span class="sig-title" :key="current.username">{{ current.username }}</span>
            </transition>
          </div>

          <!-- Carousel controls -->
          <div class="carousel-controls" v-if="testimonials.length > 1">
            <div class="carousel-dots">
              <button
                v-for="(_, i) in testimonials" :key="i"
                class="dot" :class="{ active: i === activeIndex }"
                @click="goTo(i)" :aria-label="`Slide ${i + 1}`"
              ></button>
            </div>
            <div class="carousel-arrows">
              <button class="carr-btn" @click="prev" aria-label="Sebelumnya">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <span class="carr-counter">{{ activeIndex + 1 }} / {{ testimonials.length }}</span>
              <button class="carr-btn" @click="next" aria-label="Berikutnya">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Planet seal (1 data) -->
          <div class="sig-seal" v-else>
            <svg class="planet-svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
              <ellipse cx="26" cy="26" rx="20" ry="8" stroke="rgba(96,165,250,0.2)" stroke-width="1" stroke-dasharray="3 3"/>
              <circle cx="26" cy="26" r="9" fill="#1d4ed8" opacity="0.9"/>
              <ellipse cx="23" cy="23" rx="3.5" ry="2.5" fill="#34d399" opacity="0.85"/>
              <ellipse cx="29" cy="27" rx="2.5" ry="2" fill="#34d399" opacity="0.7"/>
              <ellipse cx="25" cy="30" rx="2" ry="1.5" fill="#34d399" opacity="0.6"/>
              <circle cx="22" cy="22" r="2" fill="white" opacity="0.12"/>
              <g class="moon-orbit">
                <circle cx="46" cy="26" r="4" fill="#cbd5e1" opacity="0.9"/>
                <circle cx="45" cy="25" r="1" fill="rgba(0,0,0,0.15)"/>
                <circle cx="47" cy="27" r="0.6" fill="rgba(0,0,0,0.1)"/>
              </g>
              <circle cx="26" cy="26" r="20" stroke="rgba(96,165,250,0.12)" stroke-width="1" fill="none"/>
            </svg>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="autoplay-bar" v-if="testimonials.length > 1">
          <div class="autoplay-progress"
            :style="{ animationDuration: `${AUTO_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }"
            :key="progressKey">
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

const testimonials = computed(() => landingStore.content?.testimonials || [
  {
    id: 1,
    name: 'Fahrur Rozi',
    username: 'CEO & CTO',
    avatar: null,
    content: 'Menjadi perusahaan teknologi informasi yang berdaya saing dengan memberikan layanan dan solusi yang terbaik bagi customer dan stakeholder.',
  },
]);

const appName = computed(() => landingStore.content?.app_name ?? 'McFlyon');

// ── Carousel ──────────────────────────────────────────────────
const AUTO_MS     = 6000;
const activeIndex = ref(0);
const slideDir    = ref('slide-left');
const paused      = ref(false);
const progressKey = ref(0);
let   timer       = null;

const current = computed(() => testimonials.value[activeIndex.value] ?? testimonials.value[0] ?? {});
const currentParagraphs = computed(() =>
  (current.value.content || '').split('\n').filter(p => p.trim().length > 0)
);

const goTo = (i) => {
  slideDir.value = i > activeIndex.value ? 'slide-left' : 'slide-right';
  activeIndex.value = i;
  resetTimer();
};
const next = () => {
  slideDir.value = 'slide-left';
  activeIndex.value = (activeIndex.value + 1) % testimonials.value.length;
  resetTimer();
};
const prev = () => {
  slideDir.value = 'slide-right';
  activeIndex.value = (activeIndex.value - 1 + testimonials.value.length) % testimonials.value.length;
  resetTimer();
};

const startTimer = () => {
  if (testimonials.value.length <= 1) return;
  timer = setInterval(() => {
    slideDir.value = 'slide-left';
    activeIndex.value = (activeIndex.value + 1) % testimonials.value.length;
    progressKey.value++;
  }, AUTO_MS);
};
const resetTimer = () => { clearInterval(timer); progressKey.value++; startTimer(); };

onMounted(() => startTimer());
onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
/* ── Section ── */
.ceo-section {
  position: relative;
  padding: 100px 24px 110px;
  overflow: hidden;
  z-index: 2;
}

/* ── Background ── */
.ceo-bg-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%);
  pointer-events: none;
}
.ceo-bg-orb {
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
}
.orb-l {
  width: 480px; height: 480px; top: -120px; left: -160px;
  background: radial-gradient(circle, rgba(29,78,216,0.12), transparent 70%);
  animation: orbFloat 14s ease-in-out infinite;
}
.orb-r {
  width: 360px; height: 360px; bottom: -80px; right: -100px;
  background: radial-gradient(circle, rgba(139,92,246,0.10), transparent 70%);
  animation: orbFloat 11s ease-in-out infinite reverse;
}
@keyframes orbFloat {
  0%,100% { transform: translate(0,0); }
  50%      { transform: translate(30px,-20px); }
}

/* ── Wrapper ── */
.ceo-wrap {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* ── Eyebrow ── */
.ceo-eyebrow {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 28px;
  z-index: 2;
}
.eyebrow-text {
  font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.18em; color: #3b82f6;
  white-space: nowrap;
}
.eyebrow-line {
  flex: 1; height: 1px; width: 48px;
  background: linear-gradient(90deg, rgba(59,130,246,0.0), rgba(59,130,246,0.4));
}
.eyebrow-line:last-child { transform: scaleX(-1); }

/* ── Card ── */
.ceo-card {
  position: relative;
  width: 100%;
  background: rgba(6,11,30,0.6);
  border: 1px solid rgba(59,130,246,0.15);
  border-radius: 28px;
  padding: 68px 52px 40px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ── Avatar — di antara eyebrow dan card, setengah masuk card ── */
.ceo-avatar-wrap {
  position: relative;
  width: 110px; height: 110px;
  flex-shrink: 0;
  z-index: 4;
  margin-bottom: -55px; /* setengah tinggi masuk ke dalam card */
}
.ceo-avatar {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative; z-index: 2;
  border: 3px solid rgba(59,130,246,0.5);
  box-shadow: 0 0 0 4px rgba(6,11,30,0.8), 0 8px 32px rgba(0,0,0,0.4);
}
.ceo-avatar-ring {
  position: absolute; inset: -7px;
  border-radius: 50%;
  border: 1.5px solid rgba(59,130,246,0.22);
  animation: ringPulse 3s ease-in-out infinite;
}
.ring-2 {
  inset: -15px;
  border-color: rgba(59,130,246,0.09);
  animation-delay: 0.6s;
}
@keyframes ringPulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%     { opacity:0.4; transform:scale(1.03); }
}

/* ── Identity ── */
.ceo-identity { display: flex; flex-direction: column; align-items: center; gap: 4px; margin-bottom: 20px; }
.ceo-label {
  font-size: 0.62rem; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: #3b82f6; margin: 0 0 4px;
}
.ceo-name {
  font-size: 1.35rem; font-weight: 800;
  color: #f1f5f9; margin: 0;
  line-height: 1.2;
}
.ceo-role {
  font-size: 0.8rem; color: #60a5fa;
  margin: 0; font-weight: 500;
}
.ceo-company {
  font-size: 0.7rem; color: #475569;
  margin: 6px 0 0; font-weight: 500;
}

/* ── Divider ── */
.ceo-divider-full {
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent);
  margin-bottom: 36px;
}

/* ── Quote ── */
.quote-mark {
  position: absolute;
  top: 100px; left: 36px;
  font-size: 9rem; line-height: 1;
  font-family: Georgia, 'Times New Roman', serif;
  color: rgba(59,130,246,0.06);
  pointer-events: none; user-select: none; font-weight: 900;
}
.ceo-quote-wrap {
  position: relative;
  min-height: 100px;
  width: 100%;
  margin-bottom: 36px;
}
.ceo-quote { margin: 0; }
.quote-para {
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  font-weight: 500;
  line-height: 1.8;
  color: #c8d5f0;
  margin: 0 0 16px;
  animation: fadeUp 0.6s ease both;
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
}
.quote-para:last-child { margin-bottom: 0; }
@keyframes fadeUp {
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
}

/* ── Sig row ── */
.ceo-sig-row {
  display: flex; align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 24px;
  border-top: 1px solid rgba(59,130,246,0.1);
}
.sig-block { display: flex; flex-direction: column; gap: 3px; text-align: left; }
.sig-line {
  width: 64px; height: 2px;
  background: linear-gradient(90deg, rgba(251,191,36,0.7), rgba(251,191,36,0.05));
  margin-bottom: 6px; border-radius: 2px;
}
.sig-name  { font-size: 0.9rem; font-weight: 700; color: #f8fafc; }
.sig-title { font-size: 0.72rem; color: #60a5fa; font-weight: 500; }

/* ── Planet seal ── */
.sig-seal { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.planet-svg { overflow: visible; }
.moon-orbit { transform-origin: 26px 26px; animation: moonOrbit 4s linear infinite; }
@keyframes moonOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ── Carousel controls ── */
.carousel-controls { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.carousel-dots { display: flex; gap: 6px; align-items: center; }
.dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(255,255,255,0.2); border: none; cursor: pointer; padding: 0;
  transition: all 0.3s ease;
}
.dot.active { width: 20px; border-radius: 3px; background: #3b82f6; }
.carousel-arrows { display: flex; align-items: center; gap: 8px; }
.carr-btn {
  width: 30px; height: 30px; border-radius: 8px;
  background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2);
  color: #60a5fa; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s ease;
}
.carr-btn:hover { background: rgba(59,130,246,0.2); border-color: rgba(59,130,246,0.4); transform: scale(1.05); }
.carr-counter { font-size: 0.7rem; color: #64748b; font-weight: 600; min-width: 32px; text-align: center; }

/* ── Progress bar ── */
.autoplay-bar {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 2px; background: rgba(59,130,246,0.08);
  border-radius: 0 0 28px 28px; overflow: hidden;
  /* clip agar tidak meluber keluar card */
  clip-path: inset(0 0 0 0 round 0 0 28px 28px);
}
.autoplay-progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  animation: progressFill linear forwards;
}
@keyframes progressFill { from { width: 0%; } to { width: 100%; } }

/* ── Corner accents ── */
.corner-accent { position: absolute; width: 28px; height: 28px; pointer-events: none; }
.corner-accent.tl { top: 0; left: 0; border-top: 2px solid rgba(59,130,246,0.35); border-left: 2px solid rgba(59,130,246,0.35); border-radius: 28px 0 0 0; }
.corner-accent.br { bottom: 0; right: 0; border-bottom: 2px solid rgba(59,130,246,0.35); border-right: 2px solid rgba(59,130,246,0.35); border-radius: 0 0 28px 0; }

/* ── Transitions ── */
.slide-left-enter-active,  .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
  position: absolute; width: 100%;
}
.slide-left-enter-from  { opacity:0; transform:translateX(40px); }
.slide-left-leave-to    { opacity:0; transform:translateX(-40px); }
.slide-right-enter-from { opacity:0; transform:translateX(-40px); }
.slide-right-leave-to   { opacity:0; transform:translateX(40px); }

.avatar-fade-enter-active, .avatar-fade-leave-active { transition: all 0.35s ease; }
.avatar-fade-enter-from, .avatar-fade-leave-to { opacity:0; transform:scale(0.9); }
.txt-fade-enter-active, .txt-fade-leave-active { transition: all 0.25s ease; }
.txt-fade-enter-from, .txt-fade-leave-to { opacity:0; transform:translateY(6px); }

/* ── Responsive ── */
@media (max-width: 600px) {
  .ceo-section  { padding : 80px 16px 80px; }
  .ceo-card     { padding: 0 24px 36px; }
  .quote-para   { font-size: 0.98rem; }
  .quote-mark   { font-size: 6rem; }
}
</style>