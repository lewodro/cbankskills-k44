import Link from "next/link";
import { verticals } from "@/content/verticals";

const SKILLS_URL = "https://github.com/spooky-may/project-jane-street/tree/main/skills";

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif text-5xl font-normal text-text mb-3" style={{ letterSpacing: "-0.02em" }}>Getting Started</h1>
        <p className="text-text-muted text-xl max-w-2xl leading-relaxed font-light">
          How to download a skill and add it to Claude in under 5 minutes.
          No API keys. No code. No setup.
        </p>
      </div>

      {/* Quick overview */}
      <div className="bg-primary-light border border-primary/20 rounded-xl p-6 mb-14">
        <h2 className="font-semibold text-text mb-3">What you need</h2>
        <ul className="flex flex-col gap-2 text-sm text-text-muted">
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">✓</span>
            A <strong>Claude for Work</strong> account (Teams or Enterprise)
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">✓</span>
            Access to{" "}
            <a href="https://claude.ai/customize/skills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              claude.ai/customize/skills
            </a>{" "}
            (admin or skill-install permission)
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold shrink-0">✓</span>
            A ZIP file of the skill you want to install (downloaded from GitHub)
          </li>
        </ul>
      </div>

      {/* Step-by-step */}
      <section id="install" className="mb-16">
        <h2 className="font-serif text-3xl font-normal text-text mb-8" style={{ letterSpacing: "-0.02em" }}>Install a skill — step by step</h2>

        <div className="flex flex-col gap-8">
          {/* Step 1 */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div className="w-px flex-1 bg-border mt-3" />
            </div>
            <div className="pb-8 flex-1">
              <h3 className="font-semibold text-text text-lg mb-2">Find the skill you want</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Browse the{" "}
                <Link href="/skills" className="text-primary hover:underline">skills directory</Link>{" "}
                to find the skill that matches your workflow. Each skill has a description,
                example prompts, and a link to its GitHub folder.
              </p>
              <div className="bg-surface border border-border rounded-xl p-4">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                  Available verticals
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {verticals.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/skills/${v.slug}`}
                      className="flex items-center justify-between text-sm text-text-muted hover:text-primary transition-colors group p-1"
                    >
                      <span>{v.title}</span>
                      <span className="text-xs text-text-subtle group-hover:text-primary">{v.skills.length} skills</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div className="w-px flex-1 bg-border mt-3" />
            </div>
            <div className="pb-8 flex-1">
              <h3 className="font-semibold text-text text-lg mb-2">Download the skill ZIP from GitHub</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Each skill lives in its own folder inside{" "}
                <a href={SKILLS_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  skills/plugins/vertical-plugins/
                </a>{" "}
                on GitHub. To download:
              </p>
              <div className="flex flex-col gap-3">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <div className="font-semibold text-text text-sm mb-2">Option A — Download individual skill</div>
                  <ol className="text-sm text-text-muted flex flex-col gap-1.5 list-decimal list-inside">
                    <li>Navigate to the skill folder on GitHub</li>
                    <li>Click the green <strong>Code</strong> button → <strong>Download ZIP</strong></li>
                    <li>You now have a ZIP containing the single skill</li>
                  </ol>
                </div>
                <div className="bg-surface border border-border rounded-lg p-4">
                  <div className="font-semibold text-text text-sm mb-2">Option B — Download entire vertical</div>
                  <ol className="text-sm text-text-muted flex flex-col gap-1.5 list-decimal list-inside">
                    <li>Navigate to the vertical folder (e.g. <code className="font-mono text-xs bg-surface-alt px-1 py-0.5 rounded">investment-banking/</code>)</li>
                    <li>Click <strong>Code</strong> → <strong>Download ZIP</strong></li>
                    <li>You get all skills in the vertical in one ZIP</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div className="w-px flex-1 bg-border mt-3" />
            </div>
            <div className="pb-8 flex-1">
              <h3 className="font-semibold text-text text-lg mb-2">Upload to claude.ai/customize/skills</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                With your ZIP downloaded, go to the Claude Skills Manager and upload it.
              </p>
              <ol className="flex flex-col gap-4">
                {[
                  { n: "3a", text: <>Open <a href="https://claude.ai/customize/skills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">claude.ai/customize/skills</a> in your browser</> },
                  { n: "3b", text: <>Click <strong>Add skill</strong> (or the + button)</> },
                  { n: "3c", text: <>Select your downloaded ZIP file and click <strong>Upload</strong></> },
                  { n: "3d", text: <>The skill appears in your skill library. It is now available as a slash command for everyone in your workspace.</> },
                ].map((item) => (
                  <div key={item.n} className="flex gap-3 items-start">
                    <code className="font-mono text-xs bg-surface-alt border border-border px-1.5 py-0.5 rounded text-text-muted shrink-0 mt-0.5">
                      {item.n}
                    </code>
                    <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </ol>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                4
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text text-lg mb-2">Use the skill in Claude</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Open Claude, type <code className="font-mono text-xs bg-surface-alt px-1.5 py-0.5 rounded">/</code> to see
                available skills, select yours, and start your request. Attach any relevant files
                (Excel models, PDFs, transcripts) directly in the message.
              </p>
              <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl p-4">
                <div className="font-mono text-sm space-y-1.5">
                  <p className="text-white/40"># Example — using the DCF skill</p>
                  <p>
                    <span className="text-primary">›</span>{" "}
                    <span className="text-white">/dcf Build 5-year DCF for Apple — attached 10-K + analyst model</span>
                  </p>
                  <p className="text-white/50">  Reading 10-K... Projecting free cash flows 2025-2029...</p>
                  <p className="text-white/50">  Calculating WACC... Building sensitivity tables...</p>
                  <p className="text-green-400/80">  ✓ DCF model ready. Base case: $198/share. Download Excel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Install order */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl font-normal text-text mb-4" style={{ letterSpacing: "-0.02em" }}>Recommended install order</h2>
        <p className="text-text-muted text-sm mb-6">
          Most verticals depend on{" "}
          <Link href="/skills/financial-analysis" className="text-primary hover:underline">
            Financial Analysis
          </Link>{" "}
          for Excel and PowerPoint authoring. Install it first.
        </p>
        <div className="flex flex-col gap-2">
          {[
            { order: "First", slug: "financial-analysis", note: "Required — provides Excel/PowerPoint authoring used by all other verticals" },
            { order: "Then",  slug: "investment-banking", note: "M&A pitch decks, CIMs, merger models" },
            { order: "Then",  slug: "equity-research",    note: "Earnings analysis, morning notes, sector overviews" },
            { order: "Then",  slug: "private-equity",     note: "Deal screening, IC memos, returns analysis" },
            { order: "Then",  slug: "fund-admin",         note: "NAV tie-outs, GL recon, variance commentary" },
            { order: "Then",  slug: "wealth-management",  note: "Financial plans, client reports, tax-loss harvesting" },
            { order: "Then",  slug: "operations",         note: "KYC document parsing and rules engine" },
          ].map((item) => {
            const v = verticals.find((v) => v.slug === item.slug)!;
            return (
              <div key={item.slug} className="flex items-center gap-4 bg-surface border border-border rounded-lg px-4 py-3">
                <span className="text-xs font-mono text-text-subtle w-10 shrink-0">{item.order}</span>
                <Link
                  href={`/skills/${item.slug}`}
                  className="font-medium text-text hover:text-primary transition-colors text-sm shrink-0"
                >
                  {v.title}
                </Link>
                <span className="text-text-subtle text-sm hidden sm:block">{item.note}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="font-serif text-3xl font-normal text-text mb-8" style={{ letterSpacing: "-0.02em" }}>FAQ</h2>
        <div className="flex flex-col gap-6">
          {[
            {
              q: "Do I need a Claude for Work account?",
              a: "Yes. Claude Skills (custom skill uploads) require Claude for Work — either Teams or Enterprise. The free Claude plan does not support custom skills.",
            },
            {
              q: "Do these skills work with the Anthropic API?",
              a: "Yes. Each SKILL.md file is a system prompt you can pass directly to the Anthropic API. See the managed-agent-cookbooks in the GitHub repo for API deployment examples.",
            },
            {
              q: "Can I install individual skills or only entire verticals?",
              a: "Both. Each skill is its own folder and can be downloaded and uploaded independently. You can also install the entire vertical in one upload to get all skills at once.",
            },
            {
              q: "Can I modify the skills for my firm's workflows?",
              a: "Absolutely. The skills are Apache-2.0 licensed. Fork the repo, edit the SKILL.md files to match your templates, terminology, or output format, and upload your modified version.",
            },
            {
              q: "Are the skills visible to everyone in my Claude workspace?",
              a: "When you upload a skill via claude.ai/customize/skills, it becomes available to your entire workspace by default. Check your Claude admin settings to manage skill visibility.",
            },
            {
              q: "What data connectors are supported?",
              a: "The Financial Analysis vertical includes optional MCP connectors for FactSet, Bloomberg/LSEG, PitchBook, Morningstar, S&P Global, Chronograph, Daloopa, Aiera, MT Newswires, and Egnyte. These require separate subscriptions and credentials from each provider.",
            },
          ].map((item) => (
            <div key={item.q} className="border-b border-border pb-6 last:border-0 last:pb-0">
              <h3 className="font-semibold text-text mb-2">{item.q}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-primary-light border border-primary/20 rounded-xl p-8 text-center flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-text">Ready to get started?</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/skills"
            className="bg-primary text-white font-medium px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm"
          >
            Browse all skills
          </Link>
          <a
            href={SKILLS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border bg-surface text-text-muted font-medium px-5 py-2.5 rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
          >
            View on GitHub
          </a>
          <a
            href="https://claude.ai/customize/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border bg-surface text-text-muted font-medium px-5 py-2.5 rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
          >
            Open Claude Skills Manager
          </a>
        </div>
      </div>
    </div>
  );
}
