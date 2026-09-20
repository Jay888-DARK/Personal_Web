/**
 * JAY BHATT — PORTFOLIO MAIN SCRIPT
 * High-End Editorial / Swiss Minimalist Architecture
 */

const EDITORIAL_PROJECTS = {
  'sentinel': {
    title: 'Sentinel: Cyber-Resilient Infrastructure Anomaly Engine',
    category: 'Autonomous Security // Deep Learning',
    abstract: 'An AI-powered infrastructure defense pipeline integrating unsupervised deep autoencoders, conditional evaluation rules, and real-time graph correlation algorithms to isolate zero-day network threats.',
    impact: 'Awarded Top 20 Finish at Ingenious Hackathon 7.0 among 400+ competitive collegiate engineering teams.',
    architecture: [
      'Telemetry Stream Processing: High-frequency extraction of entropy, inter-packet arrival intervals, and byte ratios.',
      'Unsupervised Autoencoder: Trained on verified non-adversarial baselines. Flags anomalies where reconstruction error ||x - x̂||² exceeds adaptive threshold τ.',
      'Graph Correlation Engine: Maps topological attack progression and node contagion using NetworkX.',
      'Deterministic Rule Safeguards: Instant sub-15ms mitigation for high-confidence attack signatures.'
    ],
    math: 'Loss_{anomaly}(x) = \\frac{1}{d} \\sum_{i=1}^d (x_i - \\hat{x}_i)^2 \\quad \\text{with} \\quad \\hat{x} = g_\\theta(f_\\phi(x))',
    tools: ['Python', 'PyTorch', 'Autoencoders', 'Graph Theory', 'FastAPI', 'Docker']
  },
  'mathtocode': {
    title: 'Math-to-Code SaaS: Vision-Language Model Pipeline',
    category: 'Vision-Language AI // Symbolic Computing',
    abstract: 'An end-to-end multimodal pipeline translating handwritten and printed mathematical formulas from images into validated, executable Python numerical simulations.',
    impact: 'Achieves 98.4% token accuracy across multi-variable calculus, differential equations, and linear algebra matrices.',
    architecture: [
      'Multimodal Vision Encoder: Segments mathematical notation, complex sub/superscript structures, and integral boundaries.',
      'LaTeX & AST Compiler: Formulates semantic parse trees into canonical SymPy symbolic representations.',
      'Sandboxed Execution Layer: Executes compiled scripts in isolated runtimes and generates computational figures in under 2.5 seconds.'
    ],
    math: 'P(Y_{code} | X_{img}) = \\prod_{t=1}^T P(y_t | y_{<t}, \\text{VisionEmbed}(X_{img}))',
    tools: ['Python', 'Vision-Language Models', 'AST Parsing', 'Next.js', 'FastAPI', 'SymPy']
  },
  'quantrisk': {
    title: 'Probabilistic Financial Risk Analysis: GARCH(1,1) & Monte Carlo',
    category: 'Quantitative Finance // Volatility Modeling',
    abstract: 'Stochastic framework modeling time-varying volatility clustering and fat-tailed return distributions for Foreign Exchange (FX) currency pairs.',
    impact: 'Delivers parametric and historical Value at Risk (VaR 95% & 99%) across 10,000+ stochastic price trajectories.',
    architecture: [
      'GARCH(1,1) Variance Engine: Fits conditional variance dynamics σ²_t = ω + α ε²_{t-1} + β σ²_{t-1} with high persistence (α + β ≈ 0.98).',
      'Vectorized Monte Carlo Generator: Simulates large-scale stochastic price paths with Geometric Brownian Motion.',
      'Tail Risk Quantification: Quantifies downside Value at Risk (VaR) and Expected Shortfall under historical stress conditions.'
    ],
    math: '\\sigma_t^2 = \\omega + \\alpha \\epsilon_{t-1}^2 + \\beta \\sigma_{t-1}^2, \\quad \\text{VaR}_\\alpha = - (\\mu \\Delta t + z_\\alpha \\sigma_t \\sqrt{\\Delta t})',
    tools: ['Python', 'NumPy', 'GARCH(1,1)', 'Monte Carlo', 'SciPy', 'Financial Risk Analytics']
  },
  'otakubazaar': {
    title: 'OtakuBazaar: Escrow-Authenticated Anime Marketplace & 24h Liquidity Protocol',
    category: 'FinTech // Escrow Architecture // 24h Liquidity Protocol',
    abstract: 'An institutional-grade collectible trading platform addressing the $4.2B counterfeit risk and high-value illiquidity in scale figure investing. Integrates cryptographic session locks, 15-minute checkout security holds, and physical consignment vault inspection workflows.',
    impact: 'Guarantees sub-24-hour instant liquidity exits with verified multi-point optical authentication and anti-sniping bargaining mechanisms.',
    architecture: [
      'Cryptographic Session Locks: Enforces atomic transaction integrity and 15-minute checkout hold periods to eliminate double-spending, inventory exhaustion, and buyer sniping.',
      'Consignment Vault Protocol: High-security physical intake and optical verification pipeline issuing tamper-evident digital authenticity certificates.',
      'Real-Time Buyer-Seller Bargaining: Web-socket powered negotiation terminal allowing algorithmic bid/ask matching and counter-offer acceptance.',
      '24-Hour Liquidity Engine: Instant liquidation pool offering sub-24-hour buyouts based on historical market clearing prices and vault reserves.'
    ],
    math: '\\text{LiquidityRate}(t) = P_{\\text{clearing}} \\times \\left(1 - \\kappa \\sqrt{\\frac{\\Delta t}{24\\text{h}}}\\right) - \\text{VaultFee}_{\\text{escrow}}',
    tools: ['Next.js 14', 'Prisma', 'PostgreSQL', 'Cryptographic Session Locks', 'Consignment Escrow', 'Stripe Connect', 'WebSockets']
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initEmailCopy();
  initProjectModals();
  initScrollExpand();
});

/* Navigation & Active Link Observer */
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinksList = document.getElementById('navLinksList');

  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinksList.style.display === 'flex';
      navLinksList.style.display = isVisible ? '' : 'flex';
      if (!isVisible) {
        navLinksList.style.flexDirection = 'column';
        navLinksList.style.position = 'absolute';
        navLinksList.style.top = '100%';
        navLinksList.style.left = '0';
        navLinksList.style.width = '100%';
        navLinksList.style.backgroundColor = '#FAF9F6';
        navLinksList.style.padding = '20px 32px';
        navLinksList.style.borderBottom = '1px solid #E5E3DC';
      }
    });
  }

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* Direct Email Clipboard Copy */
function initEmailCopy() {
  const copyBtn = document.getElementById('btnCopyEmail');
  const emailVal = 'jay.b@ahduni.edu.in';

  if (!copyBtn) return;

  function setCopiedState() {
    const original = copyBtn.textContent;
    copyBtn.textContent = 'COPIED ✓';
    copyBtn.style.backgroundColor = '#C85A32';
    copyBtn.style.color = '#FFFFFF';
    copyBtn.style.borderColor = '#C85A32';

    setTimeout(() => {
      copyBtn.textContent = original;
      copyBtn.style.backgroundColor = '';
      copyBtn.style.color = '';
      copyBtn.style.borderColor = '';
    }, 2500);
  }

  copyBtn.addEventListener('click', () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailVal).then(() => {
        setCopiedState();
      }).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const textarea = document.createElement('textarea');
      textarea.value = emailVal;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedState();
      } catch (err) {
        console.error('Copy fallback failed', err);
      }
      document.body.removeChild(textarea);
    }
  });
}

/* Editorial Project Modal / Drawer */
function initProjectModals() {
  const modalOverlay = document.getElementById('editorialModalOverlay');
  const modalTitle = document.getElementById('modalTitleText');
  const modalBody = document.getElementById('modalInnerContent');
  const modalClose = document.getElementById('modalCloseTrigger');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const data = EDITORIAL_PROJECTS[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
      <div>
        <div class="modal-section-h">// ABSTRACT</div>
        <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-primary); margin-bottom: 12px;">${data.abstract}</p>
        <span class="pill-tag pill-tag-terracotta">${data.impact}</span>
      </div>

      <div style="border-top: 1px solid var(--border-stone); padding-top: 24px;">
        <div class="modal-section-h">// ARCHITECTURAL PIPELINE</div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
          ${data.architecture.map(step => `
            <li style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.65; position: relative; padding-left: 20px;">
              <span style="position: absolute; left: 0; color: var(--accent-terracotta);">—</span>
              ${step}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="border-top: 1px solid var(--border-stone); padding-top: 24px;">
        <div class="modal-section-h">// MATHEMATICAL FORMULATION</div>
        <div class="editorial-formula-box">
          <code>${data.math}</code>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-stone); padding-top: 24px;">
        <div class="modal-section-h">// TECHNOLOGIES &amp; TOOLCHAIN</div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.tools.map(t => `<span class="pill-tag">${t}</span>`).join('')}
        </div>
      </div>

      ${projectId === 'otakubazaar' ? `
        <div style="border-top: 1px solid var(--border-stone); padding-top: 24px; display: flex; gap: 12px;">
          <a href="https://otaku-bazaar.vercel.app" target="_blank" rel="noopener noreferrer" class="btn-editorial" style="font-size: 0.85rem; padding: 12px 20px;">
            Visit Live Platform (otaku-bazaar.vercel.app) ↗
          </a>
        </div>
      ` : ''}
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-open-project');
      openModal(id);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* --------------------------------------------------------------------------
   EDITORIAL SCROLLEXPAND CONTROLLER
   Interpolates scroll position through .editorial-scroll-container
   -------------------------------------------------------------------------- */
function initScrollExpand() {
  const container = document.querySelector('.editorial-scroll-container');
  const frame = document.querySelector('.editorial-scroll-frame');

  if (!container || !frame) return;

  let ticking = false;
  let targetProgress = 0;
  let currentProgress = 0;

  function calculateProgress() {
    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollDistance = containerHeight - windowHeight;

    if (scrollDistance <= 0) return 0;

    const scrolled = -rect.top;
    const rawProgress = scrolled / scrollDistance;
    return Math.max(0, Math.min(1, rawProgress));
  }

  function update() {
    currentProgress += (targetProgress - currentProgress) * 0.15;

    if (Math.abs(targetProgress - currentProgress) < 0.001) {
      currentProgress = targetProgress;
    }

    frame.style.setProperty('--expand-progress', currentProgress.toFixed(4));

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
  onScroll();
}

