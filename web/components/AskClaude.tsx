'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const SUGGESTED: Record<string, string[]> = {
  'financial-analysis': [
    'How accurate is the DCF output vs a manual model?',
    'Can it build a 3-statement model from scratch?',
    'What Excel file formats does it produce?',
  ],
  'investment-banking': [
    'How long does a CIM draft typically take?',
    'Can it build a full buyer universe from a company profile?',
    'What does the merger model accretion/dilution output include?',
  ],
  'equity-research': [
    'Can it turn an earnings transcript into a morning note?',
    'What sections does an initiation report include?',
    'How does model update handle estimate revisions?',
  ],
  'private-equity': [
    'How does deal screening work against fund criteria?',
    'Can it write an IC memo from due diligence notes?',
    'What IRR and MOIC sensitivity tables does it produce?',
  ],
  'fund-admin': [
    'How does NAV tie-out work step by step?',
    'Can it write month-end variance commentary automatically?',
    'What types of GL reconciliation breaks can it trace?',
  ],
  'wealth-management': [
    'Can it generate reports across 100+ client accounts?',
    'How does portfolio rebalancing factor in taxes?',
    'How does it identify tax-loss harvesting opportunities?',
  ],
  'operations': [
    'How does KYC document parsing extract structured fields?',
    "Can it apply our firm's specific AML rules grid?",
    'What risk ratings does the rules engine output?',
  ],
}

const FALLBACK = [
  'What does this skill produce?',
  'Who is this skill designed for?',
  'How do I get started quickly?',
]

interface Msg { role: 'user' | 'assistant'; content: string }

interface Props {
  vertical: string
  context: string
  compact?: boolean
}

/* ── Markdown renderer ─────────────────────────────────────── */

function inlineRender(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('`') && p.endsWith('`') && p.length > 2)
      return (
        <code key={i} style={{ fontFamily: 'var(--font-mono)', background: 'rgba(46,139,87,0.12)', padding: '1px 5px', borderRadius: 3, fontSize: '0.88em' }}>
          {p.slice(1, -1)}
        </code>
      )
    if (p.startsWith('**') && p.endsWith('**') && p.length > 4)
      return <strong key={i} style={{ fontWeight: 600 }}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2)
      return <em key={i}>{p.slice(1, -1)}</em>
    return p
  })
}

function MdTable({ lines }: { lines: string[] }) {
  const isSep = (l: string) => /^\|[\s\-:|]+\|/.test(l.trim())
  const parseRow = (l: string) =>
    l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())

  const headers = parseRow(lines[0])
  const body = lines.slice(1).filter(l => !isSep(l)).map(parseRow)

  return (
    <div style={{ overflowX: 'auto', margin: '8px 0' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 12, lineHeight: 1.5 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: '5px 10px',
                background: 'rgba(46,139,87,0.09)',
                borderBottom: '1px solid var(--b0)',
                fontWeight: 600,
                fontSize: 11,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                color: 'var(--text)',
              }}>
                {inlineRender(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: '1px solid var(--b0)' }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '5px 10px',
                  color: ci === 0 ? 'var(--text)' : 'var(--text-muted)',
                  fontWeight: ci === 0 ? 500 : 300,
                  verticalAlign: 'top',
                }}>
                  {inlineRender(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MdMsg({ text }: { text: string }) {
  if (!text) return null

  const blocks = text.split(/(```[\s\S]*?```)/g)

  return (
    <>
      {blocks.flatMap((block, bi) => {
        if (block.startsWith('```')) {
          const code = block.replace(/^```\w*\n?/, '').replace(/\n?```$/, '')
          return [
            <pre key={`cb-${bi}`} style={{
              background: 'rgba(13,31,20,0.06)',
              border: '1px solid var(--b0)',
              borderRadius: 6,
              padding: '10px 12px',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              overflowX: 'auto',
              margin: '6px 0',
              whiteSpace: 'pre',
              lineHeight: 1.5,
            }}>
              <code>{code}</code>
            </pre>,
          ]
        }

        return block.split(/\n\n+/).map((para, pi) => {
          if (!para.trim()) return null
          const lines = para.split('\n').filter(l => l.trim())

          // Table: all lines start with |
          if (lines.length >= 2 && lines.every(l => l.trim().startsWith('|'))) {
            return <MdTable key={`${bi}-${pi}`} lines={lines} />
          }

          const isUl = lines.length > 0 && lines.every(l => /^[-*] /.test(l))
          const isOl = lines.length > 0 && lines.every(l => /^\d+\. /.test(l))

          if (isUl) return (
            <ul key={`${bi}-${pi}`} style={{ paddingLeft: 18, margin: '4px 0 8px', listStyleType: 'disc' }}>
              {lines.map((l, li) => (
                <li key={li} style={{ marginBottom: 3, lineHeight: 1.6 }}>
                  {inlineRender(l.replace(/^[-*] /, ''))}
                </li>
              ))}
            </ul>
          )

          if (isOl) return (
            <ol key={`${bi}-${pi}`} style={{ paddingLeft: 18, margin: '4px 0 8px', listStyleType: 'decimal' }}>
              {lines.map((l, li) => (
                <li key={li} style={{ marginBottom: 3, lineHeight: 1.6 }}>
                  {inlineRender(l.replace(/^\d+\. /, ''))}
                </li>
              ))}
            </ol>
          )

          return (
            <p key={`${bi}-${pi}`} style={{ margin: '0 0 6px', lineHeight: 1.65 }}>
              {para.split('\n').map((line, li, arr) => [
                inlineRender(line),
                li < arr.length - 1 ? <br key={`br-${li}`} /> : null,
              ])}
            </p>
          )
        }).filter(Boolean)
      })}
    </>
  )
}

/* ── Component ────────────────────────────────────────────── */

export default function AskClaude({ vertical, context, compact = false }: Props) {
  const [open, setOpen]       = useState(false)
  const [mounted, setMounted] = useState(false)
  const [input, setInput]     = useState('')
  const [msgs, setMsgs]       = useState<Msg[]>([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  const questions = SUGGESTED[vertical] ?? FALLBACK

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 440)
      document.body.style.overflow = 'hidden'
    } else {
      setMsgs([])
      setInput('')
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send(text: string) {
    if (!text.trim() || loading) return
    const userMsg: Msg = { role: 'user', content: text.trim() }
    const history = [...msgs, userMsg]
    setMsgs([...history, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, context }),
      })
      if (!res.ok || !res.body) throw new Error(await res.text())

      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let buf = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buf += dec.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const d = line.slice(6).trim()
          if (d === '[DONE]') continue
          try {
            const delta = JSON.parse(d)?.choices?.[0]?.delta?.content
            if (delta) setMsgs(prev => {
              const copy = [...prev]
              copy[copy.length - 1] = { ...copy[copy.length - 1], content: copy[copy.length - 1].content + delta }
              return copy
            })
          } catch { /* malformed SSE chunk — skip */ }
        }
      }
    } catch {
      setMsgs(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'assistant', content: 'Something went wrong. Please try again.' }
        return copy
      })
    }
    setLoading(false)
  }

  const modal = (
    <div className="ac-backdrop" onClick={() => setOpen(false)}>
      <div className="ac-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--b0)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src="/chat-mascot.jpeg"
              alt="Claude"
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-mid)' }}
            />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>Claude</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.06em', marginTop: 3 }}>{context}</div>
            </div>
          </div>
          <button className="ac-close-btn" onClick={() => setOpen(false)}>×</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {msgs.length === 0 ? (
            <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.65 }}>
              Ask anything about <strong style={{ fontWeight: 600, color: 'var(--text)' }}>{context}</strong>. Try a suggested question below:
            </p>
          ) : (
            <>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-start', gap: 8 }}>
                  {m.role === 'assistant' && (
                    <img
                      src="/chat-mascot.jpeg"
                      alt="Claude"
                      style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--accent-mid)', marginTop: 2 }}
                    />
                  )}
                  <div style={{
                    background:   m.role === 'user' ? 'var(--accent)' : 'var(--s1)',
                    color:        m.role === 'user' ? '#fff' : 'var(--text)',
                    border:       m.role === 'user' ? 'none' : '1px solid var(--b0)',
                    borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '4px 12px 12px 12px',
                    padding:      '10px 14px',
                    maxWidth:     '82%',
                    fontSize:     13,
                    lineHeight:   1.65,
                    fontWeight:   m.role === 'user' ? 500 : 300,
                    wordBreak:    'break-word',
                  }}>
                    {m.role === 'assistant'
                      ? <MdMsg text={m.content} />
                      : m.content
                    }
                    {loading && i === msgs.length - 1 && m.role === 'assistant' && (
                      <span className="ac-cursor" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Suggested questions — always visible above input */}
        <div style={{ padding: '8px 16px 4px', borderTop: '1px solid var(--b0)', display: 'flex', gap: 6, overflowX: 'auto', flexShrink: 0 }}>
          {questions.map((q, i) => (
            <button
              key={q}
              className="ac-chip-btn"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => send(q)}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 8, flexShrink: 0 }}>
          <input
            ref={inputRef}
            className="ac-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
            placeholder={`Ask about ${context}…`}
            disabled={loading}
          />
          <button
            className="ac-submit-btn"
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            data-active={input.trim() && !loading ? '' : undefined}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {compact ? (
        <div style={{ background: 'var(--s1)', border: '1px solid var(--b0)', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
            ◆ Ask Claude
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 300, marginBottom: 12, lineHeight: 1.65 }}>
            Questions about {context}?
          </p>
          <button className="ac-trigger-btn" onClick={() => setOpen(true)}>
            Ask a question →
          </button>
        </div>
      ) : (
        <div style={{
          background: 'var(--s1)',
          border: '1px solid var(--b0)',
          borderRadius: 12,
          padding: '20px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 48,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>
              ◆ Ask Claude
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 300 }}>
              Questions about {context}?
            </p>
          </div>
          <button className="ac-trigger-btn" onClick={() => setOpen(true)}>
            Ask a question →
          </button>
        </div>
      )}

      {open && mounted && createPortal(modal, document.body)}

      <style>{`
        .ac-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center; padding: 20px;
          background: rgba(13,31,20,0.45); backdrop-filter: blur(4px);
          animation: ac-fade-in 180ms ease forwards;
        }
        .ac-panel {
          background: var(--bg); border: 1px solid var(--b1); border-radius: 16px;
          width: 100%; max-width: 560px;
          height: 560px; max-height: 85vh;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 24px 64px rgba(13,31,20,0.18);
          animation: ac-enter 280ms cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .ac-trigger-btn {
          background: var(--accent); color: #fff; border: none; border-radius: 8px;
          padding: 9px 18px; font-size: 13px; font-weight: 600; font-family: var(--font-sans);
          cursor: pointer; white-space: nowrap; transition: background 0.15s;
        }
        .ac-trigger-btn:hover { background: #1f6b40; }
        .ac-close-btn {
          background: none; border: none; cursor: pointer; color: var(--text-muted);
          font-size: 20px; line-height: 1; padding: 4px 8px; border-radius: 4px;
          transition: background 0.1s;
        }
        .ac-close-btn:hover { background: var(--s1); }
        .ac-chip-btn {
          background: var(--s1); border: 1px solid var(--b0); border-radius: 20px;
          padding: 5px 11px; font-size: 11px; color: var(--text-muted);
          white-space: nowrap; cursor: pointer; font-family: var(--font-sans); line-height: 1.4;
          flex-shrink: 0; transition: border-color 0.12s, background 0.12s, color 0.12s;
          animation: ac-chip-in 200ms ease both;
        }
        .ac-chip-btn:hover { border-color: var(--accent-mid); background: var(--s2); color: var(--text); }
        .ac-input {
          flex: 1; background: var(--s1); border: 1px solid var(--b0); border-radius: 8px;
          padding: 9px 12px; font-size: 13px; color: var(--text); font-family: var(--font-sans);
          outline: none; transition: border-color 0.15s;
        }
        .ac-input:focus { border-color: var(--accent-mid); }
        .ac-input:disabled { opacity: 0.5; }
        .ac-submit-btn {
          background: var(--s2); color: var(--text-muted); border: none; border-radius: 8px;
          padding: 9px 14px; font-size: 15px; font-weight: 600; cursor: default;
          transition: background 0.15s, color 0.15s; font-family: var(--font-sans);
        }
        .ac-submit-btn[data-active] { background: var(--accent); color: #fff; cursor: pointer; }
        .ac-submit-btn[data-active]:hover { background: #1f6b40; }
        .ac-cursor {
          display: inline-block; width: 2px; height: 13px; background: var(--accent);
          border-radius: 1px; margin-left: 3px; vertical-align: text-bottom;
          animation: ac-blink 800ms step-end infinite;
        }
        @keyframes ac-fade-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ac-enter {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes ac-chip-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes ac-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        /* hide horizontal scrollbar on suggestions strip */
        .ac-panel > div:nth-last-child(2)::-webkit-scrollbar { display: none; }
        .ac-panel > div:nth-last-child(2) { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </>
  )
}
