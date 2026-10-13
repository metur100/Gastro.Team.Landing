import { useEffect, useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { CONTACT_EMAIL, DATENSCHUTZ, HOME, IMPRESSUM, LOGIN_URL, REGISTER_URL } from '../config'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href={HOME} className="flex items-center gap-2.5" aria-label="GastroTeam Startseite">
      <svg viewBox="0 0 64 64" className="size-8" aria-hidden>
        <rect width="64" height="64" rx="14" fill={light ? '#ffffff' : '#0c6358'} />
        <path d="M18 22h28M18 32h20M18 42h12" stroke={light ? '#0c6358' : '#fff'} strokeWidth="5" strokeLinecap="round" />
        <circle cx="44" cy="42" r="6" fill="#5eead4" />
      </svg>
      <span className={`text-[17px] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>GastroTeam</span>
    </a>
  )
}

const NAV = [
  { href: '#funktionen', label: 'Funktionen' },
  { href: '#so-funktionierts', label: "So funktioniert's" },
  { href: '#preise', label: 'Preise' },
  { href: '#faq', label: 'FAQ' },
]

export function Header({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const link = (href: string) => (home ? href : `${HOME}${href}`)
  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled || open ? 'border-line bg-canvas/90 backdrop-blur' : 'border-transparent bg-canvas'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={link(n.href)} className="text-sm font-medium text-ink-muted hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={LOGIN_URL} className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink">Anmelden</a>
          <a href={REGISTER_URL} className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-card hover:bg-brand-800">Kostenlos testen</a>
        </div>
        <button
          type="button"
          className="-mr-2 rounded-md p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-line px-4 pb-6 pt-2 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col">
            {NAV.map((n) => (
              <a key={n.href} href={link(n.href)} onClick={() => setOpen(false)} className="border-b border-line py-3 text-base font-medium">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 grid gap-2">
            <a href={REGISTER_URL} className="rounded-md bg-brand-700 px-4 py-3 text-center font-semibold text-white">Kostenlos testen</a>
            <a href={LOGIN_URL} className="rounded-md border border-line-strong px-4 py-3 text-center font-medium">Anmelden</a>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-ink-muted">Schichtplanung und Teamorganisation für die Gastronomie.</p>
        </div>
        <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
          <a href={IMPRESSUM} className="hover:text-ink">Impressum</a>
          <a href={DATENSCHUTZ} className="hover:text-ink">Datenschutz</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">Kontakt</a>
          <a href={LOGIN_URL} className="hover:text-ink">Anmelden</a>
        </nav>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-ink-faint">© {new Date().getFullYear()} GastroTeam</div>
    </footer>
  )
}

export function Section({ id, eyebrow, title, intro, children, className = '' }: { id?: string; eyebrow?: string; title: string; intro?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`px-4 py-20 sm:px-6 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">{eyebrow}</p>}
          <h2 id={id ? `${id}-title` : undefined} className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-lg text-ink-muted text-pretty">{intro}</p>}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}
