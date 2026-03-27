import Link from "next/link";

const GITHUB_URL = "https://github.com/spooky-may/project-jane-street";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-text tracking-tight">
          CN Finance
        </Link>
        <nav className="flex items-center gap-6 text-sm text-text-muted">
          <Link href="/skills" className="hover:text-text transition-colors">
            Skills
          </Link>
          <Link href="/docs" className="hover:text-text transition-colors">
            Docs
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://claude.ai/customize/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Open Claude
          </a>
        </nav>
      </div>
    </header>
  );
}
