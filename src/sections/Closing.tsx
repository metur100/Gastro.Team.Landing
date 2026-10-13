import { useId, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Check, Mail, Plus } from 'lucide-react'
import { SectionHeading } from '../components/Layout'
import { CONTACT_EMAIL, REGISTER_URL } from '../config'
import { Counter, EASE, Magnetic, Reveal, SpotlightCard, WordRise } from '../lib/motion'

const PLANS = [
  { name: 'Starter', price: 19, info: 'Für kleine Teams', items: ['1 Standort', 'Bis 5 aktive Mitarbeitende', 'Schichtplanung mit Prüfung', 'Urlaubsanträge'], featured: false },
  { name: 'Team', price: 39, info: 'Für die meisten Betriebe', items: ['1 Standort', 'Bis 15 aktive Mitarbeitende', 'Alles aus Starter', 'Schichttausch & Verfügbarkeiten', 'Auswertungen & CSV-Export', 'E-Mail-Benachrichtigungen'], featured: true },
  { name: 'Business', price: 79, info: 'Für mehrere Standorte', items: ['Bis 5 Standorte', 'Bis 40 aktive Mitarbeitende', 'Alles aus Team', 'Individuelle Rechte für Leitungen'], featured: false },
]

export function Pricing() {
  return (
    <section id="preise" aria-labelledby="preise-title" className="relative bg-paper px-5 pb-28 pt-8 sm:px-6 sm:pb-36">
      <SectionHeading id="preise" eyebrow="Preise" title="Faire Preise." accent="Pro Betrieb, nicht pro Kopf." accentBreak intro="Testen Sie 30 Tage lang alle Business-Funktionen – ohne Zahlungsdaten. Danach wählen Sie den passenden Tarif." />
      <div className="mx-auto mt-16 grid max-w-6xl items-stretch gap-5 sm:mt-20 lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className={p.featured ? 'lg:-my-4' : ''}>
            <SpotlightCard
              glow={p.featured ? 'rgb(94 234 212 / 0.16)' : 'rgb(20 184 166 / 0.10)'}
              className={`h-full rounded-[1.8rem] ${p.featured ? 'beam-border bg-night text-white shadow-glow' : 'border border-line bg-surface shadow-card'}`}
            >
              <div className="flex h-full flex-col p-8 sm:p-9">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  {p.featured && <span className="rounded-full bg-brand-400/15 px-3 py-1 text-xs font-semibold text-brand-300">Empfohlen</span>}
                </div>
                <p className={`text-sm ${p.featured ? 'text-mist' : 'text-ink-muted'}`}>{p.info}</p>
                <p className="mt-8 flex items-baseline gap-1.5">
                  <Counter to={p.price} suffix=" €" className="text-6xl font-semibold tracking-[-0.05em]" />
                  <span className={p.featured ? 'text-mist' : 'text-ink-muted'}>/ Monat</span>
                </p>
                <p className={`mt-1 text-xs ${p.featured ? 'text-white/40' : 'text-ink-faint'}`}>je Betrieb, zzgl. gesetzlicher MwSt.</p>
                <ul className="mt-8 flex-1 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[15px]">
                      <Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? 'text-brand-300' : 'text-brand-700'}`} strokeWidth={3} aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={REGISTER_URL}
                  className={`group mt-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-center font-semibold transition-colors ${
                    p.featured ? 'bg-white text-night hover:bg-brand-100' : 'border border-line-strong hover:border-ink hover:bg-ink hover:text-white'
                  }`}
                >
                  Kostenlos testen
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </a>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-faint">Die Abrechnung wird vor dem Ende der Testphase eingerichtet. Vertragsbedingungen und Kündigungsfristen sehen Sie vor der Buchung.</p>
    </section>
  )
}

const FAQS = [
  { q: 'Wie funktioniert die Testphase?', a: 'Nach der Registrierung nutzen Sie GastroTeam 30 Tage lang mit allen Business-Funktionen. Es werden keine Zahlungsdaten abgefragt.' },
  { q: 'Müssen meine Mitarbeitenden etwas installieren?', a: 'Nein. GastroTeam läuft im Browser auf jedem Smartphone, Tablet und Computer. Die native App für iOS und Android ist in Vorbereitung.' },
  { q: 'Kann ich mehrere Standorte verwalten?', a: 'Ja. Im Tarif Business planen Sie bis zu fünf Standorte. Leitungen sehen und planen nur die Standorte, für die sie zuständig sind.' },
  { q: 'Prüft GastroTeam das Arbeitszeitgesetz?', a: 'GastroTeam weist auf Ruhezeiten, Pausen, Tages- und Wochenhöchstarbeitszeiten hin. Die Werte sind einstellbar. Die Hinweise sind eine Planungshilfe und ersetzen keine rechtliche Prüfung Ihrer Arbeitszeitregeln.' },
  { q: 'Wo werden meine Daten gespeichert?', a: 'Angaben zum Hosting, zu Auftragsverarbeitern und zu Ihren Rechten finden Sie in der Datenschutzerklärung.' },
  { q: 'Erfasst GastroTeam die tatsächliche Arbeitszeit?', a: 'Aktuell plant GastroTeam Schichten und wertet geplante Stunden aus. Eine Zeiterfassung ist für eine spätere Version vorgesehen.' },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface px-5 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq" align="left" eyebrow="FAQ" title="Häufige" accent="Fragen." />
          <Reveal delay={0.2} className="mt-10 rounded-3xl border border-line bg-paper p-6">
            <Mail className="size-5 text-brand-700" aria-hidden />
            <p className="mt-3 font-semibold">Noch etwas offen?</p>
            <p className="mt-1 text-sm text-ink-muted">Schreiben Sie uns – wir antworten persönlich.</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-sm font-semibold text-brand-700 underline decoration-brand-700/30 underline-offset-4 hover:decoration-brand-700">
              {CONTACT_EMAIL}
            </a>
          </Reveal>
        </div>
        <ul className="border-t border-line">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={`${base}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold tracking-tight sm:text-xl"
                  >
                    <span className="transition-colors group-hover:text-brand-700">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? 'rgb(5 13 12)' : 'rgb(245 243 237)', color: isOpen ? '#fff' : 'rgb(17 16 13)' }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full"
                    >
                      <Plus className="size-4" aria-hidden />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${base}-a${i}`}
                      role="region"
                      aria-labelledby={`${base}-q${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-ink-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgb(45 212 191 / 0.22), transparent 60%)`
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.1])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }
  return (
    <section ref={ref} onPointerMove={onMove} aria-labelledby="cta-title" className="grain relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-night px-5 py-32 text-center text-white sm:px-6 sm:py-44">
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines" />
      <motion.div
        aria-hidden
        style={{ scale: ringScale, rotate: ringRotate }}
        className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] [mask-image:radial-gradient(circle,black_35%,transparent_68%)] [background:conic-gradient(from_0deg,transparent,rgb(45_212_191/0.12),transparent_30%,rgb(246_169_69/0.10),transparent_60%)]"
      />
      <div className="relative z-[2] mx-auto max-w-4xl">
        <WordRise
          id="cta-title"
          className="text-[2.75rem] font-semibold leading-[1] tracking-[-0.045em] text-balance sm:text-7xl lg:text-8xl"
          segments={[{ text: 'Ihr nächster Schichtplan.', br: true }, { text: 'In 15 Minuten.', className: 'font-display text-aurora pr-[0.06em]' }]}
        />
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-mist">Registrieren, Team einladen, ersten Plan veröffentlichen – kostenlos und unverbindlich.</p>
        </Reveal>
        <Reveal delay={0.45} className="mt-12 flex flex-col items-center gap-6">
          <Magnetic strength={0.35}>
            <a href={REGISTER_URL} className="group relative inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-8 pr-2.5 text-lg font-semibold text-night shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_30px_80px_-20px_rgb(94_234_212/0.7)]">
              <span className="relative">30 Tage kostenlos testen</span>
              <span className="relative flex size-11 items-center justify-center rounded-full bg-night text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                <ArrowRight className="size-5" aria-hidden />
              </span>
            </a>
          </Magnetic>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            {['Keine Zahlungsdaten', 'Alle Funktionen', 'Auf Deutsch'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-brand-300" aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
