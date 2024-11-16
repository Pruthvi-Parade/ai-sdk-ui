'use server';

import { streamText } from 'ai';
import { createOpenAI, openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { anthropic, createAnthropic } from '@ai-sdk/anthropic';

export async function generate(input) {
  const stream = createStreamableValue('');

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: "strict",
  });

  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    compatibility: "strict",
  });
  
  (async () => {
    const { textStream } = await streamText({
      model: anthropic('claude-3-haiku-20240307'),
      prompt: input,
      async onFinish({text, toolCalls, toolResults, usage, finishReason})  {
        
      }
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}