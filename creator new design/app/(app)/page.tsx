import { CircleAlert, FileWarning, ListChecks, Mail, ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/briefguard/page-header"
import { InsightStats } from "@/components/briefguard/dashboard/insight-stats"
import { UploadConsole } from "@/components/briefguard/dashboard/upload-console"
import { RecentDocuments } from "@/components/briefguard/dashboard/recent-documents"
import { Panel, PanelHeader } from "@/components/briefguard/primitives"

const checks = [
  { icon: CircleAlert, title: "Contradictions", body: "Conflicting dates, exclusivity windows and deliverable counts." },
  { icon: FileWarning, title: "Missing terms", body: "Payment schedule, usage rights, kill fees and revision caps." },
  { icon: ListChecks, title: "Action checklist", body: "A prioritised list of what to confirm before signing." },
  { icon: Mail, title: "Clarification draft", body: "A polite, ready-to-send email in your own voice." },
]

export default function DashboardPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <PageHeader
        eyebrow="Sunday, 25 October"
        title="Good afternoon, Maya"
        description="Upload a brand brief and BriefGuard will surface every ambiguity, contradiction and missing term before you commit."
      />

      <InsightStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UploadConsole />
        </div>
        <Panel aria-labelledby="checks-title">
          <PanelHeader id="checks-title" icon={ShieldCheck} title="What every review covers" />
          <ul className="flex flex-col divide-y divide-border">
            {checks.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3 px-5 py-3.5">
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-medium">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <RecentDocuments />
    </main>
  )
}
