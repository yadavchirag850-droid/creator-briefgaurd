"use client"

import { Check, CreditCard, Lock, ShieldCheck } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { BrandMark } from "../primitives"

function WireField({ label, className, children }: { label: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      <div className="mt-1.5 flex h-9 items-center gap-2 rounded-md border border-dashed border-input bg-background px-3">
        {children ?? <span className="h-2 w-2/5 rounded-full bg-muted" />}
      </div>
    </div>
  )
}

export function PaddleCheckoutDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] gap-0 overflow-y-auto p-0 sm:max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr]">
          <aside className="flex flex-col gap-6 border-b border-border bg-muted/40 p-6 md:border-r md:border-b-0 sm:p-7">
            <BrandMark />
            <div>
              <DialogTitle className="text-base font-semibold tracking-tight">Subscribe to Creator Pro</DialogTitle>
              <DialogDescription className="mt-1 text-xs">
                Secure hosted checkout · Paddle is the Merchant of Record
              </DialogDescription>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight tabular-nums">$9.00</span>
              <span className="text-sm text-muted-foreground">per month</span>
            </div>

            <dl className="flex flex-col gap-2.5 border-t border-border pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Creator Pro · monthly</dt>
                <dd className="tabular-nums">$9.00</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax (calculated)</dt>
                <dd className="text-muted-foreground tabular-nums">—</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2.5 font-medium">
                <dt>Due today</dt>
                <dd className="tabular-nums">$9.00</dd>
              </div>
            </dl>

            <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
              {["30 reviews / month, unlocked instantly", "Cancel anytime from billing", "Receipts & VAT invoices by email"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-3.5 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>

          <div className="relative flex flex-col gap-5 p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-input px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                Paddle.js overlay frame
              </span>
              <Lock className="size-3.5 text-muted-foreground" aria-hidden="true" />
            </div>

            <WireField label="Email address">
              <span className="text-sm text-muted-foreground">maya@rhodes.studio</span>
            </WireField>

            <div className="grid grid-cols-3 gap-2" aria-hidden="true">
              {["Card", "PayPal", "Apple Pay"].map((m, i) => (
                <div
                  key={m}
                  className={
                    i === 0
                      ? "flex h-10 items-center justify-center gap-1.5 rounded-md border border-foreground/30 bg-background text-xs font-medium"
                      : "flex h-10 items-center justify-center rounded-md border border-dashed border-input text-xs text-muted-foreground"
                  }
                >
                  {i === 0 ? <CreditCard className="size-3.5" /> : null}
                  {m}
                </div>
              ))}
            </div>

            <WireField label="Card number">
              <span className="font-mono text-sm tracking-widest text-muted-foreground/70">•••• •••• •••• ••••</span>
            </WireField>
            <div className="grid grid-cols-2 gap-3">
              <WireField label="Expiry" />
              <WireField label="CVC" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <WireField label="Country">
                <span className="text-sm text-muted-foreground">United Kingdom</span>
              </WireField>
              <WireField label="Postcode" />
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-medium text-brand-foreground transition-colors outline-none hover:bg-brand/90 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
            >
              <Lock className="size-3.5" aria-hidden="true" />
              Pay $9.00 &amp; subscribe
            </button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Payments processed securely by <span className="font-medium text-foreground">Paddle</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
