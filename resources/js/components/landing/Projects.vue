<template>
  <section class="projects-section py-5">
    <div class="container">

      <!-- ═══════════════════════════════════════════════════════════
           SKELETON LOADING
      ═══════════════════════════════════════════════════════════ -->
      <template v-if="landingStore.projectsLoading">
        <div
          v-for="n in 2"
          :key="'sf-' + n"
          class="featured-project"
        >
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="skeleton skeleton-featured-img"></div>
            </div>

            <div class="col-lg-6">
              <div class="skeleton skeleton-label"></div>
              <div class="skeleton skeleton-title mt-3"></div>
              <div class="skeleton skeleton-desc mt-3"></div>
              <div
                class="skeleton skeleton-desc mt-2"
                style="width:75%"
              ></div>
              <div class="skeleton skeleton-btn mt-4"></div>
            </div>
          </div>
        </div>

        <div class="project-grid mt-2">
          <div
            v-for="n in 6"
            :key="'sg-' + n"
            class="project-card"
          >
            <div class="skeleton skeleton-card-img"></div>

            <div class="project-content">
              <div class="skeleton skeleton-desc"></div>
              <div
                class="skeleton skeleton-desc mt-2"
                style="width:60%"
              ></div>
            </div>
          </div>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════════════
           KONTEN
      ═══════════════════════════════════════════════════════════ -->
      <template v-else>

        <!-- ═════════════════════════════════════════════════════════
             FEATURED PROJECT
        ═════════════════════════════════════════════════════════ -->
        <div
          v-for="(project, index) in featuredProjects"
          :key="'featured-' + project.id"
          class="featured-project reveal"
        >
          <div
            class="row align-items-center"
            :class="{ 'flex-row-reverse': index % 2 !== 0 }"
          >

            <!-- IMAGE -->
            <div class="col-lg-6">
              <div class="featured-frame">
                <div class="fp-glow"></div>

                <!-- IMAGE DARI API -->
                <img
                  v-if="getImageUrl(project)"
                  :src="getImageUrl(project)"
                  :alt="project.title"
                  class="featured-image"
                  @error="handleImageError"
                />

                <!-- PLACEHOLDER -->
                <div
                  v-else
                  class="featured-image featured-placeholder"
                  :style="{ background: getGradient(project.id) }"
                >
                  <span class="placeholder-initials">
                    {{ getInitials(project.title) }}
                  </span>
                </div>

                <span class="fp-bracket fp-tl"></span>
                <span class="fp-bracket fp-tr"></span>
                <span class="fp-bracket fp-bl"></span>
                <span class="fp-br"></span>

                <span
                  class="platform-badge"
                  :class="getPlatform(project)"
                >
                  <i
                    class="fa-solid"
                    :class="
                      getPlatform(project) === 'mobile'
                        ? 'fa-mobile-screen-button'
                        : 'fa-globe'
                    "
                  ></i>

                  {{
                    getPlatform(project) === 'mobile'
                      ? 'Mobile App'
                      : 'Web App'
                  }}
                </span>
              </div>
            </div>

            <!-- CONTENT -->
            <div class="col-lg-6">
              <span class="featured-label">
                <i class="fa-solid fa-star"></i>
                Featured Project
              </span>

              <h2 class="featured-title">
                {{ project.title }}
              </h2>

              <p
                v-if="project.description"
                class="featured-desc"
              >
                {{ project.description }}
              </p>

              <p
                v-else
                class="featured-desc text-muted"
              >
                Belum ada deskripsi project.
              </p>

              <!-- LINK EXTERNAL -->
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="featured-btn"
              >
                Lihat Project
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>

              <!-- DETAIL INTERNAL -->
              <router-link
                v-else-if="project.slug"
                :to="`/projects/${project.slug}`"
                class="featured-btn"
              >
                Lihat Detail
                <i class="fa-solid fa-arrow-right"></i>
              </router-link>
            </div>

          </div>
        </div>

        <!-- ═════════════════════════════════════════════════════════
             FILTER
        ═════════════════════════════════════════════════════════ -->
        <div
          v-if="landingStore.projects.length"
          class="filter-bar reveal"
        >
          <button
            v-for="f in filters"
            :key="f.value"
            class="filter-chip"
            :class="{ active: activeFilter === f.value }"
            @click="activeFilter = f.value"
          >
            <i
              class="fa-solid"
              :class="f.icon"
            ></i>

            {{ f.label }}

            <span class="chip-count">
              {{ f.count }}
            </span>
          </button>
        </div>

        <!-- ═════════════════════════════════════════════════════════
             SEMUA PROJECT

             Featured TIDAK dibuang.
             Semua project dari API ditampilkan.
        ═════════════════════════════════════════════════════════ -->
        <TransitionGroup
          name="grid-fade"
          tag="div"
          class="project-grid"
          appear
        >
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card"
          >
            <div class="project-image-wrapper">

              <!-- IMAGE DARI API -->
              <img
                v-if="getImageUrl(project)"
                :src="getImageUrl(project)"
                :alt="project.title"
                class="project-image"
                @error="handleImageError"
              />

              <!-- PLACEHOLDER -->
              <div
                v-else
                class="project-image project-placeholder"
                :style="{ background: getGradient(project.id) }"
              >
                <span class="placeholder-initials">
                  {{ getInitials(project.title) }}
                </span>
              </div>

              <!-- PLATFORM -->
              <span
                class="platform-badge small"
                :class="getPlatform(project)"
              >
                <i
                  class="fa-solid"
                  :class="
                    getPlatform(project) === 'mobile'
                      ? 'fa-mobile-screen-button'
                      : 'fa-globe'
                  "
                ></i>

                {{
                  getPlatform(project) === 'mobile'
                    ? 'Mobile'
                    : 'Web'
                }}
              </span>

              <!-- FEATURED BADGE -->
              <span
                v-if="project.is_featured"
                class="featured-card-badge"
              >
                <i class="fa-solid fa-star"></i>
                Featured
              </span>

              <div class="project-overlay">
                <h5 class="overlay-title">
                  {{ project.title }}
                </h5>
              </div>

              <span class="card-bracket ct-tl"></span>
              <span class="card-bracket ct-br"></span>
            </div>

            <div class="project-content">

              <p
                v-if="project.description"
                class="project-desc"
              >
                {{ project.description }}
              </p>

              <p
                v-else
                class="project-desc text-muted"
              >
                Belum ada deskripsi project.
              </p>

              <!-- LINK EXTERNAL -->
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="project-btn"
              >
                Lihat Project
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>

              <!-- DETAIL INTERNAL -->
              <router-link
                v-else-if="project.slug"
                :to="`/projects/${project.slug}`"
                class="project-btn"
              >
                Lihat Detail
                <i class="fa-solid fa-arrow-right"></i>
              </router-link>

              <!-- TIDAK PUNYA LINK -->
              <span
                v-else
                class="project-btn disabled"
              >
                Detail belum tersedia
              </span>

            </div>
          </div>
        </TransitionGroup>

        <!-- EMPTY -->
        <div
          v-if="filteredProjects.length === 0 && !landingStore.projectsLoading"
          class="text-center text-muted py-5"
        >
          Belum ada proyek di kategori ini.
        </div>

      </template>
    </div>
  </section>
</template>

<script setup>
import {
  onMounted,
  onBeforeUnmount,
  computed,
  ref,
  nextTick
} from 'vue'

import { useLandingStore } from '@/stores/landing'

const landingStore = useLandingStore()

/*
|--------------------------------------------------------------------------
| FEATURED PROJECT
|--------------------------------------------------------------------------
| Mengambil project yang is_featured = true.
*/
const featuredProjects = computed(() =>
  landingStore.projects
    .filter(project => project.is_featured)
    .sort((a, b) => {
      return Number(a.urutan ?? 0) - Number(b.urutan ?? 0)
    })
)

/*
|--------------------------------------------------------------------------
| PLATFORM
|--------------------------------------------------------------------------
*/
function getPlatform(project) {
  if (
    project?.category === 'mobile' ||
    project?.category === 'web'
  ) {
    return project.category
  }

  return 'web'
}

/*
|--------------------------------------------------------------------------
| SEMUA PROJECT
|--------------------------------------------------------------------------
*/
const allProjects = computed(() =>
  [...landingStore.projects].sort((a, b) => {
    return Number(a.urutan ?? 0) - Number(b.urutan ?? 0)
  })
)

/*
|--------------------------------------------------------------------------
| FILTER
|--------------------------------------------------------------------------
*/
const activeFilter = ref('all')

const filters = computed(() => {
  const web = allProjects.value.filter(
    project => getPlatform(project) === 'web'
  ).length

  const mobile = allProjects.value.filter(
    project => getPlatform(project) === 'mobile'
  ).length

  return [
    {
      value: 'all',
      label: 'Semua',
      icon: 'fa-layer-group',
      count: allProjects.value.length
    },
    {
      value: 'web',
      label: 'Web',
      icon: 'fa-globe',
      count: web
    },
    {
      value: 'mobile',
      label: 'Mobile',
      icon: 'fa-mobile-screen-button',
      count: mobile
    }
  ]
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return allProjects.value
  }

  return allProjects.value.filter(
    project =>
      getPlatform(project) === activeFilter.value
  )
})

/*
|--------------------------------------------------------------------------
| IMAGE
|--------------------------------------------------------------------------
| Backend mengirim:
|
| image: "projects/xxxxx.png"
|
| atau:
|
| image: "/media/projects/xxxxx.png"
|
| Kita bentuk URL berdasarkan host aplikasi yang sedang dibuka.
|--------------------------------------------------------------------------
*/
const BACKEND_ORIGIN = 'http://192.168.112.210:8000'

function getImageUrl(project) {
  if (!project?.thumbnail) {
    return ''
  }

  const thumbnail = Array.isArray(project.thumbnail)
    ? project.thumbnail[0]
    : project.thumbnail

  if (!thumbnail) {
    return ''
  }

  const image = String(thumbnail).trim()

  if (!image) {
    return ''
  }

  // Jika API sudah mengirim URL lengkap, gunakan URL tersebut.
  if (
    image.startsWith('http://') ||
    image.startsWith('https://') ||
    image.startsWith('//')
  ) {
    return image
  }

  // Backend Laravel project menggunakan disk "public".
  // Contoh response API:
  // landing/projects/8EykNebpkOGSRtRPzCyzBnN3B4YNWpoirUyywgCR.jpg
  //
  // URL publiknya:
  // http://192.168.112.210:8000/storage/landing/projects/....
  let path = image.replace(/^\/+/, '')

  // Jangan sampai /storage/storage/... jika backend mengirim path
  // yang sudah mengandung "storage/".
  path = path.replace(/^storage\//, '')

  return `${BACKEND_ORIGIN}/storage/${path}`
}

/*
|--------------------------------------------------------------------------
| IMAGE ERROR
|--------------------------------------------------------------------------
| Kalau URL gambar mati, jangan biarkan broken image.
|--------------------------------------------------------------------------
*/
function handleImageError(event) {
  const img = event?.target

  if (!img) {
    return
  }

  console.error('Gagal memuat gambar project:', img.src)

  img.style.display = 'none'

  const parent = img.parentElement

  if (!parent) {
    return
  }

  const project = landingStore.projects.find(
    item => {
      const imageUrl = getImageUrl(item)

      return imageUrl === img.src
    }
  )

  if (!project) {
    return
  }

  const placeholder = document.createElement('div')

  placeholder.className =
    img.classList.contains('featured-image')
      ? 'featured-image featured-placeholder'
      : 'project-image project-placeholder'

  placeholder.style.background =
    getGradient(project.id)

  const initials = document.createElement('span')

  initials.className = 'placeholder-initials'

  initials.textContent =
    getInitials(project.title)

  placeholder.appendChild(initials)

  parent.insertBefore(
    placeholder,
    parent.firstChild
  )
}

/*
|--------------------------------------------------------------------------
| PLACEHOLDER VISUAL
|--------------------------------------------------------------------------
*/
const GRADIENTS = [
  'linear-gradient(135deg, #1d4ed8, #0f172a)',
  'linear-gradient(135deg, #7c3aed, #1e1b4b)',
  'linear-gradient(135deg, #0891b2, #0c2f3d)',
  'linear-gradient(135deg, #059669, #052e22)',
  'linear-gradient(135deg, #dc2626, #2b0a0a)',
  'linear-gradient(135deg, #d97706, #2b1a05)'
]

function getGradient(id) {
  const numericId = Number(id) || 0

  return GRADIENTS[
    Math.abs(numericId) % GRADIENTS.length
  ]
}

function getInitials(title) {
  if (!title) {
    return '?'
  }

  const clean = String(title)
    .replace(/[^A-Za-z0-9\s]/g, ' ')
    .trim()

  const parts = clean
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) {
    return '?'
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    parts[0][0] +
    parts[1][0]
  ).toUpperCase()
}

/*
|--------------------------------------------------------------------------
| SCROLL REVEAL
|--------------------------------------------------------------------------
*/
let observer = null

function setupReveal() {
  if (typeof IntersectionObserver === 'undefined') {
    document
      .querySelectorAll('.reveal')
      .forEach(el => {
        el.classList.add('is-visible')
      })

    return
  }

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            'is-visible'
          )

          observer?.unobserve(
            entry.target
          )
        }
      })
    },
    {
      threshold: 0.15
    }
  )

  document
    .querySelectorAll('.reveal')
    .forEach(el => {
      observer?.observe(el)
    })
}

/*
|--------------------------------------------------------------------------
| LOAD PROJECTS
|--------------------------------------------------------------------------
*/
onMounted(async () => {
  // Selalu ambil data terbaru dari backend.
  // Jangan menggunakan data lama yang masih tersimpan di store.
  await landingStore.fetchProjects()

  await nextTick()

  setupReveal()
})

/*
|--------------------------------------------------------------------------
| CLEANUP
|--------------------------------------------------------------------------
*/
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
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

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════════════ */

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════════════════════════════
   SKELETON
══════════════════════════════════════════════════════════════ */

.skeleton {
  background:
    linear-gradient(
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
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.skeleton-featured-img {
  width: 100%;
  height: 380px;
  border-radius: 16px;
}

.skeleton-card-img {
  width: 100%;
  height: 230px;
  border-radius: 0;
}

.skeleton-label {
  width: 130px;
  height: 26px;
  border-radius: 999px;
}

.skeleton-title {
  width: 80%;
  height: 48px;
}

.skeleton-desc {
  width: 100%;
  height: 18px;
}

.skeleton-btn {
  width: 160px;
  height: 42px;
  border-radius: 10px;
}

/* ═══════════════════════════════════════════════════════════════
   GRID
══════════════════════════════════════════════════════════════ */

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  position: relative;
}

@media (max-width: 992px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}

/* ═══════════════════════════════════════════════════════════════
   FILTER BAR
══════════════════════════════════════════════════════════════ */

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
  background:
    linear-gradient(
      135deg,
      #38bdf8,
      #6366f1
    );

  border-color: transparent;
  color: white;

  box-shadow:
    0 8px 24px
    rgba(56,189,248,0.3);
}

.chip-count {
  font-size: 0.72rem;
  background: rgba(255,255,255,0.15);
  border-radius: 999px;
  padding: 1px 8px;
  font-weight: 700;
}

/* ═══════════════════════════════════════════════════════════════
   CARDS
══════════════════════════════════════════════════════════════ */

.project-card {
  background: #181e29;
  border-radius: 16px;
  overflow: hidden;

  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;

  border:
    1px solid
    rgba(255,255,255,0.05);
}

.project-card:hover {
  transform: translateY(-8px);

  box-shadow:
    0 25px 50px rgba(0,0,0,0.35),
    0 0 0 1px
    rgba(99,102,241,0.25);
}

.project-image-wrapper {
  position: relative;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 230px;
  object-fit: cover;

  display: block;

  transition:
    transform 0.6s ease;
}

.project-card:hover
.project-image {
  transform: scale(1.08);
}

/* ═══════════════════════════════════════════════════════════════
   CARD BRACKETS
══════════════════════════════════════════════════════════════ */

.card-bracket {
  position: absolute;
  width: 18px;
  height: 18px;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 0.3s ease;
  z-index: 2;
}

.project-card:hover
.card-bracket {
  opacity: 1;
}

.ct-tl {
  top: 10px;
  left: 10px;

  border-top:
    2px solid
    rgba(56,189,248,0.7);

  border-left:
    2px solid
    rgba(56,189,248,0.7);

  border-radius:
    4px 0 0 0;
}

.ct-br {
  bottom: 10px;
  right: 10px;

  border-bottom:
    2px solid
    rgba(139,92,246,0.7);

  border-right:
    2px solid
    rgba(139,92,246,0.7);

  border-radius:
    0 0 4px 0;
}

/* ═══════════════════════════════════════════════════════════════
   PLATFORM BADGE
══════════════════════════════════════════════════════════════ */

.platform-badge {
  position: absolute;
  top: 14px;
  left: 14px;
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
  background:
    rgba(56,189,248,0.15);

  border:
    1px solid
    rgba(56,189,248,0.35);

  color: #7dd3fc;
}

.platform-badge.mobile {
  background:
    rgba(168,85,247,0.15);

  border:
    1px solid
    rgba(168,85,247,0.35);

  color: #d8b4fe;
}

.platform-badge.small {
  font-size: 0.65rem;
  padding: 5px 10px;
}

/* ═══════════════════════════════════════════════════════════════
   FEATURED CARD BADGE
══════════════════════════════════════════════════════════════ */

.featured-card-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;

  display: inline-flex;
  align-items: center;
  gap: 5px;

  padding: 5px 10px;
  border-radius: 999px;

  font-size: 0.65rem;
  font-weight: 700;

  color: #fde68a;

  background:
    rgba(245,158,11,0.15);

  border:
    1px solid
    rgba(245,158,11,0.35);

  backdrop-filter: blur(6px);
}

/* ═══════════════════════════════════════════════════════════════
   PLACEHOLDER
══════════════════════════════════════════════════════════════ */

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

.featured-placeholder
.placeholder-initials {
  font-size: 4rem;
}

/* ═══════════════════════════════════════════════════════════════
   OVERLAY
══════════════════════════════════════════════════════════════ */

.project-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;

  background:
    linear-gradient(
      to top,
      rgba(0,0,0,0.75),
      rgba(0,0,0,0)
    );
}

.overlay-title {
  color: white;
  font-weight: 600;
  margin: 0;
}

.project-content {
  padding: 20px;
}

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

  transition:
    all 0.25s ease;
}

.project-btn:hover {
  color: #7dd3fc;
  transform: translateX(4px);
}

.project-btn.disabled {
  color: #64748b;
  cursor: default;
}

.project-btn.disabled:hover {
  transform: none;
}

/* ═══════════════════════════════════════════════════════════════
   FEATURED
══════════════════════════════════════════════════════════════ */

.featured-project {
  padding: 80px 0;

  border-bottom:
    1px solid
    rgba(255,255,255,0.05);
}

.featured-frame {
  position: relative;
  padding: 10px;
}

.fp-glow {
  position: absolute;
  inset: -16px;

  background:
    radial-gradient(
      ellipse at 40% 50%,
      rgba(59,130,246,0.15) 0%,
      transparent 65%
    );

  filter: blur(20px);
  pointer-events: none;
}

.featured-image {
  width: 100%;
  height: 340px;

  border-radius: 16px;
  object-fit: cover;

  box-shadow:
    0 20px 50px
    rgba(0,0,0,0.35);

  transition:
    transform 0.35s ease;

  position: relative;
  display: block;
}

.featured-frame:hover
.featured-image {
  transform: scale(1.02);
}

.fp-bracket {
  position: absolute;
  width: 24px;
  height: 24px;

  z-index: 2;
  pointer-events: none;
}

.fp-tl {
  top: 10px;
  left: 10px;

  border-top:
    2px solid
    rgba(56,189,248,0.8);

  border-left:
    2px solid
    rgba(56,189,248,0.8);

  border-radius:
    6px 0 0 0;
}

.fp-tr {
  top: 10px;
  right: 10px;

  border-top:
    2px solid
    rgba(139,92,246,0.5);

  border-right:
    2px solid
    rgba(139,92,246,0.5);

  border-radius:
    0 6px 0 0;
}

.fp-bl {
  bottom: 10px;
  left: 10px;

  border-bottom:
    2px solid
    rgba(139,92,246,0.5);

  border-left:
    2px solid
    rgba(139,92,246,0.5);

  border-radius:
    0 0 0 6px;
}

.fp-br {
  bottom: 10px;
  right: 10px;

  border-bottom:
    2px solid
    rgba(56,189,248,0.8);

  border-right:
    2px solid
    rgba(56,189,248,0.8);

  border-radius:
    0 0 6px 0;
}

.featured-label {
  font-size: 0.75rem;
  letter-spacing: 2px;

  color: #c7d2fe;

  background:
    rgba(99,102,241,0.15);

  border:
    1px solid
    rgba(99,102,241,0.25);

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

  background:
    linear-gradient(
      135deg,
      #ffffff 0%,
      #e0e7ff 50%,
      #c7d2fe 100%
    );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.featured-desc {
  color: #cbd5e1;
  margin-bottom: 20px;
}

.featured-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  background:
    linear-gradient(
      135deg,
      #38bdf8,
      #6366f1
    );

  padding: 10px 18px;

  border-radius: 10px;

  color: white;
  font-weight: 600;
  text-decoration: none;

  transition:
    all 0.25s ease;
}

.featured-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 10px 25px
    rgba(56,189,248,0.35);
}

/* ═══════════════════════════════════════════════════════════════
   TRANSITION FILTER
══════════════════════════════════════════════════════════════ */

.grid-fade-move,
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.grid-fade-enter-from,
.grid-fade-leave-to {
  opacity: 0;
  transform:
    scale(0.94)
    translateY(10px);
}

.grid-fade-leave-active {
  position: absolute;
  width: calc(
    (100% - 3rem) / 3
  );
}

@media (max-width: 992px) {
  .grid-fade-leave-active {
    width: calc(
      (100% - 1.5rem) / 2
    );
  }
}

@media (max-width: 640px) {
  .grid-fade-leave-active {
    width: 100%;
  }
}
</style>