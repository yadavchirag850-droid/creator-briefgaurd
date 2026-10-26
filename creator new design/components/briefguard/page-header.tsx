export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="text-xs font-medium text-muted-foreground">{eyebrow}</p> : null}
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-balance sm:text-[28px]">{title}</h1>
        {description ? (
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">{description}</p>
        ) : null}
      </div>
      {actions}
    </div>
  )
}
