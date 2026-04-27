import { notFound } from "next/navigation";
import Link from "next/link";
import { verticals } from "@/content/verticals";

type Props = { params: { slug: string; skill: string } };

const GITHUB_BASE = "https://github.com/spooky-may/project-jane-street/tree/main/skills/plugins/vertical-plugins";

export function generateStaticParams() {
  return verticals.flatMap((v) =>
    v.skills.map((s) => ({ slug: v.slug, skill: s.slug }))
  );
}

export default function SkillPage({ params }: Props) {
  const v = verticals.find((v) => v.slug === params.slug);
  if (!v) notFound();
  const s = v.skills.find((s) => s.slug === params.skill);
  if (!s) notFound();

  const skillGithubUrl = `${GITHUB_BASE}/${v.slug}/skills/${s.slug}`;
  const verticalGithubUrl = `${GITHUB_BASE}/${v.slug}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-text transition-colors">Home</Link>
        <span>/</span>
        <Link href="/skills" className="hover:text-text transition-colors">Skills</Link>
        <span>/</span>
        <Link href={`/skills/${v.slug}`} className="hover:text-text transition-colors">{v.title}</Link>
        <span>/</span>
        <span className="text-text">{s.name}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-10">

          {/* Skill header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Link
                href={`/skills/${v.slug}`}
                className="bg-primary-light text-primary text-xs font-medium rounded-full px-2.5 py-1 hover:bg-primary hover:text-white transition-colors"
              >
                {v.title}
              </Link>
            </div>
            <h1 className="font-serif text-5xl font-normal text-text mb-3" style={{ letterSpacing: "-0.02em" }}>{s.name}</h1>
            <p className="text-text-muted text-lg leading-relaxed max-w-2xl font-light">{s.description}</p>
          </div>

          {/* What it produces */}
          <section>
            <h2 className="text-base font-semibold text-text mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary-light flex items-center justify-center text-primary text-xs font-bold">↓</span>
              What it produces
            </h2>
            <div className="bg-surface border border-border rounded-xl p-5">
              <p className="text-text-muted text-sm leading-relaxed">{s.outputFormat}</p>
            </div>
          </section>

          {/* Best for */}
          <section>
            <h2 className="text-base font-semibold text-text mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary-light flex items-center justify-center text-primary text-xs font-bold">✓</span>
              Best for
            </h2>
            <div className="flex flex-wrap gap-2">
              {s.bestFor.split(",").map((item) => (
                <span
                  key={item}
                  className="bg-surface-alt border border-border text-text-muted text-xs px-3 py-1.5 rounded-full"
                >
                  {item.trim()}
                </span>
              ))}
            </div>
          </section>

          {/* Example triggers */}
          <section>
            <h2 className="text-base font-semibold text-text mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary-light flex items-center justify-center text-primary text-xs font-bold">›</span>
              Example prompts
            </h2>
            <p className="text-text-muted text-sm mb-4">
              After uploading this skill to Claude, use it like this:
            </p>
            <div className="flex flex-col gap-3">
              {s.triggerPhrases.map((phrase, i) => (
                <div
                  key={i}
                  className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-4 py-3 font-mono text-sm text-white"
                >
                  <span className="text-primary mr-2">›</span>
                  {phrase}
                </div>
              ))}
            </div>
          </section>

          {/* How to use */}
          <section>
            <h2 className="text-base font-semibold text-text mb-4">How to use this skill</h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  n: "1",
                  title: "Download the skill ZIP",
                  desc: (
                    <>
                      Go to the{" "}
                      <a href={skillGithubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {s.name} folder on GitHub
                      </a>
                      , download it as a ZIP file. Or download the full{" "}
                      <a href={verticalGithubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
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
                      <a href="https://claude.ai/customize/skills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
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
                      <code className="font-mono bg-surface-alt px-1.5 py-0.5 rounded text-xs">/{s.slug}</code>
                      , attach any relevant files (Excel models, PDFs, transcripts), and describe
                      your task. The skill handles the rest.
                    </>
                  ),
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-primary-light text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {step.n}
                  </div>
                  <div>
                    <div className="font-semibold text-text text-sm mb-1">{step.title}</div>
                    <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Other skills in vertical */}
          <section>
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
              More skills in {v.title}
            </h2>
            <div className="flex flex-col gap-2">
              {v.skills
                .filter((other) => other.slug !== s.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/skills/${v.slug}/${other.slug}`}
                    className="flex items-center justify-between bg-surface border border-border rounded-lg px-4 py-3 hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <code className="font-mono text-xs text-text-subtle bg-surface-alt px-1.5 py-0.5 rounded">
                        /{other.slug}
                      </code>
                      <span className="text-sm text-text-muted group-hover:text-text transition-colors">
                        {other.name}
                      </span>
                    </div>
                    <span className="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          {/* Primary CTA */}
          <div style={{
            background: "var(--bg)",
            border: "1px solid var(--accent-mid)",
            borderRadius: 14,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "sticky",
            top: 80,
          }}>
            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 10,
              }}>
                Get this skill
              </div>
              <div style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: 4,
                lineHeight: 1.25,
              }}>
                {s.name}
              </div>
              <code style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--sub)",
              }}>
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
                  background: "transparent",
                  color: "var(--sub)",
                  border: "1px solid var(--b1)",
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
                color: "var(--sub)",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Need help? Read the install guide
            </Link>
          </div>

          {/* Part of vertical */}
          <div className="bg-surface border border-border rounded-xl p-5">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
              Part of vertical
            </div>
            <Link
              href={`/skills/${v.slug}`}
              className="flex items-center justify-between group"
            >
              <div>
                <div className="font-semibold text-text group-hover:text-primary transition-colors text-sm">
                  {v.title}
                </div>
                <div className="text-text-subtle text-xs mt-0.5">
                  {v.skills.length} skills · v{v.version}
                </div>
              </div>
              <span className="text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
            <div className="mt-3 pt-3 border-t border-border">
              <a
                href={verticalGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted hover:text-primary transition-colors"
              >
                Download full vertical on GitHub →
              </a>
            </div>
          </div>

          {/* Requires */}
          {v.slug !== "financial-analysis" && (
            <div className="bg-surface-alt border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                Dependency
              </div>
              <p className="text-text-muted text-xs leading-relaxed mb-2">
                Install{" "}
                <Link href="/skills/financial-analysis" className="text-primary hover:underline">
                  Financial Analysis
                </Link>{" "}
                first — it provides the Excel and PowerPoint authoring tools this vertical uses.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
