<template>
  <section class="projects-hero">

    <!-- background glow -->
    <div class="hero-bg">
      <div class="hero-orb orb-left"></div>
      <div class="hero-orb orb-right"></div>
    </div>

    <div class="container text-center hero-content">

        <span class="hero-label">
            {{ projectsPageStore.setting?.label }}
        </span>

        <h1 class="hero-title">
            {{ projectsPageStore.setting?.title }}
        </h1>

        <p class="hero-subtitle">
            {{ projectsPageStore.setting?.subtitle }}
        </p>

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProjectsPageStore } from '@/stores/projectspage'

const projectsPageStore = useProjectsPageStore()

onMounted(() => {
  if (!projectsPageStore.setting) {
    projectsPageStore.fetchProjectsPage()
  }
})
</script>

<style scoped>

.projects-hero {
  padding: 120px 0 70px;

  background: linear-gradient(
    180deg,
    var(--navy-darkest) 0%,
    var(--navy-dark) 100%
  );
}

/* label */

.hero-label {
  font-size: 0.75rem;
  letter-spacing: 2px;

  color: #c7d2fe;
  background: rgba(99,102,241,0.15);

  border: 1px solid rgba(99,102,241,0.25);
  border-radius: 999px;

  padding: 6px 14px;
  display: inline-block;
}

/* title */

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-top: 16px;

  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #e0e7ff 50%,
    #c7d2fe 100%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


/* subtitle */

.hero-subtitle {
  color: #94a3b8;
  max-width: 560px;
  margin: 18px auto 0;
  line-height: 1.6;
  font-size: 1.05rem;
}

/* layering */

.hero-content{
  position: relative;
  z-index: 2;
}

.hero-bg{
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:360px;

  overflow:hidden;
  z-index:1;
}

/* glow orb */

.hero-orb{
  position:absolute;
  width:420px;
  height:420px;
  border-radius:50%;
  filter:blur(90px);
  opacity:.22;
}

/* kiri */

.orb-left{
  background:radial-gradient(circle,#6366F1 0%,transparent 70%);
  top:-120px;
  left:-120px;
}

/* kanan */

.orb-right{
  background:radial-gradient(circle,#8B5CF6 0%,transparent 70%);
  bottom:-160px;
  right:-160px;
}

</style>