<template>
  <section class="projects-section py-5">
    <div class="container">

      <!-- Section Header -->
      <div v-if="showHeader" class="text-center mb-5">
        <span class="section-label">PORTFOLIO</span>
        <h2 class="section-title mt-2">Our Recent Projects</h2>
        <p class="section-subtitle">
          We build digital experiences that deliver real impact.
        </p>
      </div>

      <div
        v-for="(project, index) in featuredProjects"
        :key="project.id"
        class="featured-project"
      >

        <div
          class="row align-items-center"
          :class="{ 'flex-row-reverse': index % 2 !== 0 }"
        >

          <!-- IMAGE -->
          <div class="col-lg-6">
            <img
              :src="project.image"
              class="featured-image"
            />
          </div>

          <!-- TEXT -->
          <div class="col-lg-6">

            <span class="featured-label">
              Featured Project
            </span>

            <h2 class="featured-title">
              {{ project.title }}
            </h2>

            <p class="featured-desc">
              {{ project.description }}
            </p>

            <router-link
              :to="`/projects/${project.slug}`"
              class="featured-btn"
            >
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
                alt="project image"
              />

              <div class="project-overlay">
                <h5 class="overlay-title">
                  {{ project.title }}
                </h5>
              </div>

            </div>

            <div class="project-content">

              <p class="project-desc">
                {{ project.description }}
              </p>

              <router-link
                :to="`/projects/${project.slug}`"
                class="project-card"
              >
                View Project        →
              </router-link>

            </div>

          </div>
        </div>

        <div
          v-if="projectStore.projects.length === 0"
          class="text-center text-muted py-4"
        >
          No projects available yet.
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useProjectStore } from '@/stores/project'

defineProps({
  showHeader: {
    type: Boolean,
    default: true
  }
})

const projectStore = useProjectStore()

const featuredProjects = computed(() => {
  return projectStore.projects.slice(0, 3)
})

const gridProjects = computed(() => {
  return projectStore.projects.slice(3)
})

onMounted(() => {
  if (projectStore.projects.length === 0) {
    projectStore.fetchProjects()
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

/* header */

.section-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #94a3b8;
}

.section-title {
  font-weight: 700;
  font-size: 2rem;
  color: #ffffff;
}

.section-subtitle {
  color: #94a3b8;
  max-width: 500px;
  margin: 0 auto;
}

/* card */

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

/* image */

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

/* overlay */

.project-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;

  background: linear-gradient(
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

/* content */

.project-content {
  padding: 20px;
}

.project-desc {
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

/* button */

.project-btn {
  background: transparent;
  border: none;
  color: #38bdf8;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0;
  cursor: pointer;
  transition: all 0.25s ease;
}

.project-btn:hover {
  color: #7dd3fc;
  transform: translateX(4px);
}

.featured-project {
  padding: 80px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.featured-image {
  width: 100%;
  border-radius: 14px;
  object-fit: cover;
}

.featured-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #94a3b8;
}

.featured-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 10px 0;
}

.featured-desc {
  color: #cbd5e1;
  margin-bottom: 20px;
}

.featured-btn {
  background: #38bdf8;
  padding: 10px 18px;
  border-radius: 8px;
  color: #0f172a;
  font-weight: 600;
  text-decoration: none;
}
</style>