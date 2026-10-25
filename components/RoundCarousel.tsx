"use client";

import React, { useEffect, useRef, useState } from "react";

/* ================================================================
   PALETTE CONSTANTS (MANDATORY — Zero deviation)
   ================================================================ */
const SILK_BONE     = "#F5F2EB";
const TITANIUM_PUTTY = "#E4DFD3";
const SUMI_OBSIDIAN = "#0B0B0E";
const AKIRA_VERMILION = "#D91E2A";
const ULTRAMARINE   = "#1436B8";
const MECHA_GOLD    = "#F2B705";

/* Accent cycle for card header bars */
const ACCENT_CYCLE = [
  AKIRA_VERMILION,
  ULTRAMARINE,
  MECHA_GOLD,
  AKIRA_VERMILION,
  ULTRAMARINE,
  MECHA_GOLD,
  AKIRA_VERMILION,
  ULTRAMARINE,
];

/* ================================================================
   DATA TYPES & PROJECT NODES
   ================================================================ */
export interface ProjectNode {
  id: string;
  code: string;
  domain: string;
  title: string;
  metricLabel: string;
  metricValue: string;
  stack: string;
  summary: string;
  repoUrl: string;
  liveLabel: string;
  svgType: "escrow" | "garch" | "sentinel" | "gnuradio" | "hardcarbon" | "atmega" | "daretosip" | "ansys";
  simUnit: string;
  simBase: number;
}

export interface RoundCarouselProps {
  projects?: ProjectNode[];
  imageWidth?: number;
  imageHeight?: number;
  spacing?: number;
  speed?: number;
  direction?: "right" | "left";
  drag?: boolean;
  sensitivity?: number;
  tilt?: number;
  perspective?: number;
  innerDim?: number;
  background?: string;
  style?: React.CSSProperties;
}

const PORTFOLIO_PROJECTS: ProjectNode[] = [
  {
    id: "otakubazaar",
    code: "01",
    domain: "COMMERCE INFRASTRUCTURE",
    title: "OTAKUBAZAAR ESCROW",
    metricLabel: "CHECKOUT PIPELINE",
    metricValue: "SINGLE-STEP // RAZORPAY",
    stack: "NEXT.JS / POSTGRESQL / RAZORPAY / DOCKER",
    summary: "Brutalist editorial marketplace with automated escrow state verification and single-step guest checkout.",
    repoUrl: "https://github.com/Jay888-DARK",
    liveLabel: "VERIFY ESCROW STATE",
    svgType: "escrow",
    simUnit: "ms Settlement Latency",
    simBase: 142,
  },
  {
    id: "garch-risk",
    code: "02",
    domain: "QUANTITATIVE FINANCE",
    title: "GARCH & MONTE CARLO VaR",
    metricLabel: "SIMULATION HORIZON",
    metricValue: "10,000 PATHS // 99% VaR",
    stack: "PYTHON / NUMPY / PANDAS / SCIKIT-LEARN",
    summary: "Conditional heteroskedasticity volatility forecasting paired with multi-asset Monte Carlo tail-risk engine.",
    repoUrl: "https://github.com/Jay888-DARK",
    liveLabel: "RECOMPUTE VOLATILITY SHOCK",
    svgType: "garch",
    simUnit: "% Tail VaR (99% CI)",
    simBase: 4.82,
  },
  {
    id: "sentinel",
    code: "03",
    domain: "CYBER THREAT ARCHITECTURE",
    title: "SENTINEL ANOMALY ENGINE",
    metricLabel: "BENCHMARK PLACEMENT",
    metricValue: "TOP 20 // INGENIOUS 7.0",
    stack: "PYTORCH / PYTHON / LINUX / DOCKER",
    summary: "Real-time network packet anomaly classification and automated threat isolation pipeline.",
    repoUrl: "https://github.com/Jay888-DARK",
    liveLabel: "INJECT PACKET BURST",
    svgType: "sentinel",
    simUnit: "kPkts/s Inspected",
    simBase: 84.5,
  },
  {
    id: "gnuradio",
    code: "04",
    domain: "SOFTWARE-DEFINED RADIO",
    title: "GNU RADIO GR-ZEROMQ",
    metricLabel: "CORE CONTRIBUTION",
    metricValue: "ISSUE #1866 // IPV6 SOCKETS",
    stack: "C++ / PYTHON / ZEROMQ / GNU RADIO 4.0",
    summary: "Out-of-tree signal processing block architecture resolving dual-stack IPv6 endpoint binding in ZeroMQ sources.",
    repoUrl: "https://github.com/Jay888-DARK",
    liveLabel: "TEST IPV6 ZMQ STREAM",
    svgType: "gnuradio",
    simUnit: "MS/s IQ Throughput",
    simBase: 25.6,
  },
  {
    id: "hardcarbon",
    code: "05",
    domain: "ENERGY MATERIALS",
    title: "FLASH JOULE HARD CARBON",
    metricLabel: "IDEATHON RESEARCH",
    metricValue: "NA-ION ANODE // IITGN",
    stack: "PROCESS MODELING / PULSE POWER / MATERIALS",
    summary: "Millisecond thermal synthesis converting agricultural biomass into hard carbon anodes for sodium-ion cells.",
    repoUrl: "https://github.com/Jay888-DARK",
    liveLabel: "PULSE JOULE DISCHARGE",
    svgType: "hardcarbon",
    simUnit: "mAh/g Reversible Cap",
    simBase: 312,
  },
  {
    id: "atmega32",
    code: "06",
    domain: "EMBEDDED SYSTEMS",
    title: "AVR ATMEGA32 TELEMETRY",
    metricLabel: "HARDWARE INTERFACE",
    metricValue: "BARE-METAL C // PWM + ADC",
    stack: "EMBEDDED C / ATMEGA32 / TIMERS / ADC",
    summary: "Direct register-level microcontroller firmware controlling multi-channel ADC sampling, LCD buses, and PWM actuators.",
    repoUrl: "https://github.com/Jay888-DARK",
    liveLabel: "SAMPLE ADC REGISTER",
    svgType: "atmega",
    simUnit: "Hz Timer0 Interrupt",
    simBase: 15625,
  },
  {
    id: "daretosip",
    code: "07",
    domain: "VENTURE PROTOTYPING",
    title: "DARE TO SIP POP-UP",
    metricLabel: "EXECUTION WINDOW",
    metricValue: "48-HOUR LIVE VENTURE",
    stack: "UNIT ECONOMICS / PRICING / OPERATIONS",
    summary: "Gamified physical commerce prototype validating dynamic pricing and high-throughput order fulfillment on campus.",
    repoUrl: "https://github.com/Jay888-DARK",
    liveLabel: "SIMULATE DEMAND SURGE",
    svgType: "daretosip",
    simUnit: "% Gross Margin",
    simBase: 64.2,
  },
  {
    id: "ansys-fea",
    code: "08",
    domain: "COMPUTATIONAL MECHANICS",
    title: "ANSYS TENSILE FEA",
    metricLabel: "STRUCTURAL SOLVER",
    metricValue: "VON MISES // MESH CONVERGENCE",
    stack: "ANSYS WORKBENCH / STATIC STRUCTURAL",
    summary: "Finite element stress-strain distribution analysis across multi-material tensile specimens under axial loading.",
    repoUrl: "https://github.com/Jay888-DARK",
    liveLabel: "INCREMENT AXIAL LOAD",
    svgType: "ansys",
    simUnit: "MPa Peak Von Mises",
    simBase: 418,
  },
];

/* ================================================================
   SVG TELEMETRY DIAGRAMS — High-contrast anime palette
   ================================================================ */
function TechnicalDiagram({ type }: { type: ProjectNode["svgType"] }) {
  return (
    <svg
      viewBox="0 0 240 110"
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: SUMI_OBSIDIAN,
        borderTop: "3px solid " + SUMI_OBSIDIAN,
        borderLeft: "3px solid " + SUMI_OBSIDIAN,
        borderRight: "7px solid " + SUMI_OBSIDIAN,
        borderBottom: "7px solid " + SUMI_OBSIDIAN,
        borderRadius: "0px",
        display: "block",
      }}
    >
      {/* Grid hairlines */}
      <line x1="0" y1="27" x2="240" y2="27" stroke={TITANIUM_PUTTY} strokeWidth="0.5" strokeOpacity="0.15" />
      <line x1="0" y1="55" x2="240" y2="55" stroke={TITANIUM_PUTTY} strokeWidth="0.5" strokeOpacity="0.15" />
      <line x1="0" y1="82" x2="240" y2="82" stroke={TITANIUM_PUTTY} strokeWidth="0.5" strokeOpacity="0.15" />
      <line x1="60" y1="0" x2="60" y2="110" stroke={TITANIUM_PUTTY} strokeWidth="0.5" strokeOpacity="0.15" />
      <line x1="120" y1="0" x2="120" y2="110" stroke={TITANIUM_PUTTY} strokeWidth="0.5" strokeOpacity="0.15" />
      <line x1="180" y1="0" x2="180" y2="110" stroke={TITANIUM_PUTTY} strokeWidth="0.5" strokeOpacity="0.15" />

      {type === "escrow" && (
        <>
          <rect x="14" y="35" width="52" height="40" fill="rgba(217,30,42,0.12)" stroke={AKIRA_VERMILION} strokeWidth="2" />
          <rect x="94" y="35" width="52" height="40" fill="rgba(20,54,184,0.15)" stroke={ULTRAMARINE} strokeWidth="2" />
          <rect x="174" y="35" width="52" height="40" fill="rgba(242,183,5,0.12)" stroke={MECHA_GOLD} strokeWidth="2" />
          <line x1="66" y1="55" x2="94" y2="55" stroke={AKIRA_VERMILION} strokeWidth="1.5" />
          <line x1="146" y1="55" x2="174" y2="55" stroke={ULTRAMARINE} strokeWidth="1.5" />
          <text x="22" y="59" fill={SILK_BONE} fontSize="9" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">AUTH</text>
          <text x="100" y="59" fill={SILK_BONE} fontSize="9" fontWeight="800" fontFamily="Arial Black, Arial, sans-serif">ESCROW</text>
          <text x="180" y="59" fill={MECHA_GOLD} fontSize="9" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">SETTLE</text>
        </>
      )}

      {type === "garch" && (
        <>
          <polyline fill="none" stroke={TITANIUM_PUTTY} strokeWidth="1" strokeOpacity="0.3" points="0,85 30,80 60,72 90,45 120,25 150,60 180,50 210,30 240,20" />
          <polyline fill="none" stroke={ULTRAMARINE} strokeWidth="1.4" points="0,90 30,88 60,84 90,70 120,62 150,78 180,74 210,66 240,60" />
          <polyline fill="none" stroke={AKIRA_VERMILION} strokeWidth="2" points="0,88 25,82 50,76 75,38 100,18 125,54 150,48 175,28 200,42 240,14" />
          <text x="155" y="22" fill={MECHA_GOLD} fontSize="8" fontWeight="800" fontFamily="Arial Black, Arial, sans-serif">TAIL RISK</text>
        </>
      )}

      {type === "sentinel" && (
        <>
          <polyline fill="none" stroke={AKIRA_VERMILION} strokeWidth="1.8" points="10,55 45,55 55,20 65,90 75,55 115,55 125,14 135,96 145,55 230,55" />
          <rect x="115" y="10" width="30" height="90" fill="rgba(20,54,184,0.18)" stroke={ULTRAMARINE} strokeWidth="1" strokeDasharray="3,3" />
          <text x="119" y="24" fill={MECHA_GOLD} fontSize="8" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">eBPF</text>
        </>
      )}

      {type === "gnuradio" && (
        <>
          <polyline fill="none" stroke={AKIRA_VERMILION} strokeWidth="1.8" points="0,55 15,25 30,55 45,85 60,55 75,25 90,55 105,85 120,55 135,25 150,55 165,85 180,55 195,25 210,55 225,85 240,55" />
          <polyline fill="none" stroke={ULTRAMARINE} strokeWidth="1.3" points="0,25 15,55 30,85 45,55 60,25 75,55 90,85 105,55 120,25 135,55 150,85 165,55 180,25 195,55 210,85 225,55 240,25" />
        </>
      )}

      {type === "hardcarbon" && (
        <>
          <polyline fill="none" stroke={MECHA_GOLD} strokeWidth="2" points="0,95 40,95 48,12 65,12 75,95 115,95 123,18 140,18 150,95 240,95" />
          <text x="80" y="34" fill={AKIRA_VERMILION} fontSize="9" fontWeight="800" fontFamily="Arial Black, Arial, sans-serif">3000K FLASH</text>
        </>
      )}

      {type === "atmega" && (
        <>
          <polyline fill="none" stroke={ULTRAMARINE} strokeWidth="1.8" points="0,80 0,30 30,30 30,80 60,80 60,30 110,30 110,80 130,80 130,30 190,30 190,80 210,80 210,30 240,30" />
          <line x1="0" y1="80" x2="240" y2="80" stroke={MECHA_GOLD} strokeWidth="1" strokeDasharray="2,2" />
          <text x="140" y="24" fill={SILK_BONE} fontSize="8" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">PWM CH-0</text>
        </>
      )}

      {type === "daretosip" && (
        <>
          <rect x="20" y="65" width="24" height="35" fill={ULTRAMARINE} />
          <rect x="60" y="48" width="24" height="52" fill={AKIRA_VERMILION} />
          <rect x="100" y="32" width="24" height="68" fill={MECHA_GOLD} />
          <rect x="140" y="18" width="24" height="82" fill={AKIRA_VERMILION} />
          <rect x="180" y="26" width="24" height="74" fill={ULTRAMARINE} />
        </>
      )}

      {type === "ansys" && (
        <>
          <polyline fill="none" stroke={AKIRA_VERMILION} strokeWidth="2" points="10,98 55,28 95,24 145,16 195,22 225,45" />
          <line x1="55" y1="28" x2="55" y2="98" stroke={MECHA_GOLD} strokeWidth="1.2" strokeDasharray="3,3" />
          <text x="62" y="90" fill={MECHA_GOLD} fontSize="9" fontWeight="700" fontFamily="Arial Black, Arial, sans-serif">YIELD LIMIT</text>
        </>
      )}
    </svg>
  );
}

/* ================================================================
   SLAB BORDER MIXIN — Asymmetric Neo-Brutalist depth (no box-shadow)
   ================================================================ */
const SLAB_BORDER: React.CSSProperties = {
  borderTop: "3px solid " + SUMI_OBSIDIAN,
  borderLeft: "3px solid " + SUMI_OBSIDIAN,
  borderRight: "7px solid " + SUMI_OBSIDIAN,
  borderBottom: "7px solid " + SUMI_OBSIDIAN,
  borderRadius: "0px",
};

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function RoundCarousel({
  projects = PORTFOLIO_PROJECTS,
  imageWidth = 290,
  imageHeight = 380,
  spacing = 3,
  speed = 3.5,
  direction = "right",
  drag = true,
  sensitivity = 5,
  tilt = -5,
  perspective = 2800,
  innerDim = 2.5,
  background = "transparent",
  style = {},
}: RoundCarouselProps) {
  const items = projects.length > 0 ? projects : PORTFOLIO_PROJECTS;
  const count = items.length;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoadingInspector, setIsLoadingInspector] = useState<boolean>(false);
  const [simMultiplier, setSimMultiplier] = useState<number>(1);

  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const targetRotYRef = useRef<number | null>(null);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, lastX: 0, moved: false });

  const angle = 360 / count;
  const factor = 1 + spacing * 0.15;
  const radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));
  const degPerSec = speed * 4 * (direction === "left" ? -1 : 1);

  const selectProject = (index: number) => {
    setSelectedIndex(index);
    setIsLoadingInspector(true);
    setSimMultiplier(1);
    targetRotYRef.current = -index * angle;
    velRef.current = 0;
    setTimeout(() => {
      setIsLoadingInspector(false);
    }, 220);
  };

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const apply = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`;
    };
    apply();

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;

      if (!d.active) {
        if (targetRotYRef.current !== null) {
          const diff = targetRotYRef.current - rotYRef.current;
          if (Math.abs(diff) > 0.25) {
            rotYRef.current += diff * Math.min(1, f * 8);
          } else {
            rotYRef.current = targetRotYRef.current;
            targetRotYRef.current = null;
          }
        } else if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94;
        } else {
          rotYRef.current += degPerSec * f;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!drag) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      lastX: e.clientX,
      moved: false,
    };
    targetRotYRef.current = null;
    velRef.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.lastX;
    if (Math.abs(e.clientX - d.startX) > 6) {
      d.moved = true;
    }
    d.lastX = e.clientX;
    const k = 0.28 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  const activeProject = items[selectedIndex] || items[0];
  const computedMetric = (activeProject.simBase * simMultiplier).toFixed(
    activeProject.simBase % 1 === 0 ? 0 : 2
  );

  /* Mecha Dossier Slab Card Face */
  const cardFaceStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "0px",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    backgroundColor: SILK_BONE,
    ...SLAB_BORDER,
    padding: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: '"Arial Black", Impact, Arial, Helvetica, sans-serif',
    color: SUMI_OBSIDIAN,
    userSelect: "none",
  };

  return (
    <div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: background,
        fontFamily: '"Arial Black", Impact, Arial, Helvetica, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* 3D RING STAGE */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          perspective: `${perspective}px`,
          cursor: drag ? "grab" : "default",
          touchAction: "none",
          position: "relative",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt}deg)`,
          }}
        >
          <div
            ref={ringRef}
            style={{
              position: "relative",
              width: imageWidth,
              height: imageHeight,
              transformStyle: "preserve-3d",
            }}
          >
            {items.map((proj, i) => {
              const isSelected = i === selectedIndex;
              const accentColor = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    if (!dragRef.current.moved) {
                      selectProject(i);
                    }
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    cursor: "pointer",
                  }}
                >
                  {/* FRONT — MECHA DOSSIER SLAB */}
                  <div
                    style={{
                      ...cardFaceStyle,
                      borderColor: isSelected ? accentColor : SUMI_OBSIDIAN,
                      position: "relative",
                    }}
                  >
                    {/* Colored Header Bar */}
                    <div
                      style={{
                        width: "100%",
                        height: "6px",
                        backgroundColor: accentColor,
                      }}
                    />

                    <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "2px solid " + SUMI_OBSIDIAN,
                            paddingBottom: "6px",
                            marginBottom: "8px",
                            fontSize: "9px",
                            letterSpacing: "0.08em",
                            color: SUMI_OBSIDIAN,
                          }}
                        >
                          <span style={{ fontWeight: 900 }}>
                            {proj.code} <span style={{ color: accentColor }}>//</span> {proj.domain}
                          </span>
                          <span
                            style={{
                              color: isSelected ? accentColor : SUMI_OBSIDIAN,
                              fontWeight: 900,
                              fontSize: "8px",
                            }}
                          >
                            {isSelected ? "[ACTIVE]" : "[SELECT]"}
                          </span>
                        </div>

                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 900,
                            letterSpacing: "0.02em",
                            marginBottom: "8px",
                            color: SUMI_OBSIDIAN,
                            textTransform: "uppercase",
                            lineHeight: 1.1,
                          }}
                        >
                          {proj.title}
                        </div>

                        <TechnicalDiagram type={proj.svgType} />
                      </div>

                      <div>
                        <div
                          style={{
                            borderTop: "2px solid " + SUMI_OBSIDIAN,
                            borderBottom: "2px solid " + SUMI_OBSIDIAN,
                            padding: "6px 0",
                            marginTop: "6px",
                            marginBottom: "6px",
                          }}
                        >
                          <div style={{ fontSize: "8px", color: SUMI_OBSIDIAN, letterSpacing: "0.08em", fontWeight: 700, opacity: 0.6 }}>
                            {proj.metricLabel}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: 900, color: SUMI_OBSIDIAN, marginTop: "2px" }}>
                            {proj.metricValue}
                          </div>
                        </div>

                        <div
                          style={{
                            fontSize: "9px",
                            color: SUMI_OBSIDIAN,
                            letterSpacing: "0.04em",
                            fontWeight: 700,
                            opacity: 0.7,
                          }}
                        >
                          {proj.stack.split(" / ").map((tech, idx, arr) => (
                            <React.Fragment key={idx}>
                              <span>{tech}</span>
                              {idx < arr.length - 1 && <span style={{ color: accentColor }}> / </span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    style={{
                      ...cardFaceStyle,
                      transform: "rotateY(180deg)",
                      backgroundColor: TITANIUM_PUTTY,
                      filter: `brightness(${innerDim / 10})`,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ padding: "20px", textAlign: "center" }}>
                      <div style={{ fontSize: "18px", fontWeight: 900, color: SUMI_OBSIDIAN, letterSpacing: "0.08em" }}>
                        {proj.code} <span style={{ color: accentColor }}>//</span> {proj.id.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================================
          LIVE TELEMETRY & STRESS-TEST DOCK
          ================================================================ */}
      <div
        style={{
          height: "165px",
          backgroundColor: SUMI_OBSIDIAN,
          borderTop: "8px solid " + SUMI_OBSIDIAN,
          padding: "16px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Index Selector Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid " + SILK_BONE,
            paddingBottom: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {items.map((item, idx) => {
              const isActive = idx === selectedIndex;
              const btnAccent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length];
              return (
                <button
                  key={item.id}
                  onClick={() => selectProject(idx)}
                  style={{
                    backgroundColor: isActive ? btnAccent : "transparent",
                    color: isActive ? (btnAccent === MECHA_GOLD ? SUMI_OBSIDIAN : SILK_BONE) : SILK_BONE,
                    borderTop: "3px solid " + (isActive ? btnAccent : SILK_BONE),
                    borderLeft: "3px solid " + (isActive ? btnAccent : SILK_BONE),
                    borderRight: "7px solid " + (isActive ? btnAccent : SILK_BONE),
                    borderBottom: "7px solid " + (isActive ? btnAccent : SILK_BONE),
                    borderRadius: "0px",
                    padding: "4px 10px",
                    fontSize: "10px",
                    fontWeight: 900,
                    fontFamily: '"Arial Black", Impact, Arial, Helvetica, sans-serif',
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.code} // {item.title.split(" ")[0]}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: "10px", color: TITANIUM_PUTTY, letterSpacing: "0.06em", fontWeight: 700 }}>
            CLICK CARD OR INDEX TO LOCK TELEMETRY
          </div>
        </div>

        {/* Skeleton Loader vs Active Project Telemetry */}
        {isLoadingInspector ? (
          <div style={{ display: "flex", gap: "24px", alignItems: "center", height: "85px" }}>
            <div
              style={{
                flex: 2,
                height: "54px",
                backgroundColor: TITANIUM_PUTTY,
                ...SLAB_BORDER,
              }}
            />
            <div
              style={{
                flex: 1,
                height: "54px",
                backgroundColor: TITANIUM_PUTTY,
                ...SLAB_BORDER,
              }}
            />
            <div
              style={{
                width: "180px",
                height: "54px",
                backgroundColor: TITANIUM_PUTTY,
                ...SLAB_BORDER,
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
              paddingTop: "8px",
            }}
          >
            <div style={{ flex: 2 }}>
              <div style={{ fontSize: "13px", fontWeight: 900, color: SILK_BONE, marginBottom: "4px" }}>
                <span style={{ color: AKIRA_VERMILION }}>{activeProject.code} //</span> {activeProject.title} —{" "}
                <span style={{ color: TITANIUM_PUTTY }}>{activeProject.stack}</span>
              </div>
              <div style={{ fontSize: "11px", color: TITANIUM_PUTTY, lineHeight: 1.4, fontWeight: 700 }}>
                {activeProject.summary}
              </div>
            </div>

            {/* Live Interactive Stress Simulator */}
            <div
              style={{
                flex: 1,
                backgroundColor: SILK_BONE,
                ...SLAB_BORDER,
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "9px", color: SUMI_OBSIDIAN, letterSpacing: "0.06em", fontWeight: 700, opacity: 0.6 }}>
                  LIVE TELEMETRY BENCHMARK
                </div>
                <div style={{ fontSize: "14px", fontWeight: 900, color: AKIRA_VERMILION, marginTop: "2px" }}>
                  {computedMetric} {activeProject.simUnit}
                </div>
              </div>
              <button
                onClick={() => setSimMultiplier((prev) => (prev >= 1.8 ? 0.85 : Number((prev + 0.23).toFixed(2))))}
                style={{
                  backgroundColor: AKIRA_VERMILION,
                  color: SILK_BONE,
                  ...SLAB_BORDER,
                  padding: "6px 12px",
                  fontSize: "9px",
                  fontWeight: 900,
                  fontFamily: '"Arial Black", Impact, Arial, Helvetica, sans-serif',
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {activeProject.liveLabel}
              </button>
            </div>

            {/* INSPECT GITHUB Button */}
            <a
              href={activeProject.repoUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: MECHA_GOLD,
                color: SUMI_OBSIDIAN,
                padding: "14px 20px",
                fontSize: "10px",
                fontWeight: 900,
                textDecoration: "none",
                letterSpacing: "0.06em",
                ...SLAB_BORDER,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              INSPECT GITHUB
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
