import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { messages, context } = await req.json()

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'OPENROUTER_API_KEY not set' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://cn-finance.vercel.app',
      'X-Title': 'CN Finance',
    },
    body: JSON.stringify({
      model: 'mistralai/ministral-3b-2512',
      stream: true,
      messages: [
        {
          role: 'system',
          content: `You are Claude, a financial AI assistant on CN Finance. You help users understand the "${context}" skill for financial services workflows. Be concise, expert, and practical. Match the language of the user's question.

Formatting rules (strictly follow):
- Use markdown tables (pipe syntax) when comparing 2–4 items across shared dimensions. Keep headers ≤3 words. Max 4 columns. Keep cell text short—one phrase, no nested markdown inside cells.
- Use bullet lists for enumerable points, numbered lists for steps.
- Use **bold** only for key terms. Use \`code\` for commands or file names.
- No horizontal rules. No excessive headers. Aim for ≤250 words per response.`,
        },
        ...messages,
      ],
    }),
  })

  if (!upstream.ok) {
    return new Response(await upstream.text(), { status: upstream.status })
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  })
}
