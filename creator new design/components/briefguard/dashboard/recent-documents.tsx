"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, FileText, Trash2, Undo2 } from "lucide-react"
import { toast } from "sonner"
import { recentDocuments, formatDate, type RecentDocument } from "@/lib/briefguard-data"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { PlatformMark, RiskBadge } from "../primitives"

export function RecentDocuments() {
  const [docs, setDocs] = useState<RecentDocument[]>(recentDocuments)

  const remove = (doc: RecentDocument) => {
    const index = docs.findIndex((d) => d.id === doc.id)
    setDocs((prev) => prev.filter((d) => d.id !== doc.id))
    toast(`Deleted “${doc.brand}” analysis`, {
      icon: <Trash2 className="size-4" />,
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
    <section id="recent-documents" aria-labelledby="recent-title" className="scroll-mt-20">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 id="recent-title" className="text-sm font-medium tracking-tight">
            Recent documents
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {docs.length} {docs.length === 1 ? "analysis" : "analyses"} stored in your workspace
          </p>
        </div>
      </div>

      {docs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-6 py-14 text-center">
          <Undo2 className="size-4 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm font-medium">No documents yet</p>
          <p className="text-xs text-muted-foreground">Upload your first brief above to start a review.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {docs.map((doc) => (
            <li key={doc.id}>
              <article className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-[0_1px_2px_0_rgb(0_0_0/0.03)] transition-all duration-200 hover:border-muted-foreground/30 hover:shadow-sm focus-within:border-muted-foreground/30">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60">
                    <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Delete ${doc.brand} analysis`}
                          onClick={() => remove(doc)}
                          className="relative z-10 text-muted-foreground opacity-100 hover:bg-danger-soft hover:text-danger focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                        />
                      }
                    >
                      <Trash2 />
                    </TooltipTrigger>
                    <TooltipContent>Delete analysis</TooltipContent>
                  </Tooltip>
                </div>

                <h3 className="mt-4 text-sm font-medium tracking-tight">
                  <Link
                    href="/results"
                    className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
                  >
                    {doc.brand}
                  </Link>
                </h3>
                <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{doc.fileName}</p>

                <div className="mt-4 flex items-center gap-1">
                  {doc.platforms.map((p) => (
                    <PlatformMark key={p} platform={p} />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
                  <RiskBadge level={doc.risk} />
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <time dateTime={doc.extractedAt} className="tabular-nums">
                      {formatDate(doc.extractedAt)}
                    </time>
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
