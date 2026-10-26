export type Platform = "instagram" | "tiktok" | "youtube" | "linkedin" | "x"

export type RiskLevel = "low" | "medium" | "high"

export type RecentDocument = {
  id: string
  brand: string
  fileName: string
  platforms: Platform[]
  extractedAt: string
  risk: RiskLevel
  flags: number
}

export type RiskFlag = {
  id: string
  type: "Ambiguity" | "Contradiction"
  severity: "high" | "medium"
  title: string
  sourceText: string
  sourceLocation: string
  explanation: string
}

export type ChecklistItem = {
  id: string
  label: string
  detail: string
}

export const platformMeta: Record<Platform, { label: string; short: string }> = {
  instagram: { label: "Instagram", short: "IG" },
  tiktok: { label: "TikTok", short: "TT" },
  youtube: { label: "YouTube", short: "YT" },
  linkedin: { label: "LinkedIn", short: "IN" },
  x: { label: "X", short: "X" },
}

export const usage = { used: 1, limit: 3 }

export const recentDocuments: RecentDocument[] = [
  {
    id: "lumen-skincare",
    brand: "Lumen Skincare",
    fileName: "Lumen_Q4_Creator_Brief_v3.pdf",
    platforms: ["instagram", "tiktok"],
    extractedAt: "2026-10-24T14:32:00Z",
    risk: "high",
    flags: 5,
  },
  {
    id: "northfield-coffee",
    brand: "Northfield Coffee Co.",
    fileName: "Northfield_Holiday_Launch.pdf",
    platforms: ["youtube", "instagram"],
    extractedAt: "2026-10-21T09:10:00Z",
    risk: "medium",
    flags: 3,
  },
  {
    id: "arc-audio",
    brand: "Arc Audio",
    fileName: "ArcAudio_Studio_Pro_Brief.txt",
    platforms: ["youtube"],
    extractedAt: "2026-10-17T18:45:00Z",
    risk: "low",
    flags: 1,
  },
  {
    id: "fieldnote-studio",
    brand: "Fieldnote Studio",
    fileName: "Fieldnote_B2B_Thought_Leadership.pdf",
    platforms: ["linkedin", "x"],
    extractedAt: "2026-10-09T11:20:00Z",
    risk: "medium",
    flags: 2,
  },
  {
    id: "vela-athletics",
    brand: "Vela Athletics",
    fileName: "Vela_Spring_Ambassador.pdf",
    platforms: ["tiktok", "instagram", "youtube"],
    extractedAt: "2026-09-30T16:05:00Z",
    risk: "high",
    flags: 6,
  },
]

export const analysis = {
  brand: "Lumen Skincare",
  campaign: "Q4 Radiance Serum Launch",
  fileName: "Lumen_Q4_Creator_Brief_v3.pdf",
  processedAt: "2026-10-24T14:32:00Z",
  processingSeconds: 11.4,
  riskScore: 72,
  essence:
    "Lumen is launching its Radiance Vitamin C Serum for Q4 and wants authentic, routine-based content positioning the product as a daily essential for dull winter skin. The brand prioritises a soft, educational tone, before/after framing over 14 days, and a clear call-to-action to its holiday bundle landing page.",
  parameters: {
    platforms: ["instagram", "tiktok"] as Platform[],
    deliverables: [
      { label: "Instagram Reels", count: 2 },
      { label: "TikTok Videos", count: 3 },
      { label: "Story Frames", count: 6 },
    ],
    deadline: "2026-11-14",
    deadlineNote: "Final assets due 23:59 GMT",
    usageRights: "Unspecified",
    fee: "£4,500 flat",
  },
  risks: [
    {
      id: "r1",
      type: "Contradiction",
      severity: "high",
      title: "Conflicting exclusivity windows",
      sourceLocation: "Page 2, Section 3.1 vs. Page 5, Terms",
      sourceText:
        "“Creator agrees not to promote competing skincare brands for 30 days post-campaign.” … “Exclusivity applies for a period of 90 days from first publication.”",
      explanation:
        "The brief defines two different exclusivity periods (30 vs. 90 days) with different start triggers. This directly affects your ability to accept other skincare deals during Q1 and should be resolved in writing before signing.",
    },
    {
      id: "r2",
      type: "Ambiguity",
      severity: "high",
      title: "Undefined usage rights & paid amplification",
      sourceLocation: "Page 4, Section 5",
      sourceText:
        "“Lumen may repurpose content across owned and partner channels as needed.”",
      explanation:
        "“As needed” and “partner channels” are open-ended. Without a duration, territory, or explicit exclusion of paid ads (whitelisting), this could grant perpetual commercial usage at no additional fee.",
    },
    {
      id: "r3",
      type: "Ambiguity",
      severity: "medium",
      title: "Subjective approval criteria",
      sourceLocation: "Page 3, Section 4.2",
      sourceText:
        "“Content must feel on-brand and may be revised until the team is satisfied.”",
      explanation:
        "There is no cap on revision rounds and no objective acceptance criteria. Request a fixed number of revision rounds (typically two) and a written approval SLA.",
    },
    {
      id: "r4",
      type: "Contradiction",
      severity: "medium",
      title: "14-day results vs. 3-week timeline",
      sourceLocation: "Page 1 vs. Page 2, Timeline",
      sourceText:
        "“Show visible results over a 14-day routine.” … “Product ships to creators on 4 November.”",
      explanation:
        "Shipping on 4 Nov leaves 10 days before the 14 Nov deadline — not enough time to authentically document a 14-day routine. Either the deadline or the claim framing needs to move.",
    },
  ] satisfies RiskFlag[],
  missing: [
    { label: "Payment terms", detail: "No invoice schedule or net payment window (e.g. Net 30) is stated." },
    { label: "Usage rights duration", detail: "Duration and territory of content licence are not defined." },
    { label: "Revision limit", detail: "Number of included revision rounds is not specified." },
    { label: "FTC / ASA disclosure", detail: "No guidance on #ad placement or paid partnership labels." },
    { label: "Kill fee", detail: "No compensation defined if the brand cancels mid-campaign." },
  ],
  checklist: [
    { id: "c1", label: "Confirm a single exclusivity period in writing", detail: "Request 30 days, starting from final post date." },
    { id: "c2", label: "Define usage rights scope", detail: "Organic only, 90 days, UK/US. Paid usage quoted separately." },
    { id: "c3", label: "Cap revisions at two rounds", detail: "Ask for approval feedback within 48 hours." },
    { id: "c4", label: "Move deadline or adjust claim framing", detail: "Propose 21 Nov, or reframe as a “first impressions” routine." },
    { id: "c5", label: "Request payment terms & kill fee", detail: "50% upfront, 50% on delivery, Net 15. 50% kill fee." },
    { id: "c6", label: "Confirm disclosure requirements", detail: "Paid partnership label + #ad in first line of caption." },
  ] satisfies ChecklistItem[],
}

export function buildClarificationEmail() {
  return `Hi Lumen team,

Thank you so much for sending over the Q4 Radiance Serum brief — I love the direction and I'm excited to get started.

Before I sign, could you help me clarify a few points so we're fully aligned?

1. Exclusivity: The brief mentions both 30 days (Section 3.1) and 90 days (Terms). Could we confirm 30 days from the final post date?
2. Usage rights: Could we define the licence as organic use on Lumen-owned channels for 90 days in the UK/US? Paid amplification or whitelisting can be quoted separately.
3. Revisions: Could we agree on two rounds of revisions, with feedback within 48 hours?
4. Timeline: With product arriving on 4 Nov, a 14-day routine wouldn't complete before the 14 Nov deadline. Would 21 Nov work, or shall I frame it as a first-impressions routine?
5. Payment: Could you share payment terms? I typically work on 50% upfront, 50% on delivery, Net 15, with a 50% kill fee.

Happy to jump on a quick call if that's easier. Looking forward to working together!

Best,
Maya`
}

export function buildChecklistText() {
  return [
    `Creator BriefGuard — ${analysis.brand} checklist`,
    "",
    ...analysis.checklist.map((item) => `[ ] ${item.label} — ${item.detail}`),
  ].join("\n")
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
})

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso))
export const formatDateTime = (iso: string) => `${dateTimeFormatter.format(new Date(iso))} UTC`
