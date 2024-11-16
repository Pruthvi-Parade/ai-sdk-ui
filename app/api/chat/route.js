import { StreamingTextResponse, LangChainStream } from 'ai'
import { ChatAnthropic } from 'langchain/chat_models/anthropic'
import { AIMessage, HumanMessage } from 'langchain/schema'

export const runtime = 'edge'

export async function POST(req) {
  const { messages } = await req.json()
  const { stream, handlers } = LangChainStream()

  const llm = new ChatAnthropic({
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    streaming: true,
  })

  llm
    .call(
      messages.map((m) =>
        m.role === 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      ),
      {},
      [handlers]
    )
    .catch(console.error)

  return new StreamingTextResponse(stream)
}