import { useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { BarChart3, Bell, Building2, Clock, Download, Lock, MoonStar, Plane, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../components/Layout'
import { usePhases } from '../lib/hooks'
import { EASE, Reveal, SpotlightCard } from '../lib/motion'

function Card({ icon, title, text, children, className = '', delay = 0 }: { icon: ReactNode; title: string; text: string; children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={className}>
      <SpotlightCard className="h-full rounded-[1.6rem] border border-line bg-surface shadow-card transition-shadow duration-500 hover:shadow-float">
        <div className="flex h-full flex-col">
          <div className="relative h-52 overflow-hidden border-b border-line bg-paper/60 sm:h-56" aria-hidden>{children}</div>
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700 [&>svg]:size-4">{icon}</span>
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{text}</p>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  )
}

function useActive() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  return { ref, inView }
}

function AvailabilityArt() {
  const { ref, inView } = useActive()
  const rows = [
    { d: 'Mo', from: 10, to: 60 },
    { d: 'Di', from: 30, to: 95 },
    { d: 'Mi', from: 0, to: 0, off: true },
    { d: 'Do', from: 45, to: 100 },
    { d: 'Fr', from: 15, to: 70 },
  ]
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-2.5 px-6 sm:px-8">
      {rows.map((r, i) => (
        <div key={r.d} className="flex items-center gap-3 text-xs">
          <span className="w-6 font-semibold text-ink-muted">{r.d}</span>
          <div className="relative h-6 flex-1 rounded-md bg-subtle">
            {r.off ? (
              <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 + i * 0.1 }} className="absolute inset-0 flex items-center rounded-md bg-[repeating-linear-gradient(135deg,#eeebe3_0_6px,#e3dfd4_6px_7px)] px-2 text-[11px] text-ink-faint">
                Nicht verfügbar
              </motion.span>
            ) : (
              <motion.span
                className="absolute inset-y-0 rounded-md bg-brand-500/85"
                style={{ left: `${r.from}%` }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${r.to - r.from}%` } : {}}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: EASE }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function LeaveArt() {
  const { ref, inView } = useActive()
  const days = Array.from({ length: 28 }, (_, i) => i + 1)
  const inRange = (d: number) => d >= 19 && d <= 23
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center">
      <div className="grid grid-cols-7 gap-1.5 text-center text-[11px]">
        {['M', 'D', 'M', 'D', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className="pb-1 font-semibold text-ink-faint">{d}</span>
        ))}
        {days.map((d) => (
          <motion.span
            key={d}
            className={`flex size-7 items-center justify-center rounded-md ${inRange(d) ? 'font-semibold text-white' : 'text-ink-muted'}`}
            initial={false}
            animate={{ backgroundColor: inView && inRange(d) ? 'rgb(12 99 88)' : 'rgb(12 99 88 / 0)' }}
            transition={{ delay: 0.4 + (d - 19) * 0.08, duration: 0.3 }}
          >
            {d}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="absolute bottom-4 right-4 rotate-[-10deg] rounded-lg border-2 border-brand-600 bg-surface/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 backdrop-blur-sm sm:bottom-auto sm:right-7 sm:top-7 sm:text-sm"
        initial={{ opacity: 0, scale: 2.2 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.3, type: 'spring', stiffness: 300, damping: 15 }}
      >
        Genehmigt
      </motion.div>
    </div>
  )
}

const NOTES = [
  { t: 'Neuer Schichtplan KW 43', s: 'Ihre Schichten sind online' },
  { t: 'Urlaub genehmigt', s: '20.–24. Oktober' },
  { t: 'Tauschanfrage von Lea', s: 'Fr 16:00–23:00' },
  { t: 'Schicht geändert', s: 'Sa jetzt ab 16:00' },
]
const NOTE_TIMES = [1800, 3600, 5400] as const

function NotifyArt() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const phase = usePhases(NOTE_TIMES, 7200, inView, 0)
  const visible = [0, 1, 2].map((k) => NOTES[(phase + k) % NOTES.length])
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center px-6">
      <div className="relative h-[136px] w-full max-w-[280px]">
        <AnimatePresence initial={false}>
          {visible.map((n, k) => (
            <motion.div
              key={n.t}
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1 - k * 0.3, y: k * 14, scale: 1 - k * 0.06, zIndex: 3 - k }}
              exit={{ opacity: 0, y: 50, scale: 0.85 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-x-0 top-0 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-float"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white"><Bell className="size-4" /></span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold">{n.t}</p>
                <p className="truncate text-xs text-ink-faint">{n.s}</p>
              </div>
              <span className="ml-auto self-start text-[10px] text-ink-faint">jetzt</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ReportArt() {
  const { ref, inView } = useActive()
  const bars = [62, 88, 45, 74, 96, 58, 80]
  return (
    <div ref={ref} className="flex h-full flex-col justify-end px-6 pb-6 sm:px-7">
      <div className="flex h-28 items-end gap-2">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            className={`flex-1 rounded-t-md ${i === 4 ? 'bg-brand-600' : 'bg-brand-200'}`}
            initial={{ height: 0 }}
            animate={inView ? { height: `${b}%` } : {}}
            transition={{ duration: 1, delay: 0.15 + i * 0.07, ease: EASE }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-ink-faint">Geplante Stunden · Oktober</span>
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <Download className="size-3" /> CSV
        </motion.span>
      </div>
    </div>
  )
}

function LocationsArt() {
  const { ref, inView } = useActive()
  const locs = [
    { n: 'Trattoria Lago · Mitte', on: true },
    { n: 'Lago Bar · Hafen', on: true },
    { n: 'Lago Café · Altstadt', on: false },
  ]
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-2 px-6 sm:px-7">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Leitung: Noah R.</p>
      {locs.map((l, i) => (
        <motion.div
          key={l.n}
          className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: EASE }}
        >
          <Building2 className="size-4 text-ink-faint" />
          <span className="flex-1 truncate text-[13px] font-medium">{l.n}</span>
          <span className={`relative h-5 w-9 rounded-full transition-colors duration-500 ${inView && l.on ? 'bg-brand-600' : 'bg-line-strong'}`}>
            <motion.span
              className="absolute top-0.5 size-4 rounded-full bg-white shadow"
              initial={{ left: 2 }}
              animate={{ left: inView && l.on ? 18 : 2 }}
              transition={{ delay: 0.6 + i * 0.15, type: 'spring', stiffness: 400, damping: 25 }}
            />
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function NightArt() {
  const { ref, inView } = useActive()
  // 24h dial: 22:00 → 02:00 arc
  const r = 62
  const c = 2 * Math.PI * r
  const start = 22 / 24
  const len = 4 / 24
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center bg-night">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgb(45_212_191/0.18),transparent_60%)]" />
      <svg viewBox="0 0 160 160" className="relative size-44">
        <circle cx="80" cy="80" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="10" />
        {Array.from({ length: 24 }, (_, h) => {
          const a = (h / 24) * Math.PI * 2 - Math.PI / 2
          return <line key={h} x1={80 + Math.cos(a) * 74} y1={80 + Math.sin(a) * 74} x2={80 + Math.cos(a) * (h % 6 ? 77 : 80)} y2={80 + Math.sin(a) * (h % 6 ? 77 : 80)} stroke="rgb(255 255 255 / 0.3)" strokeWidth="1" />
        })}
        <motion.circle
          cx="80" cy="80" r={r} fill="none" stroke="url(#night-arc)" strokeWidth="10" strokeLinecap="round"
          transform={`rotate(${start * 360 - 90} 80 80)`}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: c - c * len } : {}}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
        />
        <defs>
          <linearGradient id="night-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6a945" />
            <stop offset="1" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        <text x="80" y="76" textAnchor="middle" className="fill-white text-[15px] font-semibold">22:00–02:00</text>
        <text x="80" y="94" textAnchor="middle" className="fill-white/50 text-[9px]">endet am Folgetag</text>
      </svg>
      <MoonStar className="absolute right-6 top-6 size-5 text-ember-300" />
    </div>
  )
}

function SecurityArt() {
  const { ref, inView } = useActive()
  const items = ['Daten pro Betrieb getrennt', 'Rollen & Rechte je Standort', 'Datenexport & Löschung', 'Protokoll sensibler Aktionen']
  return (
    <div ref={ref} className="flex h-full items-center gap-6 px-6 sm:px-8">
      <motion.div
        className="relative hidden size-24 shrink-0 items-center justify-center rounded-3xl bg-night text-brand-300 sm:flex"
        initial={{ rotate: -8, scale: 0.8, opacity: 0 }}
        animate={inView ? { rotate: 0, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <ShieldCheck className="size-10" />
        <span className="absolute inset-0 rounded-3xl ring-1 ring-brand-300/30" />
      </motion.div>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <motion.li
            key={t}
            className="flex items-center gap-2.5 text-[13px] font-medium"
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
          >
            <Lock className="size-3.5 text-brand-600" />
            {t}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export function Bento() {
  return (
    <section aria-labelledby="mehr-title" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper px-5 py-28 sm:px-6 sm:py-36">
      <SectionHeading id="mehr" eyebrow="Und alles andere" title="Alles, was ein Betrieb" accent="im Alltag braucht." intro="Von der Verfügbarkeit bis zur Lohnvorbereitung – ohne zweites Tool, ohne Zettel." />
      <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:mt-20 md:grid-cols-6 md:gap-5">
        <Card className="md:col-span-3" icon={<Clock />} title="Verfügbarkeiten" text="Ihr Team trägt ein, wann es arbeiten kann. Im Planer sehen Sie es direkt neben jeder Zeile.">
          <AvailabilityArt />
        </Card>
        <Card className="md:col-span-3" delay={0.08} icon={<Plane />} title="Urlaubsanträge mit Freigabe" text="Anträge mit einem Tipp stellen. Konflikte mit geplanten Schichten sehen Sie vor der Genehmigung.">
          <LeaveArt />
        </Card>
        <Card className="md:col-span-2" icon={<Bell />} title="Benachrichtigungen" text="Neue Pläne, Änderungen, Anträge und Tauschanfragen landen bei den richtigen Personen.">
          <NotifyArt />
        </Card>
        <Card className="md:col-span-2" delay={0.08} icon={<BarChart3 />} title="Auswertungen & CSV" text="Geplante Stunden je Person und Standort – exportierbar für die Lohnvorbereitung.">
          <ReportArt />
        </Card>
        <Card className="md:col-span-2" delay={0.16} icon={<Building2 />} title="Mehrere Standorte" text="Leitungen sehen nur ihre Standorte. Rechte lassen sich einzeln vergeben.">
          <LocationsArt />
        </Card>
        <Card className="md:col-span-3" icon={<MoonStar />} title="Gemacht für Spätschichten" text="Schichten über Mitternacht, korrekt auch bei der Zeitumstellung. Ruhezeiten werden über den Tageswechsel hinweg geprüft.">
          <NightArt />
        </Card>
        <Card className="md:col-span-3" delay={0.08} icon={<ShieldCheck />} title="Datenschutz eingebaut" text="Jeder Betrieb sieht nur seine eigenen Daten. Mitarbeitende sehen keine Kontaktdaten von Kolleginnen und Kollegen.">
          <SecurityArt />
        </Card>
      </div>
    </section>
  )
}
