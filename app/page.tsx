"use client";

import React, { useState, useEffect } from "react";
import CloudSky from "@/components/CloudSky";
import RoundCarousel from "@/components/RoundCarousel";

export default function HomePage() {
  // Demo switcher state
  const [activeDemo, setActiveDemo] = useState<"otakubazaar" | "risk" | "sentinel">("otakubazaar");
  const [isLoadingDemo, setIsLoadingDemo] = useState<boolean>(false);

  // Quantitative Risk Calculator Interactive State
  const [portfolioValue, setPortfolioValue] = useState<number>(1000000);
  const [confidenceLevel, setConfidenceLevel] = useState<0.95 | 0.99>(0.99);
  const [dailyVol, setDailyVol] = useState<number>(1.85);
  const [horizonDays, setHorizonDays] = useState<number>(1);

  // Legal Modal State
  const [legalModal, setLegalModal] = useState<"tos" | "privacy" | null>(null);

  // Switch demo with simulated skeleton loader state
  const handleSwitchDemo = (demo: "otakubazaar" | "risk" | "sentinel") => {
    if (demo === activeDemo) return;
    setIsLoadingDemo(true);
    setActiveDemo(demo);
    setTimeout(() => {
      setIsLoadingDemo(false);
    }, 450);
  };

  // Parametric Value-at-Risk calculations
  const zScore = confidenceLevel === 0.99 ? 2.326 : 1.645;
  const calculatedVaR = portfolioValue * (dailyVol / 100) * zScore * Math.sqrt(horizonDays);
  const expectedShortfall = calculatedVaR * 1.15;

  return (
    <div style={{ backgroundColor: "#0A0A0A", color: "#E5E5E5", minHeight: "100vh", width: "100%", fontFamily: "Arial, Helvetica, sans-serif" }}>
      
      {/* ====================================================================
          1. HERO SECTION: CLOUDSKY BACKGROUND + FOREGROUND CONTENT
          ==================================================================== */}
      <section
        id="home"
        style={{
          position: "relative",
          width: "100%",
          height: "90vh",
          minHeight: "640px",
          borderBottom: "1px solid #262626",
          overflow: "hidden",
        }}
      >
        {/* Background WebGL canvas wrapper */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <CloudSky
            background="#0A0A0A"
            baseColor="#171717"
            accentColor="#3A3A3A"
            density={85}
            speed={45}
            size={130}
          />
        </div>

        {/* Foreground Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "32px 48px",
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              pointerEvents: "auto",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  color: "#EDEDED",
                  textTransform: "uppercase",
                }}
              >
                JAY BHATT
              </span>
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "11px",
                  color: "#888888",
                  letterSpacing: "0.06em",
                }}
              >
                jaybhatt.me
              </span>
            </div>

            {/* Navigation links */}
            <nav
              style={{
                display: "flex",
                gap: "24px",
                alignItems: "center",
              }}
            >
              <a
                href="#showcase"
                style={{
                  color: "#CCCCCC",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                SHOWCASE
              </a>
              <a
                href="#systems"
                style={{
                  color: "#CCCCCC",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                SYSTEMS
              </a>
              <a
                href="#demos"
                style={{
                  color: "#CCCCCC",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                DEMOS
              </a>
              <a
                href="#contact"
                style={{
                  color: "#CCCCCC",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  backgroundColor: "#161616",
                  border: "1px solid #333333",
                }}
              >
                CONTACT
              </a>
            </nav>
          </div>

          {/* Bottom-left Stark Brutalist Headline & Sub-Metadata Strip */}
          <div style={{ maxWidth: "980px", pointerEvents: "auto" }}>
            <h1
              style={{
                fontSize: "clamp(26px, 4.2vw, 54px)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#FFFFFF",
                margin: "0 0 20px 0",
              }}
            >
              QUANTITATIVE RISK ARCHITECTURE, EMBEDDED SYSTEMS &amp; FULL-STACK ENGINEERING.
            </h1>

            {/* Sub-metadata strip */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px",
                padding: "8px 14px",
                backgroundColor: "#111111",
                border: "1px solid #262626",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#B5B5B5",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              <span>B.TECH CSE // AHMEDABAD UNIVERSITY</span>
              <span style={{ color: "#444444" }}>|</span>
              <span>GOOGLE STUDENT AMBASSADOR</span>
              <span style={{ color: "#444444" }}>|</span>
              <a
                href="https://github.com/Jay888-DARK"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FFFFFF", textDecoration: "none" }}
              >
                GITHUB: JAY888-DARK
              </a>
              <span style={{ color: "#444444" }}>|</span>
              <a
                href="https://www.linkedin.com/in/jay-bhatt-19441637a/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FFFFFF", textDecoration: "none" }}
              >
                LINKEDIN: JAY BHATT
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. 3D SHOWCASE SECTION: ROUNDCAROUSEL + PROJECT LEDGER
          ==================================================================== */}
      <section id="showcase" style={{ borderBottom: "1px solid #262626", backgroundColor: "#0A0A0A" }}>
        {/* Section Header Bar */}
        <div
          style={{
            padding: "24px 48px",
            borderBottom: "1px solid #262626",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.14em",
              color: "#EDEDED",
              textTransform: "uppercase",
            }}
          >
            01 // INTERACTIVE 3D PROJECT RING (DRAG TO ROTATE)
          </div>
          <div style={{ fontSize: "11px", color: "#777777", letterSpacing: "0.08em" }}>
            CYLINDRICAL MATRIX // 3000px PERSPECTIVE
          </div>
        </div>

        {/* CRITICAL HEIGHT RULE: 640px height on parent div to render 3D carousel */}
        <div
          style={{
            width: "100%",
            height: "640px",
            position: "relative",
            borderBottom: "1px solid #262626",
            backgroundColor: "#070707",
          }}
        >
          <RoundCarousel />
        </div>

        {/* 2-Column Architectural Specification Table (Core Engineering Works) */}
        <div style={{ padding: "48px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "#888888",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            [ ARCHITECTURAL PROJECT SPECIFICATION LEDGER ]
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "24px",
            }}
          >
            {/* 01 / OTAKUBAZAAR */}
            <div
              style={{
                backgroundColor: "#111111",
                border: "1px solid #262626",
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#888888", letterSpacing: "0.12em", marginBottom: "6px" }}>
                01 / OTAKUBAZAAR
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#EDEDED", margin: "0 0 10px 0" }}>
                E-Commerce &amp; Escrow Marketplace
              </h3>
              <p style={{ fontSize: "12px", color: "#A0A0A0", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                Brutalist editorial e-commerce and escrow marketplace with single-step guest checkout, Razorpay integration, two-phase settlement commit states, and sub-12ms order processing.
              </p>
              <div style={{ fontSize: "11px", color: "#777777" }}>
                STACK: PostgreSQL // Redis // Node.js // Razorpay API
              </div>
            </div>

            {/* 02 / FINANCIAL RISK ENGINE */}
            <div
              style={{
                backgroundColor: "#111111",
                border: "1px solid #262626",
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#888888", letterSpacing: "0.12em", marginBottom: "6px" }}>
                02 / FINANCIAL RISK ENGINE
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#EDEDED", margin: "0 0 10px 0" }}>
                Parametric GARCH &amp; Monte Carlo Solver
              </h3>
              <p style={{ fontSize: "12px", color: "#A0A0A0", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                Quantitative volatility modeling and portfolio tail-risk analysis using GARCH(1,1) and 100,000-path Monte Carlo simulations with Student-t copula distributions in Python.
              </p>
              <div style={{ fontSize: "11px", color: "#777777" }}>
                STACK: Python // NumPy // Numba JIT // SciPy Optimize
              </div>
            </div>

            {/* 03 / SENTINEL */}
            <div
              style={{
                backgroundColor: "#111111",
                border: "1px solid #262626",
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#888888", letterSpacing: "0.12em", marginBottom: "6px" }}>
                03 / SENTINEL
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#EDEDED", margin: "0 0 10px 0" }}>
                Edge Threat Detection &amp; Packet Entropy
              </h3>
              <p style={{ fontSize: "12px", color: "#A0A0A0", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                AI-powered cyber-threat and anomaly detection architecture running at the network interface via eBPF probes and quantized neural inference. Ranked Top 20 at Ingenious Hackathon 7.0.
              </p>
              <div style={{ fontSize: "11px", color: "#777777" }}>
                STACK: C++20 // eBPF // ONNX Runtime INT8 // Linux Kernel
              </div>
            </div>

            {/* 04 / GNU RADIO ZEROMQ */}
            <div
              style={{
                backgroundColor: "#111111",
                border: "1px solid #262626",
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "10px", color: "#888888", letterSpacing: "0.12em", marginBottom: "6px" }}>
                04 / GNU RADIO ZEROMQ
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#EDEDED", margin: "0 0 10px 0" }}>
                IPv6 Socket Signal Processing Block
              </h3>
              <p style={{ fontSize: "12px", color: "#A0A0A0", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                C++ / Python digital signal processing contribution resolving IPv6 socket handling and multicast streaming bottlenecks in gr-zeromq source and sink blocks for SDR arrays.
              </p>
              <div style={{ fontSize: "11px", color: "#777777" }}>
                STACK: GNU Radio 3.10 // ZeroMQ // IPv6 Multicast // C++
              </div>
            </div>

            {/* 05 / AVR ATMEGA32 & HARD CARBON */}
            <div
              style={{
                backgroundColor: "#111111",
                border: "1px solid #262626",
                padding: "24px",
                gridColumn: "1 / -1",
              }}
            >
              <div style={{ fontSize: "10px", color: "#888888", letterSpacing: "0.12em", marginBottom: "6px" }}>
                05 / AVR ATMEGA32 &amp; HARD CARBON
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#EDEDED", margin: "0 0 10px 0" }}>
                Bare-Metal Microcontroller &amp; Flash Joule Heating Research
              </h3>
              <p style={{ fontSize: "12px", color: "#A0A0A0", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                Bare-metal embedded C microcontroller interfaces for high-temperature precision sensor telemetry, coupled with Flash Joule Heating material transformation research for sustainable battery anode synthesis.
              </p>
              <div style={{ fontSize: "11px", color: "#777777" }}>
                STACK: Embedded C // AVR ATmega32 // SPI/I2C // Industrial Pyrometry
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. SYSTEMS ARCHITECTURE SECTION (#systems)
          ==================================================================== */}
      <section id="systems" style={{ borderBottom: "1px solid #262626", backgroundColor: "#0A0A0A", padding: "48px" }}>
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", color: "#888888", textTransform: "uppercase", marginBottom: "8px" }}>
            [ SECTION 02 // SYSTEMS ARCHITECTURE &amp; DISCIPLINES ]
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 900, textTransform: "uppercase", color: "#FFFFFF", margin: 0 }}>
            Computational Core Competencies
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <div style={{ backgroundColor: "#111111", border: "1px solid #262626", padding: "24px" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#CCCCCC", textTransform: "uppercase", marginBottom: "8px" }}>
              COMPUTATIONAL FINANCE &amp; RISK
            </div>
            <div style={{ fontSize: "12px", color: "#888888", lineHeight: 1.6 }}>
              Parametric volatility engines, dynamic covariance estimation, and non-Gaussian tail risk metrics (VaR, Expected Shortfall) built with vectorized numerical algorithms.
            </div>
          </div>

          <div style={{ backgroundColor: "#111111", border: "1px solid #262626", padding: "24px" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, color: "#CCCCCC", textTransform: "uppercase", marginBottom: "8px" }}>
              EMBEDDED SYSTEMS &amp; SDR
            </div>
            <div style={{ fontSize: "12px", color: "#888888", lineHeight: 1.6 }}>
              Bare-metal firmware design on 8-bit / 32-bit microcontrollers, ZeroMQ zero-copy IPC streaming, and GNU Radio software-defined radio I/Q signal processing.
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. LIVE PRODUCT DEMOS & SKELETON LOADER SECTION (#demos)
          ==================================================================== */}
      <section id="demos" style={{ borderBottom: "1px solid #262626", backgroundColor: "#0A0A0A", padding: "48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", color: "#888888", textTransform: "uppercase", marginBottom: "8px" }}>
              [ SECTION 03 // LIVE PRODUCT DEMOS &amp; WALKTHROUGHS ]
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 900, textTransform: "uppercase", color: "#FFFFFF", margin: 0 }}>
              Interactive System Demonstrators
            </h2>
          </div>

          {/* Demo switcher buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleSwitchDemo("otakubazaar")}
              style={{
                padding: "8px 16px",
                backgroundColor: activeDemo === "otakubazaar" ? "#EDEDED" : "#141414",
                color: activeDemo === "otakubazaar" ? "#0A0A0A" : "#888888",
                border: "1px solid #333333",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              OTAKUBAZAAR DEMO
            </button>
            <button
              onClick={() => handleSwitchDemo("risk")}
              style={{
                padding: "8px 16px",
                backgroundColor: activeDemo === "risk" ? "#EDEDED" : "#141414",
                color: activeDemo === "risk" ? "#0A0A0A" : "#888888",
                border: "1px solid #333333",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              GARCH RISK SIMULATOR
            </button>
            <button
              onClick={() => handleSwitchDemo("sentinel")}
              style={{
                padding: "8px 16px",
                backgroundColor: activeDemo === "sentinel" ? "#EDEDED" : "#141414",
                color: activeDemo === "sentinel" ? "#0A0A0A" : "#888888",
                border: "1px solid #333333",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              SENTINEL eBPF
            </button>
          </div>
        </div>

        {/* Dynamic Skeleton Loader Verification State */}
        {isLoadingDemo ? (
          <div style={{ padding: "40px", backgroundColor: "#111111", border: "1px solid #262626" }}>
            <div className="skeleton-block" style={{ width: "35%", height: "24px", marginBottom: "20px" }} />
            <div className="skeleton-block" style={{ width: "100%", height: "240px", marginBottom: "20px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="skeleton-block" style={{ height: "60px" }} />
              <div className="skeleton-block" style={{ height: "60px" }} />
            </div>
            <div style={{ fontSize: "10px", color: "#666666", letterSpacing: "0.14em", marginTop: "16px" }}>
              [ SYNCHRONIZING ARTIFACT DEMONSTRATOR TELEMETRY ]
            </div>
          </div>
        ) : (
          <div>
            {/* OTAKUBAZAAR DEMO */}
            {activeDemo === "otakubazaar" && (
              <div style={{ backgroundColor: "#111111", border: "1px solid #262626", padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #222222", paddingBottom: "12px" }}>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFFFFF" }}>
                    OTAKUBAZAAR // MULTI-PARTY ESCROW STATE MACHINE DEMO
                  </div>
                  <div style={{ fontSize: "11px", color: "#888888" }}>STATUS: PRODUCTION TESTED</div>
                </div>

                <p style={{ fontSize: "12px", color: "#A0A0A0", lineHeight: 1.6, marginBottom: "24px" }}>
                  Single-step guest checkout pipeline with Razorpay integration and automated 2-phase cryptographic escrow lock.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  <div style={{ backgroundColor: "#0A0A0A", border: "1px solid #262626", padding: "16px" }}>
                    <div style={{ fontSize: "10px", color: "#777777" }}>PHASE 1</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#EDEDED", marginTop: "4px" }}>GUEST CART INIT</div>
                    <div style={{ fontSize: "11px", color: "#888888", marginTop: "2px" }}>Zero-Auth State Lock</div>
                  </div>
                  <div style={{ backgroundColor: "#0A0A0A", border: "1px solid #262626", padding: "16px" }}>
                    <div style={{ fontSize: "10px", color: "#777777" }}>PHASE 2</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#EDEDED", marginTop: "4px" }}>RAZORPAY WEBHOOK</div>
                    <div style={{ fontSize: "11px", color: "#888888", marginTop: "2px" }}>HMAC SHA256 Signature</div>
                  </div>
                  <div style={{ backgroundColor: "#0A0A0A", border: "1px solid #262626", padding: "16px" }}>
                    <div style={{ fontSize: "10px", color: "#777777" }}>PHASE 3</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#EDEDED", marginTop: "4px" }}>ESCROW VAULT LOCK</div>
                    <div style={{ fontSize: "11px", color: "#888888", marginTop: "2px" }}>Redis Redlock Isolation</div>
                  </div>
                  <div style={{ backgroundColor: "#0A0A0A", border: "1px solid #262626", padding: "16px" }}>
                    <div style={{ fontSize: "10px", color: "#777777" }}>PHASE 4</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#EDEDED", marginTop: "4px" }}>POST-DELIVERY RELEASE</div>
                    <div style={{ fontSize: "11px", color: "#888888", marginTop: "2px" }}>ACID Ledger Commit</div>
                  </div>
                </div>
              </div>
            )}

            {/* GARCH RISK SIMULATOR DEMO */}
            {activeDemo === "risk" && (
              <div style={{ backgroundColor: "#111111", border: "1px solid #262626", padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #222222", paddingBottom: "12px" }}>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFFFFF" }}>
                    PARAMETRIC VALUE-AT-RISK (VaR) &amp; STOCHASTIC SOLVER
                  </div>
                  <div style={{ fontSize: "11px", color: "#888888" }}>MODEL: GARCH(1,1) + STUDENT-T</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                  <div>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "10px", color: "#888888", textTransform: "uppercase", marginBottom: "6px" }}>
                        PORTFOLIO VALUE ($ USD)
                      </label>
                      <input
                        type="number"
                        value={portfolioValue}
                        step={100000}
                        onChange={(e) => setPortfolioValue(Math.max(10000, Number(e.target.value)))}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          backgroundColor: "#0A0A0A",
                          border: "1px solid #333333",
                          color: "#EDEDED",
                          fontSize: "13px",
                          fontWeight: 700,
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "10px", color: "#888888", textTransform: "uppercase", marginBottom: "6px" }}>
                        DAILY CONDITIONAL VOLATILITY: {dailyVol.toFixed(2)}%
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.05"
                        value={dailyVol}
                        onChange={(e) => setDailyVol(parseFloat(e.target.value))}
                        style={{ width: "100%", accentColor: "#EDEDED" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "10px", color: "#888888", textTransform: "uppercase", marginBottom: "6px" }}>
                        CONFIDENCE LEVEL
                      </label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => setConfidenceLevel(0.95)}
                          style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor: confidenceLevel === 0.95 ? "#EDEDED" : "#1A1A1A",
                            color: confidenceLevel === 0.95 ? "#0A0A0A" : "#888888",
                            border: "1px solid #333333",
                            fontSize: "11px",
                            fontWeight: 800,
                            cursor: "pointer",
                          }}
                        >
                          95% (1.645 σ)
                        </button>
                        <button
                          onClick={() => setConfidenceLevel(0.99)}
                          style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor: confidenceLevel === 0.99 ? "#EDEDED" : "#1A1A1A",
                            color: confidenceLevel === 0.99 ? "#0A0A0A" : "#888888",
                            border: "1px solid #333333",
                            fontSize: "11px",
                            fontWeight: 800,
                            cursor: "pointer",
                          }}
                        >
                          99% (2.326 σ)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#0A0A0A", border: "1px solid #222222", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "10px", color: "#777777", textTransform: "uppercase" }}>
                        CALCULATED VALUE-AT-RISK (VaR {confidenceLevel * 100}%)
                      </div>
                      <div style={{ fontSize: "32px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.03em", marginTop: "4px" }}>
                        ${Math.round(calculatedVaR).toLocaleString()}
                      </div>
                      <div style={{ fontSize: "11px", color: "#888888", marginTop: "6px" }}>
                        Maximum expected portfolio loss over {horizonDays} trading session(s).
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid #1C1C1C", paddingTop: "14px" }}>
                      <div style={{ fontSize: "10px", color: "#777777", textTransform: "uppercase" }}>
                        EXPECTED SHORTFALL (CVaR)
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: 800, color: "#CCCCCC" }}>
                        ${Math.round(expectedShortfall).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SENTINEL DEMO */}
            {activeDemo === "sentinel" && (
              <div style={{ backgroundColor: "#111111", border: "1px solid #262626", padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #222222", paddingBottom: "12px" }}>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFFFFF" }}>
                    SENTINEL // eBPF PACKET ENTROPY INSPECTION STREAM
                  </div>
                  <div style={{ fontSize: "11px", color: "#888888" }}>INGRESS RATE: 1.2M PKTS/SEC</div>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #333333", color: "#888888" }}>
                        <th style={{ padding: "8px" }}>TIMESTAMP</th>
                        <th style={{ padding: "8px" }}>PROTOCOL</th>
                        <th style={{ padding: "8px" }}>SOURCE</th>
                        <th style={{ padding: "8px" }}>SHANNON ENTROPY</th>
                        <th style={{ padding: "8px" }}>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid #1F1F1F" }}>
                        <td style={{ padding: "8px", color: "#888888" }}>17:10:04.102</td>
                        <td style={{ padding: "8px" }}>TCP TLS 1.3</td>
                        <td style={{ padding: "8px", color: "#AAAAAA" }}>192.168.1.104:443</td>
                        <td style={{ padding: "8px" }}>7.82 bits</td>
                        <td style={{ padding: "8px", fontWeight: 800, color: "#EDEDED" }}>[ XDP_PASS ]</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #1F1F1F", backgroundColor: "#181818" }}>
                        <td style={{ padding: "8px", color: "#888888" }}>17:10:04.108</td>
                        <td style={{ padding: "8px" }}>RAW IPv6</td>
                        <td style={{ padding: "8px", color: "#AAAAAA" }}>[2001:db8::88]:9000</td>
                        <td style={{ padding: "8px", color: "#FFFFFF", fontWeight: 700 }}>7.99 bits</td>
                        <td style={{ padding: "8px", fontWeight: 900, color: "#FFFFFF" }}>[ XDP_DROP ]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ====================================================================
          5. LEGAL & CONTACT FOOTER (#contact)
          ==================================================================== */}
      <footer id="contact" style={{ backgroundColor: "#070707", borderTop: "2px solid #262626", padding: "48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "36px", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", color: "#EDEDED", marginBottom: "8px" }}>
              Jay Bhatt
            </div>
            <div style={{ fontSize: "11px", color: "#777777", lineHeight: 1.6, maxWidth: "300px" }}>
              Computer Science scholar specializing in Finance &amp; Risk Analysis, Embedded Systems, and Web Engineering. Ahmedabad University.
            </div>
          </div>

          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", color: "#888888", textTransform: "uppercase", marginBottom: "12px" }}>
              [ DIRECT COMMUNICATION ]
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href="mailto:jay.b@ahduni.edu.in"
                style={{ color: "#CCCCCC", textDecoration: "none", fontSize: "11px", fontWeight: 700 }}
              >
                EMAIL: jay.b@ahduni.edu.in
              </a>
              <a
                href="https://github.com/Jay888-DARK"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#CCCCCC", textDecoration: "none", fontSize: "11px", fontWeight: 700 }}
              >
                GITHUB: Jay888-DARK
              </a>
              <a
                href="https://www.linkedin.com/in/jay-bhatt-19441637a/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#CCCCCC", textDecoration: "none", fontSize: "11px", fontWeight: 700 }}
              >
                LINKEDIN: Jay Bhatt
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", color: "#888888", textTransform: "uppercase", marginBottom: "12px" }}>
              [ LEGAL &amp; GOVERNANCE ]
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={() => setLegalModal("tos")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#CCCCCC",
                  textAlign: "left",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                TERMS OF SERVICE (TOS)
              </button>
              <button
                onClick={() => setLegalModal("privacy")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#CCCCCC",
                  textAlign: "left",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "Arial, Helvetica, sans-serif",
                }}
              >
                PRIVACY POLICY
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1C1C1C", paddingTop: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", fontSize: "10px", color: "#666666" }}>
          <div>&copy; {new Date().getFullYear()} JAY BHATT. STRICT MONOCHROME ARCHITECTURE.</div>
          <div>0px BORDER RADIUS // NO DROP SHADOWS // ZERO GLASSMORPHISM</div>
        </div>
      </footer>

      {/* Complete Legal Modal (Terms of Service & Privacy Policy) */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(5, 5, 5, 0.94)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setLegalModal(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              maxHeight: "80vh",
              backgroundColor: "#0A0A0A",
              border: "2px solid #E5E5E5",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "16px 20px", backgroundColor: "#141414", borderBottom: "1px solid #333333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", color: "#EDEDED", textTransform: "uppercase" }}>
                [ {legalModal === "tos" ? "TERMS OF SERVICE" : "PRIVACY POLICY"} ]
              </div>
              <button
                onClick={() => setLegalModal(null)}
                style={{
                  padding: "4px 12px",
                  backgroundColor: "#222222",
                  color: "#EDEDED",
                  border: "1px solid #444444",
                  fontSize: "11px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                [ CLOSE ]
              </button>
            </div>

            <div style={{ padding: "28px", overflowY: "auto", fontSize: "12px", lineHeight: 1.7, color: "#B5B5B5" }}>
              {legalModal === "tos" ? (
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: "#FFFFFF", marginBottom: "16px" }}>
                    TERMS OF SERVICE &amp; RESEARCH USE COVENANT
                  </div>
                  <p style={{ marginBottom: "14px" }}>
                    <strong>1. Scope:</strong> This website represents the personal academic portfolio and technical monograph of Jay Bhatt (Ahmedabad University). By accessing this site, you agree to these Terms.
                  </p>
                  <p style={{ marginBottom: "14px" }}>
                    <strong>2. Intellectual Property:</strong> All algorithms, simulation models, and architecture documents are the intellectual property of Jay Bhatt unless governed by open-source licenses referenced in the respective GitHub repositories.
                  </p>
                  <p style={{ marginBottom: "14px" }}>
                    <strong>3. No Investment Advice:</strong> All quantitative finance and risk metrics are for demonstration purposes only and do not constitute financial advice.
                  </p>
                  <p>
                    <strong>4. Contact:</strong> For formal inquiries, reach out to jay.b@ahduni.edu.in.
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: "#FFFFFF", marginBottom: "16px" }}>
                    PRIVACY POLICY &amp; DATA DISCLOSURE
                  </div>
                  <p style={{ marginBottom: "14px" }}>
                    <strong>1. Zero Tracking:</strong> This website does not use tracking cookies, marketing beacons, or third-party behavioral profiling.
                  </p>
                  <p style={{ marginBottom: "14px" }}>
                    <strong>2. Local Sandbox Execution:</strong> All WebGL shaders and financial calculation solvers run strictly on the client device.
                  </p>
                  <p>
                    <strong>3. Inquiries:</strong> Direct data privacy inquiries to jay.b@ahduni.edu.in.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
