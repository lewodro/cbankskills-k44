# Changelog

All notable changes to CN Finance are documented here.

---

## [1.0.0] — 2026-05-25

### Added

**Skills**
- `financial-analysis` vertical — DCF, LBO, comps, 3-statement model, Excel/PowerPoint authoring, 11 MCP data connectors
- `investment-banking` vertical — CIM builder, buyer list, pitch deck, merger model, deal tracker, teaser, process letter
- `equity-research` vertical — earnings analysis, morning note, sector overview, initiating coverage, catalyst calendar, thesis tracker
- `private-equity` vertical — deal screening, IC memo, diligence checklist, returns analysis, value creation plan, unit economics
- `fund-admin` vertical — NAV tie-out, GL reconciliation, accrual schedule, roll-forward, variance commentary
- `wealth-management` vertical — financial plan, investment proposal, portfolio rebalance, client report, tax-loss harvesting
- `operations` vertical — KYC document parsing, KYC rules engine

**Agents**
- `pitch-agent` — comps + precedents + LBO → branded pitch deck end-to-end
- `market-researcher` — sector theme → industry overview + peer comps + ideas
- `earnings-reviewer` — earnings call + filings → model update → note draft
- `model-builder` — DCF, LBO, 3-statement, comps in Excel
- `meeting-prep-agent` — briefing pack before client meetings
- `gl-reconciler` — GL break detection, root cause trace, sign-off routing
- `month-end-closer` — accruals, roll-forwards, variance commentary
- `statement-auditor` — LP statement audit before distribution
- `valuation-reviewer` — GP packages → valuation → LP reporting
- `kyc-screener` — onboarding doc parse + rules engine + gap flagging

**Web**
- Initial Next.js 14 showcase site with App Router
- Landing page with hero, stats strip, vertical skill grid, install CTA
- Skill detail pages for all 7 verticals (`/skills/[slug]`)
- Responsive Header and Footer
- Claude light-mode design system (Sea Green primary, warm off-white surfaces)
- Tailwind config with full CN Finance color palette

---

## Upcoming

- Demo screenshots per vertical in `public/demos/`
- Downloadable sample PDFs (pitch deck, morning note, IC memo)
- Agent detail pages
- MCP connector documentation
- Managed Agents deployment guide
