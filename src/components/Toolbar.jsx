import { useUI, SUPPORTED_LANGS } from '../store/uiStore'
import { useT } from '../i18n'

export default function Toolbar() {
  return (
    <div className="flex items-center gap-2">
      <LangSwitch />
      <ThemeToggle />
    </div>
  )
}

function LangSwitch() {
  const t = useT()
  const lang = useUI((s) => s.lang)
  const setLang = useUI((s) => s.setLang)
  return (
    <div
      role="group"
      aria-label={t('ui.toolbar.langLabel')}
      className="flex items-center gap-0.5 rounded-full border border-ink-700 bg-ink-900/70 p-0.5"
    >
      {SUPPORTED_LANGS.map((l) => {
        const active = lang === l
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`btn-tactile px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] rounded-full transition-colors ${
              active
                ? 'bg-ink-100 text-invert-fg'
                : 'text-ink-500 hover:text-ink-300'
            }`}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}

function ThemeToggle() {
  const t = useT()
  const theme = useUI((s) => s.theme)
  const toggle = useUI((s) => s.toggleTheme)
  const isLight = theme === 'light'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(isLight ? 'ui.toolbar.themeDark' : 'ui.toolbar.themeLight')}
      title={t(isLight ? 'ui.toolbar.themeDark' : 'ui.toolbar.themeLight')}
      className="btn-tactile group flex h-8 w-8 items-center justify-center rounded-full border border-ink-700 bg-ink-900/70 text-ink-300 hover:text-ink-100"
    >
      {isLight ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
