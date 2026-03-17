<script setup lang="ts">
import { onMounted } from 'vue'
import { useContactStore } from '@/stores/contact'
import LandingNavbar from '@/components/LandingNavbar.vue'
import LandingFooter from '@/components/LandingFooter.vue'
import ParticleBackground from '@/components/ParticleBackground.vue'
import LandingContact from '@/components/landing/LandingContact.vue'

const contactStore = useContactStore()

onMounted(async () => {
  await contactStore.fetchSetting()
})
</script>

<template>
  <div class="landing-wrapper">
    <ParticleBackground />

    <div class="g-orb g-orb-1"></div>
    <div class="g-orb g-orb-2"></div>
    <div class="g-orb g-orb-3"></div>
    <div class="g-orb g-orb-4"></div>
    <div class="g-orb g-orb-5"></div>
    <div class="g-orb g-orb-6"></div>

    <LandingNavbar />

    <div class="page-content">
      <LandingContact />
    </div>

    <LandingFooter />
  </div>
</template>

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
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#ffffff 1.5px, transparent 1.5px);
  background-size: 40px 40px;
  opacity: 0.06;
  pointer-events: none;
  z-index: 1;
}

.page-content {
  position: relative;
  z-index: 2;
}

/* ── Orbs — sama persis dengan About.vue ── */
.g-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.g-orb-1 { width: 800px; height: 800px; top: -200px; left: -200px; background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%); filter: blur(80px); animation: gOrbFloat 20s ease-in-out infinite; }
.g-orb-2 { width: 600px; height: 600px; top: 200px; right: -150px; background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%); filter: blur(90px); animation: gOrbFloat 25s ease-in-out infinite reverse; }
.g-orb-3 { width: 700px; height: 700px; top: 60vh; left: -100px; background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%); filter: blur(100px); animation: gOrbFloat 22s ease-in-out infinite 2s; }
.g-orb-4 { width: 500px; height: 500px; top: 80vh; right: 5%; background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 60%); filter: blur(75px); animation: gOrbFloat 18s ease-in-out infinite 1s; }
.g-orb-5 { width: 850px; height: 850px; bottom: 0; left: -250px; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%); filter: blur(110px); animation: gOrbFloat 26s ease-in-out infinite 3s; }
.g-orb-6 { width: 650px; height: 650px; bottom: 0; right: -100px; background: radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 65%); filter: blur(85px); animation: gOrbFloat 21s ease-in-out infinite reverse; }

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
}
</style>