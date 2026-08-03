<template>
  <section v-if="hero" class="svc-page">

    <!-- ═══ BACKGROUND LAYERS ═══ -->
    <div class="bg-grid"></div>
    <div class="bg-noise"></div>
    <div class="bg-orb orb-a"></div>
    <div class="bg-orb orb-b"></div>

    <div class="container-xxl">

      <!-- ═══ HERO ═══ -->
      <div class="hero-wrap" :class="{ 'has-img': hero.image, animate }">

        <div class="hero-text">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span class="eyebrow-label">LAYANAN KAMI</span>
            <span class="eyebrow-line"></span>
          </div>

          <h1 class="hero-title">
            <template v-for="(word, idx) in titleWords" :key="idx">
              <span class="word-wrap">
                <span class="word" :class="{ accent: word.accent }" :style="{ animationDelay: word.delay }">
                  {{ word.text }}
                </span>
              </span>
              <span v-if="!word.isLast">&nbsp;</span>
            </template>
          </h1>

          <p class="hero-sub">{{ hero.subtitle }}</p>

          <a
            class="hero-cta"
            :href="hero.button_link || '#layanan-grid'"
            @click.prevent="scrollToGrid"
          >
            <span class="cta-text">{{ hero.button_text || 'Jelajahi Layanan' }}</span>
            <span class="cta-arrow">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M5 11l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
        </div>

        <div v-if="hero.image" class="hero-visual">
          <div class="visual-glow"></div>
          <div class="visual-frame">
            <img :src="getImageUrl(hero.image)" alt="Hero Layanan" class="hero-img" />
            <div class="visual-shine"></div>
          </div>
          <div class="corner c-tl"></div>
          <div class="corner c-br"></div>
        </div>

      </div>

      <!-- ═══ DIVIDER ═══ -->
      <div class="section-divider" id="layanan-grid">
        <span class="divider-line"></span>
        <span class="divider-badge">{{ services?.length || 0 }} Layanan</span>
        <span class="divider-line"></span>
      </div>

      <!-- ═══ SERVICES GRID ═══ -->
      <div v-if="services && services.length" class="cards-wrap">
        <div
          v-for="item in services"
          :key="item.id"
          class="svc-card"
        >
          <!-- Icon -->
          <div class="card-icon">
            <img v-if="item.icon" :src="`/${item.icon}`" :alt="item.title" class="icon-img" />

            <svg v-else-if="getIconType(item.title) === 'consult'" class="icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>

            <svg v-else-if="getIconType(item.title) === 'web'" class="icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>

            <svg v-else-if="getIconType(item.title) === 'mobile'" class="icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>

            <svg v-else-if="getIconType(item.title) === 'software'" class="icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>

            <svg v-else-if="getIconType(item.title) === 'network'" class="icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="5" cy="6" r="2.5" />
              <circle cx="19" cy="6" r="2.5" />
              <circle cx="12" cy="18" r="2.5" />
              <line x1="7" y1="7.5" x2="10.3" y2="16" />
              <line x1="17" y1="7.5" x2="13.7" y2="16" />
            </svg>

            <svg v-else-if="getIconType(item.title) === 'api'" class="icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>

            <svg v-else class="icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>

          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.description }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

export interface HeroData {
  title?: string; subtitle?: string;
  button_text?: string; button_link?: string; image?: string;
}
export interface ServiceData {
  id: number; title: string; description: string; icon?: string;
}

const props = defineProps<{
  hero?: HeroData | null;
  services?: ServiceData[];
}>();

defineEmits(['explore']);

const animate = ref(false);
onMounted(() => { setTimeout(() => (animate.value = true), 80); });

const titleWords = computed(() => {
  if (!props.hero?.title) return [];
  const words = props.hero.title.split(' ');
  return words.map((text: string, i: number) => ({
    text, delay: `${i * 65 + 180}ms`,
    accent: i === words.length - 1,
    isLast: i === words.length - 1,
  }));
});

const getImageUrl = (p?: string) => {
  if (!p) return '';
  if (p.startsWith('http')) return p;
  return `http://127.0.0.1:8000/storage/${p}`;
};

const scrollToGrid = () => {
  document.getElementById('layanan-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Icon fallback dipilih berdasarkan kata kunci di judul layanan —
// dipakai kalau item.icon dari backend belum ada.
const getIconType = (title = '') => {
  const t = title.toLowerCase();
  if (t.includes('konsultasi')) return 'consult';
  if (t.includes('web')) return 'web';
  if (t.includes('mobile') || t.includes('aplikasi')) return 'mobile';
  if (t.includes('network') || t.includes('jaringan')) return 'network';
  if (t.includes('api') || t.includes('integrasi')) return 'api';
  if (t.includes('software') || t.includes('engineering') || t.includes('analysis')) return 'software';
  return 'default';
};
</script>

<style scoped>
.svc-page {
  position: relative;
  padding: 96px 0 120px;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
  overflow: hidden;
  isolation: isolate;
}

.bg-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black 0%, transparent 100%);
}
.bg-noise {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
.bg-orb { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
.orb-a { width: 700px; height: 700px; top: -180px; left: -200px; background: radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 65%); filter: blur(60px); }
.orb-b { width: 500px; height: 500px; bottom: 0; right: -100px; background: radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 65%); filter: blur(80px); }

/* HERO */
.hero-wrap {
  position: relative; z-index: 2;
  display: grid; align-items: center;
  grid-template-columns: 1fr;
  max-width: 1120px; margin: 0 auto; gap: 60px;
}
.hero-wrap.has-img { grid-template-columns: 1fr 1fr; }
.hero-text { display: flex; flex-direction: column; align-items: flex-start; gap: 0; }
.hero-wrap:not(.has-img) .hero-text { align-items: center; text-align: center; max-width: 680px; margin: 0 auto; }

.eyebrow {
  display: flex; align-items: center; gap: 10px; margin-bottom: 26px;
  opacity: 0; transform: translateX(-16px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.animate .eyebrow { opacity: 1; transform: translateX(0); }
.eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #3b82f6;
  box-shadow: 0 0 10px rgba(59,130,246,0.8);
  animation: pulse-dot 2.2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 6px rgba(59,130,246,0.6); }
  50%       { box-shadow: 0 0 14px rgba(59,130,246,1); }
}
.eyebrow-label { font-size: 0.62rem; font-weight: 800; letter-spacing: 0.25em; color: #3b82f6; text-transform: uppercase; }
.eyebrow-line  { width: 40px; height: 1px; background: linear-gradient(90deg, rgba(59,130,246,0.6), transparent); }

.hero-title {
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 800; line-height: 1.15; letter-spacing: -0.04em;
  color: #e8eeff; margin: 0 0 22px;
  display: flex; flex-wrap: wrap; align-items: baseline;
}
.hero-wrap:not(.has-img) .hero-title {
  justify-content: center;
}
.word-wrap { overflow: hidden; display: inline-block; }
.word { display: inline-block; opacity: 0; transform: translateY(100%); }
.animate .word { animation: wordReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes wordReveal {
  from { opacity: 0; transform: translateY(90%) skewY(3deg); }
  to   { opacity: 1; transform: translateY(0) skewY(0deg); }
}
.word.accent {
  background: linear-gradient(130deg, #93c5fd 0%, #60a5fa 35%, #a78bfa 80%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.hero-sub {
  font-size: 1.02rem; color: #94a3b8; line-height: 1.85;
  margin: 0 0 38px; max-width: 500px;
  opacity: 0; transform: translateY(14px); filter: blur(3px);
  transition: opacity 0.75s 0.38s ease, transform 0.75s 0.38s ease, filter 0.75s 0.38s ease;
}
.animate .hero-sub { opacity: 1; transform: translateY(0); filter: blur(0); }
.hero-wrap:not(.has-img) .hero-sub { max-width: 100%; }

.hero-cta {
  position: relative; display: inline-flex; align-items: center; gap: 12px;
  padding: 0; cursor: pointer; text-decoration: none;
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.65s 0.52s ease, transform 0.65s 0.52s ease;
}
.animate .hero-cta { opacity: 1; transform: translateY(0); }
.cta-text {
  font-size: 0.9rem; font-weight: 700; color: #e2e8f0;
  padding: 12px 26px; border: 1.5px solid rgba(59,130,246,0.45);
  border-radius: 50px; background: rgba(29,78,216,0.08);
  transition: all 0.35s ease; letter-spacing: 0.01em;
}
.hero-cta:hover .cta-text {
  background: rgba(29,78,216,0.22); border-color: rgba(59,130,246,0.8);
  color: #fff; box-shadow: 0 0 28px rgba(29,78,216,0.3);
}
.cta-arrow {
  width: 42px; height: 42px; border-radius: 50%;
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
  display: flex; align-items: center; justify-content: center; color: #fff;
  box-shadow: 0 6px 20px rgba(29,78,216,0.4);
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
}
.hero-cta:hover .cta-arrow { transform: translateY(3px) scale(1.08); box-shadow: 0 10px 28px rgba(29,78,216,0.55); }

.hero-visual {
  position: relative;
  opacity: 0; transform: translateX(28px) scale(0.97);
  transition: all 1s 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.animate.has-img .hero-visual { opacity: 1; transform: translateX(0) scale(1); }
.visual-glow { position: absolute; inset: -30px; background: radial-gradient(ellipse at 50% 50%, rgba(29,78,216,0.2) 0%, transparent 65%); filter: blur(24px); z-index: 0; }
.visual-frame { position: relative; border-radius: 24px; overflow: hidden; z-index: 1; border: 1px solid rgba(255,255,255,0.07); box-shadow: 0 4px 6px rgba(0,0,0,0.05), 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06); }
.hero-img { width: 100%; display: block; max-height: 440px; object-fit: cover; transition: transform 0.7s ease; }
.hero-visual:hover .hero-img { transform: scale(1.04); }
.visual-shine { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(2,6,23,0.25) 100%); }
.corner { position: absolute; width: 20px; height: 20px; z-index: 2; }
.c-tl { top: -3px; left: -3px; border-top: 2px solid rgba(59,130,246,0.8); border-left: 2px solid rgba(59,130,246,0.8); border-radius: 2px 0 0 0; }
.c-br { bottom: -3px; right: -3px; border-bottom: 2px solid rgba(139,92,246,0.8); border-right: 2px solid rgba(139,92,246,0.8); border-radius: 0 0 2px 0; }

/* DIVIDER */
.section-divider { display: flex; align-items: center; gap: 20px; margin: 88px auto 64px; max-width: 1120px; scroll-margin-top: 40px; }
.divider-line  { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent); }
.divider-badge { display: inline-flex; align-items: center; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; padding: 7px 16px; border-radius: 20px; border: 1px solid rgba(59,130,246,0.15); background: rgba(59,130,246,0.05); white-space: nowrap; }

/* CARDS — disamakan dengan LandingServices.vue: tanpa warna aksen, tanpa angka, tanpa reveal animation, cuma smooth zoom */
.cards-wrap {
  position: relative; z-index: 2;
  max-width: 1120px; margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
}

.svc-card {
  position: relative;
  padding: 48px 40px 40px;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(12, 18, 38, 0.85);
  display: flex; flex-direction: column;
  cursor: default;
  transition: transform 0.3s ease;
}
.svc-card:hover {
  transform: scale(1.03);
}

/* Icon — netral, satu warna untuk semua card */
.card-icon {
  width: 52px; height: 52px; border-radius: 14px; margin-bottom: 28px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: #e2eaff;
}
.icon-img { width: 26px; height: 26px; object-fit: contain; }
img.icon-img { filter: brightness(0) invert(1); }

.card-title {
  font-size: 1.35rem; font-weight: 700; color: #e2e8f0;
  margin: 0 0 14px; letter-spacing: -0.025em; line-height: 1.3;
}

.card-desc {
  font-size: 0.92rem; color: #64748b; line-height: 1.8; margin: 0;
  flex: 1;
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .hero-wrap.has-img { grid-template-columns: 1fr; text-align: center; }
  .hero-wrap.has-img .hero-text { align-items: center; }
  .hero-wrap.has-img .hero-sub { max-width: 100%; }
  .hero-visual { max-width: 520px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .svc-page { padding: 72px 0 88px; }
  .hero-title { font-size: 2rem; }
  .section-divider { margin: 64px auto 48px; }
  .cards-wrap { grid-template-columns: 1fr; gap: 16px; }
  .svc-card { padding: 36px 28px 30px; }
}
@media (max-width: 480px) {
  .svc-page { padding: 56px 0 72px; }
  .hero-title { font-size: 1.7rem; }
  .svc-card { padding: 28px 22px 24px; }
  .card-title { font-size: 1.15rem; }
}
</style>
