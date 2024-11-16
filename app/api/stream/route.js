// export async function POST(req) {
//   const { prompt } = await req.json();

// import { NextResponse } from "next/server";

//   // Call OpenAI API with a system message
//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: 'gpt-4',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a helpful assistant. Respond concisely and clearly.',
//         },
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       stream: true, // Enable streaming
//     }),
//   });

//   // Pipe the stream directly to the frontend
//   return new Response(response.body, {
//     headers: { 'Content-Type': 'text/event-stream' },
//   });
// }

// app/api/streaming-response/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const stream = new ReadableStream({
    async start(controller) {
      const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
      const requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 2000,
          system: "You are DocXter! A helpful AI Document assistant.",
          messages: [
            {
              role: "user",
              content: `Introduce yourself in 1000 words`,
            },
          ],
          stream: true, // Enable streaming
        }),
      };

      const response = await fetch(ANTHROPIC_API_URL, requestOptions);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        controller.enqueue(decoder.decode(value));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
