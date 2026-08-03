<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { mockServices } from '@/mocks/landingMock';

import LandingNavbar from "@/components/LandingNavbar.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import LandingServicesHero from "@/components/LandingServicesHero.vue";
import LandingTestimonialsCust from '@/components/LandingTestimonialsCust.vue';
import LandingCta from '@/components/LandingCta.vue';
import LandingServices from '@/components/LandingServices.vue';
import ParticleBackground from '@/components/ParticleBackground.vue';


const heroData = ref<any>(null);
const servicesData = ref<any[]>([]);

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
// Sama seperti pola di stores/landing.ts — bisa dimatikan lewat .env kalau perlu
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK !== "false";

const fetchPublicData = async () => {
  try {
    const response = await axios.get(`${API_URL}/landing/service-public`);

    // 2. PERBAIKAN: Tangkap KEDUA datanya dari API Laravel
    if (response.data) {
        heroData.value = response.data.hero || {
            title: "Layanan Unggulan Untuk Bisnis Anda",
            subtitle: "Kami menyediakan berbagai layanan profesional untuk membantu bisnis Anda tumbuh dan berkembang di era digital.",
            image: null
        };
        // Menangkap data kotak-kotak layanan
        servicesData.value = response.data.services || [];
    }
  } catch (error) {
    console.error("❌ Gagal mengambil data layanan publik:", error);
    heroData.value = {
        title: "Layanan Unggulan Untuk Bisnis Anda",
        subtitle: "Layanan kami sedang dalam perbaikan sementara. Silakan kembali lagi nanti.",
        image: null
    };

    if (USE_MOCK_FALLBACK) {
      console.warn('⚠️ Pakai mockServices — backend belum tersedia. JANGAN lupa dicabut sebelum production.');
      servicesData.value = [...mockServices];
    } else {
      servicesData.value = [];
    }
  }
};

onMounted(() => {
  fetchPublicData();
});
</script>

<template>
  <div class="landing-wrapper">

      <ParticleBackground />

      <div class="g-orb g-orb-1"></div>
      <div class="g-orb g-orb-2"></div>
      <div class="g-orb g-orb-3"></div>
      <div class="g-orb g-orb-4"></div>

      <LandingNavbar />

      <div class="page-content-wrapper container-xxl">

          <LandingServicesHero
            v-if="heroData"
            :hero="heroData"
            :services="servicesData"
          />

          <div v-else class="text-center py-5 text-white">
            Memuat data...
          </div>
      </div>
      <LandingServices/>
      <LandingTestimonialsCust/>
      <LandingCta />
      <LandingFooter/>

  </div>
</template>

<style scoped>
/* =========================================================
   STYLE UTAMA — disamakan dengan pola landing-wrapper
   di ProjectsPage.vue / Index.vue
   ========================================================= */
.landing-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: transparent;
    overflow-x: hidden;
    color: #f8fafc;
}

.landing-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#ffffff 1.5px, transparent 1.5px);
    background-size: 40px 40px;
    opacity: .06;
    pointer-events: none;
    z-index: 1;
}

.g-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
}

.g-orb-1 { width: 800px; height: 800px; top: -200px; left: -200px; background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%); filter: blur(80px); animation: gOrbFloat 20s ease-in-out infinite; }
.g-orb-2 { width: 600px; height: 600px; top: 300px; right: -150px; background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 65%); filter: blur(90px); animation: gOrbFloat 25s ease-in-out infinite reverse; }
.g-orb-3 { width: 700px; height: 700px; bottom: -100px; left: -100px; background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%); filter: blur(100px); animation: gOrbFloat 22s ease-in-out infinite 2s; }
.g-orb-4 { width: 500px; height: 500px; bottom: -80px; right: 5%; background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 60%); filter: blur(75px); animation: gOrbFloat 18s ease-in-out infinite 1s; }

@keyframes gOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(40px, -50px) scale(1.06); }
    66%       { transform: translate(-25px, 30px) scale(0.96); }
}

@media (max-width: 768px) {
    .g-orb-1 { width: 500px; height: 500px; }
    .g-orb-2 { width: 380px; height: 380px; }
    .g-orb-3 { width: 450px; height: 450px; }
    .g-orb-4 { width: 350px; height: 350px; }
}

.page-content-wrapper {
    padding-top: 120px;
    padding-bottom: 80px;
    min-height: 80vh;
    position: relative;
    z-index: 5;
}
</style>