<template>
    <div class="landing-wrapper">
        
        <ParticleBackground />
        
        <LandingNavbar />
        
        <LandingHero />
        <LandingServices />
        <LandingTestimonials />
        <LandingClientLogos />  
        <LandingFooter />

    </div>
</template>
    
<script setup lang="ts">
import { onMounted } from "vue";
import { useLandingStore } from "@/stores/landing";

import LandingNavbar from "@/components/LandingNavbar.vue";
import LandingHero from "@/components/LandingHero.vue";
import LandingClientLogos from "@/components/LandingClientLogos.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import ParticleBackground from "@/components/ParticleBackground.vue";
import LandingServices from "@/components/LandingServices.vue";
import LandingTestimonials from "@/components/LandingTestimonials.vue";

const landingStore = useLandingStore();

onMounted(async () => {
    try {
        await landingStore.fetchContent();
        await landingStore.fetchMenu();
        
    } catch (error) {
        console.error("Error mounting landing page:", error);
    }
});
</script>

<style scoped>
.landing-wrapper {
    color: white;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding-top: 72px; /* tinggi navbar fixed */
}
</style>