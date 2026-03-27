import Link from "next/link";
import { verticals } from "@/content/verticals";

const SKILLS_GITHUB = "https://github.com/spooky-may/project-jane-street/tree/main/skills";

const totalSkills = verticals.reduce((acc, v) => acc + v.skills.length, 0);

const featuredSkills = [
  { vertical: "investment-banking", skill: "cim-builder",   label: "CIM Builder",    example: "Draft a 60-page CIM from a data room in hours" },
  { vertical: "equity-research",    skill: "morning-note",   label: "Morning Note",   example: "Post-earnings note ready before the market opens" },
  { vertical: "private-equity",     skill: "ic-memo",        label: "IC Memo",        example: "From DD findings to IC-ready memo in one command" },
  { vertical: "financial-analysis", skill: "dcf-model",      label: "DCF Model",      example: "5-year DCF with WACC sensitivity from a 10-K" },
  { vertical: "fund-admin",         skill: "nav-tieout",     label: "NAV Tie-Out",    example: "Catch LP statement errors before they reach investors" },
  { vertical: "wealth-management",  skill: "financial-plan", label: "Financial Plan", example: "Full retirement plan from a client intake form" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-7">
          <span className="inline-flex items-center gap-2 bg-primary-light text-primary text-xs font-medium rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            {totalSkills} skills · 7 verticals · Apache-2.0
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-text tracking-tight max-w-3xl text-balance leading-tight">
            Claude skills built for{" "}
            <span className="text-primary">financial services</span>
          </h1>

          <p className="text-text-muted text-xl max-w-2xl text-balance leading-relaxed">
            Production-ready Claude skills for investment banking, equity research,
            private equity, fund administration, and wealth management.
            Download a skill, upload to Claude — start in minutes.
          </p>

          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Link
              href="/skills"
              className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors text-sm"
            >
              Browse all skills →
            </Link>
            <Link
              href="/docs"
              className="border border-border text-text-muted font-medium px-6 py-3 rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
            >
              How to install
            </Link>
          </div>

          {/* Terminal preview */}
          <div className="w-full max-w-2xl bg-[#1a1a2e] rounded-xl border border-[#2a2a4a] p-4 text-left mt-2">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-white/30 font-mono">claude.ai</span>
            </div>
            <div className="font-mono text-sm space-y-1.5">
              <p className="text-white/40"># After uploading the investment-banking skill ZIP</p>
              <p>
                <span className="text-primary font-semibold">›</span>{" "}
                <span className="text-white">/cim-builder Draft CIM for $120M EBITDA industrial SaaS — data room attached</span>
              </p>
              <p className="text-white/50">  Drafting CIM: executive summary, business overview, financial analysis...</p>
              <p className="text-white/50">  Building exhibits from attached model...</p>
              <p className="text-green-400/80">  ✓ CIM ready — 67 pages. Export to Word or PDF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-surface-alt border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-text mb-2">How it works</h2>
            <p className="text-text-muted">Three steps. No setup. No API keys required.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Find your skill",
                desc: "Browse 55 skills across 7 financial services verticals. Each skill is purpose-built for a specific workflow — DCF modeling, CIM drafting, earnings analysis, KYC parsing, and more.",
                cta: "Browse skills",
                href: "/skills",
                external: false,
              },
              {
                step: "02",
                title: "Download the ZIP",
                desc: "Each skill is a self-contained ZIP file. Download the skill you need from GitHub — one skill at a time, or the entire vertical. No build step, no dependencies.",
                cta: "View skills on GitHub",
                href: SKILLS_GITHUB,
                external: true,
              },
              {
                step: "03",
                title: "Upload to Claude",
                desc: "Go to claude.ai/customize/skills, upload your ZIP, and the skill becomes a slash command in Claude. Works with Claude for Work — Teams or Enterprise.",
                cta: "Open Claude Skills",
                href: "https://claude.ai/customize/skills",
                external: true,
              },
            ].map((item) => (
              <div key={item.step} className="bg-surface rounded-xl border border-border p-6 flex flex-col gap-4">
                <div className="text-3xl font-bold text-primary/20 font-mono">{item.step}</div>
                <h3 className="font-semibold text-text text-lg">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed flex-1">{item.desc}</p>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline">
                    {item.cta} →
                  </a>
                ) : (
                  <Link href={item.href} className="text-primary text-sm font-medium hover:underline">
                    {item.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap justify-center gap-10">
          {[
            { value: "55", label: "production-ready skills" },
            { value: "7",  label: "financial verticals" },
            { value: "10", label: "end-to-end agents" },
            { value: "11", label: "MCP data connectors" },
            { value: "0",  label: "lines of code to install" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 text-center">
              <span className="text-3xl font-bold text-primary">{s.value}</span>
              <span className="text-sm text-text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured skills */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-semibold text-text mb-1">Featured skills</h2>
              <p className="text-text-muted">The most-used skills across all verticals.</p>
            </div>
            <Link href="/skills" className="text-sm text-primary hover:underline font-medium">
              See all {totalSkills} →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSkills.map((f) => {
              const v = verticals.find((v) => v.slug === f.vertical)!;
              return (
                <Link
                  key={f.skill}
                  href={`/skills/${f.vertical}/${f.skill}`}
                  className="group bg-surface border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-3"
                >
                  <span className="bg-primary-light text-primary text-xs font-medium rounded-full px-2 py-0.5 self-start">
                    {v.title}
                  </span>
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                    {f.label}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed flex-1">{f.example}</p>
                  <div className="pt-2 border-t border-border">
                    <code className="font-mono text-xs text-text-subtle">/{f.skill}</code>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verticals grid */}
      <section className="py-20 bg-surface-alt border-t border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-text mb-2">Skills by vertical</h2>
            <p className="text-text-muted max-w-lg mx-auto">
              Each vertical is an independent plugin. Install only what your team needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/skills/${v.slug}`}
                className="group bg-surface border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                    {v.title}
                  </h3>
                  <span className="text-xs text-text-subtle ml-2 shrink-0 mt-0.5 font-mono">v{v.version}</span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{v.tagline}</p>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {v.skills.slice(0, 2).map((s) => (
                    <code key={s.slug} className="font-mono text-xs bg-surface-alt text-text-subtle px-1.5 py-0.5 rounded">
                      /{s.slug}
                    </code>
                  ))}
                  <span className="text-xs text-text-subtle">+{v.skills.length - 2} more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why skills */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-text mb-2">Why use skills instead of prompts?</h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Skills encode domain knowledge, output format, and workflow logic that would take
              hours to prompt-engineer from scratch.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              { title: "Domain-specific by default", desc: "Each skill knows the conventions of its workflow — IB pitch deck structure, earnings report format, KYC field taxonomy. You don't need to explain what a CIM is." },
              { title: "Consistent output format",   desc: "Skills produce the same format every time. Your DCF always has a sensitivity table. Your morning note is always 400-600 words. Reviewable, repeatable, distributable." },
              { title: "Works with your files",      desc: "Attach your Excel model, 10-K, earnings transcript, or data room. Skills know how to read what you give them and use it correctly." },
              { title: "No prompt engineering",      desc: "Open Claude, type /dcf or /ic-memo, attach your files, and go. The skill handles the rest. No system prompt maintenance required." },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border border-border bg-surface-alt flex flex-col gap-2">
                <h3 className="font-semibold text-text">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-white">Ready to install your first skill?</h2>
          <p className="text-white/80 text-lg">
            Start with Financial Analysis — the foundation vertical every other skill depends on.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/skills/financial-analysis"
              className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary-light transition-colors text-sm"
            >
              Start with Financial Analysis
            </Link>
            <Link
              href="/docs"
              className="border border-white/30 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Read the install guide
            </Link>
          </div>
          <p className="text-white/50 text-xs">
            Requires Claude for Work (Teams or Enterprise) · Free · Apache-2.0
          </p>
        </div>
      </section>
    </>
  );
}
