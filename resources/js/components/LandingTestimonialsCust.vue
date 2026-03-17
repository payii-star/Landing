<template>
  <section class="tst-section">
    <div class="tst-top-line"></div>

    <div class="tst-header">
      <div class="tst-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-text">KATA MEREKA</span>
        <span class="eyebrow-line"></span>
      </div>
      <h2 class="tst-title">Apa Kata <span class="tst-title-hl">Klien Kami</span></h2>
      <p class="tst-subtitle">Kepercayaan mereka adalah pencapaian terbesar kami.</p>
    </div>

    <div v-if="isLoading" class="tst-skeleton-wrap">
      <div v-for="n in 3" :key="n" class="tst-skeleton-card">
        <div class="sk-top">
          <div class="sk-avatar"></div>
          <div class="sk-meta">
            <div class="sk-line sk-name"></div>
            <div class="sk-line sk-pos"></div>
          </div>
        </div>
        <div class="sk-line sk-c1"></div>
        <div class="sk-line sk-c2"></div>
        <div class="skeleton-sweep"></div>
      </div>
    </div>

    <div v-else-if="testimonials.length > 0" class="tst-marquee-wrap">
      <div class="tst-fade left"></div>
      <div class="tst-fade right"></div>

      <div class="tst-row" @mouseenter="paused1 = true" @mouseleave="paused1 = false">
        <div class="tst-track" :class="{ paused: paused1 }" :style="{ '--dur': dur1 + 's' }">
          <template v-for="pass in 2" :key="'r1p' + pass">
            <div v-for="(item, i) in paddedRow1" :key="'r1-' + pass + '-' + i" class="tst-item">
              <div class="tst-card">
                <div class="card-inner">
                  <div class="card-top">
                    <div class="tst-stars">
                      <svg v-for="s in 5" :key="s" viewBox="0 0 24 24" width="14" height="14" class="star-icon">
                        <path fill="#fbbf24" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    </div>
                    <div class="tst-quote-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(59,130,246,0.3)">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.89543 10.9124 7 12.017 7H19.017C20.1216 7 21.017 7.89543 21.017 9V15C21.017 17.7614 18.7784 20 16.017 20H14.017V21ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017C-0.535282 13 -1.017 12.5523 -1.017 12V9C-1.017 7.89543 -0.121573 7 0.983 7H8.017C9.12157 7 10.017 7.89543 10.017 9V15C10.017 17.7614 7.77843 20 5.017 20H3.017V21Z"/>
                      </svg>
                    </div>
                  </div>
                  <p class="tst-comment">"{{ item.comment }}"</p>
                  <div class="tst-author">
                    <div class="tst-avatar-wrap">
                      <img :src="getImageUrl(item.image)" :alt="item.name" class="tst-avatar"/>
                    </div>
                    <div class="tst-author-info">
                      <span class="tst-author-name">{{ item.name }}</span>
                      <span class="tst-author-pos">{{ item.position }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="tst-bottom-line"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const testimonials = ref<any[]>([]);
const isLoading = ref(true);
const paused1 = ref(false);

const getImageUrl = (path: string) => {
  if (!path) return `https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff`;
  return `http://127.0.0.1:8000/storage/${path}`;
};

const fetchTestimonials = async () => {
  try {
    const res = await axios.get('/landing/testimonials-public');
    testimonials.value = res.data;
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const paddedRow1 = computed(() => {
  if (!testimonials.value.length) return [];
  let arr = [...testimonials.value];
  while (arr.length < 8) arr = [...arr, ...testimonials.value];
  return arr;
});

const dur1 = computed(() => Math.max(30, paddedRow1.value.length * 4));

onMounted(() => fetchTestimonials());
</script>

<style scoped>
/* 1. JADIKAN TRANSPARAN AGAR RASI BINTANG TERLIHAT */
.tst-section {
  position: relative;
  z-index: 10;
  padding: 80px 0;
  overflow: hidden;
  background-color: transparent; /* PENTING: Transparan */
}

/* 2. EFEK KACA PADA KARTU */
.tst-card {
  width: 380px;
  background: rgba(15, 23, 42, 0.6); /* Semi transparan gelap */
  backdrop-filter: blur(12px); /* Efek blur */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.tst-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-5px);
  background: rgba(15, 23, 42, 0.8);
}

/* 3. PERBAIKAN BINTANG */
.tst-stars {
  display: flex;
  gap: 3px;
}
.star-icon {
  flex-shrink: 0;
  filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.4));
}

/* 4. LAYOUT & TEKS */
.tst-header { text-align: center; margin-bottom: 50px; }
.tst-eyebrow { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px; }
.eyebrow-line { width: 40px; height: 1px; background: rgba(59, 130, 246, 0.5); }
.eyebrow-text { color: #3b82f6; font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; }
.tst-title { color: #f1f5f9; font-size: 2.2rem; font-weight: 800; }
.tst-title-hl { color: #3b82f6; }
.tst-subtitle { color: #94a3b8; margin-top: 10px; }

.tst-marquee-wrap { position: relative; overflow: hidden; }
.tst-track { display: flex; width: max-content; animation: scroll var(--dur) linear infinite; }
.tst-track.paused { animation-play-state: paused; }
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.tst-item { padding: 15px; }
.card-inner { padding: 25px; }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.tst-comment { color: #cbd5e1; font-style: italic; line-height: 1.6; min-height: 80px; }
.tst-author { display: flex; align-items: center; gap: 15px; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); }
.tst-avatar { width: 45px; height: 45px; border-radius: 50%; border: 2px solid #3b82f6; }
.tst-author-name { display: block; color: #f1f5f9; font-weight: 700; font-size: 0.9rem; }
.tst-author-pos { color: #3b82f6; font-size: 0.75rem; }

/* Garis Batas */
.tst-top-line, .tst-bottom-line {
  position: absolute; left: 0; width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent);
}
.tst-top-line { top: 0; }
.tst-bottom-line { bottom: 0; }

/* Efek Fade di Samping */
.tst-fade {
  position: absolute; top: 0; bottom: 0; width: 150px; z-index: 2; pointer-events: none;
}
.left { left: 0; background: linear-gradient(to right, #0f172a, transparent); }
.right { right: 0; background: linear-gradient(to left, #0f172a, transparent); }
</style>