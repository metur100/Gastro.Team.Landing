import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowLeftRight, BellRing, CalendarClock, Check, Clock, Plane, Smartphone } from 'lucide-react'
import { SectionHeading } from '../components/Layout'
import { useMediaQuery, usePrefersReducedMotion } from '../lib/hooks'
import { Reveal } from '../lib/motion'

function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-[230px] rounded-[2.4rem] border border-white/15 bg-gradient-to-b from-night-3 to-night p-2 shadow-[0_50px_100px_-30px_rgb(0_0_0/0.9)] sm:w-[260px] ${className}`}>
      <div className="relative h-[470px] overflow-hidden rounded-[1.9rem] bg-paper px-4 pt-10 text-ink sm:h-[530px]">
        <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-night" />
        {children}
      </div>
    </div>
  )
}

function TabBar({ active }: { active: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-surface/95 px-3 pb-5 pt-2.5 text-[9px] text-ink-faint">
      {['Heute', 'Schichten', 'Verfügbar', 'Anfragen'].map((t, i) => (
        <span key={t} className={`flex flex-col items-center gap-1 ${i === active ? 'font-semibold text-brand-700' : ''}`}>
          <span className={`size-1.5 rounded-full ${i === active ? 'bg-brand-600' : 'bg-transparent'}`} />
          {t}
        </span>
      ))}
    </div>
  )
}

function TodayScreen() {
  return (
    <>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Dienstag, 13. Oktober</p>
      <p className="text-xl font-semibold tracking-tight">Hallo Mia</p>
      <div className="mt-4 rounded-3xl bg-night p-4 text-white">
        <p className="text-[10px] text-white/50">Meine nächste Schicht · in 2 Std.</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">11:00–17:00</p>
        <p className="text-[11px] text-white/60">Service · Trattoria Lago</p>
        <div className="mt-3 flex -space-x-2">
          {['LK', 'NR', 'SH'].map((t) => (
            <span key={t} className="flex size-6 items-center justify-center rounded-full border-2 border-night bg-night-3 text-[8px]">{t}</span>
          ))}
          <span className="pl-3 text-[10px] leading-6 text-white/50">arbeiten mit Ihnen</span>
        </div>
      </div>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Diese Woche</p>
      <div className="mt-2 space-y-1.5 text-[11px]">
        {[['Mi', '17:00–23:00', 'Service'], ['Fr', '17:00–23:00', 'Service'], ['Sa', '17:00–23:00', 'Neu']].map(([d, t, r]) => (
          <div key={d} className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${r === 'Neu' ? 'border-brand-300 bg-brand-50' : 'border-line bg-surface'}`}>
            <span className="w-6 font-semibold">{d}</span>
            <span className="flex-1">{t}</span>
            <span className={r === 'Neu' ? 'font-medium text-brand-700' : 'text-ink-faint'}>{r}</span>
          </div>
        ))}
      </div>
      <TabBar active={0} />
    </>
  )
}

function AvailabilityScreen() {
  const days = [['Montag', '10:00–18:00', true], ['Dienstag', 'Ganztägig', true], ['Mittwoch', 'Nicht verfügbar', false], ['Donnerstag', 'ab 16:00', true], ['Freitag', 'ab 16:00', true], ['Samstag', 'Ganztägig', true]] as const
  return (
    <>
      <p className="text-xl font-semibold tracking-tight">Verfügbarkeit</p>
      <p className="text-[11px] text-ink-muted">Wann können Sie arbeiten?</p>
      <div className="mt-4 space-y-1.5 text-[11px]">
        {days.map(([d, t, on]) => (
          <div key={d} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5">
            <span className="flex-1 font-medium">{d}</span>
            <span className={on ? 'text-ink-muted' : 'text-ink-faint line-through'}>{t}</span>
            <span className={`relative h-4 w-7 rounded-full ${on ? 'bg-brand-600' : 'bg-line-strong'}`}>
              <span className={`absolute top-0.5 size-3 rounded-full bg-white ${on ? 'left-3.5' : 'left-0.5'}`} />
            </span>
          </div>
        ))}
      </div>
      <TabBar active={2} />
    </>
  )
}

function RequestsScreen() {
  return (
    <>
      <p className="text-xl font-semibold tracking-tight">Anfragen</p>
      <div className="mt-4 rounded-2xl border border-line bg-surface p-3 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Plane className="size-3.5" /></span>
          <div className="flex-1">
            <p className="font-semibold">Urlaub</p>
            <p className="text-ink-faint">20.–24. Oktober</p>
          </div>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">Genehmigt</span>
        </div>
      </div>
      <div className="mt-2 rounded-2xl border border-line bg-surface p-3 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-[#eef2ff] text-[#4f6bd8]"><ArrowLeftRight className="size-3.5" /></span>
          <div className="flex-1">
            <p className="font-semibold">Lea bietet an</p>
            <p className="text-ink-faint">Fr · 16:00–23:00 · Küche</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="rounded-lg border border-line py-2 text-center font-medium text-ink-muted">Ablehnen</span>
          <span className="rounded-lg bg-brand-700 py-2 text-center font-semibold text-white">Übernehmen</span>
        </div>
      </div>
      <div className="mt-2 rounded-2xl border border-dashed border-line-strong p-3 text-center text-[11px] text-ink-muted">+ Neuer Urlaubsantrag</div>
      <TabBar active={3} />
    </>
  )
}

const POINTS = [
  { icon: <CalendarClock />, title: 'Nächste Schicht auf einen Blick', text: 'Mit Kolleginnen und Kollegen, die mitarbeiten.' },
  { icon: <Clock />, title: 'Verfügbarkeit in Sekunden', text: 'Wöchentlich oder für einzelne Tage.' },
  { icon: <Plane />, title: 'Urlaub per Tipp', text: 'Antrag stellen und Status verfolgen.' },
  { icon: <BellRing />, title: 'Push bei Änderungen', text: 'Neue Pläne und Tauschanfragen sofort.' },
]

export function AppShowcase() {
  const stage = useRef<HTMLDivElement>(null)
  const desktop = useMediaQuery('(min-width: 768px)')
  const reduce = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'center 0.6'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const spread = desktop ? 92 : 46
  const leftX = useTransform(p, [0, 1], ['-8%', `-${spread}%`])
  const rightX = useTransform(p, [0, 1], ['8%', `${spread}%`])
  const sideRotate = useTransform(p, [0, 1], [0, 9])
  const sideRotateNeg = useTransform(sideRotate, (r) => -r)
  const sideY = useTransform(p, [0, 1], [40, 46])
  const centerY = useTransform(p, [0, 1], [120, 0])
  const sideScale = useTransform(p, [0, 1], [0.8, 0.9])

  return (
    <section id="app" aria-labelledby="app-title" className="grain relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-night px-5 pb-28 pt-28 text-white sm:px-6 sm:pb-36 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[45%] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[160px]" />
      <div className="relative z-[2]">
        <SectionHeading
          id="app"
          dark
          eyebrow="Mobile App"
          title="Der Plan in der"
          accent="Schürzentasche."
          intro="Ihr Team sieht Schichten, trägt Verfügbarkeit ein, beantragt Urlaub und tauscht Schichten – direkt auf dem Handy."
        />

        <div ref={stage} className="relative mx-auto mt-16 flex h-[540px] max-w-5xl justify-center sm:mt-24 sm:h-[600px]" aria-hidden>
          <motion.div style={reduce ? { x: `-${spread}%`, rotate: -9, y: 46, scale: 0.9 } : { x: leftX, rotate: sideRotateNeg, y: sideY, scale: sideScale }} className="absolute top-0 origin-bottom">
            <Phone className="opacity-90"><AvailabilityScreen /></Phone>
          </motion.div>
          <motion.div style={reduce ? { x: `${spread}%`, rotate: 9, y: 46, scale: 0.9 } : { x: rightX, rotate: sideRotate, y: sideY, scale: sideScale }} className="absolute top-0 origin-bottom">
            <Phone className="opacity-90"><RequestsScreen /></Phone>
          </motion.div>
          <motion.div style={reduce ? undefined : { y: centerY }} className="absolute top-0 z-10">
            <Phone className="shadow-[0_60px_120px_-30px_rgb(20_184_166/0.45)]"><TodayScreen /></Phone>
          </motion.div>
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((pt, i) => (
            <Reveal key={pt.title} delay={i * 0.08}>
              <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-300 [&>svg]:size-5">{pt.icon}</span>
              <h3 className="mt-4 font-semibold">{pt.title}</h3>
              <p className="mt-1 text-sm text-mist">{pt.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur sm:flex-row sm:p-7 sm:text-left">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-400/15 text-brand-300">
            <Smartphone className="size-6" aria-hidden />
          </span>
          <p className="flex-1 text-sm leading-relaxed text-mist">
            <span className="font-semibold text-white">iOS und Android in Vorbereitung.</span> Die Apps werden gerade für die Stores vorbereitet – bis dahin funktioniert GastroTeam im Browser jedes Smartphones.
          </p>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/70">
            <Check className="size-3.5 text-brand-300" aria-hidden /> Läuft im Browser
          </span>
        </Reveal>
      </div>
    </section>
  )
}
