// import { openai } from '@ai-sdk/openai';
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("Messages: ",messages);
  
  try {
    const result = await streamText({
      model: groq('gemma2-9b-it'),
      messages,
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(
      JSON.stringify({ 
        error: `Failed to connect to OpenAI API. Please try again later.  ${error}`
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}