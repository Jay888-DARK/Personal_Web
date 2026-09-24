/**
 * SCROLLEXPAND MULTI-INSTANCE CONTROLLER
 * Vanilla JS Adaptation of React Bits <ScrollExpand />
 * 
 * Strict Brutalist Engineering Constraints:
 * - 0px startRadius and 0px endRadius (Hard 0px edges, zero rounded geometry)
 * - 1.0x mediaZoom (mathematically precise, zero zoom distortion)
 * - Flat solid Onyx scrim fade (rgba(10, 10, 10, 0.85))
 * - Zero hover animations (strictly scroll-driven)
 * - Sharp typography & overlay fade-in
 */
(function initScrollExpandInstances() {
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const smoothstep = (edge0, edge1, x) => {
    const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
    return t * t * (3 - 2 * t);
  };

  const instances = [];

  function setupInstance(root) {
    const frame = root.querySelector('.scroll-expand__frame');
    const media = root.querySelector('.scroll-expand__media');
    const scrim = root.querySelector('.scroll-expand__scrim');
    const overlay = root.querySelector('.scroll-expand__overlay');
    const title = root.querySelector('.scroll-expand__title');
    const hint = root.querySelector('.scroll-expand__hint');

    if (!frame) return;

    const config = {
      startWidth: 68,
      startHeight: 68,
      startRadius: 0,
      endRadius: 0,
      mediaZoom: 1.0,
      overlayScrim: 0.85
    };

    instances.push({
      root,
      frame,
      media,
      scrim,
      overlay,
      title,
      hint,
      config,
      targetProgress: 0,
      currentProgress: 0
    });
  }

  document.querySelectorAll('.scroll-expand').forEach(setupInstance);
  if (instances.length === 0) return;

  let ticking = false;

  function updateInstance(inst) {
    const rect = inst.root.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Calculate progress as the project enters the active reading zone
    const start = windowH * 0.88;
    const end = windowH * 0.12;
    const p = clamp((start - rect.top) / (start - end), 0, 1);
    inst.targetProgress = p;

    // Smooth lerp
    inst.currentProgress += (inst.targetProgress - inst.currentProgress) * 0.18;
    if (Math.abs(inst.targetProgress - inst.currentProgress) < 0.001) {
      inst.currentProgress = inst.targetProgress;
    }

    const cur = inst.currentProgress;
    const e = smoothstep(0, 1, cur);

    // Frame clip-path expansion (strictly 0px round corners)
    const w = inst.config.startWidth + (100 - inst.config.startWidth) * e;
    const h = inst.config.startHeight + (100 - inst.config.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    inst.frame.style.clipPath = `inset(${iy.toFixed(2)}% ${ix.toFixed(2)}% ${iy.toFixed(2)}% ${ix.toFixed(2)}% round 0px)`;

    // Media Zoom: strictly 1.0x (Disable zoom-in effect to keep technical footage mathematically precise)
    if (inst.media) {
      inst.media.style.transform = 'scale(1.0)';
    }

    // Scrim: flat solid Onyx background (rgba(10, 10, 10, 0.85))
    if (inst.scrim) {
      inst.scrim.style.opacity = (inst.config.overlayScrim * e).toFixed(3);
    }

    // Title: fades out smoothly
    if (inst.title) {
      const out = smoothstep(0.2, 0.65, cur);
      inst.title.style.opacity = (1 - out).toFixed(3);
      inst.title.style.transform = `translate3d(0, ${(-20 * out).toFixed(1)}px, 0)`;
    }

    // Scroll hint: fades out quickly
    if (inst.hint) {
      const gone = smoothstep(0, 0.15, cur);
      inst.hint.style.opacity = (1 - gone).toFixed(3);
      inst.hint.style.transform = `translate3d(0, ${(8 * gone).toFixed(1)}px, 0)`;
    }

    // Overlay: technical stack & performance metrics fade in sharply over flat Onyx scrim
    if (inst.overlay) {
      const inn = smoothstep(0.68, 1.0, cur);
      inst.overlay.style.opacity = inn.toFixed(3);
      inst.overlay.style.transform = `translate3d(0, ${(16 * (1 - inn)).toFixed(1)}px, 0)`;
      inst.overlay.style.pointerEvents = inn > 0.8 ? 'auto' : 'none';
    }
  }

  function loop() {
    let needsTick = false;
    for (let i = 0; i < instances.length; i++) {
      updateInstance(instances[i]);
      if (Math.abs(instances[i].targetProgress - instances[i].currentProgress) > 0.0005) {
        needsTick = true;
      }
    }

    if (needsTick) {
      requestAnimationFrame(loop);
    } else {
      ticking = false;
    }
  }

  function onScroll() {
    for (let i = 0; i < instances.length; i++) {
      const rect = instances[i].root.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.88;
      const end = windowH * 0.12;
      instances[i].targetProgress = clamp((start - rect.top) / (start - end), 0, 1);
    }
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(loop);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  onScroll();
})();
