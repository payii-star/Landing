<template>
  <section class="projects-section py-5">
    <div class="container">

      <!-- Section Header -->
      <div class="text-center mb-5">
        <span class="section-label">PORTFOLIO</span>
        <h2 class="section-title mt-2">Our Recent Projects</h2>
        <p class="section-subtitle">
          We build digital experiences that deliver real impact.
        </p>
      </div>

      <div class="row g-4">

        <div
          v-for="project in projectStore.projects"
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

              <button class="project-btn">
                View Project →
              </button>

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
import { onMounted } from 'vue'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

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
</style>