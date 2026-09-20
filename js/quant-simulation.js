/**
 * INTERACTIVE QUANTITATIVE SIMULATION MODULE
 * Implements GARCH(1,1) Conditional Volatility and Monte Carlo FX Simulation
 * on HTML5 Canvas with real-time parameter tuning.
 */

(function initQuantSimulation() {
  const canvas = document.getElementById('quantSimulationCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Sliders & Controls
  const volSlider = document.getElementById('sliderVol');
  const volVal = document.getElementById('valVol');
  const driftSlider = document.getElementById('sliderDrift');
  const driftVal = document.getElementById('valDrift');
  const iterSlider = document.getElementById('sliderIter');
  const iterVal = document.getElementById('valIter');
  const btnRun = document.getElementById('btnRunSimulation');

  // Stats outputs
  const statExpectedRate = document.getElementById('statExpectedRate');
  const statVaR95 = document.getElementById('statVaR95');
  const statVaR99 = document.getElementById('statVaR99');
  const statPersistence = document.getElementById('statPersistence');

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  // Box-Muller Gaussian Random Generator
  function randomNormal() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  function runSimulation() {
    resizeCanvas();

    const baseVol = parseFloat(volSlider.value) / 100; // e.g. 0.14
    const drift = parseFloat(driftSlider.value) / 100; // e.g. 0.03
    const numPaths = parseInt(iterSlider.value); // e.g. 150
    const timeSteps = 100;
    const initialPrice = 1.0850; // EUR/USD FX benchmark
    const dt = 1 / 252; // Daily time step

    // GARCH(1,1) Parameters: sigma^2_t = omega + alpha * eps^2_{t-1} + beta * sigma^2_{t-1}
    const alpha = 0.08;
    const beta = 0.90;
    const persistence = alpha + beta; // 0.98
    const longTermVar = Math.pow(baseVol, 2);
    const omega = longTermVar * (1 - persistence);

    const paths = [];
    const finalPrices = [];

    // Generate paths
    for (let p = 0; p < numPaths; p++) {
      const path = [initialPrice];
      let currentVariance = longTermVar;

      for (let t = 1; t < timeSteps; t++) {
        const z = randomNormal();
        const currentSigma = Math.sqrt(currentVariance);
        
        // Log return: r_t = (mu - 0.5 * sigma^2) * dt + sigma * sqrt(dt) * z
        const logReturn = (drift - 0.5 * currentVariance) * dt + currentSigma * Math.sqrt(dt) * z;
        const nextPrice = path[t - 1] * Math.exp(logReturn);
        path.push(nextPrice);

        // GARCH(1,1) update
        const shock = Math.pow(nextPrice - path[t - 1], 2);
        currentVariance = omega + alpha * shock + beta * currentVariance;
      }
      paths.push(path);
      finalPrices.push(path[timeSteps - 1]);
    }

    // Sort final prices for VaR calculation
    finalPrices.sort((a, b) => a - b);
    const idx95 = Math.floor(numPaths * 0.05);
    const idx99 = Math.floor(numPaths * 0.01);
    const var95Price = finalPrices[idx95];
    const var99Price = finalPrices[idx99];
    const meanFinalPrice = finalPrices.reduce((acc, v) => acc + v, 0) / numPaths;

    const var95Pct = ((var95Price - initialPrice) / initialPrice) * 100;
    const var99Pct = ((var99Price - initialPrice) / initialPrice) * 100;

    // Update UI Stats
    if (statExpectedRate) statExpectedRate.textContent = meanFinalPrice.toFixed(4);
    if (statVaR95) statVaR95.textContent = `${var95Pct.toFixed(2)}%`;
    if (statVaR99) statVaR99.textContent = `${var99Pct.toFixed(2)}%`;
    if (statPersistence) statPersistence.textContent = `${persistence.toFixed(2)} (Strong)`;

    // Render Canvas
    drawChart(paths, timeSteps, initialPrice, var95Price, var99Price, meanFinalPrice);
  }

  function drawChart(paths, timeSteps, initialPrice, var95Price, var99Price, meanFinalPrice) {
    ctx.clearRect(0, 0, width, height);

    // Determine scale limits
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    paths.forEach(path => {
      path.forEach(val => {
        if (val < minPrice) minPrice = val;
        if (val > maxPrice) maxPrice = val;
      });
    });

    // Add 8% padding
    const range = maxPrice - minPrice || 0.01;
    const yMin = minPrice - range * 0.08;
    const yMax = maxPrice + range * 0.08;

    const paddingLeft = 60;
    const paddingRight = 20;
    const paddingTop = 25;
    const paddingBottom = 30;
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    function getX(step) {
      return paddingLeft + (step / (timeSteps - 1)) * chartWidth;
    }

    function getY(val) {
      return paddingTop + (1 - (val - yMin) / (yMax - yMin)) * chartHeight;
    }

    // Grid lines & labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748B';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';

    const numGridLines = 5;
    for (let i = 0; i <= numGridLines; i++) {
      const priceVal = yMin + (i / numGridLines) * (yMax - yMin);
      const y = getY(priceVal);
      
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();

      ctx.fillText(priceVal.toFixed(4), paddingLeft - 8, y + 3);
    }

    // Baseline (Initial Price) line
    const initY = getY(initialPrice);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(paddingLeft, initY);
    ctx.lineTo(width - paddingRight, initY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw individual Monte Carlo stochastic paths
    ctx.lineWidth = 1;
    paths.forEach((path, idx) => {
      ctx.beginPath();
      // Alternating cyan/violet gradients
      const isCyan = idx % 2 === 0;
      ctx.strokeStyle = isCyan ? 'rgba(0, 240, 255, 0.12)' : 'rgba(112, 0, 255, 0.14)';

      path.forEach((val, step) => {
        const x = getX(step);
        const y = getY(val);
        if (step === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    // Compute and draw 95% confidence cone envelope
    const upper95 = [];
    const lower95 = [];
    const meanPath = [];

    for (let t = 0; t < timeSteps; t++) {
      const stepVals = paths.map(p => p[t]).sort((a, b) => a - b);
      lower95.push(stepVals[Math.floor(paths.length * 0.05)]);
      upper95.push(stepVals[Math.floor(paths.length * 0.95)]);
      meanPath.push(stepVals.reduce((a, b) => a + b, 0) / paths.length);
    }

    // Fill Confidence Area
    ctx.fillStyle = 'rgba(0, 240, 255, 0.04)';
    ctx.beginPath();
    for (let t = 0; t < timeSteps; t++) {
      const x = getX(t);
      const y = getY(upper95[t]);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    for (let t = timeSteps - 1; t >= 0; t--) {
      const x = getX(t);
      const y = getY(lower95[t]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    // Draw 95% Volatility Cone borders
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    
    // Upper
    ctx.beginPath();
    upper95.forEach((val, t) => {
      const x = getX(t);
      const y = getY(val);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Lower
    ctx.beginPath();
    lower95.forEach((val, t) => {
      const x = getX(t);
      const y = getY(val);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Mean Trajectory (Electric Cyan Solid)
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    meanPath.forEach((val, t) => {
      const x = getX(t);
      const y = getY(val);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Annotations
    ctx.fillStyle = '#00F0FF';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`E[S_T] = ${meanFinalPrice.toFixed(4)}`, width - paddingRight, getY(meanFinalPrice) - 8);
  }

  // Event Listeners
  if (volSlider && volVal) {
    volSlider.addEventListener('input', () => {
      volVal.textContent = `${volSlider.value}%`;
      runSimulation();
    });
  }

  if (driftSlider && driftVal) {
    driftSlider.addEventListener('input', () => {
      driftVal.textContent = `${driftSlider.value}%`;
      runSimulation();
    });
  }

  if (iterSlider && iterVal) {
    iterSlider.addEventListener('input', () => {
      iterVal.textContent = iterSlider.value;
      runSimulation();
    });
  }

  if (btnRun) {
    btnRun.addEventListener('click', runSimulation);
  }

  window.addEventListener('resize', runSimulation);

  // Initial Run
  setTimeout(runSimulation, 100);
})();
