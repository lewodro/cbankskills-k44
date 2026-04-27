"use client";
import { useState, useEffect } from "react";

type LineType = "prompt" | "cmd" | "text" | "dim" | "success" | "blank";

interface Line {
  delay: number;
  type: LineType;
  text?: string;
}

const LINES: Line[] = [
  { delay: 0,    type: "prompt",  text: "› " },
  { delay: 0,    type: "cmd",     text: "/cim-builder" },
  { delay: 0,    type: "text",    text: " Draft CIM for $120M EBITDA industrial SaaS" },
  { delay: 800,  type: "blank" },
  { delay: 900,  type: "dim",     text: "⟳  Parsing data room (47 files)…" },
  { delay: 1700, type: "dim",     text: "⟳  Drafting executive summary…" },
  { delay: 2500, type: "dim",     text: "⟳  Building financial exhibits…" },
  { delay: 3200, type: "dim",     text: "⟳  Running comp analysis…" },
  { delay: 4000, type: "blank" },
  { delay: 4100, type: "success", text: "✓  CIM ready — 67 pages. Export to Word or PDF." },
];

const COLOR: Record<LineType, string> = {
  prompt:  "var(--sub)",
  cmd:     "var(--accent)",
  text:    "var(--text)",
  dim:     "#8aaa97",
  success: "var(--accent)",
  blank:   "",
};

export default function Terminal() {
  const [shown, setShown] = useState<number[]>([]);
  const [hideCursor, setHideCursor] = useState(false);

  useEffect(() => {
    const timers = LINES.map((l, i) =>
      setTimeout(() => setShown((prev) => [...prev, i]), l.delay + 400)
    );
    const cursorTimer = setTimeout(() => setHideCursor(true), 5200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(cursorTimer);
    };
  }, []);

  const visibleLines = LINES.filter((_, i) => shown.includes(i));
  const first3 = visibleLines.slice(0, 3);
  const rest   = visibleLines.slice(3);

  const renderLine = (l: Line, i: number) => {
    if (l.type === "blank") return <br key={i} />;
    return (
      <div key={i} style={{ display: "flex" }}>
        <span
          style={{
            color: COLOR[l.type],
            fontWeight: l.type === "cmd" || l.type === "success" ? 500 : undefined,
          }}
        >
          {l.text}
        </span>
        {i === 0 && !hideCursor && <span className="t-cursor" />}
      </div>
    );
  };

  return (
    <div
      style={{
        maxWidth: 620,
        margin: "60px auto 0",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--b1)",
        background: "#fff",
        boxShadow: "0 2px 0 rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.10)",
      }}
    >
      {/* macOS title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "13px 16px",
          borderBottom: "1px solid var(--b0)",
          background: "var(--s1)",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
        <span
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--sub)",
            transform: "translateX(-18px)",
          }}
        >
          claude.ai
        </span>
      </div>

      {/* body */}
      <div
        style={{
          padding: "20px 24px 24px",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          lineHeight: 1.8,
          minHeight: 160,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {first3.map((l, i) => renderLine(l, i))}
        </div>
        {rest.map((l, i) => renderLine(l, i + 3))}
      </div>
    </div>
  );
}
