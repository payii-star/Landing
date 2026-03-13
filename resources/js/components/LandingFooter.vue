<template>
    <footer class="footer-section">
        <div class="container-xxl">
            <div class="footer-inner d-flex flex-wrap justify-content-between align-items-center">
                <div class="footer-copy">
                    &copy; {{ currentYear }} McFlyon. All rights reserved.
                </div>
                <div class="footer-links d-flex gap-4">
                    <a href="#" class="footer-link">Privacy Policy</a>
                    <a href="#" class="footer-link">Terms of Service</a>
                    <a href="#" class="footer-link">Contact</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer-section {
    padding: 32px 0;
    border-top: 1px solid rgba(99, 102, 241, 0.1);
    background: rgba(10, 14, 39, 0.25);
    position: relative;
    z-index: 10;
    margin-top: auto;
}
.footer-inner { padding: 0 20px; }
.footer-copy { color: #94A3B8; font-size: 14px; }
.footer-link { color: #94A3B8; font-size: 14px; text-decoration: none; transition: color 0.2s ease; }
.footer-link:hover { color: white; }

@media (max-width: 768px) {
    .footer-inner { gap: 20px; }
    .footer-links { gap: 20px; }
}
@media (max-width: 576px) {
    .footer-inner { flex-direction: column; gap: 16px; text-align: center; }
    .footer-links { justify-content: center; flex-wrap: wrap; gap: 16px; }
}
@media (max-width: 360px) {
    .footer-copy, .footer-link { font-size: 12px; }
    .footer-links { gap: 12px; }
}
</style>