"use client";

import React, { useState, useEffect, useRef } from "react";
import CloudSky from "@/components/CloudSky";
import RoundCarousel from "@/components/RoundCarousel";

/* ================================================================
   MANDATORY PALETTE — Zero deviation
   ================================================================ */
const SILK_BONE     = "#F5F2EB";
const TITANIUM_PUTTY = "#E4DFD3";
const SUMI_OBSIDIAN = "#0B0B0E";
const AKIRA_VERMILION = "#D91E2A";
const ULTRAMARINE   = "#1436B8";
const MECHA_GOLD    = "#F2B705";

/* Neo-Brutalist slab border (no box-shadow) */
const SLAB_BORDER: React.CSSProperties = {
  borderTop: "3px solid " + SUMI_OBSIDIAN,
  borderLeft: "3px solid " + SUMI_OBSIDIAN,
  borderRight: "7px solid " + SUMI_OBSIDIAN,
  borderBottom: "7px solid " + SUMI_OBSIDIAN,
  borderRadius: "0px",
};

const FONT_STACK = '"Arial Black", Impact, Arial, Helvetica, sans-serif';

/* ================================================================
   MAIN PAGE COMPONENT
   ================================================================ */
export default function HomePage() {
  /* --- Scroll state for disappearing hero --- */
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(1, window.scrollY / window.innerHeight);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --- Demo switcher state --- */
  const [activeDemo, setActiveDemo] = useState<"otakubazaar" | "risk" | "sentinel">("otakubazaar");
  const [isLoadingDemo, setIsLoadingDemo] = useState<boolean>(false);

  /* --- Quantitative Risk Calculator Interactive State --- */
  const [portfolioValue, setPortfolioValue] = useState<number>(1000000);
  const [confidenceLevel, setConfidenceLevel] = useState<0.95 | 0.99>(0.99);
  const [dailyVol, setDailyVol] = useState<number>(1.85);
  const [horizonDays] = useState<number>(1);

  /* --- Legal Modal State --- */
  const [legalModal, setLegalModal] = useState<"tos" | "privacy" | null>(null);

  /* --- Sentinel Demo State --- */
  const [sentinelBurst, setSentinelBurst] = useState<number>(0);

  const handleSwitchDemo = (demo: "otakubazaar" | "risk" | "sentinel") => {
    if (demo === activeDemo) return;
    setIsLoadingDemo(true);
    setActiveDemo(demo);
    setTimeout(() => {
      setIsLoadingDemo(false);
    }, 380);
  };

  /* Parametric VaR calc */
  const zScore = confidenceLevel === 0.99 ? 2.326 : 1.645;
  const calculatedVaR = portfolioValue * (dailyVol / 100) * zScore * Math.sqrt(horizonDays);
  const expectedShortfall = calculatedVaR * 1.15;

  /* Hero transform values */
  const heroOpacity = Math.max(0, 1 - scrollProgress * 1.25);
  const heroScale = 1 - scrollProgress * 0.08;
  const heroTranslateY = -scrollProgress * 90;
  const heroHidden = scrollProgress >= 1;

  return (
    <div
      style={{
        backgroundColor: SILK_BONE,
        color: SUMI_OBSIDIAN,
        minHeight: "100vh",
        width: "100%",
        fontFamily: FONT_STACK,
      }}
    >
      {/* ====================================================================
          1. FIXED FULL-SCREEN HERO (100vh) — Disappears on scroll
          ==================================================================== */}
      <header
        id="hero"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100vh",
          zIndex: 1,
          opacity: heroOpacity,
          transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
          visibility: heroHidden ? "hidden" : "visible",
          pointerEvents: heroHidden ? "none" : "auto",
          willChange: "transform, opacity",
        }}
      >
        {/* Background WebGL CloudSky — high-contrast sculpted Neo-Brutalist daylight sky */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
          }}
        >
          <CloudSky
            background="#8C8275"
            baseColor="#D6CFC2"
            accentColor="#F5F2EB"
            density={95}
            speed={55}
            size={145}
            clouds={{ softness: 65, shadow: 195, cirrus: 85 }}
            sun={{ x: 80, y: 85, glow: "#D91E2A" }}
          />
        </div>

        {/* Foreground HUD Content */}
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
          }}
        >
          {/* ── TOP NAV BAR ── */}
          <div
            style={{
              width: "100%",
              backgroundColor: TITANIUM_PUTTY,
              borderTop: "3px solid " + SUMI_OBSIDIAN,
              borderLeft: "3px solid " + SUMI_OBSIDIAN,
              borderRight: "7px solid " + SUMI_OBSIDIAN,
              borderBottom: "7px solid " + SUMI_OBSIDIAN,
              borderRadius: "0px",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  color: SUMI_OBSIDIAN,
                  textTransform: "uppercase",
                }}
              >
                JAY BHATT
              </span>
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "11px",
                  color: SUMI_OBSIDIAN,
                  opacity: 0.65,
                  letterSpacing: "0.06em",
                  fontWeight: 700,
                }}
              >
                jaybhatt.me
              </span>
            </div>

            <nav
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                backgroundColor: SUMI_OBSIDIAN,
                padding: "6px 14px",
                ...SLAB_BORDER,
              }}
            >
              {["SHOWCASE", "SYSTEMS", "DEMOS"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  style={{
                    color: SILK_BONE,
                    textDecoration: "none",
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                style={{
                  color: SILK_BONE,
                  backgroundColor: AKIRA_VERMILION,
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  ...SLAB_BORDER,
                  borderColor: AKIRA_VERMILION,
                }}
              >
                CONTACT
              </a>
            </nav>
          </div>

          {/* ── BOTTOM: Oversized Headline + Metadata Bar ── */}
          <div style={{ maxWidth: "1020px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.18em",
                color: AKIRA_VERMILION,
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              JAY BHATT <span style={{ color: SUMI_OBSIDIAN }}>//</span> PORTFOLIO MONOGRAPH
            </div>
            <h1
              style={{
                fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                lineHeight: 0.92,
                color: SUMI_OBSIDIAN,
                margin: "0 0 24px 0",
              }}
            >
              QUANTITATIVE RISK ARCHITECTURE, EMBEDDED SYSTEMS &amp; FULL-STACK ENGINEERING.
            </h1>

            {/* Metadata Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "14px",
                padding: "10px 18px",
                backgroundColor: SUMI_OBSIDIAN,
                borderTop: "3px solid " + SUMI_OBSIDIAN,
                borderLeft: "3px solid " + SUMI_OBSIDIAN,
                borderRight: "7px solid " + SUMI_OBSIDIAN,
                borderBottom: "7px solid " + SUMI_OBSIDIAN,
                borderRadius: "0px",
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.12em",
                color: TITANIUM_PUTTY,
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              <span>
                B.TECH CSE <span style={{ color: AKIRA_VERMILION }}>//</span> AHMEDABAD UNIVERSITY
              </span>
              <span style={{ color: TITANIUM_PUTTY, opacity: 0.4 }}>|</span>
              <span>GOOGLE STUDENT AMBASSADOR</span>
              <span style={{ color: TITANIUM_PUTTY, opacity: 0.4 }}>|</span>
              <a
                href="https://github.com/Jay888-DARK"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: SILK_BONE, textDecoration: "none" }}
              >
                GITHUB: <span style={{ color: AKIRA_VERMILION }}>JAY888-DARK</span>
              </a>
              <span style={{ color: TITANIUM_PUTTY, opacity: 0.4 }}>|</span>
              <a
                href="https://www.linkedin.com/in/jay-bhatt-19441637a/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: SILK_BONE, textDecoration: "none" }}
              >
                LINKEDIN: <span style={{ color: AKIRA_VERMILION }}>JAY BHATT</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          2. SCROLLING EDITORIAL SHEET — wipes over the disappearing Hero
          ==================================================================== */}
      <main
        style={{
          marginTop: "100vh",
          position: "relative",
          zIndex: 10,
          backgroundColor: SILK_BONE,
          borderTop: "8px solid " + SUMI_OBSIDIAN,
        }}
      >
        {/* ================================================================
            3. HARD LINES ANIME EDITORIAL HEADER & 4-COLUMN STRIP
            ================================================================ */}
        <section id="systems" style={{ borderBottom: "8px solid " + SUMI_OBSIDIAN }}>
          {/* MONUMENTAL MASTHEAD */}
          <div
            style={{
              display: "flex",
              width: "100%",
              minHeight: "280px",
            }}
          >
            {/* LEFT BLOCK (40%) — Massive stacked title */}
            <div
              style={{
                width: "40%",
                backgroundColor: SILK_BONE,
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRight: "8px solid " + SUMI_OBSIDIAN,
                boxSizing: "border-box",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.92,
                    color: SUMI_OBSIDIAN,
                    margin: 0,
                  }}
                >
                  HARD<br />SYSTEMS<br /><span style={{ color: AKIRA_VERMILION }}>//</span> JAY<br />BHATT
                </h2>
              </div>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: AKIRA_VERMILION,
                  color: SILK_BONE,
                  padding: "8px 16px",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  width: "fit-content",
                  ...SLAB_BORDER,
                  borderColor: AKIRA_VERMILION,
                }}
              >
                VOL. 2026 // ARCHIVE 01
              </div>
            </div>

            {/* MIDDLE BLOCK (35%) — Ultramarine architectural panel */}
            <div
              style={{
                width: "35%",
                backgroundColor: ULTRAMARINE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "8px solid " + SUMI_OBSIDIAN,
                boxSizing: "border-box",
                padding: "24px",
                overflow: "hidden",
              }}
            >
              {/* Geometric SVG Mecha/Quant Schematic */}
              <svg viewBox="0 0 300 200" style={{ width: "100%", maxWidth: "320px", height: "auto" }}>
                {/* Structural grid */}
                <line x1="0" y1="50" x2="300" y2="50" stroke={SILK_BONE} strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="0" y1="100" x2="300" y2="100" stroke={SILK_BONE} strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="0" y1="150" x2="300" y2="150" stroke={SILK_BONE} strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="75" y1="0" x2="75" y2="200" stroke={SILK_BONE} strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="150" y1="0" x2="150" y2="200" stroke={SILK_BONE} strokeWidth="0.5" strokeOpacity="0.3" />
                <line x1="225" y1="0" x2="225" y2="200" stroke={SILK_BONE} strokeWidth="0.5" strokeOpacity="0.3" />
                {/* Hexagonal mecha schematic */}
                <polygon points="150,25 195,50 195,100 150,125 105,100 105,50" fill="none" stroke={SILK_BONE} strokeWidth="2" />
                <polygon points="150,45 180,62 180,88 150,105 120,88 120,62" fill="none" stroke={MECHA_GOLD} strokeWidth="1.5" />
                <circle cx="150" cy="75" r="12" fill="none" stroke={SILK_BONE} strokeWidth="1.5" />
                <circle cx="150" cy="75" r="4" fill={MECHA_GOLD} />
                {/* Connecting lines */}
                <line x1="150" y1="125" x2="150" y2="175" stroke={SILK_BONE} strokeWidth="1.5" />
                <line x1="105" y1="50" x2="55" y2="25" stroke={SILK_BONE} strokeWidth="1" />
                <line x1="195" y1="50" x2="245" y2="25" stroke={SILK_BONE} strokeWidth="1" />
                <line x1="105" y1="100" x2="55" y2="150" stroke={SILK_BONE} strokeWidth="1" />
                <line x1="195" y1="100" x2="245" y2="150" stroke={SILK_BONE} strokeWidth="1" />
                {/* Data nodes */}
                <rect x="35" y="15" width="40" height="20" fill="none" stroke={MECHA_GOLD} strokeWidth="1" />
                <text x="40" y="29" fill={SILK_BONE} fontSize="8" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">VaR</text>
                <rect x="225" y="15" width="40" height="20" fill="none" stroke={AKIRA_VERMILION} strokeWidth="1" />
                <text x="230" y="29" fill={SILK_BONE} fontSize="8" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">SDR</text>
                <rect x="35" y="140" width="40" height="20" fill="none" stroke={SILK_BONE} strokeWidth="1" />
                <text x="40" y="154" fill={SILK_BONE} fontSize="8" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">MCU</text>
                <rect x="225" y="140" width="40" height="20" fill="none" stroke={MECHA_GOLD} strokeWidth="1" />
                <text x="230" y="154" fill={SILK_BONE} fontSize="8" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">NET</text>
                {/* Bottom label bar */}
                <rect x="100" y="168" width="100" height="22" fill={SUMI_OBSIDIAN} />
                <text x="115" y="183" fill={SILK_BONE} fontSize="9" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif">CORE MATRIX</text>
              </svg>
            </div>

            {/* RIGHT BLOCK (25%) — Mecha Signal Gold manifesto */}
            <div
              style={{
                width: "25%",
                backgroundColor: MECHA_GOLD,
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.14em",
                    color: SUMI_OBSIDIAN,
                    marginBottom: "16px",
                    textTransform: "uppercase",
                  }}
                >
                  MANIFESTO //
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 900,
                    color: SUMI_OBSIDIAN,
                    lineHeight: 1.3,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                  }}
                >
                  ENGINEERING IS NOT ABSTRACTION. IT IS THE PRECISE ARCHITECTURE OF CONSEQUENCE.
                </div>
              </div>
              <a
                href="#demos"
                style={{
                  display: "inline-block",
                  backgroundColor: AKIRA_VERMILION,
                  color: SILK_BONE,
                  textDecoration: "none",
                  padding: "12px 20px",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  ...SLAB_BORDER,
                  borderColor: SUMI_OBSIDIAN,
                  textAlign: "center",
                }}
              >
                VIEW LIVE DEMOS
              </a>
            </div>
          </div>

          {/* ================================================================
              4-COLUMN EDITORIAL STRIP (NEVER 3 cards, NEVER bento)
              ================================================================ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: "8px solid " + SUMI_OBSIDIAN,
            }}
          >
            {[
              { code: "01", name: "OTAKUBAZAAR", desc: "Multi-party escrow marketplace. Razorpay single-step checkout. Sub-12ms order processing.", accent: AKIRA_VERMILION },
              { code: "02", name: "QUANT VaR ENGINE", desc: "GARCH(1,1) conditional volatility. 10,000 Monte Carlo paths. 99% tail risk quantification.", accent: ULTRAMARINE },
              { code: "03", name: "SENTINEL AI", desc: "Real-time eBPF packet anomaly detection. Neural entropy classification. Top 20 Ingenious 7.0.", accent: MECHA_GOLD },
              { code: "04", name: "GNU RADIO IPV6", desc: "ZeroMQ gr-zeromq dual-stack IPv6 socket binding. C++ out-of-tree signal processing block.", accent: AKIRA_VERMILION },
            ].map((item, idx) => (
              <div
                key={item.code}
                style={{
                  backgroundColor: SILK_BONE,
                  borderRight: idx < 3 ? "8px solid " + SUMI_OBSIDIAN : "none",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "200px",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 900,
                      color: item.accent,
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    {item.code}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 900,
                      color: SUMI_OBSIDIAN,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      marginBottom: "12px",
                      borderBottom: "3px solid " + item.accent,
                      paddingBottom: "8px",
                    }}
                  >
                    {item.name}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: SUMI_OBSIDIAN,
                    lineHeight: 1.5,
                    opacity: 0.7,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            4. SHOWCASE SECTION: 3D CAROUSEL
            ================================================================ */}
        <section
          id="showcase"
          style={{
            borderBottom: "8px solid " + SUMI_OBSIDIAN,
            backgroundColor: SUMI_OBSIDIAN,
          }}
        >
          {/* Section Header */}
          <div
            style={{
              padding: "20px 48px",
              borderBottom: "3px solid " + SILK_BONE,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              backgroundColor: SUMI_OBSIDIAN,
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 900,
                letterSpacing: "0.14em",
                color: SILK_BONE,
                textTransform: "uppercase",
              }}
            >
              01 <span style={{ color: AKIRA_VERMILION }}>//</span> INTERACTIVE 3D PROJECT RING (DRAG TO ROTATE)
            </div>
            <div style={{ fontSize: "11px", color: TITANIUM_PUTTY, letterSpacing: "0.08em", fontWeight: 700 }}>
              CYLINDRICAL MATRIX <span style={{ color: AKIRA_VERMILION }}>//</span> MECHA DOSSIER SLABS
            </div>
          </div>

          {/* Carousel Container — 700px */}
          <div
            style={{
              width: "100%",
              height: "700px",
              position: "relative",
              backgroundColor: SUMI_OBSIDIAN,
            }}
          >
            <RoundCarousel />
          </div>
        </section>

        {/* ================================================================
            5. LIVE PRODUCT DEMOS, SKELETON LOADERS (#demos)
            ================================================================ */}
        <section
          id="demos"
          style={{
            borderBottom: "8px solid " + SUMI_OBSIDIAN,
            backgroundColor: SILK_BONE,
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
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  color: AKIRA_VERMILION,
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                [ SECTION 03 // LIVE ENGINEERING WORKBENCH ]
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  color: SUMI_OBSIDIAN,
                  margin: 0,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.92,
                }}
              >
                INTERACTIVE SYSTEM DEMONSTRATORS
              </h2>
            </div>

            {/* Demo Switcher Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {([
                { key: "otakubazaar" as const, label: "OTAKUBAZAAR DEMO" },
                { key: "risk" as const, label: "GARCH VaR SIMULATOR" },
                { key: "sentinel" as const, label: "SENTINEL eBPF" },
              ]).map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => handleSwitchDemo(btn.key)}
                  style={{
                    padding: "10px 18px",
                    backgroundColor: activeDemo === btn.key ? AKIRA_VERMILION : SILK_BONE,
                    color: activeDemo === btn.key ? SILK_BONE : SUMI_OBSIDIAN,
                    ...SLAB_BORDER,
                    fontSize: "10px",
                    fontWeight: 900,
                    cursor: "pointer",
                    fontFamily: FONT_STACK,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* SKELETON LOADER */}
          {isLoadingDemo ? (
            <div
              style={{
                padding: "40px",
                backgroundColor: SILK_BONE,
                ...SLAB_BORDER,
              }}
            >
              <div style={{ width: "35%", height: "24px", marginBottom: "20px", backgroundColor: TITANIUM_PUTTY, ...SLAB_BORDER }} />
              <div style={{ width: "100%", height: "240px", marginBottom: "20px", backgroundColor: TITANIUM_PUTTY, ...SLAB_BORDER }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ height: "60px", backgroundColor: TITANIUM_PUTTY, ...SLAB_BORDER }} />
                <div style={{ height: "60px", backgroundColor: TITANIUM_PUTTY, ...SLAB_BORDER }} />
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: AKIRA_VERMILION,
                  letterSpacing: "0.14em",
                  marginTop: "16px",
                  fontWeight: 900,
                }}
              >
                [ SYNCHRONIZING ARTIFACT DEMONSTRATOR TELEMETRY ]
              </div>
            </div>
          ) : (
            /* 2-COLUMN WORKBENCH */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0px" }}>
              {/* LEFT: Demo Description */}
              <div
                style={{
                  backgroundColor: SILK_BONE,
                  ...SLAB_BORDER,
                  padding: "32px",
                }}
              >
                {activeDemo === "otakubazaar" && (
                  <>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 900,
                        color: SUMI_OBSIDIAN,
                        marginBottom: "12px",
                        borderBottom: "3px solid " + AKIRA_VERMILION,
                        paddingBottom: "10px",
                      }}
                    >
                      OTAKUBAZAAR <span style={{ color: AKIRA_VERMILION }}>//</span> MULTI-PARTY ESCROW STATE MACHINE
                    </div>
                    <p style={{ fontSize: "12px", color: SUMI_OBSIDIAN, lineHeight: 1.6, marginBottom: "24px", fontWeight: 700, opacity: 0.7 }}>
                      Single-step guest checkout pipeline with Razorpay integration and automated 2-phase cryptographic escrow lock.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {[
                        { phase: "PHASE 1", title: "GUEST CART INIT", sub: "Zero-Auth State Lock" },
                        { phase: "PHASE 2", title: "RAZORPAY WEBHOOK", sub: "HMAC SHA256 Signature" },
                        { phase: "PHASE 3", title: "ESCROW VAULT LOCK", sub: "Redis Redlock Isolation" },
                        { phase: "PHASE 4", title: "POST-DELIVERY RELEASE", sub: "ACID Ledger Commit" },
                      ].map((p) => (
                        <div key={p.phase} style={{ backgroundColor: TITANIUM_PUTTY, ...SLAB_BORDER, padding: "14px" }}>
                          <div style={{ fontSize: "10px", color: AKIRA_VERMILION, fontWeight: 900 }}>{p.phase}</div>
                          <div style={{ fontSize: "12px", fontWeight: 900, color: SUMI_OBSIDIAN, marginTop: "4px" }}>{p.title}</div>
                          <div style={{ fontSize: "10px", color: SUMI_OBSIDIAN, marginTop: "2px", opacity: 0.6, fontWeight: 700 }}>{p.sub}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeDemo === "risk" && (
                  <>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 900,
                        color: SUMI_OBSIDIAN,
                        marginBottom: "12px",
                        borderBottom: "3px solid " + ULTRAMARINE,
                        paddingBottom: "10px",
                      }}
                    >
                      PARAMETRIC VALUE-AT-RISK (VaR) <span style={{ color: ULTRAMARINE }}>//</span> STOCHASTIC SOLVER
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "10px", color: SUMI_OBSIDIAN, textTransform: "uppercase", marginBottom: "6px", fontWeight: 900, opacity: 0.6 }}>
                        PORTFOLIO VALUE ($ USD)
                      </label>
                      <input
                        type="number"
                        value={portfolioValue}
                        step={100000}
                        onChange={(e) => setPortfolioValue(Math.max(10000, Number(e.target.value)))}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          backgroundColor: TITANIUM_PUTTY,
                          color: SUMI_OBSIDIAN,
                          fontSize: "13px",
                          fontWeight: 900,
                          ...SLAB_BORDER,
                          fontFamily: FONT_STACK,
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "10px", color: SUMI_OBSIDIAN, textTransform: "uppercase", marginBottom: "6px", fontWeight: 900, opacity: 0.6 }}>
                        DAILY CONDITIONAL VOLATILITY: <span style={{ color: AKIRA_VERMILION }}>{dailyVol.toFixed(2)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.05"
                        value={dailyVol}
                        onChange={(e) => setDailyVol(parseFloat(e.target.value))}
                        style={{ width: "100%", accentColor: AKIRA_VERMILION }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "10px", color: SUMI_OBSIDIAN, textTransform: "uppercase", marginBottom: "6px", fontWeight: 900, opacity: 0.6 }}>
                        CONFIDENCE LEVEL
                      </label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {([0.95, 0.99] as const).map((cl) => (
                          <button
                            key={cl}
                            onClick={() => setConfidenceLevel(cl)}
                            style={{
                              flex: 1,
                              padding: "10px",
                              backgroundColor: confidenceLevel === cl ? ULTRAMARINE : TITANIUM_PUTTY,
                              color: confidenceLevel === cl ? SILK_BONE : SUMI_OBSIDIAN,
                              ...SLAB_BORDER,
                              fontSize: "11px",
                              fontWeight: 900,
                              cursor: "pointer",
                              fontFamily: FONT_STACK,
                            }}
                          >
                            {cl * 100}% ({cl === 0.95 ? "1.645" : "2.326"} σ)
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeDemo === "sentinel" && (
                  <>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 900,
                        color: SUMI_OBSIDIAN,
                        marginBottom: "12px",
                        borderBottom: "3px solid " + MECHA_GOLD,
                        paddingBottom: "10px",
                      }}
                    >
                      SENTINEL <span style={{ color: MECHA_GOLD }}>//</span> eBPF PACKET ENTROPY STREAM
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", textAlign: "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "3px solid " + SUMI_OBSIDIAN, color: SUMI_OBSIDIAN }}>
                            <th style={{ padding: "8px", fontWeight: 900 }}>TIMESTAMP</th>
                            <th style={{ padding: "8px", fontWeight: 900 }}>PROTOCOL</th>
                            <th style={{ padding: "8px", fontWeight: 900 }}>SOURCE</th>
                            <th style={{ padding: "8px", fontWeight: 900 }}>ENTROPY</th>
                            <th style={{ padding: "8px", fontWeight: 900 }}>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid " + TITANIUM_PUTTY }}>
                            <td style={{ padding: "8px", color: SUMI_OBSIDIAN, opacity: 0.6 }}>17:10:04.102</td>
                            <td style={{ padding: "8px", fontWeight: 700 }}>TCP TLS 1.3</td>
                            <td style={{ padding: "8px", fontWeight: 700 }}>192.168.1.104:443</td>
                            <td style={{ padding: "8px", fontWeight: 700 }}>7.82 bits</td>
                            <td style={{ padding: "8px", fontWeight: 900, color: ULTRAMARINE }}>[ XDP_PASS ]</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid " + TITANIUM_PUTTY, backgroundColor: "rgba(217,30,42,0.08)" }}>
                            <td style={{ padding: "8px", color: AKIRA_VERMILION }}>17:10:04.108</td>
                            <td style={{ padding: "8px", fontWeight: 700 }}>RAW IPv6</td>
                            <td style={{ padding: "8px", fontWeight: 700 }}>[2001:db8::88]:9000</td>
                            <td style={{ padding: "8px", color: AKIRA_VERMILION, fontWeight: 900 }}>7.99 bits</td>
                            <td style={{ padding: "8px", fontWeight: 900, color: AKIRA_VERMILION }}>[ XDP_DROP ]</td>
                          </tr>
                          {sentinelBurst > 0 && Array.from({ length: Math.min(sentinelBurst, 4) }).map((_, bIdx) => (
                            <tr key={bIdx} style={{ borderBottom: "1px solid " + TITANIUM_PUTTY, backgroundColor: bIdx % 2 === 0 ? "rgba(217,30,42,0.06)" : "transparent" }}>
                              <td style={{ padding: "8px", color: AKIRA_VERMILION }}>17:10:04.{112 + bIdx * 3}</td>
                              <td style={{ padding: "8px", fontWeight: 700 }}>{bIdx % 2 === 0 ? "UDP FLOOD" : "SYN ACK"}</td>
                              <td style={{ padding: "8px", fontWeight: 700 }}>10.0.{bIdx}.{42 + bIdx * 7}:{5000 + bIdx}</td>
                              <td style={{ padding: "8px", color: AKIRA_VERMILION, fontWeight: 900 }}>{(7.85 + bIdx * 0.04).toFixed(2)} bits</td>
                              <td style={{ padding: "8px", fontWeight: 900, color: AKIRA_VERMILION }}>[ XDP_DROP ]</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      onClick={() => setSentinelBurst(prev => prev >= 4 ? 0 : prev + 1)}
                      style={{
                        marginTop: "16px",
                        padding: "10px 18px",
                        backgroundColor: MECHA_GOLD,
                        color: SUMI_OBSIDIAN,
                        ...SLAB_BORDER,
                        fontSize: "10px",
                        fontWeight: 900,
                        cursor: "pointer",
                        fontFamily: FONT_STACK,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      INJECT ANOMALY BURST ({sentinelBurst}/4)
                    </button>
                  </>
                )}
              </div>

              {/* RIGHT: Results / Output Panel */}
              <div
                style={{
                  backgroundColor: SUMI_OBSIDIAN,
                  ...SLAB_BORDER,
                  borderColor: SUMI_OBSIDIAN,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {activeDemo === "otakubazaar" && (
                  <>
                    <div>
                      <div style={{ fontSize: "10px", color: AKIRA_VERMILION, textTransform: "uppercase", fontWeight: 900, letterSpacing: "0.12em" }}>
                        ESCROW SETTLEMENT STATUS
                      </div>
                      <div style={{ fontSize: "48px", fontWeight: 900, color: SILK_BONE, letterSpacing: "-0.03em", marginTop: "8px", lineHeight: 1 }}>
                        COMMITTED
                      </div>
                      <div style={{ fontSize: "11px", color: TITANIUM_PUTTY, marginTop: "12px", fontWeight: 700 }}>
                        4-stage escrow verified. HMAC SHA256 webhook signature validated. Redis Redlock isolation confirmed. ACID ledger committed.
                      </div>
                    </div>
                    <div style={{ borderTop: "3px solid " + SILK_BONE, paddingTop: "16px", marginTop: "24px" }}>
                      <div style={{ fontSize: "10px", color: MECHA_GOLD, fontWeight: 900, letterSpacing: "0.08em" }}>SETTLEMENT LATENCY</div>
                      <div style={{ fontSize: "28px", fontWeight: 900, color: MECHA_GOLD }}>142ms</div>
                    </div>
                  </>
                )}

                {activeDemo === "risk" && (
                  <>
                    <div>
                      <div style={{ fontSize: "10px", color: ULTRAMARINE, textTransform: "uppercase", fontWeight: 900, letterSpacing: "0.12em" }}>
                        CALCULATED VALUE-AT-RISK (VaR {confidenceLevel * 100}%)
                      </div>
                      <div style={{ fontSize: "48px", fontWeight: 900, color: SILK_BONE, letterSpacing: "-0.03em", marginTop: "8px", lineHeight: 1 }}>
                        ${Math.round(calculatedVaR).toLocaleString()}
                      </div>
                      <div style={{ fontSize: "11px", color: TITANIUM_PUTTY, marginTop: "12px", fontWeight: 700 }}>
                        Maximum expected portfolio loss over {horizonDays} trading session(s).
                      </div>
                    </div>
                    <div style={{ borderTop: "3px solid " + SILK_BONE, paddingTop: "16px", marginTop: "24px" }}>
                      <div style={{ fontSize: "10px", color: AKIRA_VERMILION, fontWeight: 900, letterSpacing: "0.08em" }}>EXPECTED SHORTFALL (CVaR)</div>
                      <div style={{ fontSize: "28px", fontWeight: 900, color: AKIRA_VERMILION }}>
                        ${Math.round(expectedShortfall).toLocaleString()}
                      </div>
                    </div>
                  </>
                )}

                {activeDemo === "sentinel" && (
                  <>
                    <div>
                      <div style={{ fontSize: "10px", color: MECHA_GOLD, textTransform: "uppercase", fontWeight: 900, letterSpacing: "0.12em" }}>
                        INGRESS INSPECTION RATE
                      </div>
                      <div style={{ fontSize: "48px", fontWeight: 900, color: SILK_BONE, letterSpacing: "-0.03em", marginTop: "8px", lineHeight: 1 }}>
                        1.2M PKTS/S
                      </div>
                      <div style={{ fontSize: "11px", color: TITANIUM_PUTTY, marginTop: "12px", fontWeight: 700 }}>
                        Shannon entropy threshold: 7.95 bits. XDP fast-path inline drop. Zero-copy eBPF ring buffer.
                      </div>
                    </div>
                    <div style={{ borderTop: "3px solid " + SILK_BONE, paddingTop: "16px", marginTop: "24px" }}>
                      <div style={{ fontSize: "10px", color: AKIRA_VERMILION, fontWeight: 900, letterSpacing: "0.08em" }}>ANOMALIES QUARANTINED</div>
                      <div style={{ fontSize: "28px", fontWeight: 900, color: AKIRA_VERMILION }}>{1 + sentinelBurst} THREATS</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ================================================================
            6. LEGAL & CONTACT FOOTER (#contact)
            ================================================================ */}
        <footer
          id="contact"
          style={{
            backgroundColor: SUMI_OBSIDIAN,
            borderTop: "8px solid " + SUMI_OBSIDIAN,
            padding: "48px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "36px", marginBottom: "40px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", color: SILK_BONE, marginBottom: "8px" }}>
                Jay Bhatt
              </div>
              <div style={{ fontSize: "11px", color: TITANIUM_PUTTY, lineHeight: 1.6, fontWeight: 700 }}>
                Computer Science scholar specializing in Quantitative Finance &amp; Risk Architecture, Embedded Systems, and Web Engineering. Ahmedabad University.
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.14em", color: AKIRA_VERMILION, textTransform: "uppercase", marginBottom: "12px" }}>
                [ DIRECT COMMUNICATION ]
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href="mailto:jay.b@ahduni.edu.in" style={{ color: TITANIUM_PUTTY, textDecoration: "none", fontSize: "11px", fontWeight: 900 }}>
                  EMAIL: <span style={{ color: SILK_BONE }}>jay.b@ahduni.edu.in</span>
                </a>
                <a href="https://github.com/Jay888-DARK" target="_blank" rel="noopener noreferrer" style={{ color: TITANIUM_PUTTY, textDecoration: "none", fontSize: "11px", fontWeight: 900 }}>
                  GITHUB: <span style={{ color: AKIRA_VERMILION }}>Jay888-DARK</span>
                </a>
                <a href="https://www.linkedin.com/in/jay-bhatt-19441637a/" target="_blank" rel="noopener noreferrer" style={{ color: TITANIUM_PUTTY, textDecoration: "none", fontSize: "11px", fontWeight: 900 }}>
                  LINKEDIN: <span style={{ color: AKIRA_VERMILION }}>Jay Bhatt</span>
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.14em", color: AKIRA_VERMILION, textTransform: "uppercase", marginBottom: "12px" }}>
                [ LEGAL &amp; GOVERNANCE ]
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={() => setLegalModal("tos")}
                  style={{
                    background: "none",
                    border: "none",
                    color: TITANIUM_PUTTY,
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 900,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: FONT_STACK,
                    textDecoration: "underline",
                    textDecorationColor: AKIRA_VERMILION,
                    textUnderlineOffset: "3px",
                  }}
                >
                  TERMS OF SERVICE (TOS)
                </button>
                <button
                  onClick={() => setLegalModal("privacy")}
                  style={{
                    background: "none",
                    border: "none",
                    color: TITANIUM_PUTTY,
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 900,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: FONT_STACK,
                    textDecoration: "underline",
                    textDecorationColor: AKIRA_VERMILION,
                    textUnderlineOffset: "3px",
                  }}
                >
                  PRIVACY POLICY
                </button>
              </div>
            </div>

            <div>
              <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.14em", color: MECHA_GOLD, textTransform: "uppercase", marginBottom: "12px" }}>
                [ ARCHITECTURE SPEC ]
              </div>
              <div style={{ fontSize: "11px", color: TITANIUM_PUTTY, lineHeight: 1.6, fontWeight: 700 }}>
                HARD LINES Neo-Brutalist editorial layout. Curated anime studio palette. 0px border radius. Asymmetric slab borders. Zero box-shadow.
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "3px solid " + SILK_BONE,
              paddingTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "10px",
              color: TITANIUM_PUTTY,
              fontWeight: 700,
            }}
          >
            <div>
              &copy; {new Date().getFullYear()} JAY BHATT. HARD LINES <span style={{ color: AKIRA_VERMILION }}>//</span> ANIME NEO-BRUTALIST EDITORIAL.
            </div>
            <div>0px BORDER RADIUS // ASYMMETRIC SLAB DEPTH // SUMI OBSIDIAN INK</div>
          </div>
        </footer>
      </main>

      {/* ================================================================
          LEGAL MODALS (Terms of Service & Privacy Policy)
          ================================================================ */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(11, 11, 14, 0.92)",
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
              backgroundColor: SILK_BONE,
              ...SLAB_BORDER,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "16px 20px",
                backgroundColor: SUMI_OBSIDIAN,
                borderBottom: "3px solid " + AKIRA_VERMILION,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  color: AKIRA_VERMILION,
                  textTransform: "uppercase",
                }}
              >
                [ {legalModal === "tos" ? "TERMS OF SERVICE" : "PRIVACY POLICY"} ]
              </div>
              <button
                onClick={() => setLegalModal(null)}
                style={{
                  padding: "6px 14px",
                  backgroundColor: AKIRA_VERMILION,
                  color: SILK_BONE,
                  ...SLAB_BORDER,
                  fontSize: "11px",
                  fontWeight: 900,
                  cursor: "pointer",
                  fontFamily: FONT_STACK,
                }}
              >
                [ CLOSE ]
              </button>
            </div>

            <div style={{ padding: "28px", overflowY: "auto", fontSize: "12px", lineHeight: 1.7, color: SUMI_OBSIDIAN, fontWeight: 700 }}>
              {legalModal === "tos" ? (
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: SUMI_OBSIDIAN, marginBottom: "16px" }}>
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
                  <div style={{ fontSize: "16px", fontWeight: 900, color: SUMI_OBSIDIAN, marginBottom: "16px" }}>
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
