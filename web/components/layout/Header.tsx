"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

const VERTICALS = [
  { slug: "financial-analysis", title: "Financial Analysis",  tagline: "The modeling foundation every desk runs on." },
  { slug: "investment-banking", title: "Investment Banking",  tagline: "M&A pitch decks and CIMs from data rooms." },
  { slug: "equity-research",    title: "Equity Research",     tagline: "Earnings notes and sector coverage faster." },
  { slug: "private-equity",     title: "Private Equity",      tagline: "Deal screening through IC memo, automated." },
  { slug: "fund-admin",         title: "Fund Admin",          tagline: "NAV tie-outs and GL recon without manual work." },
  { slug: "wealth-management",  title: "Wealth Management",   tagline: "Financial plans from intake forms in minutes." },
  { slug: "operations",         title: "Operations",          tagline: "KYC parsing and compliance rules at scale." },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const skillsActive = pathname.startsWith("/skills");
  const docsActive   = pathname.startsWith("/docs");

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: 60,
        background: "rgba(255,255,255,0.92)",
        borderBottom: "1px solid var(--b0)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <LogoSVG />
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          color: "var(--text)",
        }}>
          CBANK
        </span>
      </Link>

      {/* Nav */}
      <nav style={{ display: "flex", gap: 2, alignItems: "center" }}>

        {/* Skills — with vertical dropdown */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Link
            href="/skills"
            className={`nav-link-item${skillsActive ? " nav-link-active" : ""}`}
            style={{
              fontSize: 13,
              padding: "6px 12px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
            }}
          >
            Skills
            <span style={{
              display: "flex",
              opacity: skillsActive ? 0.8 : 0.45,
              transform: open ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}>
              <ChevronDown />
            </span>
          </Link>

          {open && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: "-16px",
              width: 476,
              background: "#fff",
              border: "1px solid var(--b0)",
              borderRadius: 14,
              boxShadow: "0 12px 40px rgba(13,31,20,0.10), 0 2px 8px rgba(13,31,20,0.06)",
              padding: "16px 14px 12px",
              zIndex: 200,
              animation: "dropdownIn 160ms cubic-bezier(0.16,1,0.3,1) forwards",
            }}>
              {/* Eyebrow */}
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 8,
                paddingLeft: 8,
              }}>
                7 Verticals
              </div>

              {/* 2-col grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {VERTICALS.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/skills/${v.slug}`}
                    onClick={() => setOpen(false)}
                    className="dropdown-item"
                    style={{
                      padding: "9px 10px",
                      borderRadius: 8,
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    <div style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text)",
                      letterSpacing: "-0.02em",
                      marginBottom: 2,
                    }}>
                      {v.title}
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: "var(--text-muted)",
                      fontWeight: 300,
                      lineHeight: 1.4,
                    }}>
                      {v.tagline}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: "1px solid var(--b0)",
                paddingLeft: 8,
              }}>
                <Link
                  href="/skills"
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--accent)",
                    textDecoration: "none",
                  }}
                >
                  Browse all 55 skills →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Docs — direct link */}
        <Link
          href="/docs"
          className={`nav-link-item${docsActive ? " nav-link-active" : ""}`}
          style={{
            fontSize: 13,
            padding: "6px 12px",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            gap: 4,
            textDecoration: "none",
          }}
        >
          Docs
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
