import { notFound } from "next/navigation";
import Link from "next/link";
import { verticals } from "@/content/verticals";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export default function SkillPage({ params }: Props) {
  const vertical = verticals.find((v) => v.slug === params.slug);
  if (!vertical) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-text transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{vertical.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text mb-3">{vertical.title}</h1>
        <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
          {vertical.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Commands */}
          <section>
            <h2 className="text-base font-semibold text-text mb-4">
              Commands
            </h2>
            <div className="flex flex-col gap-2">
              {vertical.commands.map((cmd) => (
                <div
                  key={cmd}
                  className="flex items-center gap-3 bg-surface border border-border rounded-lg px-4 py-3"
                >
                  <code className="font-mono text-sm text-primary font-medium">
                    {cmd}
                  </code>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          {/* Install */}
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text mb-3">Install</h3>
            <code className="block font-mono text-xs bg-surface-alt text-text rounded-lg px-3 py-3 leading-relaxed break-all">
              {vertical.installCommand}
            </code>
            <p className="text-text-subtle text-xs mt-3">
              Requires Claude for Work
            </p>
          </div>

          {/* Audience */}
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text mb-2">Audience</h3>
            <span className="bg-primary-light text-primary text-xs font-medium rounded-full px-2.5 py-1">
              {vertical.audience === "decision-maker"
                ? "Decision Makers"
                : vertical.audience === "developer"
                ? "Developers"
                : "Both"}
            </span>
          </div>

          {/* Back */}
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-text transition-colors text-center"
          >
            ← All verticals
          </Link>
        </aside>
      </div>
    </div>
  );
}
