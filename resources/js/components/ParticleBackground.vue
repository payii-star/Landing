<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref(null);
let ctx;
let animationFrameId;
let particles = [];
let nebulae = [];
let shootingStars = [];
let frame = 0;

const mouse = { x: null, y: null, radius: 160 };

const W = () => canvasRef.value?.width  ?? window.innerWidth;
const H = () => canvasRef.value?.height ?? window.innerHeight;

// ── Colour palette ─────────────────────────────────────────────
const PALETTE = [
  'rgba(99,  102, 241, PAL)',   // indigo
  'rgba(139,  92, 246, PAL)',   // violet
  'rgba( 59, 130, 246, PAL)',   // blue
  'rgba( 14, 165, 233, PAL)',   // sky
  'rgba(168, 85,  247, PAL)',   // purple
];
const randColor = (alpha) =>
  PALETTE[Math.floor(Math.random() * PALETTE.length)].replace('PAL', alpha);

// ── Nebula (soft glowing blobs behind everything) ───────────────
class Nebula {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x  = Math.random() * W();
    this.y  = Math.random() * H();
    this.r  = 180 + Math.random() * 260;
    this.hue= [220, 240, 260, 280][Math.floor(Math.random() * 4)];
    this.a  = 0;
    this.targetA = 0.04 + Math.random() * 0.06;
    this.life = 0;
    this.maxLife = 600 + Math.random() * 400;
    if (init) { this.life = Math.random() * this.maxLife; this.a = this.targetA; }
  }
  draw() {
    const progress = this.life / this.maxLife;
    const alpha = this.a * Math.sin(progress * Math.PI);
    if (alpha <= 0) return;
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    g.addColorStop(0,   `hsla(${this.hue}, 80%, 60%, ${alpha})`);
    g.addColorStop(0.5, `hsla(${this.hue}, 70%, 40%, ${alpha * 0.4})`);
    g.addColorStop(1,   `hsla(${this.hue}, 60%, 20%, 0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }
  update() {
    this.life++;
    if (this.life > this.maxLife) this.reset();
    this.draw();
  }
}

// ── Particle ────────────────────────────────────────────────────
class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x    = Math.random() * W();
    this.y    = Math.random() * H();
    this.baseX = this.x;
    this.baseY = this.y;
    this.size  = 0.6 + Math.random() * 2.2;
    this.speedX= (Math.random() - 0.5) * 0.35;
    this.speedY= (Math.random() - 0.5) * 0.35;
    this.alpha = 0.2 + Math.random() * 0.65;
    this.baseAlpha = this.alpha;
    this.twinkleSpeed = 0.008 + Math.random() * 0.018;
    this.twinkleOffset= Math.random() * Math.PI * 2;
    // tier: 0=small dim, 1=mid, 2=bright star
    this.tier  = Math.random() < 0.08 ? 2 : Math.random() < 0.25 ? 1 : 0;
    this.color = randColor(1);
    this.pulseR= this.size * (2 + Math.random() * 3);
    if (this.tier === 2) {
      this.size  = 1.8 + Math.random() * 1.8;
      this.alpha = 0.7 + Math.random() * 0.3;
      this.color = `rgba(200, 220, 255, 1)`;
    }
    if (init) this.twinkleOffset = Math.random() * Math.PI * 2;
  }

  draw() {
    const twinkle = Math.sin(frame * this.twinkleSpeed + this.twinkleOffset);
    const a = Math.max(0, this.baseAlpha + twinkle * 0.25);
    const s = this.size + twinkle * (this.tier === 2 ? 0.6 : 0.2);

    // glow for bright stars
    if (this.tier === 2) {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, s * 5);
      g.addColorStop(0,   `rgba(180, 210, 255, ${a * 0.6})`);
      g.addColorStop(0.4, `rgba(120, 160, 255, ${a * 0.2})`);
      g.addColorStop(1,   `rgba(80, 120, 255, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, s * 5, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // cross flare
      ctx.save();
      ctx.globalAlpha = a * 0.5;
      ctx.strokeStyle = `rgba(200, 220, 255, ${a * 0.4})`;
      ctx.lineWidth = 0.5;
      const fl = s * 8;
      ctx.beginPath(); ctx.moveTo(this.x - fl, this.y); ctx.lineTo(this.x + fl, this.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(this.x, this.y - fl); ctx.lineTo(this.x, this.y + fl); ctx.stroke();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0.3, s), 0, Math.PI * 2);
    ctx.fillStyle = this.tier === 2
      ? `rgba(220, 235, 255, ${a})`
      : this.color.replace('1)', `${a})`);
    ctx.fill();
  }

  update() {
    // mouse repulsion
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const ease  = 0.06 + force * 0.12;
        this.x -= (dx / dist) * force * 4 * ease * 10;
        this.y -= (dy / dist) * force * 4 * ease * 10;
      } else {
        this.x += (this.baseX - this.x) * 0.03;
        this.y += (this.baseY - this.y) * 0.03;
        this.baseX += this.speedX;
        this.baseY += this.speedY;
      }
    } else {
      this.x += (this.baseX - this.x) * 0.05;
      this.y += (this.baseY - this.y) * 0.05;
      this.baseX += this.speedX;
      this.baseY += this.speedY;
    }

    // wrap
    if (this.baseX < -10) this.baseX = W() + 10;
    if (this.baseX > W() + 10) this.baseX = -10;
    if (this.baseY < -10) this.baseY = H() + 10;
    if (this.baseY > H() + 10) this.baseY = -10;

    this.draw();
  }
}

// ── Shooting star ───────────────────────────────────────────────
class ShootingStar {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * W();
    this.y     = Math.random() * H() * 0.5;
    this.len   = 80 + Math.random() * 180;
    this.speed = 12 + Math.random() * 16;
    this.angle = Math.PI / 5 + (Math.random() - 0.5) * 0.4;
    this.alpha = 0;
    this.phase = 'in'; // in | travel | out
    this.traveled = 0;
    this.maxTravel = this.len + 60 + Math.random() * 120;
    this.width = 0.8 + Math.random() * 1.2;
    this.active = false;
    this.delay  = Math.random() * 400;
  }
  draw() {
    if (!this.active || this.alpha <= 0) return;
    const tx = Math.cos(this.angle);
    const ty = Math.sin(this.angle);
    const g = ctx.createLinearGradient(
      this.x - tx * this.len, this.y - ty * this.len,
      this.x, this.y
    );
    g.addColorStop(0, `rgba(200, 220, 255, 0)`);
    g.addColorStop(0.6, `rgba(200, 220, 255, ${this.alpha * 0.4})`);
    g.addColorStop(1, `rgba(255, 255, 255, ${this.alpha})`);
    ctx.save();
    ctx.strokeStyle = g;
    ctx.lineWidth = this.width;
    ctx.shadowColor = `rgba(150, 180, 255, ${this.alpha})`;
    ctx.shadowBlur  = 6;
    ctx.beginPath();
    ctx.moveTo(this.x - tx * this.len, this.y - ty * this.len);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
  }
  update() {
    if (this.delay > 0) { this.delay--; return; }
    this.active = true;
    if (this.phase === 'in') {
      this.alpha = Math.min(1, this.alpha + 0.12);
      if (this.alpha >= 1) this.phase = 'travel';
    }
    if (this.phase === 'travel') {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.traveled += this.speed;
      if (this.traveled >= this.maxTravel) this.phase = 'out';
    }
    if (this.phase === 'out') {
      this.alpha = Math.max(0, this.alpha - 0.08);
      this.x += Math.cos(this.angle) * this.speed * 0.5;
      this.y += Math.sin(this.angle) * this.speed * 0.5;
      if (this.alpha <= 0) this.reset();
    }
    this.draw();
  }
}

// ── Connection lines ────────────────────────────────────────────
const connect = () => {
  const maxDist2 = 14000;
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const d2 = dx * dx + dy * dy;
      if (d2 < maxDist2) {
        const opacity = (1 - d2 / maxDist2) * 0.22;
        // near-mouse lines get a tint
        let r = 99, g = 120, bl = 241;
        if (mouse.x !== null) {
          const mx = (particles[a].x + particles[b].x) / 2 - mouse.x;
          const my = (particles[a].y + particles[b].y) / 2 - mouse.y;
          if (mx * mx + my * my < mouse.radius * mouse.radius * 2) {
            r = 139; g = 92; bl = 246;
          }
        }
        ctx.strokeStyle = `rgba(${r},${g},${bl},${opacity})`;
        ctx.lineWidth   = 0.7;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
};

// ── Init ────────────────────────────────────────────────────────
const init = () => {
  const area = W() * H();
  const count = Math.floor(area / 10000);

  particles    = Array.from({ length: Math.min(count, 160) }, () => new Particle());
  nebulae      = Array.from({ length: 5 }, () => new Nebula());
  shootingStars= Array.from({ length: 4 }, () => new ShootingStar());
};

// ── Draw background ─────────────────────────────────────────────
const drawBackground = () => {
  const g = ctx.createRadialGradient(W()/2, H()/2, 0, W()/2, H()/2, Math.max(W(), H()) * 0.8);
  g.addColorStop(0,   '#0f1a35');
  g.addColorStop(0.5, '#090f1f');
  g.addColorStop(1,   '#020617');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W(), H());
};

// ── Animate ─────────────────────────────────────────────────────
const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  frame++;

  drawBackground();

  // nebulae layer
  ctx.save();
  nebulae.forEach(n => n.update());
  ctx.restore();

  // connections
  connect();

  // particles
  particles.forEach(p => p.update());

  // shooting stars
  shootingStars.forEach(s => s.update());
};

// ── Events ──────────────────────────────────────────────────────
const onMouseMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
const onMouseLeave= () => { mouse.x = null; mouse.y = null; };
const onResize    = () => {
  canvasRef.value.width  = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  init();
};

onMounted(() => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
  animate();

  window.addEventListener('resize',    onResize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave',onMouseLeave);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize',    onResize);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseleave',onMouseLeave);
});
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>