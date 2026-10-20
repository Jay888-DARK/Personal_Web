"use client";

import React, { useState } from "react";
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
    }, 380);
  };

  // Parametric Value-at-Risk calculations
  const zScore = confidenceLevel === 0.99 ? 2.326 : 1.645;
  const calculatedVaR = portfolioValue * (dailyVol / 100) * zScore * Math.sqrt(horizonDays);
  const expectedShortfall = calculatedVaR * 1.15;

  return (
    <div
      style={{
        backgroundColor: "var(--bg-canvas, #14150E)",
        color: "var(--text-primary, #F4F3EF)",
        minHeight: "100vh",
        width: "100%",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
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
          borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
          overflow: "hidden",
        }}
      >
        {/* Background WebGL canvas wrapper (Organic Industrial Deep Loam & Olive Charcoal Smoke) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <CloudSky
            background="#14150E"
            baseColor="#1E2015"
            accentColor="#2F3020"
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
          {/* Top Bar: Full-Width Smoked Olive-Charcoal Glass Container */}
          <header
            style={{
              width: "100%",
              pointerEvents: "auto",
              backgroundColor: "var(--glass-elevated, rgba(47, 48, 32, 0.78))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
              padding: "12px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
              borderRadius: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  color: "var(--text-primary, #F4F3EF)",
                  textTransform: "uppercase",
                }}
              >
                JAY BHATT
              </span>
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "11px",
                  color: "var(--text-muted, #9A99A2)",
                  letterSpacing: "0.06em",
                }}
              >
                jaybhatt.me
              </span>
            </div>

            {/* Navigation links & Contact Button */}
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
                  color: "var(--text-secondary, #CDCBD6)",
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
                  color: "var(--text-secondary, #CDCBD6)",
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
                  color: "var(--text-secondary, #CDCBD6)",
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
                  color: "#14150E",
                  backgroundColor: "var(--accent-terracotta, #D96846)",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  border: "1px solid var(--accent-terracotta, #D96846)",
                  borderRadius: 0,
                }}
              >
                CONTACT
              </a>
            </nav>
          </header>

          {/* Bottom Stark Brutalist Headline & Hero Metadata Ticker */}
          <div style={{ maxWidth: "1020px", pointerEvents: "auto" }}>
            <h1
              style={{
                fontSize: "clamp(26px, 4.2vw, 54px)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "var(--text-primary, #F4F3EF)",
                margin: "0 0 20px 0",
              }}
            >
              QUANTITATIVE RISK ARCHITECTURE, EMBEDDED SYSTEMS &amp; FULL-STACK ENGINEERING.
            </h1>

            {/* Hero Metadata Ticker Bar: Smoked Olive-Charcoal Glass */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px",
                padding: "10px 18px",
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--text-secondary, #CDCBD6)",
                textTransform: "uppercase",
                width: "fit-content",
                borderRadius: 0,
              }}
            >
              <span>
                B.TECH CSE <span style={{ color: "var(--accent-terracotta, #D96846)" }}>//</span> AHMEDABAD UNIVERSITY
              </span>
              <span style={{ color: "var(--glass-border, rgba(205, 203, 214, 0.2))" }}>|</span>
              <span>GOOGLE STUDENT AMBASSADOR</span>
              <span style={{ color: "var(--glass-border, rgba(205, 203, 214, 0.2))" }}>|</span>
              <a
                href="https://github.com/Jay888-DARK"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-primary, #F4F3EF)", textDecoration: "none" }}
              >
                GITHUB: <span style={{ color: "var(--accent-terracotta, #D96846)" }}>JAY888-DARK</span>
              </a>
              <span style={{ color: "var(--glass-border, rgba(205, 203, 214, 0.2))" }}>|</span>
              <a
                href="https://www.linkedin.com/in/jay-bhatt-19441637a/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-primary, #F4F3EF)", textDecoration: "none" }}
              >
                LINKEDIN: <span style={{ color: "var(--accent-terracotta, #D96846)" }}>JAY BHATT</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. 3D SHOWCASE SECTION: ROUNDCAROUSEL + PROJECT LEDGER
          ==================================================================== */}
      <section
        id="showcase"
        style={{
          borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
          backgroundColor: "var(--bg-canvas, #14150E)",
        }}
      >
        {/* Section Header Bar */}
        <div
          style={{
            padding: "20px 48px",
            borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            backgroundColor: "var(--glass-elevated, rgba(47, 48, 32, 0.78))",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.14em",
              color: "var(--text-primary, #F4F3EF)",
              textTransform: "uppercase",
            }}
          >
            01 <span style={{ color: "var(--accent-terracotta, #D96846)" }}>//</span> INTERACTIVE 3D PROJECT RING (DRAG TO ROTATE)
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)", letterSpacing: "0.08em" }}>
            CYLINDRICAL MATRIX <span style={{ color: "var(--accent-terracotta, #D96846)" }}>//</span> 3000px PERSPECTIVE
          </div>
        </div>

        {/* CRITICAL HEIGHT RULE: 640px height on parent div to render 3D carousel */}
        <div
          style={{
            width: "100%",
            height: "640px",
            position: "relative",
            borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
            backgroundColor: "transparent",
          }}
        >
          <RoundCarousel />
        </div>

        {/* 2-Column Architectural Project Specification Ledger */}
        <div style={{ padding: "48px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "var(--accent-terracotta, #D96846)",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            [ ARCHITECTURAL PROJECT SPECIFICATION LEDGER ]
          </div>

          {/* Strict 2-Column Grid */}
          <div
            className="ledger-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
          >
            {/* 01 / OTAKUBAZAAR */}
            <div
              style={{
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--accent-terracotta, #D96846)",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                01 / OTAKUBAZAAR
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text-primary, #F4F3EF)",
                  margin: "0 0 10px 0",
                }}
              >
                E-Commerce &amp; Escrow Marketplace
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary, #CDCBD6)",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                }}
              >
                Brutalist editorial e-commerce and escrow marketplace with single-step guest checkout, Razorpay integration, two-phase settlement commit states, and sub-12ms order processing.
              </p>
              <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)" }}>
                <span style={{ color: "var(--accent-terracotta, #D96846)", fontWeight: 800 }}>STACK:</span> PostgreSQL{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Redis{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Node.js{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Razorpay API
              </div>
            </div>

            {/* 02 / FINANCIAL RISK ENGINE */}
            <div
              style={{
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--accent-terracotta, #D96846)",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                02 / FINANCIAL RISK ENGINE
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text-primary, #F4F3EF)",
                  margin: "0 0 10px 0",
                }}
              >
                Parametric GARCH &amp; Monte Carlo Solver
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary, #CDCBD6)",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                }}
              >
                Quantitative volatility modeling and portfolio tail-risk analysis using GARCH(1,1) and 100,000-path Monte Carlo simulations with Student-t copula distributions in Python.
              </p>
              <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)" }}>
                <span style={{ color: "var(--accent-terracotta, #D96846)", fontWeight: 800 }}>STACK:</span> Python{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> NumPy{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Numba JIT{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> SciPy Optimize
              </div>
            </div>

            {/* 03 / SENTINEL */}
            <div
              style={{
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--accent-terracotta, #D96846)",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                03 / SENTINEL
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text-primary, #F4F3EF)",
                  margin: "0 0 10px 0",
                }}
              >
                Edge Threat Detection &amp; Packet Entropy
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary, #CDCBD6)",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                }}
              >
                AI-powered cyber-threat and anomaly detection architecture running at the network interface via eBPF probes and quantized neural inference. Ranked Top 20 at Ingenious Hackathon 7.0.
              </p>
              <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)" }}>
                <span style={{ color: "var(--accent-terracotta, #D96846)", fontWeight: 800 }}>STACK:</span> C++20{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> eBPF{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> ONNX Runtime INT8{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Linux Kernel
              </div>
            </div>

            {/* 04 / GNU RADIO ZEROMQ */}
            <div
              style={{
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--accent-terracotta, #D96846)",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                04 / GNU RADIO ZEROMQ
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text-primary, #F4F3EF)",
                  margin: "0 0 10px 0",
                }}
              >
                IPv6 Socket Signal Processing Block
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary, #CDCBD6)",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                }}
              >
                C++ / Python digital signal processing contribution resolving IPv6 socket handling and multicast streaming bottlenecks in gr-zeromq source and sink blocks for SDR arrays.
              </p>
              <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)" }}>
                <span style={{ color: "var(--accent-terracotta, #D96846)", fontWeight: 800 }}>STACK:</span> GNU Radio 3.10{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> ZeroMQ{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> IPv6 Multicast{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> C++
              </div>
            </div>

            {/* 05 / FLASH JOULE HARD CARBON */}
            <div
              style={{
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--accent-terracotta, #D96846)",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                05 / FLASH JOULE HARD CARBON
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text-primary, #F4F3EF)",
                  margin: "0 0 10px 0",
                }}
              >
                High-Throughput Biomass Anode Synthesis
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary, #CDCBD6)",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                }}
              >
                Millisecond electro-thermal Flash Joule Heating transforming biomass into hard carbon battery anodes with 312 mAh/g capacity for sodium-ion energy storage (IITGN Ideathon).
              </p>
              <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)" }}>
                <span style={{ color: "var(--accent-terracotta, #D96846)", fontWeight: 800 }}>STACK:</span> Process Modeling{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Pulse Power Circuitry{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Industrial Pyrometry
              </div>
            </div>

            {/* 06 / AVR ATMEGA32 TELEMETRY */}
            <div
              style={{
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--accent-terracotta, #D96846)",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                06 / AVR ATMEGA32 TELEMETRY
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text-primary, #F4F3EF)",
                  margin: "0 0 10px 0",
                }}
              >
                Bare-Metal Microcontroller &amp; Hardware Telemetry
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary, #CDCBD6)",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                }}
              >
                Direct register-level C firmware interfacing multi-channel 10-bit ADC conversion, Timer0 PWM waveforms, SPI bus communications, and high-precision sensor telemetry.
              </p>
              <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)" }}>
                <span style={{ color: "var(--accent-terracotta, #D96846)", fontWeight: 800 }}>STACK:</span> Embedded C{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> AVR ATmega32{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Timers/PWM{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> ADC Telemetry
              </div>
            </div>

            {/* 07 / DARE TO SIP POP-UP */}
            <div
              style={{
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--accent-terracotta, #D96846)",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                07 / DARE TO SIP POP-UP
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text-primary, #F4F3EF)",
                  margin: "0 0 10px 0",
                }}
              >
                Gamified Physical Commerce &amp; Unit Economics
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary, #CDCBD6)",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                }}
              >
                High-throughput live campus retail prototype stress-testing dynamic pricing curves, inventory velocity algorithms, and rapid fulfillment pipelines over 48 hours.
              </p>
              <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)" }}>
                <span style={{ color: "var(--accent-terracotta, #D96846)", fontWeight: 800 }}>STACK:</span> Unit Economics{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Dynamic Pricing{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Operations Logistics
              </div>
            </div>

            {/* 08 / ANSYS TENSILE FEA */}
            <div
              style={{
                backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--accent-terracotta, #D96846)",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                08 / ANSYS TENSILE FEA
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text-primary, #F4F3EF)",
                  margin: "0 0 10px 0",
                }}
              >
                Computational Solid Mechanics &amp; Stress Solver
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary, #CDCBD6)",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                }}
              >
                Non-linear finite element structural analysis verifying Von Mises stress concentrations, plastic deformation boundaries, and mesh convergence under axial tensile loads.
              </p>
              <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)" }}>
                <span style={{ color: "var(--accent-terracotta, #D96846)", fontWeight: 800 }}>STACK:</span> ANSYS Workbench{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Static Structural{" "}
                <span style={{ color: "var(--accent-olive, #596235)" }}>//</span> Von Mises Solvers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. SYSTEMS ARCHITECTURE SECTION (#systems)
          ==================================================================== */}
      <section
        id="systems"
        style={{
          borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
          backgroundColor: "var(--bg-canvas, #14150E)",
          padding: "48px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "var(--accent-terracotta, #D96846)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            [ SECTION 02 // SYSTEMS ARCHITECTURE &amp; DISCIPLINES ]
          </div>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "var(--text-primary, #F4F3EF)",
              margin: 0,
            }}
          >
            Computational Core Competencies
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <div
            style={{
              backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
              padding: "24px",
              borderRadius: 0,
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--accent-terracotta, #D96846)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              COMPUTATIONAL FINANCE &amp; RISK
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary, #CDCBD6)", lineHeight: 1.6 }}>
              Parametric volatility engines, dynamic covariance estimation, and non-Gaussian tail risk metrics (VaR, Expected Shortfall) built with vectorized numerical algorithms in Python and Numba.
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
              padding: "24px",
              borderRadius: 0,
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--accent-terracotta, #D96846)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              EMBEDDED SYSTEMS &amp; SDR
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary, #CDCBD6)", lineHeight: 1.6 }}>
              Bare-metal firmware design on 8-bit / 32-bit microcontrollers, ZeroMQ zero-copy IPC streaming, and GNU Radio software-defined radio I/Q digital signal processing blocks.
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. LIVE PRODUCT DEMOS & SKELETON LOADER SECTION (#demos)
          ==================================================================== */}
      <section
        id="demos"
        style={{
          borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
          backgroundColor: "var(--bg-canvas, #14150E)",
          padding: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                color: "var(--accent-terracotta, #D96846)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              [ SECTION 03 // LIVE PRODUCT DEMOS &amp; WALKTHROUGHS ]
            </div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "var(--text-primary, #F4F3EF)",
                margin: 0,
              }}
            >
              Interactive System Demonstrators
            </h2>
          </div>

          {/* Demo switcher buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleSwitchDemo("otakubazaar")}
              style={{
                padding: "8px 16px",
                backgroundColor: activeDemo === "otakubazaar" ? "var(--accent-terracotta, #D96846)" : "rgba(47, 48, 32, 0.58)",
                color: activeDemo === "otakubazaar" ? "#14150E" : "var(--text-secondary, #CDCBD6)",
                border: activeDemo === "otakubazaar" ? "1px solid var(--accent-terracotta, #D96846)" : "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
                borderRadius: 0,
              }}
            >
              OTAKUBAZAAR DEMO
            </button>
            <button
              onClick={() => handleSwitchDemo("risk")}
              style={{
                padding: "8px 16px",
                backgroundColor: activeDemo === "risk" ? "var(--accent-terracotta, #D96846)" : "rgba(47, 48, 32, 0.58)",
                color: activeDemo === "risk" ? "#14150E" : "var(--text-secondary, #CDCBD6)",
                border: activeDemo === "risk" ? "1px solid var(--accent-terracotta, #D96846)" : "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
                borderRadius: 0,
              }}
            >
              GARCH RISK SIMULATOR
            </button>
            <button
              onClick={() => handleSwitchDemo("sentinel")}
              style={{
                padding: "8px 16px",
                backgroundColor: activeDemo === "sentinel" ? "var(--accent-terracotta, #D96846)" : "rgba(47, 48, 32, 0.58)",
                color: activeDemo === "sentinel" ? "#14150E" : "var(--text-secondary, #CDCBD6)",
                border: activeDemo === "sentinel" ? "1px solid var(--accent-terracotta, #D96846)" : "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
                borderRadius: 0,
              }}
            >
              SENTINEL eBPF
            </button>
          </div>
        </div>

        {/* Dynamic Skeleton Loader Verification State */}
        {isLoadingDemo ? (
          <div
            style={{
              padding: "40px",
              backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
            }}
          >
            <div className="skeleton-block" style={{ width: "35%", height: "24px", marginBottom: "20px" }} />
            <div className="skeleton-block" style={{ width: "100%", height: "240px", marginBottom: "20px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="skeleton-block" style={{ height: "60px" }} />
              <div className="skeleton-block" style={{ height: "60px" }} />
            </div>
            <div style={{ fontSize: "10px", color: "var(--accent-terracotta, #D96846)", letterSpacing: "0.14em", marginTop: "16px", fontWeight: 700 }}>
              [ SYNCHRONIZING ARTIFACT DEMONSTRATOR TELEMETRY ]
            </div>
          </div>
        ) : (
          <div>
            {/* OTAKUBAZAAR DEMO */}
            {activeDemo === "otakubazaar" && (
              <div
                style={{
                  backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                  padding: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                    borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                    paddingBottom: "12px",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary, #F4F3EF)" }}>
                    OTAKUBAZAAR <span style={{ color: "var(--accent-terracotta, #D96846)" }}>//</span> MULTI-PARTY ESCROW STATE MACHINE DEMO
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--accent-terracotta, #D96846)", fontWeight: 700 }}>
                    STATUS: PRODUCTION TESTED
                  </div>
                </div>

                <p style={{ fontSize: "12px", color: "var(--text-secondary, #CDCBD6)", lineHeight: 1.6, marginBottom: "24px" }}>
                  Single-step guest checkout pipeline with Razorpay integration and automated 2-phase cryptographic escrow lock.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  <div
                    style={{
                      backgroundColor: "var(--bg-surface-solid, #1E2015)",
                      border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontSize: "10px", color: "var(--accent-terracotta, #D96846)", fontWeight: 700 }}>PHASE 1</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-primary, #F4F3EF)", marginTop: "4px" }}>GUEST CART INIT</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)", marginTop: "2px" }}>Zero-Auth State Lock</div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "var(--bg-surface-solid, #1E2015)",
                      border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontSize: "10px", color: "var(--accent-terracotta, #D96846)", fontWeight: 700 }}>PHASE 2</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-primary, #F4F3EF)", marginTop: "4px" }}>RAZORPAY WEBHOOK</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)", marginTop: "2px" }}>HMAC SHA256 Signature</div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "var(--bg-surface-solid, #1E2015)",
                      border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontSize: "10px", color: "var(--accent-terracotta, #D96846)", fontWeight: 700 }}>PHASE 3</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-primary, #F4F3EF)", marginTop: "4px" }}>ESCROW VAULT LOCK</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)", marginTop: "2px" }}>Redis Redlock Isolation</div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "var(--bg-surface-solid, #1E2015)",
                      border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                      padding: "16px",
                    }}
                  >
                    <div style={{ fontSize: "10px", color: "var(--accent-terracotta, #D96846)", fontWeight: 700 }}>PHASE 4</div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-primary, #F4F3EF)", marginTop: "4px" }}>POST-DELIVERY RELEASE</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)", marginTop: "2px" }}>ACID Ledger Commit</div>
                  </div>
                </div>
              </div>
            )}

            {/* GARCH RISK SIMULATOR DEMO */}
            {activeDemo === "risk" && (
              <div
                style={{
                  backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                  padding: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                    borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                    paddingBottom: "12px",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary, #F4F3EF)" }}>
                    PARAMETRIC VALUE-AT-RISK (VaR) &amp; STOCHASTIC SOLVER
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--accent-terracotta, #D96846)", fontWeight: 700 }}>
                    MODEL: GARCH(1,1) + STUDENT-T
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                  <div>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted, #9A99A2)", textTransform: "uppercase", marginBottom: "6px" }}>
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
                          backgroundColor: "var(--bg-surface-solid, #1E2015)",
                          border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                          color: "var(--text-primary, #F4F3EF)",
                          fontSize: "13px",
                          fontWeight: 700,
                          borderRadius: 0,
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted, #9A99A2)", textTransform: "uppercase", marginBottom: "6px" }}>
                        DAILY CONDITIONAL VOLATILITY: <span style={{ color: "var(--accent-terracotta-bright, #E88364)" }}>{dailyVol.toFixed(2)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.05"
                        value={dailyVol}
                        onChange={(e) => setDailyVol(parseFloat(e.target.value))}
                        style={{ width: "100%", accentColor: "var(--accent-terracotta, #D96846)" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted, #9A99A2)", textTransform: "uppercase", marginBottom: "6px" }}>
                        CONFIDENCE LEVEL
                      </label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => setConfidenceLevel(0.95)}
                          style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor: confidenceLevel === 0.95 ? "var(--accent-terracotta, #D96846)" : "rgba(47, 48, 32, 0.58)",
                            color: confidenceLevel === 0.95 ? "#14150E" : "var(--text-secondary, #CDCBD6)",
                            border: confidenceLevel === 0.95 ? "1px solid var(--accent-terracotta, #D96846)" : "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                            fontSize: "11px",
                            fontWeight: 800,
                            cursor: "pointer",
                            borderRadius: 0,
                          }}
                        >
                          95% (1.645 σ)
                        </button>
                        <button
                          onClick={() => setConfidenceLevel(0.99)}
                          style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor: confidenceLevel === 0.99 ? "var(--accent-terracotta, #D96846)" : "rgba(47, 48, 32, 0.58)",
                            color: confidenceLevel === 0.99 ? "#14150E" : "var(--text-secondary, #CDCBD6)",
                            border: confidenceLevel === 0.99 ? "1px solid var(--accent-terracotta, #D96846)" : "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                            fontSize: "11px",
                            fontWeight: 800,
                            cursor: "pointer",
                            borderRadius: 0,
                          }}
                        >
                          99% (2.326 σ)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--bg-surface-solid, #1E2015)",
                      border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "10px", color: "var(--accent-terracotta, #D96846)", textTransform: "uppercase", fontWeight: 700 }}>
                        CALCULATED VALUE-AT-RISK (VaR {confidenceLevel * 100}%)
                      </div>
                      <div style={{ fontSize: "32px", fontWeight: 900, color: "var(--text-primary, #F4F3EF)", letterSpacing: "-0.03em", marginTop: "4px" }}>
                        ${Math.round(calculatedVaR).toLocaleString()}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted, #9A99A2)", marginTop: "6px" }}>
                        Maximum expected portfolio loss over {horizonDays} trading session(s).
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))", paddingTop: "14px" }}>
                      <div style={{ fontSize: "10px", color: "var(--accent-terracotta, #D96846)", textTransform: "uppercase", fontWeight: 700 }}>
                        EXPECTED SHORTFALL (CVaR)
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--accent-terracotta-bright, #E88364)" }}>
                        ${Math.round(expectedShortfall).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SENTINEL DEMO */}
            {activeDemo === "sentinel" && (
              <div
                style={{
                  backgroundColor: "var(--glass-surface, rgba(47, 48, 32, 0.58))",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                  padding: "32px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                    borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                    paddingBottom: "12px",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary, #F4F3EF)" }}>
                    SENTINEL <span style={{ color: "var(--accent-terracotta, #D96846)" }}>//</span> eBPF PACKET ENTROPY INSPECTION STREAM
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--accent-terracotta, #D96846)", fontWeight: 700 }}>
                    INGRESS RATE: 1.2M PKTS/SEC
                  </div>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))", color: "var(--text-muted, #9A99A2)" }}>
                        <th style={{ padding: "8px" }}>TIMESTAMP</th>
                        <th style={{ padding: "8px" }}>PROTOCOL</th>
                        <th style={{ padding: "8px" }}>SOURCE</th>
                        <th style={{ padding: "8px" }}>SHANNON ENTROPY</th>
                        <th style={{ padding: "8px" }}>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.1))" }}>
                        <td style={{ padding: "8px", color: "var(--text-muted, #9A99A2)" }}>17:10:04.102</td>
                        <td style={{ padding: "8px", color: "var(--text-secondary, #CDCBD6)" }}>TCP TLS 1.3</td>
                        <td style={{ padding: "8px", color: "var(--text-secondary, #CDCBD6)" }}>192.168.1.104:443</td>
                        <td style={{ padding: "8px", color: "var(--text-secondary, #CDCBD6)" }}>7.82 bits</td>
                        <td style={{ padding: "8px", fontWeight: 800, color: "var(--accent-olive, #596235)" }}>
                          [ XDP_PASS ]
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.1))", backgroundColor: "rgba(217, 104, 70, 0.15)" }}>
                        <td style={{ padding: "8px", color: "var(--accent-terracotta, #D96846)" }}>17:10:04.108</td>
                        <td style={{ padding: "8px", color: "var(--text-primary, #F4F3EF)" }}>RAW IPv6</td>
                        <td style={{ padding: "8px", color: "var(--text-primary, #F4F3EF)" }}>[2001:db8::88]:9000</td>
                        <td style={{ padding: "8px", color: "var(--accent-terracotta-bright, #E88364)", fontWeight: 700 }}>7.99 bits</td>
                        <td style={{ padding: "8px", fontWeight: 900, color: "var(--accent-terracotta, #D96846)" }}>
                          [ XDP_DROP ]
                        </td>
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
      <footer
        id="contact"
        style={{
          backgroundColor: "var(--bg-canvas, #14150E)",
          borderTop: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
          padding: "48px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "36px", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", color: "var(--text-primary, #F4F3EF)", marginBottom: "8px" }}>
              Jay Bhatt
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary, #CDCBD6)", lineHeight: 1.6, maxWidth: "300px" }}>
              Computer Science scholar specializing in Quantitative Finance &amp; Risk Architecture, Embedded Systems, and Web Engineering. Ahmedabad University.
            </div>
          </div>

          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", color: "var(--accent-terracotta, #D96846)", textTransform: "uppercase", marginBottom: "12px" }}>
              [ DIRECT COMMUNICATION ]
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href="mailto:jay.b@ahduni.edu.in"
                style={{ color: "var(--text-secondary, #CDCBD6)", textDecoration: "none", fontSize: "11px", fontWeight: 700 }}
              >
                EMAIL: <span style={{ color: "var(--text-primary, #F4F3EF)" }}>jay.b@ahduni.edu.in</span>
              </a>
              <a
                href="https://github.com/Jay888-DARK"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-secondary, #CDCBD6)", textDecoration: "none", fontSize: "11px", fontWeight: 700 }}
              >
                GITHUB: <span style={{ color: "var(--accent-terracotta, #D96846)" }}>Jay888-DARK</span>
              </a>
              <a
                href="https://www.linkedin.com/in/jay-bhatt-19441637a/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-secondary, #CDCBD6)", textDecoration: "none", fontSize: "11px", fontWeight: 700 }}
              >
                LINKEDIN: <span style={{ color: "var(--accent-terracotta, #D96846)" }}>Jay Bhatt</span>
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", color: "var(--accent-terracotta, #D96846)", textTransform: "uppercase", marginBottom: "12px" }}>
              [ LEGAL &amp; GOVERNANCE ]
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={() => setLegalModal("tos")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary, #CDCBD6)",
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
                  color: "var(--text-secondary, #CDCBD6)",
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

        <div
          style={{
            borderTop: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "10px",
            color: "var(--text-muted, #9A99A2)",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} JAY BHATT. SMOKED OLIVE-CHARCOAL GLASS <span style={{ color: "var(--accent-terracotta, #D96846)" }}>//</span> ORGANIC INDUSTRIAL &amp; TACTICAL EDITORIAL.
          </div>
          <div>0px BORDER RADIUS // SPECULAR HAIRLINES // TACTICAL ARCHITECTURAL PALETTE</div>
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
            backgroundColor: "rgba(20, 21, 14, 0.88)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
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
              backgroundColor: "var(--bg-canvas, #14150E)",
              border: "1px solid var(--accent-terracotta, #D96846)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "var(--glass-elevated, rgba(47, 48, 32, 0.78))",
                borderBottom: "1px solid var(--glass-border, rgba(205, 203, 214, 0.16))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "var(--accent-terracotta-bright, #E88364)",
                  textTransform: "uppercase",
                }}
              >
                [ {legalModal === "tos" ? "TERMS OF SERVICE" : "PRIVACY POLICY"} ]
              </div>
              <button
                onClick={() => setLegalModal(null)}
                style={{
                  padding: "4px 12px",
                  backgroundColor: "var(--accent-terracotta, #D96846)",
                  color: "#14150E",
                  border: "1px solid var(--accent-terracotta, #D96846)",
                  fontSize: "11px",
                  fontWeight: 800,
                  cursor: "pointer",
                  borderRadius: 0,
                }}
              >
                [ CLOSE ]
              </button>
            </div>

            <div style={{ padding: "28px", overflowY: "auto", fontSize: "12px", lineHeight: 1.7, color: "var(--text-secondary, #CDCBD6)" }}>
              {legalModal === "tos" ? (
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: "var(--text-primary, #F4F3EF)", marginBottom: "16px" }}>
                    TERMS OF SERVICE &amp; RESEARCH USE COVENANT
                  </div>
                  <p style={{ marginBottom: "14px" }}>
                    <strong style={{ color: "var(--text-primary, #F4F3EF)" }}>1. Scope:</strong> This website represents the personal academic portfolio and technical monograph of Jay Bhatt (Ahmedabad University). By accessing this site, you agree to these Terms.
                  </p>
                  <p style={{ marginBottom: "14px" }}>
                    <strong style={{ color: "var(--text-primary, #F4F3EF)" }}>2. Intellectual Property:</strong> All algorithms, simulation models, and architecture documents are the intellectual property of Jay Bhatt unless governed by open-source licenses referenced in the respective GitHub repositories.
                  </p>
                  <p style={{ marginBottom: "14px" }}>
                    <strong style={{ color: "var(--text-primary, #F4F3EF)" }}>3. No Investment Advice:</strong> All quantitative finance and risk metrics are for demonstration purposes only and do not constitute financial advice.
                  </p>
                  <p>
                    <strong style={{ color: "var(--text-primary, #F4F3EF)" }}>4. Contact:</strong> For formal inquiries, reach out to jay.b@ahduni.edu.in.
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: "var(--text-primary, #F4F3EF)", marginBottom: "16px" }}>
                    PRIVACY POLICY &amp; DATA DISCLOSURE
                  </div>
                  <p style={{ marginBottom: "14px" }}>
                    <strong style={{ color: "var(--text-primary, #F4F3EF)" }}>1. Zero Tracking:</strong> This website does not use tracking cookies, marketing beacons, or third-party behavioral profiling.
                  </p>
                  <p style={{ marginBottom: "14px" }}>
                    <strong style={{ color: "var(--text-primary, #F4F3EF)" }}>2. Local Sandbox Execution:</strong> All WebGL shaders and financial calculation solvers run strictly on the client device.
                  </p>
                  <p>
                    <strong style={{ color: "var(--text-primary, #F4F3EF)" }}>3. Inquiries:</strong> Direct data privacy inquiries to jay.b@ahduni.edu.in.
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
