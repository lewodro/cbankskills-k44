import Link from "next/link";

const GITHUB_URL = "https://github.com/spooky-may/cbankskills-k2";

const FooterLogoSVG = () => (
  <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="38" fill="#2E8B57" />
    <circle cx="30" cy="30" r="16" fill="#2E8B57" />
    <circle cx="70" cy="30" r="16" fill="#2E8B57" />
    <circle cx="84" cy="50" r="16" fill="#2E8B57" />
    <circle cx="70" cy="70" r="16" fill="#2E8B57" />
    <circle cx="30" cy="70" r="16" fill="#2E8B57" />
    <circle cx="16" cy="50" r="16" fill="#2E8B57" />
    <rect x="28" y="34" width="44" height="28" rx="2" fill="white" />
    <rect x="22" y="44" width="8"  height="10" fill="white" />
    <rect x="70" y="44" width="8"  height="10" fill="white" />
    <rect x="34" y="29" width="6"  height="8"  fill="white" />
    <rect x="60" y="29" width="6"  height="8"  fill="white" />
    <rect x="34" y="62" width="5"  height="10" fill="white" />
    <rect x="43" y="62" width="5"  height="10" fill="white" />
    <rect x="52" y="62" width="5"  height="10" fill="white" />
    <rect x="61" y="62" width="5"  height="10" fill="white" />
    <rect x="36" y="39" width="8"  height="8"  fill="#2E8B57" />
    <rect x="56" y="39" width="8"  height="8"  fill="#2E8B57" />
  </svg>
);

export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 48px",
        borderTop: "1px solid var(--b0)",
        background: "var(--bg)",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      {/* Logo + tagline */}
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <FooterLogoSVG />
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase", color: "var(--text)" }}>
            CBANK
          </div>
          <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 2 }}>
            Claude AI skills for financial services
          </div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[
          { label: "Skills",       href: "/skills",    external: false },
          { label: "Docs",         href: "/docs",      external: false },
          { label: "GitHub",       href: GITHUB_URL,   external: true },
          { label: "Source Code",  href: GITHUB_URL,   external: true },
          { label: "Apache-2.0",   href: "https://github.com/spooky-may/cbankskills-k2/blob/main/LICENSE", external: true },
        ].map((l) =>
          l.external ? (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 11, color: "var(--text-faint)", textDecoration: "none", transition: "color 0.15s" }}
            >
              {l.label}
            </a>
          ) : (
            <Link
              key={l.label}
              href={l.href}
              style={{ fontSize: 11, color: "var(--text-faint)", textDecoration: "none" }}
            >
              {l.label}
            </Link>
          )
        )}
      </div>
    </footer>
  );
}
