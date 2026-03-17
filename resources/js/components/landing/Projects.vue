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

            <!-- IMAGE -->
            <div class="col-lg-6">
              <img
                :src="project.image"
                class="featured-image"
                :alt="project.title"
                loading="lazy"
              />
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
                <img
                  v-if="project.image"
                  :src="project.image"
                  class="project-image"
                  :alt="project.title"
                  loading="lazy"
                />
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

onMounted(async () => {
  // Hanya fetch jika belum ada data (cache Pinia)
  if (projectStore.projects.length === 0) {
    await projectStore.fetchProjects()
  }
})
</script>

<style scoped>
.projects-section {
  background: linear-gradient(
    180deg,
    var(--navy-darkest) 0%,
    var(--navy-dark) 50%,
    var(--navy-medium) 100%
  );
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