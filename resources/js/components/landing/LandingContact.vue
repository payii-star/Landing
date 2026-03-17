<template>
  <section class="contact-section">
    <div class="container">

      <!-- ══ HERO TEXT ══════════════════════════════════════ -->
      <div class="contact-hero text-center">
        <span class="section-tag">Kontak</span>

        <h1 class="hero-title" v-if="store.setting">
          {{ store.setting.hero_title }}
        </h1>
        <div v-else class="skeleton sk-title mx-auto"></div>

        <p class="hero-sub" v-if="store.setting">
          {{ store.setting.hero_subtitle }}
        </p>
        <div v-else class="skeleton sk-sub mx-auto mt-2"></div>
      </div>

      <!-- ══ MAIN GRID ══════════════════════════════════════ -->
      <div class="contact-grid">

        <!-- ── LEFT: Info Kontak ─────────────────────────── -->
        <div class="contact-info">

          <h2 class="info-heading">Informasi Kontak</h2>

          <template v-if="store.loading">
            <div v-for="n in 3" :key="n" class="skeleton sk-info-item mt-3"></div>
          </template>

          <template v-else-if="store.setting">

            <!-- Email -->
            <a
              v-if="store.setting.email"
              :href="`mailto:${store.setting.email}`"
              class="info-item"
            >
              <span class="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </span>
              <span class="info-text">{{ store.setting.email }}</span>
            </a>

            <!-- WhatsApp / Telepon -->
            <a
              v-if="store.setting.whatsapp || store.setting.phone"
              :href="`https://wa.me/${(store.setting.whatsapp || store.setting.phone).replace(/\D/g,'')}`"
              target="_blank"
              rel="noopener noreferrer"
              class="info-item"
            >
              <span class="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </span>
              <span class="info-text">
                {{ store.setting.whatsapp || store.setting.phone }}
              </span>
            </a>

            <!-- Alamat -->
            <a
              v-if="store.setting.address"
              :href="store.setting.maps_url || '#'"
              :target="store.setting.maps_url ? '_blank' : '_self'"
              rel="noopener noreferrer"
              class="info-item info-item--address"
            >
              <span class="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.8"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/>
                </svg>
              </span>
              <span class="info-text">{{ store.setting.address }}</span>
            </a>

            <!-- Sosial Media -->
            <div v-if="hasSocials" class="socials-wrap">
              <p class="socials-label">Ikuti Kami</p>
              <div class="socials-row">

                <a v-if="store.setting.socials?.instagram" :href="store.setting.socials.instagram" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                </a>

                <a v-if="store.setting.socials?.facebook" :href="store.setting.socials.facebook" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>

                <a v-if="store.setting.socials?.twitter" :href="store.setting.socials.twitter" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Twitter / X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>

                <a v-if="store.setting.socials?.linkedin" :href="store.setting.socials.linkedin" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                </a>

                <a v-if="store.setting.socials?.youtube" :href="store.setting.socials.youtube" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke="currentColor" stroke-width="1.8"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
                </a>

                <a v-if="store.setting.socials?.tiktok" :href="store.setting.socials.tiktok" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/></svg>
                </a>

              </div>
            </div>

          </template>
        </div>

        <!-- ── RIGHT: Form ───────────────────────────────── -->
        <div class="contact-form-wrap">

          <!-- SUCCESS STATE -->
          <Transition name="fade-up">
            <div v-if="store.submitSuccess" class="success-card">
              <div class="success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#34d399" stroke-width="1.8"/>
                  <path d="M8 12l3 3 5-5" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="success-title">Pesan Terkirim!</h3>
              <p class="success-body">Terima kasih, kami akan segera menghubungi Anda.</p>
              <button class="btn-send mt-3" @click="resetAndForm">Kirim Pesan Lagi</button>
            </div>
          </Transition>

          <!-- FORM -->
          <Transition name="fade-up">
            <form v-if="!store.submitSuccess" class="contact-form" @submit.prevent="handleSubmit" novalidate>

              <!-- Error global -->
              <div v-if="store.submitError" class="form-error-banner">
                {{ store.submitError }}
              </div>

              <p class="form-section-label">HUBUNGI CEPAT</p>

              <div class="form-row">
                <div class="form-group" :class="{ 'has-error': errors.name }">
                  <input v-model="form.name" type="text" placeholder="Nama Lengkap *" class="form-input" />
                  <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
                </div>
                <div class="form-group">
                  <input v-model="form.company" type="text" placeholder="Perusahaan / Instansi" class="form-input" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group" :class="{ 'has-error': errors.email }">
                  <input v-model="form.email" type="email" placeholder="Email *" class="form-input" />
                  <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                  <input v-model="form.phone" type="tel" placeholder="No. Telepon" class="form-input" />
                </div>
              </div>

              <p class="form-section-label mt-4">PESAN</p>

              <div class="form-group" :class="{ 'has-error': errors.message }">
                <textarea
                  v-model="form.message"
                  rows="6"
                  placeholder="Ceritakan apa kebutuhan Anda?"
                  class="form-input form-textarea"
                ></textarea>
                <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
              </div>

              <!-- File Upload -->
              <div class="file-upload-wrap" @click="triggerFile" @dragover.prevent @drop.prevent="onDrop">
                <input ref="fileInput" type="file" class="d-none" @change="onFileChange"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip" />
                <div class="file-upload-inner">
                  <span class="file-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span class="file-label">
                    {{ form.file ? form.file.name : 'Kirim File (PDF, Word, Excel, Gambar, ZIP — maks 5MB)' }}
                  </span>
                  <button v-if="form.file" type="button" class="file-remove" @click.stop="form.file = null">✕</button>
                </div>
              </div>

              <p class="form-section-label mt-4">BAGAIMANA ANDA TAHU KAMI?</p>

              <div class="source-options">
                <label
                  v-for="opt in sourceOptions"
                  :key="opt"
                  class="source-opt"
                  :class="{ active: form.source === opt }"
                >
                  <input type="radio" v-model="form.source" :value="opt" class="d-none" />
                  {{ opt }}
                </label>
              </div>

              <button type="submit" class="btn-send" :disabled="store.submitting">
                <span v-if="store.submitting" class="spinner"></span>
                <span v-else>Kirim</span>
              </button>

            </form>
          </Transition>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useContactStore } from '@/stores/contact'

const store = useContactStore()

// ── Form state ────────────────────────────────────────────
const form = ref({
  name:    '',
  email:   '',
  company: '',
  phone:   '',
  message: '',
  source:  '',
  file:    null as File | null,
})

const errors = ref<Record<string, string>>({})

const fileInput = ref<HTMLInputElement | null>(null)

const sourceOptions = [
  'Google / Search Engine',
  'Media Sosial',
  'Referensi Teman / Kolega',
  'Iklan',
  'Lainnya',
]

// ── Computed ─────────────────────────────────────────────
const hasSocials = computed(() => {
  if (!store.setting?.socials) return false
  return Object.keys(store.setting.socials).length > 0
})

// ── Validation ───────────────────────────────────────────
function validate(): boolean {
  errors.value = {}
  if (!form.value.name.trim())
    errors.value.name = 'Nama wajib diisi.'
  if (!form.value.email.trim())
    errors.value.email = 'Email wajib diisi.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
    errors.value.email = 'Format email tidak valid.'
  if (!form.value.message.trim())
    errors.value.message = 'Pesan wajib diisi.'
  return Object.keys(errors.value).length === 0
}

// ── Submit ────────────────────────────────────────────────
async function handleSubmit() {
  if (!validate()) return
  await store.sendMessage({
    name:    form.value.name,
    email:   form.value.email,
    company: form.value.company || undefined,
    phone:   form.value.phone   || undefined,
    message: form.value.message,
    source:  form.value.source  || undefined,
    file:    form.value.file,
  })
}

function resetAndForm() {
  store.resetForm()
  form.value = { name: '', email: '', company: '', phone: '', message: '', source: '', file: null }
  errors.value = {}
}

// ── File Upload ──────────────────────────────────────────
function triggerFile() {
  fileInput.value?.click()
}
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) form.value.file = input.files[0]
}
function onDrop(e: DragEvent) {
  if (e.dataTransfer?.files?.[0]) form.value.file = e.dataTransfer.files[0]
}
</script>

<style scoped>
/* ══ SECTION WRAPPER ═══════════════════════════════════════ */
.contact-section {
  position: relative;
  z-index: 2;
  padding: 120px 0 80px;
  color: #f8fafc;
}

/* ══ HERO ══════════════════════════════════════════════════ */
.contact-hero {
  margin-bottom: 72px;
}
.section-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #60a5fa;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.2);
  border-radius: 999px;
  padding: 5px 16px;
  margin-bottom: 20px;
}
.hero-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  max-width: 720px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  color: #94a3b8;
  font-size: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

/* ══ MAIN GRID ═════════════════════════════════════════════ */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 48px;
  align-items: start;
}
@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; }
}

/* ══ LEFT: INFO ════════════════════════════════════════════ */
.contact-info {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 36px 32px;
  backdrop-filter: blur(12px);
  position: sticky;
  top: 100px;
}
.info-heading {
  font-size: 1.1rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.info-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  text-decoration: none;
  color: #94a3b8;
  transition: color 0.2s ease;
}
.info-item:last-of-type { border-bottom: none; }
.info-item:hover { color: #e2e8f0; }
.info-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.2);
  border-radius: 10px;
  color: #60a5fa;
  transition: background 0.2s, transform 0.2s;
}
.info-item:hover .info-icon {
  background: rgba(59,130,246,0.18);
  transform: scale(1.08);
}
.info-text {
  font-size: 0.9rem;
  line-height: 1.5;
  padding-top: 8px;
}

/* Sosial Media */
.socials-wrap { margin-top: 28px; }
.socials-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #475569;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.socials-row { display: flex; gap: 10px; flex-wrap: wrap; }
.social-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: #64748b;
  transition: all 0.25s ease;
  text-decoration: none;
}
.social-btn:hover {
  background: rgba(59,130,246,0.15);
  border-color: rgba(59,130,246,0.3);
  color: #60a5fa;
  transform: translateY(-2px);
}

/* ══ RIGHT: FORM ═══════════════════════════════════════════ */
.contact-form-wrap { position: relative; min-height: 200px; }
.contact-form {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 40px 36px;
  backdrop-filter: blur(12px);
}
@media (max-width: 576px) {
  .contact-form { padding: 28px 20px; }
}

.form-section-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #475569;
  margin-bottom: 16px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
@media (max-width: 576px) {
  .form-row { grid-template-columns: 1fr; }
}
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px;
  padding: 14px 16px;
  color: #e2e8f0;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  resize: none;
}
.form-input::placeholder { color: #475569; }
.form-input:focus {
  border-color: rgba(59,130,246,0.5);
  background: rgba(59,130,246,0.05);
}
.form-textarea { min-height: 150px; }
.has-error .form-input { border-color: rgba(239,68,68,0.5); }
.field-error { font-size: 0.78rem; color: #f87171; }
.form-error-banner {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.2);
  border-radius: 10px;
  padding: 12px 16px;
  color: #f87171;
  font-size: 0.85rem;
  margin-bottom: 20px;
}

/* File Upload */
.file-upload-wrap {
  background: rgba(255,255,255,0.03);
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 16px 18px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  margin-bottom: 0;
}
.file-upload-wrap:hover {
  border-color: rgba(59,130,246,0.35);
  background: rgba(59,130,246,0.04);
}
.file-upload-inner { display: flex; align-items: center; gap: 12px; }
.file-icon {
  width: 38px; height: 38px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.2);
  border-radius: 10px;
  color: #60a5fa;
}
.file-label { font-size: 0.85rem; color: #64748b; flex: 1; }
.file-remove {
  background: rgba(239,68,68,0.1);
  border: none;
  color: #f87171;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.75rem;
  cursor: pointer;
}

/* Source options */
.source-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}
.source-opt {
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 999px;
  font-size: 0.8rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}
.source-opt:hover { border-color: rgba(59,130,246,0.3); color: #94a3b8; }
.source-opt.active {
  background: rgba(59,130,246,0.15);
  border-color: rgba(59,130,246,0.4);
  color: #93c5fd;
}

/* Submit button */
.btn-send {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}
.btn-send:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99,102,241,0.35);
}
.btn-send:disabled { opacity: 0.6; cursor: not-allowed; }
.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Success card */
.success-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(52,211,153,0.2);
  border-radius: 20px;
  padding: 60px 36px;
  text-align: center;
}
.success-icon {
  width: 64px; height: 64px;
  background: rgba(52,211,153,0.1);
  border: 1px solid rgba(52,211,153,0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.success-title { font-size: 1.4rem; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; }
.success-body  { color: #94a3b8; font-size: 0.9rem; }

/* Skeleton */
.skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 8px;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.sk-title   { height: 52px; width: 70%; border-radius: 12px; }
.sk-sub     { height: 20px; width: 40%; }
.sk-info-item { height: 52px; border-radius: 12px; }

/* Transitions */
.fade-up-enter-active { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.fade-up-leave-active { transition: all 0.25s ease; }
.fade-up-enter-from  { opacity: 0; transform: translateY(20px); }
.fade-up-leave-to    { opacity: 0; transform: translateY(-10px); }
</style>