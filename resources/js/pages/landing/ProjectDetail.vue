<template>
  <div class="landing-wrapper">
    <ParticleBackground />

    <div class="g-orb g-orb-1"></div>
    <div class="g-orb g-orb-2"></div>
    <div class="g-orb g-orb-3"></div>

    <LandingNavbar />

    <main class="detail-wrap container-xxl">
      <section v-if="loading" class="detail-card text-center">
        <h2 class="detail-title">Memuat project...</h2>
      </section>

      <section v-else-if="notFound" class="detail-card text-center">
        <h2 class="detail-title">Project tidak ditemukan</h2>
        <p class="detail-desc">Slug project tidak valid atau data sudah dihapus.</p>
        <router-link to="/projects" class="detail-btn">Kembali ke Projects</router-link>
      </section>

      <section v-else-if="errorMessage" class="detail-card text-center">
        <h2 class="detail-title">Terjadi kesalahan</h2>
        <p class="detail-desc">{{ errorMessage }}</p>
        <button type="button" class="detail-btn" @click="fetchProject">Coba Lagi</button>
      </section>

      <section v-else-if="project" class="detail-card">
        <div class="detail-media">
          <img
            :src="project.image ? `/storage/${project.image}` : fallbackImage"
            :alt="project.title"
            class="detail-image"
            @error="onImageError"
          />
        </div>

        <div class="detail-body">
          <p class="detail-tag">Project Detail</p>
          <h1 class="detail-title">{{ project.title }}</h1>
          <p class="detail-desc">{{ project.description || "Belum ada deskripsi project." }}</p>

          <div class="d-flex flex-wrap gap-3 align-items-center mt-4">
            <span class="badge" :class="project.is_featured ? 'badge-light-success' : 'badge-light-secondary'">
              {{ project.is_featured ? "Featured" : "Regular" }}
            </span>
            <span class="text-muted">Urutan: {{ project.urutan }}</span>
          </div>

          <a
            v-if="project.link_project"
            :href="project.link_project"
            target="_blank"
            rel="noopener noreferrer"
            class="detail-btn mt-4"
          >
            Kunjungi Website
          </a>
        </div>
      </section>
    </main>

    <LandingFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import LandingNavbar from "@/components/LandingNavbar.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import ParticleBackground from "@/components/ParticleBackground.vue";

const route = useRoute();

const loading = ref(true);
const notFound = ref(false);
const errorMessage = ref("");
const project = ref(null);
const fallbackImage = "https://placehold.co/1000x560?text=No+Image";

function onImageError(event) {
  event.target.src = fallbackImage;
}

async function fetchProject() {
  loading.value = true;
  notFound.value = false;
  errorMessage.value = "";

  try {
    const response = await axios.get(`/api/front/projects/${route.params.slug}`);
    project.value = response.data?.data ?? null;
  } catch (error) {
    if (error?.response?.status === 404) {
      notFound.value = true;
    } else {
      errorMessage.value = error?.response?.data?.message ?? "Gagal memuat detail project";
    }
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProject);

watch(
  () => route.params.slug,
  () => {
    fetchProject();
  }
);
</script>

<style scoped>
.landing-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: transparent;
  overflow-x: hidden;
  color: #f8fafc;
}

.landing-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#ffffff 1.5px, transparent 1.5px);
  background-size: 40px 40px;
  opacity: 0.06;
  pointer-events: none;
  z-index: 1;
}

.g-orb {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.g-orb-1 {
  width: 680px;
  height: 680px;
  top: -180px;
  left: -170px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.14) 0%, transparent 70%);
  filter: blur(80px);
}

.g-orb-2 {
  width: 560px;
  height: 560px;
  top: 320px;
  right: -130px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 68%);
  filter: blur(90px);
}

.g-orb-3 {
  width: 680px;
  height: 680px;
  bottom: -250px;
  left: 20%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
  filter: blur(100px);
}

.detail-wrap {
  position: relative;
  z-index: 2;
  padding-top: 120px;
  padding-bottom: 90px;
}

.detail-card {
  background: rgba(12, 18, 36, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.detail-media {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-image {
  width: 100%;
  max-height: 560px;
  object-fit: cover;
  display: block;
}

.detail-body {
  padding: 34px;
}

.detail-tag {
  color: #60a5fa;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.detail-title {
  font-size: clamp(1.6rem, 3.8vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 14px;
  color: #e8eeff;
}

.detail-desc {
  color: #9fb0d0;
  line-height: 1.7;
  margin-bottom: 0;
}

.detail-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.15rem;
}

@media (max-width: 768px) {
  .detail-wrap {
    padding-top: 100px;
    padding-bottom: 70px;
  }

  .detail-body {
    padding: 22px;
  }
}
</style>
