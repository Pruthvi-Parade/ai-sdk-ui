import React from "react";
import Link from "next/link";
interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex sm:h-[100vh] overflow-hidden bg-[#F1F2F6] flex-row sm:p-[6px] gap-2 ">
        Hello 
      <div className="w-[100%] overflow-auto">{children}</div>
    </div>
  );
}
