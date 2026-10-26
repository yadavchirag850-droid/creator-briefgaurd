"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronsUpDown,
  CreditCard,
  FileSearch,
  FolderOpen,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usage } from "@/lib/briefguard-data"
import { BrandMark } from "./primitives"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navGroups = [
  {
    label: "Workspace",
    items: [
      { href: "/", label: "Overview", icon: LayoutGrid },
      { href: "/results", label: "Latest analysis", icon: FileSearch, badge: "New" },
      { href: "/documents", label: "Documents", icon: FolderOpen },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/pricing", label: "Plan & billing", icon: CreditCard },
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/help", label: "Help centre", icon: LifeBuoy },
    ],
  },
]

export function SidebarContents({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const remaining = usage.limit - usage.used

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" onClick={onNavigate} className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <BrandMark />
        </Link>
        <ThemeToggle />
      </div>

      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-2 pb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/80 uppercase">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = item.href === pathname
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] text-muted-foreground transition-colors outline-none",
                        "hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                        active && "bg-sidebar-accent font-medium text-foreground shadow-[inset_0_0_0_1px_var(--border)]",
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")} aria-hidden="true" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge ? (
                        <span className="rounded-sm border border-border bg-background px-1.5 py-px text-[10px] font-medium text-muted-foreground">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-3 p-3">
        <div className="rounded-lg border border-border bg-background p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-foreground">Free plan</p>
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {usage.used}/{usage.limit}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Remaining Free Reviews:{" "}
            <span className="font-medium text-foreground tabular-nums">
              {remaining} of {usage.limit}
            </span>{" "}
            this month
          </p>
          <div
            className="mt-3 flex gap-1"
            role="meter"
            aria-label="Free reviews used"
            aria-valuemin={0}
            aria-valuemax={usage.limit}
            aria-valuenow={usage.used}
          >
            {Array.from({ length: usage.limit }).map((_, i) => (
              <span
                key={i}
                className={cn("h-1 flex-1 rounded-full", i < usage.used ? "bg-brand" : "bg-muted")}
              />
            ))}
          </div>
          <Link
            href="/pricing"
            onClick={onNavigate}
            className="mt-3 flex h-7 w-full items-center justify-center gap-1.5 rounded-md border border-border bg-card text-xs font-medium text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Sparkles className="size-3.5 text-brand" aria-hidden="true" />
            Upgrade to Pro
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors outline-none hover:bg-sidebar-accent focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-sidebar-accent"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-medium text-foreground">
              MR
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-foreground">Maya Rhodes</span>
              <span className="block truncate text-[11px] text-muted-foreground">maya@rhodes.studio</span>
            </span>
            <ChevronsUpDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Signed in as Maya</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/settings" onClick={onNavigate} />}>
              <Settings aria-hidden="true" /> Account settings
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/pricing" onClick={onNavigate} />}>
              <CreditCard aria-hidden="true" /> Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut aria-hidden="true" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
