import Link from "next/link";

const GITHUB_URL = "https://github.com/spooky-may/project-jane-street";
const SKILLS_URL = "https://github.com/spooky-may/project-jane-street/tree/main/skills";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-semibold text-text mb-3">CN Finance</div>
            <p className="text-text-subtle text-sm leading-relaxed">
              Claude AI skills for financial services. 55 production-ready skills
              across 7 verticals.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
              Skills
            </div>
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              {[
                ["Investment Banking", "/skills/investment-banking"],
                ["Equity Research", "/skills/equity-research"],
                ["Private Equity", "/skills/private-equity"],
                ["Fund Administration", "/skills/fund-admin"],
                ["Wealth Management", "/skills/wealth-management"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-text transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
              Resources
            </div>
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              <Link href="/docs" className="hover:text-text transition-colors">
                Getting Started
              </Link>
              <Link href="/docs#install" className="hover:text-text transition-colors">
                How to Install
              </Link>
              <a href={SKILLS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                Browse on GitHub
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                Source Code
              </a>
              <a
                href="https://claude.ai/customize/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text transition-colors"
              >
                Claude Skills Manager
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-subtle">
          <span>Apache-2.0 · Adapted from Anthropic financial-services</span>
          <span>Not affiliated with or endorsed by Anthropic</span>
        </div>
      </div>
    </footer>
  );
}
