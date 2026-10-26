import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { platformMeta, type Platform, type RiskLevel } from "@/lib/briefguard-data"

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-7 items-center justify-center rounded-md bg-foreground text-background shadow-xs">
        <ShieldCheck className="size-4" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold tracking-tight">
        Creator <span className="text-muted-foreground">BriefGuard</span>
      </span>
    </div>
  )
}

export function Panel({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-[0_1px_2px_0_rgb(0_0_0/0.03)]", className)}
      {...props}
    >
      {children}
    </section>
  )
}

export function PanelHeader({
  icon: Icon,
  title,
  description,
  action,
  className,
  id,
}: {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <header className={cn("flex items-start justify-between gap-4 border-b border-border px-5 py-4", className)}>
      <div className="flex min-w-0 items-start gap-3">
        {Icon ? (
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60 text-muted-foreground">
            <Icon className="size-3.5" />
          </span>
        ) : null}
        <div className="min-w-0">
          <h2 id={id} className="text-sm font-medium tracking-tight text-foreground">
            {title}
          </h2>
          {description ? <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground text-pretty">{description}</p> : null}
        </div>
      </div>
      {action}
    </header>
  )
}

export function PlatformMark({ platform, size = "sm" }: { platform: Platform; size?: "sm" | "md" }) {
  const meta = platformMeta[platform]
  return (
    <span
      title={meta.label}
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border bg-background font-mono font-medium text-muted-foreground",
        size === "sm" ? "h-6 min-w-6 px-1 text-[10px]" : "h-7 gap-1.5 px-2 text-[11px]",
      )}
    >
      <span className="sr-only">{meta.label}</span>
      <span aria-hidden="true">{meta.short}</span>
      {size === "md" ? (
        <span aria-hidden="true" className="font-sans text-xs text-foreground">
          {meta.label}
        </span>
      ) : null}
    </span>
  )
}

const riskStyles: Record<RiskLevel, { label: string; className: string; dot: string }> = {
  high: {
    label: "High risk",
    className: "border-danger-border bg-danger-soft text-danger",
    dot: "bg-danger",
  },
  medium: {
    label: "Medium risk",
    className: "border-warning-border bg-warning-soft text-warning",
    dot: "bg-warning",
  },
  low: {
    label: "Low risk",
    className: "border-border bg-muted/60 text-muted-foreground",
    dot: "bg-success",
  },
}

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const style = riskStyles[level]
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium whitespace-nowrap",
        style.className,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden="true" />
      {style.label}
    </span>
  )
}
