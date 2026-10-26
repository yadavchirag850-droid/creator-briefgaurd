import { cn } from "@/lib/utils"

const stats = [
  { label: "Briefs analysed", value: "14", delta: "+3 this month" },
  { label: "Risks caught", value: "37", delta: "2.6 per brief", premium: true },
  { label: "Avg. review time", value: "11.4s", delta: "vs. ~45 min manual" },
  { label: "Est. fees protected", value: "£18.2k", delta: "Across 9 deals", premium: true },
]

export function InsightStats() {
  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_0_rgb(0_0_0/0.03)] lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col gap-1 p-4 sm:p-5",
            i % 2 === 1 && "border-l border-border",
            i >= 2 && "border-t border-border lg:border-t-0",
            i === 2 && "lg:border-l",
          )}
        >
          <dt className="text-xs text-muted-foreground">{stat.label}</dt>
          <dd className={cn("text-2xl font-semibold tracking-tight tabular-nums", stat.premium && "text-brand")}>
            {stat.value}
          </dd>
          <dd className="text-[11px] text-muted-foreground">{stat.delta}</dd>
        </div>
      ))}
    </dl>
  )
}
