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
   STYLE UTAMA — versi sederhana & profesional
   ========================================================= */
.landing-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #0f172a;
    background-image: linear-gradient(180deg, #111c34 0%, #0f172a 380px, #0f172a 100%);
    color: #f1f5f9;
    overflow-x: hidden;
}

.page-content-wrapper {
    padding-top: 120px;
    padding-bottom: 80px;
    min-height: 80vh;
    position: relative;
    z-index: 5;
}
</style>
