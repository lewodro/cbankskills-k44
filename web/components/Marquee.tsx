const PARTNERS = [
  "Goldman Sachs", "Morgan Stanley", "BlackRock", "Citadel", "Bridgewater",
  "JP Morgan", "Two Sigma", "AQR Capital", "Vanguard", "KKR",
  "Apollo", "Carlyle", "Blackstone", "PIMCO", "Fidelity",
];
const ALL = [...PARTNERS, ...PARTNERS];

export default function Marquee() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--b0)",
        borderBottom: "1px solid var(--b0)",
        background: "var(--s1)",
        padding: "12px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: 72,
          background: "linear-gradient(90deg, var(--s1), transparent)",
          zIndex: 2, pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: 72,
          background: "linear-gradient(-90deg, var(--s1), transparent)",
          zIndex: 2, pointerEvents: "none",
        }}
      />
      <div className="marquee-track" style={{ display: "flex", width: "max-content" }}>
        {ALL.map((name, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center",
              padding: "0 26px",
              fontSize: 11, fontWeight: 500,
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              borderRight: "1px solid var(--b0)",
              gap: 7,
              fontFamily: "var(--font-mono)",
            }}
          >
            <span
              style={{
                width: 3, height: 3,
                background: "rgba(46,139,87,0.3)",
                borderRadius: "50%",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
