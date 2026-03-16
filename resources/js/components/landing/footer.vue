<template>
  <footer class="footer-custom text-white">
    <div class="container py-5">

        <!-- Loading -->
        <div v-if="footerStore.loading || !footerStore.setting" class="text-center py-5">

          <div class="spinner-border text-primary"></div>

          <p class="mt-3 text-muted small">
            Loading footer...
          </p>

        </div>
      <div v-else class="row gy-4">

        <!-- Company Info -->
        <div class="col-lg-5 col-md-6">
          <h4 class="fw-bold mb-3">
            {{ footerStore.setting?.company_name }}
          </h4>

          <p class="footer-desc">
            {{ footerStore.setting?.description }}
          </p>

          <div class="footer-contact mt-4">
            <p><i class="bi bi-geo-alt me-2"></i>{{ footerStore.setting?.address }}</p>
            <p><i class="bi bi-envelope me-2"></i>{{ footerStore.setting?.email }}</p>
            <p><i class="bi bi-telephone me-2"></i>{{ footerStore.setting?.phone }}</p>
          </div>
        </div>

        <!-- Social -->
        <div class="col-lg-3 col-md-6">
          <h6 class="footer-title mb-3">Follow Us</h6>

          <div class="d-flex flex-column gap-2">
            <a
              v-for="social in footerStore.socials"
              :key="social.id"
              :href="social.url"
              target="_blank"
              class="footer-link"
            >
              {{ social.platform }}
            </a>
          </div>
        </div>

        <!-- Extra Column (Optional Future CMS Section) -->
        <div class="col-lg-4">
          <h6 class="footer-title mb-3">Stay Updated</h6>
          <p class="footer-desc small">
            Subscribe to our newsletter for updates.
          </p>

          <div class="input-group mt-3">
            <input type="email" class="form-control" placeholder="Your email" />
            <button class="btn btn-primary">Subscribe</button>
          </div>
        </div>

      </div>

      <div class="footer-divider my-4"></div>

      <div class="text-center small footer-copy">
        {{ footerStore.setting?.copyright }}
      </div>
      <div class="footer-bg">
        <div class="footer-orb orb-left"></div>
        <div class="footer-orb orb-right"></div>
      </div>
    </div>
    
  </footer>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useFooterStore } from '@/stores/footer'

const footerStore = useFooterStore()

watch(() => footerStore.setting, (val) => {
  console.log("SETTING CHANGED:", val)
})

onMounted(() => {
  if (!footerStore.setting) {
    footerStore.fetchFooter()
  }
})
</script>

<style scoped>
.footer-custom {
  position: relative;
  background: rgba(15, 23, 42, 0.6);
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Company Title (same gradient as hero title) */
.footer-custom h4 {
  font-weight: 700;
  font-size: 28px;

  background: linear-gradient(135deg, #ffffff 0%, #E0E7FF 50%, #C7D2FE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Description */
.footer-desc {
  color: #94A3B8;
  line-height: 1.7;
}

/* Section title */
.footer-title {
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 13px;
  color: #CBD5F5;
}


/* Contact info */
.footer-contact p {
  margin-bottom: 6px;
  color: #94A3B8;
}

/* Links */
.footer-link {
  color: #94A3B8;
  text-decoration: none;
  transition: all 0.25s ease;
}

.footer-link:hover {
  color: white;
  transform: translateX(6px);
}

/* Divider */
.footer-divider {
  height: 1px;
  background: rgba(99, 102, 241, 0.2);
}

/* Copyright */
.footer-copy {
  color: #64748B;
}

.footer-orb{
  position:absolute;
  border-radius:50%;
  filter:blur(80px);
  opacity:.25;
}

.orb-left{
  background:radial-gradient(circle,#6366F1 0%,transparent 70%);
  bottom:-120px;
  left:-120px;
}

.orb-right{
  background:radial-gradient(circle,#8B5CF6 0%,transparent 70%);
  top:-100px;
  right:-100px;
}

</style>