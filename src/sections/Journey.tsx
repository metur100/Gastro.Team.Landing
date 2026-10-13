import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { BarChart3, Building2, CalendarDays, Check, Inbox, Smartphone, TriangleAlert, UserPlus } from 'lucide-react'
import { SectionHeading } from '../components/Layout'
import { EASE, Reveal } from '../lib/motion'

const STEPS = [
  { icon: Building2, title: 'Betrieb anlegen', text: 'Registrieren, Standort und Öffnungszeiten eintragen.' },
  { icon: UserPlus, title: 'Team einladen', text: 'Mitarbeitende per E-Mail oder Link einladen – auch über den Messenger.' },
  { icon: CalendarDays, title: 'Planen & prüfen', text: 'Woche planen, Hinweise ansehen und den Plan veröffentlichen.' },
  { icon: Smartphone, title: 'Alle sind informiert', text: 'Ihr Team sieht seine Schichten sofort und bekommt jede Änderung mit.' },
]

export function Steps() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 26 })
  const [reached, setReached] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setReached(Math.min(STEPS.length, Math.floor(v * STEPS.length + 0.35))))

  return (
    <section id="so-funktionierts" aria-labelledby="so-funktionierts-title" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper px-5 py-28 sm:px-6 sm:py-36">
      <SectionHeading id="so-funktionierts" eyebrow="So funktioniert's" title="In vier Schritten zum" accent="ersten Plan." intro="Kein Einrichtungsprojekt, keine Schulung – Ihren ersten Plan können Sie noch heute veröffentlichen." />
      <ol ref={ref} className="relative mx-auto mt-20 grid max-w-6xl gap-12 lg:grid-cols-4 lg:gap-8">
        {/* connecting line: vertical on mobile, horizontal on desktop */}
        <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-px bg-line-strong lg:bottom-auto lg:left-6 lg:right-6 lg:top-[23px] lg:h-px lg:w-auto" />
        <motion.span aria-hidden style={{ scaleY: line }} className="absolute bottom-6 left-[23px] top-6 w-px origin-top bg-gradient-to-b from-brand-500 to-ember-400 lg:hidden" />
        <motion.span aria-hidden style={{ scaleX: line }} className="absolute left-6 right-6 top-[23px] hidden h-px origin-left bg-gradient-to-r from-brand-500 to-ember-400 lg:block" />
        {STEPS.map((s, i) => {
          const on = reached > i
          return (
            <li key={s.title} className="relative grid grid-cols-[48px_1fr] gap-5 lg:block">
              <motion.span
                className="relative z-[1] flex size-12 items-center justify-center rounded-2xl border"
                initial={false}
                animate={{
                  backgroundColor: on ? 'rgb(12 99 88)' : 'rgb(255 255 255)',
                  borderColor: on ? 'rgb(12 99 88)' : 'rgb(207 202 189)',
                  color: on ? 'rgb(255 255 255)' : 'rgb(138 134 123)',
                  scale: on ? 1 : 0.92,
                }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <s.icon className="size-5" aria-hidden />
              </motion.span>
              <div className="lg:mt-7">
                <p className="font-mono text-xs text-ink-faint">Schritt {i + 1}</p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{s.text}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

const ROLES = {
  owner: {
    label: 'Inhaber & Leitungen',
    items: ['Wochenplan in Minuten statt Stunden', 'Konflikte und Mehrstunden auf einen Blick', 'Anträge und Tausch zentral freigeben', 'Geplante Stunden für die Lohnvorbereitung exportieren', 'Mehrere Standorte mit eigenen Zuständigkeiten'],
  },
  staff: {
    label: 'Mitarbeitende',
    items: ['Eigene Schichten immer aktuell auf dem Handy', 'Verfügbarkeit selbst eintragen', 'Urlaub mit einem Tipp beantragen', 'Schichten tauschen ohne Telefonkette', 'Benachrichtigung bei jeder Änderung'],
  },
} as const
type RoleKey = keyof typeof ROLES

export function Roles() {
  const [role, setRole] = useState<RoleKey>('owner')
  return (
    <section aria-labelledby="rollen-title" className="bg-paper px-5 pb-28 sm:px-6 sm:pb-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 rounded-[2rem] border border-line bg-surface p-6 shadow-card sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
        <div>
          <Reveal>
            <h2 id="rollen-title" className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              Für alle im Team <span className="font-display text-brand-700">gemacht.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div role="tablist" aria-label="Zielgruppe" className="mt-8 inline-flex rounded-full border border-line bg-paper p-1">
              {(Object.keys(ROLES) as RoleKey[]).map((k) => (
                <button
                  key={k}
                  role="tab"
                  type="button"
                  id={`tab-${k}`}
                  aria-selected={role === k}
                  aria-controls="rollen-panel"
                  onClick={() => setRole(k)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${role === k ? 'text-white' : 'text-ink-muted hover:text-ink'}`}
                >
                  {role === k && <motion.span layoutId="role-pill" className="absolute inset-0 rounded-full bg-night" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative">{ROLES[k].label}</span>
                </button>
              ))}
            </div>
          </Reveal>
          <div id="rollen-panel" role="tabpanel" aria-labelledby={`tab-${role}`} className="mt-8 min-h-[250px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={role} className="space-y-3.5" initial="hidden" animate="show" exit="exit">
                {ROLES[role].items.map((it, i) => (
                  <motion.li
                    key={it}
                    className="flex gap-3 text-[17px]"
                    variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 14 } }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    {it}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
        <div className="relative h-[380px] overflow-hidden rounded-[1.6rem] bg-night sm:h-[420px]" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(45_212_191/0.25),transparent_55%),radial-gradient(circle_at_80%_90%,rgb(246_169_69/0.15),transparent_50%)]" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={role}
              className="absolute inset-0 flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {role === 'owner' ? <OwnerArt /> : <StaffArt />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function OwnerArt() {
  const kpis = [
    { icon: CalendarDays, label: 'Geplante Stunden', value: '312', sub: 'KW 43' },
    { icon: TriangleAlert, label: 'Offene Schichten', value: '2', sub: 'Sa, So' },
    { icon: Inbox, label: 'Anträge', value: '3', sub: 'warten auf Sie' },
    { icon: BarChart3, label: 'Besetzung', value: '94 %', sub: 'diese Woche' },
  ]
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3">
      {kpis.map((k, i) => (
        <motion.div
          key={k.label}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-white backdrop-blur"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: EASE }}
        >
          <k.icon className="size-4 text-brand-300" />
          <p className="mt-3 text-2xl font-semibold tracking-tight">{k.value}</p>
          <p className="text-xs text-white/70">{k.label}</p>
          <p className="text-[11px] text-white/40">{k.sub}</p>
        </motion.div>
      ))}
    </div>
  )
}

function StaffArt() {
  return (
    <div className="w-full max-w-[250px] rounded-[2rem] border border-white/15 bg-night-3 p-2">
      <div className="rounded-[1.6rem] bg-paper p-4 text-ink">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Heute</p>
        <p className="text-lg font-semibold tracking-tight">Hallo Mia</p>
        <div className="mt-3 rounded-2xl bg-night p-3.5 text-white">
          <p className="text-[10px] text-white/50">Nächste Schicht</p>
          <p className="text-xl font-semibold">11:00–17:00</p>
          <p className="text-[11px] text-white/60">Service</p>
        </div>
        {['Urlaub genehmigt', 'Tausch angenommen'].map((t, i) => (
          <motion.div
            key={t}
            className="mt-2 flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[11px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.12, duration: 0.5, ease: EASE }}
          >
            <Check className="size-3.5 text-brand-600" /> {t}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
