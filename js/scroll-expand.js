/**
 * SCROLLEXPAND COMPONENT CONTROLLER
 * Interpolates scroll position within the scroll-expand-container
 * and updates CSS --progress property for 60fps frame morphing.
 */

(function initScrollExpand() {
  const container = document.querySelector('.scroll-expand-container');
  const frame = document.getElementById('scrollExpandFrame');

  if (!container || !frame) return;

  let ticking = false;
  let targetProgress = 0;
  let currentProgress = 0;

  function calculateProgress() {
    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Total scrollable distance within this container before it unsticks
    const scrollDistance = containerHeight - windowHeight;
    
    if (scrollDistance <= 0) return 0;
    
    // How far the top of the container has scrolled past the top of the viewport
    const scrolled = -rect.top;
    
    // Clamp progress between 0 and 1
    const rawProgress = scrolled / scrollDistance;
    return Math.max(0, Math.min(1, rawProgress));
  }

  function update() {
    // Smooth lerp (linear interpolation) for ultra-fluid sensation
    currentProgress += (targetProgress - currentProgress) * 0.18;

    // Fix precision at boundaries
    if (Math.abs(targetProgress - currentProgress) < 0.001) {
      currentProgress = targetProgress;
    }

    frame.style.setProperty('--progress', currentProgress.toFixed(4));

    if (Math.abs(targetProgress - currentProgress) > 0.0005) {
      requestAnimationFrame(update);
    } else {
      ticking = false;
    }
  }

  function onScroll() {
    targetProgress = calculateProgress();
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  
  // Initial measurement
  onScroll();
})();
