export type Skill = {
  slug: string;
  name: string;
  description: string;
  triggerPhrases: string[];
  outputFormat: string;
  bestFor: string;
};

export type Vertical = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  version: string;
  audience: "decision-maker" | "developer" | "both";
  highlight: string;
  skills: Skill[];
  installCommand: string;
};

export const verticals: Vertical[] = [
  {
    slug: "financial-analysis",
    title: "Financial Analysis",
    tagline: "The modeling foundation every desk runs on.",
    version: "0.1.1",
    description:
      "Core quantitative toolkit — DCF, LBO, comps, 3-statement models, Excel and PowerPoint authoring. Install this vertical first; every other vertical depends on it.",
    audience: "both",
    highlight: "Build institutional-quality models in minutes, not hours.",
    installCommand: "claude plugin install anthropic/financial-analysis",
    skills: [
      {
        slug: "dcf-model",
        name: "DCF Model",
        description:
          "Real DCF (Discounted Cash Flow) model creation for equity valuation. Retrieves financial data from SEC filings and analyst reports, builds comprehensive cash flow projections with proper WACC calculations, performs sensitivity analysis, and outputs professional Excel models with executive summaries.",
        triggerPhrases: [
          "/dcf Apple 10-K — build a 5-year DCF with WACC sensitivity",
          "/dcf Value NVDA with 3 exit multiple scenarios",
          "/dcf Build intrinsic value model for MSFT using attached 10-Q",
        ],
        outputFormat: "Excel workbook with DCF model, WACC calculation, sensitivity tables, and executive summary tab",
        bestFor: "Equity valuation, M&A fairness opinions, investment committee materials",
      },
      {
        slug: "lbo-model",
        name: "LBO Model",
        description:
          "Complete and populate LBO (Leveraged Buyout) model templates in Excel for private equity transactions, deal materials, or investment committee presentations. Fills in formulas, validates calculations, and ensures professional formatting standards that adapt to any template structure.",
        triggerPhrases: [
          "/lbo Model buyout of TechCo at 12x EBITDA with 60% leverage",
          "/lbo Run returns sensitivity on entry 10-14x, exit 10-12x",
          "/lbo Fill in attached LBO template with deal terms below",
        ],
        outputFormat: "Excel LBO model with sources & uses, returns waterfall, IRR/MOIC sensitivity table",
        bestFor: "PE deal evaluation, sponsor financing, leveraged buyout analysis",
      },
      {
        slug: "comps-analysis",
        name: "Comps Analysis",
        description:
          "Build institutional-grade comparable company analyses with operating metrics, valuation multiples, and statistical benchmarking in Excel format. Covers public company valuation, M&A analysis, IPO pricing, and peer benchmarking.",
        triggerPhrases: [
          "/comps Build comps for US mid-cap enterprise SaaS",
          "/comps Trading comps for payments processors — EV/EBITDA and EV/Revenue",
          "/comps Benchmark TechCo against attached peer set",
        ],
        outputFormat: "Excel comps table with trading multiples, operating metrics, and quartile benchmarks",
        bestFor: "Valuation anchoring, peer benchmarking, M&A pricing, IPO analysis",
      },
      {
        slug: "3-statement-model",
        name: "3-Statement Model",
        description:
          "Complete and populate 3-statement financial model templates (Income Statement, Balance Sheet, Cash Flow Statement). Links integrated financial statements within existing template structures and populates models with data from provided financial documents.",
        triggerPhrases: [
          "/3-statement-model Fill out attached 3-statement template using 2024 10-K",
          "/3-statement-model Build integrated model from the financials below",
          "/3-statement-model Link BS, IS, and CF in attached template",
        ],
        outputFormat: "Excel 3-statement model with IS, BS, and CF fully linked and populated",
        bestFor: "Equity research modeling, credit analysis, M&A due diligence",
      },
      {
        slug: "audit-xls",
        name: "Audit XLS",
        description:
          "Audit a spreadsheet for formula accuracy, errors, and common mistakes. Scopes to a selected range, a single sheet, or the entire model — including financial-model integrity checks like balance sheet balance, cash tie-out, and logic sanity checks.",
        triggerPhrases: [
          "/audit-xls Check my model for formula errors",
          "/audit-xls Does the balance sheet balance in attached file?",
          "/audit-xls QA this spreadsheet before I send it to the client",
        ],
        outputFormat: "Annotated error report with issue location, description, and suggested fix",
        bestFor: "Pre-send QA, model review, error detection before client delivery",
      },
      {
        slug: "competitive-analysis",
        name: "Competitive Analysis",
        description:
          "Framework for building competitive landscape decks — market positioning, competitor deep-dives, comparative analysis, strategic synthesis. Builds market maps and systematically evaluates competitive dynamics across an industry.",
        triggerPhrases: [
          "/competitive-analysis Build competitive landscape for B2B payments",
          "/competitive-analysis Who are the main competitors to Stripe?",
          "/competitive-analysis Market positioning map for cloud infrastructure",
        ],
        outputFormat: "PowerPoint-ready competitive landscape with positioning matrix, competitor profiles, and strategic takeaways",
        bestFor: "Pitches, sector initiation, strategic advisory, investment memos",
      },
    ],
  },
  {
    slug: "investment-banking",
    title: "Investment Banking",
    tagline: "From mandate to close — the full deal workflow.",
    version: "0.2.1",
    description:
      "End-to-end M&A and capital markets workflow coverage — pitch decks, CIMs, buyer universes, process letters, merger models, and deal tracking. Everything from the first pitch to the final bid.",
    audience: "decision-maker",
    highlight: "Cut deal prep time in half. From pitch to CIM in hours, not days.",
    installCommand: "claude plugin install anthropic/investment-banking",
    skills: [
      {
        slug: "pitch-deck",
        name: "Pitch Deck",
        description:
          "Populate investment banking pitch deck templates with data from source files. Fills in PowerPoint templates with deal data from Excel, financial statements, or research materials. For sell-side or buy-side pitches, fairness opinions, and management presentations.",
        triggerPhrases: [
          "/pitch-deck Fill attached pitch template with deal data from the model",
          "/pitch-deck Build buy-side pitch for $2.4B acquisition of TechCo",
          "/pitch-deck Populate slides with comps and LBO from attached files",
        ],
        outputFormat: "Populated PowerPoint pitch deck ready for client review",
        bestFor: "Sell-side pitches, buy-side M&A, fairness opinions, management presentations",
      },
      {
        slug: "cim-builder",
        name: "CIM Builder",
        description:
          "Structure and draft a Confidential Information Memorandum for sell-side M&A processes. Organizes company information into a professional, investor-ready document with consistent formatting and narrative flow — typically 50-80 pages.",
        triggerPhrases: [
          "/cim-builder Draft CIM for SaaS company — management provided data room below",
          "/cim-builder Build offering memorandum from attached management presentation",
          "/cim-builder Write business overview section for sell-side CIM",
        ],
        outputFormat: "Structured CIM draft (50-80 pages) with executive summary, business overview, financials, and appendices",
        bestFor: "Sell-side M&A processes, private placement memoranda, management buyouts",
      },
      {
        slug: "buyer-list",
        name: "Buyer List",
        description:
          "Build and organize a universe of potential acquirers for sell-side M&A processes. Identifies strategic and financial buyers, assesses fit rationale for each party, and prioritizes outreach order.",
        triggerPhrases: [
          "/buyer-list Who would buy a $200M ARR vertical SaaS company in HR tech?",
          "/buyer-list Build buyer universe for specialty chemicals manufacturer",
          "/buyer-list Strategic and financial buyers for attached company profile",
        ],
        outputFormat: "Structured buyer list with strategic rationale, financial capacity, and priority tier for each party",
        bestFor: "Sell-side process preparation, mandate pitches, strategic alternatives reviews",
      },
      {
        slug: "merger-model",
        name: "Merger Model",
        description:
          "Build accretion/dilution analysis for M&A transactions. Models pro forma EPS impact, synergy sensitivities, and purchase price allocation. Essential for evaluating deal terms and advising on transaction structure.",
        triggerPhrases: [
          "/merger-model Model $4.2B acquisition of Target by Acquirer — synergies $120M",
          "/merger-model Accretion/dilution at $50, $55, $60 per share",
          "/merger-model Pro forma EPS impact with attached financials",
        ],
        outputFormat: "Excel merger model with sources & uses, PPA, pro forma financials, EPS impact, and synergy sensitivity",
        bestFor: "M&A advisory, fairness opinions, deal structuring, board materials",
      },
      {
        slug: "teaser",
        name: "Teaser",
        description:
          "Draft anonymous one-page company teasers for sell-side M&A processes. Creates a compelling summary without revealing the company's identity, designed to gauge buyer interest before NDA execution.",
        triggerPhrases: [
          "/teaser Write blind teaser for $80M EBITDA industrial distribution company",
          "/teaser Anonymous one-pager for attached company profile",
          "/teaser Draft teaser for initial sponsor outreach",
        ],
        outputFormat: "2-4 page anonymous teaser with business overview, financial highlights, and investment highlights",
        bestFor: "Initial buyer outreach, pre-NDA marketing, sponsor process launches",
      },
      {
        slug: "process-letter",
        name: "Process Letter",
        description:
          "Draft process letters and bid instructions for sell-side M&A processes. Covers initial indication of interest (IOI) instructions, final bid procedures, and management meeting logistics.",
        triggerPhrases: [
          "/process-letter Write first-round process letter with IOI deadline March 15",
          "/process-letter Final bid instructions for management presentation stage",
          "/process-letter Draft NDA cover letter and bid timeline",
        ],
        outputFormat: "Formal process letter with timeline, bid requirements, contact details, and submission instructions",
        bestFor: "Sell-side auction processes, structured M&A, private company sales",
      },
    ],
  },
  {
    slug: "equity-research",
    title: "Equity Research",
    tagline: "Publish research at the speed of the market.",
    version: "0.1.2",
    description:
      "Full coverage lifecycle — from initiating coverage reports to daily morning notes, earnings analysis, model updates, and sector overviews. Works with earnings transcripts, SEC filings, and your existing financial models.",
    audience: "decision-maker",
    highlight: "Turn an earnings transcript into a morning note before the market opens.",
    installCommand: "claude plugin install anthropic/equity-research",
    skills: [
      {
        slug: "earnings-analysis",
        name: "Earnings Analysis",
        description:
          "Create professional equity research earnings update reports (8-12 pages, 3,000-5,000 words) analyzing quarterly results for companies already under coverage. Fast-turnaround format focusing on beat/miss analysis, key metrics, updated estimates, and revised thesis. Includes 1-3 summary tables and 8-12 charts.",
        triggerPhrases: [
          "/earnings-analysis NVDA Q2 2025 — attached transcript + prior model",
          "/earnings-analysis Write up MSFT earnings results vs consensus",
          "/earnings-analysis Q3 update for GOOGL with revised estimates",
        ],
        outputFormat: "8-12 page earnings update report with beat/miss summary, key metrics, revised estimates, and updated thesis",
        bestFor: "Post-earnings updates, quarterly coverage reports, estimate revisions",
      },
      {
        slug: "morning-note",
        name: "Morning Note",
        description:
          "Draft concise morning meeting notes summarizing overnight developments, trade ideas, and key events for coverage stocks. Designed for the 7am morning meeting format — tight, opinionated, actionable. 400-600 words.",
        triggerPhrases: [
          "/morning-note NVDA — post-earnings takeaways, maintain Buy, $160 PT",
          "/morning-note Cover MSFT overnight news for morning call",
          "/morning-note What happened to AAPL overnight?",
        ],
        outputFormat: "400-600 word morning note with key takeaways, trade recommendation, and catalysts to watch",
        bestFor: "Daily morning meetings, client communications, intraday commentary",
      },
      {
        slug: "initiating-coverage",
        name: "Initiating Coverage",
        description:
          "Create institutional-quality equity research initiation reports through a 5-task workflow: company research, financial modeling, valuation analysis, chart generation, and final report assembly. Each task produces specific deliverables including Excel models, charts, and a full DOCX report.",
        triggerPhrases: [
          "/initiating-coverage Initiate coverage on Palantir — Buy rating, $35 PT",
          "/initiating-coverage Full initiation report for CRWD, attached 10-K",
          "/initiating-coverage Start coverage of Snowflake with financial model",
        ],
        outputFormat: "25-40 page initiation report with investment thesis, financial model, valuation, risks, and rating",
        bestFor: "New coverage initiations, sector expansion, institutional research distribution",
      },
      {
        slug: "earnings-preview",
        name: "Earnings Preview",
        description:
          "Build pre-earnings analysis with estimate models, scenario frameworks, and key metrics to watch. Prepares positioning notes, sets up bull/bear scenarios, and identifies what will move the stock before the company reports.",
        triggerPhrases: [
          "/earnings-preview What to watch for NVDA Q3 earnings next week",
          "/earnings-preview Pre-earnings setup for TSLA — bull/bear/base case",
          "/earnings-preview Key debates ahead of AMZN quarterly print",
        ],
        outputFormat: "4-6 page preview with consensus vs. estimates, key debates, scenario framework, and what to watch",
        bestFor: "Pre-earnings client notes, positioning analysis, options strategy setup",
      },
      {
        slug: "sector-overview",
        name: "Sector Overview",
        description:
          "Create comprehensive industry and sector landscape reports covering market dynamics, competitive positioning, key players, and thematic trends. For client requests, sector initiations, thematic research pieces, or internal knowledge building.",
        triggerPhrases: [
          "/sector-overview US cloud infrastructure — market dynamics and key players",
          "/sector-overview Thematic research on AI datacenter buildout",
          "/sector-overview Industry deep dive on vertical SaaS",
        ],
        outputFormat: "10-15 page sector report with market overview, competitive dynamics, key players, and investment implications",
        bestFor: "Sector initiations, thematic research, client education, conference presentations",
      },
      {
        slug: "model-update",
        name: "Model Update",
        description:
          "Update financial models with new data — quarterly earnings, management guidance, macro changes, or revised assumptions. Adjusts estimates, recalculates valuation, and flags material changes. Fast turnaround after data events.",
        triggerPhrases: [
          "/model-update Plug NVDA Q2 actuals into attached model",
          "/model-update Revise FY2025 estimates by +8% on datacenter guidance",
          "/model-update Update MSFT model with new Azure growth guidance",
        ],
        outputFormat: "Updated Excel model with revised estimates, new valuation, and change summary memo",
        bestFor: "Post-earnings estimate revisions, guidance updates, model refreshes",
      },
    ],
  },
  {
    slug: "private-equity",
    title: "Private Equity",
    tagline: "Screen more deals. Write better memos. Close faster.",
    version: "0.1.2",
    description:
      "Full deal lifecycle from sourcing to IC memo — deal screening, diligence checklists, returns analysis, unit economics, IC memos, and portfolio monitoring. Built for deal teams that evaluate 50+ deals a quarter.",
    audience: "decision-maker",
    highlight: "From CIM to IC memo in a day, not a week.",
    installCommand: "claude plugin install anthropic/private-equity",
    skills: [
      {
        slug: "deal-screening",
        name: "Deal Screening",
        description:
          "Quickly screen inbound deal flow — CIMs, teasers, and broker materials — against the fund's investment criteria. Extracts key deal metrics, runs a pass/fail framework, and outputs a one-page screening memo. Built for high-volume deal review.",
        triggerPhrases: [
          "/deal-screening Screen attached CIM against our fund criteria",
          "/deal-screening Should we take a first call on this teaser?",
          "/deal-screening Triage 3 inbound deals — criteria: B2B SaaS, $5-50M EBITDA",
        ],
        outputFormat: "One-page screening memo with key metrics, pass/fail on criteria, and recommended next step",
        bestFor: "Inbound deal flow triage, coverage universe management, pass/proceed decisions",
      },
      {
        slug: "ic-memo",
        name: "IC Memo",
        description:
          "Draft a structured investment committee memo for PE deal approval. Synthesizes due diligence findings, financial analysis, and deal terms into a professional IC-ready document. Covers thesis, business quality, risks, valuation, and recommendation.",
        triggerPhrases: [
          "/ic-memo Write IC memo for TechCo acquisition — attached DD findings",
          "/ic-memo Draft investment committee recommendation for $250M deal",
          "/ic-memo Build IC write-up from attached diligence summary",
        ],
        outputFormat: "Structured IC memo (15-25 pages) with executive summary, business overview, financial analysis, risks, and recommendation",
        bestFor: "Investment committee approvals, deal write-ups, LP reporting",
      },
      {
        slug: "returns-analysis",
        name: "Returns Analysis",
        description:
          "Build quick IRR/MOIC sensitivity tables for PE deal evaluation. Models returns across entry multiple, leverage, exit multiple, growth rate, and hold period scenarios. Fast back-of-envelope through full returns model.",
        triggerPhrases: [
          "/returns-analysis IRR at entry 10-14x EBITDA, exit 10-12x, 5yr hold",
          "/returns-analysis MOIC sensitivity table for attached deal at 60% leverage",
          "/returns-analysis What returns look like at $500M entry, various exit scenarios",
        ],
        outputFormat: "Excel returns model with IRR/MOIC sensitivity tables across key assumptions",
        bestFor: "Deal sizing, IC returns exhibits, LP reporting, co-investor materials",
      },
      {
        slug: "dd-checklist",
        name: "DD Checklist",
        description:
          "Generate and track comprehensive due diligence checklists tailored to the target company's sector, deal type, and complexity. Covers all major workstreams with request lists, status tracking, and red flag escalation.",
        triggerPhrases: [
          "/dd-checklist Generate DD checklist for B2B SaaS acquisition",
          "/dd-checklist What's still outstanding in our data room review?",
          "/dd-checklist Track DD status for attached workstream list",
        ],
        outputFormat: "Comprehensive DD checklist organized by workstream with status, priority, and outstanding items",
        bestFor: "Deal launch, data room management, workstream coordination, deal team alignment",
      },
      {
        slug: "unit-economics",
        name: "Unit Economics",
        description:
          "Analyze unit economics for PE targets — ARR cohorts, LTV/CAC, net retention, payback periods, revenue quality, and margin waterfall. Essential for evaluating software, SaaS, and recurring revenue businesses.",
        triggerPhrases: [
          "/unit-economics Analyze cohorts and LTV/CAC from attached data room",
          "/unit-economics Revenue quality assessment — net retention, churn, payback",
          "/unit-economics ARR bridge and cohort analysis for SaaS target",
        ],
        outputFormat: "Unit economics analysis with cohort charts, LTV/CAC ratios, retention waterfall, and quality scorecard",
        bestFor: "SaaS diligence, software deal evaluation, revenue quality assessment",
      },
      {
        slug: "value-creation-plan",
        name: "Value Creation Plan",
        description:
          "Structure post-acquisition value creation plans with revenue, cost, and operational levers mapped to an EBITDA bridge. Includes 100-day priorities, KPI targets, and accountability frameworks.",
        triggerPhrases: [
          "/value-creation-plan Build 100-day plan for TechCo post-close",
          "/value-creation-plan EBITDA bridge — $42M entry to $80M exit via attached levers",
          "/value-creation-plan Operating plan with KPIs for attached portfolio company",
        ],
        outputFormat: "Value creation plan with EBITDA bridge, 100-day priorities, KPI dashboard, and accountability matrix",
        bestFor: "Post-close planning, board presentations, operating partner materials, LP reporting",
      },
    ],
  },
  {
    slug: "fund-admin",
    title: "Fund Administration",
    tagline: "Close the books faster, with fewer errors.",
    version: "0.1.0",
    description:
      "Month-end operations for fund administrators — NAV tie-outs, GL reconciliation, accrual schedules, roll-forwards, break tracing, and variance commentary. Works directly with your existing Excel packages.",
    audience: "both",
    highlight: "Automate month-end commentary and reconciliations your team dreads.",
    installCommand: "claude plugin install anthropic/fund-admin",
    skills: [
      {
        slug: "nav-tieout",
        name: "NAV Tie-Out",
        description:
          "Tie an LP statement to the fund's NAV pack — recompute the LP's capital account from the NAV components and flag any line that doesn't agree. Use before LP statements are distributed to catch errors before they reach investors.",
        triggerPhrases: [
          "/nav-tieout Tie out NAV for fund close 2025-03-31 — attached LP statement and NAV pack",
          "/nav-tieout Check attached LP statement against NAV package",
          "/nav-tieout Find discrepancies between LP capital account and NAV",
        ],
        outputFormat: "NAV tie-out workpaper with line-by-line comparison, variances flagged, and summary exceptions list",
        bestFor: "Quarter-end LP statement review, audit support, NAV validation",
      },
      {
        slug: "gl-recon",
        name: "GL Reconciliation",
        description:
          "Reconcile general ledger to subledger for a trade date or period — match at the position or transaction level, surface breaks, and classify each break by likely cause. For daily or month-end recon runs across asset classes.",
        triggerPhrases: [
          "/gl-recon Reconcile GL to subledger for March month-end",
          "/gl-recon Match positions in attached GL export to trade blotter",
          "/gl-recon Find breaks between GL and custodian statement",
        ],
        outputFormat: "Reconciliation report with matched items, break summary, break classification, and suggested resolutions",
        bestFor: "Daily position recon, month-end close, audit preparation",
      },
      {
        slug: "variance-commentary",
        name: "Variance Commentary",
        description:
          "Write flux commentary for every P&L and balance-sheet line over threshold — current vs prior period and vs budget, with the driver explained from underlying activity. Produces client-ready management reporting commentary.",
        triggerPhrases: [
          "/variance-commentary Write month-end variance commentary for attached P&L",
          "/variance-commentary Explain variances vs budget for Q1 management report",
          "/variance-commentary Flux analysis — actual vs prior month, all lines over $50K",
        ],
        outputFormat: "Narrative variance commentary organized by line item with quantified drivers and explanations",
        bestFor: "Month-end close packages, board reporting, management accounts, audit support",
      },
      {
        slug: "roll-forward",
        name: "Roll-Forward",
        description:
          "Build a roll-forward schedule for a balance-sheet account — beginning balance plus activity less reversals equals ending balance, with each component tied to GL. For month-end close packages and audit support.",
        triggerPhrases: [
          "/roll-forward Build roll-forward for investment account Q1 2025",
          "/roll-forward Capital account roll-forward from attached GL extract",
          "/roll-forward Equity roll-forward schedule for month-end close",
        ],
        outputFormat: "Roll-forward schedule with beginning balance, activity columns, and ending balance tied to GL",
        bestFor: "Month-end close, audit support, financial statement preparation",
      },
      {
        slug: "accrual-schedule",
        name: "Accrual Schedule",
        description:
          "Build the period-end accrual schedule — compute each accrual entry, cite the supporting documentation, and draft the journal entry. The JE is a draft for controller approval, not a posting.",
        triggerPhrases: [
          "/accrual-schedule Build March accruals from attached expense detail",
          "/accrual-schedule Management fee and carried interest accruals for Q1",
          "/accrual-schedule Period-end accruals with JE drafts for controller review",
        ],
        outputFormat: "Accrual schedule with entry detail, support citations, and draft journal entries for each accrual",
        bestFor: "Month-end close, audit preparation, accrual management",
      },
      {
        slug: "break-trace",
        name: "Break Trace",
        description:
          "Root-cause a reconciliation break to its source transaction or posting — follow the audit trail from the break row back to the originating entry on each side and state what differs and why. Use after gl-recon has classified a break.",
        triggerPhrases: [
          "/break-trace Trace the $142K break in the attached recon to its source",
          "/break-trace Why does attached GL not match custodian for this position?",
          "/break-trace Root cause the MSFT position break from March recon",
        ],
        outputFormat: "Break trace memo with audit trail, root cause identification, and resolution steps",
        bestFor: "Break resolution, audit queries, reconciliation investigations",
      },
    ],
  },
  {
    slug: "wealth-management",
    title: "Wealth Management",
    tagline: "Deliver personalized advice at scale.",
    version: "0.1.2",
    description:
      "Client relationship workflows for wealth advisors — financial plans, investment proposals, portfolio rebalancing, tax-loss harvesting, and client reports. Designed for RIAs and private wealth teams managing 100+ client relationships.",
    audience: "decision-maker",
    highlight: "Spend more time with clients. Less time on reports.",
    installCommand: "claude plugin install anthropic/wealth-management",
    skills: [
      {
        slug: "financial-plan",
        name: "Financial Plan",
        description:
          "Build or update a comprehensive financial plan covering retirement projections, education funding, estate planning, and cash flow analysis. For new client onboarding, annual plan reviews, or scenario modeling.",
        triggerPhrases: [
          "/financial-plan Build retirement plan for client aged 52, $3.2M portfolio",
          "/financial-plan Update financial plan with new income and savings rate",
          "/financial-plan Can client retire at 60 given attached assumptions?",
        ],
        outputFormat: "Comprehensive financial plan with retirement projections, education funding, estate summary, and cash flow analysis",
        bestFor: "New client onboarding, annual plan reviews, life event planning",
      },
      {
        slug: "investment-proposal",
        name: "Investment Proposal",
        description:
          "Create professional investment proposals for prospective clients. Covers the firm's approach, proposed asset allocation, expected outcomes, and fee structure. For pitching new clients or presenting a revised strategy.",
        triggerPhrases: [
          "/investment-proposal New client proposal — $5M portfolio, moderate risk",
          "/investment-proposal Pitch revised allocation to existing client",
          "/investment-proposal Build IPS and proposal for attached prospect profile",
        ],
        outputFormat: "Professional investment proposal with allocation recommendation, return expectations, risk analysis, and fees",
        bestFor: "New client pitches, strategy updates, RFP responses",
      },
      {
        slug: "portfolio-rebalance",
        name: "Portfolio Rebalance",
        description:
          "Analyze portfolio allocation drift and generate rebalancing trade recommendations across accounts. Considers tax implications, transaction costs, and wash sale rules.",
        triggerPhrases: [
          "/portfolio-rebalance Rebalance client portfolio — attached holdings vs target allocation",
          "/portfolio-rebalance Generate rebalancing trades with tax sensitivity",
          "/portfolio-rebalance Check drift and recommend trades for attached accounts",
        ],
        outputFormat: "Rebalancing trade list with current vs. target weights, recommended trades, and estimated tax impact",
        bestFor: "Quarterly rebalancing, post-market-move realignment, tax-efficient transitions",
      },
      {
        slug: "tax-loss-harvesting",
        name: "Tax-Loss Harvesting",
        description:
          "Identify tax-loss harvesting opportunities across taxable accounts. Finds positions with unrealized losses, suggests replacement securities to maintain market exposure, and tracks wash sale windows.",
        triggerPhrases: [
          "/tax-loss-harvesting Find TLH opportunities in attached portfolio",
          "/tax-loss-harvesting Year-end tax losses — client has $2.1M in gains to offset",
          "/tax-loss-harvesting Harvest losses and suggest replacements, avoid wash sales",
        ],
        outputFormat: "Tax-loss harvesting plan with loss positions, suggested replacements, estimated tax savings, and wash sale calendar",
        bestFor: "Year-end planning, volatile market periods, high-gain-year offset strategies",
      },
      {
        slug: "client-report",
        name: "Client Report",
        description:
          "Generate professional client-facing performance reports with portfolio returns, allocation breakdowns, and market commentary. Suitable for quarterly or annual distribution across a full client book.",
        triggerPhrases: [
          "/client-report Q3 2025 performance report for attached client portfolio",
          "/client-report Generate quarterly reports for all clients in attached list",
          "/client-report Annual statement with attribution and market commentary",
        ],
        outputFormat: "Branded client performance report with returns, allocation, benchmark comparison, and personalized commentary",
        bestFor: "Quarterly and annual client reporting, relationship review materials",
      },
      {
        slug: "client-review",
        name: "Client Review Prep",
        description:
          "Prepare for client review meetings with portfolio performance summary, allocation analysis, talking points, and action items. Pulls together account data into a concise meeting-ready format.",
        triggerPhrases: [
          "/client-review Prep for quarterly review with Smith family — attached holdings",
          "/client-review Meeting prep for annual checkup with attached client profile",
          "/client-review What to cover in tomorrow's portfolio review call",
        ],
        outputFormat: "Meeting prep package with performance summary, talking points, agenda, and recommended action items",
        bestFor: "Quarterly reviews, annual checkups, life event discussions",
      },
    ],
  },
  {
    slug: "operations",
    title: "Operations & Compliance",
    tagline: "Automate KYC checks without cutting corners.",
    version: "0.1.0",
    description:
      "KYC/AML onboarding automation for financial institutions — document parsing, rules engine, risk rating, and gap flagging. Designed for compliance teams processing high volumes of client onboarding packets.",
    audience: "both",
    highlight: "Process KYC packets 10x faster with full audit trail.",
    installCommand: "claude plugin install anthropic/operations",
    skills: [
      {
        slug: "kyc-doc-parse",
        name: "KYC Document Parse",
        description:
          "Parse an investor or client onboarding packet into structured KYC fields — identity, ownership, control, source of funds, and document inventory. The first step of KYC screening; output feeds directly into the rules engine.",
        triggerPhrases: [
          "/kyc-doc-parse Parse attached onboarding packet for new institutional client",
          "/kyc-doc-parse Extract KYC fields from attached investor subscription docs",
          "/kyc-doc-parse Structure this onboarding packet for rules review",
        ],
        outputFormat: "Structured KYC data extract with identity fields, ownership/control structure, source of funds, and document inventory",
        bestFor: "New client onboarding, investor subscriptions, periodic review updates",
      },
      {
        slug: "kyc-rules",
        name: "KYC Rules Engine",
        description:
          "Apply the firm's KYC/AML rules grid to a parsed onboarding record — assign a risk rating, list every rule outcome with the rule cited, and flag what's missing or escalation-worthy. This skill scores and routes; it decides nothing on its own.",
        triggerPhrases: [
          "/kyc-rules Run rules check on attached parsed KYC record",
          "/kyc-rules Apply AML rules grid — flag missing items and risk rating",
          "/kyc-rules Score and route attached onboarding record for review",
        ],
        outputFormat: "Rules engine output with risk rating, rule-by-rule outcomes with citations, gaps list, and escalation flags",
        bestFor: "KYC compliance workflow, AML screening, onboarding approval routing",
      },
    ],
  },
];
