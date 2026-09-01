<template>
    <section
        class="services-section"
        v-if="landingStore.services.length > 0"
    >
        <div class="container-xxl">

            <!-- Header -->
            <div class="services-header">
                <div class="header-eyebrow">
                    <span class="eyebrow-line"></span>
                    <span class="eyebrow-text">LAYANAN KAMI</span>
                    <span class="eyebrow-line"></span>
                </div>

                <h2 class="section-title">
                    Layanan Unggulan Kami
                </h2>

                <p class="section-subtitle">
                    Berbagai layanan profesional untuk membantu bisnis
                    Anda tumbuh dan berkembang di era digital.
                </p>
            </div>

            <!-- Loading -->
            <div
                v-if="landingStore.servicesLoading"
                class="services-grid"
            >
                <div
                    v-for="n in 3"
                    :key="n"
                    class="service-card service-skeleton"
                >
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-title"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                </div>
            </div>

            <!-- Services -->
            <div
                v-else
                class="services-grid"
            >
                <div
                    v-for="(service, index) in landingStore.services"
                    :key="service.id"
                    class="service-card"
                    :style="{ '--delay': `${index * 80}ms` }"
                >
                    <!-- Icon -->
                    <div class="icon-wrapper">
                        <img
                            v-if="service.icon_url"
                            :src="service.icon_url"
                            :alt="service.title"
                            class="service-icon"
                            @error="service.icon_url = null"
                        />

                        <img
                            v-else-if="service.icon"
                            :src="getIconUrl(service.icon)"
                            :alt="service.title"
                            class="service-icon"
                            @error="handleImageError"
                        />

                        <!-- Fallback icon -->
                        <svg
                            v-else
                            class="service-icon fallback-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M12 3v18M3 12h18"
                            />
                        </svg>
                    </div>

                    <!-- Content -->
                    <div class="card-body">
                        <h3 class="service-title">
                            {{ service.title }}
                        </h3>

                        <p class="card-desc">
                            {{ service.description }}
                        </p>
                    </div>

                    <!-- Number -->
                    <div class="service-number">
                        {{ String(index + 1).padStart(2, '0') }}
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { useLandingStore } from "@/stores/landing";

const landingStore = useLandingStore();

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://192.168.112.210:8000/api";

function getIconUrl(icon: string): string {
    if (!icon) {
        return "";
    }

    if (
        icon.startsWith("http://") ||
        icon.startsWith("https://") ||
        icon.startsWith("data:")
    ) {
        return icon;
    }

    return `${API_URL.replace(/\/api\/?$/, "")}/storage/${icon}`;
}

function handleImageError(event: Event) {
    const target = event.target as HTMLImageElement | null;

    if (target) {
        target.style.display = "none";
    }
}
</script>

<style scoped>
.services-section {
    padding: 100px 24px 110px;
    background: transparent;
    position: relative;
    z-index: 10;
}

/* Header */
.services-header {
    text-align: center;
    margin-bottom: 64px;
    max-width: 620px;
    margin-left: auto;
    margin-right: auto;
}

.header-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 20px;
}

.eyebrow-line {
    height: 1px;
    width: 40px;
    background: rgba(255, 255, 255, 0.2);
}

.eyebrow-line:last-child {
    transform: scaleX(-1);
}

.eyebrow-text {
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: #94a3b8;
    text-transform: uppercase;
}

.section-title {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 800;
    color: #e2eaff;
    margin: 0 0 16px;
    letter-spacing: -0.03em;
    line-height: 1.15;
}

.section-subtitle {
    font-size: 1rem;
    color: #5c6e96;
    line-height: 1.7;
    margin: 0;
}

/* Grid */
.services-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 1120px;
    margin: 0 auto;
}

/* Card */
.service-card {
    position: relative;
    overflow: hidden;

    background: rgba(12, 18, 38, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;

    padding: 28px 32px 32px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    flex: 1 1 300px;
    max-width: 340px;

    animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: var(--delay, 0ms);

    transition:
        transform 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}

.service-card:hover {
    transform: translateY(-6px);
    border-color: rgba(59, 130, 246, 0.3);

    box-shadow:
        0 20px 45px rgba(0, 0, 0, 0.25),
        0 0 25px rgba(59, 130, 246, 0.08);
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Icon */
.icon-wrapper {
    width: 56px;
    height: 56px;

    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);

    border-radius: 14px;

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    color: #e2eaff;

    transition:
        background 0.3s ease,
        border-color 0.3s ease,
        transform 0.3s ease;
}

.service-card:hover .icon-wrapper {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.25);
    transform: scale(1.05);
}

.service-icon {
    width: 30px;
    height: 30px;
    object-fit: contain;
}

.fallback-icon {
    color: #60a5fa;
}

/* Body */
.card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.service-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #e8eeff;

    margin: 0;

    line-height: 1.35;
    letter-spacing: -0.01em;

    transition: color 0.2s ease;
}

.service-card:hover .service-title {
    color: #ffffff;
}

.card-desc {
    font-size: 0.9rem;
    color: #94a3b8;

    line-height: 1.75;

    margin: 0;
}

/* Number */
.service-number {
    position: absolute;

    right: 20px;
    bottom: 16px;

    font-size: 0.7rem;
    font-weight: 800;

    letter-spacing: 0.1em;

    color: rgba(96, 165, 250, 0.2);

    pointer-events: none;
}

/* Skeleton */
.service-skeleton {
    animation: none;
    pointer-events: none;
}

.skeleton-icon,
.skeleton-title,
.skeleton-line {
    background: rgba(59, 130, 246, 0.07);
    border-radius: 8px;
}

.skeleton-icon {
    width: 56px;
    height: 56px;
}

.skeleton-title {
    width: 65%;
    height: 20px;
}

.skeleton-line {
    width: 100%;
    height: 12px;
}

.skeleton-line.short {
    width: 70%;
}

/* Responsive */
@media (max-width: 768px) {
    .services-section {
        padding: 72px 16px 80px;
    }

    .section-title {
        font-size: 1.9rem;
    }

    .services-grid {
        gap: 14px;
    }

    .service-card {
        padding: 24px 22px 28px;
        max-width: none;
    }
}

@media (max-width: 480px) {
    .services-section {
        padding: 56px 14px 64px;
    }

    .section-title {
        font-size: 1.6rem;
    }

    .services-header {
        margin-bottom: 40px;
    }

    .service-card {
        flex: 1 1 100%;
    }
}

@media (max-width: 360px) {
    .section-title {
        font-size: 1.4rem;
    }

    .service-card {
        padding: 20px 16px 24px;
    }
}
</style>
