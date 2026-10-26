"use client"

import { useState } from "react"
import { CircleDashed, ListChecks, TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { analysis } from "@/lib/briefguard-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Panel, PanelHeader } from "../primitives"

export function MissingParameters() {
  return (
    <Panel aria-labelledby="missing-title" className="overflow-hidden border-warning-border">
      <header className="flex items-start gap-3 border-b border-warning-border bg-warning-soft px-5 py-4">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-warning-border bg-card text-warning">
          <TriangleAlert className="size-3.5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="missing-title" className="text-sm font-medium tracking-tight">
            Missing parameters
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {analysis.missing.length} vital terms the brand omitted
          </p>
        </div>
      </header>
      <ul className="flex flex-col divide-y divide-border">
        {analysis.missing.map((m) => (
          <li key={m.label} className="flex gap-3 px-5 py-3">
            <CircleDashed className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-medium">{m.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{m.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function ActionChecklist() {
  const [done, setDone] = useState<Set<string>>(new Set(["c6"]))
  const total = analysis.checklist.length
  const progress = Math.round((done.size / total) * 100)

  const toggle = (id: string, checked: boolean) =>
    setDone((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })

  return (
    <Panel aria-labelledby="checklist-title">
      <PanelHeader
        id="checklist-title"
        icon={ListChecks}
        title="Actionable checklist"
        description="Confirm before you sign"
        action={
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            <span className="text-brand">{done.size}</span>/{total}
          </span>
        }
      />
      <div className="px-5 pt-4">
        <div
          className="h-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Checklist progress"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-brand transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <ul className="flex flex-col gap-1 p-3">
        {analysis.checklist.map((item) => {
          const checked = done.has(item.id)
          const id = `check-${item.id}`
          return (
            <li key={item.id}>
              <label
                htmlFor={id}
                className={cn(
                  "group flex cursor-pointer gap-3 rounded-md border border-transparent px-2.5 py-2.5 transition-colors",
                  "hover:border-border hover:bg-muted/50 has-[:focus-visible]:border-border has-[:focus-visible]:bg-muted/50",
                )}
              >
                <Checkbox
                  id={id}
                  checked={checked}
                  onCheckedChange={(value) => toggle(item.id, value)}
                  className="mt-0.5 data-checked:border-brand data-checked:bg-brand data-checked:text-brand-foreground dark:data-checked:bg-brand"
                />
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[13px] font-medium transition-colors",
                      checked && "text-muted-foreground line-through decoration-muted-foreground/50",
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{item.detail}</span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
