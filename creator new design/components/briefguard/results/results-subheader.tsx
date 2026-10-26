"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronLeft, ClipboardList, Clock, Mail, ThumbsDown, ThumbsUp } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { analysis, buildChecklistText, buildClarificationEmail, formatDateTime } from "@/lib/briefguard-data"
import { useCopy } from "@/hooks/use-copy"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type Vote = "up" | "down" | null

export function ResultsSubheader() {
  const checklist = useCopy()
  const email = useCopy()
  const [vote, setVote] = useState<Vote>(null)

  const castVote = (next: Exclude<Vote, null>) => {
    const value = vote === next ? null : next
    setVote(value)
    if (value) toast("Thanks — your feedback improves future reviews.")
  }

  return (
    <div className="sticky top-14 z-20 border-b border-border bg-background/85 backdrop-blur-md lg:top-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            aria-label="Back to overview"
            className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ChevronLeft className="size-4" />
          </Link>
          <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card py-1.5 pr-3 pl-1.5 shadow-xs">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-[11px] font-semibold text-background">
              LS
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-sm leading-tight font-semibold tracking-tight">{analysis.brand}</h1>
              <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                <Clock className="size-3 shrink-0" aria-hidden="true" />
                <span className="truncate">
                  Analysed <time dateTime={analysis.processedAt}>{formatDateTime(analysis.processedAt)}</time>
                  <span className="hidden sm:inline"> · {analysis.processingSeconds}s</span>
                </span>
              </p>
            </div>
          </div>
          <div className="hidden flex-col items-start border-l border-border pl-3 xl:flex">
            <span className="text-[11px] text-muted-foreground">Risk score</span>
            <span className="text-sm font-semibold text-brand tabular-nums">
              {analysis.riskScore}
              <span className="font-normal text-muted-foreground">/100</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Rate this analysis"
            className="flex h-8 items-center rounded-lg border border-border bg-card p-0.5"
          >
            <FeedbackButton label="Helpful analysis" active={vote === "up"} onClick={() => castVote("up")}>
              <ThumbsUp />
            </FeedbackButton>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <FeedbackButton label="Not helpful" active={vote === "down"} onClick={() => castVote("down")}>
              <ThumbsDown />
            </FeedbackButton>
          </div>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Copy clarification draft"
                  onClick={() => email.copy(buildClarificationEmail(), "Clarification draft copied")}
                />
              }
            >
              {email.copied ? <Check className="text-success" /> : <Mail />}
            </TooltipTrigger>
            <TooltipContent>Copy clarification draft</TooltipContent>
          </Tooltip>

          <Button
            onClick={() => checklist.copy(buildChecklistText(), "Checklist copied")}
            className="flex-1 md:flex-none"
          >
            {checklist.copied ? <Check aria-hidden="true" /> : <ClipboardList aria-hidden="true" />}
            {checklist.copied ? "Copied" : "Copy checklist"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeedbackButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-all outline-none [&_svg]:size-3.5",
        "hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95",
        active && "bg-brand-soft text-brand hover:bg-brand-soft hover:text-brand [&_svg]:fill-current/20",
      )}
    >
      {children}
    </button>
  )
}
