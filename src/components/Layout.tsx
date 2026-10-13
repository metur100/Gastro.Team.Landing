import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { CONTACT_EMAIL, DATENSCHUTZ, HOME, IMPRESSUM, LOGIN_URL, REGISTER_URL } from '../config'
import { EASE, WordRise } from '../lib/motion'

export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="gt-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0b4f47" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#gt-mark)" />
      <path d="M18 22h28M18 32h20M18 42h12" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <circle cx="44" cy="42" r="6" fill="#fcc77a" />
    </svg>
  )
}

export function Logo() {
  return (
    <a href={HOME} className="flex items-center gap-2.5" aria-label="GastroTeam Startseite">
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight text-white">GastroTeam</span>
    </a>
  )
}

const NAV = [
  { href: '#funktionen', label: 'Funktionen' },
  { href: '#app', label: 'App' },
  { href: '#so-funktionierts', label: "So funktioniert's" },
  { href: '#preise', label: 'Preise' },
  { href: '#faq', label: 'FAQ' },
]

export function Header({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 640 && y > prev + 2 && !open)
    if (y < prev - 2) setHidden(false)
  })
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  const link = (href: string) => (home ? href : `${HOME}${href}`)

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
        animate={{ y: hidden ? '-120%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-5 ${
            scrolled || open || !home
              ? 'border-white/10 bg-night/75 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl backdrop-saturate-150'
              : 'border-transparent bg-transparent'
          }`}
        >
          <Logo />
          <nav aria-label="Hauptnavigation" className="hidden items-center lg:flex" onPointerLeave={() => setHover(null)}>
            {NAV.map((n) => (
              <a
                key={n.href}
                href={link(n.href)}
                onPointerEnter={() => setHover(n.href)}
                onFocus={() => setHover(n.href)}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {hover === n.href && (
                  <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-1 lg:flex">
            <a href={LOGIN_URL} className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white">
              Anmelden
            </a>
            <a href={REGISTER_URL} className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-night transition-colors hover:bg-brand-100">
              Kostenlos testen
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 bg-night/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.6rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.6rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.6rem)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={link(n.href)}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-3xl font-medium tracking-tight text-white"
                >
                  {n.label}
                  <ArrowUpRight className="size-5 text-white/40" aria-hidden />
                </motion.a>
              ))}
            </nav>
            <motion.div className="mt-8 grid gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <a href={REGISTER_URL} className="rounded-full bg-white px-5 py-3.5 text-center font-semibold text-night">30 Tage kostenlos testen</a>
              <a href={LOGIN_URL} className="rounded-full border border-white/20 px-5 py-3.5 text-center font-medium text-white">Anmelden</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['55%', '0%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 1])
  const year = new Date().getFullYear()
  return (
    <footer className="grain relative overflow-hidden bg-night text-white">
      <div className="relative z-[2] mx-auto max-w-6xl px-5 pt-20 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">Schichtplanung und Teamorganisation für Restaurants, Cafés, Bars und Bäckereien.</p>
          </div>
          <FooterCol title="Produkt" links={[['Funktionen', `${HOME}#funktionen`], ['Mobile App', `${HOME}#app`], ['Preise', `${HOME}#preise`], ['FAQ', `${HOME}#faq`]]} />
          <FooterCol title="Konto" links={[['Kostenlos testen', REGISTER_URL], ['Anmelden', LOGIN_URL]]} />
          <FooterCol title="Rechtliches" links={[['Impressum', IMPRESSUM], ['Datenschutz', DATENSCHUTZ], ['Kontakt', `mailto:${CONTACT_EMAIL}`]]} />
        </div>
        <div className="flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {year} GastroTeam</span>
          <span>Gemacht für den Gastro-Alltag.</span>
        </div>
      </div>
      <div ref={ref} aria-hidden className="relative z-[2] -mb-[3vw] select-none overflow-hidden px-2">
        <motion.p style={{ y, opacity }} className="text-center text-[17.5vw] font-semibold leading-[0.85] tracking-[-0.06em]">
          <span className="bg-gradient-to-b from-white/25 via-white/10 to-transparent bg-clip-text text-transparent">GastroTeam</span>
        </motion.p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-white/75 transition-colors hover:text-white">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Eyebrow + animated headline + intro used at the top of most sections. */
export function SectionHeading({ id, eyebrow, title, accent, accentBreak = false, intro, dark = false, align = 'center' }: {
  id?: string
  eyebrow: string
  title: string
  accent?: string
  /** Put the accent on its own line. */
  accentBreak?: boolean
  intro?: ReactNode
  dark?: boolean
  align?: 'center' | 'left'
}) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <motion.p
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-brand-300' : 'text-brand-700'}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className={`h-px w-6 ${dark ? 'bg-brand-300/60' : 'bg-brand-700/50'}`} aria-hidden />
        {eyebrow}
      </motion.p>
      <WordRise
        id={id ? `${id}-title` : undefined}
        className={`mt-5 text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:text-6xl ${dark ? 'text-white' : 'text-ink'}`}
        segments={[{ text: title }, ...(accent ? [{ text: accent, br: accentBreak, className: `font-display ${dark ? 'text-brand-300' : 'text-brand-700'}` }] : [])]}
      />
      {intro && (
        <motion.p
          className={`mt-6 text-lg leading-relaxed text-pretty ${dark ? 'text-mist' : 'text-ink-muted'} ${centered ? 'mx-auto max-w-2xl' : ''}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  )
}
