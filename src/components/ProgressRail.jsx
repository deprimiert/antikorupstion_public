export default function ProgressRail({ total, current, visible }) {
  if (!visible) return null
  return (
    <div className="hidden md:flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'pending'
        const base = 'h-1 rounded-full transition-all duration-500'
        const cls =
          state === 'done'
            ? 'w-4 bg-ink-300'
            : state === 'active'
              ? 'w-8 bg-accent'
              : 'w-4 bg-ink-800'
        return <span key={i} className={`${base} ${cls}`} />
      })}
    </div>
  )
}
