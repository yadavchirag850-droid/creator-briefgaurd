"use client"

import { Check, Copy, Mail } from "lucide-react"
import { buildClarificationEmail } from "@/lib/briefguard-data"
import { useCopy } from "@/hooks/use-copy"
import { Button } from "@/components/ui/button"
import { Panel, PanelHeader } from "../primitives"

export function ClarificationEmail() {
  const { copied, copy } = useCopy()
  const body = buildClarificationEmail()
  const words = body.split(/\s+/).length

  return (
    <Panel aria-labelledby="email-title">
      <PanelHeader
        id="email-title"
        icon={Mail}
        title="Polite clarification email"
        description="Warm, professional and ready to send. Edit freely before pasting."
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => copy(body, "Clarification draft copied")}
            className="shrink-0"
          >
            {copied ? <Check className="text-success" aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        }
      />
      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-lg border border-border bg-muted/40">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5">
            <div className="flex min-w-0 items-center gap-2 text-xs">
              <span className="text-muted-foreground">Subject</span>
              <span className="truncate font-medium">Re: Q4 Radiance Serum brief — a few quick questions</span>
            </div>
            <span className="hidden shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums sm:inline">
              {words} words
            </span>
          </div>
          <div className="relative">
            <pre className="max-h-[420px] overflow-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-foreground/90">
              {body}
            </pre>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Copy email to clipboard"
              onClick={() => copy(body, "Clarification draft copied")}
              className="absolute top-3 right-3 bg-card shadow-xs"
            >
              {copied ? <Check className="text-success" /> : <Copy />}
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  )
}
