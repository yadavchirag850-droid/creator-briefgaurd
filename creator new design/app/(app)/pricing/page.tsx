import type { Metadata } from "next"
import { Check, Minus } from "lucide-react"
import { PageHeader } from "@/components/briefguard/page-header"
import { PricingPlans } from "@/components/briefguard/pricing/pricing-plans"

export const metadata: Metadata = {
  title: "Plan & billing — Creator BriefGuard",
}

const comparison: { feature: string; free: string | boolean; pro: string | boolean }[] = [
  { feature: "Brief reviews per month", free: "3", pro: "30" },
  { feature: "Max file size", free: "10 MB", pro: "10 MB" },
  { feature: "Risk & contradiction detection", free: true, pro: true },
  { feature: "Clarification email drafts", free: true, pro: true },
  { feature: "Document history", free: "7 days", pro: "Unlimited" },
  { feature: "Custom tone & signature", free: false, pro: true },
  { feature: "PDF & Notion export", free: false, pro: true },
  { feature: "Priority processing", free: false, pro: true },
]

function Cell({ value, pro }: { value: string | boolean; pro?: boolean }) {
  if (typeof value === "string")
    return <span className={pro ? "font-medium text-foreground tabular-nums" : "tabular-nums"}>{value}</span>
  return value ? (
    <>
      <Check className={pro ? "size-4 text-brand" : "size-4 text-foreground/70"} aria-hidden="true" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus className="size-4 text-muted-foreground/60" aria-hidden="true" />
      <span className="sr-only">Not included</span>
    </>
  )
}

export default function PricingPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <PageHeader
        eyebrow="Plan & billing"
        title="Review every brief with confidence"
        description="Start free. Upgrade when brand deals pick up — Creator Pro raises your monthly ceiling from 3 to 30 reviews the moment you subscribe."
      />

      <PricingPlans />

      <section aria-labelledby="compare-title">
        <h2 id="compare-title" className="mb-3 text-sm font-medium tracking-tight">
          Compare plans
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th scope="col" className="px-5 py-3 font-medium">Feature</th>
                <th scope="col" className="w-32 px-5 py-3 font-medium">Free</th>
                <th scope="col" className="w-32 px-5 py-3 font-medium text-foreground">Creator Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparison.map((row) => (
                <tr key={row.feature} className="transition-colors hover:bg-muted/40">
                  <th scope="row" className="px-5 py-3 text-left font-normal">{row.feature}</th>
                  <td className="px-5 py-3 text-muted-foreground">
                    <Cell value={row.free} />
                  </td>
                  <td className="px-5 py-3">
                    <Cell value={row.pro} pro />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
