<template>

  <LandingNavbar />

  <!-- HERO PAGE -->
  <section class="projects-hero">
    <div class="container text-center">

      <span class="hero-label">PORTFOLIO</span>

      <h1 class="hero-title">
        Our Projects
      </h1>

      <p class="hero-subtitle">
        Explore some of the digital solutions we have crafted
        for our clients and partners.
      </p>

    </div>
  </section>

  <!-- PROJECT LIST -->
  <Projects :showHeader="false" />

</template>

<script setup>
import Projects from '@/components/landing/Projects.vue'
import LandingNavbar from '@/components/LandingNavbar.vue'
</script>

<style scoped>

.projects-hero {
  padding: 140px 0 80px;
  background: linear-gradient(
    180deg,
    var(--navy-darkest) 0%,
    var(--navy-dark) 100%
  );
}

.hero-label {
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #94a3b8;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-top: 10px;
}

.hero-subtitle {
  color: #94a3b8;
  max-width: 520px;
  margin: 12px auto 0;
}

</style>