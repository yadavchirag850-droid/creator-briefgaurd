"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContents } from "./app-sidebar"
import { BrandMark } from "./primitives"
import { ThemeToggle } from "./theme-toggle"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarContents />
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-md lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open navigation"
            className="-ml-1.5 flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="left" showCloseButton={false} className="w-72 gap-0 bg-sidebar p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarContents onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <BrandMark />
        <ThemeToggle />
      </header>

      <div className="lg:pl-64">{children}</div>
    </div>
  )
}
