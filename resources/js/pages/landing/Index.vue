<template>
    <div class="landing-wrapper">

        <ParticleBackground />

        <!-- Global ambient orbs — konsisten di seluruh halaman -->
        <div class="g-orb g-orb-1"></div>
        <div class="g-orb g-orb-2"></div>
        <div class="g-orb g-orb-3"></div>
        <div class="g-orb g-orb-4"></div>
        <div class="g-orb g-orb-5"></div>
        <div class="g-orb g-orb-6"></div>
        <div class="g-orb g-orb-7"></div>
        <div class="g-orb g-orb-8"></div>

        <LandingNavbar />

        <LandingHero />
        <LandingBestProject />
        <LandingTestimonials />
        <LandingClientLogos />
        <LandingCta />
        <LandingFooter/>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLandingStore } from "@/stores/landing";
import Projects from '@/components/landing/Projects.vue';

import LandingNavbar from "@/components/LandingNavbar.vue";
import LandingHero from "@/components/LandingHero.vue";
import LandingClientLogos from "@/components/LandingClientLogos.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import ParticleBackground from "@/components/ParticleBackground.vue";
import LandingTestimonials from "@/components/LandingTestimonials.vue";
import LandingBestProject from "@/components/LandingBestProject.vue";
import LandingCta from '@/components/LandingCta.vue';

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
    padding-top: 72px;
    background: #020617;
    isolation: isolate;
    overflow-x: hidden; /* cegah horizontal scroll dari orbs */
}

/* ── Global ambient orbs ── */
.g-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
}
.g-orb-1 {
    width: 900px; height: 900px;
    top: -100px; left: -200px;
    background: radial-gradient(circle, rgba(29, 78, 216, 0.14) 0%, transparent 65%);
    filter: blur(60px);
    animation: gOrbFloat 14s ease-in-out infinite;
}
.g-orb-2 {
    width: 650px; height: 650px;
    top: 200px; right: -150px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, transparent 65%);
    filter: blur(70px);
    animation: gOrbFloat 18s ease-in-out infinite reverse;
}
.g-orb-3 {
    width: 800px; height: 800px;
    top: 80vh; left: -120px;
    background: radial-gradient(circle, rgba(29, 78, 216, 0.13) 0%, transparent 65%);
    filter: blur(75px);
    animation: gOrbFloat 16s ease-in-out infinite 1s;
}
.g-orb-4 {
    width: 650px; height: 650px;
    top: 120vh; right: -130px;
    background: radial-gradient(circle, rgba(96, 165, 250, 0.09) 0%, transparent 65%);
    filter: blur(70px);
    animation: gOrbFloat 20s ease-in-out infinite reverse 2s;
}
.g-orb-5 {
    width: 850px; height: 850px;
    top: 170vh; left: -100px;
    background: radial-gradient(circle, rgba(29, 78, 216, 0.12) 0%, transparent 65%);
    filter: blur(80px);
    animation: gOrbFloat 13s ease-in-out infinite 0.5s;
}
.g-orb-6 {
    width: 700px; height: 700px;
    top: 210vh; right: -120px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, transparent 65%);
    filter: blur(75px);
    animation: gOrbFloat 17s ease-in-out infinite reverse 3s;
}
.g-orb-7 {
    width: 800px; height: 800px;
    top: 255vh; left: 10%;
    background: radial-gradient(circle, rgba(29, 78, 216, 0.11) 0%, transparent 65%);
    filter: blur(85px);
    animation: gOrbFloat 15s ease-in-out infinite 2s;
}
.g-orb-8 {
    width: 650px; height: 650px;
    top: 200vh; right: -100px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.09) 0%, transparent 65%);
    filter: blur(80px);
    animation: gOrbFloat 19s ease-in-out infinite 1s;
}

@keyframes gOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(40px, -50px) scale(1.06); }
    66%       { transform: translate(-25px, 30px) scale(0.96); }
}

/* ── Orbs lebih kecil di mobile ── */
@media (max-width: 768px) {
    .g-orb-1 { width: 500px; height: 500px; }
    .g-orb-2 { width: 380px; height: 380px; }
    .g-orb-3 { width: 480px; height: 480px; top: 75vh; }
    .g-orb-4 { width: 400px; height: 400px; top: 115vh; }
    .g-orb-5 { width: 480px; height: 480px; top: 165vh; }
    .g-orb-6 { width: 400px; height: 400px; top: 205vh; }
    .g-orb-7 { width: 450px; height: 450px; top: 250vh; }
    .g-orb-8 { width: 380px; height: 380px; top: 295vh; }
}
@media (max-width: 480px) {
    .landing-wrapper { padding-top: 64px; }
    .g-orb-1 { width: 340px; height: 340px; }
    .g-orb-2 { width: 280px; height: 280px; right: -80px; }
    .g-orb-3 { width: 340px; height: 340px; }
    .g-orb-4 { width: 300px; height: 300px; right: -60px; }
    .g-orb-5, .g-orb-6, .g-orb-7, .g-orb-8 { width: 320px; height: 320px; }
}
</style>
