/**
 * HIGH-PERFORMANCE GRAPH ANIMATIONS (SENTINEL & RISK ENGINE)
 * Pure HTML5 Canvas 2D • Linear Aggressive Mathematical Drawing
 * Dark Navy & Slate Gray Base • Zero Drop Shadows • Zero Neon • Zero Radar Blips
 * Zero Terminal Fonts ('Plus Jakarta Sans' Used Exclusively)
 */

(function initHighPerformanceGraphs() {
  let triggerSentinelFn = null;
  let triggerRiskFn = null;

  // ==========================================================================
  // 1. SENTINEL: THE THREAT TOPOLOGY GRAPH
  // ==========================================================================
  const sentinelCanvas = document.getElementById('sentinelTopologyCanvas');
  let sentinelObserver = null;
  let sentinelAnimId = null;

  if (sentinelCanvas) {
    const ctx = sentinelCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Structured Grid of Nodes (Cyber Infrastructure)
    const COLS = 8;
    const ROWS = 5;
    const TOTAL_NODES = COLS * ROWS;
    let nodes = [];
    let edges = [];
    let anomalyNodes = new Set();
    let anomalyEdges = [];

    function setupTopology() {
      const rect = sentinelCanvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      sentinelCanvas.width = width * dpr;
      sentinelCanvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const marginX = 48;
      const marginY = 48;
      const stepX = (width - marginX * 2) / (COLS - 1);
      const stepY = (height - marginY * 2) / (ROWS - 1);

      nodes = [];
      edges = [];
      anomalyNodes.clear();
      anomalyEdges = [];

      // Create nodes
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const jitterX = ((idx * 17) % 11 - 5) * 1.5;
          const jitterY = ((idx * 23) % 11 - 5) * 1.5;
          nodes.push({
            id: idx,
            x: marginX + c * stepX + jitterX,
            y: marginY + r * stepY + jitterY,
            isAnomaly: false
          });
        }
      }

      // Designate core anomaly target cluster (nodes 18, 19, 20, 26, 27, 28)
      const targetIndices = [18, 19, 20, 26, 27, 28];
      targetIndices.forEach(idx => {
        if (nodes[idx]) {
          nodes[idx].isAnomaly = true;
          anomalyNodes.add(idx);
        }
      });

      // Create topological mesh edges
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          if (c < COLS - 1) addEdge(idx, idx + 1);
          if (r < ROWS - 1) addEdge(idx, idx + COLS);
          if (c < COLS - 1 && r < ROWS - 1 && (idx % 2 === 0)) addEdge(idx, idx + COLS + 1);
          if (c > 0 && r < ROWS - 1 && (idx % 3 === 0)) addEdge(idx, idx + COLS - 1);
        }
      }
    }

    function addEdge(from, to) {
      const isAnomalyEdge = anomalyNodes.has(from) && anomalyNodes.has(to);
      const edge = { from, to, isAnomalyEdge };
      edges.push(edge);
      if (isAnomalyEdge) {
        anomalyEdges.push(edge);
      }
    }

    let startTime = null;
    const DURATION = 900;
    let hasLocked = false;

    function drawStaticGrid() {
      ctx.clearRect(0, 0, width, height);

      // Dark Navy Surface boundary
      ctx.fillStyle = '#10192A';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#1C2A42';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      // Inactive nodes
      ctx.fillStyle = '#273957';
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.fillRect(Math.round(n.x - 1.5), Math.round(n.y - 1.5), 3, 3);
      }

      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748B';
      ctx.fillText('TOPOLOGY: 40 NODES // LATENCY < 18ms', 16, 22);
      ctx.fillText('STATE: STANDBY', width - 120, 22);
    }

    function renderSentinelFrame(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1.0, elapsed / DURATION);

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#10192A';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#1C2A42';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      // Subtle background node markers
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.fillStyle = '#1E2D4A';
        ctx.fillRect(Math.round(n.x - 1.5), Math.round(n.y - 1.5), 3, 3);
      }

      // Draw mesh edges in sequential bursts
      const edgesToDrawCount = Math.floor(progress * edges.length);
      ctx.strokeStyle = 'rgba(100, 135, 178, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < edgesToDrawCount; i++) {
        const edge = edges[i];
        const n1 = nodes[edge.from];
        const n2 = nodes[edge.to];
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
      }
      ctx.stroke();

      // Sequential packet bursts
      const packetCount = Math.min(12, Math.floor(progress * 16));
      ctx.fillStyle = '#8CA9CE';
      for (let p = 0; p < packetCount; p++) {
        const edgeIdx = (p * 7 + Math.floor(progress * 25)) % edges.length;
        const e = edges[edgeIdx];
        const n1 = nodes[e.from];
        const n2 = nodes[e.to];
        const t = (progress * 5 + p * 0.15) % 1;
        const px = n1.x + (n2.x - n1.x) * t;
        const py = n1.y + (n2.y - n1.y) * t;
        ctx.fillRect(Math.round(px - 1), Math.round(py - 1), 2, 2);
      }

      // Anomaly detection snap
      if (progress >= 0.85) {
        hasLocked = true;

        // Draw anomalous connecting edges in muted terracotta (#D08C6A)
        ctx.strokeStyle = '#D08C6A';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let j = 0; j < anomalyEdges.length; j++) {
          const ae = anomalyEdges[j];
          const n1 = nodes[ae.from];
          const n2 = nodes[ae.to];
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
        }
        ctx.stroke();

        ctx.fillStyle = '#D08C6A';
        anomalyNodes.forEach(idx => {
          const an = nodes[idx];
          ctx.fillRect(Math.round(an.x - 3), Math.round(an.y - 3), 6, 6);
        });

        // Bounding quarantine box
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        anomalyNodes.forEach(idx => {
          const an = nodes[idx];
          if (an.x < minX) minX = an.x;
          if (an.y < minY) minY = an.y;
          if (an.x > maxX) maxX = an.x;
          if (an.y > maxY) maxY = an.y;
        });

        ctx.strokeStyle = '#D08C6A';
        ctx.lineWidth = 1;
        ctx.strokeRect(minX - 12, minY - 12, (maxX - minX) + 24, (maxY - minY) + 24);

        ctx.font = '11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#D08C6A';
        ctx.fillText('[TARGET LOCK // ANOMALY ISOLATED]', minX - 12, minY - 18);
        ctx.fillStyle = '#E2E8F0';
        ctx.fillText('L(x, x̂) = 0.0841 > δ // QUARANTINE: ACTIVE', minX - 12, maxY + 24);
      }

      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('SENTINEL TOPOLOGICAL SCANNER // 40 NODES', 16, 22);
      
      if (hasLocked) {
        ctx.fillStyle = '#D08C6A';
        ctx.fillText('STATE: ANOMALY CONTAINED', width - 180, 22);
      } else {
        ctx.fillStyle = '#64748B';
        ctx.fillText('SCANNING TOPOLOGY...', width - 150, 22);
      }

      if (progress < 1.0 || !hasLocked) {
        sentinelAnimId = requestAnimationFrame(renderSentinelFrame);
      }
    }

    function startSentinelAnimation() {
      if (sentinelAnimId) cancelAnimationFrame(sentinelAnimId);
      setupTopology();
      startTime = null;
      hasLocked = false;
      sentinelAnimId = requestAnimationFrame(renderSentinelFrame);
    }

    function resetSentinelAnimation() {
      if (sentinelAnimId) cancelAnimationFrame(sentinelAnimId);
      sentinelAnimId = null;
      startTime = null;
      hasLocked = false;
      drawStaticGrid();
    }

    setupTopology();
    drawStaticGrid();

    sentinelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startSentinelAnimation();
        } else {
          resetSentinelAnimation();
        }
      });
    }, { threshold: 0.25 });

    triggerSentinelFn = startSentinelAnimation;
    sentinelObserver.observe(sentinelCanvas);

    window.addEventListener('resize', () => {
      setupTopology();
      if (!startTime) drawStaticGrid();
    });
  }

  // ==========================================================================
  // 2. RISK ENGINE: MONTE CARLO SIMULATION BURST
  // ==========================================================================
  const riskCanvas = document.getElementById('riskMonteCarloCanvas');
  let riskObserver = null;
  let riskAnimId = null;

  if (riskCanvas) {
    const ctx = riskCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const NUM_PATHS = 500;
    const TIME_STEPS = 100;
    let precomputedPaths = [];
    let var99Path = null;
    let finalPrices = [];

    function generateMonteCarloPaths() {
      precomputedPaths = [];
      finalPrices = [];

      let seed = 42;
      function pseudoRandom() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      }

      function gaussianNoise() {
        let u = 0, v = 0;
        while (u === 0) u = pseudoRandom();
        while (v === 0) v = pseudoRandom();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      }

      const initialPrice = 1.0000;
      const baseVol = 0.16;
      const dt = 1 / 252;
      const drift = 0.02;

      const alpha = 0.085;
      const beta = 0.900;
      const longTermVar = Math.pow(baseVol, 2);
      const omega = longTermVar * (1 - (alpha + beta));

      for (let p = 0; p < NUM_PATHS; p++) {
        const path = new Float32Array(TIME_STEPS + 1);
        path[0] = initialPrice;
        let currentVar = longTermVar;

        for (let t = 1; t <= TIME_STEPS; t++) {
          const z = gaussianNoise();
          const sigma = Math.sqrt(currentVar);
          const ret = (drift - 0.5 * currentVar) * dt + sigma * Math.sqrt(dt) * z;
          const nextPrice = path[t - 1] * Math.exp(ret);
          path[t] = nextPrice;

          const shock = Math.pow(nextPrice - path[t - 1], 2);
          currentVar = omega + alpha * shock + beta * currentVar;
        }

        precomputedPaths.push(path);
        finalPrices.push({ index: p, price: path[TIME_STEPS] });
      }

      finalPrices.sort((a, b) => a.price - b.price);
      const var99Index = finalPrices[Math.floor(NUM_PATHS * 0.01)].index;
      var99Path = precomputedPaths[var99Index];
    }

    generateMonteCarloPaths();

    function resizeRiskCanvas() {
      const rect = riskCanvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      riskCanvas.width = width * dpr;
      riskCanvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    const padL = 60;
    const padR = 30;
    const padT = 40;
    const padB = 40;
    const minY = 0.78;
    const maxY = 1.25;

    function toCoordX(step) {
      return padL + (step / TIME_STEPS) * (width - padL - padR);
    }

    function toCoordY(price) {
      const norm = (price - minY) / (maxY - minY);
      return (height - padB) - norm * (height - padT - padB);
    }

    function drawCartesianAxes() {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#10192A';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#1C2A42';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748B';
      ctx.strokeStyle = '#162238';
      ctx.lineWidth = 1;

      const yTicks = [0.80, 0.90, 1.00, 1.10, 1.20];
      yTicks.forEach(val => {
        const yPos = toCoordY(val);
        ctx.beginPath();
        ctx.moveTo(padL, yPos);
        ctx.lineTo(width - padR, yPos);
        ctx.stroke();
        ctx.fillText(val.toFixed(2), 18, yPos + 4);
      });

      const base0Y = toCoordY(1.00);
      ctx.strokeStyle = '#273957';
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(padL, base0Y);
      ctx.lineTo(width - padR, base0Y);
      ctx.stroke();
      ctx.setLineDash([]);

      const xTicks = [0, 25, 50, 75, 100];
      xTicks.forEach(step => {
        const xPos = toCoordX(step);
        ctx.beginPath();
        ctx.moveTo(xPos, height - padB);
        ctx.lineTo(xPos, padT);
        ctx.stroke();
        ctx.fillText(`T=${step}`, xPos - 12, height - padB + 18);
      });

      ctx.fillText('CARTESIAN MATRIX: GARCH(1,1) SIMULATION [500 PATHS]', padL, 22);
      ctx.fillText('STATE: READY', width - 110, 22);
    }

    let riskStartTime = null;
    const RISK_DURATION = 1500;
    let isFinished = false;

    function renderRiskFrame(timestamp) {
      if (!riskStartTime) riskStartTime = timestamp;
      const elapsed = timestamp - riskStartTime;
      const progress = Math.min(1.0, elapsed / RISK_DURATION);

      drawCartesianAxes();

      const currentStep = Math.max(1, Math.floor(progress * TIME_STEPS));

      // Draw background paths in refined steel slate
      ctx.strokeStyle = 'rgba(100, 135, 178, 0.12)';
      ctx.lineWidth = 1;

      for (let p = 0; p < NUM_PATHS; p++) {
        const path = precomputedPaths[p];
        ctx.beginPath();
        ctx.moveTo(toCoordX(0), toCoordY(path[0]));
        for (let s = 1; s <= currentStep; s++) {
          ctx.lineTo(toCoordX(s), toCoordY(path[s]));
        }
        ctx.stroke();
      }

      // Highlight 99% VaR Path
      if (progress >= 1.0 && var99Path) {
        isFinished = true;

        ctx.strokeStyle = '#D08C6A';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(toCoordX(0), toCoordY(var99Path[0]));
        for (let s = 1; s <= TIME_STEPS; s++) {
          ctx.lineTo(toCoordX(s), toCoordY(var99Path[s]));
        }
        ctx.stroke();

        const finalX = toCoordX(TIME_STEPS);
        const finalY = toCoordY(var99Path[TIME_STEPS]);
        ctx.fillStyle = '#D08C6A';
        ctx.fillRect(Math.round(finalX - 3), Math.round(finalY - 3), 6, 6);

        ctx.font = '11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#D08C6A';
        ctx.fillText('SLASHED: 99% VALUE AT RISK (VaR) -> -3.42%', finalX - 290, finalY - 10);

        ctx.font = '11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#E2E8F0';
        ctx.fillText('N=500 SIMULATED PATHS CONVERGED // PERSISTENCE: 0.985', padL, height - padB - 14);

        ctx.fillStyle = '#8CA9CE';
        ctx.fillText('STATE: 99% VaR COMPUTED', width - 180, 22);
      } else {
        ctx.font = '11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#64748B';
        ctx.fillText(`SIMULATING: STEP ${currentStep}/${TIME_STEPS} [PATHS: 500]`, width - 240, 22);
      }

      if (progress < 1.0 || !isFinished) {
        riskAnimId = requestAnimationFrame(renderRiskFrame);
      }
    }

    function startRiskAnimation() {
      if (riskAnimId) cancelAnimationFrame(riskAnimId);
      resizeRiskCanvas();
      riskStartTime = null;
      isFinished = false;
      riskAnimId = requestAnimationFrame(renderRiskFrame);
    }

    function resetRiskAnimation() {
      if (riskAnimId) cancelAnimationFrame(riskAnimId);
      riskAnimId = null;
      riskStartTime = null;
      isFinished = false;
      drawCartesianAxes();
    }

    resizeRiskCanvas();
    drawCartesianAxes();

    riskObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startRiskAnimation();
        } else {
          resetRiskAnimation();
        }
      });
    }, { threshold: 0.25 });

    triggerRiskFn = startRiskAnimation;
    riskObserver.observe(riskCanvas);

    window.addEventListener('resize', () => {
      resizeRiskCanvas();
      if (!riskStartTime) drawCartesianAxes();
    });
  }

  window.HighPerformanceGraphs = {
    triggerSentinel: () => {
      if (triggerSentinelFn) triggerSentinelFn();
    },
    triggerRisk: () => {
      if (triggerRiskFn) triggerRiskFn();
    }
  };
})();
