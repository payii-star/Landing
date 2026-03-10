<template>
    <section class="hero-section">
        <div class="container-xxl">
            <div class="hero-content">
                <!-- Hero Title -->
                <h1 class="hero-title animate-fade-in-up">
                    {{ landingStore.content?.hero_title || 'Transform Your Business with McFlyon' }}
                </h1>
                
                <!-- Hero Description -->
                <p class="hero-description animate-fade-in-up delay-1">
                    {{ landingStore.content?.hero_desc || 'Powerful solutions for modern enterprises. Scale your business with confidence.' }}
                </p>
                
                <!-- Hero CTA Buttons -->
                <div class="hero-actions animate-fade-in-up delay-2">
                    <a href="#get-started" class="btn-hero btn-hero-primary">
                        <span>Get Started</span>
                        <i class="bi bi-rocket-takeoff"></i>
                    </a>
                    <a href="#learn-more" class="btn-hero btn-hero-outline">
                        <span>Learn More</span>
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
                
                <!-- Hero Stats (Optional) -->
                <div class="hero-stats animate-fade-in-up delay-3">
                    <div class="stat-item">
                        <div class="stat-number">10K+</div>
                        <div class="stat-label">Active Users</div>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-number">99.9%</div>
                        <div class="stat-label">Uptime</div>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Support</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Background Effects -->
        <div class="hero-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="grid-pattern"></div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useLandingStore } from "@/stores/landing";

const landingStore = useLandingStore();
</script>

<style scoped>
/* Hero Section */
.hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 160px 0 80px; /* Increased top padding to account for fixed navbar */
    overflow: hidden;
}

.container-xxl {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero Content */
.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
}

.hero-title {
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 24px;
    background: linear-gradient(135deg, #ffffff 0%, #E0E7FF 50%, #C7D2FE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
}

.hero-description {
    font-size: clamp(16px, 2vw, 20px);
    line-height: 1.6;
    color: #94A3B8;
    margin: 0 0 40px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

/* Hero Actions */
.hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 60px;
}

.btn-hero {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
}

.btn-hero-primary {
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
    color: white;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.btn-hero-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.btn-hero-outline {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-hero-outline:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
}

/* Hero Stats */
.hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 40px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: 14px;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.stat-divider {
    width: 1px;
    height: 40px;
    background: rgba(99, 102, 241, 0.2);
}

/* Background Effects */
.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
}

.gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.3;
    animation: float 20s ease-in-out infinite;
}

.orb-1 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, #6366F1 0%, transparent 70%);
    top: -200px;
    left: -200px;
    animation-delay: 0s;
}

.orb-2 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, #8B5CF6 0%, transparent 70%);
    bottom: -150px;
    right: -150px;
    animation-delay: -10s;
}

.grid-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.5;
}

/* Animations */
@keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }

/* Responsive */
@media (max-width: 768px) {
    .hero-section {
        padding: 140px 0 60px; /* Adjusted for mobile navbar */
        min-height: 100vh;
    }
    
    .hero-title {
        font-size: 36px;
        margin-bottom: 20px;
    }
    
    .hero-description {
        font-size: 16px;
        margin-bottom: 32px;
    }
    
    .hero-actions {
        flex-direction: column;
        gap: 12px;
        margin-bottom: 40px;
    }
    
    .btn-hero {
        width: 100%;
        max-width: 300px;
        justify-content: center;
    }
    
    .hero-stats {
        flex-direction: column;
        gap: 20px;
        padding: 30px 20px;
    }
    
    .stat-divider {
        width: 40px;
        height: 1px;
    }
    
    .orb-1, .orb-2 {
        width: 300px;
        height: 300px;
    }
}

@media (max-width: 576px) {
    .hero-title {
        font-size: 32px;
    }
    
    .hero-stats {
        gap: 16px;
        padding: 24px 16px;
    }
    
    .stat-number {
        font-size: 24px;
    }
}
</style>