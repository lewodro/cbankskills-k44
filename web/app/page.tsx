import Link from "next/link";
import { verticals } from "@/content/verticals";
import AnimSection from "@/components/AnimSection";
import Terminal from "@/components/Terminal";

const SKILLS_GITHUB = "https://github.com/spooky-may/project-jane-street/tree/main/skills";

const totalSkills = verticals.reduce((acc, v) => acc + v.skills.length, 0);

const FEATURED = [
  { vertical: "IB",           slug: "investment-banking", skill: "cim-builder",   cmd: "/cim-builder",    name: "CIM Builder",    desc: "Draft a 60-page CIM from a data room in hours." },
  { vertical: "Equity",       slug: "equity-research",    skill: "morning-note",   cmd: "/morning-note",   name: "Morning Note",   desc: "Post-earnings research note before the market opens." },
  { vertical: "PE",           slug: "private-equity",     skill: "ic-memo",        cmd: "/ic-memo",        name: "IC Memo",        desc: "From DD findings to IC-ready memo in one command." },
  { vertical: "Fin Analysis", slug: "financial-analysis", skill: "dcf-model",      cmd: "/dcf-model",      name: "DCF Model",      desc: "5-year DCF with WACC sensitivity from a 10-K." },
  { vertical: "Fund Admin",   slug: "fund-admin",         skill: "nav-tieout",     cmd: "/nav-tieout",     name: "NAV Tie-Out",    desc: "Catch LP statement errors before they reach investors." },
  { vertical: "Wealth",       slug: "wealth-management",  skill: "financial-plan", cmd: "/financial-plan", name: "Financial Plan", desc: "Full retirement plan from a client intake form." },
];

const VERTICAL_ICONS: Record<string, string> = {
  "investment-banking": "🏦",
  "equity-research":    "📊",
  "private-equity":     "🔬",
  "financial-analysis": "📈",
  "fund-admin":         "⚖️",
  "wealth-management":  "💼",
  "operations":         "⚙️",
};

const STATS = [
  { num: totalSkills, label: "production-ready skills" },
  { num: 7,           label: "financial verticals" },
  { num: 10,          label: "end-to-end agents" },
  { num: 0,           suffix: "  lines to install", label: "of code required" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 40px 80px", textAlign: "center" }}>
        <AnimSection className="anim-d1">
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--sub)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "1px solid var(--b1)",
            padding: "5px 14px",
            borderRadius: 100,
            marginBottom: 28,
            background: "var(--s1)",
          }}>
            <span style={{ width: 5, height: 5, background: "var(--accent)", borderRadius: "50%", display: "inline-block" }} />
            {totalSkills} production-ready skills · 7 verticals
          </div>
        </AnimSection>

        <AnimSection className="anim-d2">
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(44px, 7vw, 78px)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: 20,
          }}>
            Claude skills built for<br />
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #1a5c38 0%, #2E8B57 55%, #52b57c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              financial services
            </em>
          </h1>
        </AnimSection>

        <AnimSection className="anim-d3">
          <p style={{
            fontSize: 17,
            color: "var(--sub)",
            maxWidth: 520,
            margin: "0 auto 36px",
            lineHeight: 1.65,
            fontWeight: 300,
          }}>
            Production-ready skills for investment banking, equity research,
            private equity, and wealth management. Download, upload, start in minutes.
          </p>
        </AnimSection>

        <AnimSection className="anim-d4">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/skills"
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "11px 22px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Browse all skills →
            </Link>
            <Link
              href="/docs"
              style={{
                background: "transparent",
                color: "var(--sub)",
                border: "1px solid var(--b1)",
                padding: "11px 22px",
                borderRadius: 8,
                fontSize: 14,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              How to install
            </Link>
          </div>
        </AnimSection>

        <AnimSection className="anim-d5">
          <Terminal />
        </AnimSection>
      </section>

      {/* ── STATS ── */}
      <div style={{ borderTop: "1px solid var(--b0)", borderBottom: "1px solid var(--b0)", background: "var(--s1)" }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "36px 32px",
                borderRight: i < STATS.length - 1 ? "1px solid var(--b0)" : undefined,
                textAlign: "center",
              }}
            >
              <div style={{
                fontFamily: "var(--font-serif)",
                fontSize: 46,
                fontWeight: 400,
                lineHeight: 1,
                color: "var(--text)",
                marginBottom: 6,
              }}>
                {s.num}
                {s.suffix && <span style={{ color: "var(--accent)", fontSize: 18 }}>{s.suffix}</span>}
              </div>
              <div style={{ fontSize: 12, color: "var(--sub)", letterSpacing: "0.03em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "96px 40px" }}>
        <AnimSection>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 16,
          }}>
            How it works
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(30px, 4vw, 44px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: 14,
          }}>
            Three steps. No setup.
          </h2>
          <p style={{ fontSize: 15, color: "var(--sub)", maxWidth: 480, lineHeight: 1.65, fontWeight: 300 }}>
            No API keys. No build step. No dependencies.
          </p>
        </AnimSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: 56,
        }}>
          {[
            { n: "01", title: "Find your skill", desc: "Browse " + totalSkills + " skills across 7 financial services verticals. Each skill is purpose-built for a specific workflow.", href: "/skills", cta: "Browse skills →" },
            { n: "02", title: "Download the ZIP", desc: "Each skill is a self-contained ZIP file. Download one skill or an entire vertical from GitHub.", href: SKILLS_GITHUB, cta: "View on GitHub →", external: true },
            { n: "03", title: "Upload to Claude", desc: "Go to claude.ai/customize/skills, upload your ZIP. The skill becomes a slash command instantly.", href: "https://claude.ai/customize/skills", cta: "Open Claude Skills →", external: true },
          ].map((step, i) => (
            <AnimSection key={step.n} className={`anim-d${i + 1}`}>
              <div style={{
                background: "var(--s1)",
                padding: "32px 28px",
                border: "1px solid var(--b0)",
                borderRadius: 12,
                height: "100%",
              }}>
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 72,
                  fontWeight: 400,
                  color: "var(--faint)",
                  lineHeight: 1,
                  marginBottom: 20,
                  letterSpacing: "-0.03em",
                }}>
                  {step.n}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text)", marginBottom: 8 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.65, fontWeight: 300, marginBottom: 16 }}>
                  {step.desc}
                </div>
                {step.external ? (
                  <a href={step.href} target="_blank" rel="noopener noreferrer"
                    style={{ color: "var(--accent)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                    {step.cta}
                  </a>
                ) : (
                  <Link href={step.href}
                    style={{ color: "var(--accent)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                    {step.cta}
                  </Link>
                )}
              </div>
            </AnimSection>
          ))}
        </div>
      </div>

      {/* ── FEATURED SKILLS ── */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px 96px" }}>
        <AnimSection>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 16,
          }}>
            Featured skills
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(30px, 4vw, 44px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: 14,
          }}>
            Most-used across all verticals
          </h2>
        </AnimSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: 48,
        }}>
          {FEATURED.map((f, i) => (
            <AnimSection key={f.cmd} className={`anim-d${(i % 3) + 1}`}>
              <Link
                href={`/skills/${f.slug}/${f.skill}`}
                style={{
                  display: "block",
                  background: "var(--s1)",
                  border: "1px solid var(--b0)",
                  borderRadius: 12,
                  padding: 22,
                  textDecoration: "none",
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--sub)",
                    background: "var(--s3)",
                    padding: "3px 8px",
                    borderRadius: 4,
                    border: "1px solid var(--b0)",
                  }}>
                    {f.vertical}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--accent)",
                    background: "var(--accent-dim)",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}>
                    {f.cmd}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 6 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.55, fontWeight: 300 }}>{f.desc}</div>
              </Link>
            </AnimSection>
          ))}
        </div>
      </div>

      {/* ── VERTICALS ── */}
      <div style={{
        borderTop: "1px solid var(--b0)",
        borderBottom: "1px solid var(--b0)",
        background: "var(--s1)",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "96px 40px" }}>
          <AnimSection>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 16,
            }}>
              Skills by vertical
            </div>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--text)",
              marginBottom: 14,
            }}>
              Install only what your team needs
            </h2>
            <p style={{ fontSize: 15, color: "var(--sub)", maxWidth: 480, lineHeight: 1.65, fontWeight: 300 }}>
              Each vertical is an independent plugin. Mix and match across desks.
            </p>
          </AnimSection>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginTop: 48,
          }}>
            {verticals.map((v, i) => (
              <AnimSection key={v.slug} className={`anim-d${(i % 2) + 1}`}>
                <Link
                  href={`/skills/${v.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    background: "var(--bg)",
                    border: "1px solid var(--b0)",
                    borderRadius: 12,
                    padding: 28,
                    textDecoration: "none",
                    height: "100%",
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-mid)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    {VERTICAL_ICONS[v.slug] ?? "📁"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>{v.title}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--sub)" }}>v{v.version}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.6, fontWeight: 300, marginBottom: 12 }}>
                      {v.tagline}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {v.skills.slice(0, 2).map((s) => (
                        <span
                          key={s.slug}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--accent)",
                            background: "var(--accent-dim)",
                            padding: "2px 7px",
                            borderRadius: 4,
                          }}
                        >
                          /{s.slug}
                        </span>
                      ))}
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--sub)",
                        padding: "2px 7px",
                      }}>
                        +{v.skills.length - 2} more
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        borderTop: "1px solid var(--b0)",
        background: "var(--s1)",
        padding: "96px 40px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <AnimSection>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: 14,
            }}>
              Ready to install your first skill?
            </h2>
            <p style={{ fontSize: 15, color: "var(--sub)", marginBottom: 36, fontWeight: 300 }}>
              Start with Financial Analysis — the foundation vertical every other skill builds on.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/skills/financial-analysis"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  padding: "11px 22px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Start with Financial Analysis
              </Link>
              <Link
                href="/docs"
                style={{
                  background: "transparent",
                  color: "var(--sub)",
                  border: "1px solid var(--b1)",
                  padding: "11px 22px",
                  borderRadius: 8,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Read the install guide
              </Link>
            </div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--sub)",
              marginTop: 20,
            }}>
              Requires Claude for Work (Teams or Enterprise) · Free · Apache-2.0
            </p>
          </AnimSection>
        </div>
      </div>
    </>
  );
}
