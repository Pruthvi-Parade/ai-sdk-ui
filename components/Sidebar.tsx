"use client";

import { useState } from "react";
import { PanelLeftClose, PanelRightClose, Home, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button"; // Corrected import statement to match casing

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-gray-100 transition-all duration-300 text-white",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b" style={{ background: "#171716" }}>
        {!collapsed && <h2 className="text-lg font-semibold">Menu</h2>}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <PanelRightClose className="h-6 w-6 text-white" />
          ) : (
            <PanelLeftClose className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto" style={{ background: "#171716" }}>
        <ul className="pt-4 pb-2 px-2 space-y-2">
          {[
            { icon: Home, label: "Dashboard" },
            { icon: Users, label: "Users" },
            { icon: Settings, label: "Settings" },
          ].map((item, index) => (
            <li key={index}>
              <Button className="w-full p-1.5">
                <div className="flex items-center justify-start w-full">
                  <item.icon className="h-6 w-6 text-white" />
                  {!collapsed && <span className="ml-4">{item.label}</span>}
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
