import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowLeftRight, BellRing, CalendarCheck2, Clock3, FileSpreadsheet, ImageIcon, PhoneMissed, Plane, ShieldCheck, Users } from 'lucide-react'
import { useMediaQuery, usePrefersReducedMotion } from '../lib/hooks'
import { ScrollWords } from '../lib/motion'

const TYPES = ['Restaurants', 'Cafés', 'Bars', 'Bäckereien', 'Hotelküchen', 'Biergärten', 'Bistros', 'Catering', 'Eisdielen', 'Food Trucks']

export function Marquee() {
  const row = [...TYPES, ...TYPES]
  return (
    <section aria-label="Für welche Betriebe" className="relative bg-night pb-24 pt-4 text-white sm:pb-28">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white/35">Gemacht für den Betrieb hinter dem Tresen</p>
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused] sm:gap-14 sm:pr-14">
          {row.map((t, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap sm:gap-14" aria-hidden={i >= TYPES.length}>
              <span className={i % 2 ? 'font-display text-3xl text-white/70 sm:text-4xl' : 'text-2xl font-semibold tracking-tight text-white/40 sm:text-3xl'}>{t}</span>
              <span className="size-1.5 rounded-full bg-brand-300/50" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Statement() {
  return (
    <section className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper px-5 pb-10 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          <span className="h-px w-6 bg-brand-700/50" aria-hidden />
          Kennen Sie das?
        </p>
        <ScrollWords
          className="mt-8 text-[1.9rem] font-medium leading-[1.18] tracking-[-0.03em] text-ink sm:text-5xl sm:leading-[1.12] lg:text-[3.6rem]"
          highlight={['dasselbe', 'trotzdem']}
          text="Jeden Freitag dasselbe: Ein Foto vom Dienstplan in der WhatsApp-Gruppe, drei Korrekturen, zwei Krankmeldungen – und am Samstag fehlt trotzdem jemand an der Bar."
        />
      </div>
    </section>
  )
}

type Spot = { x: number; y: number; r?: number }
type Piece = { chaos: ReactNode; order: { icon: ReactNode; title: string; status: string; color: string }; scatter: Spot; scatterMobile: Spot }

const PIECES: Piece[] = [
  {
    scatter: { x: 18, y: 26, r: -9 }, scatterMobile: { x: 30, y: 12, r: -8 },
    chaos: <Bubble from="Mia">Kann jemand Samstag Abend übernehmen??</Bubble>,
    order: { icon: <CalendarCheck2 />, title: 'Sa 17–23 · Service', status: 'Besetzt', color: 'var(--color-role-service)' },
  },
  {
    scatter: { x: 76, y: 16, r: 7 }, scatterMobile: { x: 72, y: 22, r: 9 },
    chaos: <Bubble from="Noah" alt>Welcher Plan gilt jetzt – der von Montag oder der neue?</Bubble>,
    order: { icon: <ShieldCheck />, title: 'Plan KW 42', status: 'Veröffentlicht', color: 'var(--color-brand-500)' },
  },
  {
    scatter: { x: 10, y: 70, r: 6 }, scatterMobile: { x: 24, y: 40, r: 7 },
    chaos: <Sticky>Lea 20.–24. Urlaub!! nicht vergessen</Sticky>,
    order: { icon: <Plane />, title: 'Urlaub Lea K.', status: 'Genehmigt', color: 'var(--color-role-kitchen)' },
  },
  {
    scatter: { x: 44, y: 50, r: -4 }, scatterMobile: { x: 62, y: 50, r: -5 },
    chaos: <Cell />,
    order: { icon: <Clock3 />, title: 'Stunden Mia S.', status: '30 / 30 Std.', color: 'var(--color-role-service)' },
  },
  {
    scatter: { x: 86, y: 58, r: -8 }, scatterMobile: { x: 30, y: 66, r: 10 },
    chaos: <Missed />,
    order: { icon: <ArrowLeftRight />, title: 'Tausch Fr 16–23', status: 'Freigegeben', color: 'var(--color-role-lead)' },
  },
  {
    scatter: { x: 30, y: 86, r: 9 }, scatterMobile: { x: 70, y: 78, r: -9 },
    chaos: <Photo />,
    order: { icon: <Users />, title: 'Verfügbarkeit Sofia', status: 'Hinterlegt', color: 'var(--color-role-bar)' },
  },
  {
    scatter: { x: 60, y: 30, r: 11 }, scatterMobile: { x: 66, y: 4, r: 6 },
    chaos: <Bubble from="Sofia">Bin krank – wer kann für mich?</Bubble>,
    order: { icon: <BellRing />, title: 'Ersatz gefunden', status: 'Alle informiert', color: 'var(--color-ember-400)' },
  },
  {
    scatter: { x: 68, y: 84, r: -6 }, scatterMobile: { x: 34, y: 90, r: -4 },
    chaos: <XlsFile />,
    order: { icon: <FileSpreadsheet />, title: 'Ruhezeiten', status: 'Geprüft', color: 'var(--color-brand-500)' },
  },
]

const ORDER_DESKTOP: Spot[] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ x: 13 + (i % 4) * 24.6, y: i < 4 ? 30 : 72 }))
const ORDER_MOBILE: Spot[] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ x: i % 2 ? 74.5 : 25.5, y: 11 + Math.floor(i / 2) * 26 }))

export function ChaosToOrder() {
  const ref = useRef<HTMLElement>(null)
  const reduce = usePrefersReducedMotion()
  const desktop = useMediaQuery('(min-width: 768px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const done = useMotionValue(1)
  const p = reduce ? done : scrollYProgress

  const chaosHead = useTransform(p, [0.28, 0.4], [1, 0])
  const chaosHeadY = useTransform(p, [0.28, 0.4], [0, -24])
  const orderHead = useTransform(p, [0.44, 0.56], [0, 1])
  const orderHeadY = useTransform(p, [0.44, 0.56], [24, 0])
  const tint = useTransform(p, [0.2, 0.6], [1, 0])
  const grid = useTransform(p, [0.4, 0.7], [0, 1])
  const bar = useTransform(p, [0.08, 0.7], [0, 1])

  return (
    <section ref={ref} className="relative h-[300vh] bg-paper" aria-labelledby="chaos-title">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-4 pt-24 sm:px-6 sm:pt-28">
        <motion.div aria-hidden style={{ opacity: tint }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgb(234_138_31/0.10),transparent_65%)]" />
        <motion.div aria-hidden style={{ opacity: grid }} className="pointer-events-none absolute inset-0 grid-lines-dark" />

        <div className="relative mx-auto grid w-full max-w-4xl text-center [grid-template-areas:'stack']">
          <motion.div style={{ opacity: chaosHead, y: chaosHeadY }} className="[grid-area:stack]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-700">Heute</p>
            <h2 id="chaos-title" className="mt-4 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.04em] text-balance sm:text-6xl">
              Hundert Nachrichten. <span className="font-display text-ember-700">Kein Plan.</span>
            </h2>
            <p className="mx-auto mt-4 hidden max-w-xl text-lg text-ink-muted sm:block">Chats, Zettel, Tabellen und Anrufe – verteilt auf zehn Orte.</p>
          </motion.div>
          <motion.div style={{ opacity: orderHead, y: orderHeadY }} className="[grid-area:stack]" aria-hidden>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Mit GastroTeam</p>
            <p className="mt-4 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.04em] text-balance sm:text-6xl">
              Ein Plan. <span className="font-display text-brand-700">Für alle sichtbar.</span>
            </p>
            <p className="mx-auto mt-4 hidden max-w-xl text-lg text-ink-muted sm:block">Jede Änderung landet an einem Ort – geprüft, freigegeben und sofort bei den richtigen Leuten.</p>
          </motion.div>
        </div>

        <div className="relative mx-auto mb-6 mt-6 w-full max-w-6xl flex-1 sm:mb-10 sm:mt-10" aria-hidden>
          {PIECES.map((piece, i) => (
            <PieceCard key={i} piece={piece} index={i} progress={p} from={desktop ? piece.scatter : piece.scatterMobile} to={(desktop ? ORDER_DESKTOP : ORDER_MOBILE)[i]} />
          ))}
        </div>

        <div className="relative mx-auto mb-6 h-[3px] w-40 overflow-hidden rounded-full bg-ink/10" aria-hidden>
          <motion.div style={{ scaleX: bar }} className="h-full origin-left rounded-full bg-gradient-to-r from-ember-400 to-brand-500" />
        </div>
      </div>
    </section>
  )
}

function PieceCard({ piece, index, progress, from, to }: { piece: Piece; index: number; progress: MotionValue<number>; from: Spot; to: Spot }) {
  const d = index * 0.018
  const left = useTransform(progress, [0.16 + d, 0.6 + d], [`${from.x}%`, `${to.x}%`])
  const top = useTransform(progress, [0.16 + d, 0.6 + d], [`${from.y}%`, `${to.y}%`])
  const rotate = useTransform(progress, [0.16 + d, 0.6 + d], [from.r ?? 0, 0])
  const scale = useTransform(progress, [0, 0.16 + d, 0.4 + d, 0.6 + d], [0.96, 1, 0.94, 1])
  const chaos = useTransform(progress, [0.34 + d, 0.46 + d], [1, 0])
  const order = useTransform(progress, [0.4 + d, 0.52 + d], [0, 1])
  const o = piece.order
  return (
    <motion.div style={{ left, top, rotate, scale }} className="absolute h-[92px] w-[45%] -translate-x-1/2 -translate-y-1/2 sm:h-[118px] md:w-[23%]">
      <motion.div style={{ opacity: chaos }} className="absolute inset-0">{piece.chaos}</motion.div>
      <motion.div style={{ opacity: order }} className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-float sm:p-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg [&>svg]:size-4" style={{ background: `color-mix(in oklab, ${o.color} 16%, white)`, color: `color-mix(in oklab, ${o.color} 70%, black)` }}>
            {o.icon}
          </span>
          <span className="truncate text-[12px] font-semibold text-ink sm:text-sm">{o.title}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 sm:text-xs">
            <span className="size-1.5 rounded-full bg-brand-500" />
            {o.status}
          </span>
          <span className="hidden h-1.5 w-10 rounded-full sm:block" style={{ background: o.color }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

function Bubble({ children, from, alt = false }: { children: ReactNode; from: string; alt?: boolean }) {
  return (
    <div className={`flex h-full flex-col justify-center rounded-2xl px-3 py-2 shadow-float sm:px-4 ${alt ? 'rounded-tr-sm bg-[#d9fdd3]' : 'rounded-tl-sm bg-surface'}`}>
      <p className="text-[10px] font-semibold text-[#1f8a70] sm:text-xs">{from}</p>
      <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-ink sm:text-[13.5px]">{children}</p>
      <p className="mt-1 self-end text-[9px] text-ink-faint">23:4{from.length}</p>
    </div>
  )
}

function Sticky({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center bg-[#fde68a] px-4 py-3 shadow-float [clip-path:polygon(0_0,100%_0,100%_86%,90%_100%,0_100%)]">
      <p className="font-display text-[17px] leading-tight text-[#5b4300] sm:text-xl">{children}</p>
    </div>
  )
}

function Cell() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-[#c7d2c9] bg-surface font-mono text-[11px] shadow-float">
      <div className="flex items-center gap-2 border-b border-[#c7d2c9] bg-[#f1f5f2] px-2 py-1 text-ink-muted">
        <span className="font-semibold text-[#217346]">fx</span>
        <span className="truncate">=SUMME(C4:C19)</span>
      </div>
      <div className="grid flex-1 grid-cols-3 text-center">
        <span className="border-r border-[#e2e8e3] p-1 text-ink-faint">C</span>
        <span className="flex items-center justify-center bg-[#fde2e2] font-semibold text-[#b91c1c] ring-2 ring-inset ring-[#217346]">#BEZUG!</span>
        <span className="border-l border-[#e2e8e3] p-1 text-ink-faint">E</span>
      </div>
    </div>
  )
}

function Missed() {
  return (
    <div className="flex h-full items-center gap-3 rounded-2xl bg-night px-3 py-2 text-white shadow-float sm:px-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ef4444]/20 text-[#f87171]">
        <PhoneMissed className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold sm:text-sm">3 verpasste Anrufe</p>
        <p className="truncate text-[11px] text-white/55">Noah · Freitag, 22:51</p>
      </div>
    </div>
  )
}

function Photo() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border-4 border-surface bg-[#d6d3cc] shadow-float">
      <div className="relative flex-1 bg-[repeating-linear-gradient(0deg,#cbc7bd_0_1px,transparent_1px_12px),repeating-linear-gradient(90deg,#cbc7bd_0_1px,transparent_1px_26px)] blur-[0.6px]">
        <ImageIcon className="absolute right-2 top-2 size-4 text-ink-faint" />
      </div>
      <p className="truncate bg-surface px-2 py-1 text-[10px] text-ink-muted">IMG_2041.jpg · Plan_final_v3</p>
    </div>
  )
}

function XlsFile() {
  return (
    <div className="flex h-full items-center gap-3 rounded-xl border border-line bg-surface px-3 shadow-float">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#217346] text-[11px] font-bold text-white">XLS</span>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold sm:text-sm">Dienstplan_FINAL_neu(2).xlsx</p>
        <p className="text-[11px] text-ink-faint">Geändert von 4 Personen</p>
      </div>
    </div>
  )
}
