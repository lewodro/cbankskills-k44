import { useState, useEffect, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #FFFFFF;
    --s1:        #F5F9F7;
    --s2:        #EBF3EE;
    --s3:        #DCEEe4;
    --b0:        rgba(0,0,0,0.07);
    --b1:        rgba(0,0,0,0.11);
    --b2:        rgba(0,0,0,0.20);
    --gold:      #2E8B57;
    --gold-dim:  rgba(46,139,87,0.09);
    --gold-mid:  rgba(46,139,87,0.22);
    --text:      #0D1F14;
    --sub:       #527A62;
    --faint:     #B8D4C2;
    --green:     #2E8B57;
    --green-dim: rgba(46,139,87,0.09);
    --font-sans: 'Geist', sans-serif;
    --font-mono: 'Geist Mono', monospace;
    --font-serif:'Instrument Serif', serif;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* ── dot grid overlay ── */
  .dot-grid::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: radial-gradient(rgba(46,139,87,0.18) 1px, transparent 1px);
    background-size: 26px 26px;
    pointer-events: none;
    z-index: 0;
  }

  /* ── noise texture ── */
  .noise::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .rel { position: relative; z-index: 1; }

  /* ── nav ── */
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 56px;
    background: rgba(255,255,255,0.88);
    border-bottom: 1px solid var(--b0);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .nav-logo {
    font-family: var(--font-serif);
    font-size: 17px;
    color: var(--text);
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .nav-logo-dot {
    width: 7px; height: 7px;
    background: var(--gold);
    border-radius: 50%;
    flex-shrink: 0;
  }
  .nav-links { display: flex; align-items: center; gap: 6px; }
  .nav-link {
    color: var(--sub);
    text-decoration: none;
    font-size: 13px;
    font-weight: 400;
    padding: 6px 12px;
    border-radius: 6px;
    transition: color 0.15s, background 0.15s;
  }
  .nav-link:hover { color: var(--text); background: var(--s2); }
  .nav-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--sub);
    border: 1px solid var(--b1);
    padding: 2px 7px;
    border-radius: 4px;
  }
  .nav-cta {
    background: var(--gold);
    color: #fff;
    border: none;
    padding: 7px 16px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 600;
    font-family: var(--font-sans);
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
  }
  .nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

  /* ── hero ── */
  .hero {
    padding: 100px 40px 80px;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--sub);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: 1px solid var(--b1);
    padding: 5px 14px;
    border-radius: 100px;
    margin-bottom: 28px;
    background: var(--s1);
  }
  .hero-eyebrow-dot { width: 5px; height: 5px; background: var(--green); border-radius: 50%; }
  .hero-h1 {
    font-family: var(--font-serif);
    font-size: clamp(44px, 7vw, 78px);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 20px;
  }
  .hero-h1 em {
    font-style: italic;
    background: linear-gradient(135deg, #1a5c38 0%, #2E8B57 55%, #52b57c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: 17px;
    color: var(--sub);
    max-width: 520px;
    margin: 0 auto 36px;
    line-height: 1.65;
    font-weight: 300;
  }
  .hero-actions { display: flex; align-items: center; justify-content: center; gap: 12px; }
  .btn-primary {
    background: var(--gold);
    color: #fff;
    border: none;
    padding: 11px 22px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    font-family: var(--font-sans);
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
  }
  .btn-primary:hover { opacity: 0.86; transform: translateY(-1px); }
  .btn-ghost {
    background: transparent;
    color: var(--sub);
    border: 1px solid var(--b1);
    padding: 11px 22px;
    border-radius: 8px;
    font-size: 14px;
    font-family: var(--font-sans);
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }
  .btn-ghost:hover { color: var(--text); border-color: var(--b2); background: var(--s2); }

  /* ── terminal ── */
  .terminal-wrap {
    max-width: 620px;
    margin: 60px auto 0;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--b1);
    background: #FFFFFF;
    box-shadow: 0 2px 0 rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.10);
  }
  .terminal-bar {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 13px 16px;
    border-bottom: 1px solid var(--b0);
    background: var(--s1);
  }
  .dot-r { width: 10px; height: 10px; border-radius: 50%; background: #FF5F57; }
  .dot-y { width: 10px; height: 10px; border-radius: 50%; background: #FEBC2E; }
  .dot-g { width: 10px; height: 10px; border-radius: 50%; background: #28C840; }
  .terminal-title {
    margin-left: auto;
    margin-right: auto;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--sub);
    transform: translateX(-18px);
  }
  .terminal-body {
    padding: 20px 24px 24px;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.8;
    min-height: 160px;
  }
  .t-prompt { color: var(--sub); }
  .t-cmd { color: var(--gold); font-weight: 500; }
  .t-text { color: var(--text); }
  .t-dim { color: #8aaa97; }
  .t-success { color: var(--green); font-weight: 500; }
  .t-cursor {
    display: inline-block;
    width: 6px;
    height: 13px;
    background: var(--green);
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── stats ── */
  .stats-bar {
    border-top: 1px solid var(--b0);
    border-bottom: 1px solid var(--b0);
    background: var(--s1);
  }
  .stats-inner {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
  }
  .stat-cell {
    padding: 36px 32px;
    border-right: 1px solid var(--b0);
    text-align: center;
  }
  .stat-cell:last-child { border-right: none; }
  .stat-num {
    font-family: var(--font-serif);
    font-size: 46px;
    font-weight: 400;
    line-height: 1;
    color: var(--text);
    margin-bottom: 6px;
  }
  .stat-num span { color: var(--gold); }
  .stat-label {
    font-size: 12px;
    color: var(--sub);
    font-weight: 400;
    letter-spacing: 0.03em;
  }

  /* ── section ── */
  .section { max-width: 1000px; margin: 0 auto; padding: 96px 40px; }
  .section-eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  }
  .section-h2 {
    font-family: var(--font-serif);
    font-size: clamp(30px, 4vw, 44px);
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--text);
    margin-bottom: 14px;
  }
  .section-sub {
    font-size: 15px;
    color: var(--sub);
    max-width: 480px;
    line-height: 1.65;
    font-weight: 300;
  }

  /* ── how it works ── */
  .steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; margin-top: 56px; }
  .step {
    background: var(--s1);
    padding: 32px 28px;
    border: 1px solid var(--b0);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .step:hover { border-color: var(--b1); }
  .step-num {
    font-family: var(--font-serif);
    font-size: 72px;
    font-weight: 400;
    color: var(--faint);
    line-height: 1;
    margin-bottom: 20px;
    letter-spacing: -0.03em;
  }
  .step-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 8px;
  }
  .step-desc { font-size: 13px; color: var(--sub); line-height: 1.65; font-weight: 300; }

  /* ── skill cards ── */
  .skills-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; margin-top: 48px; }
  .skill-card {
    background: var(--s1);
    border: 1px solid var(--b0);
    border-radius: 12px;
    padding: 22px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    position: relative;
    overflow: hidden;
  }
  .skill-card:hover { border-color: var(--b2); background: var(--s2); transform: translateY(-2px); }
  .skill-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
  .skill-vertical {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--sub);
    background: var(--s3);
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid var(--b0);
  }
  .skill-cmd {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--gold);
    background: var(--gold-dim);
    padding: 3px 8px;
    border-radius: 4px;
  }
  .skill-name { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
  .skill-desc { font-size: 12px; color: var(--sub); line-height: 1.55; font-weight: 300; }

  /* ── vertical cards ── */
  .verticals-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 2px; margin-top: 48px; }
  .vertical-card {
    background: var(--s1);
    border: 1px solid var(--b0);
    border-radius: 12px;
    padding: 28px;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.15s, background 0.2s;
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  .vertical-card:hover { border-color: var(--gold-mid); background: var(--s2); transform: translateY(-2px); }
  .vertical-icon {
    width: 40px; height: 40px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-mid);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .v-meta { flex: 1; }
  .v-top { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
  .v-name { font-size: 15px; font-weight: 500; color: var(--text); }
  .v-ver { font-family: var(--font-mono); font-size: 10px; color: var(--sub); }
  .v-desc { font-size: 13px; color: var(--sub); line-height: 1.6; font-weight: 300; margin-bottom: 12px; }
  .v-cmds { display: flex; gap: 6px; flex-wrap: wrap; }
  .v-cmd {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--gold);
    background: var(--gold-dim);
    padding: 2px 7px;
    border-radius: 4px;
  }

  /* ── CTA ── */
  .cta-section {
    border-top: 1px solid var(--b0);
    background: var(--s1);
    padding: 96px 40px;
    text-align: center;
  }
  .cta-inner { max-width: 600px; margin: 0 auto; }
  .cta-h2 {
    font-family: var(--font-serif);
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 14px;
  }
  .cta-sub { font-size: 15px; color: var(--sub); margin-bottom: 36px; font-weight: 300; }
  .cta-actions { display: flex; align-items: center; justify-content: center; gap: 12px; }
  .cta-note { font-size: 12px; color: var(--sub); margin-top: 20px; font-family: var(--font-mono); }

  /* ── footer ── */
  footer {
    border-top: 1px solid var(--b0);
    padding: 40px;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer-left { font-size: 13px; color: var(--sub); }
  .footer-links { display: flex; gap: 20px; }
  .footer-link { font-size: 12px; color: var(--sub); text-decoration: none; transition: color 0.15s; }
  .footer-link:hover { color: var(--text); }

  /* ── animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim { opacity: 0; }
  .anim.visible { animation: fadeUp 0.6s ease forwards; }
  .anim-d1.visible { animation-delay: 0.05s; }
  .anim-d2.visible { animation-delay: 0.15s; }
  .anim-d3.visible { animation-delay: 0.25s; }
  .anim-d4.visible { animation-delay: 0.35s; }
  .anim-d5.visible { animation-delay: 0.45s; }
  .anim-d6.visible { animation-delay: 0.55s; }

  @media (max-width: 768px) {
    nav { padding: 0 20px; }
    .hero { padding: 72px 20px 60px; }
    .steps, .skills-grid { grid-template-columns: 1fr; }
    .verticals-grid { grid-template-columns: 1fr; }
    .stats-inner { grid-template-columns: repeat(2,1fr); }
    .section { padding: 64px 20px; }
  }
`;

const TERMINAL_LINES = [
  { delay: 0,    type: "prompt",  text: "› " },
  { delay: 0,    type: "cmd",     text: "/cim-builder" },
  { delay: 0,    type: "text",    text: " Draft CIM for $120M EBITDA industrial SaaS" },
  { delay: 800,  type: "blank" },
  { delay: 900,  type: "dim",     text: "⟳  Parsing data room (47 files)…" },
  { delay: 1700, type: "dim",     text: "⟳  Drafting executive summary…" },
  { delay: 2500, type: "dim",     text: "⟳  Building financial exhibits…" },
  { delay: 3200, type: "dim",     text: "⟳  Running comp analysis…" },
  { delay: 4000, type: "blank" },
  { delay: 4100, type: "success", text: "✓  CIM ready — 67 pages. Export to Word or PDF." },
];

const FEATURED = [
  { vertical: "IB", cmd: "/cim-builder", name: "CIM Builder", desc: "Draft a 60-page CIM from a data room in hours." },
  { vertical: "Equity", cmd: "/morning-note", name: "Morning Note", desc: "Post-earnings research note before the market opens." },
  { vertical: "PE", cmd: "/ic-memo", name: "IC Memo", desc: "From DD findings to IC-ready memo in one command." },
  { vertical: "Fin Analysis", cmd: "/dcf-model", name: "DCF Model", desc: "5-year DCF with WACC sensitivity from a 10-K." },
  { vertical: "Fund Admin", cmd: "/nav-tieout", name: "NAV Tie-Out", desc: "Catch LP statement errors before they reach investors." },
  { vertical: "Wealth", cmd: "/financial-plan", name: "Financial Plan", desc: "Full retirement plan from a client intake form." },
];

const VERTICALS = [
  { icon: "🏦", name: "Investment Banking", ver: "v0.2.1", desc: "From mandate to close — the full deal workflow.", cmds: ["/pitch-deck", "/cim-builder", "+4"] },
  { icon: "📊", name: "Equity Research", ver: "v0.1.2", desc: "Publish research at the speed of the market.", cmds: ["/earnings-analysis", "/morning-note", "+4"] },
  { icon: "🔬", name: "Private Equity", ver: "v0.1.2", desc: "Screen more deals. Write better memos. Close faster.", cmds: ["/deal-screening", "/ic-memo", "+4"] },
  { icon: "📈", name: "Financial Analysis", ver: "v0.1.1", desc: "The modeling foundation every desk runs on.", cmds: ["/dcf-model", "/lbo-model", "+4"] },
  { icon: "⚖️", name: "Fund Administration", ver: "v0.1.0", desc: "Close the books faster, with fewer errors.", cmds: ["/nav-tieout", "/gl-recon", "+4"] },
  { icon: "💼", name: "Wealth Management", ver: "v0.1.2", desc: "Deliver personalized advice at scale.", cmds: ["/financial-plan", "/investment-proposal", "+4"] },
];

function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

function Terminal() {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((l, i) =>
      setTimeout(() => setLines((prev) => [...prev, { ...l, id: i }]), l.delay + 400)
    );
    const cursor = setTimeout(() => setShowCursor(false), 4800);
    return () => { timers.forEach(clearTimeout); clearTimeout(cursor); };
  }, []);

  const renderLine = (l) => {
    if (l.type === "blank") return <br key={l.id} />;
    const style = {
      prompt:  { color: "var(--sub)" },
      cmd:     { color: "var(--gold)" },
      text:    { color: "var(--text)" },
      dim:     { color: "var(--sub)" },
      success: { color: "var(--green)" },
    }[l.type] || {};
    return (
      <div key={l.id} style={{ display: "flex" }}>
        <span style={style}>{l.text}</span>
        {l.id === 0 && showCursor && <span className="t-cursor" />}
      </div>
    );
  };

  const firstLine = lines.filter(l => l.id === 0 || l.id === 1 || l.id === 2);
  const restLines = lines.filter(l => l.id > 2);

  return (
    <div className="terminal-wrap">
      <div className="terminal-bar">
        <span className="dot-r" />
        <span className="dot-y" />
        <span className="dot-g" />
        <span className="terminal-title">claude.ai</span>
      </div>
      <div className="terminal-body">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {firstLine.map(renderLine)}
        </div>
        {restLines.map(renderLine)}
      </div>
    </div>
  );
}

function StatCell({ num, suffix = "", label, startCount }) {
  const val = useCountUp(num, 1600, startCount);
  return (
    <div className="stat-cell">
      <div className="stat-num">{val}<span>{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function AnimSection({ children, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`anim ${vis ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function App() {
  const statsRef = useRef(null);
  const [statsVis, setStatsVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVis(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="dot-grid noise">

        {/* NAV */}
        <nav className="rel">
          <div className="nav-logo">
            <span className="nav-logo-dot" />
            CN Finance
          </div>
          <div className="nav-links">
            <a href="#" className="nav-link">Skills</a>
            <a href="#" className="nav-link">Docs</a>
            <a href="#" className="nav-link">GitHub</a>
            <span className="nav-badge">Apache-2.0</span>
          </div>
          <button className="nav-cta">Open Claude →</button>
        </nav>

        {/* HERO */}
        <div className="hero rel">
          <AnimSection className="anim-d1">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              55 production-ready skills · 7 verticals
            </div>
          </AnimSection>
          <AnimSection className="anim-d2">
            <h1 className="hero-h1">
              Claude skills built for<br />
              <em>financial services</em>
            </h1>
          </AnimSection>
          <AnimSection className="anim-d3">
            <p className="hero-sub">
              Production-ready skills for investment banking, equity research,
              private equity, and wealth management. Download, upload, start in minutes.
            </p>
          </AnimSection>
          <AnimSection className="anim-d4">
            <div className="hero-actions">
              <button className="btn-primary">Browse all skills →</button>
              <button className="btn-ghost">How to install</button>
            </div>
          </AnimSection>
          <AnimSection className="anim-d5">
            <Terminal />
          </AnimSection>
        </div>

        {/* STATS */}
        <div className="stats-bar rel" ref={statsRef}>
          <div className="stats-inner">
            <StatCell num={55}  label="production-ready skills" startCount={statsVis} />
            <StatCell num={7}   label="financial verticals"     startCount={statsVis} />
            <StatCell num={10}  label="end-to-end agents"       startCount={statsVis} />
            <StatCell num={0}   suffix="  lines to install" label="of code required" startCount={statsVis} />
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="section rel">
          <AnimSection>
            <div className="section-eyebrow">How it works</div>
            <h2 className="section-h2">Three steps. No setup.</h2>
            <p className="section-sub">No API keys. No build step. No dependencies.</p>
          </AnimSection>
          <div className="steps">
            {[
              { n: "01", title: "Find your skill", desc: "Browse 55 skills across 7 financial services verticals. Each skill is purpose-built for a specific workflow." },
              { n: "02", title: "Download the ZIP", desc: "Each skill is a self-contained ZIP file. Download one skill or an entire vertical from GitHub." },
              { n: "03", title: "Upload to Claude", desc: "Go to claude.ai/customize/skills, upload your ZIP. The skill becomes a slash command instantly." },
            ].map((s, i) => (
              <AnimSection key={s.n} className={`anim-d${i + 1}`}>
                <div className="step">
                  <div className="step-num">{s.n}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>

        {/* FEATURED SKILLS */}
        <div className="section rel" style={{ paddingTop: 0 }}>
          <AnimSection>
            <div className="section-eyebrow">Featured skills</div>
            <h2 className="section-h2">Most-used across all verticals</h2>
          </AnimSection>
          <div className="skills-grid">
            {FEATURED.map((s, i) => (
              <AnimSection key={s.cmd} className={`anim-d${(i % 3) + 1}`}>
                <div className="skill-card">
                  <div className="skill-card-top">
                    <span className="skill-vertical">{s.vertical}</span>
                    <span className="skill-cmd">{s.cmd}</span>
                  </div>
                  <div className="skill-name">{s.name}</div>
                  <div className="skill-desc">{s.desc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>

        {/* VERTICALS */}
        <div className="section rel" style={{ paddingTop: 0 }}>
          <AnimSection>
            <div className="section-eyebrow">Skills by vertical</div>
            <h2 className="section-h2">Install only what your team needs</h2>
            <p className="section-sub">Each vertical is an independent plugin. Mix and match across desks.</p>
          </AnimSection>
          <div className="verticals-grid">
            {VERTICALS.map((v, i) => (
              <AnimSection key={v.name} className={`anim-d${(i % 2) + 1}`}>
                <div className="vertical-card">
                  <div className="vertical-icon">{v.icon}</div>
                  <div className="v-meta">
                    <div className="v-top">
                      <span className="v-name">{v.name}</span>
                      <span className="v-ver">{v.ver}</span>
                    </div>
                    <div className="v-desc">{v.desc}</div>
                    <div className="v-cmds">
                      {v.cmds.map(c => <span key={c} className="v-cmd">{c}</span>)}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section rel">
          <div className="cta-inner">
            <AnimSection>
              <h2 className="cta-h2">Ready to install your first skill?</h2>
              <p className="cta-sub">Start with Financial Analysis — the foundation vertical every other skill builds on.</p>
              <div className="cta-actions">
                <button className="btn-primary">Start with Financial Analysis</button>
                <button className="btn-ghost">Read the install guide</button>
              </div>
              <p className="cta-note">Requires Claude for Work (Teams or Enterprise) · Free · Apache-2.0</p>
            </AnimSection>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="rel">
          <div className="footer-left">
            <div style={{ marginBottom: 4, fontFamily: "var(--font-serif)", fontSize: 15 }}>CN Finance</div>
            <div style={{ fontSize: 12 }}>Claude AI skills for financial services</div>
          </div>
          <div className="footer-links">
            {["Skills", "Docs", "GitHub", "Source Code", "Claude Skills Manager"].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}
