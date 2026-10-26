"use client"

import { useState } from "react"
import { ArrowRight, Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { usage } from "@/lib/briefguard-data"
import { Button } from "@/components/ui/button"
import { PaddleCheckoutDialog } from "./paddle-checkout-dialog"

const freeFeatures = [
  { label: "3 brief reviews per month", included: true },
  { label: "Risk & contradiction detection", included: true },
  { label: "Actionable checklist", included: true },
  { label: "Clarification email drafts", included: true },
  { label: "Document history (7 days)", included: true },
  { label: "Custom email tone & signature", included: false },
  { label: "Priority processing", included: false },
]

const proFeatures = [
  "30 brief reviews per month",
  "Everything in Free",
  "Unlimited document history",
  "Custom email tone & signature",
  "Priority processing (under 8s)",
  "Export to PDF & Notion",
  "Email support within 24h",
]

export function PricingPlans() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <article className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.03)] sm:p-7">
          <header>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Free</h2>
              <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                Current plan
              </span>
            </div>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight tabular-nums">$0</span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">For creators reviewing the occasional brand deal.</p>
          </header>

          <div className="mt-6 rounded-lg border border-border bg-background p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Usage this month</span>
              <span className="font-mono tabular-nums">
                {usage.used} / {usage.limit}
              </span>
            </div>
            <div className="mt-2 flex gap-1" aria-hidden="true">
              {Array.from({ length: usage.limit }).map((_, i) => (
                <span key={i} className={cn("h-1 flex-1 rounded-full", i < usage.used ? "bg-foreground/70" : "bg-muted")} />
              ))}
            </div>
          </div>

          <ul className="mt-6 flex flex-1 flex-col gap-2.5">
            {freeFeatures.map((f) => (
              <li key={f.label} className={cn("flex items-center gap-2.5 text-sm", !f.included && "text-muted-foreground/70")}>
                {f.included ? (
                  <Check className="size-4 shrink-0 text-foreground/70" aria-hidden="true" />
                ) : (
                  <Minus className="size-4 shrink-0" aria-hidden="true" />
                )}
                <span>
                  {f.label}
                  {!f.included ? <span className="sr-only"> (not included)</span> : null}
                </span>
              </li>
            ))}
          </ul>

          <Button variant="outline" disabled className="mt-8 h-10 w-full">
            You&apos;re on Free
          </Button>
        </article>

        <article className="relative flex flex-col rounded-xl border border-foreground/15 bg-card p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.04),0_12px_32px_-12px_rgb(0_0_0/0.12)] ring-1 ring-foreground/5 sm:p-7 dark:border-foreground/20">
          <header>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Creator Pro</h2>
              <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-medium text-brand-foreground">
                Recommended
              </span>
            </div>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight tabular-nums">$9</span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">For working creators negotiating deals every week.</p>
          </header>

          <div className="mt-6 flex items-center gap-4 rounded-lg border border-brand/25 bg-brand-soft p-3.5">
            <div className="flex items-baseline gap-2 font-mono tabular-nums">
              <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/60">
                {usage.limit}
              </span>
              <ArrowRight className="size-3.5 self-center text-brand" aria-hidden="true" />
              <span className="text-2xl font-semibold text-brand">30</span>
            </div>
            <div className="border-l border-brand/20 pl-4">
              <p className="text-xs font-medium text-foreground">10× review ceiling, instantly</p>
              <p className="text-[11px] text-muted-foreground">Unlocks the moment checkout completes</p>
            </div>
          </div>

          <ul className="mt-6 flex flex-1 flex-col gap-2.5">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <Check className="size-4 shrink-0 text-brand" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <Button
            onClick={() => setOpen(true)}
            className="group mt-8 h-10 w-full bg-brand text-brand-foreground shadow-xs hover:bg-brand/90 active:bg-brand"
          >
            Upgrade to Creator Pro
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">Cancel anytime · Prices in USD, VAT calculated at checkout</p>
        </article>
      </div>

      <PaddleCheckoutDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
