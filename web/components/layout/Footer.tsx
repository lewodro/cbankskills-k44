import Link from "next/link";

const GITHUB_URL = "https://github.com/spooky-may/project-jane-street";
const SKILLS_URL = "https://github.com/spooky-may/project-jane-street/tree/main/skills";

const links = [
  { label: "Skills",               href: "/skills",                     external: false },
  { label: "Docs",                 href: "/docs",                       external: false },
  { label: "GitHub",               href: GITHUB_URL,                    external: true  },
  { label: "Source Code",          href: SKILLS_URL,                    external: true  },
  { label: "Claude Skills Manager",href: "https://claude.ai/customize/skills", external: true },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--b0)",
        padding: "40px",
        maxWidth: 1000,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      {/* Left: brand */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 15,
            color: "var(--text)",
            marginBottom: 4,
          }}
        >
          CN Finance
        </div>
        <div style={{ fontSize: 12, color: "var(--sub)" }}>
          Claude AI skills for financial services
        </div>
      </div>

      {/* Right: links */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {links.map((l) =>
          l.external ? (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: "var(--sub)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ) : (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontSize: 12,
                color: "var(--sub)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          )
        )}
      </div>
    </footer>
  );
}
