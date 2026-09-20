/**
 * PROJECTS SHOWCASE MODULE
 * Interactive filter tabs, project data, and deep-dive technical modal.
 */

const PROJECTS_DATA = [
  {
    id: 'sentinel',
    title: 'Sentinel: Cyber-Resilient Threat Detection',
    category: ['ai-ml', 'systems'],
    categoryLabel: 'AI / CYBERSECURITY',
    image: 'assets/images/sentinel.jpg',
    badgeText: 'Top 20 • Ingenious Hackathon 7.0',
    badgeType: 'badge-emerald',
    shortDesc: 'AI-powered cyber-resilient infrastructure threat detection engine integrating unsupervised autoencoders, conditional rule evaluators, and dynamic correlation graphs.',
    metrics: { label: 'Inference Latency', value: '< 18ms' },
    tags: ['Python', 'PyTorch', 'Autoencoders', 'Graph Theory', 'FastAPI', 'Docker'],
    deepDive: {
      headline: 'Autonomous Anomaly Detection & Cross-Node Attack Propagation Mapping',
      overview: 'Sentinel is engineered for mission-critical infrastructure under continuous zero-day threats. Traditional signature-based detection fails against polymorphic payloads. Sentinel combines unsupervised deep autoencoders to flag reconstruction loss deviations with dynamic network correlation graphs that isolate compromised nodes before lateral movement occurs.',
      architecture: [
        'Ingestion & Telemetry Pipeline: High-throughput packet ingestion streaming network metrics (packet entropy, inter-arrival time, byte ratios).',
        'Deep Autoencoder: Trained exclusively on non-adversarial traffic. Reconstruction anomaly threshold: L(x, x̂) = ||x - x̂||² > τ.',
        'Graph Correlation Engine: Constructs real-time topological graphs using NetworkX to identify attack paths and blast radius.',
        'Deterministic Fallback Rules: Fast conditional rule engine for immediate mitigation of high-confidence known attack vectors.'
      ],
      mathFormula: 'Loss_{anomaly}(x) = \\frac{1}{d} \\sum_{i=1}^{d} (x_i - \\hat{x}_i)^2 \\quad \\text{where} \\quad \\hat{x} = g_{\\theta}(f_{\\phi}(x))',
      impact: 'Secured Top 20 finish at Ingenious Hackathon 7.0 among 400+ competing engineering teams. Demonstrated zero-day threat containment in sub-20ms synthetic workloads.'
    }
  },
  {
    id: 'math-to-code',
    title: 'Math-to-Code SaaS Prototype',
    category: ['ai-ml', 'systems'],
    categoryLabel: 'VISION-LANGUAGE AI',
    image: 'assets/images/mathtocode.jpg',
    badgeText: 'Vision-Language Pipeline',
    badgeType: 'badge-cyan',
    shortDesc: 'End-to-end vision-language pipeline that parses handwritten and printed mathematical equations from camera feeds into executable Python simulations and verification scripts.',
    metrics: { label: 'Token Accuracy', value: '98.4%' },
    tags: ['Python', 'Vision-Language Models', 'AST Parsing', 'Next.js', 'FastAPI', 'SymPy'],
    deepDive: {
      headline: 'Multimodal Neural OCR to Abstract Syntax Tree (AST) Code Synthesis',
      overview: 'Translating complex blackboard and notebook mathematics into computational code is a major friction point in engineering. This SaaS pipeline leverages multimodal vision-language attention layers, parses equation semantics into canonical LaTeX, translates to Abstract Syntax Trees, and emits sandboxed, validated Python execution scripts.',
      architecture: [
        'Multimodal Vision Encoder: Segments mathematical notation, subscripting, matrices, and integral bounds from raw image inputs.',
        'SymPy & AST Compiler: Maps semantic equation trees into verified Python symbolic representations and numerical solvers.',
        'Sandboxed Code Sandbox: Executes generated scripts within isolated containers, outputting real-time charts and computational results.',
        'Interactive SaaS UI: Built with Next.js and Tailwind-free glassmorphic interfaces for real-time camera/upload interaction.'
      ],
      mathFormula: 'P(Y_{code} | X_{img}) = \\prod_{t=1}^{T} P(y_t | y_{<t}, \\text{VisionEmbed}(X_{img}))',
      impact: 'Successfully converts multi-variable calculus, linear algebra systems, and differential equations into production-ready NumPy and SciPy simulation models in under 2.4 seconds.'
    }
  },
  {
    id: 'quant-risk',
    title: 'Probabilistic FX Financial Risk Analysis',
    category: ['quant'],
    categoryLabel: 'QUANTITATIVE FINANCE',
    image: 'assets/images/quant_fx.jpg',
    badgeText: 'GARCH(1,1) & Monte Carlo',
    badgeType: 'badge-violet',
    shortDesc: 'Stochastic simulation and volatility clustering framework for Foreign Exchange (FX) currency pairs, calculating Parametric and Historical Value at Risk (VaR).',
    metrics: { label: 'Simulations / Run', value: '10,000+ Paths' },
    tags: ['Python', 'NumPy', 'GARCH(1,1)', 'Monte Carlo', 'SciPy', 'Risk Analytics'],
    deepDive: {
      headline: 'Time-Varying Volatility Modeling & Tail-Risk Parametric Estimation',
      overview: 'Financial return distributions exhibit heavy tails and volatility clustering that standard Geometric Brownian Motion underestimates. This quantitative framework implements GARCH(1,1) parameter estimation via maximum likelihood and couples it with high-speed vectorized Monte Carlo path generation to establish accurate 95% and 99% Value at Risk (VaR) profiles.',
      architecture: [
        'GARCH(1,1) Engine: Fits conditional variance dynamics σ²_t = ω + α ε²_{t-1} + β σ²_{t-1} with persistence α + β ≈ 0.98.',
        'Stochastic Simulation Engine: Vectorized Monte Carlo trajectory generation for 10,000+ foreign currency price paths.',
        'Tail Risk Profiling: Computes parametric VaR, Historical VaR, and Expected Shortfall (Conditional VaR).',
        'Automated Backtesting: Performs Kupiec POF and Christoffersen independence tests to validate risk coverage.'
      ],
      mathFormula: '\\sigma_t^2 = \\omega + \\alpha \\epsilon_{t-1}^2 + \\beta \\sigma_{t-1}^2, \\quad \\text{VaR}_{\\alpha} = - (\\mu \\Delta t + z_{\\alpha} \\sigma_t \\sqrt{\\Delta t})',
      impact: 'Delivered accurate downside tail risk forecasts on EUR/USD and USD/JPY datasets with zero statistical rejections across historical financial stress-testing periods.'
    }
  }
];

(function initProjects() {
  const grid = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalProjectTitle');

  if (!grid) return;

  function renderProjects(filter = 'all') {
    grid.innerHTML = '';

    const filtered = PROJECTS_DATA.filter(item => {
      if (filter === 'all') return true;
      return item.category.includes(filter);
    });

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'glass-card project-card';
      card.setAttribute('data-id', project.id);

      card.innerHTML = `
        <div class="project-media-wrapper">
          <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
          <div class="project-media-badge">
            <span class="badge ${project.badgeType}">${project.badgeText}</span>
          </div>
        </div>
        <div class="project-content">
          <div class="project-header-row">
            <h3 class="project-title">${project.title}</h3>
          </div>
          <p class="project-desc">${project.shortDesc}</p>
          <div class="project-metrics-box">
            <span class="metric-label">${project.metrics.label}:</span>
            <span class="metric-highlight">${project.metrics.value}</span>
          </div>
          <div class="project-tags">
            ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <button class="btn-case-study" data-open-modal="${project.id}">
              Inspect System <span>→</span>
            </button>
            <span class="badge badge-cyan">${project.categoryLabel}</span>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach modal open triggers
    document.querySelectorAll('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-open-modal');
        openProjectModal(id);
      });
    });
  }

  function openProjectModal(id) {
    const project = PROJECTS_DATA.find(p => p.id === id);
    if (!project || !modalOverlay) return;

    modalTitle.textContent = project.title;

    modalBody.innerHTML = `
      <div class="modal-section">
        <h4 class="modal-section-title">// SYSTEM OVERVIEW</h4>
        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.96rem;">${project.deepDive.overview}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">// SYSTEM ARCHITECTURE PIPELINE</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
          ${project.deepDive.architecture.map(item => `
            <li style="color: var(--text-secondary); font-size: 0.92rem; padding-left: 20px; position: relative; line-height: 1.6;">
              <span style="position: absolute; left: 0; color: var(--accent-cyan);">▹</span>
              ${item}
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">// MATHEMATICAL FORMULATION</h4>
        <div class="math-formula-box">
          <code>${project.deepDive.mathFormula}</code>
        </div>
      </div>

      <div class="modal-section">
        <h4 class="modal-section-title">// KEY BENCHMARK & IMPACT</h4>
        <p style="color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.92rem; line-height: 1.6;">
          ${project.deepDive.impact}
        </p>
      </div>

      <div style="display: flex; gap: 14px; margin-top: 12px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="font-size: 0.8rem; padding: 10px 18px;">
          Explore Code on GitHub ↗
        </a>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const filter = e.currentTarget.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Initial render
  renderProjects('all');
})();
