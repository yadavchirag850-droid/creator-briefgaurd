import type { Metadata } from "next"
import { ResultsSubheader } from "@/components/briefguard/results/results-subheader"
import { BriefEssence, CampaignParameters } from "@/components/briefguard/results/overview-cards"
import { RiskExposurePanel } from "@/components/briefguard/results/risk-exposure-panel"
import { ActionChecklist, MissingParameters } from "@/components/briefguard/results/action-cards"
import { ClarificationEmail } from "@/components/briefguard/results/clarification-email"

export const metadata: Metadata = {
  title: "Lumen Skincare analysis — Creator BriefGuard",
}

export default function ResultsPage() {
  return (
    <>
      <ResultsSubheader />
      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:grid lg:grid-cols-3 lg:items-start lg:px-10 lg:py-8">
        <div className="contents lg:col-span-2 lg:flex lg:flex-col lg:gap-5">
          <div className="order-1 lg:order-none">
            <BriefEssence />
          </div>
          <div className="order-3 lg:order-none">
            <RiskExposurePanel />
          </div>
        </div>
        <div className="contents lg:flex lg:flex-col lg:gap-5">
          <div className="order-2 lg:order-none">
            <CampaignParameters />
          </div>
          <div className="order-4 lg:order-none">
            <MissingParameters />
          </div>
          <div className="order-5 lg:order-none">
            <ActionChecklist />
          </div>
        </div>
        <div className="order-6 lg:order-none lg:col-span-3">
          <ClarificationEmail />
        </div>
      </main>
    </>
  )
}
