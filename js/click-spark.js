/**
 * CLICKSPARK COMPONENT (Vanilla JS + CSS Adaptation of React Bits <ClickSpark />)
 * Source inspired by React Bits (https://reactbits.dev)
 * 
 * Provides interactive particle spark bursts on click with easing,
 * configurable spark count, radius, color, and duration.
 */

class ClickSparkEngine {
  constructor(options = {}) {
    this.sparkColor = options.sparkColor || '#00F0FF';
    this.sparkColors = options.sparkColors || ['#A8927D', '#E8E8E8', '#737373'];
    this.sparkSize = options.sparkSize !== undefined ? options.sparkSize : 12;
    this.sparkRadius = options.sparkRadius !== undefined ? options.sparkRadius : 22;
    this.sparkCount = options.sparkCount !== undefined ? options.sparkCount : 10;
    this.duration = options.duration !== undefined ? options.duration : 450;
    this.easing = options.easing || 'ease-out';
    this.extraScale = options.extraScale !== undefined ? options.extraScale : 1.2;

    this.canvas = null;
    this.ctx = null;
    this.sparks = [];
    this.animationId = null;
    this.dpr = window.devicePixelRatio || 1;

    this.init();
  }

  init() {
    // Create or locate the overlay canvas
    let canvas = document.getElementById('clickSparkCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'clickSparkCanvas';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '99999';
      canvas.style.userSelect = 'none';
      document.body.appendChild(canvas);
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.draw = this.draw.bind(this);

    window.addEventListener('resize', this.resizeCanvas);
    document.addEventListener('pointerdown', this.handleClick);

    this.resizeCanvas();
    this.animationId = requestAnimationFrame(this.draw);
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  easeFunc(t) {
    switch (this.easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: // ease-out
        return t * (2 - t);
    }
  }

  handleClick(e) {
    if (!this.canvas) return;

    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();

    // Pick a radiant accent color from theme for this click
    const color = this.sparkColors[Math.floor(Math.random() * this.sparkColors.length)] || this.sparkColor;

    const newSparks = Array.from({ length: this.sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / this.sparkCount + (Math.random() * 0.2 - 0.1),
      startTime: now,
      color: color
    }));

    this.sparks.push(...newSparks);
  }

  draw(timestamp) {
    const ctx = this.ctx;
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    if (this.sparks.length > 0) {
      this.sparks = this.sparks.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= this.duration) {
          return false;
        }

        const progress = elapsed / this.duration;
        const eased = this.easeFunc(progress);

        const distance = eased * this.sparkRadius * this.extraScale;
        const lineLength = this.sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = spark.color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });
    }

    this.animationId = requestAnimationFrame(this.draw);
  }

  destroy() {
    window.removeEventListener('resize', this.resizeCanvas);
    document.removeEventListener('pointerdown', this.handleClick);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Auto-initialize ClickSpark with theme-aligned cyan/violet/white burst
document.addEventListener('DOMContentLoaded', () => {
  window.clickSparkInstance = new ClickSparkEngine({
    sparkColor: '#00F0FF',
    sparkColors: ['#A8927D', '#E8E8E8', '#737373'],
    sparkSize: 12,
    sparkRadius: 20,
    sparkCount: 8,
    duration: 420,
    easing: 'ease-out',
    extraScale: 1.15
  });
});
