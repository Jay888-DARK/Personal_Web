/**
 * QUANTITATIVE WEBGL 3D SURFACE & GSAP SCROLLTRIGGER CONTROLLER
 * Procedural Volatility Mesh & Latent Space Manifold
 * Wireframe Materials: Muted Steel Blue (#4A6B8C) & Metallic Silver (#9BAEC0)
 */

(function initQuantitativeWebGL() {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas || typeof THREE === 'undefined') {
    console.warn('[WebGL Active] Three.js not detected or canvas missing.');
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  
  // Perspective Camera
  const fov = 45;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(14, 16, 24);
  camera.lookAt(0, 0, 0);

  // WebGL Renderer with High-Precision Alpha
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Procedural Grid Parameters
  const gridWidth = 32;
  const gridDepth = 32;
  const segmentsX = 80;
  const segmentsY = 80;

  // Plane Geometry rotated to horizontal plane
  const planeGeo = new THREE.PlaneGeometry(gridWidth, gridDepth, segmentsX, segmentsY);
  planeGeo.rotateX(-Math.PI / 2);

  // Store base un-displaced vertex positions
  const basePositions = planeGeo.attributes.position.clone();

  // 1. Wireframe Material: Muted Bronze / Champagne (#A8927D)
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xA8927D,
    wireframe: true,
    transparent: true,
    opacity: 0.60
  });
  const wireMesh = new THREE.Mesh(planeGeo, wireMaterial);
  scene.add(wireMesh);

  // 2. Vertex Points Lattice: Metallic Champagne (#C4B5A5)
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xC4B5A5,
    size: 0.14,
    transparent: true,
    opacity: 0.85
  });
  const pointsLattice = new THREE.Points(planeGeo, pointsMaterial);
  scene.add(pointsLattice);

  // 3. Quantitative Axis & Bounding Risk Frame
  const boxHelper = new THREE.BoxHelper(wireMesh, 0x2E2A27);
  scene.add(boxHelper);

  // Mathematical Parameters for Multi-Dimensional Risk / Autoencoder Latent Surface
  let clock = new THREE.Clock();
  let surfaceVolatility = 1.0;
  let waveFrequency = 1.0;
  let manifoldDeform = 0.0;

  // Procedural Volatility Surface Wave Equation
  function updateSurfaceGeometry(elapsed) {
    const pos = planeGeo.attributes.position;
    const base = basePositions;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const x = base.getX(i);
      const z = base.getZ(i);

      // Distance from origin (Moneyness vs Maturity)
      const r = Math.sqrt(x * x + z * z);
      
      // Multi-frequency wave simulating GARCH volatility clustering + latent space fold
      const wave1 = Math.sin(x * 0.25 * waveFrequency + elapsed * 0.6) * Math.cos(z * 0.25 * waveFrequency + elapsed * 0.5);
      const wave2 = Math.sin(r * 0.35 - elapsed * 0.8) * 0.5;
      const gaussianSmile = 2.4 * Math.exp(-0.035 * (x * x + z * z));
      const latentShear = manifoldDeform * Math.sin(x * 0.5) * Math.cos(z * 0.4) * 1.5;

      const y = (wave1 + wave2 + gaussianSmile + latentShear) * surfaceVolatility;
      pos.setY(i, y);
    }

    pos.needsUpdate = true;
    planeGeo.computeVertexNormals();
    boxHelper.update();
  }

  // Animation Loop
  function render() {
    requestAnimationFrame(render);
    const elapsed = clock.getElapsedTime();
    updateSurfaceGeometry(elapsed);

    // Subtle continuous idle drift
    wireMesh.rotation.y = Math.sin(elapsed * 0.05) * 0.08;
    pointsLattice.rotation.y = wireMesh.rotation.y;

    renderer.render(scene, camera);
  }
  render();

  // Resize Handler
  function handleResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', handleResize);

  // GSAP ScrollTrigger: Confined strictly to Hero section
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    })
    .to(camera.position, { x: 18, y: 12, z: 20 }, 0)
    .to(wireMaterial, { opacity: 0.25 }, 0);

    console.log('[Quantitative WebGL Active] Volatility mesh confined strictly to Hero section.');
  }

  // Expose global controller for interactive sliders
  window.QuantWebGL = {
    setVolatility: (v) => { surfaceVolatility = v; },
    setFrequency: (f) => { waveFrequency = f; },
    setManifoldShear: (s) => { manifoldDeform = s; }
  };
})();
