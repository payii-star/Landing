<template>
  <footer class="footer">

    <!-- Top border glow -->
    <div class="footer-top-line"></div>

    <!-- Orbs -->
    <div class="footer-orb orb-l"></div>
    <div class="footer-orb orb-r"></div>

    <div class="container-xxl">

      <!-- Loading -->
      <div v-if="footerStore.loading || !footerStore.setting" class="footer-loading">
        <div class="footer-spinner"></div>
      </div>

      <!-- Content -->
      <div v-else class="footer-grid">

        <!-- Col 1: Company -->
        <div class="footer-col footer-col-main">
          <div class="footer-brand">
            <div class="brand-dot"></div>
            <span class="brand-name">{{ footerStore.setting?.company_name }}</span>
          </div>
          <p class="footer-desc">{{ footerStore.setting?.description }}</p>

          <!-- Contact -->
          <div class="footer-contacts">
            <div v-if="footerStore.setting?.address" class="contact-item">
              <div class="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.8"/>
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.8"/>
                </svg>
              </div>
              <span>{{ footerStore.setting?.address }}</span>
            </div>
            <div v-if="footerStore.setting?.email" class="contact-item">
              <div class="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M2 8l10 6 10-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </div>
              <span>{{ footerStore.setting?.email }}</span>
            </div>
            <div v-if="footerStore.setting?.phone" class="contact-item">
              <div class="contact-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4.5c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" stroke-width="1.8"/>
                </svg>
              </div>
              <span>{{ footerStore.setting?.phone }}</span>
            </div>
          </div>
        </div>

        <!-- Col 2: Social -->
        <div class="footer-col" v-if="footerStore.socials?.length">
          <h6 class="footer-col-title">
            <span class="col-title-dot"></span>
            Ikuti Kami
          </h6>
          <div class="footer-socials">
            <a
              v-for="social in footerStore.socials"
              :key="social.id"
              :href="social.url"
              target="_blank"
              rel="noopener"
              class="social-link"
            >
              <span class="social-arrow">→</span>
              {{ social.platform }}
            </a>
          </div>
        </div>

        <!-- Col 3: Newsletter -->
        <div class="footer-col">
          <h6 class="footer-col-title">
            <span class="col-title-dot"></span>
            Stay Updated
          </h6>
          <p class="footer-desc sm">Dapatkan informasi terbaru langsung di inbox Anda.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Email Anda" class="newsletter-input"/>
            <button class="newsletter-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <div class="footer-divider"></div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <span class="footer-copy">{{ footerStore.setting?.copyright || `© ${currentYear} All rights reserved.` }}</span>
        <div class="footer-bottom-links">
          <a href="#" class="bottom-link">Privacy Policy</a>
          <span class="bottom-sep">·</span>
          <a href="#" class="bottom-link">Terms of Service</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { onMounted } from 'vue';
import { useFooterStore } from '@/stores/footer';

const footerStore = useFooterStore();
const currentYear = new Date().getFullYear();

onMounted(() => {
  if (!footerStore.setting) footerStore.fetchFooter();
});
</script>

<style scoped>
.footer {
  position: relative;
  z-index: 10;
  background: rgba(4, 8, 22, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow: hidden;
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
}

/* Top border glow */
.footer-top-line {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(to right,
    transparent, rgba(59,130,246,0.3), rgba(139,92,246,0.2), transparent);
}

/* Orbs */
.footer-orb {
  position: absolute; border-radius: 50%;
  pointer-events: none; filter: blur(90px);
}
.orb-l {
  width: 400px; height: 400px;
  bottom: -160px; left: -120px;
  background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%);
}
.orb-r {
  width: 340px; height: 340px;
  top: -100px; right: -80px;
  background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%);
}

/* Loading */
.footer-loading {
  display: flex; align-items: center; justify-content: center;
  padding: 64px;
}
.footer-spinner {
  width: 22px; height: 22px;
  border: 2px solid rgba(59,130,246,0.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Grid */
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.4fr;
  gap: 56px;
  padding: 64px 0 48px;
}

/* Col */
.footer-col {}
.footer-col-main {}

/* Brand */
.footer-brand {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 18px;
}
.brand-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 10px rgba(59,130,246,0.7);
  flex-shrink: 0;
}
.brand-name {
  font-size: 1.25rem; font-weight: 800;
  background: linear-gradient(135deg, #e8eeff 0%, #c7d2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

/* Desc */
.footer-desc {
  font-size: 0.875rem; color: #94a3b8;
  line-height: 1.8; margin: 0 0 24px;
}
.footer-desc.sm { font-size: 0.8rem; margin-bottom: 16px; color: #64748b; }

/* Contacts */
.footer-contacts { display: flex; flex-direction: column; gap: 10px; }
.contact-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 0.8rem; color: #94a3b8; line-height: 1.5;
  transition: color 0.2s;
}
.contact-item:hover { color: #cbd5e1; }
.contact-icon {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  background: rgba(59,130,246,0.08);
  border: 1px solid rgba(59,130,246,0.15);
  display: flex; align-items: center; justify-content: center;
  color: #3b82f6; margin-top: 1px;
}

/* Col title */
.footer-col-title {
  display: flex; align-items: center; gap: 9px;
  font-size: 0.7rem; font-weight: 800;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: #e2eaff; margin: 0 0 20px;
}
.col-title-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #3b82f6; flex-shrink: 0;
  box-shadow: 0 0 6px rgba(59,130,246,0.6);
}

/* Socials */
.footer-socials { display: flex; flex-direction: column; gap: 8px; }
.social-link {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.82rem; color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s, gap 0.25s;
}
.social-link:hover { color: #60a5fa; gap: 12px; }
.social-arrow {
  font-size: 0.75rem; color: #475569;
  transition: color 0.2s;
}
.social-link:hover .social-arrow { color: #3b82f6; }

/* Newsletter */
.newsletter-form {
  display: flex; align-items: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; overflow: hidden;
  transition: border-color 0.2s;
}
.newsletter-form:focus-within { border-color: rgba(59,130,246,0.35); }
.newsletter-input {
  flex: 1; padding: 11px 14px;
  background: transparent; border: none; outline: none;
  font-family: inherit; font-size: 0.82rem;
  color: #e2eaff;
}
.newsletter-input::placeholder { color: #475569; }
.newsletter-btn {
  width: 42px; height: 42px; flex-shrink: 0;
  background: #1d4ed8; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #fff; transition: background 0.2s;
}
.newsletter-btn:hover { background: #1e40af; }

/* Divider */
.footer-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(59,130,246,0.15), transparent);
}

/* Bottom bar */
.footer-bottom {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 0 28px;
  gap: 16px; flex-wrap: wrap;
}
.footer-copy { font-size: 0.75rem; color: #475569; }
.footer-bottom-links { display: flex; align-items: center; gap: 10px; }
.bottom-link {
  font-size: 0.75rem; color: #475569;
  text-decoration: none; transition: color 0.2s;
}
.bottom-link:hover { color: #60a5fa; }
.bottom-sep { color: #475569; font-size: 0.7rem; }

/* Responsive */
@media (max-width: 992px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
  .footer-col-main { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr; gap: 28px; padding: 44px 0 36px; }
  .footer-col-main { grid-column: auto; }
  .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>