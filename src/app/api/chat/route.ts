import {Message} from "ai"
import {ChatOpenAI} from "@langchain/openai"
import {AIMessage, HumanMessage} from "@langchain/core/messages"

export const runtime = "edge"

export async function POST(req: Request) {
  const {messages} = await req.json()

  const llm = new ChatOpenAI({
    streaming: true,
    modelName: "gpt-4-0125-preview",
    temperature: 0.7
  })

  const formattedMessages = messages.map((m: Message) =>
    m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
  )

  const stream = await llm.stream(formattedMessages)

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  })
}
