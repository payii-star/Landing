<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

import LandingNavbar from "@/components/LandingNavbar.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import ParticleBackground from "@/components/ParticleBackground.vue";
import LandingServicesHero from "@/components/LandingServicesHero.vue"; 
import LandingTestimonialsCust from '@/components/LandingTestimonialsCust.vue';
import LandingCta from '@/components/LandingCta.vue';
import LandingServices from '@/components/LandingServices.vue';


const heroData = ref<any>(null);
const servicesData = ref<any[]>([]); 

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

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
    console.error("Gagal mengambil data layanan publik:", error);
    heroData.value = {
        title: "Layanan Unggulan Untuk Bisnis Anda",
        subtitle: "Layanan kami sedang dalam perbaikan sementara. Silakan kembali lagi nanti.",
        image: null
    };
    servicesData.value = [];
  }
};

onMounted(() => {
  fetchPublicData();
});
</script>

<template>
  <div class="landing-wrapper">
      
      <ParticleBackground class="particles-bg" />
      
      <div class="g-orb g-orb-1"></div>
      <div class="g-orb g-orb-2"></div>
      <div class="g-orb g-orb-3"></div>
      
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
   STYLE UTAMA & RASI BINTANG
   ========================================================= */
.landing-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #0f172a; 
    color: #f1f5f9;
    overflow-x: hidden;
}

/* PERBAIKAN: fixed dan 100vw/100vh agar rasi bintang tidak terpotong saat scroll */
.particles-bg {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1; 
    pointer-events: none; /* Mencegah kanvas memblokir klik tombol */
}

.page-content-wrapper {
    padding-top: 120px; 
    padding-bottom: 80px;
    min-height: 80vh; 
    position: relative;
    z-index: 5; /* Pastikan konten berada di atas rasi bintang */
}

/* =========================================================
   STYLE ORBS (Cahaya Latar Sederhana)
   ========================================================= */
.g-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
}

.g-orb-1 {
    width: 500px; height: 500px;
    top: -100px; left: -150px;
    background: radial-gradient(circle, rgba(29, 78, 216, 0.15) 0%, transparent 65%);
}

.g-orb-2 {
    width: 600px; height: 600px;
    top: 30%; right: -200px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 65%);
}

.g-orb-3 {
    width: 550px; height: 550px;
    bottom: -150px; left: 10%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 65%);
}
</style>