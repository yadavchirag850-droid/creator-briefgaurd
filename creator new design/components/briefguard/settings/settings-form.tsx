"use client"

import { useState } from "react"
import { Bell, ShieldAlert, SlidersHorizontal, User } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Panel, PanelHeader } from "../primitives"

const notificationOptions = [
  { id: "analysis", label: "Analysis complete", detail: "Email me when a brief finishes processing." },
  { id: "highRisk", label: "High-risk alerts", detail: "Notify me immediately when a brief scores above 70." },
  { id: "digest", label: "Weekly digest", detail: "A Monday summary of reviews and open clarifications." },
] as const

type NotificationId = (typeof notificationOptions)[number]["id"]

export function SettingsForm() {
  const [profile, setProfile] = useState({ name: "Maya Rhodes", email: "maya@rhodes.studio", handle: "@mayarhodes" })
  const [notifications, setNotifications] = useState<Record<NotificationId, boolean>>({
    analysis: true,
    highRisk: true,
    digest: false,
  })
  const [currency, setCurrency] = useState("GBP")
  const [signOff, setSignOff] = useState("Best,\nMaya")

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Settings saved")
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-6">
      <Panel aria-labelledby="profile-title">
        <PanelHeader id="profile-title" icon={User} title="Profile" description="Used in clarification emails and invoices." />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} autoComplete="name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="handle">Primary handle</Label>
            <Input id="handle" value={profile.handle} onChange={(e) => setProfile({ ...profile, handle: e.target.value })} />
          </div>
        </div>
      </Panel>

      <Panel aria-labelledby="notifications-title">
        <PanelHeader id="notifications-title" icon={Bell} title="Notifications" description="Choose what BriefGuard emails you about." />
        <ul className="divide-y divide-border">
          {notificationOptions.map((opt) => (
            <li key={opt.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <Label htmlFor={`notify-${opt.id}`} className="text-sm font-medium">
                  {opt.label}
                </Label>
                <p className="mt-0.5 text-xs text-muted-foreground">{opt.detail}</p>
              </div>
              <Switch
                id={`notify-${opt.id}`}
                checked={notifications[opt.id]}
                onCheckedChange={(checked) => setNotifications({ ...notifications, [opt.id]: checked })}
              />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel aria-labelledby="defaults-title">
        <PanelHeader id="defaults-title" icon={SlidersHorizontal} title="Analysis defaults" description="Applied to every new brief you upload." />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currency">Fee currency</Label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            >
              <option value="GBP">GBP (£)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="signoff">Email sign-off</Label>
            <textarea
              id="signoff"
              rows={3}
              value={signOff}
              onChange={(e) => setSignOff(e.target.value)}
              className="rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            />
          </div>
        </div>
      </Panel>

      <Panel aria-labelledby="danger-title" className="border-danger/30">
        <PanelHeader id="danger-title" icon={ShieldAlert} title="Danger zone" description="Permanently delete all stored briefs and analyses." />
        <div className="flex items-center justify-between gap-4 p-5">
          <p className="text-xs text-muted-foreground">This cannot be undone.</p>
          <Button type="button" variant="destructive" size="sm" onClick={() => toast("Deletion requires email confirmation. Check your inbox.")}>
            Delete all data
          </Button>
        </div>
      </Panel>

      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}
