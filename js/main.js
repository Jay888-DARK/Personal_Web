/**
 * JAY BHATT — MAIN ARCHITECTURAL CONTROLLER
 * Navigation state tracking, legal modal dialogs, and clipboard utilities.
 * Sophisticated Dark Navy & Slate Gray • jaybhatt.me Specification
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Active State Tracking
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // 2. Terms of Service & Privacy Policy Modal Handling
  const legalModal = document.getElementById('legalModalBackdrop');
  const modalTitle = document.getElementById('legalModalTitle');
  const modalBody = document.getElementById('legalModalBody');
  const modalClose = document.getElementById('legalModalClose');
  const modalFooterClose = document.getElementById('legalModalFooterClose');

  const openTosBtns = document.querySelectorAll('[data-open-legal="tos"], #linkTermsOfService, #footerLinkTos');
  const openPrivacyBtns = document.querySelectorAll('[data-open-legal="privacy"], #linkPrivacyPolicy, #footerLinkPrivacy');

  const LEGAL_TEXTS = {
    tos: {
      title: 'TERMS OF SERVICE // JAYBHATT.ME SYSTEMS REPOSITORY',
      content: `
        <h4>1. Operational Nature of jaybhatt.me</h4>
        <p>This digital environment serves as the personal engineering portfolio, quantitative research laboratory, and systems repository of Jay Bhatt (domain: <strong>jaybhatt.me</strong>). All computational models, architectural topologies, algorithm implementations, and interactive demonstrations (including Sentinel intrusion detection, GARCH(1,1) volatility models, Monte Carlo risk engines, and Math-to-Code neural compilers) are provided strictly for research, engineering evaluation, and professional demonstration.</p>

        <h4>2. No Financial, Investment, or Trading Advice</h4>
        <p>The quantitative risk metrics, Value-at-Risk (VaR) estimations, Expected Shortfall (CVaR) calculations, and simulated Monte Carlo trajectories presented on jaybhatt.me are algorithmic demonstrations of computational methods. Nothing on this website constitutes financial advisory services, securities solicitation, investment counsel, or a recommendation to enter or liquidate positions in financial markets.</p>

        <h4>3. Intellectual Property & Systems Reproducibility</h4>
        <p>All architectural formulations, neural autoencoder topologies, compilation pipelines, and bespoke software implementations remain the intellectual property of Jay Bhatt unless otherwise attributed to upstream open-source frameworks (e.g., PyTorch, Three.js, SymPy, Redis, React). Commercial replication, extraction, or scraping without explicit consent is strictly prohibited.</p>

        <h4>4. Client-Side WebGL & Shader Execution</h4>
        <p>The 3D procedural volatility mesh and real-time interactive canvases execute via client-side WebGL and Canvas 2D contexts on your hardware. Simulation rendering and FPS parity may depend upon local graphics hardware and browser configuration.</p>
      `
    },
    privacy: {
      title: 'PRIVACY POLICY // TELEMETRY & ATTRIBUTION PROTOCOL',
      content: `
        <h4>1. Zero Invasive Tracking & Data Sovereignty</h4>
        <p>At <strong>jaybhatt.me</strong>, user privacy and computational sovereignty are paramount. This website does not deploy third-party advertising beacons, commercial tracking pixels, social media tracking tags, or cross-origin fingerprinting scripts.</p>

        <h4>2. Client-Side Simulation Privacy</h4>
        <p>All Three.js procedural simulations, Monte Carlo path generations, and neural AST compilation demonstrations execute entirely within your local browser runtime. No user input, parameter slider values, or client device identifiers are collected, profiled, or transmitted to remote databases.</p>

        <h4>3. Direct Communication & Academic Correspondence</h4>
        <p>When communicating via institutional channels (<strong>jay.b@ahduni.edu.in</strong>), correspondence is processed through official Ahmedabad University academic email protocols. Data provided in email transmissions is held strictly confidential and used solely for professional, research, or engineering inquiries.</p>

        <h4>4. Regulatory & Institutional Compliance</h4>
        <p>This repository adheres to applicable digital privacy and data protection principles under the Information Technology Act of India and relevant institutional research conduct standards.</p>
      `
    }
  };

  function openLegalModal(type) {
    if (!legalModal || !LEGAL_TEXTS[type]) return;
    const doc = LEGAL_TEXTS[type];
    modalTitle.textContent = doc.title;
    modalBody.innerHTML = doc.content;
    legalModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLegalModal() {
    if (!legalModal) return;
    legalModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openTosBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('tos');
    });
  });

  openPrivacyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('privacy');
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeLegalModal);
  if (modalFooterClose) modalFooterClose.addEventListener('click', closeLegalModal);

  if (legalModal) {
    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) closeLegalModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLegalModal();
  });

  // 3. Email Copy Action
  const copyBtn = document.getElementById('btnCopyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'jay.b@ahduni.edu.in';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = 'COPIED TO CLIPBOARD // [OK]';
        copyBtn.style.borderColor = '#8CA9CE';
        copyBtn.style.color = '#E2E8F0';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      });
    });
  }
});
