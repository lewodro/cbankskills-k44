# CN Finance — Redesign SSOT
> Single Source of Truth for Claude Code.  
> Goal: transform the existing Next.js repo (`project-jane-street-web`) into the design spec below.  
> Do **not** change content, data, or routing logic. Only touch visual layer (styles, layout, animation, typography).

---

## 0. Quick Reference

| Item | Value |
|---|---|
| Source repo | `https://github.com/[org]/project-jane-street-web` |
| Framework | Next.js (App Router) |
| Styling approach | **CSS-in-JS via injected `<style>` tag** — no Tailwind, no CSS modules for the redesign layer |
| Design inspiration | Linear.app + Resend.com |
| Color mode | **Light mode** (white background, green accent) |
| Primary accent | `#2E8B57` (Sea Green) |

---

## 1. Fonts

### Install via Google Fonts — add to `app/layout.tsx` (or `_document.tsx`)

```tsx
import { Instrument_Serif, Geist, Geist_Mono } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
```

Apply all three `variable` props to `<html>`:

```tsx
<html className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
```

### Font usage rules

| Role | Font | Weight | Notes |
|---|---|---|---|
| Hero H1, Section H2, CTA H2, Footer logo | `var(--font-serif)` / `Instrument Serif` | 400 | Italic variant for gradient emphasis words |
| Body, nav links, buttons, sub-text | `var(--font-sans)` / `Geist` | 300–600 | 300 for descriptive paragraphs, 500–600 for labels/buttons |
| Commands, badges, version tags, terminal, stat labels, eyebrow tags | `var(--font-mono)` / `Geist Mono` | 400–500 | Always lowercase or UPPERCASE with `letter-spacing: 0.08–0.12em` |

---

## 2. CSS Design Tokens

Inject this `:root` block globally (e.g. in `globals.css` or a `<style>` tag in the root layout):

```css
:root {
  /* ── Surfaces ── */
  --bg:        #FFFFFF;
  --s1:        #F5F9F7;   /* card background, eyebrow pill bg */
  --s2:        #EBF3EE;   /* hover surface, nav link hover bg */
  --s3:        #DCEEe4;   /* deeper surface, skill-vertical badge */

  /* ── Borders ── */
  --b0:        rgba(0,0,0,0.07);   /* subtle divider */
  --b1:        rgba(0,0,0,0.11);   /* card border default */
  --b2:        rgba(0,0,0,0.20);   /* card border on hover */

  /* ── Accent (Sea Green) ── */
  --accent:        #2E8B57;
  --accent-dim:    rgba(46,139,87,0.09);   /* badge/pill bg */
  --accent-mid:    rgba(46,139,87,0.22);   /* icon border, card hover border */

  /* ── Text ── */
  --text:      #0D1F14;   /* primary text */
  --sub:       #527A62;   /* muted text, nav links, descriptions */
  --faint:     #B8D4C2;   /* decorative step numbers */

  /* ── Fonts ── */
  --font-sans:  'Geist', sans-serif;
  --font-mono:  'Geist Mono', monospace;
  --font-serif: 'Instrument Serif', serif;
}
```

> **Note:** The variable `--gold` in the reference JSX is an alias for `--accent`. Use `--accent` going forward for clarity.

---

## 3. Global Base Styles

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
```

---

## 4. Background Texture

Apply both classes `dot-grid` and `noise` to the root wrapper div:

### Dot Grid (green dots on white)
```css
.dot-grid::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: radial-gradient(rgba(46,139,87,0.18) 1px, transparent 1px);
  background-size: 26px 26px;
  pointer-events: none;
  z-index: 0;
}
```

### Noise Texture (subtle grain)
```css
.noise::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
}
```

All content sections must have `position: relative; z-index: 1` (use a `.rel` utility class).

---

## 5. Navigation

### Spec
- `position: sticky; top: 0; z-index: 100`
- Height: `56px`
- Background: `rgba(255,255,255,0.88)` + `backdrop-filter: blur(16px)`
- Border bottom: `1px solid var(--b0)`
- Layout: `flex; justify-content: space-between; align-items: center; padding: 0 40px`

### Logo
```html
<div class="nav-logo">
  <span class="nav-logo-dot"></span>  <!-- 7×7px circle, background: var(--accent) -->
  CN Finance
</div>
```
Font: `var(--font-serif)`, `17px`, `letter-spacing: -0.01em`

### Nav Links
- Font size: `13px`, color: `var(--sub)`
- Padding: `6px 12px`, border-radius: `6px`
- **Hover:** `color: var(--text)`, `background: var(--s2)`, transition `0.15s`

### License Badge
```html
<span class="nav-badge">Apache-2.0</span>
```
Font: `var(--font-mono)`, `10px`, border: `1px solid var(--b1)`, padding: `2px 7px`, border-radius: `4px`

### CTA Button
- Background: `var(--accent)`, color: `#fff`
- Padding: `7px 16px`, border-radius: `7px`, font-weight: `600`, font-size: `13px`
- Hover: `opacity: 0.85`, `transform: translateY(-1px)`, transition: `0.15s`

---

## 6. Hero Section

### Layout
- `max-width: 1000px; margin: 0 auto; padding: 100px 40px 80px; text-align: center`

### Eyebrow Pill
```html
<div class="hero-eyebrow">
  <span class="hero-eyebrow-dot"></span>  <!-- 5×5px, background: var(--accent) -->
  55 production-ready skills · 7 verticals
</div>
```
- Font: `var(--font-mono)`, `11px`, `letter-spacing: 0.1em`, `text-transform: uppercase`
- Border: `1px solid var(--b1)`, background: `var(--s1)`, border-radius: `100px`
- Padding: `5px 14px`, margin-bottom: `28px`

### H1
```html
<h1>
  Claude skills built for<br/>
  <em>financial services</em>
</h1>
```
- Font: `var(--font-serif)`, `font-size: clamp(44px, 7vw, 78px)`, weight: `400`
- Line-height: `1.08`, letter-spacing: `-0.02em`
- `<em>` tag: italic, gradient text:
  ```css
  background: linear-gradient(135deg, #1a5c38 0%, #2E8B57 55%, #52b57c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ```

### Sub-heading
- Font-size: `17px`, color: `var(--sub)`, font-weight: `300`
- `max-width: 520px; margin: 0 auto 36px; line-height: 1.65`

### CTA Buttons
Two buttons side by side (`gap: 12px`, centered flex):
1. **Primary** — background `var(--accent)`, color `#fff`, padding `11px 22px`, border-radius `8px`, font-weight `600`
2. **Ghost** — transparent bg, color `var(--sub)`, border `1px solid var(--b1)`, same padding, hover: `color: var(--text)`, `background: var(--s2)`, `border-color: var(--b2)`

---

## 7. Terminal Demo Component

Place below CTA buttons in the hero, `margin-top: 60px`, `max-width: 620px`, centered.

### Container
```css
.terminal-wrap {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--b1);
  background: #FFFFFF;
  box-shadow: 0 2px 0 rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.10);
}
```

### Title Bar (macOS chrome)
```html
<div class="terminal-bar">
  <!-- Three dots -->
  <span style="width:10px;height:10px;border-radius:50%;background:#FF5F57"></span>
  <span style="width:10px;height:10px;border-radius:50%;background:#FEBC2E"></span>
  <span style="width:10px;height:10px;border-radius:50%;background:#28C840"></span>
  <!-- centered label -->
  <span class="terminal-title">claude.ai</span>
</div>
```
- Title bar background: `var(--s1)`, border-bottom: `1px solid var(--b0)`, padding: `13px 16px`
- Title font: `var(--font-mono)`, `11px`, color: `var(--sub)`, visually centered via `margin: auto` + `transform: translateX(-18px)`

### Body
- Padding: `20px 24px 24px`, font: `var(--font-mono)` `13px`, line-height: `1.8`, min-height: `160px`

### Typing Animation Logic (React)

Lines render sequentially using `setTimeout`. Each line has a `delay` in ms:

```js
const TERMINAL_LINES = [
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
]
```

### Text Color per type

| type | color |
|---|---|
| `prompt` | `var(--sub)` |
| `cmd` | `var(--accent)`, `font-weight: 500` |
| `text` | `var(--text)` |
| `dim` | `#8aaa97` |
| `success` | `var(--accent)`, `font-weight: 500` |
| `blank` | renders `<br/>` |

### Cursor
- Blinking block cursor `6×13px`, background: `var(--accent)`
- Show only on first line, hide after all lines appear (~4.8s)
```css
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.t-cursor { animation: blink 1s step-end infinite; }
```

---

## 8. Stats Bar

### Layout
- Full-width strip, `border-top` + `border-bottom`: `1px solid var(--b0)`, background: `var(--s1)`
- Inner: `max-width: 900px`, `margin: 0 auto`, `display: grid`, `grid-template-columns: repeat(4, 1fr)`
- Each cell: `padding: 36px 32px`, `border-right: 1px solid var(--b0)`, last child no border-right

### Count-Up Animation (React)
Use `IntersectionObserver` to trigger when the bar enters viewport. Animate from `0` to target value over `1600ms` using an ease-out cubic function:

```js
function useCountUp(target, duration = 1600, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)   // ease-out cubic
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return val
}
```

### Stat values

| num | suffix | label |
|---|---|---|
| 55 | — | production-ready skills |
| 7 | — | financial verticals |
| 10 | — | end-to-end agents |
| 0 | `  lines to install` | of code required |

### Typography
- Number: `var(--font-serif)`, `46px`, weight `400`, color `var(--text)`, accent suffix color `var(--accent)`
- Label: `var(--font-sans)`, `12px`, color `var(--sub)`, `letter-spacing: 0.03em`

---

## 9. Section Layout Pattern

Every section follows this wrapper pattern:

```css
.section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 96px 40px;
}
```

### Section Header Pattern
```html
<div class="section-eyebrow">How it works</div>
<h2 class="section-h2">Three steps. No setup.</h2>
<p class="section-sub">No API keys. No build step. No dependencies.</p>
```

| Element | Styles |
|---|---|
| `.section-eyebrow` | `var(--font-mono)`, `11px`, `letter-spacing: 0.12em`, `text-transform: uppercase`, color `var(--accent)`, `margin-bottom: 16px` |
| `.section-h2` | `var(--font-serif)`, `clamp(30px, 4vw, 44px)`, weight `400`, `letter-spacing: -0.02em`, line-height `1.1`, `margin-bottom: 14px` |
| `.section-sub` | `var(--font-sans)`, `15px`, color `var(--sub)`, `max-width: 480px`, weight `300`, line-height `1.65` |

---

## 10. How It Works — Step Cards

```css
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 56px;
}

.step {
  background: var(--s1);
  padding: 32px 28px;
  border: 1px solid var(--b0);
  border-radius: 12px;
  transition: border-color 0.2s;
}
.step:hover { border-color: var(--b1); }
```

### Step number (decorative)
```css
.step-num {
  font-family: var(--font-serif);
  font-size: 72px;
  font-weight: 400;
  color: var(--faint);   /* #B8D4C2 — very light, purely decorative */
  line-height: 1;
  margin-bottom: 20px;
  letter-spacing: -0.03em;
}
```

Step title: `15px`, weight `500`, color `var(--text)`, `margin-bottom: 8px`  
Step desc: `13px`, color `var(--sub)`, weight `300`, line-height `1.65`

### Content
| # | Title | Description |
|---|---|---|
| 01 | Find your skill | Browse 55 skills across 7 financial services verticals. Each skill is purpose-built for a specific workflow. |
| 02 | Download the ZIP | Each skill is a self-contained ZIP file. Download one skill or an entire vertical from GitHub. |
| 03 | Upload to Claude | Go to claude.ai/customize/skills, upload your ZIP. The skill becomes a slash command instantly. |

---

## 11. Featured Skill Cards

```css
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 48px;
}

.skill-card {
  background: var(--s1);
  border: 1px solid var(--b0);
  border-radius: 12px;
  padding: 22px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.skill-card:hover {
  border-color: var(--b2);
  background: var(--s2);
  transform: translateY(-2px);
}
```

### Card anatomy
```
┌──────────────────────────────────────┐
│  [vertical badge]        [/cmd-name] │  ← top row: space-between
│                                      │
│  Skill Name                          │  ← 14px, weight 500
│  Short description sentence          │  ← 12px, var(--sub), weight 300
└──────────────────────────────────────┘
```

- **Vertical badge**: `var(--font-mono)` `10px`, uppercase, `letter-spacing: 0.08em`, color `var(--sub)`, bg `var(--s3)`, border `1px solid var(--b0)`, padding `3px 8px`, border-radius `4px`
- **Command chip**: `var(--font-mono)` `11px`, color `var(--accent)`, bg `var(--accent-dim)`, padding `3px 8px`, border-radius `4px`

### Data
```js
const FEATURED = [
  { vertical: "IB",          cmd: "/cim-builder",    name: "CIM Builder",     desc: "Draft a 60-page CIM from a data room in hours." },
  { vertical: "Equity",      cmd: "/morning-note",   name: "Morning Note",    desc: "Post-earnings research note before the market opens." },
  { vertical: "PE",          cmd: "/ic-memo",        name: "IC Memo",         desc: "From DD findings to IC-ready memo in one command." },
  { vertical: "Fin Analysis",cmd: "/dcf-model",      name: "DCF Model",       desc: "5-year DCF with WACC sensitivity from a 10-K." },
  { vertical: "Fund Admin",  cmd: "/nav-tieout",     name: "NAV Tie-Out",     desc: "Catch LP statement errors before they reach investors." },
  { vertical: "Wealth",      cmd: "/financial-plan", name: "Financial Plan",  desc: "Full retirement plan from a client intake form." },
]
```

---

## 12. Verticals Grid

```css
.verticals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  margin-top: 48px;
}

.vertical-card {
  background: var(--s1);
  border: 1px solid var(--b0);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.15s, background 0.2s;
}
.vertical-card:hover {
  border-color: var(--accent-mid);
  background: var(--s2);
  transform: translateY(-2px);
}
```

### Icon box
```css
.vertical-icon {
  width: 40px; height: 40px;
  background: var(--accent-dim);
  border: 1px solid var(--accent-mid);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}
```

### Card anatomy
```
[icon]  Vertical Name    v0.x.x
        Short description text
        [/cmd1]  [/cmd2]  [+4]
```

- Name: `15px`, weight `500`, color `var(--text)`
- Version: `var(--font-mono)`, `10px`, color `var(--sub)`
- Desc: `13px`, weight `300`, color `var(--sub)`, line-height `1.6`, `margin-bottom: 12px`
- Command chips: same style as skill-card command chip (accent color, accent-dim bg)

### Data
```js
const VERTICALS = [
  { icon: "🏦", name: "Investment Banking",  ver: "v0.2.1", desc: "From mandate to close — the full deal workflow.",           cmds: ["/pitch-deck",         "/cim-builder",          "+4"] },
  { icon: "📊", name: "Equity Research",     ver: "v0.1.2", desc: "Publish research at the speed of the market.",              cmds: ["/earnings-analysis",  "/morning-note",         "+4"] },
  { icon: "🔬", name: "Private Equity",      ver: "v0.1.2", desc: "Screen more deals. Write better memos. Close faster.",      cmds: ["/deal-screening",     "/ic-memo",              "+4"] },
  { icon: "📈", name: "Financial Analysis",  ver: "v0.1.1", desc: "The modeling foundation every desk runs on.",               cmds: ["/dcf-model",          "/lbo-model",            "+4"] },
  { icon: "⚖️", name: "Fund Administration", ver: "v0.1.0", desc: "Close the books faster, with fewer errors.",                cmds: ["/nav-tieout",         "/gl-recon",             "+4"] },
  { icon: "💼", name: "Wealth Management",   ver: "v0.1.2", desc: "Deliver personalized advice at scale.",                     cmds: ["/financial-plan",     "/investment-proposal",  "+4"] },
]
```

---

## 13. CTA Section

```css
.cta-section {
  border-top: 1px solid var(--b0);
  background: var(--s1);
  padding: 96px 40px;
  text-align: center;
}
```

- Inner: `max-width: 600px; margin: 0 auto`
- H2: same as `.section-h2` but `clamp(28px, 4vw, 44px)`
- Sub: `15px`, `var(--sub)`, weight `300`, `margin-bottom: 36px`
- Buttons: same primary + ghost pair, centered flex
- Note below buttons: `var(--font-mono)`, `12px`, color `var(--sub)`, `margin-top: 20px`

**Copy:**
```
h2:   Ready to install your first skill?
sub:  Start with Financial Analysis — the foundation vertical every other skill builds on.
btn1: Start with Financial Analysis  [primary]
btn2: Read the install guide         [ghost]
note: Requires Claude for Work (Teams or Enterprise) · Free · Apache-2.0
```

---

## 14. Footer

```css
footer {
  border-top: 1px solid var(--b0);
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

- **Left:** Logo text (`var(--font-serif)`, `15px`, `margin-bottom: 4px`) + tagline (`12px`, `var(--sub)`)
- **Right:** Links row — `font-size: 12px`, color `var(--sub)`, no underline, hover `color: var(--text)`, `gap: 20px`
- Links: `Skills`, `Docs`, `GitHub`, `Source Code`, `Claude Skills Manager`

---

## 15. Scroll Animations

### `AnimSection` utility component

Wraps any section or card group. Uses `IntersectionObserver` with `threshold: 0.1`. Once visible, adds `visible` class once (never repeats).

```tsx
function AnimSection({ children, className = "" }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`anim ${vis ? "visible" : ""} ${className}`}>
      {children}
    </div>
  )
}
```

### Animation CSS

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.anim          { opacity: 0; }
.anim.visible  { animation: fadeUp 0.6s ease forwards; }

/* Staggered delay modifiers */
.anim-d1.visible { animation-delay: 0.05s; }
.anim-d2.visible { animation-delay: 0.15s; }
.anim-d3.visible { animation-delay: 0.25s; }
.anim-d4.visible { animation-delay: 0.35s; }
.anim-d5.visible { animation-delay: 0.45s; }
.anim-d6.visible { animation-delay: 0.55s; }
```

### Where to apply stagger

| Section | Stagger class on each card/item |
|---|---|
| Hero elements (eyebrow, h1, sub, buttons, terminal) | `anim-d1` → `anim-d5` in order |
| How It Works steps | `anim-d1`, `anim-d2`, `anim-d3` |
| Featured skills grid | `anim-d1`, `anim-d2`, `anim-d3` cycling by `i % 3` |
| Verticals grid | `anim-d1`, `anim-d2` cycling by `i % 2` |
| Section headers (eyebrow + h2 + sub together) | no delay modifier, plain `anim` |

---

## 16. Responsive Breakpoints

At `max-width: 768px`:

```css
nav                 { padding: 0 20px; }
.hero               { padding: 72px 20px 60px; }
.steps              { grid-template-columns: 1fr; }
.skills-grid        { grid-template-columns: 1fr; }
.verticals-grid     { grid-template-columns: 1fr; }
.stats-inner        { grid-template-columns: repeat(2, 1fr); }
.section            { padding: 64px 20px; }
```

---

## 17. Implementation Checklist for Claude Code

```
SETUP
[ ] Install Instrument Serif, Geist, Geist Mono via next/font/google
[ ] Apply font variables to <html> in app/layout.tsx
[ ] Add CSS tokens (:root block) to globals.css
[ ] Add global base styles (*, html, body) to globals.css
[ ] Add dot-grid + noise CSS to globals.css
[ ] Add animation keyframes + .anim classes to globals.css

COMPONENTS — create or refactor:
[ ] <Nav />             — sticky frosted glass, logo dot, links, badge, CTA button
[ ] <HeroSection />     — eyebrow pill, H1 with italic gradient em, sub, buttons, Terminal
[ ] <Terminal />        — macOS chrome bar, typing animation with useEffect + setTimeout
[ ] <StatsBar />        — 4-column grid, useCountUp hook, IntersectionObserver trigger
[ ] <HowItWorks />      — 3-column step cards with decorative oversized number
[ ] <FeaturedSkills />  — 3-column skill card grid
[ ] <VerticalsGrid />   — 2-column vertical card grid with icon box
[ ] <CtaSection />      — centered text + button pair
[ ] <Footer />          — split layout, serif logo, links row
[ ] <AnimSection />     — IntersectionObserver wrapper utility

HOOKS
[ ] useCountUp(target, duration, start) — for stats
[ ] IntersectionObserver in AnimSection — for scroll fade-up

VALIDATION
[ ] All fonts loading correctly (check Network tab for Geist/Instrument Serif)
[ ] Terminal animation plays on page load
[ ] Stats count-up fires on scroll into view (not on load)
[ ] Scroll animations trigger once, do not repeat
[ ] Hover states on all cards working (translateY + border-color)
[ ] Responsive layout correct at 768px breakpoint
[ ] z-index layering: background textures (0) < content (.rel = 1) < nav (100)
```

---

## 18. File Structure (recommended)

```
app/
  layout.tsx          ← font variables, globals import
  page.tsx            ← assembles all section components
  globals.css         ← tokens, base, textures, animations

components/
  Nav.tsx
  HeroSection.tsx
  Terminal.tsx        ← isolated, self-contained animation
  StatsBar.tsx
  HowItWorks.tsx
  FeaturedSkills.tsx
  VerticalsGrid.tsx
  CtaSection.tsx
  Footer.tsx
  AnimSection.tsx     ← reusable scroll animation wrapper

hooks/
  useCountUp.ts       ← count-up animation hook
```

---

*This document is the single source of truth. If there is any conflict between this spec and the original repo code, this spec wins.*