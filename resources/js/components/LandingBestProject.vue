<template>
  <section class="proj-section" v-if="projects.length > 0">


    <div class="container-xxl">

      <!-- Header -->
      <div class="proj-header">
        <div class="proj-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">PORTOFOLIO</span>
          <span class="eyebrow-line"></span>
        </div>
        <h2 class="proj-title">Proyek Terbaik Kami</h2>
        <p class="proj-subtitle">Karya nyata yang telah kami bangun bersama klien terpercaya di berbagai industri.</p>
      </div>

      <!-- Project list -->
      <div class="proj-list">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="proj-card"
          :class="{ 'proj-card--reverse': index % 2 !== 0 }"
          :style="{ '--delay': `${index * 0.12}s` }"
        >
          <!-- Nomor dekoratif -->
          <span class="proj-num">{{ String(index + 1).padStart(2, '0') }}</span>

          <!-- Visual -->
          <div class="proj-visual">
            <div class="proj-frame">
              <div class="proj-frame-glow"></div>
              <img :src="getImageUrl(project.image)" :alt="project.title" class="proj-img"/>
              <div class="proj-corner tl"></div>
              <div class="proj-corner br"></div>
            </div>
            <div class="proj-dots"></div>
          </div>

          <!-- Info -->
          <div class="proj-info">
            <div class="proj-tag">
              <span class="tag-dot"></span>
              Proyek Unggulan
            </div>
            <h3 class="proj-name">{{ project.title }}</h3>
            <div class="proj-divider"></div>
            <p class="proj-desc" v-if="project.description">{{ project.description }}</p>

            <!-- Tombol: liquid fill persis seperti navbar -->
            <a v-if="project.link_project" :href="project.link_project" class="proj-btn" target="_blank">
              <span class="btn-fill"></span>
              <span class="btn-text">
                Kunjungi Website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { mockBestProjects } from '@/mocks/landingMock';

const projects = ref([]);

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const backendUrl = 'http://127.0.0.1:8000';
  return path.startsWith('/') ? `${backendUrl}${path}` : `${backendUrl}/${path}`;
};

const fetchProjects = async () => {
  try {
    const response = await axios.get('/api/front/best-projects');
    projects.value = response.data.data || [];
  } catch (error) {
    console.error('Gagal memuat proyek terbaik:', error);
    // ── SEMENTARA: kalau API gagal (404), pakai dummy data
    projects.value = mockBestProjects;
  }
};

onMounted(() => fetchProjects());
</script>

<style scoped>
/* ══════════════════════════════════════════
   SECTION
══════════════════════════════════════════ */
.proj-section {
  background: transparent;
  position: relative;
  padding: 108px 24px 120px;
  z-index: 2;
  overflow: hidden;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
}

/* ══════════════════════════════════════════
   HEADER
══════════════════════════════════════════ */
.proj-header {
  text-align: center;
  margin-bottom: 80px;
  max-width: 600px;
  margin-left: auto; margin-right: auto;
  position: relative; z-index: 2;
}
.proj-eyebrow {
  display: flex; align-items: center; justify-content: center;
  gap: 14px; margin-bottom: 22px;
}
.eyebrow-line {
  flex: 1; max-width: 48px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5));
}
.eyebrow-line:last-child { transform: scaleX(-1); }
.eyebrow-text {
  font-size: 0.65rem; font-weight: 800;
  letter-spacing: 0.22em; color: #3b82f6;
  text-transform: uppercase;
}
.proj-title {
  font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 800;
  color: #e8eeff; margin: 0 0 18px;
  letter-spacing: -0.04em; line-height: 1.1;
}
.proj-subtitle {
  font-size: 1rem; color: #4a5e80; line-height: 1.75; margin: 0;
}

/* ══════════════════════════════════════════
   LIST
══════════════════════════════════════════ */
.proj-list {
  display: flex; flex-direction: column;
  gap: 28px;
  max-width: 1100px; margin: 0 auto;
  position: relative; z-index: 2;
}

/* ══════════════════════════════════════════
   CARD
══════════════════════════════════════════ */
.proj-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  padding: 44px 52px;
  border-radius: 24px;
  background:
    radial-gradient(ellipse 60% 80% at 0% 50%, rgba(29,78,216,0.06) 0%, transparent 60%),
    rgba(8,14,36,0.45);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
  transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s;
  animation: cardIn 0.6s ease both;
  animation-delay: var(--delay, 0s);
}
.proj-card--reverse {
  background:
    radial-gradient(ellipse 60% 80% at 100% 50%, rgba(29,78,216,0.06) 0%, transparent 60%),
    rgba(8,14,36,0.45);
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
.proj-card:hover {
  border-color: rgba(59,130,246,0.22);
  box-shadow:
    0 32px 80px rgba(0,0,0,0.45),
    0 0 0 1px rgba(59,130,246,0.08);
  transform: translateY(-4px);
}

/* Reverse */
.proj-card--reverse { direction: rtl; }
.proj-card--reverse > * { direction: ltr; }

/* Nomor dekoratif */
.proj-num {
  position: absolute;
  bottom: 16px; right: 36px;
  font-size: 8rem; font-weight: 900;
  color: rgba(59,130,246,0.04);
  letter-spacing: -0.06em; line-height: 1;
  pointer-events: none; user-select: none;
  font-variant-numeric: tabular-nums;
  transition: color 0.4s;
}
.proj-card:hover .proj-num { color: rgba(59,130,246,0.07); }
.proj-card--reverse .proj-num { right: auto; left: 36px; }

/* ══════════════════════════════════════════
   VISUAL
══════════════════════════════════════════ */
.proj-visual { position: relative; }

.proj-frame {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(15,23,42,0.55);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  transition: transform 0.45s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.4s, border-color 0.4s;
}
.proj-card:hover .proj-frame {
  transform: translateY(-6px) scale(1.01);
  border-color: rgba(59,130,246,0.25);
  box-shadow: 0 36px 72px rgba(0,0,0,0.55), 0 0 28px rgba(59,130,246,0.07);
}
.proj-frame-glow {
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse 90% 50% at 50% 0%, rgba(59,130,246,0.09), transparent 65%);
  pointer-events: none;
}
.proj-img {
  position: relative; z-index: 1;
  width: 100%; height: 260px;
  object-fit: cover; display: block;
  transition: transform 0.5s ease;
}
.proj-card:hover .proj-img { transform: scale(1.04); }

/* Corner accents */
.proj-corner {
  position: absolute; width: 18px; height: 18px; z-index: 2;
  pointer-events: none; transition: opacity 0.3s;
  opacity: 0.5;
}
.proj-card:hover .proj-corner { opacity: 1; }
.proj-corner.tl {
  top: 0; left: 0;
  border-top: 2px solid #3b82f6;
  border-left: 2px solid #3b82f6;
  border-radius: 14px 0 0 0;
}
.proj-corner.br {
  bottom: 0; right: 0;
  border-bottom: 2px solid #3b82f6;
  border-right: 2px solid #3b82f6;
  border-radius: 0 0 14px 0;
}

/* Dot grid */
.proj-dots {
  position: absolute;
  bottom: -16px; right: -16px;
  width: 72px; height: 72px;
  background-image: radial-gradient(circle, rgba(59,130,246,0.22) 1px, transparent 1px);
  background-size: 10px 10px;
  pointer-events: none; z-index: -1;
}
.proj-card--reverse .proj-dots { right: auto; left: -16px; }

/* ══════════════════════════════════════════
   INFO
══════════════════════════════════════════ */
.proj-info {
  display: flex; flex-direction: column; gap: 14px;
}

.proj-tag {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.62rem; font-weight: 800;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: #3b82f6;
  padding: 5px 14px 5px 10px;
  border: 1px solid rgba(59,130,246,0.22);
  border-radius: 100px;
  background: rgba(59,130,246,0.06);
  width: fit-content;
}
.tag-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 6px rgba(59,130,246,0.8);
  animation: tagPulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes tagPulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.4; transform:scale(0.75); }
}

.proj-name {
  font-size: clamp(1.5rem, 2.2vw, 2rem); font-weight: 800;
  color: #dde8ff; margin: 0;
  letter-spacing: -0.03em; line-height: 1.2;
  transition: color 0.25s;
}
.proj-card:hover .proj-name { color: #ffffff; }

.proj-divider {
  width: 40px; height: 2px;
  background: linear-gradient(90deg, #3b82f6, rgba(59,130,246,0.08));
  border-radius: 2px;
}

.proj-desc {
  font-size: 0.9rem; color: #3d5070; line-height: 1.8; margin: 0;
}

/* ══════════════════════════════════════════
   TOMBOL — Liquid Fill (sama persis navbar)
══════════════════════════════════════════ */
.proj-btn {
  position: relative;
  display: inline-flex; align-items: center;
  padding: 11px 26px;
  border-radius: 50px;
  border: 1.5px solid rgba(59,130,246,0.5);
  background: transparent;
  color: #93c5fd;
  font-size: 0.84rem; font-weight: 600;
  letter-spacing: 0.04em; text-transform: uppercase;
  text-decoration: none;
  overflow: hidden;
  width: fit-content;
  transition: color 0.35s ease, border-color 0.35s ease, transform 0.2s ease;
}
.proj-btn:hover {
  color: #fff;
  border-color: #3b82f6;
  transform: translateY(-1px);
}
.proj-btn:active {
  transform: translateY(1px);
  transition: transform 0.08s ease;
}

/* Fill naik dari bawah saat hover */
.btn-fill {
  position: absolute; inset: 0;
  border-radius: 50px;
  background: #1d4ed8;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
  z-index: 0;
}
.proj-btn:hover .btn-fill { transform: translateY(0); }
.proj-btn:active .btn-fill { background: #1e40af; }

/* Teks & ikon di atas fill */
.btn-text {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-text svg {
  transition: transform 0.25s ease;
}
.proj-btn:hover .btn-text svg {
  transform: translate(2px, -2px);
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media (max-width: 900px) {
  .proj-section { background: transparent; padding: 72px 16px 80px; }
  .proj-list { gap: 20px; }
  .proj-card {
    grid-template-columns: 1fr;
    gap: 24px; padding: 28px 22px 36px;
  }
  .proj-card--reverse { direction: ltr; }
  .proj-num { font-size: 5rem; bottom: 10px; right: 16px; }
  .proj-card--reverse .proj-num { left: 16px; right: auto; }
  .proj-img { height: 200px; }
  .proj-name { font-size: 1.4rem; }
  .proj-dots { display: none; }
}
@media (max-width: 480px) {
  .proj-section { padding: 56px 14px 64px; }
  .proj-card { padding: 22px 16px 28px; gap: 20px; }
  .proj-img { height: 160px; border-radius: 10px; }
  .proj-name { font-size: 1.2rem; }
  .proj-num { font-size: 3.5rem; }
  .proj-desc { font-size: 0.88rem; }
  .proj-tags { gap: 6px; }
  .proj-tag { font-size: 0.68rem; padding: 4px 10px; }
}
@media (max-width: 360px) {
  .proj-name { font-size: 1.05rem; }
  .proj-img { height: 130px; }
  .proj-section { padding: 48px 12px 56px; }
}
</style>