import Link from "next/link";
import { verticals } from "@/content/verticals";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
          <span className="bg-primary-light text-primary text-xs font-medium rounded-full px-3 py-1">
            Built on Claude · Apache-2.0
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-text tracking-tight max-w-2xl text-balance">
            Claude AI Skills for{" "}
            <span className="text-primary">Financial Services</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl text-balance">
            Production-ready skill plugins for investment banking, equity
            research, private equity, fund operations, and wealth management.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href="#skills"
              className="bg-primary text-white font-medium px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse Skills
            </Link>
            <a
              href="https://github.com/anthropics/financial-services"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border text-text-muted font-medium px-5 py-2.5 rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-surface-alt border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-8 text-sm">
          {[
            { value: "7", label: "Verticals" },
            { value: "60+", label: "Skills" },
            { value: "10", label: "Agents" },
            { value: "11", label: "Data connectors" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-primary">{s.value}</span>
              <span className="text-text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skill grid */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-text mb-2">
            Skill Verticals
          </h2>
          <p className="text-text-muted mb-10">
            Each vertical is an installable plugin with domain-specific commands.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/skills/${v.slug}`}
                className="group rounded-xl border border-border bg-surface shadow-sm p-5 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                    {v.title}
                  </h3>
                  <span className="bg-primary-light text-primary text-xs font-medium rounded-full px-2 py-0.5 shrink-0 ml-2">
                    {v.commands.length} cmds
                  </span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {v.highlight}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {v.commands.slice(0, 3).map((cmd) => (
                    <code
                      key={cmd}
                      className="font-mono text-xs bg-surface-alt text-text-muted px-1.5 py-0.5 rounded"
                    >
                      {cmd}
                    </code>
                  ))}
                  {v.commands.length > 3 && (
                    <span className="text-xs text-text-subtle">
                      +{v.commands.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Install CTA */}
      <section
        id="install"
        className="bg-surface border-t border-border py-20"
      >
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl font-semibold text-text">
            Ready to install?
          </h2>
          <p className="text-text-muted">
            Install the core financial analysis plugin, then add verticals as
            needed.
          </p>
          <code className="block w-full bg-surface-alt border border-border rounded-xl font-mono text-sm text-text px-5 py-4 text-left">
            claude plugin install anthropic/financial-analysis
          </code>
          <p className="text-text-subtle text-sm">
            Requires Claude for Work. Each vertical installs independently.
          </p>
        </div>
      </section>
    </>
  );
}
