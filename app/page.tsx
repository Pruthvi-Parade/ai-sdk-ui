'use client';
import { useChat } from 'ai/react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "@/app/firebase/config";
import { useRouter } from 'next/navigation';
// import { FileUploader } from "@/components/FileUploader"
// import Button from "@/components/ui/Button";
// import Link from "next/link"

export default function Chat() {
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log("User: ",user);
      const uid = user.uid;
      console.log("UID: ",uid);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("User not found");
      router.push("/login")
    }
  });

  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    // <main className="min-h-screen bg-background p-8">
    //   <div className="mx-auto max-w-4xl space-y-8">
    //     <h1 className="text-4xl font-bold text-foreground">Welcome to ConvoCraft</h1>
    //     <div className="grid gap-6">
    //       <FileUploader />
    //       <div className="flex gap-4">
    //         <Button asChild>
    //           <Link href="/chat">Start Chatting</Link>
    //         </Button>
    //         <Button variant="outline" asChild>
    //           <Link href="/login">Login</Link>
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </main>
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
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
  );
}