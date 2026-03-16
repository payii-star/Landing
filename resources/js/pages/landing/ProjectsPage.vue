<template>

  <LandingNavbar />

  <HeroProjects />

  <!-- PROJECT LIST -->
  <Projects />

  <Footer />

</template>

<script setup>
import Projects from '@/components/landing/Projects.vue'
import LandingNavbar from '@/components/LandingNavbar.vue'
import Footer from '@/components/landing/footer.vue';
import HeroProjects from '@/components/landing/HeroProjects.vue'
</script>

<style scoped>
</style>