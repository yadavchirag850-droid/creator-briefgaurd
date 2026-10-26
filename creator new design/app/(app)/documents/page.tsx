import type { Metadata } from "next"
import Link from "next/link"
import { Upload } from "lucide-react"
import { PageHeader } from "@/components/briefguard/page-header"
import { DocumentsLibrary } from "@/components/briefguard/documents/documents-library"

export const metadata: Metadata = { title: "Documents · BriefGuard" }

export default function DocumentsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Workspace"
        title="Documents"
        description="Every brief you've analysed. Search, filter by risk, and reopen any review."
        actions={
          <Link
            href="/"
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Upload className="size-3.5" aria-hidden="true" />
            Upload brief
          </Link>
        }
      />
      <DocumentsLibrary />
    </div>
  )
}
