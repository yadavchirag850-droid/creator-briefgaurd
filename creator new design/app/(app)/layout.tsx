import { AppShell } from "@/components/briefguard/app-shell"

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
