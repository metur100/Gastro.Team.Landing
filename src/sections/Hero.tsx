import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowLeftRight, Check, CircleAlert, Plane } from 'lucide-react'
import { REGISTER_URL } from '../config'
import { usePhases, usePrefersReducedMotion } from '../lib/hooks'
import { EASE, Magnetic, WordRise } from '../lib/motion'
import { DEMO_CYCLE, DEMO_FINAL, DEMO_TIMES, HeroBoard, HeroPhone, HeroToast } from './HeroBoard'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()
  const inView = useInView(stageRef, { margin: '0px 0px -15% 0px' })
  const phase = usePhases(DEMO_TIMES, DEMO_CYCLE, inView, DEMO_FINAL)

  // Copy drifts up and fades while the board takes over.
  const { scrollYProgress: heroP } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(heroP, [0, 0.45], [0, -120])
  const copyOpacity = useTransform(heroP, [0, 0.32], [1, 0])
  const glowScale = useTransform(heroP, [0, 0.6], [1, 1.35])

  // Board tilts back like a table top and lays flat as it scrolls into view.
  const { scrollYProgress: stageP } = useScroll({ target: stageRef, offset: ['start end', 'center 0.55'] })
  const smoothStage = useSpring(stageP, { stiffness: 90, damping: 24, mass: 0.6 })
  const tiltX = useTransform(smoothStage, [0, 1], [34, 0])
  const scale = useTransform(smoothStage, [0, 1], [0.84, 1])
  const lift = useTransform(smoothStage, [0, 1], [60, 0])

  // Pointer: background spotlight and a slight extra tilt on desktop.
  const mx = useMotionValue(50)
  const my = useMotionValue(35)
  const px = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })
  const py = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })
  const rotateX = useTransform([tiltX, py], ([t, p]: number[]) => t + p * -4)
  const rotateY = useTransform(px, (p) => p * 5)
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mx}% ${my}%, rgb(45 212 191 / 0.10), transparent 60%)`
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    mx.set(nx * 100)
    my.set(ny * 100)
    px.set(nx - 0.5)
    py.set(ny - 0.5)
  }

  // Floating cards drift at different speeds for depth.
  const floatA = useTransform(stageP, [0, 1], [140, -30])
  const floatB = useTransform(stageP, [0, 1], [220, -10])
  const floatC = useTransform(stageP, [0, 1], [90, -60])
  const phoneY = useTransform(stageP, [0, 1], [160, -10])

  return (
    <section ref={sectionRef} onPointerMove={onPointerMove} className="grain relative isolate overflow-hidden bg-night text-white" aria-labelledby="hero-title">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ scale: glowScale }} className="absolute inset-0">
          <div className="absolute left-1/2 top-[-18%] h-[70vh] w-[90vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[120px] animate-drift" />
          <div className="absolute right-[-10%] top-[10%] h-[50vh] w-[45vw] rounded-full bg-ember-500/15 blur-[130px] animate-drift-slow" />
          <div className="absolute left-[-12%] top-[35%] h-[45vh] w-[40vw] rounded-full bg-brand-700/30 blur-[120px] animate-drift-slow" />
        </motion.div>
        <div className="absolute inset-0 grid-lines" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        {/* Eclipse horizon the board rises out of */}
        <div className="absolute left-1/2 top-[min(78vh,760px)] h-[2400px] w-[2400px] -translate-x-1/2 rounded-full border-t border-brand-300/35 bg-night shadow-[0_-30px_120px_-10px_rgb(45_212_191/0.45),inset_0_40px_80px_-40px_rgb(45_212_191/0.25)] sm:top-[min(74vh,720px)]" />
      </div>

      {/* Copy */}
      <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }} className="relative z-[2] mx-auto max-w-5xl px-5 pt-32 text-center sm:px-6 sm:pt-36">
        <motion.a
          href="#funktionen"
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3.5 text-[13px] text-white/75 backdrop-blur transition-colors hover:border-white/20 hover:text-white"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          <span className="relative flex items-center gap-1.5 rounded-full bg-brand-400/15 px-2.5 py-0.5 font-medium text-brand-300">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-brand-300 animate-ping-soft" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-300" />
            </span>
            Neu
          </span>
          <span className="sm:hidden">Tausch &amp; Urlaub in der App</span>
          <span className="hidden sm:inline">Schichttausch &amp; Urlaub direkt in der App</span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </motion.a>

        <WordRise
          as="h1"
          id="hero-title"
          className="mx-auto mt-8 max-w-4xl text-[2.85rem] font-semibold leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl lg:text-[5.75rem]"
          delay={0.2}
          stagger={0.07}
          segments={[
            { text: 'Planen Sie Ihren Service.', br: true },
            { text: 'Nicht das Chaos.', className: 'font-display text-aurora pr-[0.06em] text-[1.08em] tracking-[-0.02em]' },
          ]}
        />

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-mist text-pretty sm:text-xl"
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.75, ease: EASE }}
        >
          GastroTeam bringt Schichtplan, Team, Urlaub und Schichttausch an einen Ort. Sie planen die Woche in Minuten – Ihr Team sieht seine Schichten sofort auf dem Handy.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
        >
          <Magnetic>
            <a href={REGISTER_URL} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-semibold text-night shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_20px_50px_-15px_rgb(94_234_212/0.6)]">
              <span className="relative z-[1]">30 Tage kostenlos testen</span>
              <span className="relative z-[1] flex size-9 items-center justify-center rounded-full bg-night text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                <ArrowRight className="size-4" aria-hidden />
              </span>
              <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-100 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </Magnetic>
          <a href="#so-funktionierts" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-[15px] font-medium text-white/85 backdrop-blur transition-colors hover:border-white/30 hover:text-white">
            So funktioniert's
          </a>
        </motion.div>

        <motion.ul
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {['Keine Kreditkarte nötig', 'Alle Funktionen in der Testphase', 'Auf Deutsch, für den Gastro-Alltag'].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-brand-300" aria-hidden />
              {t}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Product stage */}
      <div ref={stageRef} className="relative z-[3] mx-auto mt-14 px-3 pb-24 sm:mt-16 sm:px-6 sm:pb-36" style={{ perspective: 1600 }} aria-hidden>
        <motion.div
          className="mx-auto max-w-[1000px]"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
        >
          <motion.div style={reduce ? undefined : { rotateX, rotateY, scale, y: lift, transformOrigin: '50% 0%' }} className="relative">
            <div aria-hidden className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-brand-400/10 blur-3xl" />
            <HeroBoard phase={phase} />
            <div className="absolute -bottom-6 right-3 z-30 w-[min(280px,85%)] sm:right-6 min-[1460px]:hidden">
              <HeroToast phase={phase} />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating context cards and phone, in the side gutters of wide screens */}
        <motion.div style={{ y: floatA, right: 'calc(50% + 472px)' }} className="absolute top-[8%] hidden min-[1460px]:block">
          <FloatCard icon={<Plane className="size-4" />} tone="brand" title="Urlaub genehmigt" text="Lea K. · 20.–24. Okt." />
        </motion.div>
        <motion.div style={{ y: floatB, right: 'calc(50% + 484px)' }} className="absolute top-[36%] hidden min-[1460px]:block">
          <FloatCard icon={<CircleAlert className="size-4" />} tone="ember" title="Ruhezeit-Hinweis" text="Mia S. · 10 Std. (Mi → Do)" />
        </motion.div>
        <motion.div style={{ y: floatC, right: 'calc(50% + 466px)' }} className="absolute top-[64%] hidden min-[1460px]:block">
          <FloatCard icon={<ArrowLeftRight className="size-4" />} tone="lead" title="Tausch angenommen" text="Noah übernimmt Fr 16–23" />
        </motion.div>
        <motion.div style={{ y: phoneY, left: 'calc(50% + 516px)' }} className="absolute bottom-20 hidden origin-top-left scale-[0.92] min-[1460px]:block">
          <HeroPhone phase={phase} />
        </motion.div>
      </div>
    </section>
  )
}

function FloatCard({ icon, title, text, tone }: { icon: ReactNode; title: string; text: string; tone: 'brand' | 'ember' | 'lead' }) {
  const tones = {
    brand: 'bg-brand-400/15 text-brand-300',
    ember: 'bg-ember-400/15 text-ember-300',
    lead: 'bg-[#7aa2ff]/15 text-[#a9c1ff]',
  }
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-night-3/70 py-3 pl-3 pr-5 text-left shadow-[0_30px_60px_-25px_rgb(0_0_0/0.8)] backdrop-blur-xl">
      <span className={`flex size-9 items-center justify-center rounded-xl ${tones[tone]}`}>{icon}</span>
      <div>
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-xs text-white/55">{text}</p>
      </div>
    </div>
  )
}
