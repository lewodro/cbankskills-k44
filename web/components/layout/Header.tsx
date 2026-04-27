import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: 56,
        background: "rgba(255,255,255,0.88)",
        borderBottom: "1px solid var(--b0)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 17,
          color: "var(--text)",
          letterSpacing: "-0.01em",
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            background: "var(--accent)",
            borderRadius: "50%",
            flexShrink: 0,
            display: "inline-block",
          }}
        />
        CN Finance
      </Link>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {[
          { label: "Skills", href: "/skills", internal: true },
          { label: "Docs",   href: "/docs",   internal: true },
        ].map((item) =>
          item.internal ? (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link-item"
              style={{
                color: "var(--sub)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 400,
                padding: "6px 12px",
                borderRadius: 6,
              }}
            >
              {item.label}
            </Link>
          ) : null
        )}

        <a
          href="https://github.com/spooky-may/project-jane-street"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--sub)",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 400,
            padding: "6px 12px",
            borderRadius: 6,
          }}
        >
          GitHub
        </a>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--sub)",
            border: "1px solid var(--b1)",
            padding: "2px 7px",
            borderRadius: 4,
          }}
        >
          Apache-2.0
        </span>

        <a
          href="https://claude.ai/customize/skills"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "var(--accent)",
            color: "#fff",
            padding: "7px 16px",
            borderRadius: 7,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "var(--font-sans)",
            textDecoration: "none",
            display: "inline-block",
            marginLeft: 4,
          }}
        >
          Open Claude →
        </a>
      </nav>
    </header>
  );
}
