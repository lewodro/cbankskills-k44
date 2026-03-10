# CN-Finance — CLAUDE.md

# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.


This file is the source of truth for Claude Code when working in this repo.
Read it fully before making any changes.

---

## What This Project Is

**CN-Finance** is a showcase website for Claude AI skills purpose-built for
financial services workflows. It is a monorepo containing:

1. `skills/` — Claude skill collection (adapted from `anthropics/financial-services`)
2. `web/` — Next.js 14 showcase site deployed on Vercel

The site targets two audiences:
- **Decision makers** (CTOs, bank leadership) — value prop, output examples, ROI framing
- **Developers** — install instructions, skill structure, GitHub integration

---

## Repo Structure

```
cn-finance/
├── CLAUDE.md                  ← you are here
├── README.md                  ← GitHub-facing, killer README for X/social
│
├── skills/                    ← Claude skill collection (branded)
│   ├── financial-analysis/    ← CORE — install this first
│   ├── investment-banking/
│   ├── equity-research/
│   ├── private-equity/
│   ├── wealth-management/
│   ├── fund-admin/
│   └── operations/
│   (each vertical contains: skills/*/SKILL.md, commands/, .claude-plugin/)
│
└── web/                       ← Next.js 14 app (App Router)
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx            ← landing page
    │   └── skills/
    │       └── [slug]/
    │           └── page.tsx   ← skill detail page
    ├── components/
    │   ├── ui/                ← base components (button, card, badge)
    │   ├── layout/            ← header, footer, nav
    │   └── sections/          ← landing page sections
    ├── content/
    │   └── verticals.ts       ← metadata per vertical (title, desc, commands, slug)
    ├── lib/
    │   └── utils.ts
    └── public/
        └── demos/             ← static demo assets per vertical
            ├── investment-banking/
            │   ├── preview.png     ← screenshot shown on skill page
            │   └── sample.pdf      ← downloadable sample output
            ├── equity-research/
            └── ... (one folder per vertical)
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14, App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Deploy | Vercel |
| Package manager | npm |

---

## Design System

### Primary Color
```
#2E8B57  — Sea Green (primary / brand)
```

### Full Palette (use these, do not deviate)
```
--color-primary:        #2E8B57   /* Sea Green — CTAs, highlights, active */
--color-primary-dark:   #1f6b40   /* hover states */
--color-primary-light:  #e8f5ee   /* backgrounds, chips */
--color-surface:        #ffffff
--color-surface-alt:    #f8fafb
--color-border:         #e2e8f0
--color-text:           #0f172a   /* headings */
--color-text-muted:     #64748b   /* body, labels */
--color-text-subtle:    #94a3b8   /* captions, placeholders */
--color-accent-gold:    #b5922a   /* financial data emphasis */
--color-success:        #16a34a
--color-danger:         #dc2626
```

### Typography
- Headings: `font-semibold` or `font-bold`, tight tracking
- Body: `text-sm` or `text-base`, `text-text-muted`
- Monospace (commands, code): `font-mono text-sm`
- Never use Inter or Roboto — use the system font stack via Tailwind default

### Component Conventions
- Cards: `rounded-xl border border-border bg-surface shadow-sm`
- Primary button: `bg-primary text-white hover:bg-primary-dark rounded-lg`
- Badge/chip: `bg-primary-light text-primary text-xs font-medium rounded-full px-2 py-0.5`
- Section spacing: `py-20` for top-level sections, `py-12` for sub-sections

---

## Skills Folder Conventions

Each vertical in `skills/` follows this structure (inherited from Anthropic):
```
skills/[vertical]/
├── .claude-plugin/
│   └── plugin.json         ← plugin metadata, version
├── skills/
│   └── [skill-name]/
│       └── SKILL.md        ← the actual skill (1 per zip for upload)
├── commands/               ← slash command definitions
└── README.md
```

### When editing skills:
- **Never edit** `.claude-plugin/plugin.json` version manually — it is bumped by script
- `SKILL.md` files are the primary artifact — keep them clean markdown
- Do not add non-markdown dependencies inside skill folders
- Each `SKILL.md` must have a YAML frontmatter with `name` and `description`

### Creating a zip for upload to claude.ai/customize/skills:
```bash
# Zip exactly one skill subfolder (must contain exactly 1 SKILL.md)
cd skills/investment-banking/skills/comps-analysis
zip -r comps-analysis.zip .
# Upload this zip to claude.ai/customize/skills
```

---

## Web App Conventions

### File naming
- Components: PascalCase (`SkillCard.tsx`)
- Pages: lowercase via Next.js App Router convention (`page.tsx`, `layout.tsx`)
- Utilities: camelCase (`formatSlug.ts`)
- Content/data: camelCase (`verticals.ts`)

### Content source of truth
All skill metadata lives in `web/content/verticals.ts`:
```typescript
export type Vertical = {
  slug: string
  title: string
  description: string
  audience: 'decision-maker' | 'developer' | 'both'
  commands: string[]          // e.g. ['/dcf', '/comps', '/lbo']
  demoAssets: {
    preview: string           // path under /public/demos/[slug]/
    pdf?: string
    excel?: string
  }
  installCommand: string      // full claude plugin install command
  highlight: string           // one-line value prop for card
}
```

### Routing
- `/` — landing page (hero, two audience sections, vertical grid)
- `/skills/[slug]` — detail page per vertical
- Slug = vertical folder name (e.g. `investment-banking`, `equity-research`)

### Image handling
- All demo screenshots go in `public/demos/[slug]/preview.png`
- Use `next/image` with explicit `width` and `height` always
- PDFs for download go in `public/demos/[slug]/sample.pdf`

---

## Development Commands

```bash
# Install deps
cd web && npm install

# Dev server
npm run dev           # runs on localhost:3000

# Build
npm run build

# Type check
npm run typecheck     # or: npx tsc --noEmit

# Lint
npm run lint
```

---

## Vercel Deploy

- Connected to `main` branch — push to main = auto deploy
- No environment variables required for MVP (static site, no API calls)
- `web/` is the Vercel root directory — set this in Vercel project settings:
  ```
  Root Directory: web
  Framework: Next.js
  ```

---

## What Claude Should NOT Do in This Repo

- Do not modify anything inside `skills/*/skills/*/SKILL.md` unless explicitly
  asked — these are canonical skill files adapted from Anthropic's repo
- Do not add `use client` unless the component genuinely needs browser APIs
  or React state — prefer Server Components by default
- Do not hardcode color hex values in components — always use the CSS variable
  names or Tailwind config aliases
- Do not create new API routes for MVP — this is a static showcase site
- Do not install additional UI libraries (shadcn, Radix, etc.) without asking —
  keep the dependency footprint minimal

---

## Attribution

The `skills/` directory is adapted from
[anthropics/financial-services](https://github.com/anthropics/financial-services)
(Apache-2.0). CN-Finance is an independent project and is not affiliated with
or endorsed by Anthropic.

---

*Last updated: May 2026*