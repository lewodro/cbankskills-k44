import Link from "next/link";

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoSVG = () => (
  <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: 60,
        background: "rgba(255,255,255,0.88)",
        borderBottom: "1px solid var(--b0)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex", alignItems: "center", gap: 10,
          textDecoration: "none",
        }}
      >
        <LogoSVG />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "var(--text)",
          }}
        >
          CBANK
        </span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", gap: 2 }}>
        {[
          { label: "Skills",      href: "/skills" },
          { label: "Verticals",   href: "/skills" },
          { label: "Developers",  href: "/docs" },
        ].map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="nav-link-item"
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              padding: "6px 12px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
            }}
          >
            {item.label}
            <span style={{ opacity: 0.5 }}><ChevronDown /></span>
          </Link>
        ))}
        <Link
          href="/docs"
          className="nav-link-item"
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            padding: "6px 12px",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          About
        </Link>
      </nav>

      {/* CTAs */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link
          href="/skills"
          className="btn-outline"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text)",
            border: "1px solid var(--b1)",
            background: "transparent",
            padding: "8px 18px",
            borderRadius: 7,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
          }}
        >
          Browse skills
        </Link>
        <a
          href="https://claude.ai/customize/skills"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            background: "var(--text)",
            padding: "8px 18px",
            borderRadius: 7,
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
          }}
        >
          Start building
        </a>
      </div>
    </header>
  );
}
