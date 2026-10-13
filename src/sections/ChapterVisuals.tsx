import { useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { ArrowLeftRight, Check, CircleAlert, CircleX, Copy, Info, Send, TriangleAlert } from 'lucide-react'
import { usePhases } from '../lib/hooks'
import { EASE } from '../lib/motion'

function useLoop(times: readonly number[], cycle: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px -10% 0px' })
  const phase = usePhases(times, cycle, inView)
  return { ref, phase }
}

function Frame({ title, children, badge }: { title: string; children: ReactNode; badge?: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-night-2/80 text-white shadow-glow backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3 text-[12px]">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 font-medium text-white/70">{title}</span>
        <span className="ml-auto">{badge}</span>
      </div>
      <div className="relative flex flex-1 flex-col justify-center p-4 sm:p-5">{children}</div>
    </div>
  )
}

/* 01 · Planen ------------------------------------------------------------ */
const PLAN_TIMES = [500, 2300, 3600] as const
const PLAN_PEOPLE = [
  { name: 'Lea', color: 'var(--color-role-kitchen)', days: [0, 2, 3] },
  { name: 'Mia', color: 'var(--color-role-service)', days: [1, 2, 4] },
  { name: 'Noah', color: 'var(--color-role-lead)', days: [0, 3, 4] },
  { name: 'Sofia', color: 'var(--color-role-bar)', days: [2, 4] },
]

export function PlanVisual() {
  const { ref, phase } = useLoop(PLAN_TIMES, 7500)
  return (
    <div ref={ref} className="h-full">
      <Frame title="Wochenplan · KW 43" badge={<span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[11px] text-white/60">Entwurf</span>}>
        <div className="grid grid-cols-[52px_repeat(5,minmax(0,1fr))] gap-1.5 text-[11px]">
          <span />
          {['Di', 'Mi', 'Do', 'Fr', 'Sa'].map((d) => (
            <span key={d} className="pb-1 text-center font-semibold text-white/50">{d}</span>
          ))}
          {PLAN_PEOPLE.map((p, pi) => (
            <div key={p.name} className="contents">
              <span className="flex items-center font-medium text-white/80">{p.name}</span>
              {[0, 1, 2, 3, 4].map((d) => {
                // Noah's Tuesday shift is dragged to Wednesday in phase 2.
                const isDragged = pi === 2 && (phase >= 2 ? d === 1 : d === 0)
                const has = (p.days.includes(d) && !(pi === 2 && d === 0)) || isDragged
                return (
                  <div key={d} className="h-10 rounded-md border border-white/[0.05] bg-white/[0.02] sm:h-12 lg:h-14">
                    {phase >= 1 && has && (
                      <motion.div
                        layoutId={isDragged ? 'plan-drag' : undefined}
                        initial={isDragged && phase >= 2 ? false : { opacity: 0, scale: 0.6, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: EASE, delay: isDragged && phase >= 2 ? 0 : 0.05 * (pi * 5 + d) }}
                        className="flex h-full items-center overflow-hidden rounded-md text-[10px] font-semibold"
                        style={{ background: `color-mix(in oklab, ${p.color} 18%, transparent)` }}
                      >
                        <span className="h-full w-[3px]" style={{ background: p.color }} />
                        <span className="px-1.5 text-white/85">{d % 2 ? '17–23' : '10–18'}</span>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl border border-white/10 bg-night-3/95 px-3 py-2.5 text-[12px] backdrop-blur sm:inset-x-5 sm:bottom-5"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand-400/15 text-brand-300"><Copy className="size-3.5" /></span>
              <span className="flex-1"><b className="font-semibold">Woche kopiert</b> <span className="text-white/55">· 12 Schichten nach KW 44</span></span>
              <Check className="size-4 text-brand-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </Frame>
    </div>
  )
}

/* 02 · Prüfen ------------------------------------------------------------ */
const ISSUES = [
  { level: 'Fehler', icon: CircleX, tone: 'text-[#f87171] bg-[#ef4444]/15', text: 'Lea K. ist am Dienstag doppelt eingeplant' },
  { level: 'Warnung', icon: TriangleAlert, tone: 'text-ember-300 bg-ember-400/15', text: 'Mia S.: nur 10 Std. Ruhezeit zwischen Mi und Do' },
  { level: 'Warnung', icon: TriangleAlert, tone: 'text-ember-300 bg-ember-400/15', text: 'Noah R.: Pause fehlt bei 7-Stunden-Schicht' },
  { level: 'Hinweis', icon: Info, tone: 'text-[#a9c1ff] bg-[#7aa2ff]/15', text: 'Sofia H. hat Freitag als nicht verfügbar markiert' },
]
const CHECK_TIMES = [400, 800, 1200, 1600, 3000, 3500, 4000, 4500, 5100] as const

export function CheckVisual() {
  const { ref, phase } = useLoop(CHECK_TIMES, 9000)
  const shown = Math.min(phase, 4)
  const fixed = Math.max(0, Math.min(phase - 4, 4))
  const open = shown - fixed
  const ready = phase >= 9
  return (
    <div ref={ref} className="h-full">
      <Frame
        title="Prüfung vor dem Veröffentlichen"
        badge={
          <motion.span
            key={ready ? 'r' : 'o'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${ready ? 'bg-brand-400/15 text-brand-300' : 'bg-ember-400/15 text-ember-300'}`}
          >
            {ready ? 'Bereit' : `${open} offen`}
          </motion.span>
        }
      >
        <ul className="space-y-2">
          {ISSUES.map((it, i) => {
            const visible = i < shown
            const done = i < fixed
            const Icon = done ? Check : it.icon
            return (
              <motion.li
                key={it.text}
                initial={false}
                animate={{ opacity: visible ? (done ? 0.55 : 1) : 0, x: visible ? 0 : 24 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
              >
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-500 ${done ? 'bg-brand-400/15 text-brand-300' : it.tone}`}>
                  <Icon className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{done ? 'Behoben' : it.level}</p>
                  <p className={`truncate text-[12.5px] transition-colors duration-500 ${done ? 'text-white/50 line-through decoration-white/30' : 'text-white/90'}`}>{it.text}</p>
                </div>
              </motion.li>
            )
          })}
        </ul>
        <AnimatePresence>
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-400 py-2.5 text-[13px] font-semibold text-night"
            >
              <Check className="size-4" /> Keine Konflikte – bereit zum Veröffentlichen
            </motion.div>
          )}
        </AnimatePresence>
      </Frame>
    </div>
  )
}

/* 03 · Veröffentlichen ---------------------------------------------------- */
const TEAM = ['LK', 'MS', 'NR', 'SH', 'JB', 'EK']
const PUBLISH_TIMES = [900, 1300, 2000] as const

export function PublishVisual() {
  const { ref, phase } = useLoop(PUBLISH_TIMES, 6500)
  const pressed = phase === 1
  const sent = phase >= 2
  const R = 38
  return (
    <div ref={ref} className="h-full">
      <Frame title="Plan KW 43 veröffentlichen" badge={<span className="text-[11px] text-white/50">{sent ? '6 / 6 zugestellt' : '6 Mitarbeitende'}</span>}>
        <div className="relative mx-auto aspect-square h-full max-h-[300px] max-w-full">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
            {TEAM.map((_, i) => {
              const a = (i / TEAM.length) * Math.PI * 2 - Math.PI / 2
              return (
                <motion.line
                  key={i}
                  x1="50" y1="50" x2={50 + Math.cos(a) * R} y2={50 + Math.sin(a) * R}
                  stroke="rgb(94 234 212 / 0.5)" strokeWidth="0.5" strokeDasharray="1.5 1.5"
                  initial={false}
                  animate={{ pathLength: sent ? 1 : 0, opacity: sent ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: sent ? i * 0.08 : 0, ease: EASE }}
                />
              )
            })}
          </svg>
          {sent && [0, 1, 2].map((r) => (
            <motion.span
              key={r}
              className="absolute left-1/2 top-1/2 size-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/50"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 2.2, delay: r * 0.45, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.4 }}
            />
          ))}
          <motion.div
            className="absolute left-1/2 top-1/2 flex size-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-brand-400 text-night shadow-[0_0_60px_rgb(45_212_191/0.5)]"
            animate={{ scale: pressed ? 0.88 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            {sent ? <Check className="size-6" /> : <Send className="size-5" />}
            <span className="text-[10px] font-semibold">{sent ? 'Gesendet' : 'Senden'}</span>
          </motion.div>
          {TEAM.map((t, i) => {
            const a = (i / TEAM.length) * Math.PI * 2 - Math.PI / 2
            return (
              <div key={t} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + Math.cos(a) * R}%`, top: `${50 + Math.sin(a) * R}%` }}>
                <div className="relative flex size-10 items-center justify-center rounded-full border border-white/15 bg-night-3 text-[11px] font-semibold sm:size-11">
                  {t}
                  <motion.span
                    className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand-400 text-night"
                    initial={false}
                    animate={{ scale: phase >= 3 ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20, delay: phase >= 3 ? i * 0.09 : 0 }}
                  >
                    <Check className="size-2.5" strokeWidth={3} />
                  </motion.span>
                </div>
              </div>
            )
          })}
        </div>
      </Frame>
    </div>
  )
}

/* 04 · Tauschen ----------------------------------------------------------- */
const SWAP_STEPS = ['Lea bietet ihre Schicht an', 'Noah übernimmt', 'Leitung gibt frei', 'Plan aktualisiert – beide benachrichtigt']
const SWAP_TIMES = [900, 2100, 3300, 4300] as const

export function SwapVisual() {
  const { ref, phase } = useLoop(SWAP_TIMES, 7800)
  const swapped = phase >= 3
  return (
    <div ref={ref} className="h-full">
      <Frame title="Schichttausch" badge={<span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${swapped ? 'bg-brand-400/15 text-brand-300' : 'bg-white/[0.07] text-white/60'}`}>{swapped ? 'Freigegeben' : 'Offen'}</span>}>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Schicht</p>
            <p className="text-[15px] font-semibold">Fr · 16:00–23:00</p>
            <p className="text-[11px] text-white/55">Leitung · Trattoria Lago</p>
          </div>
          <div className="relative flex h-12 w-28 items-center justify-center">
            <motion.span
              className="absolute flex size-10 items-center justify-center rounded-full border-2 border-night-2 bg-role-kitchen text-[11px] font-semibold text-night"
              animate={{ x: swapped ? 30 : -30, scale: swapped ? 0.82 : 1, opacity: swapped ? 0.5 : 1, zIndex: swapped ? 0 : 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              LK
            </motion.span>
            <motion.span
              className="absolute flex size-10 items-center justify-center rounded-full border-2 border-night-2 bg-role-lead text-[11px] font-semibold text-night"
              animate={{ x: swapped ? -30 : 30, scale: swapped ? 1 : 0.82, opacity: phase >= 2 ? 1 : 0.35, zIndex: swapped ? 1 : 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              NR
            </motion.span>
            <ArrowLeftRight className="absolute -bottom-1 size-3.5 text-white/40" />
          </div>
        </div>
        <ol className="relative mt-4 space-y-3 pl-7">
          <span className="absolute bottom-2 left-[9px] top-2 w-px bg-white/10" />
          <motion.span className="absolute left-[9px] top-2 w-px origin-top bg-brand-300" initial={false} animate={{ height: `${Math.min(phase, 3) * 33}%` }} transition={{ duration: 0.6, ease: EASE }} />
          {SWAP_STEPS.map((s, i) => {
            const reached = phase > i
            return (
              <li key={s} className="relative flex items-center text-[12.5px]">
                <motion.span
                  className="absolute -left-7 flex size-[19px] items-center justify-center rounded-full border"
                  initial={false}
                  animate={{ backgroundColor: reached ? 'rgb(45 212 191)' : 'rgb(10 23 21)', borderColor: reached ? 'rgb(45 212 191)' : 'rgb(255 255 255 / 0.2)' }}
                  transition={{ duration: 0.4 }}
                >
                  {reached ? <Check className="size-3 text-night" strokeWidth={3} /> : <CircleAlert className="size-3 text-white/25" />}
                </motion.span>
                <motion.span initial={false} animate={{ opacity: reached ? 1 : 0.4 }} className={reached ? 'text-white' : 'text-white/60'}>{s}</motion.span>
              </li>
            )
          })}
        </ol>
      </Frame>
    </div>
  )
}
