export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-subtle">
        <span>CN Finance — Claude AI skills for financial services</span>
        <span>
          Skills adapted from{" "}
          <a
            href="https://github.com/anthropics/financial-services"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text transition-colors underline underline-offset-2"
          >
            anthropics/financial-services
          </a>{" "}
          (Apache-2.0)
        </span>
      </div>
    </footer>
  );
}
