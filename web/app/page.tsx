import type { Metadata } from "next";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import { verticals } from "@/content/verticals";

export const metadata: Metadata = {
  title: "CBANK — AI Infrastructure for Financial Services",
  description:
    "Production-ready Claude AI skills for investment banking, equity research, private equity, fund administration, and wealth management.",
};

const FEATURED_SKILLS = [
  { vertical: "IB",           cmd: "/cim-builder",  name: "CIM Builder",     desc: "Draft a 60-page CIM from a data room in hours." },
  { vertical: "Equity",       cmd: "/morning-note", name: "Morning Note",    desc: "Post-earnings research note before the market opens." },
  { vertical: "PE",           cmd: "/ic-memo",       name: "IC Memo",         desc: "From DD findings to IC-ready memo in one command." },
  { vertical: "Fin Analysis", cmd: "/dcf-model",    name: "DCF Model",       desc: "5-year DCF with WACC sensitivity from a 10-K." },
  { vertical: "Fund Admin",   cmd: "/nav-tieout",   name: "NAV Tie-Out",     desc: "Catch LP statement errors before they reach investors." },
  { vertical: "Wealth",       cmd: "/fin-plan",     name: "Financial Plan",  desc: "Full retirement plan from a client intake form." },
];

const PILLARS = [
  { icon: "⬡", label: "Purpose-built",  desc: "Every skill was designed for a specific financial workflow — not adapted from a generic template." },
  { icon: "○", label: "Zero setup",      desc: "Download a ZIP, upload it to Claude. No API keys, no infrastructure, no code." },
  { icon: "◇", label: "Apache-2.0",      desc: "Open source and modifiable. Fork the repo, edit the SKILL.md files, upload your version." },
  { icon: "□", label: "Desk-specific",   desc: "Install what your team needs. IB, equity research, PE, fund admin — each vertical is independent." },
];

const ArrowSVG = () => (
  <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.92007 0C6.00007 0 6.06674 0.0266667 6.12007 0.08L9.25341 3.34667C9.25341 3.34667 9.33341 3.48 9.33341 3.56V4.69333C9.33341 4.77333 9.30674 4.84 9.25341 4.90667L6.18674 8.09333C6.18674 8.09333 6.06674 8.17333 5.98674 8.17333H5.29341C5.04007 8.17333 4.92007 7.85333 5.09341 7.66667L7.98674 4.66667H0.320072C7.22607e-05 4.66667 -0.119928 4.24 0.146739 4.06667L0.880072 3.56C0.880072 3.56 1.00007 3.50667 1.05341 3.50667H7.90674L5.02674 0.506667C4.85341 0.32 4.97341 0 5.22674 0H5.92007Z"
      fill="currentColor"
    />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="hero-bg"
        style={{
          position: "relative",
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "80px 48px",
        }}
      >
        {/* Radial fade */}
        <div
          style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0, left: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 65% 80% at 28% 50%, " +
              "rgba(255,255,255,0.97) 0%, " +
              "rgba(255,255,255,0.85) 38%, " +
              "rgba(255,255,255,0.25) 72%, " +
              "transparent 100%)",
          }}
        />

        {/* Left: headline + sub + CTAs */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 600, flexShrink: 0 }}>
          <h1
            className="anim anim-d1 hero-h1"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(48px, 7vw, 82px)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.05em",
              marginBottom: 24,
            }}
          >
            <span style={{ color: "var(--text)", display: "block" }}>The Claude skill layer for</span>
            <span style={{ color: "var(--text-fade)", display: "block" }}>financial services</span>
          </h1>
          <p
            className="anim anim-d2"
            style={{
              fontSize: 16,
              color: "rgba(13,31,20,0.50)",
              maxWidth: 440,
              lineHeight: 1.68,
              fontWeight: 300,
              marginBottom: 40,
            }}
          >
            CBANK is the connective layer that brings Claude AI skills to every financial desk —
            investment banking, equity research, private equity, and wealth management.
          </p>
          <div className="anim anim-d3" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link
              href="/skills"
              style={{
                background: "var(--text)",
                color: "#fff",
                padding: "13px 28px",
                borderRadius: 7,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Browse all skills
            </Link>
            <Link
              href="/docs"
              className="hero-btn-link"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
                display: "flex",
                alignItems: "center",
                gap: 7,
                textDecoration: "none",
              }}
            >
              Start building
              <ArrowSVG />
            </Link>
          </div>
        </div>

        {/* Right: floating isometric diamonds */}
        <div
          className="anim anim-d4 hero-diamonds"
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "52%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 520 480" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="ds1" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(46,139,87,0.18)" />
              </filter>
              <filter id="ds2" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="rgba(46,139,87,0.14)" />
              </filter>
              <linearGradient id="gtop"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#dceee4" /><stop offset="100%" stopColor="#c0dccb" /></linearGradient>
              <linearGradient id="gleft" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a8d4be" /><stop offset="100%" stopColor="#7bbf9e" /></linearGradient>
              <linearGradient id="grite" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#c0dccb" /><stop offset="100%" stopColor="#96c8ae" /></linearGradient>
            </defs>
            <g filter="url(#ds1)" transform="translate(300,55)">
              <polygon points="65,0  130,38  65,76  0,38"  fill="url(#gtop)"  opacity="0.88" />
              <polygon points="0,38  65,76  65,120 0,82"   fill="url(#gleft)" opacity="0.88" />
              <polygon points="65,76 130,38 130,82 65,120" fill="url(#grite)" opacity="0.88" />
            </g>
            <g filter="url(#ds2)" transform="translate(360,220)">
              <polygon points="46,0  92,27  46,54  0,27"  fill="url(#gtop)"  opacity="0.82" />
              <polygon points="0,27  46,54  46,86  0,59"  fill="url(#gleft)" opacity="0.82" />
              <polygon points="46,54 92,27 92,59 46,86"   fill="url(#grite)" opacity="0.82" />
            </g>
            <g filter="url(#ds2)" transform="translate(210,320)">
              <polygon points="36,0  72,21  36,42  0,21"  fill="url(#gtop)"  opacity="0.72" />
              <polygon points="0,21  36,42  36,66  0,45"  fill="url(#gleft)" opacity="0.72" />
              <polygon points="36,42 72,21 72,45 36,66"   fill="url(#grite)" opacity="0.72" />
            </g>
            <g filter="url(#ds2)" transform="translate(454,140)">
              <polygon points="28,0  56,16  28,32  0,16"  fill="url(#gtop)"  opacity="0.65" />
              <polygon points="0,16  28,32  28,52  0,36"  fill="url(#gleft)" opacity="0.65" />
              <polygon points="28,32 56,16 56,36 28,52"   fill="url(#grite)" opacity="0.65" />
            </g>
            <g filter="url(#ds2)" transform="translate(165,175)">
              <polygon points="40,0  80,23  40,46  0,23"  fill="url(#gtop)"  opacity="0.45" />
              <polygon points="0,23  40,46  40,72  0,49"  fill="url(#gleft)" opacity="0.45" />
              <polygon points="40,46 80,23 80,49 40,72"   fill="url(#grite)" opacity="0.45" />
            </g>
          </svg>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <Marquee />

      {/* ── STATS — Wormhole-style large counters ─────────────── */}
      <div style={{ background: "var(--bg)", borderBottom: "1px solid var(--b0)" }}>
        {/* Hero stat */}
        <div className="anim" style={{ padding: "52px 48px 36px", textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            color: "var(--text)",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 4,
          }}>
            <span style={{ fontSize: "clamp(60px, 10vw, 96px)" }}>55</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", marginTop: 10 }}>
            Production-ready skills — ready to install today
          </div>
        </div>

        {/* 3-col secondary stats */}
        <div
          className="stats-bar"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--b0)" }}
        >
          {[
            { prefix: "", num: "7",   suffix: "",    label: "Financial verticals" },
            { prefix: "", num: "10",  suffix: "",    label: "End-to-end agents" },
            { prefix: "", num: "0",   suffix: "loc", label: "Lines of code to install" },
          ].map((s, i) => (
            <div
              key={i}
              className={`anim anim-d${i + 1}`}
              style={{
                padding: "32px 24px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid var(--b0)" : undefined,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2 }}>
                {s.prefix && (
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "rgba(13,31,20,0.25)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                    {s.prefix}
                  </span>
                )}
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 800, color: "var(--text)", lineHeight: 1, letterSpacing: "-0.05em" }}>
                  {s.num}
                </span>
                {s.suffix && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 700, color: "var(--accent)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                    {s.suffix}
                  </span>
                )}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 10 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SPLIT SECTION — "Connecting every desk" ──────────── */}
      <div
        style={{
          background: "var(--s1)",
          borderBottom: "1px solid var(--b0)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="split-section"
      >
        {/* Left: text */}
        <div style={{ padding: "72px 48px", borderRight: "1px solid var(--b0)" }}>
          <div className="anim" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
            The connective layer
          </div>
          <h2 className="anim anim-d1" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--text)", marginBottom: 20 }}>
            Connecting every<br />
            <span style={{ color: "var(--text-fade)" }}>financial desk</span>
          </h2>
          <p className="anim anim-d2" style={{ fontSize: 14, color: "rgba(13,31,20,0.55)", lineHeight: 1.75, fontWeight: 300, maxWidth: 400, marginBottom: 32 }}>
            CBANK provides the institutional-grade Claude skills that keep analysts productive across
            every desk — from IB pitch decks to fund admin reconciliations, from equity morning
            notes to private equity IC memos.
          </p>
          <div className="anim anim-d3" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Investment Banking · M&A, CIM, pitches", "Equity Research · Morning notes, initiations", "Private Equity · Deal screening, IC memos", "Fund Administration · NAV tie-outs, GL recon"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.02em" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: terminal demo */}
        <div style={{ padding: "72px 48px", display: "flex", alignItems: "center" }}>
          <div className="anim anim-d2" style={{ width: "100%", background: "#0D1F14", borderRadius: 14, overflow: "hidden" }}>
            {/* Terminal title bar */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.2)", marginLeft: 8 }}>claude — CBANK Skills</span>
            </div>
            {/* Terminal body */}
            <div style={{ padding: "24px 22px", fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 2 }}>
              {[
                { prompt: true,  text: "/cim-builder Draft CIM for SaaS company — attached data room" },
                { prompt: false, text: "Reading data room... structuring narrative...", color: "rgba(255,255,255,0.35)" },
                { prompt: false, text: "Building executive summary and financials...", color: "rgba(255,255,255,0.35)" },
                { prompt: false, text: "✓ CIM ready — 64 pages. Download DOCX.", color: "rgba(46,139,87,0.8)" },
                { prompt: true,  text: "/dcf Apple 10-K — 5yr DCF with WACC sensitivity" },
                { prompt: false, text: "Projecting FCF 2025–2029... calculating WACC...", color: "rgba(255,255,255,0.35)" },
                { prompt: false, text: "✓ DCF complete. Base case $198/share. Excel ready.", color: "rgba(46,139,87,0.8)" },
                { prompt: true,  text: "/ic-memo Acquisition of TechCo at 12x EBITDA" },
                { prompt: false, text: "✓ IC memo drafted — 22 pages. Download PDF.", color: "rgba(46,139,87,0.8)" },
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: line.prompt ? "var(--accent)" : "transparent", flexShrink: 0 }}>›</span>
                  <span style={{ color: line.color ?? "#fff" }}>{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED SKILLS ──────────────────────────────────── */}
      <div style={{ padding: "64px 48px", background: "var(--bg)" }}>
        <div className="anim" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
          Featured skills
        </div>
        <h2 className="anim anim-d1" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 10 }}>
          The full workflow,{" "}
          <span style={{ color: "var(--text-fade)" }}>one command at a time</span>
        </h2>
        <p className="anim anim-d2" style={{ fontSize: 13, color: "rgba(13,31,20,0.45)", maxWidth: 420, lineHeight: 1.65, fontWeight: 300, marginBottom: 36 }}>
          Purpose-built for each desk. Download one skill or an entire vertical from GitHub.
        </p>

        <div
          className="skills-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}
        >
          {FEATURED_SKILLS.map((s, i) => (
            <Link
              key={s.cmd}
              href={`/skills/${s.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={`skill-card anim anim-d${(i % 3) + 1}`}
              style={{
                background: "var(--s1)",
                border: "1px solid var(--b0)",
                borderRadius: 12,
                padding: "22px 24px",
                textDecoration: "none",
                display: "block",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", background: "var(--s3)", padding: "3px 8px", borderRadius: 4 }}>
                  {s.vertical}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 8px", borderRadius: 4 }}>
                  {s.cmd}
                </span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                {s.name}
              </div>
              <div style={{ fontSize: 11, color: "rgba(13,31,20,0.45)", lineHeight: 1.6, fontWeight: 300 }}>
                {s.desc}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link
            href="/skills"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.04em" }}
          >
            View all 55 skills →
          </Link>
        </div>
      </div>

      {/* ── THREE STEPS — dark section ───────────────────────── */}
      <div style={{ background: "var(--text)", padding: "72px 48px" }}>
        <div className="anim" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(46,139,87,0.7)", marginBottom: 12 }}>
          How it works
        </div>
        <h2 className="anim anim-d1" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: 52 }}>
          Three steps.{" "}
          <span style={{ color: "rgba(255,255,255,0.32)" }}>No setup.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { n: "01", title: "Choose a vertical", desc: "Browse 7 financial verticals and 55 production skills. Pick exactly what your desk needs — nothing more." },
            { n: "02", title: "Install the skill", desc: "Download the ZIP from GitHub. Upload to claude.ai/customize/skills. Active in under 2 minutes, no code required." },
            { n: "03", title: "Run the command", desc: "Type /dcf, /cim-builder, /ic-memo — or any of the 55 slash commands — in Claude and attach your files." },
          ].map((step, i) => (
            <div
              key={step.n}
              className={`anim anim-d${i + 1}`}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: "28px 26px",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 30, fontWeight: 800, color: "var(--accent)", lineHeight: 1, marginBottom: 18, letterSpacing: "-0.04em" }}>
                {step.n}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 10, letterSpacing: "-0.01em" }}>
                {step.title}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontWeight: 300 }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PILLARS — "The foundation" ────────────────────────── */}
      <div style={{ background: "var(--bg)", borderTop: "1px solid var(--b0)", padding: "64px 48px" }}>
        <div className="anim" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
          Why CBANK
        </div>
        <h2 className="anim anim-d1" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 44 }}>
          The foundation for{" "}
          <span style={{ color: "var(--text-fade)" }}>financial AI.</span>
        </h2>
        <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.label}
              className={`anim anim-d${i + 1}`}
              style={{
                padding: "28px 24px",
                borderTop: "1px solid var(--b0)",
                borderRight: i < 3 ? "1px solid var(--b0)" : undefined,
              }}
            >
              <div style={{ fontSize: 20, color: "var(--accent)", marginBottom: 14, lineHeight: 1 }}>
                {p.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                {p.label}
              </div>
              <div style={{ fontSize: 12, color: "rgba(13,31,20,0.45)", lineHeight: 1.65, fontWeight: 300 }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VERTICALS GRID ───────────────────────────────────── */}
      <div style={{ padding: "64px 48px", background: "var(--s1)", borderTop: "1px solid var(--b0)" }}>
        <div className="anim" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
          All verticals
        </div>
        <h2 className="anim anim-d1" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 10 }}>
          Install only what{" "}
          <span style={{ color: "var(--text-fade)" }}>your team needs</span>
        </h2>
        <p className="anim anim-d2" style={{ fontSize: 13, color: "rgba(13,31,20,0.45)", maxWidth: 420, lineHeight: 1.65, fontWeight: 300, marginBottom: 36 }}>
          Each vertical is a self-contained plugin — install one skill, one vertical, or all seven.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {verticals.map((v, i) => (
            <Link
              key={v.slug}
              href={`/skills/${v.slug}`}
              className={`skill-card anim anim-d${(i % 3) + 1}`}
              style={{ background: "var(--bg)", border: "1px solid var(--b0)", borderRadius: 12, padding: "22px 24px", textDecoration: "none", display: "block" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", background: "var(--s3)", padding: "3px 8px", borderRadius: 4 }}>
                  {v.skills.length} skills
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-faint)", letterSpacing: "0.04em" }}>
                  v{v.version}
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 5, letterSpacing: "-0.02em" }}>
                {v.title}
              </div>
              <div style={{ fontSize: 11, color: "rgba(13,31,20,0.45)", lineHeight: 1.55, marginBottom: 16, fontWeight: 300 }}>
                {v.tagline}
              </div>
              <code style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--accent)", background: "var(--accent-dim)", padding: "4px 8px", borderRadius: 4, display: "inline-block", letterSpacing: "0.02em" }}>
                {v.installCommand}
              </code>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <div style={{ background: "var(--bg)", borderTop: "1px solid var(--b0)", padding: "64px 48px", textAlign: "center" }}>
        <h2
          className="anim"
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 10 }}
        >
          Ready to install your first skill?{" "}
          <span style={{ color: "var(--text-fade)" }}>Start in minutes.</span>
        </h2>
        <p className="anim anim-d1" style={{ fontSize: 14, color: "rgba(13,31,20,0.45)", marginBottom: 28, fontWeight: 300 }}>
          Start with Financial Analysis — the foundation every other skill builds on.
        </p>
        <div className="anim anim-d2" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <Link
            href="/skills/financial-analysis"
            style={{ background: "var(--text)", color: "#fff", padding: "13px 26px", borderRadius: 7, fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans)", textDecoration: "none", display: "inline-block" }}
          >
            Start with Financial Analysis
          </Link>
          <Link
            href="/docs"
            className="hero-btn-link"
            style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}
          >
            Read the install guide
            <ArrowSVG />
          </Link>
        </div>
        <p className="anim anim-d3" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", marginTop: 16, letterSpacing: "0.04em" }}>
          Requires Claude for Work (Teams or Enterprise) · Free · Apache-2.0
        </p>
      </div>
    </>
  );
}
