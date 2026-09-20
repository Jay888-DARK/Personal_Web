/**
 * INTERACTIVE SKILLS MATRIX MODULE
 * Dynamic rendering, category filters, and animated proficiency meters.
 */

const SKILLS_DATA = [
  // Languages
  {
    name: 'Python',
    category: 'languages',
    level: 95,
    tag: 'Advanced / Core',
    icon: 'PY',
    context: 'NumPy, SciPy, PyTorch, GARCH(1,1), Monte Carlo'
  },
  {
    name: 'C++',
    category: 'languages',
    level: 90,
    tag: 'Advanced / Systems',
    icon: 'C++',
    context: 'Data Structures, STL, Low-Latency Algorithmic Core'
  },
  {
    name: 'Verilog',
    category: 'languages',
    level: 82,
    tag: 'Hardware Design',
    icon: 'HDL',
    context: 'Digital Circuit Synthesis, FPGA Architecture, Logic Gates'
  },
  {
    name: 'C',
    category: 'languages',
    level: 85,
    tag: 'Systems Programming',
    icon: 'C',
    context: 'Memory Allocation, Pointers, Operating Systems'
  },
  {
    name: 'JavaScript / TypeScript',
    category: 'languages',
    level: 88,
    tag: 'Fullstack / Modern',
    icon: 'TS',
    context: 'ES6+, Async Architectures, Modern Web APIs'
  },

  // Frameworks
  {
    name: 'PyTorch',
    category: 'frameworks',
    level: 92,
    tag: 'AI / Deep Learning',
    icon: 'PT',
    context: 'Vision-Language Models, Autoencoders, Tensor Compute'
  },
  {
    name: 'FastAPI',
    category: 'frameworks',
    level: 90,
    tag: 'High-Throughput API',
    icon: 'FA',
    context: 'Async I/O, Pydantic Validation, ML Microservices'
  },
  {
    name: 'Next.js',
    category: 'frameworks',
    level: 88,
    tag: 'Fullstack React',
    icon: 'NX',
    context: 'Server Components, SSR/SSG, SaaS Architectures'
  },
  {
    name: 'React',
    category: 'frameworks',
    level: 90,
    tag: 'Frontend Engineering',
    icon: 'RE',
    context: 'Hooks, State Machines, Glassmorphism Interfaces'
  },

  // Tools
  {
    name: 'Docker',
    category: 'tools',
    level: 86,
    tag: 'Containerization',
    icon: 'DK',
    context: 'Containerized ML Ingestion, Multi-stage Builds'
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 94,
    tag: 'Version Control',
    icon: 'GIT',
    context: 'Git Flow, Collaborative Hackathon Pipelines, CI/CD'
  },
  {
    name: 'Ubuntu / VirtualBox',
    category: 'tools',
    level: 88,
    tag: 'Linux Systems',
    icon: 'LNX',
    context: 'Bash Scripting, POSIX Toolchains, VM Management'
  },
  {
    name: 'VS Code',
    category: 'tools',
    level: 96,
    tag: 'Developer Setup',
    icon: 'VSC',
    context: 'Remote SSH, GDB Debugging, Python Profiling'
  }
];

(function initSkillsMatrix() {
  const grid = document.getElementById('skillsGrid');
  const tabs = document.querySelectorAll('.skill-tab-btn');

  if (!grid) return;

  function renderSkills(category = 'all') {
    grid.innerHTML = '';

    const filtered = SKILLS_DATA.filter(skill => {
      if (category === 'all') return true;
      return skill.category === category;
    });

    filtered.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      
      card.innerHTML = `
        <div class="skill-header">
          <div class="skill-name-group">
            <div class="skill-icon-badge">${skill.icon}</div>
            <div>
              <div class="skill-name">${skill.name}</div>
              <div style="font-size: 0.74rem; color: var(--text-muted); font-family: var(--font-mono);">${skill.context}</div>
            </div>
          </div>
          <span class="skill-level-pct">${skill.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: 0%;" data-target-width="${skill.level}%"></div>
        </div>
        <div class="skill-badge-row">
          <span class="badge badge-cyan">${skill.tag}</span>
        </div>
      `;

      grid.appendChild(card);
    });

    // Trigger bar fill animation
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-target-width');
        });
      }, 50);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const cat = e.currentTarget.getAttribute('data-category');
      renderSkills(cat);
    });
  });

  // Initial render
  renderSkills('all');
})();
