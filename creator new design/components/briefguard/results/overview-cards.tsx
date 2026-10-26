import { CalendarClock, FileText, Layers, Sparkles } from "lucide-react"
import { analysis, formatDate } from "@/lib/briefguard-data"
import { Panel, PanelHeader, PlatformMark } from "../primitives"

export function BriefEssence() {
  return (
    <Panel aria-labelledby="essence-title" className="flex flex-col">
      <PanelHeader
        id="essence-title"
        icon={Sparkles}
        title="Brief essence"
        description={analysis.campaign}
      />
      <div className="flex flex-1 flex-col justify-between gap-5 p-5">
        <p className="text-[15px] leading-relaxed text-foreground/90 text-pretty">{analysis.essence}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <FileText className="size-3.5" aria-hidden="true" />
            <span className="font-mono text-[11px]">{analysis.fileName}</span>
          </span>
          <span>8 pages · 2,140 words</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            Extraction confidence 96%
          </span>
        </div>
      </div>
    </Panel>
  )
}

export function CampaignParameters() {
  const { platforms, deliverables, deadline, deadlineNote, fee, usageRights } = analysis.parameters
  const total = deliverables.reduce((sum, d) => sum + d.count, 0)

  return (
    <Panel aria-labelledby="params-title" className="flex flex-col">
      <PanelHeader id="params-title" icon={Layers} title="Campaign parameters" />
      <dl className="flex flex-1 flex-col divide-y divide-border">
        <div className="px-5 py-3.5">
          <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">Platforms</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {platforms.map((p) => (
              <PlatformMark key={p} platform={p} size="md" />
            ))}
          </dd>
        </div>
        <div className="px-5 py-3.5">
          <dt className="flex items-center justify-between text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Deliverables
            <span className="font-mono text-brand normal-case tracking-normal tabular-nums">{total} assets</span>
          </dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {deliverables.map((d) => (
              <span
                key={d.label}
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-xs"
              >
                <span className="font-mono font-medium tabular-nums">{d.count}×</span>
                <span className="text-muted-foreground">{d.label}</span>
              </span>
            ))}
          </dd>
        </div>
        <div className="px-5 py-3.5">
          <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">Deadline</dt>
          <dd className="mt-2 flex items-center gap-3 rounded-md border border-danger-border bg-danger-soft px-3 py-2">
            <CalendarClock className="size-4 shrink-0 text-danger" aria-hidden="true" />
            <div>
              <time dateTime={deadline} className="block text-sm font-semibold text-danger tabular-nums">
                {formatDate(deadline)}
              </time>
              <span className="text-[11px] text-danger/80">{deadlineNote} · 20 days left</span>
            </div>
          </dd>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-5 py-3.5">
            <dt className="text-[11px] text-muted-foreground">Fee</dt>
            <dd className="mt-0.5 text-sm font-medium tabular-nums">{fee}</dd>
          </div>
          <div className="px-5 py-3.5">
            <dt className="text-[11px] text-muted-foreground">Usage rights</dt>
            <dd className="mt-0.5 text-sm font-medium text-warning">{usageRights}</dd>
          </div>
        </div>
      </dl>
    </Panel>
  )
}
