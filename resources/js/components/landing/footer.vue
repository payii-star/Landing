<template>
  <footer class="footer-custom text-white">
    <div class="container py-5">
      <div class="row gy-4">

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
.footer-custom h4 {
  background: linear-gradient(180deg, var(--navy-darkest) 0%, var(--navy-dark) 50%, var(--navy-medium) 100%);
  
}

.footer-desc {
  color: #e5e9ee;
  line-height: 1.6;
}

.footer-title {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #ededf5;
}

.footer-contact p {
  margin-bottom: 6px;
  color: #94a3b8;
}

.footer-link {
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: white;
  transform: translateX(5px);
}

.footer-divider {
  height: 1px;
  background: rgba(255,255,255,0.1);
}

.footer-copy {
  color: #64748b;
}

</style>