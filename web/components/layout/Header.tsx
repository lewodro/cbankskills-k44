import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-text tracking-tight">
          CN Finance
        </Link>
        <nav className="flex items-center gap-6 text-sm text-text-muted">
          <Link href="/#skills" className="hover:text-text transition-colors">
            Skills
          </Link>
          <Link href="/#install" className="hover:text-text transition-colors">
            Install
          </Link>
          <a
            href="https://github.com/anthropics/financial-services"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/#install"
            className="bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
