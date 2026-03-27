import { notFound } from "next/navigation";
import Link from "next/link";
import { verticals } from "@/content/verticals";

type Props = { params: { slug: string } };

const GITHUB_BASE = "https://github.com/spooky-may/project-jane-street/tree/main/skills/plugins/vertical-plugins";

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export default function VerticalPage({ params }: Props) {
  const v = verticals.find((v) => v.slug === params.slug);
  if (!v) notFound();

  const githubUrl = `${GITHUB_BASE}/${v.slug}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-text transition-colors">Home</Link>
        <span>/</span>
        <Link href="/skills" className="hover:text-text transition-colors">Skills</Link>
        <span>/</span>
        <span className="text-text">{v.title}</span>
      </nav>

      {/* Vertical header */}
      <div className="mb-10">
        <div className="flex items-start gap-3 mb-3 flex-wrap">
          <h1 className="text-4xl font-bold text-text">{v.title}</h1>
          <span className="text-xs font-mono text-text-subtle bg-surface-alt border border-border px-2 py-1 rounded self-start mt-2">
            v{v.version}
          </span>
        </div>
        <p className="text-text-muted text-xl mb-3 max-w-2xl">{v.tagline}</p>
        <p className="text-text-muted max-w-2xl leading-relaxed mb-7">{v.description}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm"
          >
            Download from GitHub →
          </a>
          <a
            href="https://claude.ai/customize/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border text-text-muted font-medium px-5 py-2.5 rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
          >
            Upload to Claude Skills
          </a>
          <Link href="/docs" className="text-sm text-text-muted hover:text-primary transition-colors self-center">
            How to install →
          </Link>
        </div>
      </div>

      {/* Install command */}
      <div className="bg-surface-alt border border-border rounded-xl p-5 mb-12">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
          CLI Install
        </div>
        <code className="font-mono text-sm text-text">{v.installCommand}</code>
      </div>

      {/* Skills grid */}
      <div>
        <h2 className="text-xl font-semibold text-text mb-6">
          {v.skills.length} skills in this vertical
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {v.skills.map((s) => (
            <Link
              key={s.slug}
              href={`/skills/${v.slug}/${s.slug}`}
              className="group bg-surface border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                  {s.name}
                </h3>
                <code className="font-mono text-xs text-text-subtle bg-surface-alt px-2 py-0.5 rounded shrink-0">
                  /{s.slug}
                </code>
              </div>
              <p className="text-text-muted text-sm leading-relaxed flex-1 line-clamp-3">
                {s.description}
              </p>
              <div className="text-xs text-text-subtle">
                <span className="font-medium text-text-muted">Best for: </span>{s.bestFor}
              </div>
              <div className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View full details + download →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Other verticals */}
      <div className="mt-20">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">Other verticals</h2>
        <div className="flex flex-wrap gap-2">
          {verticals
            .filter((other) => other.slug !== v.slug)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/skills/${other.slug}`}
                className="bg-surface border border-border text-text-muted text-sm px-3 py-1.5 rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                {other.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
