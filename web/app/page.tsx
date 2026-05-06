import type { Metadata } from "next";
import Link from "next/link";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "CBANK — AI Infrastructure for Financial Services",
  description:
    "Production-ready Claude AI skills for investment banking, equity research, private equity, fund administration, and wealth management.",
};

const FEATURED_SKILLS = [
  { vertical: "IB",           cmd: "/cim-builder",   name: "CIM Builder",      desc: "Draft a 60-page CIM from a data room in hours." },
  { vertical: "Equity",       cmd: "/morning-note",  name: "Morning Note",     desc: "Post-earnings research note before the market opens." },
  { vertical: "PE",           cmd: "/ic-memo",        name: "IC Memo",          desc: "From DD findings to IC-ready memo in one command." },
  { vertical: "Fin Analysis", cmd: "/dcf-model",     name: "DCF Model",        desc: "5-year DCF with WACC sensitivity from a 10-K." },
  { vertical: "Fund Admin",   cmd: "/nav-tieout",    name: "NAV Tie-Out",      desc: "Catch LP statement errors before they reach investors." },
  { vertical: "Wealth",       cmd: "/fin-plan",      name: "Financial Plan",   desc: "Full retirement plan from a client intake form." },
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
        style={{
          position: "relative",
          minHeight: 480,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "80px 48px",
        }}
      >
        {/* Diamond crosshatch grid */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundColor: "#FFFFFF",
            backgroundImage:
              "linear-gradient(45deg, rgba(46,139,87,0.09) 1px, transparent 1px), " +
              "linear-gradient(-45deg, rgba(46,139,87,0.09) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            pointerEvents: "none",
          }}
        />
        {/* Radial fade — masks grid near left content */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(ellipse 65% 80% at 28% 50%, " +
              "rgba(255,255,255,0.97) 0%, " +
              "rgba(255,255,255,0.85) 38%, " +
              "rgba(255,255,255,0.25) 72%, " +
              "transparent 100%)",
          }}
        />

        {/* Left: headline + sub + CTAs */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 560, flexShrink: 0 }}>
          <h1
            className="anim anim-d1 hero-h1"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(40px, 5.5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              marginBottom: 22,
            }}
          >
            <span style={{ color: "var(--text)", display: "block" }}>AI infrastructure for</span>
            <span style={{ color: "var(--text-fade)", display: "block" }}>financial services</span>
          </h1>
          <p
            className="anim anim-d2"
            style={{
              fontSize: 16,
              color: "rgba(13,31,20,0.50)",
              maxWidth: 420,
              lineHeight: 1.68,
              fontWeight: 300,
              marginBottom: 38,
            }}
          >
            CBANK is the connective layer that brings Claude AI skills to every financial desk —
            investment banking, equity research, private equity, and wealth management.
          </p>
          <div className="anim anim-d3" style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <Link
              href="/skills"
              style={{
                background: "var(--text)",
                color: "#fff",
                padding: "13px 26px",
                borderRadius: 7,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.15s",
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
          <svg
            width="100%" height="100%"
            viewBox="0 0 520 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="ds1" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(46,139,87,0.18)" />
              </filter>
              <filter id="ds2" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="4" stdDeviation="7"  floodColor="rgba(46,139,87,0.14)" />
              </filter>
              <linearGradient id="gtop"  x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#dceee4" />
                <stop offset="100%" stopColor="#c0dccb" />
              </linearGradient>
              <linearGradient id="gleft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#a8d4be" />
                <stop offset="100%" stopColor="#7bbf9e" />
              </linearGradient>
              <linearGradient id="grite" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#c0dccb" />
                <stop offset="100%" stopColor="#96c8ae" />
              </linearGradient>
            </defs>
            {/* Diamond 1 — large, top right */}
            <g filter="url(#ds1)" transform="translate(300,55)">
              <polygon points="65,0  130,38  65,76  0,38"  fill="url(#gtop)"  opacity="0.88" />
              <polygon points="0,38  65,76  65,120 0,82"   fill="url(#gleft)" opacity="0.88" />
              <polygon points="65,76 130,38 130,82 65,120" fill="url(#grite)" opacity="0.88" />
            </g>
            {/* Diamond 2 — medium, mid-right */}
            <g filter="url(#ds2)" transform="translate(360,220)">
              <polygon points="46,0  92,27  46,54  0,27"  fill="url(#gtop)"  opacity="0.82" />
              <polygon points="0,27  46,54  46,86  0,59"  fill="url(#gleft)" opacity="0.82" />
              <polygon points="46,54 92,27 92,59 46,86"   fill="url(#grite)" opacity="0.82" />
            </g>
            {/* Diamond 3 — small, bottom mid */}
            <g filter="url(#ds2)" transform="translate(210,320)">
              <polygon points="36,0  72,21  36,42  0,21"  fill="url(#gtop)"  opacity="0.72" />
              <polygon points="0,21  36,42  36,66  0,45"  fill="url(#gleft)" opacity="0.72" />
              <polygon points="36,42 72,21 72,45 36,66"   fill="url(#grite)" opacity="0.72" />
            </g>
            {/* Diamond 4 — tiny, far right */}
            <g filter="url(#ds2)" transform="translate(454,140)">
              <polygon points="28,0  56,16  28,32  0,16"  fill="url(#gtop)"  opacity="0.65" />
              <polygon points="0,16  28,32  28,52  0,36"  fill="url(#gleft)" opacity="0.65" />
              <polygon points="28,32 56,16 56,36 28,52"   fill="url(#grite)" opacity="0.65" />
            </g>
            {/* Diamond 5 — ghost, left of cluster */}
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

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <div
        className="stats-bar"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: "1px solid var(--b0)",
          background: "var(--bg)",
        }}
      >
        {[
          { num: "55",                                           label: "Production skills" },
          { num: "7",                                            label: "Financial verticals" },
          { num: "10",                                           label: "End-to-end agents" },
          { num: <>0<span style={{ color: "var(--accent)" }}>loc</span></>, label: "To install" },
        ].map((s, i) => (
          <div
            key={i}
            className={`anim${i > 0 ? ` anim-d${i}` : ""}`}
            style={{
              padding: "30px 24px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid var(--b0)" : undefined,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 40,
                fontWeight: 400,
                lineHeight: 1,
                color: "var(--text)",
                marginBottom: 6,
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--text-faint)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── SKILLS SECTION ───────────────────────────────────── */}
      <div style={{ padding: "56px 48px", background: "var(--bg)" }}>
        <div className="anim" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
          Featured skills
        </div>
        <h2 className="anim anim-d1" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text)", marginBottom: 10 }}>
          The full workflow,{" "}
          <span style={{ color: "var(--text-fade)" }}>one command at a time</span>
        </h2>
        <p className="anim anim-d2" style={{ fontSize: 13, color: "rgba(13,31,20,0.45)", maxWidth: 420, lineHeight: 1.65, fontWeight: 300, marginBottom: 32 }}>
          Purpose-built for each desk. Download one skill or an entire vertical from GitHub.
        </p>

        <div
          className="skills-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
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
                padding: 22,
                cursor: "pointer",
                textDecoration: "none",
                display: "block",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 13 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)",
                    background: "var(--s3)",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {s.vertical}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--accent)",
                    background: "var(--accent-dim)",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {s.cmd}
                </span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 5 }}>
                {s.name}
              </div>
              <div style={{ fontSize: 11, color: "rgba(13,31,20,0.45)", lineHeight: 1.55, fontWeight: 300 }}>
                {s.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA SECTION ──────────────────────────────────────── */}
      <div
        style={{
          background: "var(--s1)",
          borderTop: "1px solid var(--b0)",
          padding: "56px 48px",
          textAlign: "center",
        }}
      >
        <h2
          className="anim"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(26px, 3.5vw, 36px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: 10,
          }}
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
            style={{
              background: "var(--text)",
              color: "#fff",
              padding: "13px 26px",
              borderRadius: 7,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Start with Financial Analysis
          </Link>
          <Link
            href="/docs"
            className="hero-btn-link"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              gap: 7,
              textDecoration: "none",
            }}
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
