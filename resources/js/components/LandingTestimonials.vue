<template>
  <section class="ceo-section">
    <div class="ceo-wrap">
      <div class="ceo-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-text">KOMENTAR</span>
        <span class="eyebrow-line"></span>
      </div>

      <div class="ceo-avatar-wrap">
        <div class="ceo-avatar-ring"></div>
        <div class="ceo-avatar-ring ring-2"></div>
        <img
          :src="ceoPhoto || 'https://i.pravatar.cc/200?u=ceo'"
          :alt="ceoName"
          class="ceo-avatar"
        />
      </div>

      <div class="ceo-card">
        <div class="corner-accent tl"></div>
        <div class="corner-accent br"></div>

        <div class="ceo-identity">
          <h3 class="ceo-name">{{ ceoName }}</h3>
          <p class="ceo-role">{{ ceoPosition }}</p>
        </div>

        <div class="ceo-divider-full"></div>

        <div class="quote-mark" aria-hidden="true">"</div>
        <div class="ceo-quote-wrap">
          <blockquote class="ceo-quote">
            <p
              v-for="(para, i) in ceoCommentParagraphs"
              :key="i"
              class="quote-para"
              :style="{ animationDelay: `${i * 0.1}s` }"
            >{{ para }}</p>
          </blockquote>
        </div>

        <div class="ceo-sig-row">
          <div class="sig-block">
            <div class="sig-line"></div>
            <span class="sig-name">{{ ceoName }}</span>
            <span class="sig-title">{{ ceoPosition }}</span>
          </div>

          <div class="sig-seal">
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useLandingStore } from '@/stores/landing';

const landingStore = useLandingStore();

const ceoName = computed(() => landingStore.content?.ceo_name || 'Fahrur Rozi');
const ceoPosition = computed(() => landingStore.content?.ceo_position || '');
const ceoComment = computed(() => landingStore.content?.ceo_comment || '');
const ceoPhoto = computed(() =>
  landingStore.content?.ceo_photo ? `/storage/${landingStore.content.ceo_photo}` : null
);

const ceoCommentParagraphs = computed(() =>
  ceoComment.value.split('\n').filter(p => p.trim().length > 0)
);

onMounted(async () => {
  if (!landingStore.content || !Object.keys(landingStore.content).length) {
    await landingStore.fetchContent();
  }
});
</script>

<style scoped>
.ceo-section {
  background: transparent;
  position: relative;
  padding: 100px 24px 110px;
  overflow: hidden;
  z-index: 2;
}
.ceo-wrap {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
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
.ceo-card {
  position: relative;
  width: 100%;
  background: rgba(6,11,30,0.35);
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
.ceo-avatar-wrap {
  position: relative;
  width: 110px; height: 110px;
  flex-shrink: 0;
  z-index: 4;
  margin-bottom: -55px;
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
.ceo-identity { display: flex; flex-direction: column; align-items: center; gap: 4px; margin-bottom: 20px; margin-top: 16px; }
.ceo-name {
  font-size: 1.35rem; font-weight: 800;
  color: #f1f5f9; margin: 0;
  line-height: 1.2;
}
.ceo-role {
  font-size: 0.8rem; color: #60a5fa;
  margin: 0; font-weight: 500;
}
.ceo-divider-full {
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent);
  margin-bottom: 36px;
}
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
.sig-seal { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.planet-svg { overflow: visible; }
.moon-orbit { transform-origin: 26px 26px; animation: moonOrbit 4s linear infinite; }
@keyframes moonOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.corner-accent { position: absolute; width: 28px; height: 28px; pointer-events: none; }
.corner-accent.tl { top: 0; left: 0; border-top: 2px solid rgba(59,130,246,0.35); border-left: 2px solid rgba(59,130,246,0.35); border-radius: 28px 0 0 0; }
.corner-accent.br { bottom: 0; right: 0; border-bottom: 2px solid rgba(59,130,246,0.35); border-right: 2px solid rgba(59,130,246,0.35); border-radius: 0 0 28px 0; }
@media (max-width: 768px) {
  .ceo-section { padding: 80px 20px 88px; }
  .ceo-card { padding: 80px 28px 36px; }
  .quote-para { font-size: 1rem; }
  .quote-mark { font-size: 6rem; }
}
@media (max-width: 600px) {
  .ceo-section       { padding: 72px 16px 80px; }
  .ceo-card          { padding: 72px 20px 32px; }
  .ceo-avatar-wrap   { width: 90px; height: 90px; margin-bottom: -45px; }
  .ceo-identity      { margin-top: 0; }
  .quote-para        { font-size: 0.95rem; }
  .quote-mark        { font-size: 5rem; top: 80px; left: 20px; }
}
@media (max-width: 360px) {
  .ceo-section { padding: 56px 12px 64px; }
  .ceo-card { padding: 64px 16px 28px; }
  .quote-para { font-size: 0.88rem; }
  .ceo-avatar-wrap { width: 76px; height: 76px; margin-bottom: -38px; }
}
</style>