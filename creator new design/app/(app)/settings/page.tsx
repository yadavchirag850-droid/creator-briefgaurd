import type { Metadata } from "next"
import { PageHeader } from "@/components/briefguard/page-header"
import { SettingsForm } from "@/components/briefguard/settings/settings-form"

export const metadata: Metadata = { title: "Settings · BriefGuard" }

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Account" title="Settings" description="Manage your profile, notifications, and analysis defaults." />
      <SettingsForm />
    </div>
  )
}
