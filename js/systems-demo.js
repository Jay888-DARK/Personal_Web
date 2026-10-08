/**
 * SYSTEMS DEMOS & RIGID SKELETON LOADER CONTROLLER
 * Architectural Magazine & Technical Journal Edition
 * Real Interactive Product Demos: Sentinel, Risk Engine, Math-to-Code AST, Otaku Bazaar
 * Absolute 0px Hard Edges • Clinical Mathematical Feedback • Zero Hover Animations
 */

(function initSystemsDemo() {
  // 1. System 1: Sentinel Threat Injection Simulation
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
      sentinelStatusText.style.color = '#1C1613';

      if (window.HighPerformanceGraphs && window.HighPerformanceGraphs.triggerSentinel) {
        window.HighPerformanceGraphs.triggerSentinel();
      }

      setTimeout(() => {
        sentinelStatusText.textContent = 'AUTOENCODER RECON LOSS: 0.0841 > THRESHOLD 0.00318 [ANOMALY DETECTED]';
        sentinelStatusText.style.color = '#A2583E';
        sentinelMetricsDisplay.textContent = 'ISOLATING COMPROMISED NODE [GRAPH BLAST RADIUS ISOLATED]';
        sentinelMetricsDisplay.style.color = '#283325';
      }, 700);

      setTimeout(() => {
        sentinelStatusText.textContent = 'CONTAINMENT LATENCY: 14.2ms | THREAT CONTAINED';
        sentinelStatusText.style.color = '#283325';
        sentinelMetricsDisplay.textContent = 'TRAFFIC RESTORED TO DETERMINISTIC FALLBACK | STATE: NOMINAL';
        sentinelMetricsDisplay.style.color = '#483E38';
        btnTriggerSentinel.disabled = false;
        isSimulating = false;
      }, 1600);
    });
  }

  // 2. System 2: Financial Risk Parameter Tuner
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

  // 3. System 3: Math-to-Code Neural AST Compiler Interactive Presets
  const formulaSelector = document.getElementById('formulaSelector');
  const codeOutput = document.getElementById('codeOutput');
  const compileLatency = document.getElementById('compileLatency');
  const btnCompileFormula = document.getElementById('btnCompileFormula');

  const FORMULA_PRESETS = {
    'garch': {
      code: `// Compiled High-Throughput C++20 Eigen Kernel
inline double garch_step(double omega, double alpha, double eps_prev, double beta, double sigma_prev_sq) {
    return omega + alpha * (eps_prev * eps_prev) + beta * sigma_prev_sq;
}`,
      latency: '< 1.42ms'
    },
    'autoencoder': {
      code: `import torch

def reconstruction_loss(x: torch.Tensor, x_hat: torch.Tensor) -> torch.Tensor:
    # L2 Euclidean Reconstruction Deviation
    return torch.mean(torch.sum((x - x_hat) ** 2, dim=-1))`,
      latency: '< 1.88ms'
    },
    'blackscholes': {
      code: `// Vectorized Crank-Nicolson Tridiagonal Operator
void solve_bs_cn(const Eigen::VectorXd& S, Eigen::VectorXd& V, double dt, double sigma, double r) {
    Eigen::MatrixXd A = build_tridiagonal_matrix(S, dt, sigma, r);
    V = A.colPivHouseholderQr().solve(V);
}`,
      latency: '< 2.14ms'
    },
    'attention': {
      code: `// Scaled Dot-Product Attention Jacobian Operator
Eigen::MatrixXd attention_jacobian(const Eigen::MatrixXd& Q, const Eigen::MatrixXd& K, double d_k) {
    Eigen::MatrixXd scores = (Q * K.transpose()) / std::sqrt(d_k);
    return softmax(scores);
}`,
      latency: '< 1.65ms'
    }
  };

  function updateFormulaPreset() {
    if (!formulaSelector || !codeOutput || !compileLatency) return;
    const selectedKey = formulaSelector.value;
    const preset = FORMULA_PRESETS[selectedKey] || FORMULA_PRESETS['garch'];

    codeOutput.textContent = '// Parsing Abstract Syntax Tree... Emitting C++20 Eigen Kernel...';
    compileLatency.textContent = 'COMPILING...';

    setTimeout(() => {
      codeOutput.textContent = preset.code;
      compileLatency.textContent = preset.latency;
    }, 250);
  }

  if (formulaSelector) {
    formulaSelector.addEventListener('change', updateFormulaPreset);
  }

  if (btnCompileFormula) {
    btnCompileFormula.addEventListener('click', updateFormulaPreset);
  }

  // 4. System 4: Otaku Bazaar High-Throughput Concurrency Simulator
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
      otakuStatusText.textContent = 'DISPATCHING ATOMIC LUA INVENTORY LOCK [5,000 REQ/S]...';
      otakuStatusText.style.color = '#1C1613';

      if (otakuTelemetryOutput) {
        otakuTelemetryOutput.textContent = '[T+0.02ms] CONCURRENCY_SPIKE: Dispatching 5,000 parallel checkout requests...\n[T+0.05ms] REDIS_POOL: Acquiring atomic inventory lease...\n[T+0.08ms] SKELETON_LOCK: Validating PostgreSQL serialized ledger...';
      }

      setTimeout(() => {
        otakuStatusText.textContent = 'REDIS TTL LOCK ACQUIRED: TOKEN_0x9B4E38 [300s TTL]';
        otakuMetricsDisplay.textContent = 'HMAC-SHA256 SIGNATURE VALIDATED [LATENCY 0.84ms]';
        otakuMetricsDisplay.style.color = '#A2583E';
        if (otakuTelemetryOutput) {
          otakuTelemetryOutput.textContent = `[T+0.12ms] REDIS: EVALSHA lua_reserve_stock KEYS[sku_992] ARGS[1, 300] -> OK\n[T+0.48ms] RAZORPAY_WEBHOOK: payment.captured event payload 2.4KB\n[T+0.84ms] CRYPTO: HMAC_SHA256(raw_body, secret) == x_razorpay_signature [MATCH]\n[T+1.12ms] POSTGRES_ACID: BEGIN; UPDATE inventory SET qty=qty-1; INSERT INTO orders; COMMIT; [OK]`;
        }
      }, 550);

      setTimeout(() => {
        otakuStatusText.textContent = 'TRANSACTION COMMITTED // ZERO-RACE RECONCILIATION';
        otakuStatusText.style.color = '#283325';
        otakuMetricsDisplay.textContent = 'EDGE CACHE HIT: 99.8% | TTFB: 42ms | CONCURRENCY: 5,000 REQ/S';
        otakuMetricsDisplay.style.color = '#483E38';
        btnTriggerCheckout.disabled = false;
        isTesting = false;
      }, 1400);
    });
  }
})();
