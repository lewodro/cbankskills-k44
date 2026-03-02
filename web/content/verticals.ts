export type Vertical = {
  slug: string;
  title: string;
  description: string;
  audience: "decision-maker" | "developer" | "both";
  commands: string[];
  demoAssets: {
    preview: string;
    pdf?: string;
    excel?: string;
  };
  installCommand: string;
  highlight: string;
};

export const verticals: Vertical[] = [
  {
    slug: "financial-analysis",
    title: "Financial Analysis",
    description:
      "Core modeling toolkit — DCF, LBO, comps, 3-statement models, and Excel authoring. The foundation layer for all other verticals.",
    audience: "both",
    commands: ["/dcf", "/lbo", "/comps", "/3-statement-model", "/xlsx-author"],
    demoAssets: { preview: "/demos/financial-analysis/preview.png" },
    installCommand:
      "claude plugin install anthropic/financial-analysis",
    highlight: "Build institutional-quality models in minutes, not hours.",
  },
  {
    slug: "investment-banking",
    title: "Investment Banking",
    description:
      "Full deal workflow from pitch to close — CIM builder, buyer lists, process letters, merger models, and branded pitch decks.",
    audience: "decision-maker",
    commands: ["/cim-builder", "/buyer-list", "/pitch-deck", "/merger-model", "/teaser"],
    demoAssets: { preview: "/demos/investment-banking/preview.png" },
    installCommand:
      "claude plugin install anthropic/investment-banking",
    highlight: "From mandate to pitch deck in a single workflow.",
  },
  {
    slug: "equity-research",
    title: "Equity Research",
    description:
      "Coverage lifecycle automation — earnings analysis, model updates, morning notes, sector overviews, and initiating coverage reports.",
    audience: "decision-maker",
    commands: ["/earnings-analysis", "/morning-note", "/sector-overview", "/initiating-coverage", "/model-update"],
    demoAssets: { preview: "/demos/equity-research/preview.png" },
    installCommand:
      "claude plugin install anthropic/equity-research",
    highlight: "Publish research at the speed of the market.",
  },
  {
    slug: "private-equity",
    title: "Private Equity",
    description:
      "Deal screening to IC memo — sourcing, diligence checklists, returns analysis, unit economics, and portfolio monitoring.",
    audience: "decision-maker",
    commands: ["/deal-screening", "/ic-memo", "/dd-checklist", "/returns-analysis", "/value-creation-plan"],
    demoAssets: { preview: "/demos/private-equity/preview.png" },
    installCommand:
      "claude plugin install anthropic/private-equity",
    highlight: "Screen more deals, write better memos, faster.",
  },
  {
    slug: "fund-admin",
    title: "Fund Administration",
    description:
      "Month-end operations — NAV tie-outs, GL reconciliation, accrual schedules, roll-forwards, and variance commentary.",
    audience: "both",
    commands: ["/nav-tieout", "/gl-recon", "/roll-forward", "/accrual-schedule", "/variance-commentary"],
    demoAssets: { preview: "/demos/fund-admin/preview.png" },
    installCommand:
      "claude plugin install anthropic/fund-admin",
    highlight: "Close the books faster with fewer errors.",
  },
  {
    slug: "wealth-management",
    title: "Wealth Management",
    description:
      "Client relationship workflows — financial plans, investment proposals, portfolio rebalancing, tax-loss harvesting, and client reports.",
    audience: "decision-maker",
    commands: ["/financial-plan", "/investment-proposal", "/portfolio-rebalance", "/client-report", "/tax-loss-harvesting"],
    demoAssets: { preview: "/demos/wealth-management/preview.png" },
    installCommand:
      "claude plugin install anthropic/wealth-management",
    highlight: "Deliver personalized advice at scale.",
  },
  {
    slug: "operations",
    title: "Operations & Compliance",
    description:
      "KYC document parsing and rules engine — onboarding doc extraction, compliance rule evaluation, and gap flagging.",
    audience: "both",
    commands: ["/kyc-doc-parse", "/kyc-rules"],
    demoAssets: { preview: "/demos/operations/preview.png" },
    installCommand:
      "claude plugin install anthropic/operations",
    highlight: "Automate KYC checks without cutting corners.",
  },
];
