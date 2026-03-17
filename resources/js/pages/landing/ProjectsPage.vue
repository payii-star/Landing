<template>
  <div class="landing-wrapper">

    <ParticleBackground />

    <!-- ORBS -->
    <div class="g-orb g-orb-1"></div>
    <div class="g-orb g-orb-2"></div>
    <div class="g-orb g-orb-3"></div>
    <div class="g-orb g-orb-4"></div>
    <div class="g-orb g-orb-5"></div>
    <div class="g-orb g-orb-6"></div>
    <div class="g-orb g-orb-7"></div>
    <div class="g-orb g-orb-8"></div>

    <LandingNavbar />

    <div class="projects-content">
      <HeroProjects />
      <Projects />
    </div>

    <LandingFooter />

  </div>
</template>

<script setup>
import Projects from '@/components/landing/Projects.vue'
import LandingNavbar from '@/components/LandingNavbar.vue'
import LandingFooter from '@/components/LandingFooter.vue';
import HeroProjects from '@/components/landing/HeroProjects.vue'
import ParticleBackground from '@/components/ParticleBackground.vue';
</script>

<style scoped>

.landing-wrapper{
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: transparent;
  overflow-x: hidden;
  color: #f8fafc;
}

.projects-content{
  position: relative;
  z-index: 2;
}

/* star background */

.landing-wrapper::before{
  content:'';
  position:absolute;
  inset:0;

  background-image:
    radial-gradient(#ffffff 1.5px, transparent 1.5px);

  background-size:40px 40px;
  opacity:.06;

  pointer-events:none;
  z-index:1;
}

.g-orb{
  position:absolute;
  border-radius:50%;
  pointer-events:none;
  z-index:0;
}

.g-orb-1 { width: 800px; height: 800px; top: -200px; left: -200px; background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%); filter: blur(80px); animation: gOrbFloat 20s ease-in-out infinite; }
.g-orb-2 { width: 600px; height: 600px; top: 300px; right: -150px; background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 65%); filter: blur(90px); animation: gOrbFloat 25s ease-in-out infinite reverse; }
.g-orb-3 { width: 700px; height: 700px; top: 100vh; left: -100px; background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%); filter: blur(100px); animation: gOrbFloat 22s ease-in-out infinite 2s; }
.g-orb-4 { width: 500px; height: 500px; top: 130vh; right: 5%; background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 60%); filter: blur(75px); animation: gOrbFloat 18s ease-in-out infinite 1s; }
.g-orb-5 { width: 850px; height: 850px; top: 180vh; left: -250px; background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%); filter: blur(110px); animation: gOrbFloat 26s ease-in-out infinite 3s; }
.g-orb-6 { width: 650px; height: 650px; top: 220vh; right: -100px; background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 65%); filter: blur(85px); animation: gOrbFloat 21s ease-in-out infinite reverse; }
.g-orb-7 { width: 750px; height: 750px; top: 270vh; left: -150px; background: radial-gradient(circle, rgba(29, 78, 216, 0.11) 0%, transparent 65%); filter: blur(85px); animation: gOrbFloat 15s ease-in-out infinite 2s; }
.g-orb-8 { width: 650px; height: 650px; top: 300vh; right: -100px; background: radial-gradient(circle, rgba(59, 130, 246, 0.09) 0%, transparent 65%); filter: blur(80px); animation: gOrbFloat 19s ease-in-out infinite 1s; }

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
    .g-orb-5 { width: 500px; height: 500px; }
    .g-orb-6 { width: 400px; height: 400px; }
    .g-orb-7 { width: 450px; height: 450px; }
    .g-orb-8 { width: 400px; height: 400px; }
}
</style>