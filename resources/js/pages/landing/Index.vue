<template>
    <div class="landing-wrapper min-vh-100 d-flex flex-column">
        
        <!-- NAVBAR STYLE MCFLYON -->
        <header 
            class="navbar-mcflyon fixed-top" 
            :class="{ 
                'navbar-scrolled': isScrolled,
                'navbar-hidden': !navVisible 
            }"
        >
            <div class="container-xxl">
                <div class="navbar-container">
                    
                    <!-- LOGO SECTION (KIRI) -->
                    <router-link to="/" class="brand-logo-wrapper">
                        <div class="brand-logo animate-logo">
                            <!-- Jika ada logo dari backend -->
                            <img 
                                v-if="landingStore.content?.logo" 
                                :src="getImageUrl(landingStore.content.logo)" 
                                alt="McFlyon Logo" 
                                class="logo-image"
                            />
                            <!-- Logo default jika belum upload -->
                            <div v-else class="logo-placeholder">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" stroke="url(#logo-gradient)" stroke-width="2" fill="none"/>
                                    <path d="M20 15L28 19.5V28.5L20 33L12 28.5V19.5L20 15Z" fill="url(#logo-gradient)" opacity="0.3"/>
                                    <circle cx="20" cy="20" r="3" fill="url(#logo-gradient)"/>
                                    <defs>
                                        <linearGradient id="logo-gradient" x1="5" y1="5" x2="35" y2="35">
                                            <stop offset="0%" stop-color="#6366F1"/>
                                            <stop offset="100%" stop-color="#8B5CF6"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            
                            <!-- Brand Text -->
                            <div class="brand-text">
                                <span class="brand-name">McFlyon</span>
                            </div>
                        </div>
                    </router-link>

                    <!-- DESKTOP NAVIGATION (TENGAH) -->
                    <nav class="navbar-nav d-none d-lg-flex">
                        <template v-if="desktopMenus.length > 0">
                            <div 
                                v-for="menu in desktopMenus" 
                                :key="menu.id" 
                                class="nav-item-wrapper"
                            >
                                
                                <!-- DROPDOWN MENU -->
                                <div v-if="menu.has_dropdown && menu.children?.length" class="nav-dropdown">
                                    <a 
                                        href="#" 
                                        class="nav-link-main"
                                        @click.prevent="toggleDropdown(menu.id)"
                                        @mouseenter="showDropdown(menu.id)"
                                        @mouseleave="hideDropdown(menu.id)"
                                    >
                                        <span class="link-text">{{ menu.label }}</span>
                                        <i class="bi bi-chevron-down link-arrow" :class="{ 'arrow-up': activeDropdown === menu.id }"></i>
                                        <span v-if="menu.badge_text" class="link-badge" :class="`bg-${menu.badge_color || 'primary'}`">
                                            {{ menu.badge_text }}
                                        </span>
                                        <span class="link-underline"></span>
                                    </a>
                                    
                                    <!-- DROPDOWN CONTENT -->
                                    <transition name="dropdown-appear">
                                        <div 
                                            v-show="activeDropdown === menu.id" 
                                            class="dropdown-content"
                                            @mouseenter="showDropdown(menu.id)"
                                            @mouseleave="hideDropdown(menu.id)"
                                        >
                                            <div class="dropdown-inner">
                                                <a 
                                                    v-for="child in menu.children" 
                                                    :key="child.id"
                                                    :href="child.url"
                                                    :target="child.target || '_self'"
                                                    :rel="getRelAttribute(child)"
                                                    class="dropdown-link"
                                                    @click="trackMenuClick(child.id)"
                                                >
                                                    <div class="dropdown-link-icon">
                                                        <i :class="child.icon_class || 'bi bi-arrow-right'" class="icon"></i>
                                                    </div>
                                                    <div class="dropdown-link-text">
                                                        <div class="link-title">{{ child.label }}</div>
                                                        <div v-if="child.description && child.description.trim()" class="link-subtitle">{{ child.description }}</div>
                                                    </div>
                                                    <span v-if="child.badge_text" class="link-tag" :class="`bg-${child.badge_color || 'primary'}`">
                                                        {{ child.badge_text }}
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </transition>
                                </div>

                                <!-- REGULAR LINK (bukan button) -->
                                <a 
                                    v-else-if="menu.type === 'link'" 
                                    :href="menu.url" 
                                    :target="menu.target || '_self'"
                                    :rel="getRelAttribute(menu)"
                                    class="nav-link-main"
                                    @click="trackMenuClick(menu.id)"
                                >
                                    <span class="link-text">{{ menu.label }}</span>
                                    <span v-if="menu.badge_text" class="link-badge" :class="`bg-${menu.badge_color || 'primary'}`">
                                        {{ menu.badge_text }}
                                    </span>
                                    <span class="link-underline"></span>
                                </a>

                            </div>
                        </template>
                    </nav>

                    <!-- CTA BUTTONS (KANAN) -->
                    <div class="navbar-actions d-none d-lg-flex">
                        <template v-for="menu in desktopButtons" :key="'cta-' + menu.id">
                            <!-- BUTTON PRIMARY -->
                            <a 
                                v-if="menu.type === 'button-primary'" 
                                :href="menu.url" 
                                :target="menu.target || '_self'"
                                :rel="getRelAttribute(menu)"
                                class="btn-cta btn-cta-primary"
                                @click="trackMenuClick(menu.id)"
                            >
                                <span>{{ menu.label }}</span>
                                <i v-if="menu.icon_class" :class="menu.icon_class"></i>
                            </a>

                            <!-- BUTTON OUTLINE -->
                            <a 
                                v-else-if="menu.type === 'button-outline'" 
                                :href="menu.url" 
                                :target="menu.target || '_self'"
                                :rel="getRelAttribute(menu)"
                                class="btn-cta btn-cta-outline"
                                @click="trackMenuClick(menu.id)"
                            >
                                <span>{{ menu.label }}</span>
                            </a>
                        </template>
                    </div>

                    <!-- MOBILE HAMBURGER -->
                    <button 
                        class="hamburger-menu d-lg-none" 
                        :class="{ 'is-active': mobileMenuOpen }"
                        @click.stop="toggleMobileMenu"
                        aria-label="Toggle Menu"
                        type="button"
                    >
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </button>

                </div>
            </div>
        </header>

        <!-- MOBILE MENU OVERLAY - OUTSIDE HEADER -->
        <div 
            v-show="mobileMenuOpen" 
            class="mobile-menu-overlay"
            :class="{ 'mobile-menu-visible': mobileMenuOpen }"
            @click.self="closeMobileMenu"
        >
            <div class="mobile-menu-content">
                <nav class="mobile-navigation">
                    <template v-if="mobileMenus.length > 0">
                        <template v-for="menu in mobileMenus" :key="menu.id">
                            
                            <!-- MOBILE DROPDOWN -->
                            <div v-if="menu.has_dropdown && menu.children?.length" class="mobile-nav-item">
                                <button 
                                    type="button"
                                    class="mobile-nav-link"
                                    @click="toggleMobileDropdown(menu.id)"
                                >
                                    <span class="mobile-link-text">{{ menu.mobile_label || menu.label }}</span>
                                    <i class="bi mobile-link-icon" :class="mobileActiveDropdown === menu.id ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                </button>
                                
                                <transition name="mobile-collapse">
                                    <div v-show="mobileActiveDropdown === menu.id" class="mobile-submenu">
                                        <a 
                                            v-for="child in menu.children" 
                                            :key="child.id"
                                            :href="child.url"
                                            :target="child.target || '_self'"
                                            :rel="getRelAttribute(child)"
                                            class="mobile-submenu-link"
                                            @click="handleMobileMenuClick(child.id)"
                                        >
                                            <i v-if="child.icon_class" :class="child.icon_class"></i>
                                            <span>{{ child.mobile_label || child.label }}</span>
                                        </a>
                                    </div>
                                </transition>
                            </div>

                            <!-- MOBILE LINK -->
                            <a 
                                v-else-if="menu.type === 'link'"
                                :href="menu.url"
                                :target="menu.target || '_self'"
                                :rel="getRelAttribute(menu)"
                                class="mobile-nav-link"
                                @click="handleMobileMenuClick(menu.id)"
                            >
                                <span class="mobile-link-text">{{ menu.mobile_label || menu.label }}</span>
                            </a>

                            <!-- MOBILE BUTTON -->
                            <a 
                                v-else-if="menu.type === 'button-primary' || menu.type === 'button-outline'"
                                :href="menu.url"
                                :target="menu.target || '_self'"
                                :rel="getRelAttribute(menu)"
                                class="mobile-btn-cta"
                                :class="menu.type === 'button-primary' ? 'btn-primary' : 'btn-outline'"
                                @click="handleMobileMenuClick(menu.id)"
                            >
                                <span>{{ menu.mobile_label || menu.label }}</span>
                            </a>

                        </template>
                    </template>
                    
                    <!-- Empty State -->
                    <div v-else class="mobile-menu-empty">
                        <i class="bi bi-inbox fs-1 text-muted mb-3"></i>
                        <p class="text-muted">Tidak ada menu tersedia</p>
                    </div>
                </nav>
            </div>
        </div>

        <!-- HERO SECTION -->
        <main class="hero-wrapper flex-grow-1 d-flex align-items-center position-relative">
            
            <!-- ANIMATED PARTICLES BACKGROUND -->
            <div class="particles-bg">
                <div class="particle particle-1"></div>
                <div class="particle particle-2"></div>
                <div class="particle particle-3"></div>
                <div class="particle particle-4"></div>
                <div class="particle particle-5"></div>
            </div>

            <!-- GRADIENT ORBS -->
            <div class="gradient-orbs">
                <div class="orb orb-1"></div>
                <div class="orb orb-2"></div>
                <div class="orb orb-3"></div>
            </div>
            
            <div class="container-xxl position-relative">
                <transition name="hero-fade" mode="out-in">
                    
                    <!-- LOADING -->
                    <div v-if="landingStore.loading" key="loading" class="text-center py-20">
                        <div class="custom-spinner mb-4">
                            <div class="spinner-circle"></div>
                            <div class="spinner-circle-inner"></div>
                        </div>
                        <p class="loading-text">Menghubungkan ke Server...</p>
                    </div>

                    <!-- HERO CONTENT -->
                    <div v-else key="content" class="hero-content text-center">
                        
                        <!-- BADGE -->
                        <div class="hero-tag slide-up delay-100">
                            <span class="tag-dot"></span>
                            <span class="tag-text">Software Development Company</span>
                        </div>

                        <!-- TITLE -->
                        <h1 class="hero-title slide-up delay-200">
                            <span class="title-highlight">Professional</span> Software<br />
                            Developer yang Anda Cari.
                        </h1>
                        
                        <!-- DESCRIPTION -->
                        <p class="hero-description slide-up delay-300">
                            {{ landingStore.content?.hero_desc || 'Mcflyon hadir untuk membantu anda membuat aplikasi dan website sesuai dengan yang anda butuhkan' }}
                        </p>
                        
                        <!-- CTA BUTTONS -->
                        <div class="hero-cta d-flex flex-wrap justify-content-center gap-4 slide-up delay-400">
                            <a href="#services" class="btn-hero btn-hero-primary">
                                <span>Our Services</span>
                                <i class="bi bi-arrow-right"></i>
                            </a>
                            <a href="#contact" class="btn-hero btn-hero-ghost">
                                <i class="bi bi-phone"></i>
                                <span>Contact Us</span>
                            </a>
                        </div>

                        <!-- STATS / SOCIAL PROOF -->
                        <div class="hero-stats slide-up delay-500">
                            <div class="stat-item">
                                <div class="stat-number">50+</div>
                                <div class="stat-label">Projects Done</div>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">
                                <div class="stat-number">98%</div>
                                <div class="stat-label">Client Satisfaction</div>
                            </div>
                            <div class="stat-divider"></div>
                            <div class="stat-item">
                                <div class="stat-number">24/7</div>
                                <div class="stat-label">Support</div>
                            </div>
                        </div>

                    </div>
                </transition>
            </div>
        </main>

        <!-- FOOTER (Dynamic from CMS) -->
        <Footer />
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed } from "vue";
import { useLandingStore } from "@/stores/landing";
import Footer from '@/components/landing/footer.vue';
import Projects from '@/components/landing/Projects.vue';

const landingStore = useLandingStore();

// State
const isScrolled = ref(false);
const navVisible = ref(true);
const activeDropdown = ref<number | null>(null);
const mobileMenuOpen = ref(false);
const mobileActiveDropdown = ref<number | null>(null);
let dropdownTimer: ReturnType<typeof setTimeout> | null = null;
let lastScroll = 0;


// Computed - Pisahkan menu berdasarkan tipe dan device
const desktopMenus = computed(() => {
    if (!landingStore.menus || !Array.isArray(landingStore.menus)) return [];
    
    // Filter menu yang aktif, show_on_desktop, parent_id null, dan bukan button
    return landingStore.menus.filter(menu => 
        menu.is_active && 
        menu.parent_id === null &&
        menu.show_on_desktop !== false &&
        menu.type !== 'button-primary' && 
        menu.type !== 'button-outline'
    ).sort((a, b) => a.urutan - b.urutan);
});

const desktopButtons = computed(() => {
    if (!landingStore.menus || !Array.isArray(landingStore.menus)) return [];
    
    // Filter menu yang aktif, show_on_desktop, button, dan BUKAN Sign Up
    const filtered = landingStore.menus.filter(menu => {
        if (!menu.is_active || 
            menu.parent_id !== null ||
            menu.show_on_desktop === false ||
            (menu.type !== 'button-primary' && menu.type !== 'button-outline')) {
            return false;
        }
        
        // Multiple ways to detect Sign Up menu
        const label = (menu.label || '').toLowerCase().trim();
        const url = (menu.url || '').toLowerCase();
        
        // Exclude if contains any sign up variation
        const isSignUp = 
            label.includes('sign up') ||
            label.includes('sign-up') ||
            label.includes('signup') ||
            label === 'sign up' ||
            url.includes('/sign-up') ||
            url.includes('/signup') ||
            url.includes('signup') ||
            url.includes('sign-up') ||
            url.includes('/register') ||
            url.includes('/registration');
        
        return !isSignUp;
    });
    
    return filtered.sort((a, b) => a.urutan - b.urutan);
});

const mobileMenus = computed(() => {
    if (!landingStore.menus || !Array.isArray(landingStore.menus)) return [];
    
    // Filter menu yang aktif, parent_id null, show_on_mobile, dan BUKAN Sign Up
    const filtered = landingStore.menus.filter(menu => {
        if (!menu.is_active || menu.parent_id !== null || menu.show_on_mobile === false) {
            return false;
        }
        
        // Multiple ways to detect Sign Up menu
        const label = (menu.label || '').toLowerCase().trim();
        const mobileLabel = (menu.mobile_label || '').toLowerCase().trim();
        const url = (menu.url || '').toLowerCase();
        
        // Exclude if contains any sign up variation
        const isSignUp = 
            label.includes('sign up') ||
            label.includes('sign-up') ||
            label.includes('signup') ||
            label === 'sign up' ||
            mobileLabel.includes('sign up') ||
            mobileLabel.includes('sign-up') ||
            mobileLabel.includes('signup') ||
            url.includes('/sign-up') ||
            url.includes('/signup') ||
            url.includes('signup') ||
            url.includes('sign-up') ||
            url.includes('/register') ||
            url.includes('/registration');
        
        // Debug: log menu yang di-filter
        if (isSignUp) {
            console.log('🚫 Filtered out Sign Up menu:', { label: menu.label, url: menu.url });
        }
        
        return !isSignUp;
    });
    
    return filtered.sort((a, b) => a.urutan - b.urutan);
});

// Handlers
const showDropdown = (menuId: number) => {
    if (dropdownTimer) clearTimeout(dropdownTimer);
    activeDropdown.value = menuId;
};

const hideDropdown = (menuId: number) => {
    dropdownTimer = setTimeout(() => {
        if (activeDropdown.value === menuId) {
            activeDropdown.value = null;
        }
    }, 200);
};

const toggleDropdown = (menuId: number) => {
    activeDropdown.value = activeDropdown.value === menuId ? null : menuId;
};

const toggleMobileMenu = () => {
    console.log('🍔 Hamburger clicked! Current state:', mobileMenuOpen.value);
    mobileMenuOpen.value = !mobileMenuOpen.value;
    
    // Lock body scroll
    if (mobileMenuOpen.value) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
    
    console.log('🍔 New state:', mobileMenuOpen.value);
    console.log('📱 Mobile menus count:', mobileMenus.value.length);
};

const closeMobileMenu = () => {
    console.log('❌ Closing mobile menu');
    mobileMenuOpen.value = false;
    mobileActiveDropdown.value = null;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
};

const toggleMobileDropdown = (menuId: number) => {
    mobileActiveDropdown.value = mobileActiveDropdown.value === menuId ? null : menuId;
};

const handleMobileMenuClick = (menuId: number) => {
    trackMenuClick(menuId);
    closeMobileMenu();
};

const trackMenuClick = async (menuId: number) => {
    try {
        await landingStore.trackMenuClick(menuId);
    } catch (error) {
        console.error('Analytics tracking failed:', error);
    }
};

const handleScroll = () => {
    const currentScroll = window.scrollY;
    isScrolled.value = currentScroll > 50;
    
    if (currentScroll > lastScroll && currentScroll > 200) {
        navVisible.value = false;
    } else {
        navVisible.value = true;
    }
    
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
};

const getImageUrl = (path: string | null) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

const getRelAttribute = (menu: any) => {
    if (menu.rel_attribute) return menu.rel_attribute;
    if (menu.target === '_blank') return 'noopener noreferrer';
    return undefined;
};

const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-dropdown')) {
        activeDropdown.value = null;
    }
};

onMounted(async () => {
    console.log('🚀 Navbar component mounted');
    
    // Fetch menu dan content parallel
    await Promise.all([
        landingStore.fetchMenu(window.innerWidth < 992 ? 'mobile' : 'desktop'),
        landingStore.fetchContent()
    ]);
    
    // Debug: Log all menus
    console.log('📋 All menus from backend:', landingStore.menus);
    
    console.log('✅ Navbar initialized:', {
        desktopMenus: desktopMenus.value.length,
        desktopButtons: desktopButtons.value.length,
        mobileMenus: mobileMenus.value.length,
        allMenus: landingStore.menus?.length || 0
    });
    
    // Debug: Log mobile menus specifically
    console.log('📱 Mobile menus:', mobileMenus.value.map(m => ({ label: m.label, url: m.url, type: m.type })));
    
    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("click", handleClickOutside);
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    if (dropdownTimer) clearTimeout(dropdownTimer);
});
</script>

<style scoped>
/* ========================================
   COLORS - MCFLYON STYLE
   ======================================== */
:root {
    --navy-darkest: #0A0E27;
    --navy-darker: #0F1629;
    --navy-dark: #141B2D;
    --navy-medium: #1A2332;
    --navy-light: #1E293B;
    
    --blue-primary: #6366F1;
    --blue-light: #818CF8;
    --blue-lighter: #A5B4FC;
    
    --purple-primary: #8B5CF6;
    --purple-light: #A78BFA;
    
    --yellow-accent: #FCD34D;
    
    --gray-100: #F8FAFC;
    --gray-200: #E2E8F0;
    --gray-300: #CBD5E1;
    --gray-400: #94A3B8;
    --gray-500: #64748B;
    --gray-600: #475569;
}

/* ========================================
   BASE LAYOUT
   ======================================== */
.landing-wrapper {
    background: linear-gradient(180deg, var(--navy-darkest) 0%, var(--navy-dark) 50%, var(--navy-medium) 100%);
    color: white;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    position: relative;
}

/* ========================================
   NAVBAR - FIXED HORIZONTAL LAYOUT
   ======================================== */
.navbar-mcflyon {
    background: rgba(10, 14, 39, 0.85);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid rgba(99, 102, 241, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    animation: navSlideDown 0.6s ease-out;
    padding: 0;
}

@keyframes navSlideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.navbar-mcflyon.navbar-scrolled {
    background: rgba(10, 14, 39, 0.98);
    backdrop-filter: blur(32px) saturate(200%);
    -webkit-backdrop-filter: blur(32px) saturate(200%);
    border-bottom-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(99, 102, 241, 0.1);
}

.navbar-mcflyon.navbar-hidden {
    transform: translateY(-100%);
}

/* Grid Layout untuk 3 kolom */
.navbar-container {
    height: 80px;
    padding: 0 20px;
    display: grid;
    grid-template-columns: minmax(200px, auto) 1fr minmax(200px, auto);
    align-items: center;
    gap: 32px;
}

/* Logo Section */
.brand-logo-wrapper {
    text-decoration: none;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-self: start;
}

.brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    transition: transform 0.3s ease;
}

.brand-logo:hover {
    transform: scale(1.05);
}

.animate-logo {
    animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
}

.logo-image {
    height: 40px;
    width: auto;
    object-fit: contain;
}

.logo-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
}

.brand-text {
    display: flex;
    flex-direction: column;
}

.brand-name {
    font-size: 22px;
    font-weight: 700;
    color: white;
    letter-spacing: -0.5px;
    line-height: 1;
}

/* Navigation Links - TENGAH */
.navbar-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    justify-self: center;
}

.nav-item-wrapper {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
}

.nav-dropdown {
    position: relative;
    display: inline-block;
}

.nav-link-main {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    color: var(--gray-200);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    white-space: nowrap;
}

.nav-link-main:hover {
    color: white;
    background: rgba(99, 102, 241, 0.1);
}

.nav-link-main .link-text {
    position: relative;
}

.nav-link-main .link-underline {
    position: absolute;
    bottom: 6px;
    left: 18px;
    right: 18px;
    height: 2px;
    background: linear-gradient(90deg, var(--blue-primary), var(--purple-primary));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link-main:hover .link-underline {
    transform: scaleX(1);
}

.link-arrow {
    font-size: 12px;
    transition: transform 0.3s ease;
}

.link-arrow.arrow-up {
    transform: rotate(180deg);
}

.link-badge {
    padding: 3px 8px;
    font-size: 10px;
    font-weight: 700;
    border-radius: 6px;
    text-transform: uppercase;
}

.link-badge.bg-primary { background: var(--blue-primary); color: white; }
.link-badge.bg-success { background: #10B981; color: white; }
.link-badge.bg-warning { background: var(--yellow-accent); color: var(--navy-darkest); }
.link-badge.bg-danger { background: #EF4444; color: white; }
.link-badge.bg-info { background: #3B82F6; color: white; }

/* Dropdown Content */
.dropdown-content {
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 280px;
    background: rgba(10, 14, 39, 0.98);
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(99, 102, 241, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
    z-index: 1001;
}

.dropdown-inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.dropdown-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    color: var(--gray-300);
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.dropdown-link:hover {
    background: rgba(99, 102, 241, 0.15);
    color: white;
    transform: translateX(4px);
}

.dropdown-link-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(99, 102, 241, 0.15);
    border-radius: 8px;
    flex-shrink: 0;
}

.dropdown-link-icon .icon {
    font-size: 18px;
    color: var(--blue-light);
}

.dropdown-link:hover .dropdown-link-icon {
    background: var(--blue-primary);
}

.dropdown-link:hover .dropdown-link-icon .icon {
    color: white;
}

.dropdown-link-text {
    flex: 1;
}

.link-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
}

.link-subtitle {
    font-size: 12px;
    color: var(--gray-500);
}

.link-tag {
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 700;
    border-radius: 6px;
    flex-shrink: 0;
}

.link-tag.bg-primary { background: var(--blue-primary); color: white; }
.link-tag.bg-success { background: #10B981; color: white; }
.link-tag.bg-warning { background: var(--yellow-accent); color: var(--navy-darkest); }
.link-tag.bg-danger { background: #EF4444; color: white; }

/* CTA Buttons - KANAN */
.navbar-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    justify-self: end;
}

.btn-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 24px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    white-space: nowrap;
}

.btn-cta::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn-cta:hover::before {
    width: 300px;
    height: 300px;
}

.btn-cta-primary {
    background: linear-gradient(135deg, var(--blue-primary) 0%, var(--purple-primary) 100%);
    color: white;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.btn-cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(99, 102, 241, 0.5);
}

.btn-cta-outline {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.25);
}

.btn-cta-outline:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
}

/* Hamburger Menu */
.hamburger-menu {
    width: 32px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 15000;
    justify-self: end;
    position: relative;
}

.hamburger-menu .line {
    width: 100%;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.hamburger-menu.is-active .line:nth-child(1) {
    transform: translateY(10.5px) rotate(45deg);
}

.hamburger-menu.is-active .line:nth-child(2) {
    opacity: 0;
}

.hamburger-menu.is-active .line:nth-child(3) {
    transform: translateY(-10.5px) rotate(-45deg);
}

/* Mobile Menu Overlay - COMPLETE REWRITE */
.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 14, 39, 0.98);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 10000;
    overflow-y: auto;
    padding-top: 80px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu-overlay.mobile-menu-visible {
    opacity: 1;
    visibility: visible;
}

/* Force display on smaller screens */
@media (max-width: 991px) {
    .mobile-menu-overlay {
        display: block !important;
    }
}

@media (min-width: 992px) {
    .mobile-menu-overlay {
        display: none !important;
    }
}

.mobile-menu-content {
    padding: 24px;
    min-height: calc(100vh - 80px);
    width: 100%;
}

.mobile-navigation {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.mobile-nav-item {
    width: 100%;
}

.mobile-nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: transparent;
    border: none;
    color: var(--gray-200);
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    transition: all 0.2s ease;
    width: 100%;
    text-align: left;
    cursor: pointer;
}

.mobile-nav-link:hover,
.mobile-nav-link:active {
    background: rgba(99, 102, 241, 0.1);
    color: white;
}

.mobile-link-text {
    flex: 1;
}

.mobile-link-icon {
    font-size: 16px;
    transition: transform 0.3s ease;
}

.mobile-submenu {
    padding-left: 20px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.mobile-submenu-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: var(--gray-400);
    text-decoration: none;
    font-size: 15px;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.mobile-submenu-link:hover,
.mobile-submenu-link:active {
    background: rgba(99, 102, 241, 0.05);
    color: white;
    padding-left: 24px;
}

.mobile-btn-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 24px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 10px;
    text-decoration: none;
    margin-top: 12px;
    transition: all 0.2s ease;
}

.mobile-btn-cta.btn-primary {
    background: linear-gradient(135deg, var(--blue-primary), var(--purple-primary));
    color: white;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.mobile-btn-cta.btn-outline {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.mobile-menu-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
}

/* ========================================
   HERO SECTION
   ======================================== */
.hero-wrapper {
    padding: 140px 0 100px;
    position: relative;
    display: flex;
    align-items: center;
}

.particles-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
}

.particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    opacity: 0.3;
    animation: particleFloat 20s infinite;
}

.particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
.particle-2 { top: 40%; right: 20%; animation-delay: 4s; }
.particle-3 { top: 60%; left: 30%; animation-delay: 8s; }
.particle-4 { top: 80%; right: 40%; animation-delay: 12s; }
.particle-5 { top: 30%; left: 70%; animation-delay: 16s; }

@keyframes particleFloat {
    0%, 100% { transform: translate(0, 0); opacity: 0.3; }
    50% { transform: translate(50px, -50px); opacity: 0.8; }
}

.gradient-orbs {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.25;
    animation: orbFloat 25s infinite ease-in-out;
}

.orb-1 {
    width: 600px;
    height: 600px;
    background: var(--blue-primary);
    top: -10%;
    left: -10%;
}

.orb-2 {
    width: 500px;
    height: 500px;
    background: var(--purple-primary);
    bottom: -10%;
    right: -10%;
    animation-delay: -12s;
}

.orb-3 {
    width: 400px;
    height: 400px;
    background: var(--yellow-accent);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -6s;
}

@keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(60px, -60px) scale(1.1); }
    66% { transform: translate(-40px, 40px) scale(0.9); }
}

.hero-content {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    padding: 0 20px;
}

.hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
    color: var(--blue-lighter);
    margin-bottom: 32px;
}

.tag-dot {
    width: 6px;
    height: 6px;
    background: var(--blue-primary);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1.5px;
    margin-bottom: 24px;
    color: white;
}

.title-highlight {
    background: linear-gradient(135deg, var(--yellow-accent) 0%, #FDE047 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-description {
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--gray-300);
    margin-bottom: 48px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

.hero-cta {
    margin-bottom: 64px;
}

.btn-hero {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.btn-hero-primary {
    background: linear-gradient(135deg, var(--blue-primary), var(--purple-primary));
    color: white;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.btn-hero-primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.btn-hero-ghost {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.btn-hero-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
}

.hero-stats {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 48px;
    flex-wrap: wrap;
    padding-bottom: 40px;
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--blue-light), var(--purple-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
}

.stat-label {
    font-size: 14px;
    color: var(--gray-400);
}

.stat-divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
}

/* Footer */
.footer-section {
    padding: 32px 0;
    border-top: 1px solid rgba(99, 102, 241, 0.1);
    background: rgba(10, 14, 39, 0.5);
    position: relative;
    z-index: 10;
    margin-top: auto;
}

.footer-inner {
    padding: 0 20px;
}

.footer-copy,
.footer-link {
    color: var(--gray-400);
    font-size: 14px;
}

.footer-link {
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-link:hover {
    color: white;
}

/* Loading */
.custom-spinner {
    position: relative;
    width: 60px;
    height: 60px;
    margin: 0 auto;
}

.spinner-circle,
.spinner-circle-inner {
    position: absolute;
    border-radius: 50%;
    border: 3px solid transparent;
}

.spinner-circle {
    width: 100%;
    height: 100%;
    border-top-color: var(--blue-primary);
    border-right-color: var(--purple-primary);
    animation: spin 1.5s linear infinite;
}

.spinner-circle-inner {
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    border-top-color: var(--yellow-accent);
    border-right-color: var(--blue-lighter);
    animation: spin 1s linear infinite reverse;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-text {
    color: var(--gray-400);
    font-size: 14px;
}

/* Animations */
.slide-up {
    opacity: 0;
    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }

/* Transitions */
.dropdown-appear-enter-active,
.dropdown-appear-leave-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-appear-enter-from,
.dropdown-appear-leave-to {
    opacity: 0;
    transform: translateY(-12px) translateX(-50%);
}

.mobile-collapse-enter-active,
.mobile-collapse-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
}

.mobile-collapse-enter-from,
.mobile-collapse-leave-to {
    opacity: 0;
    max-height: 0;
}

.mobile-collapse-enter-to,
.mobile-collapse-leave-from {
    opacity: 1;
    max-height: 500px;
}

.hero-fade-enter-active,
.hero-fade-leave-active {
    transition: all 0.4s ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 991px) {
    .navbar-container {
        height: 70px;
        padding: 0 16px;
        /* Kembali ke flexbox di mobile */
        display: flex;
        justify-content: space-between;
    }
    
    .hero-wrapper {
        padding: 120px 0 80px;
        min-height: auto;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-description {
        font-size: 1.1rem;
    }
    
    .hero-stats {
        gap: 32px;
        padding-bottom: 20px;
    }
    
    .stat-number {
        font-size: 2rem;
    }
}

@media (max-width: 576px) {
    .brand-name {
        font-size: 18px;
    }
    
    .hero-tag {
        font-size: 12px;
        padding: 6px 16px;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .btn-hero {
        padding: 14px 28px;
        font-size: 15px;
    }
    
    .navbar-container {
        padding: 0 12px;
    }
}

/* Fix untuk Safari backdrop-filter */
@supports (-webkit-backdrop-filter: blur(24px)) {
    .navbar-mcflyon {
        -webkit-backdrop-filter: blur(24px) saturate(180%);
    }
    
    .navbar-mcflyon.navbar-scrolled {
        -webkit-backdrop-filter: blur(32px) saturate(200%);
    }

    .dropdown-content {
        -webkit-backdrop-filter: blur(32px) saturate(180%);
    }

    .mobile-menu-overlay {
        -webkit-backdrop-filter: blur(24px);
    }
}
</style>