/**
 * SYSTEMS DEMO & SKELETON LOADER CONTROLLER
 * Real product demos for Sentinel, Risk Engine, Math-to-Code SaaS, and Otaku Bazaar.
 * Strict 0px Hard Edges • Mathematical Grounding • Skeleton Loaders
 */

(function initSystemsDemo() {
  // 1. Skeleton Loader Management for All Media Panes
  const mediaPanes = document.querySelectorAll('.system-media-column');
  mediaPanes.forEach(pane => {
    const img = pane.querySelector('.media-edge-img');
    if (img) {
      if (img.complete) {
        setTimeout(() => pane.classList.add('skeleton-loaded'), 250);
      } else {
        img.addEventListener('load', () => {
          setTimeout(() => pane.classList.add('skeleton-loaded'), 250);
        });
      }
    }
  });

  // 2. System 1: Sentinel Threat Injection Simulation
  const btnTriggerSentinel = document.getElementById('btnTriggerSentinel');
  const sentinelStatusText = document.getElementById('sentinelStatusText');
  const sentinelMetricsDisplay = document.getElementById('sentinelMetricsDisplay');

  if (btnTriggerSentinel && sentinelStatusText && sentinelMetricsDisplay) {
    let isSimulating = false;
    btnTriggerSentinel.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      btnTriggerSentinel.disabled = true;
      sentinelStatusText.textContent = 'INJECTING SYNTHETIC ZERO-DAY PACKET BURST...';
      sentinelStatusText.style.color = '#E8E8E8';

      if (window.HighPerformanceGraphs && window.HighPerformanceGraphs.triggerSentinel) {
        window.HighPerformanceGraphs.triggerSentinel();
      }

      setTimeout(() => {
        sentinelStatusText.textContent = 'AUTOENCODER RECON LOSS: 0.0841 > THRESHOLD 0.00318 [ANOMALY DETECTED]';
        sentinelMetricsDisplay.textContent = 'ISOLATING COMPROMISED NODE [GRAPH BLAST RADIUS ISOLATED]';
        sentinelMetricsDisplay.style.color = '#A8927D';
      }, 700);

      setTimeout(() => {
        sentinelStatusText.textContent = 'CONTAINMENT LATENCY: 14.2ms | THREAT CONTAINED';
        sentinelMetricsDisplay.textContent = 'TRAFFIC RESTORED TO DETERMINISTIC FALLBACK | STATE: NOMINAL';
        sentinelMetricsDisplay.style.color = '#B0B0B0';
        btnTriggerSentinel.disabled = false;
        isSimulating = false;
      }, 1600);
    });
  }

  // 3. System 2: Interactive Financial Risk Parameter Tuner
  const sliderVol = document.getElementById('sliderVol');
  const sliderPaths = document.getElementById('sliderPaths');
  const dispVolVal = document.getElementById('dispVolVal');
  const dispPathsVal = document.getElementById('dispPathsVal');
  const outVaR95 = document.getElementById('outVaR95');
  const outVaR99 = document.getElementById('outVaR99');
  const outExpectedShortfall = document.getElementById('outExpectedShortfall');

  function calculateRiskProfile() {
    if (!sliderVol || !sliderPaths) return;
    const vol = parseFloat(sliderVol.value);
    const paths = parseInt(sliderPaths.value, 10);

    dispVolVal.textContent = `${vol.toFixed(1)}%`;
    dispPathsVal.textContent = paths.toLocaleString();

    // Parametric calculations (1-Day Horizon, dt = 1/252)
    const dailyVol = (vol / 100) / Math.sqrt(252);
    const var95 = - (1.645 * dailyVol * 100);
    const var99 = - (2.326 * dailyVol * 100);
    const es99 = - (2.665 * dailyVol * 100);

    outVaR95.textContent = `${var95.toFixed(2)}%`;
    outVaR99.textContent = `${var99.toFixed(2)}%`;
    outExpectedShortfall.textContent = `${es99.toFixed(2)}%`;

    if (window.QuantWebGL && window.QuantWebGL.setVolatility) {
      window.QuantWebGL.setVolatility(vol / 15);
    }
  }

  if (sliderVol && sliderPaths) {
    sliderVol.addEventListener('input', calculateRiskProfile);
    sliderPaths.addEventListener('input', calculateRiskProfile);
    sliderVol.addEventListener('change', () => {
      if (window.HighPerformanceGraphs && window.HighPerformanceGraphs.triggerRisk) {
        window.HighPerformanceGraphs.triggerRisk();
      }
    });
    sliderPaths.addEventListener('change', () => {
      if (window.HighPerformanceGraphs && window.HighPerformanceGraphs.triggerRisk) {
        window.HighPerformanceGraphs.triggerRisk();
      }
    });
    calculateRiskProfile();
  }

  // 4. System 3: Math-to-Code SaaS Interactive Formula Selector
  const formulaSelector = document.getElementById('formulaSelector');
  const codeOutput = document.getElementById('codeOutput');
  const compileLatency = document.getElementById('compileLatency');

  const FORMULA_PRESETS = {
    'garch': {
      code: `// Compiled High-Throughput C++ Eigen Kernel
inline double garch_step(double omega, double alpha, double eps_prev, double beta, double sigma_prev_sq) {
    return omega + alpha * (eps_prev * eps_prev) + beta * sigma_prev_sq;
}`,
      latency: '1.42ms'
    },
    'autoencoder': {
      code: `import torch

def reconstruction_loss(x: torch.Tensor, x_hat: torch.Tensor) -> torch.Tensor:
    return torch.mean((x - x_hat) ** 2, dim=-1)`,
      latency: '1.88ms'
    },
    'blackscholes': {
      code: `import numpy as np

def bs_pde_step(V: np.ndarray, S: np.ndarray, sigma: float, r: float, dt: float, dS: float):
    # Tridiagonal Crank-Nicolson finite difference matrix operator
    pass`,
      latency: '2.14ms'
    }
  };

  if (formulaSelector && codeOutput && compileLatency) {
    formulaSelector.addEventListener('change', (e) => {
      const selected = FORMULA_PRESETS[e.target.value] || FORMULA_PRESETS['garch'];
      codeOutput.textContent = selected.code;
      compileLatency.textContent = selected.latency;
    });
  }

  // 5. System 4: Otaku Bazaar High-Throughput Transaction Simulator
  const btnTriggerCheckout = document.getElementById('btnTriggerCheckout');
  const otakuStatusText = document.getElementById('otakuStatusText');
  const otakuMetricsDisplay = document.getElementById('otakuMetricsDisplay');
  const otakuTelemetryOutput = document.getElementById('otakuTelemetryOutput');

  if (btnTriggerCheckout && otakuStatusText && otakuMetricsDisplay) {
    let isTesting = false;
    btnTriggerCheckout.addEventListener('click', () => {
      if (isTesting) return;
      isTesting = true;
      btnTriggerCheckout.disabled = true;
      otakuStatusText.textContent = 'DISPATCHING ATOMIC LUA INVENTORY LOCK...';
      otakuStatusText.style.color = '#E8E8E8';

      setTimeout(() => {
        otakuStatusText.textContent = 'REDIS TTL LOCK ACQUIRED: TOKEN_0x9B4E38 [300s TTL]';
        otakuMetricsDisplay.textContent = 'HMAC-SHA256 SIGNATURE VALIDATED [LATENCY 0.84ms]';
        otakuMetricsDisplay.style.color = '#A8927D';
        if (otakuTelemetryOutput) {
          otakuTelemetryOutput.textContent = `[T+0.12ms] REDIS: EVALSHA lua_reserve_stock KEYS[sku_992] ARGS[1, 300] -> OK\n[T+0.48ms] RAZORPAY_WEBHOOK: payment.captured event payload 2.4KB\n[T+0.84ms] CRYPTO: HMAC_SHA256(raw_body, secret) == x_razorpay_signature [MATCH]\n[T+1.12ms] POSTGRES_ACID: BEGIN; UPDATE inventory SET qty=qty-1; INSERT INTO orders; COMMIT; [OK]`;
        }
      }, 600);

      setTimeout(() => {
        otakuStatusText.textContent = 'TRANSACTION COMMITTED // ZERO-RACE RECONCILIATION';
        otakuMetricsDisplay.textContent = 'EDGE CACHE HIT: 99.8% | TTFB: 42ms | CONCURRENCY: 5,000 REQ/S';
        otakuMetricsDisplay.style.color = '#B0B0B0';
        btnTriggerCheckout.disabled = false;
        isTesting = false;
      }, 1500);
    });
  }
})();
