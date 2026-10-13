import { useRef, useState, type ComponentType } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { SectionHeading } from '../components/Layout'
import { scrollToY } from '../lib/hooks'
import { EASE, Reveal } from '../lib/motion'
import { CheckVisual, PlanVisual, PublishVisual, SwapVisual } from './ChapterVisuals'

const CHAPTERS: { title: string; text: string; points: string[]; Visual: ComponentType }[] = [
  {
    title: 'Planen',
    text: 'Die Woche nach Mitarbeitenden, Stationen oder als Tagesansicht. Schichten per Drag & Drop verschieben, Tage und ganze Wochen kopieren – auch Spätschichten über Mitternacht.',
    points: ['Drag & Drop mit Tastatur-Alternative', 'Woche kopieren in einem Schritt', 'Offene Schichten für Einspringer'],
    Visual: PlanVisual,
  },
  {
    title: 'Prüfen',
    text: 'Bevor etwas rausgeht, prüft GastroTeam den Plan: Überschneidungen, Ruhezeiten, Pausen, Urlaub, Verfügbarkeit und Mehrstunden. Fehler blockieren, Warnungen bestätigen Sie bewusst.',
    points: ['Fehler, Warnungen und Hinweise getrennt', 'Grenzwerte pro Betrieb einstellbar', 'Live-Prüfung beim Bearbeiten'],
    Visual: CheckVisual,
  },
  {
    title: 'Veröffentlichen',
    text: 'Ein Klick, und Ihr Team sieht den Plan. Jede betroffene Person wird benachrichtigt – bei späteren Änderungen nur die, die es wirklich betrifft.',
    points: ['Einzelne Schichten oder ganze Woche', 'Benachrichtigung in App und per E-Mail', 'Entwürfe bleiben unsichtbar'],
    Visual: PublishVisual,
  },
  {
    title: 'Tauschen',
    text: 'Mitarbeitende bieten Schichten an oder fragen gezielt Kolleginnen und Kollegen. Sie geben frei – der Plan aktualisiert sich von selbst, ohne Telefonkette.',
    points: ['Gezielte oder offene Tauschanfragen', 'Freigabe durch die Leitung', 'Alle Beteiligten werden benachrichtigt'],
    Visual: SwapVisual,
  },
]

export function Chapters() {
  return (
    <section id="funktionen" aria-labelledby="funktionen-title" className="grain relative z-10 -mt-10 rounded-t-[2.5rem] bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[2.5rem]">
        <div className="absolute -left-40 top-40 h-[600px] w-[600px] rounded-full bg-brand-600/20 blur-[140px]" />
        <div className="absolute -right-40 top-[40%] h-[500px] w-[500px] rounded-full bg-ember-500/10 blur-[140px]" />
      </div>
      <div className="relative z-[2] px-5 pt-28 sm:px-6 sm:pt-36">
        <SectionHeading
          id="funktionen"
          dark
          eyebrow="Funktionen"
          title="Vom ersten Entwurf bis zur"
          accent="Push-Nachricht."
          intro="Vier Schritte, ein Werkzeug. Gebaut für den Rhythmus der Gastronomie: kurzfristige Ausfälle, wechselnde Besetzung und Schichten bis nach Mitternacht."
        />
      </div>
      <PinnedChapters />
      <StackedChapters />
    </section>
  )
}

function PinnedChapters() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(CHAPTERS.length - 1, Math.max(0, Math.floor(v * CHAPTERS.length)))))

  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const travel = el.offsetHeight - window.innerHeight
    scrollToY(top + travel * ((i + 0.15) / CHAPTERS.length))
  }
  const Visual = CHAPTERS[active].Visual

  return (
    <div ref={ref} className="relative hidden h-[440vh] lg:block">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[0.85fr_1.15fr] items-center gap-16 px-6">
          <ol className="space-y-2">
            {CHAPTERS.map((c, i) => (
              <ChapterItem key={c.title} index={i} active={active === i} chapter={c} progress={scrollYProgress} onSelect={() => jump(i)} />
            ))}
          </ol>
          <div className="relative h-[min(480px,62svh)]" aria-hidden>
            <div className="absolute -inset-10 rounded-[3rem] bg-brand-400/[0.07] blur-3xl" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, scale: 0.97, filter: 'blur(10px)' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Visual />
              </motion.div>
            </AnimatePresence>
            <p className="absolute -bottom-10 right-0 font-mono text-xs text-white/30">
              0{active + 1} / 0{CHAPTERS.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChapterItem({ index, active, chapter, progress, onSelect }: { index: number; active: boolean; chapter: (typeof CHAPTERS)[number]; progress: MotionValue<number>; onSelect: () => void }) {
  const n = CHAPTERS.length
  const fill = useTransform(progress, [index / n, (index + 1) / n], [0, 1])
  return (
    <li className="relative">
      <button type="button" onClick={onSelect} aria-current={active ? 'step' : undefined} className="group w-full rounded-2xl py-4 pl-6 text-left">
        <span className="absolute bottom-3 left-0 top-3 w-px bg-white/10" />
        <motion.span style={{ scaleY: fill }} className="absolute bottom-3 left-0 top-3 w-px origin-top bg-brand-300" />
        <span className="flex items-baseline gap-4">
          <span className={`font-mono text-sm transition-colors duration-500 ${active ? 'text-brand-300' : 'text-white/30'}`}>0{index + 1}</span>
          <span className={`text-3xl font-semibold tracking-[-0.03em] transition-colors duration-500 xl:text-4xl ${active ? 'text-white' : 'text-white/30 group-hover:text-white/55'}`}>{chapter.title}</span>
        </span>
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="overflow-hidden pl-9"
            >
              <p className="pt-3 text-[15px] leading-relaxed text-mist">{chapter.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {chapter.points.map((p) => (
                  <li key={p} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">{p}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </li>
  )
}

function StackedChapters() {
  return (
    <div className="mx-auto max-w-2xl space-y-20 px-5 pb-28 pt-16 sm:px-6 lg:hidden">
      {CHAPTERS.map(({ title, text, points, Visual }, i) => (
        <Reveal key={title}>
          <p className="font-mono text-sm text-brand-300">0{i + 1}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">{title}</h3>
          <p className="mt-3 leading-relaxed text-mist">{text}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {points.map((p) => (
              <li key={p} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">{p}</li>
            ))}
          </ul>
          <div className="mt-8 h-[340px] sm:h-[400px]" aria-hidden>
            <Visual />
          </div>
        </Reveal>
      ))}
    </div>
  )
}
