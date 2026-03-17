<template>
  <section class="projects-section py-5">
    <div class="container">

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
            <div class="featured-image-wrapper">
              <img
                :src="getImageUrl(project.image)"
                class="featured-image"
              />
            </div>
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
                :src="getImageUrl(project.image)"
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

const projectStore = useProjectStore()

const featuredProjects = computed(() => {
  return projectStore.projects.slice(0, 3)
})

const gridProjects = computed(() => {
  return projectStore.projects.slice(3)
})

const getImageUrl = (path) => {
  if (!path) return ''

  return `http://localhost:8000${path}`
}

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
  border-radius: 16px;
  object-fit: contain;
  height: 100%;

  box-shadow: 0 20px 50px rgba(0,0,0,0.35);
  transition: transform .35s ease;
}

.featured-image-wrapper {
  aspect-ratio: 16 / 9;
  background: #07070f;
  border-radius: 14px;
  padding: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.featured-image-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.12);
}

.featured-image:hover {
  transform: scale(1.02);
}

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

  background: linear-gradient(
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
  display: inline-block;

  background: linear-gradient(
    135deg,
    #38bdf8,
    #6366f1
  );

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