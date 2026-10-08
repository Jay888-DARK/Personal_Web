/**
 * REAL-TIME QUANTITATIVE TELEMETRY STREAM
 * Architectural Magazine & Technical Journal Edition
 * GARCH(1,1), Monte Carlo VaR, Latent Autoencoder Telemetry with Rigid Skeleton Hydration
 * Dark Espresso & Terracotta Inks • Bone Base • No Terminal Fonts
 */

(function initLiveDataFeed() {
  const container = document.getElementById('dataFeedStream');
  const refreshBtn = document.getElementById('btnRefreshFeed');
  if (!container) return;

  const MAX_LINES = 5;
  const history = [];

  let garchOmega = 0.000012;
  let garchAlpha = 0.085;
  let garchBeta = 0.905;
  let variance = 0.000219;
  let basePrice = 1.08420;
  let isFeeding = true;

  function generateTelemetryLog() {
    const timestamp = (performance.now() / 1000).toFixed(2);
    const category = Math.floor(Math.random() * 6);

    switch (category) {
      case 0: {
        const shock = (Math.random() - 0.5) * 0.004;
        variance = garchOmega + garchAlpha * (shock * shock) + garchBeta * variance;
        const annualizedVol = (Math.sqrt(variance * 252) * 100).toFixed(2);
        return `[T+${timestamp}s] GARCH(1,1) σ²_t: ${(variance * 1e4).toFixed(4)}e-4 | VOL_ANN: ${annualizedVol}%`;
      }
      case 1: {
        const var95 = (-1.645 * Math.sqrt(variance) * 100).toFixed(3);
        const var99 = (-2.326 * Math.sqrt(variance) * 100).toFixed(3);
        return `[T+${timestamp}s] MC_VaR N=10k | 95% 1D: ${var95}% | 99% 1D: ${var99}% [VALID]`;
      }
      case 2: {
        const reconLoss = (0.0012 + Math.random() * 0.0008).toFixed(5);
        const threshold = 0.00318;
        return `[T+${timestamp}s] LATENT z∈ℝ^128 | L_recon: ${reconLoss} < δ=${threshold} [NOMINAL]`;
      }
      case 3: {
        basePrice += (Math.random() - 0.5) * 0.00015;
        const spread = (0.08 + Math.random() * 0.06).toFixed(2);
        const latency = (0.65 + Math.random() * 0.45).toFixed(2);
        return `[T+${timestamp}s] FX_EUR/USD: ${basePrice.toFixed(5)} | SPREAD: ${spread}pip | LAT: ${latency}ms`;
      }
      case 4: {
        const condNum = (12.4 + Math.random() * 2.1).toFixed(1);
        return `[T+${timestamp}s] CHOLESKY L·Lᵀ VALIDATED | POSITIVE_DEFINITE: TRUE | COND_κ: ${condNum}`;
      }
      case 5: {
        const parseTime = (1.8 + Math.random() * 0.8).toFixed(2);
        return `[T+${timestamp}s] AST_PARSE: SymPy -> Eigen C++ | COMPILE: ${parseTime}ms | SYNC: OK`;
      }
      default:
        return `[T+${timestamp}s] KERNEL_SYNC 0x7FFD2B | CPU_LOAD: 12.4% | MEM: 382MB`;
    }
  }

  function showSkeletonState() {
    isFeeding = false;
    container.innerHTML = `
      <div class="skeleton-box skeleton-line" style="height: 16px; margin-bottom: 6px;"></div>
      <div class="skeleton-box skeleton-line" style="height: 16px; margin-bottom: 6px; width: 92%;"></div>
      <div class="skeleton-box skeleton-line" style="height: 16px; margin-bottom: 6px; width: 85%;"></div>
      <div class="skeleton-box skeleton-line" style="height: 16px; margin-bottom: 6px; width: 95%;"></div>
      <div class="skeleton-box skeleton-line" style="height: 16px; width: 70%;"></div>
    `;
  }

  function renderFeed() {
    container.innerHTML = history
      .map((line, idx) => {
        const isLatest = idx === history.length - 1;
        return `<div class="data-feed-line" style="${isLatest ? 'color: #A2583E; font-weight: 800;' : 'color: #483E38;'}">${line}</div>`;
      })
      .join('');
  }

  function hydrateFeed() {
    showSkeletonState();
    setTimeout(() => {
      history.length = 0;
      for (let i = 0; i < MAX_LINES; i++) {
        history.push(generateTelemetryLog());
      }
      renderFeed();
      isFeeding = true;
    }, 400);
  }

  hydrateFeed();

  setInterval(() => {
    if (!isFeeding) return;
    history.shift();
    history.push(generateTelemetryLog());
    renderFeed();
  }, 480);

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      hydrateFeed();
    });
  }
})();
