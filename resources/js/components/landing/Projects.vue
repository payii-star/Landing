<template>
  <section class="projects-section py-5">
    <div class="container">

      <!-- ════ SKELETON saat loading ════ -->
      <template v-if="projectStore.loading">

        <!-- Skeleton featured -->
        <div v-for="n in 2" :key="'sf-' + n" class="featured-project">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="skeleton skeleton-featured-img"></div>
            </div>
            <div class="col-lg-6">
              <div class="skeleton skeleton-label"></div>
              <div class="skeleton skeleton-title mt-3"></div>
              <div class="skeleton skeleton-desc mt-3"></div>
              <div class="skeleton skeleton-desc mt-2" style="width:75%"></div>
              <div class="skeleton skeleton-btn mt-4"></div>
            </div>
          </div>
        </div>

        <!-- Skeleton grid -->
        <div class="row g-4 mt-2">
          <div v-for="n in 6" :key="'sg-' + n" class="col-lg-4 col-md-6">
            <div class="project-card">
              <div class="skeleton skeleton-card-img"></div>
              <div class="project-content">
                <div class="skeleton skeleton-desc"></div>
                <div class="skeleton skeleton-desc mt-2" style="width:60%"></div>
              </div>
            </div>
          </div>
        </div>

      </template>

      <!-- ════ KONTEN ASLI ════ -->
      <template v-else>

        <div
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="featured-project"
        >
          <div class="row align-items-center" :class="{ 'flex-row-reverse': index % 2 !== 0 }">

            <!-- IMAGE / PLACEHOLDER -->
            <div class="col-lg-6">
              <div
                class="featured-image featured-placeholder"
                :style="{ background: getGradient(project.id) }"
              >
                <span class="placeholder-initials">{{ getInitials(project.title) }}</span>
              </div>
            </div>

            <!-- TEXT -->
            <div class="col-lg-6">
              <span class="featured-label">Featured Project</span>
              <h2 class="featured-title">{{ project.title }}</h2>
              <p class="featured-desc">{{ project.description }}</p>
              <router-link :to="`/projects/${project.slug}`" class="featured-btn">
                View Case Study →
              </router-link>
            </div>

          </div>
        </div>

        <div class="row g-4">
          <div
            v-for="project in gridProjects"
            :key="project.id"
            class="col-lg-4 col-md-6"
          >
            <div class="project-card">
              <div class="project-image-wrapper">
                <div
                  class="project-image project-placeholder"
                  :style="{ background: getGradient(project.id) }"
                >
                  <span class="placeholder-initials">{{ getInitials(project.title) }}</span>
                </div>
                <div class="project-overlay">
                  <h5 class="overlay-title">{{ project.title }}</h5>
                </div>
              </div>
              <div class="project-content">
                <p class="project-desc">{{ project.description }}</p>
                <router-link :to="`/projects/${project.slug}`" class="project-btn">
                  View Project →
                </router-link>
              </div>
            </div>
          </div>

          <div v-if="projectStore.projects.length === 0" class="text-center text-muted py-4">
            No projects available yet.
          </div>
        </div>

      </template>

    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

const featuredProjects = computed(() => projectStore.projects.slice(0, 3))
const gridProjects = computed(() => projectStore.projects.slice(3))

// ── PLACEHOLDER VISUAL (sementara, sampai ada gambar asli tiap proyek) ──
// Ganti <img> broken jadi kotak gradient + inisial nama, biar semua card
// konsisten tampilannya (nggak ada yang collapse/pecah beda-beda).
const GRADIENTS = [
  'linear-gradient(135deg, #1d4ed8, #0f172a)',
  'linear-gradient(135deg, #7c3aed, #1e1b4b)',
  'linear-gradient(135deg, #0891b2, #0c2f3d)',
  'linear-gradient(135deg, #059669, #052e22)',
  'linear-gradient(135deg, #dc2626, #2b0a0a)',
  'linear-gradient(135deg, #d97706, #2b1a05)',
]
function getGradient(id) {
  return GRADIENTS[id % GRADIENTS.length]
}
function getInitials(title) {
  if (!title) return '?'
  const clean = title.replace(/[^A-Za-z0-9\s]/g, ' ').trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

onMounted(async () => {
  // Hanya fetch jika belum ada data (cache Pinia)
  if (projectStore.projects.length === 0) {
    await projectStore.fetchProjects()
  }
})
</script>

<style scoped>
.projects-section {
  background: transparent;

  padding-bottom: 120px;
  position: relative;
  z-index: 1;
}

/* ════ SKELETON ════ */
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.09) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 10px;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.skeleton-featured-img { width: 100%; height: 380px; border-radius: 16px; }
.skeleton-card-img     { width: 100%; height: 230px; border-radius: 0; }
.skeleton-label  { width: 130px; height: 26px; border-radius: 999px; }
.skeleton-title  { width: 80%;  height: 48px; }
.skeleton-desc   { width: 100%; height: 18px; }
.skeleton-btn    { width: 160px; height: 42px; border-radius: 10px; }

/* ════ CARDS ════ */
.project-card {
  background: #181e29;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.35s ease;
  height: 100%;
  border: 1px solid rgba(255,255,255,0.05);
}
.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.35);
}

/* ════ IMAGE ════ */
.project-image-wrapper {
  position: relative;
  overflow: hidden;
}
.project-image {
  width: 100%;
  height: 230px;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.project-card:hover .project-image {
  transform: scale(1.08);
}

/* ════ PLACEHOLDER (gradient + inisial, pengganti sementara gambar asli) ════ */
.project-placeholder,
.featured-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}
.placeholder-initials {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.28);
  user-select: none;
}
.featured-placeholder .placeholder-initials {
  font-size: 4rem;
}

/* ════ OVERLAY ════ */
.project-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0));
}
.overlay-title {
  color: white;
  font-weight: 600;
  margin: 0;
}

/* ════ CONTENT ════ */
.project-content { padding: 20px; }
.project-desc {
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

/* ════ BUTTONS ════ */
.project-btn {
  display: inline-block;
  background: transparent;
  border: none;
  color: #38bdf8;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
}
.project-btn:hover {
  color: #7dd3fc;
  transform: translateX(4px);
}

/* ════ FEATURED ════ */
.featured-project {
  padding: 80px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.featured-image {
  width: 100%;
  height: 340px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 20px 50px rgba(0,0,0,0.35);
  transition: transform .35s ease;
}
.featured-image:hover { transform: scale(1.02); }

.featured-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #c7d2fe;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: 999px;
  padding: 6px 14px;
  display: inline-block;
}
.featured-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 14px 0;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.featured-desc {
  color: #cbd5e1;
  margin-bottom: 20px;
}
.featured-btn {
  display: inline-block;
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  padding: 10px 18px;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: all .25s ease;
}
.featured-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(56,189,248,0.35);
}
</style>