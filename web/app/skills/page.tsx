import Link from "next/link";
import { verticals } from "@/content/verticals";

const SKILLS_GITHUB = "https://github.com/spooky-may/project-jane-street/tree/main/skills";
const totalSkills = verticals.reduce((acc, v) => acc + v.skills.length, 0);

export default function SkillsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-serif text-4xl font-normal text-text mb-2" style={{ letterSpacing: "-0.02em" }}>All Skills</h1>
            <p className="text-text-muted text-lg max-w-2xl font-light">
              {totalSkills} production-ready skills across 7 financial services verticals.
              Each skill is a downloadable ZIP — upload to{" "}
              <a href="https://claude.ai/customize/skills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                claude.ai/customize/skills
              </a>{" "}
              to activate it as a slash command.
            </p>
          </div>
          <a
            href={SKILLS_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 border border-border text-text-muted text-sm font-medium px-4 py-2 rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            View on GitHub →
          </a>
        </div>
      </div>

      {/* Verticals with skill lists */}
      <div className="flex flex-col gap-16">
        {verticals.map((v) => (
          <div key={v.slug}>
            {/* Vertical header */}
            <div className="flex items-end justify-between mb-6 pb-3 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/skills/${v.slug}`}
                    className="text-xl font-semibold text-text hover:text-primary transition-colors"
                  >
                    {v.title}
                  </Link>
                  <span className="text-xs text-text-subtle font-mono bg-surface-alt border border-border px-1.5 py-0.5 rounded">
                    v{v.version}
                  </span>
                </div>
                <p className="text-text-muted text-sm">{v.tagline}</p>
              </div>
              <Link
                href={`/skills/${v.slug}`}
                className="text-sm text-primary hover:underline font-medium shrink-0"
              >
                View vertical →
              </Link>
            </div>

            {/* Skills grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {v.skills.map((s) => (
                <Link
                  key={s.slug}
                  href={`/skills/${v.slug}/${s.slug}`}
                  className="group bg-surface border border-border rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-text group-hover:text-primary transition-colors text-sm">
                      {s.name}
                    </h3>
                    <code className="font-mono text-xs text-text-subtle bg-surface-alt px-1.5 py-0.5 rounded shrink-0">
                      /{s.slug}
                    </code>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                    {s.bestFor}
                  </p>
                  <div className="mt-auto pt-2 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View skill →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 bg-primary-light border border-primary/20 rounded-xl p-8 text-center flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-text">Ready to use these skills?</h2>
        <p className="text-text-muted max-w-md">
          Download any skill ZIP from GitHub and upload it to{" "}
          <strong>claude.ai/customize/skills</strong> to activate it.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={SKILLS_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white font-medium px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm"
          >
            Download from GitHub →
          </a>
          <a
            href="https://claude.ai/customize/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border bg-surface text-text-muted font-medium px-5 py-2.5 rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
          >
            Open Claude Skills Manager
          </a>
        </div>
      </div>
    </div>
  );
}
