<template>

  <div class="landing-page">

      <LandingNavbar />

      <HeroProjects />

      <Projects />

      <LandingFooter />

  </div>


</template>

<script setup>
import Projects from '@/components/landing/Projects.vue'
import LandingNavbar from '@/components/LandingNavbar.vue'
import LandingFooter from '@/components/LandingFooter.vue';
import HeroProjects from '@/components/landing/HeroProjects.vue'
</script>

<style scoped>
.landing-page{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.landing-page > *{
  flex-shrink: 0;
}

.landing-page footer{
  margin-top: auto;
}
</style>