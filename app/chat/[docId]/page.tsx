'use client';

import { useChat } from 'ai/react';
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center py-4 px-6 border-b">
        <h1 className="text-2xl font-bold text-foreground">ConvoCraft</h1>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>

      <div className="flex flex-col w-full max-w-md py-8 mx-auto stretch">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}