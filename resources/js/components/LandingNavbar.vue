<template>
    <div class="navbar-wrapper">
        <!-- Scroll Progress Bar -->
        <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

        <header
            class="navbar-root"
            :class="{
                'is-scrolled': isScrolled,
                'is-hidden': isHidden,
                'is-top': !isScrolled,
            }"
            ref="navbarRef"
            @mousemove="onNavMouseMove"
            @mouseleave="onNavMouseLeave"
        >
            <!-- Animated glow spotlight following cursor -->
            <div
                class="navbar-spotlight"
                :style="{ left: spotlightX + 'px', top: spotlightY + 'px', opacity: spotlightVisible ? 1 : 0 }"
            ></div>

            <div class="navbar-glow-border"></div>
            <div class="navbar-noise"></div>

            <div class="container-xxl">
                <div class="navbar-inner">
                    <!-- Brand / Logo -->
                    <router-link to="/" class="brand" @click="closeMobileMenu">
                        <div class="brand-logo-wrap">
                            <span class="brand-glow-ring"></span>
                            <span class="brand-float">
                                <img
                                    v-if="logoUrl"
                                    :src="logoUrl"
                                    alt="Logo"
                                    class="brand-img"
                                />
                                <img
                                    v-else
                                    src="/media/logos/logo-custom.png"
                                    alt="Logo"
                                    class="brand-img"
                                />
                            </span>
                        </div>
                    </router-link>

                    <!-- Desktop Navigation -->
                    <nav class="desktop-nav d-none d-lg-flex" role="navigation">
                        <template v-for="(menu, idx) in desktopLinks" :key="menu.id">
                            <!-- Dropdown Menu -->
                            <div
                                v-if="menu.has_dropdown && menu.children?.length"
                                class="nav-item"
                                @mouseenter="openDropdown(menu.id)"
                                @mouseleave="scheduleClose"
                            >
                                <button
                                    class="nav-link"
                                    :class="{ 'is-open': activeDropdown === menu.id }"
                                    :style="{ animationDelay: `${idx * 70 + 100}ms` }"
                                    :aria-expanded="activeDropdown === menu.id"
                                >
                                    <i v-if="menu.icon_class" :class="menu.icon_class" class="nav-icon"></i>
                                    <span>{{ menu.label }}</span>
                                    <span
                                        v-if="menu.badge_text"
                                        class="inline-badge"
                                        :class="`ib-${menu.badge_color || 'primary'}`"
                                    >{{ menu.badge_text }}</span>
                                    <svg class="nav-chevron" :class="{ rotated: activeDropdown === menu.id }" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>

                                <Transition name="drop">
                                    <div
                                        v-if="activeDropdown === menu.id"
                                        class="drop-panel"
                                        @mouseenter="keepOpen(menu.id)"
                                        @mouseleave="scheduleClose"
                                        role="menu"
                                    >
                                        <div class="drop-glow"></div>
                                        <div class="drop-arrow"></div>
                                        <div class="drop-items">
                                            <a
                                                v-for="(child, ci) in menu.children"
                                                :key="child.id"
                                                :href="child.url"
                                                :target="child.target || '_self'"
                                                :rel="child.target === '_blank' ? 'noopener noreferrer' : undefined"
                                                class="drop-item"
                                                :style="{ animationDelay: `${ci * 45}ms` }"
                                                @click="trackClick(child.id)"
                                                role="menuitem"
                                            >
                                                <span class="drop-icon">
                                                    <i :class="child.icon_class || 'bi bi-arrow-right-short'"></i>
                                                </span>
                                                <span class="drop-body">
                                                    <span class="drop-label">{{ child.label }}</span>
                                                    <span v-if="child.description" class="drop-desc">{{ child.description }}</span>
                                                </span>
                                                <span
                                                    v-if="child.badge_text"
                                                    class="drop-badge"
                                                    :class="`db-${child.badge_color || 'primary'}`"
                                                >{{ child.badge_text }}</span>
                                                <span class="drop-item-arrow">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M2.5 6h7M6.5 3L9.5 6l-3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </Transition>
                            </div>

                            <!-- Regular Link -->
                            <a
                                v-else
                                :href="menu.url"
                                :target="menu.target || '_self'"
                                class="nav-link"
                                :class="{ 'is-active': isActive(menu.url) }"
                                :style="{ animationDelay: `${idx * 70 + 100}ms` }"
                                @click="trackClick(menu.id)"
                            >
                                <i v-if="menu.icon_class" :class="menu.icon_class" class="nav-icon"></i>
                                <span>{{ menu.label }}</span>
                                <span
                                    v-if="menu.badge_text"
                                    class="inline-badge"
                                    :class="`ib-${menu.badge_color || 'primary'}`"
                                >{{ menu.badge_text }}</span>
                            </a>
                        </template>
                    </nav>

                    <!-- Actions Area -->
                            <div class="nav-actions">
                        <!-- Ghost / Outline Buttons -->
                        <a
                            v-for="menu in desktopGhost"
                            :key="'g-' + menu.id"
                            :href="menu.url"
                            :target="menu.target || '_self'"
                            class="d-none d-lg-inline-flex action-ghost"
                            @click="trackClick(menu.id)"
                        >
                            <i v-if="menu.icon_class" :class="menu.icon_class"></i>
                            <span>{{ menu.label }}</span>
                        </a>

                        <!-- Primary CTA Button -->
                        <a
                            v-for="menu in desktopPrimary"
                            :key="'p-' + menu.id"
                            :href="menu.url"
                            :target="menu.target || '_self'"
                            class="d-none d-lg-inline-flex cta-btn"
                            @click="trackClick(menu.id)"
                        >
                            <span class="cta-fill"></span>
                            <span class="cta-text">
                                <i v-if="menu.icon_class" :class="menu.icon_class"></i>
                                {{ menu.label }}
                            </span>
                        </a>

                        <!-- Hamburger — shown on non-desktop -->
                        <button
                            class="hamburger nav-hamburger"
                            :class="{ 'is-open': mobileMenuOpen }"
                            type="button"
                            @click.stop="toggleMobile"
                            aria-label="Toggle Menu"
                        >
                            <span class="ham-bar"></span>
                            <span class="ham-bar"></span>
                            <span class="ham-bar"></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Mobile Overlay -->
        <Transition name="overlay-fade">
            <div
                v-if="mobileMenuOpen"
                class="mobile-overlay"
                @click="closeMobileMenu"
            ></div>
        </Transition>

        <!-- Mobile Drawer -->
        <Transition name="drawer">
            <div v-if="mobileMenuOpen" class="mobile-drawer">
                <div class="drawer-panel">
                    <div class="drawer-noise"></div>
                    <div class="drawer-glow"></div>

                    <!-- Drawer Header -->
                    <div class="drawer-header">
                        <router-link to="/" class="brand" @click="closeMobileMenu">
                            <div class="brand-logo-wrap brand-logo-wrap-sm">
                                <span class="brand-glow-ring"></span>
                                <span class="brand-float">
                                    <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="brand-img" style="height:36px" />
                                    <img v-else src="/media/logos/logo-custom.png" alt="Logo" class="brand-img" style="height:36px" />
                                </span>
                            </div>
                        </router-link>
                        <button class="drawer-close" type="button" @click="closeMobileMenu" aria-label="Close menu">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Drawer Nav -->
                    <nav class="drawer-nav">
                        <template v-for="(menu, idx) in mobileLinks" :key="'m-' + menu.id">
                            <!-- Dropdown group -->
                            <div
                                v-if="menu.has_dropdown && menu.children?.length"
                                class="drawer-group"
                                :style="{ animationDelay: `${idx * 60}ms` }"
                            >
                                <button
                                    class="drawer-link"
                                    type="button"
                                    @click="toggleMobileDropdown(menu.id)"
                                    :class="{ 'is-open': mobileActiveDropdown === menu.id }"
                                >
                                    <span class="dtl">
                                        <span class="dicon-wrap">
                                            <i v-if="menu.icon_class" :class="menu.icon_class" class="dicon"></i>
                                            <i v-else class="bi bi-grid dicon"></i>
                                        </span>
                                        {{ menu.mobile_label || menu.label }}
                                        <span
                                            v-if="menu.badge_text"
                                            class="inline-badge ms-1"
                                            :class="`ib-${menu.badge_color || 'primary'}`"
                                        >{{ menu.badge_text }}</span>
                                    </span>
                                    <svg class="dchev" :class="{ rotated: mobileActiveDropdown === menu.id }" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                </button>

                                <Transition name="slide-down">
                                    <div v-show="mobileActiveDropdown === menu.id" class="drawer-children">
                                        <a
                                            v-for="child in menu.children"
                                            :key="child.id"
                                            :href="child.url"
                                            :target="child.target || '_self'"
                                            class="drawer-child"
                                            @click="handleMobileClick(child.id)"
                                        >
                                            <span class="child-dot-wrap">
                                                <i :class="child.icon_class || 'bi bi-arrow-right-short'" class="child-dot"></i>
                                            </span>
                                            <span>{{ child.label }}</span>
                                            <span
                                                v-if="child.badge_text"
                                                class="inline-badge ms-auto"
                                                :class="`ib-${child.badge_color || 'primary'}`"
                                            >{{ child.badge_text }}</span>
                                        </a>
                                    </div>
                                </Transition>
                            </div>

                            <!-- Regular link -->
                            <a
                                v-else
                                :href="menu.url"
                                :target="menu.target || '_self'"
                                class="drawer-link"
                                :class="{ 'is-active': isActive(menu.url) }"
                                :style="{ animationDelay: `${idx * 60}ms` }"
                                @click="handleMobileClick(menu.id)"
                            >
                                <span class="dtl">
                                    <span class="dicon-wrap">
                                        <i v-if="menu.icon_class" :class="menu.icon_class" class="dicon"></i>
                                        <i v-else class="bi bi-link-45deg dicon"></i>
                                    </span>
                                    {{ menu.mobile_label || menu.label }}
                                </span>
                                <span v-if="menu.badge_text" class="inline-badge" :class="`ib-${menu.badge_color || 'primary'}`">{{ menu.badge_text }}</span>
                            </a>
                        </template>
                    </nav>

                    <!-- Drawer Footer Buttons -->
                    <div class="drawer-footer" v-if="mobileButtons.length">
                        <a
                            v-for="menu in mobileButtons"
                            :key="'mc-' + menu.id"
                            :href="menu.url"
                            :target="menu.target || '_self'"
                            class="drawer-cta"
                            :class="menu.type === 'button-primary' ? 'dcta-primary' : 'dcta-ghost'"
                            @click="handleMobileClick(menu.id)"
                        >
                            <span v-if="menu.type === 'button-primary'" class="dcta-shimmer"></span>
                            <span v-if="menu.type === 'button-primary'" class="dcta-glow"></span>
                            <i v-if="menu.icon_class" :class="menu.icon_class"></i>
                            <span>{{ menu.mobile_label || menu.label }}</span>
                            <svg v-if="menu.type === 'button-primary'" class="ms-auto" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useLandingStore } from "@/stores/landing";

const landingStore = useLandingStore();
const route = useRoute();
const navbarRef = ref<HTMLElement | null>(null);

const isScrolled = ref(false);
const isHidden = ref(false);
const activeDropdown = ref<number | null>(null);
const mobileMenuOpen = ref(false);
const mobileActiveDropdown = ref<number | null>(null);
const scrollProgress = ref(0);
const spotlightX = ref(0);
const spotlightY = ref(0);
const spotlightVisible = ref(false);

let closeTimer: ReturnType<typeof setTimeout> | null = null;
let lastY = 0;

// === LOGO URL ===
const backendUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace("/api", "")
    : "http://127.0.0.1:8000";

const logoUrl = computed(() => {
    const path = landingStore.content?.landing_logo;
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${backendUrl}${path}`;
});

// === COMPUTED MENUS ===
// isRoot: handle parent_id bisa null, undefined, atau 0 dari backend
const isRoot = (m: any) => !m.parent_id || m.parent_id === null || m.parent_id === 0;

const desktopLinks = computed(() =>
    (landingStore.menus ?? [])
        .filter(m => m.is_active && isRoot(m) && m.show_on_desktop !== false && m.type === "link")
        .sort((a, b) => a.urutan - b.urutan)
);
const desktopPrimary = computed(() =>
    (landingStore.menus ?? [])
        .filter(m => m.is_active && isRoot(m) && m.show_on_desktop !== false && m.type === "button-primary")
        .sort((a, b) => a.urutan - b.urutan)
);
const desktopGhost = computed(() =>
    (landingStore.menus ?? [])
        .filter(m => m.is_active && isRoot(m) && m.show_on_desktop !== false && m.type === "button-outline")
        .sort((a, b) => a.urutan - b.urutan)
);
const mobileLinks = computed(() =>
    (landingStore.menus ?? [])
        .filter(m => m.is_active && isRoot(m) && m.show_on_mobile !== false && m.type === "link")
        .sort((a, b) => a.urutan - b.urutan)
);
const mobileButtons = computed(() =>
    (landingStore.menus ?? [])
        .filter(m => m.is_active && isRoot(m) && m.show_on_mobile !== false && (m.type === "button-primary" || m.type === "button-outline"))
        .sort((a, b) => a.urutan - b.urutan)
);

// === DROPDOWN ===
const openDropdown = (id: number) => {
    if (closeTimer) clearTimeout(closeTimer);
    activeDropdown.value = id;
};
const keepOpen = (id: number) => {
    if (closeTimer) clearTimeout(closeTimer);
    activeDropdown.value = id;
};
const scheduleClose = () => {
    closeTimer = setTimeout(() => {
        activeDropdown.value = null;
    }, 180);
};
const toggleMobileDropdown = (id: number) => {
    mobileActiveDropdown.value = mobileActiveDropdown.value === id ? null : id;
};

// === MOBILE ===
const toggleMobile = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    document.body.style.overflow = mobileMenuOpen.value ? "hidden" : "";
};
const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
    mobileActiveDropdown.value = null;
    document.body.style.overflow = "";
};
const handleMobileClick = (id: number) => {
    trackClick(id);
    closeMobileMenu();
};

// === HELPERS ===
const isActive = (url: string) => {
    if (!url || url === "#") return false;
    return route.path === url || route.path.startsWith(url + "/");
};
const trackClick = async (id: number) => {
    try { await landingStore.trackMenuClick(id); } catch {}
};

// === SPOTLIGHT EFFECT ===
const onNavMouseMove = (e: MouseEvent) => {
    if (!navbarRef.value) return;
    const rect = navbarRef.value.getBoundingClientRect();
    spotlightX.value = e.clientX - rect.left;
    spotlightY.value = e.clientY - rect.top;
    spotlightVisible.value = true;
};
const onNavMouseLeave = () => {
    spotlightVisible.value = false;
};

// === SCROLL ===
const onScroll = () => {
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = docH > 0 ? Math.round((y / docH) * 100) : 0;
    isScrolled.value = y > 20;
    isHidden.value = y > lastY + 10 && y > 130;
    if (y < lastY - 5) isHidden.value = false;
    lastY = y <= 0 ? 0 : y;
};

const onClickOut = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".nav-item")) activeDropdown.value = null;
};

onMounted(async () => {
    await landingStore.fetchMenu(window.innerWidth < 992 ? "mobile" : "desktop");
    await landingStore.fetchContent();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClickOut);
});

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("click", onClickOut);
    document.body.style.overflow = "";
    if (closeTimer) clearTimeout(closeTimer);
});
</script>

<style scoped>
/* ════════════════════════════════════════
   DESIGN TOKENS — on wrapper so drawer inherits too
════════════════════════════════════════ */
.navbar-wrapper {
    --p: #3b82f6;
    --p2: #1d4ed8;
    --p3: #60a5fa;
    --p-dim: rgba(59, 130, 246, 0.12);
    --p-glow: rgba(59, 130, 246, 0.4);
    --p-ring: rgba(59, 130, 246, 0.25);
    --glass: rgba(2, 6, 23, 0.88);
    --glass-s: rgba(2, 6, 23, 0.99);
    --border: rgba(255, 255, 255, 0.06);
    --border-strong: rgba(59, 130, 246, 0.14);
    --text: #e2eaff;
    --muted: #5c6e96;
    --muted2: #2e3d5e;
    --nav-h: 72px;
    --radius: 12px;
    --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ════════════════════════════════════════
   SCROLL PROGRESS BAR
════════════════════════════════════════ */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--p), var(--p2), var(--p3));
    z-index: 1100;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px var(--p-glow), 0 0 20px var(--p-glow);
}

/* ════════════════════════════════════════
   NAVBAR SHELL
════════════════════════════════════════ */
.navbar-root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 900;
    padding: 0;
    transition:
        background 0.5s ease,
        box-shadow 0.5s ease,
        transform 0.4s var(--ease-spring),
        backdrop-filter 0.5s ease;
}
.navbar-root.is-scrolled {
    background: var(--glass);
    backdrop-filter: blur(28px) saturate(160%) brightness(0.9);
    -webkit-backdrop-filter: blur(28px) saturate(160%) brightness(0.9);
    box-shadow:
        0 1px 0 var(--border-strong),
        0 8px 40px rgba(5, 12, 36, 0.55),
        0 0 60px rgba(29, 78, 216, 0.06);
}
.navbar-root.is-hidden {
    transform: translateY(-100%);
}

/* Noise texture for premium feel */
.navbar-noise {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 128px;
    pointer-events: none;
}

/* Spotlight effect */
.navbar-spotlight {
    position: absolute;
    width: 360px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(59, 130, 246, 0.09) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: opacity 0.4s ease;
    filter: blur(8px);
}

/* Glowing border at bottom */
.navbar-glow-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--p) 30%, var(--p2) 60%, var(--p3) 80%, transparent 100%);
    background-size: 300% 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
    animation: borderFlow 6s linear infinite;
}
.is-scrolled .navbar-glow-border {
    opacity: 0.6;
}
@keyframes borderFlow {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
}

.navbar-inner {
    height: var(--nav-h);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    position: absolute;
    right: 80px;
}
/* ════════════════════════════════════════
   BRAND
════════════════════════════════════════ */
.brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
    position: absolute;
    left: 80px;             
    animation: slideInLeft 0.7s var(--ease-spring) both;
}
@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
}

.brand-logo-wrap {
    position: relative;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Soft glow ring behind logo */
.brand-glow-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%);
    animation: glowPulse 4s ease-in-out infinite;
    pointer-events: none;
}
@keyframes glowPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.85; transform: scale(1.12); }
}

/* Float wrapper */
.brand-float {
    position: relative;
    z-index: 1;
    display: flex;
    animation: logoFloat 5s ease-in-out infinite;
}
@keyframes logoFloat {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-4px); }
    100% { transform: translateY(0px); }
}

.brand-img {
    height: 48px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 4px 14px rgba(59, 130, 246, 0.28));
    transition: filter 0.4s ease;
}

/* Hover — pause float, intensify glow */
.brand:hover .brand-float {
    animation-play-state: paused;
}
.brand:hover .brand-img {
    filter: drop-shadow(0 6px 22px rgba(59, 130, 246, 0.55))
            drop-shadow(0 0 8px rgba(96, 165, 250, 0.3));
}
.brand:hover .brand-glow-ring {
    opacity: 0.9;
    transform: scale(1.12);
}

/* ════════════════════════════════════════
   DESKTOP NAV
════════════════════════════════════════ */
.desktop-nav {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
    justify-content: center;
}
.nav-item {
    position: relative;
}

.nav-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 14px;
    color: var(--muted);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: var(--radius);
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.01em;
    opacity: 0;
    animation: fadeInDown 0.7s var(--ease-smooth) both;
    transition:
        color 0.25s ease,
        background 0.25s ease;
}
@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
}

/* ── Hover: text lift, NO background glow ── */
.nav-link::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--text);
    transform: scaleX(0) translateY(0);
    transform-origin: left;
    transition: transform 0.3s var(--ease-smooth);
    border-radius: 2px 2px 0 0;
}
.nav-link:hover::before,
.nav-link.is-open::before {
    transform: scaleX(1);
}

/* ── Underline slot (hidden — replaced by ::before) ── */
.nav-link::after { display: none; }

.nav-link:hover,
.nav-link.is-active,
.nav-link.is-open {
    color: var(--text);
}

/* Active: left tick marker */
.nav-link.is-active {
    color: var(--text);
    font-weight: 600;
}
.nav-link.is-active::before {
    transform: scaleX(1);
    background: var(--p3);
}

/* Press/click scale feedback */
.nav-link:active {
    transform: scaleX(0.94) scaleY(0.96);
    transition: transform 0.08s ease;
}

/* ════════════════════════════════════════
   RIPPLE WAVE — universal click effect
════════════════════════════════════════ */
.nav-link,
.action-ghost,
.cta-btn,
.drop-item,
.drawer-link,
.drawer-child,
.drawer-cta {
    position: relative;
    overflow: hidden;
}

.nav-link,
.action-ghost,
.cta-btn,
.drop-item,
.drawer-link,
.drawer-child,
.drawer-cta {
    position: relative;
    overflow: hidden;
}

/* ════════════════════════════════════════
   CLICK ANIMATIONS — no glow, pure motion
════════════════════════════════════════ */

/* Nav link: squeeze horizontal on click */
.nav-link:active {
    transform: scaleX(0.94) scaleY(0.96);
    transition: transform 0.08s ease;
}

/* CTA: press down + squish */
.cta-btn:active {
    transform: translateY(2px) scaleX(0.97);
    transition: transform 0.08s ease;
}
.cta-btn:active .cta-inner {
    letter-spacing: -0.01em;
    transition: letter-spacing 0.08s ease;
}

/* Ghost button: compress inward */
.action-ghost:active {
    transform: scale(0.95);
    transition: transform 0.08s ease;
}

/* Dropdown item: snap left then spring back */
.drop-item:active {
    transform: translateX(5px) scale(0.98);
    transition: transform 0.08s ease;
}

/* Drawer link: indent press */
.drawer-link:active {
    transform: translateX(4px) scaleY(0.97);
    transition: transform 0.08s ease;
}

/* Drawer child: subtle indent */
.drawer-child:active {
    transform: translateX(6px);
    transition: transform 0.08s ease;
}

/* Drawer CTA: press down */
.drawer-cta:active {
    transform: translateY(2px) scale(0.98);
    transition: transform 0.08s ease;
}

/* Hamburger click: full rotate snap */
.nav-hamburger:active {
    transform: rotate(90deg) scale(0.9);
    transition: transform 0.12s ease;
}

@keyframes rippleExpand {
    0%   { transform: scale(0); opacity: 1; }
    60%  { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1); opacity: 0; }
}

.nav-icon {
    font-size: 0.8em;
    opacity: 0.7;
}
.nav-chevron {
    opacity: 0.5;
    transition: transform 0.3s var(--ease-spring), opacity 0.3s ease;
    margin-left: 1px;
}
.nav-chevron.rotated { transform: rotate(180deg); opacity: 0.9; }

/* Inline badges */
.inline-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 7px;
    font-size: 0.6rem;
    font-weight: 700;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.6;
}
.ib-primary { background: var(--p-dim); color: #818cf8; }
.ib-success { background: rgba(16, 185, 129, 0.15); color: #34d399; }
.ib-warning { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
.ib-danger  { background: rgba(239, 68, 68, 0.15); color: #f87171; }
.ib-info    { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }

/* ════════════════════════════════════════
   DROPDOWN PANEL — Premium Redesign
════════════════════════════════════════ */
.drop-panel {
    position: absolute;
    top: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 280px;
    background: rgba(6, 8, 24, 0.96);
    border: 1px solid rgba(99, 102, 241, 0.18);
    border-radius: 20px;
    padding: 8px;
    box-shadow:
        0 24px 70px -10px rgba(0, 0, 0, 0.75),
        0 0 0 1px rgba(255, 255, 255, 0.04),
        0 0 60px -10px rgba(59, 130, 246, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    z-index: 100;
    overflow: hidden;
    backdrop-filter: blur(24px) saturate(150%);
    -webkit-backdrop-filter: blur(24px) saturate(150%);
}

/* Top ambient glow */
.drop-glow {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    height: 120px;
    background: radial-gradient(ellipse, rgba(99, 102, 241, 0.22) 0%, transparent 70%);
    pointer-events: none;
    animation: dropGlowPulse 3s ease-in-out infinite;
}
@keyframes dropGlowPulse {
    0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
    50%       { opacity: 1;   transform: translateX(-50%) scale(1.1); }
}

/* Arrow pointer */
.drop-arrow {
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -5px;
    width: 10px;
    height: 10px;
    background: rgba(8, 10, 28, 0.98);
    border-top: 1px solid rgba(99, 102, 241, 0.2);
    border-left: 1px solid rgba(99, 102, 241, 0.2);
    transform: rotate(45deg);
    z-index: 1;
}

.drop-items {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

/* ── Drop Item ── */
.drop-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 13px;
    border-radius: 14px;
    text-decoration: none;
    color: var(--muted);
    font-size: 0.875rem;
    position: relative;
    opacity: 0;
    animation: dropIn 0.45s var(--ease-spring) both;
    border: 1px solid transparent;
    transition:
        background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.3s ease,
        border-color 0.3s ease,
        transform 0.35s var(--ease-spring),
        box-shadow 0.3s ease;
}
@keyframes dropIn {
    0%   { opacity: 0; transform: translateY(12px) scale(0.95); filter: blur(3px); }
    60%  { opacity: 1; filter: blur(0); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

/* Hover state — clean, no background fill */
.drop-item:hover {
    background: rgba(255, 255, 255, 0.035);
    border-color: rgba(148, 163, 184, 0.1);
    color: var(--text);
    transform: translateX(6px);
    box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);
    /* Transisi masuk lebih cepat */
    transition:
        background 0.22s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.22s ease,
        border-color 0.22s ease,
        transform 0.3s var(--ease-spring),
        box-shadow 0.25s ease;
}
.drop-item:not(:hover) {
    transform: translateX(0);
    transition:
        background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        color 0.35s ease,
        border-color 0.35s ease,
        transform 0.4s var(--ease-spring),
        box-shadow 0.35s ease;
}
.drop-item:active {
    transform: translateX(5px) scale(0.98);
    transition: transform 0.1s ease;
}

/* Hover left accent line */
.drop-item::before {
    content: "";
    position: absolute;
    left: 0;
    top: 20%;
    height: 60%;
    width: 2px;
    background: linear-gradient(180deg, transparent, rgba(148, 163, 184, 0.5), transparent);
    border-radius: 0 2px 2px 0;
    opacity: 0;
    transform: scaleY(0.2);
    transition: opacity 0.4s ease, transform 0.5s var(--ease-spring);
}
.drop-item:hover::before {
    opacity: 1;
    transform: scaleY(1);
    transition: opacity 0.25s ease, transform 0.35s var(--ease-spring);
}
.drop-item:not(:hover)::before {
    opacity: 0;
    transform: scaleY(0.2);
    transition: opacity 0.3s ease, transform 0.35s ease;
}
.drop-item:hover::before {
    opacity: 1;
    transform: scaleY(1);
}

/* Arrow indicator */
.drop-item-arrow {
    color: rgba(148, 163, 184, 0.6);
    opacity: 0;
    transform: translateX(-10px);
    margin-left: auto;
    flex-shrink: 0;
    /* Keluar lebih lambat */
    transition: opacity 0.4s ease, transform 0.5s var(--ease-spring);
}
.drop-item:hover .drop-item-arrow {
    opacity: 1;
    transform: translateX(0);
    /* Masuk lebih cepat */
    transition: opacity 0.22s ease, transform 0.32s var(--ease-spring);
}

.drop-item:not(:hover) .drop-item-arrow {
    opacity: 0;
    transform: translateX(-10px);
    transition: opacity 0.3s ease, transform 0.35s ease;
}

/* ── Drop Icon ── */
.drop-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(59, 130, 246, 0.08);
    border: 1px solid rgba(59, 130, 246, 0.15);
    border-radius: 10px;
    font-size: 1rem;
    color: var(--p3);
    /* Keluar lebih lambat & spring */
    transition:
        background 0.45s ease,
        color 0.45s ease,
        border-color 0.45s ease,
        transform 0.5s var(--ease-spring),
        box-shadow 0.45s ease;
}
.drop-item:hover .drop-icon {
    background: rgba(255, 255, 255, 0.08);
    color: #e2eaff;
    border-color: rgba(255, 255, 255, 0.12);
    transform: scale(1.1) rotate(-6deg);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    /* Masuk lebih cepat */
    transition:
        background 0.25s ease,
        color 0.25s ease,
        border-color 0.25s ease,
        transform 0.35s var(--ease-spring),
        box-shadow 0.25s ease;
}
.drop-item:not(:hover) .drop-icon {
    transform: scale(1) rotate(0deg);
    transition:
        background 0.4s ease,
        color 0.4s ease,
        border-color 0.4s ease,
        transform 0.45s var(--ease-spring),
        box-shadow 0.4s ease;
}

/* ── Drop Body ── */
.drop-body { flex: 1; min-width: 0; }

.drop-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #c8d8ff;
    line-height: 1.3;
    transition: color 0.2s ease;
}
.drop-item:hover .drop-label {
    color: #fff;
}

.drop-desc {
    display: block;
    font-size: 0.72rem;
    color: var(--muted2);
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.3s ease;
}
.drop-item:hover .drop-desc {
    color: #475569;
}
.drop-item:not(:hover) .drop-desc {
    color: var(--muted2);
    transition: color 0.35s ease;
}

/* ── Drop Badge ── */
.drop-badge {
    padding: 2px 8px;
    font-size: 0.6rem;
    font-weight: 700;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    flex-shrink: 0;
}
.db-primary { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99,102,241,0.2); }
.db-success { background: rgba(16, 185, 129, 0.12); color: #34d399; border: 1px solid rgba(16,185,129,0.2); }
.db-warning { background: rgba(245, 158, 11, 0.12); color: #fbbf24; border: 1px solid rgba(245,158,11,0.2); }
.db-danger  { background: rgba(239, 68, 68, 0.12);  color: #f87171; border: 1px solid rgba(239,68,68,0.2); }

/* ── Dropdown Transition ── */
.drop-enter-active {
    transition: opacity 0.3s ease, transform 0.38s var(--ease-spring);
}
.drop-leave-active {
    transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1), transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
.drop-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-14px) scale(0.93);
}
.drop-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px) scale(0.96);
}
/* ════════════════════════════════════════
   ACTION BUTTONS (GHOST & CTA)
════════════════════════════════════════ */
.action-ghost {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 18px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    border: 1px solid var(--border);
    border-radius: 50px;
    background: transparent;
    cursor: pointer;
    transition:
        color 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease,
        transform 0.2s ease;
    animation: fadeInDown 0.6s var(--ease-spring) 0.4s both;
}
.action-ghost:hover {
    color: var(--text);
    border-color: rgba(255, 255, 255, 0.25);
    background: transparent;
    transform: translateY(-1px);
    letter-spacing: 0.03em;
}
.action-ghost:active {
    transform: translateY(0) scale(0.97);
    transition: transform 0.1s ease;
}

/* CTA Button — the showstopper */
/* ════════════════════════════════════════
   CTA BUTTON — Liquid Fill (Refined)
════════════════════════════════════════ */
.cta-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 10px 26px;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #93c5fd;
    text-decoration: none;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    border: 1.5px solid rgba(59, 130, 246, 0.45);
    background: rgba(59, 130, 246, 0.06);
    box-shadow:
        0 0 0 0 rgba(59, 130, 246, 0),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
    animation: fadeInDown 0.7s var(--ease-smooth) 0.5s both;
    transition:
        color 0.4s ease,
        border-color 0.4s ease,
        transform 0.3s var(--ease-spring),
        box-shadow 0.4s ease,
        background 0.4s ease;
}
.cta-btn:hover {
    color: #fff;
    border-color: rgba(99, 155, 255, 0.7);
    transform: translateY(-1px);
    box-shadow:
        0 6px 20px rgba(29, 78, 216, 0.35),
        0 0 0 1px rgba(99, 155, 255, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
.cta-btn:active {
    transform: translateY(1px) scale(0.97);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    box-shadow: 0 2px 8px rgba(29, 78, 216, 0.3);
}

/* Liquid fill — rises from bottom on hover (same as before, smoother) */
.cta-fill {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%);
    transform: translateY(101%);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    z-index: 0;
}
.cta-btn:hover .cta-fill {
    transform: translateY(0);
}
.cta-btn:active .cta-fill {
    background: linear-gradient(160deg, #1e3a8a 0%, #1e40af 100%);
}

/* Subtle shimmer overlay di atas fill */
.cta-fill::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        105deg,
        transparent 30%,
        rgba(255, 255, 255, 0.08) 50%,
        transparent 70%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    transition: background-position 0.6s ease;
}
.cta-btn:hover .cta-fill::after {
    background-position: -50% 0;
}

/* Text sits above fill */
.cta-text {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: text-shadow 0.4s ease;
}
.cta-btn:hover .cta-text {
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}   

/* ════════════════════════════════════════
   HAMBURGER
════════════════════════════════════════ */
/* Hide hamburger on desktop, show on mobile/tablet */
.nav-hamburger {
    display: none;
}
@media (max-width: 991.98px) {
    .nav-hamburger {
        display: flex;
    }
    /* Hide desktop nav on non-desktop */
    .desktop-nav {
        display: none !important;
    }
    /* Hide desktop-only buttons on non-desktop */
    .action-ghost,
    .cta-btn {
        display: none !important;
    }
}

.hamburger {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    gap: 5px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    cursor: pointer;
    padding: 0;
    transition: background 0.25s ease, border-color 0.25s ease;
}
.hamburger:hover {
    background: var(--p-dim);
    border-color: var(--p-ring);
}
.ham-bar {
    display: block;
    width: 18px;
    height: 1.5px;
    background: var(--muted);
    border-radius: 2px;
    transition:
        transform 0.35s var(--ease-spring),
        opacity 0.25s ease,
        width 0.25s ease;
}
.hamburger:hover .ham-bar { background: var(--text); }
.hamburger.is-open .ham-bar:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
}
.hamburger.is-open .ham-bar:nth-child(2) {
    opacity: 0;
    width: 0;
}
.hamburger.is-open .ham-bar:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
}

/* ════════════════════════════════════════
   MOBILE OVERLAY
════════════════════════════════════════ */
.mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 3, 12, 0.7);
    backdrop-filter: blur(4px);
    z-index: 940;
}
.overlay-fade-enter-active { transition: opacity 0.3s ease; }
.overlay-fade-leave-active { transition: opacity 0.25s ease; }
.overlay-fade-enter-from,
.overlay-fade-leave-to { opacity: 0; }

/* ════════════════════════════════════════
   MOBILE DRAWER
════════════════════════════════════════ */
.mobile-drawer {
    position: fixed;
    inset: 0;
    z-index: 950;
    pointer-events: none;
}
.drawer-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(360px, 90vw);
    background: rgba(6, 8, 22, 0.98);
    border-left: 1px solid var(--border-strong);
    display: flex;
    flex-direction: column;
    pointer-events: all;
    overflow: hidden;
    box-shadow: -20px 0 60px rgba(0, 0, 0, 0.6), -1px 0 0 rgba(99, 102, 241, 0.12);
}
.drawer-noise {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 128px;
    pointer-events: none;
}
.drawer-glow {
    position: absolute;
    top: -100px;
    right: -50px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
    pointer-events: none;
}
.drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
}
.drawer-close {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 9px;
    color: var(--muted);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
}
.drawer-close:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
    transform: rotate(90deg);
}

/* Drawer nav items */
.drawer-nav {
    flex: 1;
    overflow-y: auto;
    padding: 12px 12px;
    scrollbar-width: none;
    position: relative;
    z-index: 1;
}
.drawer-nav::-webkit-scrollbar { display: none; }

.drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 14px;
    margin-bottom: 2px;
    border-radius: 12px;
    color: var(--muted);
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    opacity: 0;
    animation: slideInRight 0.45s var(--ease-spring) both;
    transition: background 0.2s ease, color 0.2s ease;
}
@keyframes slideInRight {
    from { opacity: 0; transform: translateX(12px); }
    to { opacity: 1; transform: translateX(0); }
}
.drawer-link:hover,
.drawer-link.is-open {
    background: transparent;
    color: var(--text);
    padding-left: 20px;
    transition: padding-left 0.2s var(--ease-smooth), color 0.2s ease;
}
.drawer-link:active {
    transform: translateX(4px) scaleY(0.97);
    transition: transform 0.08s ease;
}
.drawer-link.is-active {
    color: var(--text);
    border-left: 2px solid var(--p3);
    padding-left: 20px;
    background: transparent;
}

.dtl {
    display: flex;
    align-items: center;
    gap: 10px;
}
.dicon-wrap {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 8px;
    flex-shrink: 0;
    transition: background 0.2s ease, border-color 0.2s ease;
}
.drawer-link:hover .dicon-wrap,
.drawer-link.is-active .dicon-wrap {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.15);
}
.dicon { font-size: 0.85rem; color: var(--p); }
.dchev {
    color: var(--muted2);
    transition: transform 0.3s var(--ease-spring);
    flex-shrink: 0;
}
.dchev.rotated { transform: rotate(180deg); color: var(--p); }

/* Drawer children */
.drawer-children {
    padding: 4px 0 4px 14px;
    margin: 2px 0;
    border-left: 1px solid var(--border);
    margin-left: 28px;
    overflow: hidden;
}
.drawer-child {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    border-radius: 9px;
    color: var(--muted);
    font-size: 0.85rem;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
    margin-bottom: 1px;
}
.drawer-child:hover {
    background: transparent;
    color: var(--text);
    padding-left: 18px;
    transition: padding-left 0.2s var(--ease-smooth), color 0.2s ease;
}
.drawer-child:active {
    transform: translateX(6px);
    transition: transform 0.08s ease;
}
.child-dot-wrap {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.child-dot {
    font-size: 0.95rem;
    color: var(--p);
    transition: transform 0.2s ease;
}
.drawer-child:hover .child-dot { transform: translateX(3px); }

/* Slide down transition for children */
.slide-down-enter-active {
    transition: all 0.3s var(--ease-spring);
}
.slide-down-leave-active {
    transition: all 0.2s ease;
}
.slide-down-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

/* Drawer Footer */
.drawer-footer {
    padding: 16px;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
}
.drawer-cta {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 18px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.drawer-cta:hover { transform: translateY(-1px); }
.drawer-cta:active {
    transform: scale(0.98) translateY(0);
    transition: transform 0.1s ease;
}
.dcta-ghost {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-strong);
    color: var(--text);
}
.dcta-ghost:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.2);
}
.dcta-primary {
    background: linear-gradient(135deg, #1e3a8a, #1d4ed8);
    color: #fff;
    box-shadow: 0 4px 18px rgba(29, 78, 216, 0.35);
}
.dcta-primary:hover {
    box-shadow: 0 8px 28px rgba(29, 78, 216, 0.5);
}
/* Smaller logo wrapper for mobile drawer */
.brand-logo-wrap-sm {
    width: 44px;
    height: 44px;
}

.dcta-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
    background-size: 200% 100%;
    animation: shimmerSlide 2.5s ease-in-out infinite;
}
.dcta-glow {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 20px;
    background: radial-gradient(ellipse, var(--p-glow) 0%, transparent 70%);
    filter: blur(8px);
}

/* Drawer transition — slides from right */
.drawer-enter-active { transition: transform 0.45s var(--ease-smooth); }
.drawer-leave-active { transition: transform 0.32s ease; }
.drawer-enter-from .drawer-panel { transform: translateX(100%); }
.drawer-leave-to .drawer-panel { transform: translateX(100%); }
.drawer-enter-from,
.drawer-leave-to { pointer-events: none; }
</style>