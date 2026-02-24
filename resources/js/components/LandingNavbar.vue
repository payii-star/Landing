<template>
    <div class="navbar-wrapper">
        <!-- Scroll Progress Bar -->
        <div
            class="scroll-progress"
            :style="{ width: scrollProgress + '%' }"
        ></div>

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
                :style="{
                    left: spotlightX + 'px',
                    top: spotlightY + 'px',
                    opacity: spotlightVisible ? 1 : 0,
                }"
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
                        <template
                            v-for="(menu, idx) in desktopLinks"
                            :key="menu.id"
                        >
                            <!-- Dropdown Menu -->
                            <div
                                v-if="
                                    menu.has_dropdown && menu.children?.length
                                "
                                class="nav-item"
                                @mouseenter="openDropdown(menu.id)"
                                @mouseleave="scheduleClose"
                            >
                                <button
                                    class="nav-link"
                                    :class="{
                                        'is-open': activeDropdown === menu.id,
                                    }"
                                    :style="{
                                        animationDelay: `${idx * 70 + 100}ms`,
                                    }"
                                    :aria-expanded="activeDropdown === menu.id"
                                >
                                    <i
                                        v-if="menu.icon_class"
                                        :class="menu.icon_class"
                                        class="nav-icon"
                                    ></i>
                                    <span>{{ menu.label }}</span>
                                    <span
                                        v-if="menu.badge_text"
                                        class="inline-badge"
                                        :class="`ib-${
                                            menu.badge_color || 'primary'
                                        }`"
                                        >{{ menu.badge_text }}</span
                                    >
                                    <svg
                                        class="nav-chevron"
                                        :class="{
                                            rotated: activeDropdown === menu.id,
                                        }"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 3.5L5 6.5L8 3.5"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
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
                                                v-for="(
                                                    child, ci
                                                ) in menu.children"
                                                :key="child.id"
                                                :href="child.url"
                                                :target="
                                                    child.target || '_self'
                                                "
                                                :rel="
                                                    child.target === '_blank'
                                                        ? 'noopener noreferrer'
                                                        : undefined
                                                "
                                                class="drop-item"
                                                :style="{
                                                    animationDelay: `${
                                                        ci * 45
                                                    }ms`,
                                                }"
                                                @click="trackClick(child.id)"
                                                role="menuitem"
                                            >
                                                <span class="drop-icon">
                                                    <i
                                                        :class="
                                                            child.icon_class ||
                                                            'bi bi-arrow-right-short'
                                                        "
                                                    ></i>
                                                </span>
                                                <span class="drop-body">
                                                    <span class="drop-label">{{
                                                        child.label
                                                    }}</span>
                                                    <span
                                                        v-if="child.description"
                                                        class="drop-desc"
                                                        >{{
                                                            child.description
                                                        }}</span
                                                    >
                                                </span>
                                                <span
                                                    v-if="child.badge_text"
                                                    class="drop-badge"
                                                    :class="`db-${
                                                        child.badge_color ||
                                                        'primary'
                                                    }`"
                                                    >{{
                                                        child.badge_text
                                                    }}</span
                                                >
                                                <span class="drop-item-arrow">
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M2.5 6h7M6.5 3L9.5 6l-3 3"
                                                            stroke="currentColor"
                                                            stroke-width="1.3"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
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
                                :style="{
                                    animationDelay: `${idx * 70 + 100}ms`,
                                }"
                                @click="trackClick(menu.id)"
                            >
                                <i
                                    v-if="menu.icon_class"
                                    :class="menu.icon_class"
                                    class="nav-icon"
                                ></i>
                                <span>{{ menu.label }}</span>
                                <span
                                    v-if="menu.badge_text"
                                    class="inline-badge"
                                    :class="`ib-${
                                        menu.badge_color || 'primary'
                                    }`"
                                    >{{ menu.badge_text }}</span
                                >
                            </a>
                        </template>
                    </nav>

                    <!-- Actions Area -->
                    <div class="nav-actions d-flex align-items-center gap-3">
                        <!-- Ghost / Outline Buttons -->
                        <a
                            v-for="menu in desktopGhost"
                            :key="'g-' + menu.id"
                            :href="menu.url"
                            :target="menu.target || '_self'"
                            class="d-none d-lg-inline-flex action-ghost"
                            @click="trackClick(menu.id)"
                        >
                            <i
                                v-if="menu.icon_class"
                                :class="menu.icon_class"
                            ></i>
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
                                <i
                                    v-if="menu.icon_class"
                                    :class="menu.icon_class"
                                ></i>
                                {{ menu.label }}
                            </span>
                        </a>

                        <!-- Theme Toggle -->
                        <button
                            class="theme-toggle"
                            :class="{ 'is-light': isLight }"
                            @click="toggleTheme"
                            :aria-label="
                                isLight
                                    ? 'Switch to dark mode'
                                    : 'Switch to light mode'
                            "
                            type="button"
                        >
                            <span class="theme-track">
                                <span class="theme-thumb">
                                    <!-- Sun icon -->
                                    <svg
                                        v-if="isLight"
                                        class="theme-icon"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="4"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        />
                                        <path
                                            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                    <!-- Moon icon -->
                                    <svg
                                        v-else
                                        class="theme-icon"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </span>
                            </span>
                        </button>

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
                <div class="drawer-panel" ref="drawerRef" :style="drawerStyle">
                    <div class="drawer-noise"></div>

                    <!-- Drag handle — touch/mouse to drag down and close -->
                    <div
                        class="drawer-handle"
                        @touchstart.passive="onDragStart"
                        @touchmove.passive="onDragMove"
                        @touchend="onDragEnd"
                        @mousedown="onDragStart"
                        @mousemove="onDragMove"
                        @mouseup="onDragEnd"
                        @mouseleave="onDragEnd"
                    >
                        <span class="drawer-pill"></span>
                    </div>

                    <!-- Drawer Header -->
                    <div class="drawer-header">
                        <router-link
                            to="/"
                            class="brand"
                            @click="closeMobileMenu"
                        >
                            <div class="brand-logo-wrap brand-logo-wrap-sm">
                                <span class="brand-glow-ring"></span>
                                <span class="brand-float">
                                    <img
                                        v-if="logoUrl"
                                        :src="logoUrl"
                                        alt="Logo"
                                        class="brand-img"
                                        style="height: 36px"
                                    />
                                    <img
                                        v-else
                                        src="/media/logos/logo-custom.png"
                                        alt="Logo"
                                        class="brand-img"
                                        style="height: 36px"
                                    />
                                </span>
                            </div>
                        </router-link>
                        <button
                            class="drawer-close"
                            type="button"
                            @click="closeMobileMenu"
                            aria-label="Close menu"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <path
                                    d="M2 2l14 14M16 2L2 16"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- Drawer Nav -->
                    <nav class="drawer-nav">
                        <template
                            v-for="(menu, idx) in mobileLinks"
                            :key="'m-' + menu.id"
                        >
                            <!-- Dropdown group -->
                            <div
                                v-if="
                                    menu.has_dropdown && menu.children?.length
                                "
                                class="drawer-group"
                                :style="{
                                    animationDelay: `${idx * 75 + 120}ms`,
                                }"
                            >
                                <button
                                    class="drawer-link"
                                    type="button"
                                    @click="toggleMobileDropdown(menu.id)"
                                    :class="{
                                        'is-open':
                                            mobileActiveDropdown === menu.id,
                                    }"
                                    :style="{
                                        animationDelay: `${idx * 75 + 120}ms`,
                                    }"
                                >
                                    <span class="dtl">
                                        <span class="dicon-wrap">
                                            <i
                                                v-if="menu.icon_class"
                                                :class="menu.icon_class"
                                                class="dicon"
                                            ></i>
                                            <i
                                                v-else
                                                class="bi bi-grid dicon"
                                            ></i>
                                        </span>
                                        {{ menu.mobile_label || menu.label }}
                                        <span
                                            v-if="menu.badge_text"
                                            class="inline-badge ms-1"
                                            :class="`ib-${
                                                menu.badge_color || 'primary'
                                            }`"
                                            >{{ menu.badge_text }}</span
                                        >
                                    </span>
                                    <svg
                                        class="dchev"
                                        :class="{
                                            rotated:
                                                mobileActiveDropdown ===
                                                menu.id,
                                        }"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M3 5l4 4 4-4"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </button>

                                <Transition name="slide-down">
                                    <div
                                        v-show="
                                            mobileActiveDropdown === menu.id
                                        "
                                        class="drawer-children"
                                    >
                                        <a
                                            v-for="child in menu.children"
                                            :key="child.id"
                                            :href="child.url"
                                            :target="child.target || '_self'"
                                            class="drawer-child"
                                            @click="handleMobileClick(child.id)"
                                        >
                                            <span class="child-dot-wrap">
                                                <i
                                                    :class="
                                                        child.icon_class ||
                                                        'bi bi-arrow-right-short'
                                                    "
                                                    class="child-dot"
                                                ></i>
                                            </span>
                                            <span>{{ child.label }}</span>
                                            <span
                                                v-if="child.badge_text"
                                                class="inline-badge ms-auto"
                                                :class="`ib-${
                                                    child.badge_color ||
                                                    'primary'
                                                }`"
                                                >{{ child.badge_text }}</span
                                            >
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
                                :style="{
                                    animationDelay: `${idx * 75 + 120}ms`,
                                }"
                                @click="handleMobileClick(menu.id)"
                            >
                                <span class="dtl">
                                    <span class="dicon-wrap">
                                        <i
                                            v-if="menu.icon_class"
                                            :class="menu.icon_class"
                                            class="dicon"
                                        ></i>
                                        <i
                                            v-else
                                            class="bi bi-link-45deg dicon"
                                        ></i>
                                    </span>
                                    {{ menu.mobile_label || menu.label }}
                                </span>
                                <span
                                    v-if="menu.badge_text"
                                    class="inline-badge"
                                    :class="`ib-${
                                        menu.badge_color || 'primary'
                                    }`"
                                    >{{ menu.badge_text }}</span
                                >
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
                            :class="
                                menu.type === 'button-primary'
                                    ? 'dcta-primary'
                                    : 'dcta-ghost'
                            "
                            @click="handleMobileClick(menu.id)"
                        >
                            <span
                                v-if="menu.type === 'button-primary'"
                                class="dcta-shimmer"
                            ></span>
                            <span
                                v-if="menu.type === 'button-primary'"
                                class="dcta-glow"
                            ></span>
                            <i
                                v-if="menu.icon_class"
                                :class="menu.icon_class"
                            ></i>
                            <span>{{ menu.mobile_label || menu.label }}</span>
                            <svg
                                v-if="menu.type === 'button-primary'"
                                class="ms-auto"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <path
                                    d="M2 7h10M8 3l4 4-4 4"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                />
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

// === THEME TOGGLE ===
const isLight = ref(false);
const toggleTheme = () => {
    isLight.value = !isLight.value;
    document.documentElement.classList.toggle("theme-light", isLight.value);
    localStorage.setItem("theme", isLight.value ? "light" : "dark");
};

// === DRAWER DRAG ===
const drawerRef = ref<HTMLElement | null>(null);
const dragY = ref(0);
const isDragging = ref(false);
let dragStartY = 0;
let dragStartTime = 0;

const onDragStart = (e: TouchEvent | MouseEvent) => {
    isDragging.value = true;
    dragStartY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStartTime = Date.now();
    dragY.value = 0;
};
const onDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging.value) return;
    const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = currentY - dragStartY;
    // Only allow dragging down
    dragY.value = delta > 0 ? delta : Math.max(delta * 0.15, -30);
};
const onDragEnd = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
    const elapsed = Date.now() - dragStartTime;
    const velocity = dragY.value / elapsed;
    // Close if dragged down > 80px or fast flick
    if (dragY.value > 80 || velocity > 0.5) {
        closeMobileMenu();
    }
    dragY.value = 0;
};

const drawerStyle = computed(() => ({
    transform: dragY.value !== 0 ? `translateY(${dragY.value}px)` : undefined,
    transition: isDragging.value ? "none" : undefined,
}));

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
const isRoot = (m: any) =>
    !m.parent_id || m.parent_id === null || m.parent_id === 0;

const desktopLinks = computed(() =>
    (landingStore.menus ?? [])
        .filter(
            (m) =>
                m.is_active &&
                isRoot(m) &&
                m.show_on_desktop !== false &&
                m.type === "link"
        )
        .sort((a, b) => a.urutan - b.urutan)
);
const desktopPrimary = computed(() =>
    (landingStore.menus ?? [])
        .filter(
            (m) =>
                m.is_active &&
                isRoot(m) &&
                m.show_on_desktop !== false &&
                m.type === "button-primary"
        )
        .sort((a, b) => a.urutan - b.urutan)
);
const desktopGhost = computed(() =>
    (landingStore.menus ?? [])
        .filter(
            (m) =>
                m.is_active &&
                isRoot(m) &&
                m.show_on_desktop !== false &&
                m.type === "button-outline"
        )
        .sort((a, b) => a.urutan - b.urutan)
);
const mobileLinks = computed(() =>
    (landingStore.menus ?? [])
        .filter(
            (m) =>
                m.is_active &&
                isRoot(m) &&
                m.show_on_mobile !== false &&
                m.type === "link"
        )
        .sort((a, b) => a.urutan - b.urutan)
);
const mobileButtons = computed(() =>
    (landingStore.menus ?? [])
        .filter(
            (m) =>
                m.is_active &&
                isRoot(m) &&
                m.show_on_mobile !== false &&
                (m.type === "button-primary" || m.type === "button-outline")
        )
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
    try {
        await landingStore.trackMenuClick(id);
    } catch {}
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
    if (!(e.target as HTMLElement).closest(".nav-item"))
        activeDropdown.value = null;
};

onMounted(async () => {
    await landingStore.fetchMenu(
        window.innerWidth < 992 ? "mobile" : "desktop"
    );
    await landingStore.fetchContent();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClickOut);
    // Init theme
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
        isLight.value = true;
        document.documentElement.classList.add("theme-light");
    }
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
    transition: background 0.5s ease, box-shadow 0.5s ease,
        transform 0.4s var(--ease-spring), backdrop-filter 0.5s ease;
}
.navbar-root.is-scrolled {
    background: var(--glass);
    backdrop-filter: blur(28px) saturate(160%) brightness(0.9);
    -webkit-backdrop-filter: blur(28px) saturate(160%) brightness(0.9);
    box-shadow: 0 1px 0 var(--border-strong), 0 8px 40px rgba(5, 12, 36, 0.55),
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
    background: radial-gradient(
        ellipse,
        rgba(59, 130, 246, 0.09) 0%,
        transparent 70%
    );
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
    background: linear-gradient(
        90deg,
        transparent 0%,
        var(--p) 30%,
        var(--p2) 60%,
        var(--p3) 80%,
        transparent 100%
    );
    background-size: 300% 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
    animation: borderFlow 6s linear infinite;
}
.is-scrolled .navbar-glow-border {
    opacity: 0.6;
}
@keyframes borderFlow {
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: -100% 0;
    }
}

.navbar-inner {
    height: var(--nav-h);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

/* Nav-actions: absolute kanan, geser ke kiri dengan right value */
.nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    position: absolute;
    right: 40px;
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
    left: 40px;
    animation: slideInLeft 0.7s var(--ease-spring) both;
}
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-16px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
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
    background: radial-gradient(
        circle,
        rgba(59, 130, 246, 0.18) 0%,
        transparent 70%
    );
    animation: glowPulse 4s ease-in-out infinite;
    pointer-events: none;
}
@keyframes glowPulse {
    0%,
    100% {
        opacity: 0.4;
        transform: scale(1);
    }
    50% {
        opacity: 0.85;
        transform: scale(1.12);
    }
}

/* Float wrapper */
.brand-float {
    position: relative;
    z-index: 1;
    display: flex;
    animation: logoFloat 5s ease-in-out infinite;
}
@keyframes logoFloat {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-4px);
    }
    100% {
        transform: translateY(0px);
    }
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
    transition: color 0.25s ease, background 0.25s ease;
}
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
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
.nav-link::after {
    display: none;
}

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
    0% {
        transform: scale(0);
        opacity: 1;
    }
    60% {
        transform: scale(1);
        opacity: 0.5;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
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
.nav-chevron.rotated {
    transform: rotate(180deg);
    opacity: 0.9;
}

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
.ib-primary {
    background: var(--p-dim);
    color: #818cf8;
}
.ib-success {
    background: rgba(16, 185, 129, 0.15);
    color: #34d399;
}
.ib-warning {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
}
.ib-danger {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
}
.ib-info {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
}

/* ════════════════════════════════════════
   DROPDOWN PANEL
════════════════════════════════════════ */
.drop-panel {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 260px;
    background: rgba(8, 10, 28, 0.97);
    border: 1px solid var(--border-strong);
    border-radius: 18px;
    padding: 6px;
    box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(99, 102, 241, 0.1),
        0 0 40px -5px rgba(99, 102, 241, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    z-index: 100;
    overflow: hidden;
}
.drop-glow {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 80px;
    background: radial-gradient(
        ellipse,
        rgba(99, 102, 241, 0.2) 0%,
        transparent 70%
    );
    pointer-events: none;
}
.drop-arrow {
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -5px;
    width: 10px;
    height: 10px;
    background: rgba(10, 12, 32, 0.98);
    border-top: 1px solid var(--border-strong);
    border-left: 1px solid var(--border-strong);
    transform: rotate(45deg);
    z-index: 1;
}
.drop-items {
    position: relative;
    z-index: 2;
}
.drop-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    text-decoration: none;
    color: var(--muted);
    font-size: 0.875rem;
    position: relative;
    opacity: 0;
    animation: dropIn 0.35s var(--ease-spring) both;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
@keyframes dropIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.drop-item:hover {
    background: transparent;
    color: var(--text);
    transform: translateX(4px);
}
.drop-item:active {
    transform: translateX(5px) scale(0.98);
    transition: transform 0.08s ease;
}
.drop-item-arrow {
    color: var(--p);
    opacity: 0;
    transform: translateX(-5px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    margin-left: auto;
    flex-shrink: 0;
}
.drop-item:hover .drop-item-arrow {
    opacity: 1;
    transform: translateX(0);
}

.drop-icon {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 9px;
    font-size: 1rem;
    color: var(--p);
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
        transform 0.25s var(--ease-spring);
}
.drop-item:hover .drop-icon {
    background: var(--p);
    color: #fff;
    border-color: transparent;
    transform: scale(1.08) rotate(-5deg);
}
.drop-body {
    flex: 1;
    min-width: 0;
}
.drop-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.3;
}
.drop-desc {
    display: block;
    font-size: 0.72rem;
    color: var(--muted2);
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.drop-badge {
    padding: 2px 7px;
    font-size: 0.6rem;
    font-weight: 700;
    border-radius: 20px;
    text-transform: uppercase;
    flex-shrink: 0;
}
.db-primary {
    background: var(--p-dim);
    color: #818cf8;
}
.db-success {
    background: rgba(16, 185, 129, 0.15);
    color: #34d399;
}
.db-warning {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
}
.db-danger {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
}

/* Dropdown transition */
.drop-enter-active {
    transition: opacity 0.2s ease, transform 0.25s var(--ease-spring);
}
.drop-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.drop-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px) scale(0.95);
}
.drop-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-6px) scale(0.97);
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
    transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease,
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
   CTA BUTTON — Liquid Fill Outline
════════════════════════════════════════ */
.cta-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 10px 28px;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #93c5fd;
    text-decoration: none;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    border: 1.5px solid rgba(59, 130, 246, 0.5);
    background: transparent;
    animation: fadeInDown 0.7s var(--ease-smooth) 0.5s both;
    transition: color 0.35s ease, border-color 0.35s ease, transform 0.2s ease;
}
.cta-btn:hover {
    color: #fff;
    border-color: #3b82f6;
    transform: translateY(-1px);
}
.cta-btn:active {
    transform: translateY(1px);
    transition: transform 0.08s ease;
}

/* Liquid fill — rises from bottom on hover */
.cta-fill {
    position: absolute;
    inset: 0;
    border-radius: 50px;
    background: #1d4ed8;
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
    z-index: 0;
}
.cta-btn:hover .cta-fill {
    transform: translateY(0);
}
.cta-btn:active .cta-fill {
    background: #1e40af;
}

/* Text sits above fill */
.cta-text {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* ════════════════════════════════════════
   THEME TOGGLE
════════════════════════════════════════ */
.theme-toggle {
    position: relative;
    width: 52px;
    height: 28px;
    border-radius: 50px;
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    transition: border-color 0.35s ease, background 0.35s ease;
    animation: fadeInDown 0.7s var(--ease-smooth) 0.55s both;
}
.theme-toggle:hover {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.1);
}
.theme-toggle.is-light {
    border-color: rgba(250, 204, 21, 0.5);
    background: rgba(250, 204, 21, 0.12);
}
.theme-toggle.is-light:hover {
    border-color: rgba(250, 204, 21, 0.75);
    background: rgba(250, 204, 21, 0.2);
}

.theme-track {
    position: absolute;
    inset: 2px;
    border-radius: 50px;
    display: flex;
    align-items: center;
}
.theme-thumb {
    position: absolute;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
        background 0.35s ease, color 0.35s ease, border-color 0.35s ease;
}
.is-light .theme-thumb {
    transform: translateX(24px);
    background: rgba(250, 204, 21, 0.25);
    border-color: rgba(250, 204, 21, 0.4);
    color: #f59e0b;
}
.theme-icon {
    display: block;
    flex-shrink: 0;
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
    transition: transform 0.35s var(--ease-spring), opacity 0.25s ease,
        width 0.25s ease;
}
.hamburger:hover .ham-bar {
    background: var(--text);
}
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
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(3px);
    z-index: 940;
}
.overlay-fade-enter-active {
    transition: opacity 0.3s ease;
}
.overlay-fade-leave-active {
    transition: opacity 0.22s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
    opacity: 0;
}

/* ════════════════════════════════════════
   MOBILE DRAWER — Slide from BOTTOM
════════════════════════════════════════ */
.mobile-drawer {
    position: fixed;
    inset: 0;
    z-index: 950;
    pointer-events: none;
}
.drawer-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 88vh;
    background: #0d0d14;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px 20px 0 0;
    display: flex;
    flex-direction: column;
    pointer-events: all;
    overflow: hidden;
    box-shadow: 0 -12px 60px rgba(0, 0, 0, 0.6);
    will-change: transform;
}

/* Drag handle area */
.drawer-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 0 6px;
    cursor: grab;
    flex-shrink: 0;
    user-select: none;
    -webkit-user-select: none;
}
.drawer-handle:active {
    cursor: grabbing;
}
.drawer-pill {
    width: 40px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.18);
    transition: background 0.2s ease, width 0.2s ease;
}
.drawer-handle:hover .drawer-pill {
    background: rgba(255, 255, 255, 0.32);
    width: 52px;
}

.drawer-noise {
    position: absolute;
    inset: 0;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    background-size: 128px;
    pointer-events: none;
}
.drawer-glow {
    display: none;
}

/* Header */
.drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    gap: 12px;
}

/* Override absolute brand positioning inside drawer */
.drawer-header .brand {
    position: static !important;
    left: auto !important;
    margin: 0 0 0 16px !important;
    animation: none !important;
    flex-shrink: 0;
}
.drawer-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    color: var(--muted);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s, color 0.2s, transform 0.25s;
}
.drawer-close:hover {
    background: rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.25);
    color: #f87171;
    transform: rotate(90deg);
}

/* Nav list */
.drawer-nav {
    flex: 1;
    overflow-y: auto;
    padding: 6px 0;
    scrollbar-width: none;
    position: relative;
    z-index: 1;
}
.drawer-nav::-webkit-scrollbar {
    display: none;
}

/* Menu items */
.drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px 24px;
    color: #9aa5c0;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    background: none;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    cursor: pointer;
    text-align: left;
    opacity: 0;
    letter-spacing: 0.01em;
    animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
    transition: color 0.18s ease, background 0.18s ease,
        padding-left 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
        filter: blur(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}
.drawer-link:hover,
.drawer-link.is-open {
    color: #fff;
    background: rgba(255, 255, 255, 0.03);
    padding-left: 30px;
}
.drawer-link:active {
    background: rgba(255, 255, 255, 0.06);
}
.drawer-link.is-active {
    color: #fff;
    font-weight: 600;
    padding-left: 26px;
    border-left: 3px solid var(--p3);
    background: rgba(59, 130, 246, 0.05);
}

.dtl {
    display: flex;
    align-items: center;
    gap: 10px;
}
.dicon-wrap {
    display: none;
}
.dicon {
    font-size: 0.85rem;
    color: var(--p);
}
.dchev {
    color: rgba(255, 255, 255, 0.25);
    transition: transform 0.3s var(--ease-spring);
    flex-shrink: 0;
}
.dchev.rotated {
    transform: rotate(180deg);
    color: var(--p3);
}

/* Children */
.drawer-children {
    background: rgba(0, 0, 0, 0.18);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    overflow: hidden;
}
.drawer-child {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px 12px 36px;
    color: #6b7a9a;
    font-size: 0.9rem;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    transition: color 0.18s ease, padding-left 0.18s ease;
}
.drawer-child:last-child {
    border-bottom: none;
}
.drawer-child:hover {
    color: #fff;
    padding-left: 42px;
}
.drawer-child:active {
    background: rgba(255, 255, 255, 0.04);
}
.child-dot-wrap {
    display: none;
}
.child-dot {
    font-size: 0.95rem;
    color: var(--p);
    transition: transform 0.2s ease;
}
.drawer-child:hover .child-dot {
    transform: translateX(3px);
}

/* Slide down */
.slide-down-enter-active {
    transition: all 0.28s var(--ease-spring);
}
.slide-down-leave-active {
    transition: all 0.18s ease;
}
.slide-down-enter-from {
    opacity: 0;
    transform: translateY(-8px);
}
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

/* Footer CTA */
.drawer-footer {
    padding: 16px 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.drawer-cta {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 15px 20px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    overflow: hidden;
    width: 100%;
    text-align: center;
    transition: transform 0.18s ease, opacity 0.18s ease;
    letter-spacing: 0.01em;
}
.drawer-cta:active {
    transform: scale(0.97);
    transition: transform 0.08s ease;
}

/* Primary = white solid */
.dcta-primary {
    background: #ffffff;
    color: #0a0a0f;
    border: none;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.35);
}
.dcta-primary:hover {
    background: #eef2ff;
}

/* Ghost = outline */
.dcta-ghost {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: var(--text);
}
.dcta-ghost:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.24);
}

.brand-logo-wrap-sm {
    width: 40px;
    height: 40px;
}
.dcta-shimmer {
    display: none;
}
.dcta-glow {
    display: none;
}

/* Drawer transition — slides from BOTTOM */
.drawer-enter-active {
    transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}
.drawer-enter-from .drawer-panel {
    transform: translateY(100%);
}
.drawer-leave-to .drawer-panel {
    transform: translateY(100%);
}
.drawer-enter-from,
.drawer-leave-to {
    pointer-events: none;
}
</style>
