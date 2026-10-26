"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, FileText, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { formatDate, recentDocuments, type RecentDocument, type RiskLevel } from "@/lib/briefguard-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Panel, PlatformMark, RiskBadge } from "../primitives"

const filters: { value: RiskLevel | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "high", label: "High risk" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]

export function DocumentsLibrary() {
  const [docs, setDocs] = useState<RecentDocument[]>(recentDocuments)
  const [query, setQuery] = useState("")
  const [risk, setRisk] = useState<RiskLevel | "all">("all")

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return docs.filter(
      (d) =>
        (risk === "all" || d.risk === risk) &&
        (!q || d.brand.toLowerCase().includes(q) || d.fileName.toLowerCase().includes(q)),
    )
  }, [docs, query, risk])

  const remove = (doc: RecentDocument) => {
    const index = docs.findIndex((d) => d.id === doc.id)
    setDocs((prev) => prev.filter((d) => d.id !== doc.id))
    toast(`Deleted “${doc.brand}” analysis`, {
      action: {
        label: "Undo",
        onClick: () =>
          setDocs((prev) => {
            const next = [...prev]
            next.splice(index, 0, doc)
            return next
          }),
      },
    })
  }

  return (
    <Panel aria-label="All documents">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand or file name"
            aria-label="Search documents"
            className="pl-8"
          />
        </div>
        <div role="group" aria-label="Filter by risk" className="flex flex-wrap gap-1">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={risk === f.value}
              onClick={() => setRisk(f.value)}
              className={cn(
                "h-7 rounded-md border px-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                risk === f.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-1 px-6 py-16 text-center">
          <p className="text-sm font-medium">No documents match</p>
          <p className="text-xs text-muted-foreground">Try a different search or filter.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {visible.map((doc) => (
            <li key={doc.id} className="group relative flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/40">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60">
                <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <Link
                  href="/results"
                  className="text-sm font-medium tracking-tight outline-none after:absolute after:inset-0 focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
                >
                  {doc.brand}
                </Link>
                <p className="truncate font-mono text-[11px] text-muted-foreground">{doc.fileName}</p>
              </div>
              <div className="hidden items-center gap-1 md:flex">
                {doc.platforms.map((p) => (
                  <PlatformMark key={p} platform={p} />
                ))}
              </div>
              <span className="hidden w-16 text-right text-xs text-muted-foreground tabular-nums sm:block">
                {doc.flags} {doc.flags === 1 ? "flag" : "flags"}
              </span>
              <RiskBadge level={doc.risk} />
              <time dateTime={doc.extractedAt} className="hidden w-24 text-right text-xs text-muted-foreground tabular-nums lg:block">
                {formatDate(doc.extractedAt)}
              </time>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${doc.brand} analysis`}
                onClick={() => remove(doc)}
                className="relative z-10 text-muted-foreground hover:bg-danger-soft hover:text-danger"
              >
                <Trash2 />
              </Button>
              <ArrowUpRight className="hidden size-3.5 text-muted-foreground group-hover:text-foreground sm:block" aria-hidden="true" />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
