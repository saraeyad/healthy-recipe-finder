function Eyebrow({ children, tone = 'mint' }) {
  const tones = {
    mint: 'border-mkt-mint-border bg-mkt-mint-bg text-mkt-emerald-deep',
    glass: 'border-mkt-mint-border bg-white/80 text-mkt-teal shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]',
    dark: 'border-white/15 bg-white/[0.06] text-mkt-glow',
  }
  const dot = tone === 'dark' ? 'bg-mkt-glow' : 'bg-mkt-mint'

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${tones[tone] || tones.mint}`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-pulse-ring rounded-full ${dot}`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {children}
    </span>
  )
}

export default Eyebrow
