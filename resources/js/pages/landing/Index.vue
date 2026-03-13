<template>
    <div class="landing-wrapper min-vh-100 d-flex flex-column">
        
        <LandingNavbar />
        
        <LandingHero />
        
        <!-- <LandingFooter /> -->

        <Footer />

    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLandingStore } from "@/stores/landing";
import Footer from '@/components/landing/footer.vue';
import Projects from '@/components/landing/Projects.vue';

// Import Components
import LandingNavbar from "@/components/LandingNavbar.vue";
import LandingHero from "@/components/LandingHero.vue";
import LandingFooter from "@/components/LandingFooter.vue";

// Inisialisasi Store Pinia
const landingStore = useLandingStore();

onMounted(async () => {
    try {
        // 1. Fetch content umum (Logo, Judul Hero, Deskripsi, dll)
        await landingStore.fetchContent();

        // 2. Fetch Menu Navbar dari Backend (INI YANG SEBELUMNYA KURANG)
        await landingStore.fetchMenu();
        
    } catch (error) {
        console.error("Error mounting landing page:", error);
    }
});
</script>

<style scoped>
.landing-wrapper {
    /* Background gradient gelap modern */
    background: linear-gradient(180deg, #0A0E27 0%, #141B2D 50%, #1A2332 100%);
    color: white;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>