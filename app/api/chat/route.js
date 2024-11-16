import { StreamingTextResponse } from 'ai'
import { Anthropic } from '@anthropic-ai/sdk'

export const runtime = 'edge'

export async function POST(req) {
  const { messages } = await req.json()

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const stream = await anthropic.messages.create({
    messages: messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    })),
    model: 'claude-3-opus-20240229',
    stream: true,
    max_tokens: 1024,
  })

  return new StreamingTextResponse(stream)
}