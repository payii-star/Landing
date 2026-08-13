<template>
  <section class="projects-section py-5">
    <div class="container">

      <!-- ════ SKELETON saat loading ════ -->
      <template v-if="projectStore.loading">
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

        <div class="project-grid mt-2">
          <div v-for="n in 6" :key="'sg-' + n" class="project-card">
            <div class="skeleton skeleton-card-img"></div>
            <div class="project-content">
              <div class="skeleton skeleton-desc"></div>
              <div class="skeleton skeleton-desc mt-2" style="width:60%"></div>
            </div>
          </div>
        </div>
      </template>

      <!-- ════ KONTEN ASLI ════ -->
      <template v-else>

        <!-- ── FEATURED (is_featured asli, 2 item) ── -->
        <div
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="featured-project reveal"
        >
          <div class="row align-items-center" :class="{ 'flex-row-reverse': index % 2 !== 0 }">
            <div class="col-lg-6">
              <div class="featured-frame">
                <div class="fp-glow"></div>
                <div
                  class="featured-image featured-placeholder"
                  :style="{ background: getGradient(project.id) }"
                >
                  <span class="placeholder-initials">{{ getInitials(project.title) }}</span>
                </div>
                <span class="fp-bracket fp-tl"></span>
                <span class="fp-bracket fp-tr"></span>
                <span class="fp-bracket fp-bl"></span>
                <span class="fp-bracket fp-br"></span>
                <span class="platform-badge" :class="getPlatform(project)">
                  <i class="fa-solid" :class="getPlatform(project) === 'mobile' ? 'fa-mobile-screen-button' : 'fa-globe'"></i>
                  {{ getPlatform(project) === 'mobile' ? 'Mobile App' : 'Web App' }}
                </span>
              </div>
            </div>

            <div class="col-lg-6">
              <span class="featured-label">
                <i class="fa-solid fa-star"></i> Featured Project
              </span>
              <h2 class="featured-title">{{ project.title }}</h2>
              <p class="featured-desc">{{ project.description }}</p>
              <router-link :to="`/projects/${project.slug}`" class="featured-btn">
                Lihat Studi Kasus <i class="fa-solid fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- ── FILTER CHIPS ── -->
        <div class="filter-bar reveal">
          <button
            v-for="f in filters"
            :key="f.value"
            class="filter-chip"
            :class="{ active: activeFilter === f.value }"
            @click="activeFilter = f.value"
          >
            <i class="fa-solid" :class="f.icon"></i>
            {{ f.label }}
            <span class="chip-count">{{ f.count }}</span>
          </button>
        </div>

        <!-- ── GRID (filtered, CSS Grid murni) ── -->
        <TransitionGroup name="grid-fade" tag="div" class="project-grid" appear>
          <div
            v-for="project in filteredGrid"
            :key="project.id"
            class="project-card"
          >
            <div class="project-image-wrapper">
              <div
                class="project-image project-placeholder"
                :style="{ background: getGradient(project.id) }"
              >
                <span class="placeholder-initials">{{ getInitials(project.title) }}</span>
              </div>
              <span class="platform-badge small" :class="getPlatform(project)">
                <i class="fa-solid" :class="getPlatform(project) === 'mobile' ? 'fa-mobile-screen-button' : 'fa-globe'"></i>
                {{ getPlatform(project) === 'mobile' ? 'Mobile' : 'Web' }}
              </span>
              <div class="project-overlay">
                <h5 class="overlay-title">{{ project.title }}</h5>
              </div>
              <span class="card-bracket ct-tl"></span>
              <span class="card-bracket ct-br"></span>
            </div>
            <div class="project-content">
              <p class="project-desc">{{ project.description }}</p>
              <router-link :to="`/projects/${project.slug}`" class="project-btn">
                Lihat Detail <i class="fa-solid fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </TransitionGroup>

        <div v-if="filteredGrid.length === 0" class="text-center text-muted py-5">
          Belum ada proyek di kategori ini.
        </div>

      </template>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed, ref, nextTick } from 'vue'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

// ── Featured: murni dari is_featured backend, bukan posisi array ──
const featuredProjects = computed(() =>
  projectStore.projects.filter(p => p.is_featured)
)

// ── Kategori Web/Mobile: baca kolom `category` asli dari backend.
// Fallback ke tebakan dari title HANYA untuk data lama/mock yang belum
// punya field `category` (mis. saat API gagal dan fallback ke mockProjects). ──
function getPlatform(project) {
  if (project?.category === 'mobile' || project?.category === 'web') {
    return project.category
  }
  return project?.title?.startsWith('Mobile') ? 'mobile' : 'web'
}

// ── Grid: semua yang bukan featured ──
const gridSource = computed(() =>
  projectStore.projects.filter(p => !p.is_featured)
)

const activeFilter = ref('all')

const filters = computed(() => {
  const web = gridSource.value.filter(p => getPlatform(p) === 'web').length
  const mobile = gridSource.value.filter(p => getPlatform(p) === 'mobile').length
  return [
    { value: 'all', label: 'Semua', icon: 'fa-layer-group', count: gridSource.value.length },
    { value: 'web', label: 'Web', icon: 'fa-globe', count: web },
    { value: 'mobile', label: 'Mobile', icon: 'fa-mobile-screen-button', count: mobile },
  ]
})

const filteredGrid = computed(() => {
  if (activeFilter.value === 'all') return gridSource.value
  return gridSource.value.filter(p => getPlatform(p) === activeFilter.value)
})

// ── Placeholder visual ──
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

// ── Scroll reveal (hanya untuk Featured & filter bar, bukan grid) ──
let observer = null
function setupReveal() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
}

onMounted(async () => {
  if (projectStore.projects.length === 0) {
    await projectStore.fetchProjects()
  }
  await nextTick()
  setupReveal()
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.projects-section {
  background: transparent;
  padding-bottom: 120px;
  position: relative;
  z-index: 1;
}

/* ════ SCROLL REVEAL (Featured & filter bar saja) ════ */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ════ SKELETON ════ */
.skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
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

/* ════ GRID (CSS Grid murni, bukan Bootstrap flex) ════ */
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  position: relative;
}
@media (max-width: 992px) {
  .project-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .project-grid { grid-template-columns: 1fr; }
}

/* ════ FILTER BAR ════ */
.filter-bar {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0 48px;
}
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(99,102,241,0.2);
  background: rgba(99,102,241,0.05);
  color: #cbd5e1;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}
.filter-chip:hover {
  border-color: rgba(99,102,241,0.45);
  background: rgba(99,102,241,0.1);
  color: #e2eaff;
}
.filter-chip.active {
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  border-color: transparent;
  color: white;
  box-shadow: 0 8px 24px rgba(56,189,248,0.3);
}
.chip-count {
  font-size: 0.72rem;
  background: rgba(255,255,255,0.15);
  border-radius: 999px;
  padding: 1px 8px;
  font-weight: 700;
}

/* ════ CARDS ════ */
.project-card {
  background: #181e29;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  border: 1px solid rgba(255,255,255,0.05);
}
.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(99,102,241,0.25);
}

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

/* ════ CARD BRACKETS ════ */
.card-bracket {
  position: absolute;
  width: 18px; height: 18px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}
.project-card:hover .card-bracket { opacity: 1; }
.ct-tl { top: 10px; left: 10px; border-top: 2px solid rgba(56,189,248,0.7); border-left: 2px solid rgba(56,189,248,0.7); border-radius: 4px 0 0 0; }
.ct-br { bottom: 10px; right: 10px; border-bottom: 2px solid rgba(139,92,246,0.7); border-right: 2px solid rgba(139,92,246,0.7); border-radius: 0 0 4px 0; }

/* ════ PLATFORM BADGE ════ */
.platform-badge {
  position: absolute;
  top: 14px; left: 14px;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  backdrop-filter: blur(6px);
}
.platform-badge.web {
  background: rgba(56,189,248,0.15);
  border: 1px solid rgba(56,189,248,0.35);
  color: #7dd3fc;
}
.platform-badge.mobile {
  background: rgba(168,85,247,0.15);
  border: 1px solid rgba(168,85,247,0.35);
  color: #d8b4fe;
}
.platform-badge.small { font-size: 0.65rem; padding: 5px 10px; }

/* ════ PLACEHOLDER ════ */
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
.featured-placeholder .placeholder-initials { font-size: 4rem; }

/* ════ OVERLAY ════ */
.project-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0));
}
.overlay-title { color: white; font-weight: 600; margin: 0; }

.project-content { padding: 20px; }
.project-desc {
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

.project-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
.project-btn:hover { color: #7dd3fc; transform: translateX(4px); }

/* ════ FEATURED ════ */
.featured-project {
  padding: 80px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.featured-frame {
  position: relative;
  padding: 10px;
}
.fp-glow {
  position: absolute;
  inset: -16px;
  background: radial-gradient(ellipse at 40% 50%, rgba(59,130,246,0.15) 0%, transparent 65%);
  filter: blur(20px);
  pointer-events: none;
}
.featured-image {
  width: 100%;
  height: 340px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 20px 50px rgba(0,0,0,0.35);
  transition: transform .35s ease;
  position: relative;
}
.featured-frame:hover .featured-image { transform: scale(1.02); }

.fp-bracket {
  position: absolute;
  width: 24px; height: 24px;
  z-index: 2;
  pointer-events: none;
}
.fp-tl { top: 10px; left: 10px; border-top: 2px solid rgba(56,189,248,0.8); border-left: 2px solid rgba(56,189,248,0.8); border-radius: 6px 0 0 0; }
.fp-tr { top: 10px; right: 10px; border-top: 2px solid rgba(139,92,246,0.5); border-right: 2px solid rgba(139,92,246,0.5); border-radius: 0 6px 0 0; }
.fp-bl { bottom: 10px; left: 10px; border-bottom: 2px solid rgba(139,92,246,0.5); border-left: 2px solid rgba(139,92,246,0.5); border-radius: 0 0 0 6px; }
.fp-br { bottom: 10px; right: 10px; border-bottom: 2px solid rgba(56,189,248,0.8); border-right: 2px solid rgba(56,189,248,0.8); border-radius: 0 0 6px 0; }

.featured-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #c7d2fe;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: 999px;
  padding: 6px 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.featured-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 14px 0;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.featured-desc { color: #cbd5e1; margin-bottom: 20px; }
.featured-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  padding: 10px 18px;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: all .25s ease;
}
.featured-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(56,189,248,0.35); }

/* ════ TRANSISI FILTER (CSS Grid, posisi kartu tetap stabil) ════ */
.grid-fade-move,
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.grid-fade-enter-from,
.grid-fade-leave-to {
  opacity: 0;
  transform: scale(0.94) translateY(10px);
}
.grid-fade-leave-active {
  position: absolute;
  width: calc((100% - 3rem) / 3);
}
@media (max-width: 992px) {
  .grid-fade-leave-active { width: calc((100% - 1.5rem) / 2); }
}
@media (max-width: 640px) {
  .grid-fade-leave-active { width: 100%; }
}
</style>
