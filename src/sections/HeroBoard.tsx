import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Bell, Check, CircleAlert, LoaderCircle, Send } from 'lucide-react'
import { EASE } from '../lib/motion'

/**
 * Scripted product demo for the hero (illustrative, not a screenshot):
 * 0 idle → 1 cursor to open shift → 2 grab → 3 drag to Mia → 4 drop → 5 cursor to publish → 6 publishing → 7 published.
 */
export const DEMO_TIMES = [1400, 2300, 2750, 3750, 4700, 5600, 6500] as const
export const DEMO_CYCLE = 11000
export const DEMO_FINAL = DEMO_TIMES.length

const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'] as const
/** On phones only Tue, Fri and Sat are shown so the cards stay readable. */
const phoneHidden = (d: number) => (d === 0 || d === 2 || d === 3 ? 'hidden sm:block' : '')

type Role = 'kitchen' | 'service' | 'lead' | 'bar'
const ROLE: Record<Role, { label: string; color: string }> = {
  kitchen: { label: 'Küche', color: 'var(--color-role-kitchen)' },
  service: { label: 'Service', color: 'var(--color-role-service)' },
  lead: { label: 'Leitung', color: 'var(--color-role-lead)' },
  bar: { label: 'Bar', color: 'var(--color-role-bar)' },
}

const ROWS: { name: string; initials: string; hours: [string, string]; shifts: Partial<Record<number, { time: string; role: Role; draft?: boolean }>> }[] = [
  { name: 'Lea K.', initials: 'LK', hours: ['30 / 38', '30 / 38'], shifts: { 1: { time: '10–18', role: 'kitchen' }, 3: { time: '10–18', role: 'kitchen' }, 5: { time: '15–23', role: 'kitchen' } } },
  { name: 'Mia S.', initials: 'MS', hours: ['24 / 30', '30 / 30'], shifts: { 1: { time: '11–17', role: 'service' }, 2: { time: '17–23', role: 'service' }, 4: { time: '17–23', role: 'service', draft: true } } },
  { name: 'Noah R.', initials: 'NR', hours: ['20 / 40', '20 / 40'], shifts: { 2: { time: '16–23', role: 'lead' }, 5: { time: '16–23', role: 'lead' } } },
  { name: 'Sofia H.', initials: 'SH', hours: ['9 / 20', '9 / 20'], shifts: { 3: { time: '19–01', role: 'bar' }, 4: { time: '19–01', role: 'bar' } } },
]

type Box = { x: number; y: number; w: number; h: number }

function offsetWithin(el: HTMLElement, root: HTMLElement): Box {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

function ShiftChip({ time, role, draft }: { time: string; role: Role; draft?: boolean }) {
  const r = ROLE[role]
  return (
    <div
      className={`flex h-full overflow-hidden rounded-md border text-left ${draft ? 'border-dashed border-white/25' : 'border-white/[0.07]'}`}
      style={{ background: `color-mix(in oklab, ${r.color} 14%, transparent)` }}
    >
      <span className="w-[3px] shrink-0" style={{ background: r.color }} />
      <div className="min-w-0 px-1.5 py-1 leading-tight">
        <div className="font-semibold text-white">{time}</div>
        <div className="truncate text-white/55">{draft ? 'Entwurf' : r.label}</div>
      </div>
    </div>
  )
}

export function HeroBoard({ phase }: { phase: number }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const openRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const publishRef = useRef<HTMLSpanElement>(null)
  const [boxes, setBoxes] = useState<{ root: Box; open: Box; target: Box; publish: Box } | null>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const measure = () => {
      if (!openRef.current || !targetRef.current || !publishRef.current) return
      setBoxes({
        root: { x: 0, y: 0, w: root.offsetWidth, h: root.offsetHeight },
        open: offsetWithin(openRef.current, root),
        target: offsetWithin(targetRef.current, root),
        publish: offsetWithin(publishRef.current, root),
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    return () => ro.disconnect()
  }, [])

  const moved = phase >= 3
  const assigned = phase >= 4
  const publishing = phase === 6
  const published = phase >= 7
  const chipBox = boxes ? (moved ? boxes.target : boxes.open) : null
  const center = (b: Box) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 })
  const cursor = !boxes
    ? { x: 0, y: 0 }
    : phase === 0
      ? { x: boxes.root.w * 0.78, y: boxes.root.h * 0.95 }
      : phase <= 2
        ? center(boxes.open)
        : phase <= 4
          ? center(boxes.target)
          : center(boxes.publish)
  const pressed = phase === 2 || phase === 3 || phase === 6

  return (
    <div ref={rootRef} className="relative overflow-hidden rounded-2xl border border-white/10 bg-night-2/90 text-[10.5px] text-white shadow-glow backdrop-blur-xl sm:text-[11px]">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-3 py-2.5 sm:px-4">
        <div className="hidden gap-1.5 sm:flex" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold sm:text-[13px]">Schichtplan · KW 42</p>
          <p className="truncate text-white/45">Trattoria Lago · Mitte</p>
        </div>
        <div className="ml-auto hidden rounded-full bg-white/[0.06] p-0.5 md:flex">
          {['Mitarbeitende', 'Stationen', 'Tag'].map((t, i) => (
            <span key={t} className={`rounded-full px-2.5 py-1 ${i === 0 ? 'bg-white/10 text-white' : 'text-white/45'}`}>{t}</span>
          ))}
        </div>
        <motion.span
          ref={publishRef}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold md:ml-2"
          animate={{
            backgroundColor: published ? 'rgb(45 212 191 / 0.16)' : 'rgb(20 184 166 / 1)',
            color: published ? 'rgb(94 234 212)' : 'rgb(5 13 12)',
            scale: phase === 6 ? 0.94 : 1,
          }}
          transition={{ duration: 0.35 }}
        >
          {published ? <Check className="size-3.5" /> : publishing ? <LoaderCircle className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
          {published ? 'Veröffentlicht' : publishing ? 'Wird veröffentlicht' : 'Veröffentlichen'}
        </motion.span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] sm:grid-cols-[120px_repeat(6,minmax(0,1fr))]">
        <div className="border-b border-white/[0.07] px-3 py-2 text-white/40">Team</div>
        {DAYS.map((d, i) => (
          <div key={d} className={`border-b border-l border-white/[0.07] px-2 py-2 font-semibold ${phoneHidden(i)} ${i === 0 ? 'text-white/30' : 'text-white/80'}`}>
            {d} <span className="font-normal text-white/35">{12 + i}.</span>
          </div>
        ))}

        <div className="flex h-[50px] items-center gap-1.5 border-b border-white/[0.07] px-3 font-medium text-ember-300 sm:h-[54px]">
          <CircleAlert className="size-3.5" aria-hidden /> Offen
        </div>
        {DAYS.map((d, i) => (
          <div key={d} ref={i === 5 ? openRef : undefined} className={`h-[50px] border-b border-l border-white/[0.07] p-1 sm:h-[54px] ${phoneHidden(i)} ${i === 0 ? 'bg-white/[0.025]' : ''}`}>
            {i === 0 && <span className="block px-1 py-1 text-white/30">Ruhetag</span>}
          </div>
        ))}

        {ROWS.map((r, ri) => (
          <div key={r.name} className="contents">
            <div className="flex h-[50px] items-center gap-2 border-b border-white/[0.07] px-2 sm:h-[54px] sm:px-3">
              <span className="hidden size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[9px] font-semibold sm:flex">{r.initials}</span>
              <div className="min-w-0 leading-tight">
                <div className="truncate font-medium">{r.name}</div>
                <motion.div
                  key={assigned && ri === 1 ? 'after' : 'before'}
                  initial={{ color: ri === 1 && assigned ? 'rgb(94 234 212)' : 'rgb(255 255 255 / 0.4)' }}
                  animate={{ color: 'rgb(255 255 255 / 0.4)' }}
                  transition={{ duration: 1.6 }}
                  className="truncate"
                >
                  {assigned ? r.hours[1] : r.hours[0]} Std.
                </motion.div>
              </div>
            </div>
            {DAYS.map((d, di) => {
              const s = r.shifts[di]
              const isTarget = ri === 1 && di === 5
              return (
                <div
                  key={d}
                  ref={isTarget ? targetRef : undefined}
                  className={`relative h-[50px] border-b border-l border-white/[0.07] p-1 sm:h-[54px] ${phoneHidden(di)} ${di === 0 ? 'bg-white/[0.025]' : ''}`}
                >
                  {s && (
                    <motion.div
                      className="h-full"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + (ri * 6 + di) * 0.025, duration: 0.5, ease: EASE }}
                    >
                      <ShiftChip {...s} />
                    </motion.div>
                  )}
                  {isTarget && (
                    <motion.div
                      className="pointer-events-none absolute inset-1 rounded-md border border-dashed border-brand-300"
                      animate={{ opacity: phase === 2 || phase === 3 ? 1 : 0, backgroundColor: phase === 3 ? 'rgb(94 234 212 / 0.10)' : 'rgb(94 234 212 / 0)' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {/* The open shift that gets dragged onto Mia */}
        {chipBox && (
          <motion.div
            className="absolute z-10"
            initial={false}
            animate={{
              left: chipBox.x + 4,
              top: chipBox.y + 4,
              width: chipBox.w - 8,
              height: chipBox.h - 8,
              scale: phase === 2 || phase === 3 ? 1.06 : 1,
              rotate: phase === 3 ? -2 : 0,
              boxShadow: phase === 2 || phase === 3 ? '0 18px 40px -12px rgb(0 0 0 / 0.7)' : '0 0 0 0 rgb(0 0 0 / 0)',
            }}
            transition={{ duration: phase === 3 ? 0.85 : 0.4, ease: EASE }}
          >
            {assigned ? (
              <motion.div className="h-full" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
                <ShiftChip time="17–23" role="service" />
              </motion.div>
            ) : (
              <div className="flex h-full flex-col justify-center rounded-md border border-dashed border-ember-400/60 bg-ember-500/10 px-1.5 leading-tight">
                <div className="font-semibold text-ember-300">17–23</div>
                <div className="truncate text-ember-300/70">Unbesetzt</div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Status line */}
      <div className="flex h-10 items-center px-3 sm:px-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={published ? 'published' : assigned ? 'ok' : 'open'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className={`flex items-center gap-2 ${published || assigned ? 'text-brand-300' : 'text-ember-300'}`}
          >
            {published ? <Bell className="size-3.5" /> : assigned ? <Check className="size-3.5" /> : <CircleAlert className="size-3.5" />}
            {published ? '4 Mitarbeitende benachrichtigt' : assigned ? 'Alle Schichten besetzt · keine Konflikte' : '1 offene Schicht · Sa 17–23 Service'}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Multiplayer-style cursor */}
      {boxes && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 size-5"
          initial={false}
          animate={{ x: cursor.x - 3, y: cursor.y - 2, opacity: published ? 0 : 1 }}
          transition={{ duration: phase === 3 ? 0.85 : 0.75, ease: EASE }}
        >
          <motion.svg width="18" height="20" viewBox="0 0 18 20" animate={{ scale: pressed ? 0.82 : 1 }} transition={{ duration: 0.2 }}>
            <path d="M2 1.5 16 9.2l-6.3 1.6-3 6.6L2 1.5Z" fill="#fff" stroke="#050d0c" strokeWidth="1.4" strokeLinejoin="round" />
          </motion.svg>
          {/* The label flips to the left near the right edge so it never gets clipped. */}
          <span
            className={`absolute top-4 hidden whitespace-nowrap rounded-full bg-ember-400 px-2 py-0.5 text-[10px] font-semibold text-night sm:inline-block ${
              cursor.x > boxes.root.w * 0.7 ? 'right-4 rounded-tr-sm' : 'left-4 rounded-tl-sm'
            }`}
          >
            Anna · Inhaberin
          </span>
        </motion.div>
      )}
    </div>
  )
}

/** Phone that receives the push notification once the plan is published. */
export function HeroPhone({ phase }: { phase: number }) {
  const published = phase >= 7
  return (
    <div className="w-[208px] rounded-[2.2rem] border border-white/15 bg-gradient-to-b from-night-3 to-night p-2 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
      <div className="relative h-[400px] overflow-hidden rounded-[1.75rem] bg-paper px-3.5 pt-9 text-ink">
        <div className="absolute left-1/2 top-2.5 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-night" />
        <AnimatePresence>
          {published && (
            <motion.div
              initial={{ y: -90, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="absolute inset-x-2 top-8 z-10 rounded-2xl border border-white/60 bg-white/85 p-2.5 shadow-float backdrop-blur"
            >
              <div className="flex items-center gap-1.5 text-[9px] text-ink-faint">
                <span className="flex size-3.5 items-center justify-center rounded bg-brand-600 text-[7px] font-bold text-white">G</span>
                GASTROTEAM · jetzt
              </div>
              <p className="mt-1 text-[11px] font-semibold">Neuer Schichtplan KW 42</p>
              <p className="text-[10px] text-ink-muted">Sa 17:00–23:00 · Service</p>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-faint">Heute · Di</p>
        <p className="text-base font-semibold tracking-tight">Hallo Mia</p>
        <div className="mt-3 rounded-2xl bg-night p-3 text-white">
          <p className="text-[9px] text-white/50">Meine nächste Schicht</p>
          <p className="mt-0.5 text-lg font-semibold tracking-tight">11:00–17:00</p>
          <p className="text-[10px] text-white/60">Service · Trattoria Lago</p>
        </div>
        <p className="mt-4 text-[9px] font-semibold uppercase tracking-wider text-ink-faint">Diese Woche</p>
        <div className="mt-1.5 space-y-1.5 text-[10px]">
          {[
            ['Mi', '17:00–23:00', 'Service'],
            ['Fr', '17:00–23:00', 'Entwurf'],
          ].map(([d, t, r]) => (
            <div key={d} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-2.5 py-2">
              <span className="w-5 font-semibold">{d}</span>
              <span className="flex-1">{t}</span>
              <span className="text-ink-faint">{r}</span>
            </div>
          ))}
          <AnimatePresence>
            {published && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 rounded-xl border border-brand-300 bg-brand-50 px-2.5 py-2">
                  <span className="w-5 font-semibold">Sa</span>
                  <span className="flex-1">17:00–23:00</span>
                  <span className="font-medium text-brand-700">Neu</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-surface/90 px-3 pb-4 pt-2 text-[8px] text-ink-faint">
          {['Heute', 'Schichten', 'Anfragen', 'Profil'].map((t, i) => (
            <span key={t} className={i === 0 ? 'font-semibold text-brand-700' : ''}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Push notification shown at the board's edge on screens too narrow for the phone. */
export function HeroToast({ phase }: { phase: number }) {
  return (
    <AnimatePresence>
      {phase >= 7 && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 p-3 text-ink shadow-float backdrop-blur"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white"><Bell className="size-4" /></span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold">Neuer Schichtplan KW 42</p>
            <p className="truncate text-[11px] text-ink-muted">An Mia S. · Sa 17:00–23:00</p>
          </div>
          <span className="ml-auto self-start text-[10px] text-ink-faint">jetzt</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
