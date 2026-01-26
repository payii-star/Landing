<template>
    <div class="landing-dark-bg min-vh-100 d-flex flex-column text-white font-inter overflow-hidden">
        
        <header class="fixed-top transition-all animate-slide-down" :class="{ 'bg-glass': isScrolled }">
            <div class="container d-flex justify-content-between align-items-center py-4">
                <div class="d-flex align-items-center gap-3">
                    <router-link to="/" class="d-flex align-items-center text-decoration-none text-white gap-2 hover-scale-sm">
                        <img v-if="landingStore.content?.logo" :src="getImageUrl(landingStore.content.logo)" alt="Logo" class="h-30px" />
                        <span v-else class="symbol symbol-30px">
                            <span class="symbol-label bg-white text-dark fw-bold rounded">M</span>
                        </span>
                        <span class="fw-bolder fs-4 tracking-tight">McFlyon</span>
                    </router-link>
                </div>

                <div class="d-none d-md-flex gap-8">
                    <a href="#" class="nav-link-custom">Home</a>
                    <a href="#" class="nav-link-custom">Features</a>
                    <a href="#" class="nav-link-custom">Pricing</a>
                    <a href="#" class="nav-link-custom">Contact</a>
                </div>

                <div class="d-flex gap-3 align-items-center">
                    <router-link to="/sign-in" class="btn btn-sm btn-light fw-bold px-6 rounded-pill hover-lift">
                        Login
                    </router-link>
                </div>
            </div>
        </header>

        <main class="flex-grow-1 d-flex align-items-center position-relative overflow-hidden pt-20">
            
            <div class="blob-container">
                <div class="blob blob-1"></div>
                <div class="blob blob-2"></div>
            </div>
            
            <div class="container position-relative z-index-1 text-center py-20">
                
                <transition name="fade-slide" mode="out-in">
                    
                    <div v-if="landingStore.loading" key="loading" class="py-20">
                        <div class="spinner-border text-primary mb-3" role="status"></div>
                        <div class="text-gray-500 fs-7 animate-pulse">Menghubungkan ke Server...</div>
                    </div>

                    <div v-else key="content">
                        <h1 class="display-3 fw-bolder mb-6 tracking-tight animate-up delay-1">
                            Build Faster with <br />
                            <span class="text-gradient-blue">{{ landingStore.content.hero_title || 'McFlyon App' }}</span>
                        </h1>
                        
                        <p class="fs-4 text-gray-400 mb-10 mx-auto mw-600px lh-base animate-up delay-2">
                            {{ landingStore.content.hero_desc || 'Platform modern untuk mengelola bisnis Anda dengan lebih efisien.' }}
                        </p>
                        
                        <div class="d-flex justify-content-center gap-4 mb-12 animate-up delay-3">
                            <router-link to="/sign-in" class="btn btn-lg btn-light fw-bold px-8 rounded-pill d-flex align-items-center gap-2 hover-glow">
                                Get Started
                                <i class="bi bi-arrow-right text-dark"></i>
                            </router-link>
                            <a href="#" class="btn btn-lg btn-outline btn-outline-white fw-bold px-8 rounded-pill hover-scale">
                                <i class="bi bi-play-circle me-2"></i> Demo
                            </a>
                        </div>

                        <div class="d-flex flex-column align-items-center gap-3 animate-up delay-4">
                            <div class="d-flex justify-content-center symbol-group symbol-hover mb-2">
                                <div class="symbol symbol-35px symbol-circle border border-2 border-dark" v-for="i in 3" :key="i">
                                    <img alt="Pic" :src="`https://ui-avatars.com/api/?name=User+${i}&background=random`" />
                                </div>
                                <div class="symbol symbol-35px symbol-circle border border-2 border-dark bg-dark">
                                    <span class="symbol-label fs-8 fw-bold text-white">+1k</span>
                                </div>
                            </div>
                            
                            <div class="text-gray-500 fs-7 fw-semibold">
                                Hubungi kami di: 
                                <span class="text-white fw-bold">{{ landingStore.content.contact_email || 'support@mcflyon.com' }}</span>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </main>

        <footer class="py-8 border-top border-gray-800 animate-fade-in delay-5">
            <div class="container d-flex justify-content-between align-items-center text-gray-500 fs-7">
                <div>&copy; {{ new Date().getFullYear() }} McFlyon. All rights reserved.</div>
                <div class="d-flex gap-4">
                   <span class="text-gray-600">Powered by Laravel & Vue</span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { useLandingStore } from "@/stores/landing"; // <--- IMPORT STORE KITA

// Inisialisasi Store
const landingStore = useLandingStore();

// State Lokal untuk Scroll Effect
const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

// Fungsi Helper untuk URL Gambar
const getImageUrl = (path: string | null) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_APP_API_URL || "http://127.0.0.1:8000";
    return `${baseUrl}${path}`;
};

onMounted(() => {
    // 1. Panggil Data dari Backend saat halaman dibuka
    landingStore.fetchContent();

    // 2. Setup Scroll Listener
    window.addEventListener("scroll", handleScroll);
    document.body.style.backgroundColor = "#0b0a19";
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    document.body.style.backgroundColor = "";
});
</script>

<style scoped>
/* =========================================
   1. CORE THEME
   ========================================= */
.landing-dark-bg {
    background-color: #0b0a19;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    position: relative;
}

/* Gradient Text */
.text-gradient-blue {
    background: linear-gradient(135deg, #3699FF 0%, #895DF2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    display: inline-block; 
}

/* =========================================
   2. ANIMATED BACKGROUND (FLOATING BLOBS)
   ========================================= */
.blob-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 10s infinite ease-in-out;
}

.blob-1 {
    top: -10%;
    left: 50%;
    width: 600px;
    height: 600px;
    background: #3699ff;
    transform: translateX(-50%);
    animation-delay: 0s;
}

.blob-2 {
    bottom: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: #895df2;
    animation: float 14s infinite ease-in-out reverse;
}

@keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0, 0) scale(1); }
}

/* =========================================
   3. ENTRANCE ANIMATIONS
   ========================================= */

.animate-slide-down {
    animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.animate-up {
    opacity: 0;
    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.3s; }
.delay-3 { animation-delay: 0.5s; }
.delay-4 { animation-delay: 0.7s; }
.delay-5 { animation-delay: 1.0s; }

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
}

/* =========================================
   4. HOVER EFFECTS
   ========================================= */
.nav-link-custom {
    color: #9D9DA6;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    position: relative;
}
.nav-link-custom:hover { color: #ffffff; }
.nav-link-custom::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #3699FF;
    transition: width 0.3s ease;
}
.nav-link-custom:hover::after { width: 100%; }

.hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.hover-lift:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }

.hover-scale { transition: transform 0.3s ease; }
.hover-scale:hover { transform: scale(1.05); }
.hover-scale-sm:hover { transform: scale(1.02); }

.hover-glow:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
}

/* =========================================
   5. TRANSITIONS
   ========================================= */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.5s ease;
}
.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
}
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.bg-glass {
    background: rgba(11, 10, 25, 0.7);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.btn-outline-white {
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
}
.btn-outline-white:hover {
    background: rgba(255,255,255,0.1);
    color: white;
}
</style>