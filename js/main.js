/**
 * JAY BHATT — MAIN ARCHITECTURAL CONTROLLER
 * Navigation state tracking, legal modal dialogs, and clipboard utilities.
 * Strict 0px Hard Edges • High-Contrast Quantitative Styling
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

  const openTosBtn = document.getElementById('linkTermsOfService');
  const openPrivacyBtn = document.getElementById('linkPrivacyPolicy');

  const LEGAL_TEXTS = {
    tos: {
      title: 'TERMS OF SERVICE // RESEARCH REPOSITORY SPECIFICATION',
      content: `
        <h4>1. Nature of the Portfolio & Systems</h4>
        <p>This digital environment serves as the quantitative research, systems engineering, and computational portfolio of Jay Bhatt. All mathematical models, simulations, architectures, and algorithms (including but not limited to Sentinel, GARCH(1,1) implementations, Monte Carlo engines, and Vision-to-Code pipelines) are provided strictly for academic, demonstration, and evaluation purposes.</p>

        <h4>2. No Financial, Investment, or Trading Advice</h4>
        <p>The quantitative risk metrics, Value at Risk (VaR) estimations, Monte Carlo simulated trajectories, and foreign exchange (FX) models displayed herein are algorithmic demonstrations. Nothing contained in this environment constitutes investment advice, financial counsel, securities solicitation, or a recommendation to purchase or liquidate any financial asset.</p>

        <h4>3. Intellectual Property & Code Reproducibility</h4>
        <p>All proprietary codebases, neural architecture definitions, and custom simulation frameworks are the intellectual property of Jay Bhatt unless otherwise noted (such as open-source dependencies or academic citations). Commercial deployment, replication, or extraction without explicit authorization is strictly prohibited.</p>

        <h4>4. Systems Availability & WebGL Compute</h4>
        <p>The 3D procedural WebGL canvas relies on client-side shader computation. Performance may vary according to GPU acceleration and hardware configuration. No warranty is expressed or implied regarding absolute uptime or real-time simulation parity.</p>
      `
    },
    privacy: {
      title: 'PRIVACY POLICY // DATA TELEMETRY & ATTRIBUTION PROTOCOL',
      content: `
        <h4>1. Zero Commercial Tracking</h4>
        <p>This quantitative environment does not utilize commercial tracking pixels, invasive third-party ad beacons, or cross-site fingerprinting scripts. We respect computational sovereignty.</p>

        <h4>2. Client-Side Shader Execution</h4>
        <p>All Three.js procedural volatility meshes and mathematical surface transformations execute entirely within your local browser's WebGL context. No personal telemetry or hardware parameters are harvested or transmitted to external servers.</p>

        <h4>3. Communications & Direct Inquiries</h4>
        <p>When contacting via institutional channels (<span class="mono-spec">jay.b@ahduni.edu.in</span>), your transmission is handled through standard academic email protocols. Information provided in correspondence is utilized solely for technical, research, or professional dialogue.</p>

        <h4>4. Jurisdiction</h4>
        <p>This research repository complies with standard Indian academic and data protection regulations under the Information Technology Act and applicable institutional guidelines of Ahmedabad University.</p>
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

  if (openTosBtn) {
    openTosBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('tos');
    });
  }

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('privacy');
    });
  }

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
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'COPIED TO CLIPBOARD // [OK]';
        copyBtn.style.borderColor = '#A8927D';
        copyBtn.style.color = '#E8E8E8';
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2000);
      });
    });
  }
});
