import type { Metadata } from "next"
import { ChevronDown, LifeBuoy, Mail } from "lucide-react"
import { PageHeader } from "@/components/briefguard/page-header"
import { Panel, PanelHeader } from "@/components/briefguard/primitives"

export const metadata: Metadata = { title: "Help centre · BriefGuard" }

const faqs = [
  {
    q: "What file types can I upload?",
    a: "PDF and plain-text (.txt) briefs up to 10 MB. Scanned PDFs are supported, but text-based files give the most accurate extraction.",
  },
  {
    q: "How is the risk score calculated?",
    a: "Each detected ambiguity or contradiction is weighted by severity and by how directly it affects your fee, usage rights, exclusivity, or deadlines. Scores above 70 are flagged as high risk.",
  },
  {
    q: "Are my briefs kept private?",
    a: "Yes. Documents are encrypted at rest, never used for model training, and you can delete any analysis — or all of your data — at any time from Settings.",
  },
  {
    q: "What happens when I run out of free reviews?",
    a: "Free accounts include 3 reviews per month, resetting on the 1st. Upgrade to Creator Pro for unlimited reviews and priority processing.",
  },
  {
    q: "Is BriefGuard legal advice?",
    a: "No. BriefGuard highlights issues worth clarifying with the brand, but it does not replace review by a qualified lawyer for contract terms.",
  },
]

export default function HelpPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Account" title="Help centre" description="Answers to common questions about reviewing briefs with BriefGuard." />

      <Panel aria-labelledby="faq-title">
        <PanelHeader id="faq-title" icon={LifeBuoy} title="Frequently asked questions" />
        <div className="divide-y divide-border">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{f.a}</p>
            </details>
          ))}
        </div>
      </Panel>

      <Panel aria-labelledby="contact-title">
        <PanelHeader id="contact-title" icon={Mail} title="Still need help?" description="Our team replies within one business day." />
        <div className="p-5">
          <a
            href="mailto:support@briefguard.app"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            support@briefguard.app
          </a>
        </div>
      </Panel>
    </div>
  )
}
