import { notFound } from "next/navigation";
import Link from "next/link";
import { verticals } from "@/content/verticals";
import PageHeader from "@/components/PageHeader";

type Props = { params: { slug: string; skill: string } };

const GITHUB_BASE = "https://github.com/spooky-may/project-jane-street/tree/main/skills/plugins/vertical-plugins";

export function generateStaticParams() {
  return verticals.flatMap((v) =>
    v.skills.map((s) => ({ slug: v.slug, skill: s.slug }))
  );
}

const DiamondDivider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
    <div style={{ flex: 1, height: 1, background: "var(--b0)" }} />
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--accent)", opacity: 0.4 }}>◆</span>
    <div style={{ flex: 1, height: 1, background: "var(--b0)" }} />
  </div>
);

export default function SkillPage({ params }: Props) {
  const v = verticals.find((v) => v.slug === params.slug);
  if (!v) notFound();
  const s = v.skills.find((s) => s.slug === params.skill);
  if (!s) notFound();

  const skillGithubUrl = `${GITHUB_BASE}/${v.slug}/skills/${s.slug}`;
  const verticalGithubUrl = `${GITHUB_BASE}/${v.slug}`;

  return (
    <>
      <PageHeader
        eyebrow={`${v.title} · /${s.slug}`}
        title={s.name}
        subtitle={s.description}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginBottom: 36, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <Link href="/skills" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Skills</Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <Link href={`/skills/${v.slug}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{v.title}</Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text-muted)" }}>{s.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* What it produces */}
            <section>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                ◆ Output
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 14, letterSpacing: "-0.04em" }}>
                What it produces
              </h2>
              <div style={{ background: "var(--s1)", border: "1px solid var(--b0)", borderLeft: "2px solid var(--accent-mid)", borderRadius: 10, padding: "18px 22px" }}>
                <p style={{ fontSize: 13, color: "rgba(13,31,20,0.60)", lineHeight: 1.75, fontWeight: 300 }}>{s.outputFormat}</p>
              </div>
            </section>

            {/* Best for */}
            <section>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                ◆ Audience
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 14, letterSpacing: "-0.04em" }}>
                Best for
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.bestFor.split(",").map((item) => (
                  <span
                    key={item}
                    style={{
                      background: "var(--s2)",
                      border: "1px solid var(--accent-mid)",
                      color: "var(--text-muted)",
                      fontSize: 11,
                      padding: "5px 14px",
                      borderRadius: 20,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </section>

            {/* Example triggers */}
            <section>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                ◆ Example prompts
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.04em" }}>
                Use it like this
              </h2>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16, fontWeight: 300 }}>
                After uploading this skill to Claude, type in the chat:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.triggerPhrases.map((phrase, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#0D1F14",
                      border: "1px solid rgba(46,139,87,0.18)",
                      borderLeft: "2px solid rgba(46,139,87,0.45)",
                      borderRadius: 8,
                      padding: "13px 18px",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "#fff",
                    }}
                  >
                    <span style={{ color: "var(--accent)", marginRight: 10 }}>›</span>
                    {phrase}
                  </div>
                ))}
              </div>
            </section>

            <DiamondDivider />

            {/* How to use */}
            <section>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                ◆ Installation
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 22, letterSpacing: "-0.04em" }}>
                How to use this skill
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  {
                    n: "1",
                    title: "Download the skill ZIP",
                    desc: (
                      <>
                        Go to the{" "}
                        <a href={skillGithubUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
                          {s.name} folder on GitHub
                        </a>
                        , download it as a ZIP file. Or download the full{" "}
                        <a href={verticalGithubUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
                          {v.title} vertical
                        </a>{" "}
                        to get all {v.skills.length} skills at once.
                      </>
                    ),
                  },
                  {
                    n: "2",
                    title: "Upload to Claude",
                    desc: (
                      <>
                        Open{" "}
                        <a href="https://claude.ai/customize/skills" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
                          claude.ai/customize/skills
                        </a>
                        , click <strong>Add skill</strong>, and upload your ZIP. The skill will appear
                        as a slash command in your Claude workspace immediately.
                      </>
                    ),
                  },
                  {
                    n: "3",
                    title: `Type /${s.slug} in Claude`,
                    desc: (
                      <>
                        Open Claude, type{" "}
                        <code style={{ fontFamily: "var(--font-mono)", background: "var(--s2)", padding: "1px 6px", borderRadius: 3, fontSize: 11 }}>/{s.slug}</code>
                        , attach any relevant files (Excel models, PDFs, transcripts), and describe
                        your task. The skill handles the rest.
                      </>
                    ),
                  },
                ].map((step) => (
                  <div key={step.n} style={{ display: "flex", gap: 16 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: "var(--accent-dim)", color: "var(--accent)",
                      fontSize: 12, fontWeight: 800, fontFamily: "var(--font-mono)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1, border: "1px solid var(--accent-mid)",
                    }}>
                      {step.n}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 5, letterSpacing: "-0.02em" }}>{step.title}</div>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.75, fontWeight: 300 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <DiamondDivider />

            {/* Other skills in vertical */}
            <section>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                ◆ Related
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>
                More skills in {v.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {v.skills
                  .filter((other) => other.slug !== s.slug)
                  .map((other) => (
                    <Link
                      key={other.slug}
                      href={`/skills/${v.slug}/${other.slug}`}
                      className="skill-card group"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "var(--s1)", border: "1px solid var(--b0)",
                        borderRadius: 8, padding: "11px 16px",
                        textDecoration: "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <code style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", background: "var(--accent-dim)", padding: "2px 7px", borderRadius: 3 }}>
                          /{other.slug}
                        </code>
                        <span style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: "-0.01em" }}>
                          {other.name}
                        </span>
                      </div>
                      <span style={{ fontSize: 11, color: "var(--accent)", opacity: 0, transition: "opacity 0.15s" }} className="group-hover:opacity-100">→</span>
                    </Link>
                  ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Primary CTA */}
            <div
              className="bg-diamond-dark"
              style={{
                background: "var(--text)",
                borderRadius: 14,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "sticky",
                top: 80,
              }}
            >
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(46,139,87,0.7)",
                  marginBottom: 10,
                }}>
                  ◆ Get this skill
                </div>
                <div style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 5,
                  lineHeight: 1.25,
                  letterSpacing: "-0.04em",
                }}>
                  {s.name}
                </div>
                <code style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  /{s.slug}
                </code>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a
                  href={skillGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                    padding: "10px 16px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Download ZIP from GitHub
                </a>
                <a
                  href="https://claude.ai/customize/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.65)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "10px 16px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Upload to Claude →
                </a>
              </div>

              <Link
                href="/docs"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Need help? Read the install guide
              </Link>
            </div>

            {/* Part of vertical */}
            <div style={{ background: "var(--s1)", border: "1px solid var(--b0)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
                Part of vertical
              </div>
              <Link
                href={`/skills/${v.slug}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}
                className="group"
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
                    {v.title}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                    {v.skills.length} skills · v{v.version}
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "var(--accent)", opacity: 0, transition: "opacity 0.15s" }} className="group-hover:opacity-100">→</span>
              </Link>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--b0)" }}>
                <a
                  href={verticalGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", textDecoration: "none" }}
                >
                  Download full vertical →
                </a>
              </div>
            </div>

            {/* Dependency */}
            {v.slug !== "financial-analysis" && (
              <div style={{ background: "var(--s1)", border: "1px solid var(--b0)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
                  Dependency
                </div>
                <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.65, fontWeight: 300 }}>
                  Install{" "}
                  <Link href="/skills/financial-analysis" style={{ color: "var(--accent)", textDecoration: "none" }}>
                    Financial Analysis
                  </Link>{" "}
                  first — it provides the Excel and PowerPoint authoring tools this vertical uses.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
