/* eslint-disable @next/next/no-img-element */
'use client'

// import { User } from 'lucide-react'
// import Button from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src="/ConvoCraft.png?height=32&width=32" alt="Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-semibold">ConvoCraft</h1>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  )
}

