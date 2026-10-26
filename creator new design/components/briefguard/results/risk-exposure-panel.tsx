"use client"

import { useState } from "react"
import { GitCompareArrows, HelpCircle, Quote, ShieldAlert, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { analysis, type RiskFlag } from "@/lib/briefguard-data"
import { Panel, PanelHeader } from "../primitives"

type Filter = "all" | RiskFlag["type"]

export function RiskExposurePanel() {
  const [filter, setFilter] = useState<Filter>("all")
  const risks = analysis.risks.filter((r) => filter === "all" || r.type === filter)
  const counts = {
    all: analysis.risks.length,
    Ambiguity: analysis.risks.filter((r) => r.type === "Ambiguity").length,
    Contradiction: analysis.risks.filter((r) => r.type === "Contradiction").length,
  }

  return (
    <Panel aria-labelledby="risk-title" className="h-full">
      <PanelHeader
        id="risk-title"
        icon={ShieldAlert}
        title="High-risk exposure"
        description="Structural ambiguities and contradictions detected in the source document."
        className="flex-col sm:flex-row"
        action={
          <div role="tablist" aria-label="Filter risks" className="flex shrink-0 items-center gap-1">
            {(["all", "Contradiction", "Ambiguity"] as const).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  filter === f
                    ? "border-foreground/15 bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {f === "all" ? "All" : `${f === "Ambiguity" ? "Ambiguities" : "Contradictions"}`}
                <span className="font-mono text-[10px] opacity-70 tabular-nums">{counts[f]}</span>
              </button>
            ))}
          </div>
        }
      />
      <ol className="flex flex-col gap-3 p-4 sm:p-5">
        {risks.map((risk, i) => (
          <RiskItem key={risk.id} risk={risk} index={i + 1} />
        ))}
      </ol>
    </Panel>
  )
}

function RiskItem({ risk, index }: { risk: RiskFlag; index: number }) {
  const high = risk.severity === "high"
  const TypeIcon = risk.type === "Contradiction" ? GitCompareArrows : HelpCircle

  return (
    <li
      className={cn(
        "relative overflow-hidden rounded-lg border bg-background",
        high ? "border-danger-border" : "border-warning-border",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("absolute inset-y-0 left-0 w-0.5", high ? "bg-danger" : "bg-warning")}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3.5 pb-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="text-sm font-medium tracking-tight">{risk.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex h-5 items-center gap-1 rounded-sm border border-border bg-card px-1.5 text-[10px] font-medium text-muted-foreground">
            <TypeIcon className="size-3" aria-hidden="true" />
            {risk.type}
          </span>
          <span
            className={cn(
              "inline-flex h-5 items-center rounded-sm px-1.5 text-[10px] font-semibold tracking-wide uppercase",
              high ? "bg-danger-soft text-danger" : "bg-warning-soft text-warning",
            )}
          >
            {high ? "High" : "Medium"}
          </span>
        </div>
      </div>

      <div className="mx-3 mb-3 grid grid-cols-1 overflow-hidden rounded-md border border-border md:grid-cols-2">
        <figure className="bg-muted/50 p-3.5">
          <figcaption className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              <Quote className="size-3" aria-hidden="true" />
              Exact source excerpt
            </span>
            <span className="font-mono text-[10.5px] text-muted-foreground/80">{risk.sourceLocation}</span>
          </figcaption>
          <blockquote
            className={cn(
              "mt-2 border-l-2 pl-3 font-mono text-[12px] leading-relaxed text-foreground/85",
              high ? "border-danger/50" : "border-warning/50",
            )}
          >
            {risk.sourceText}
          </blockquote>
        </figure>
        <div className="border-t border-border bg-card p-3.5 md:border-t-0 md:border-l">
          <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            <Sparkles className="size-3 text-brand" aria-hidden="true" />
            AI structural explanation
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-foreground/90 text-pretty">{risk.explanation}</p>
        </div>
      </div>
    </li>
  )
}
