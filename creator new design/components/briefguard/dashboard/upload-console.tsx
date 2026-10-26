"use client"

import { useId, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, FileText, Loader2, Lock, UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Panel } from "../primitives"

const MAX_BYTES = 10 * 1024 * 1024
const ACCEPTED = [".pdf", ".txt", ".md", ".docx"]

type Mode = "file" | "text"

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadConsole() {
  const router = useRouter()
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const dragDepth = useRef(0)
  const [mode, setMode] = useState<Mode>("file")
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [analysing, setAnalysing] = useState(false)

  const acceptFile = (candidate: File | undefined) => {
    if (!candidate) return
    const ext = `.${candidate.name.split(".").pop()?.toLowerCase()}`
    if (!ACCEPTED.includes(ext)) {
      setError("Unsupported format. Upload a PDF, DOCX, TXT or MD file.")
      return
    }
    if (candidate.size > MAX_BYTES) {
      setError(`File is ${formatBytes(candidate.size)}. The maximum size is 10 MB.`)
      return
    }
    setError(null)
    setFile(candidate)
  }

  const canAnalyse = mode === "file" ? Boolean(file) : text.trim().length > 40

  const analyse = () => {
    if (!canAnalyse || analysing) return
    setAnalysing(true)
    setTimeout(() => router.push("/results"), 1400)
  }

  return (
    <Panel aria-labelledby="upload-title" className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="upload-title" className="text-sm font-medium tracking-tight">
            Analyse a new brief
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            We extract parameters, flag risks and draft your clarification email.
          </p>
        </div>
        <div role="tablist" aria-label="Input method" className="inline-flex h-8 shrink-0 items-center rounded-lg border border-border bg-muted/60 p-0.5">
          {(["file", "text"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              type="button"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "h-full rounded-md px-3 text-xs font-medium text-muted-foreground transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                mode === m ? "bg-card text-foreground shadow-xs ring-1 ring-border" : "hover:text-foreground",
              )}
            >
              {m === "file" ? "Upload file" : "Paste text"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5">
        {mode === "file" ? (
          file ? (
            <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60">
                <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground tabular-nums">{formatBytes(file.size)} · Ready to analyse</p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Remove file"
                disabled={analysing}
                onClick={() => setFile(null)}
                className="text-muted-foreground"
              >
                <X />
              </Button>
            </div>
          ) : (
            <label
              htmlFor={inputId}
              onDragEnter={(e) => {
                e.preventDefault()
                dragDepth.current += 1
                setDragging(true)
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={() => {
                dragDepth.current -= 1
                if (dragDepth.current <= 0) setDragging(false)
              }}
              onDrop={(e) => {
                e.preventDefault()
                dragDepth.current = 0
                setDragging(false)
                acceptFile(e.dataTransfer.files?.[0])
              }}
              data-dragging={dragging || undefined}
              className={cn(
                "group relative flex min-h-60 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-input bg-background px-6 py-10 text-center transition-all duration-200",
                "hover:border-muted-foreground/40 hover:bg-muted/30",
                "has-[input:focus-visible]:border-brand has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-ring/40",
                "data-dragging:border-brand data-dragging:bg-brand-soft data-dragging:ring-3 data-dragging:ring-ring/30",
              )}
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-lg border border-border bg-card shadow-xs transition-transform duration-200",
                  "group-hover:-translate-y-0.5 group-data-dragging:-translate-y-1 group-data-dragging:border-brand/40",
                )}
              >
                <UploadCloud
                  className="size-5 text-muted-foreground transition-colors group-data-dragging:text-brand"
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="text-sm font-medium">
                  {dragging ? "Release to upload brief" : (
                    <>
                      Drop your brand brief here, or <span className="text-brand underline-offset-4 group-hover:underline">browse</span>
                    </>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, TXT or MD · up to 10 MB</p>
              </div>
              <input
                id={inputId}
                ref={inputRef}
                type="file"
                accept={ACCEPTED.join(",")}
                className="sr-only"
                onChange={(e) => {
                  acceptFile(e.target.files?.[0])
                  e.target.value = ""
                }}
              />
            </label>
          )
        ) : (
          <div className="rounded-lg border border-input bg-background transition-shadow focus-within:border-brand focus-within:ring-3 focus-within:ring-ring/40">
            <label htmlFor={`${inputId}-text`} className="sr-only">
              Brief text
            </label>
            <textarea
              id={`${inputId}-text`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the full campaign brief, including deliverables, timeline and terms…"
              className="block min-h-60 w-full resize-y rounded-lg bg-transparent px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground/70"
            />
            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
              <span>Minimum 40 characters</span>
              <span className="font-mono tabular-nums">{text.length.toLocaleString()} chars</span>
            </div>
          </div>
        )}

        {error ? (
          <p role="alert" className="mt-3 text-xs text-danger">
            {error}
          </p>
        ) : null}

        <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="size-3" aria-hidden="true" />
            Encrypted in transit. Briefs are never used to train models.
          </p>
          <Button
            onClick={analyse}
            disabled={!canAnalyse || analysing}
            className="h-9 bg-brand px-4 text-brand-foreground hover:bg-brand/90"
          >
            {analysing ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Analysing brief…
              </>
            ) : (
              <>
                Analyse brief
                <ArrowRight aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Panel>
  )
}
