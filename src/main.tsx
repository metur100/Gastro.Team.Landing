import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeftRight, BarChart3, Bell, Building2, CalendarDays, Check, ChevronDown, Clock, MessageCircleX, Phone, Plane, ShieldCheck, Smartphone,
  Table2, UserPlus, Users,
} from 'lucide-react'
import { Footer, Header, Section } from './components/Layout'
import { ScheduleMockup } from './components/Mockup'
import { REGISTER_URL } from './config'
import './index.css'

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-14 sm:pb-24 sm:px-6 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-brand-50/80 to-transparent" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface px-3 py-1 text-sm font-medium text-brand-800">
            Für Restaurants, Cafés, Bars und Bäckereien
          </p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Schluss mit Dienstplan-Chaos in der WhatsApp-Gruppe.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted text-pretty">
            GastroTeam bringt Schichtplan, Mitarbeiter, Urlaubsanträge und Schichttausch an einen Ort. Sie planen die Woche in Minuten – Ihr Team sieht seine Schichten sofort auf dem Handy.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={REGISTER_URL} className="rounded-md bg-brand-700 px-6 py-3.5 text-center text-base font-semibold text-white shadow-card hover:bg-brand-800">
              30 Tage kostenlos testen
            </a>
            <a href="#funktionen" className="rounded-md border border-line-strong bg-surface px-6 py-3.5 text-center text-base font-semibold hover:bg-subtle">
              Funktionen ansehen
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            {['Keine Kreditkarte nötig', 'Alle Funktionen in der Testphase', 'Auf Deutsch, für den Gastro-Alltag'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-brand-700" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <ScheduleMockup />
      </div>
    </section>
  )
}

const PROBLEMS = [
  { icon: MessageCircleX, title: 'Der Plan geht im Chat unter', text: 'Ein Foto vom Dienstplan in der Gruppe, drei Korrekturen später weiß niemand mehr, was gilt.' },
  { icon: Table2, title: 'Excel kennt keine Ruhezeiten', text: 'Doppelt eingeplant, Urlaub übersehen, zu viele Stunden – Fehler fallen erst auf, wenn es zu spät ist.' },
  { icon: Phone, title: 'Telefonketten am Freitagabend', text: 'Wer kann einspringen? Bis alle zurückrufen, ist die Schicht schon vorbei.' },
]

function Problem() {
  return (
    <Section eyebrow="Kennen Sie das?" title="Planung, die mehr Zeit kostet als sie spart" intro="Viele Betriebe organisieren ihr Team noch mit Chatgruppen, Tabellen und Zetteln am Kühlschrank.">
      <div className="grid gap-5 md:grid-cols-3">
        {PROBLEMS.map((p) => (
          <div key={p.title} className="rounded-xl border border-line bg-surface p-6 shadow-card">
            <p.icon className="size-6 text-ink-faint" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-ink-muted">{p.text}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium">
        GastroTeam ersetzt das mit <span className="text-brand-700">einem</span> verbindlichen Plan, den alle sehen – und der Konflikte meldet, bevor sie zum Problem werden.
      </p>
    </Section>
  )
}

const FEATURES = [
  { icon: CalendarDays, title: 'Schichtplan per Drag & Drop', text: 'Wochenansicht nach Mitarbeitenden oder Stationen. Schichten verschieben, kopieren und mit einem Klick veröffentlichen.' },
  { icon: ShieldCheck, title: 'Automatische Prüfung', text: 'Hinweise bei Überschneidungen, kurzen Ruhezeiten, fehlenden Pausen, Urlaub, Verfügbarkeit und Mehrstunden – vor dem Veröffentlichen.' },
  { icon: Users, title: 'Mitarbeiter & Einladungen', text: 'Stammdaten, Vertragsstunden und Standorte an einem Ort. Einladung per E-Mail oder Link – auch per Messenger teilbar.' },
  { icon: Clock, title: 'Verfügbarkeiten', text: 'Ihr Team hinterlegt, wann es arbeiten kann. Im Planer sehen Sie es direkt neben jeder Zeile.' },
  { icon: Plane, title: 'Urlaubsanträge mit Freigabe', text: 'Anträge mit einem Tipp stellen. Sie sehen Konflikte mit geplanten Schichten, bevor Sie genehmigen.' },
  { icon: ArrowLeftRight, title: 'Schichttausch', text: 'Mitarbeitende bieten Schichten an, Kolleginnen und Kollegen übernehmen. Sie behalten mit der Freigabe die Kontrolle.' },
  { icon: Bell, title: 'Benachrichtigungen', text: 'Neue Pläne, Änderungen, Anträge und Tauschanfragen landen automatisch bei den richtigen Personen.' },
  { icon: BarChart3, title: 'Auswertungen & CSV-Export', text: 'Geplante Stunden je Person und Standort, Besetzung, offene Schichten und Abwesenheiten – exportierbar für die Lohnvorbereitung.' },
  { icon: Building2, title: 'Mehrere Standorte & Rollen', text: 'Leitungen sehen nur ihre Standorte. Rechte für Planung, Freigaben und Auswertungen lassen sich einzeln vergeben.' },
]

function Features() {
  return (
    <Section id="funktionen" eyebrow="Funktionen" title="Alles, was Ihr Team im Alltag braucht" intro="Gebaut für den Rhythmus der Gastronomie: Spätschichten über Mitternacht, kurzfristige Ausfälle und wechselnde Besetzung." className="bg-surface">
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title}>
            <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <f.icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-ink-muted">{f.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 flex flex-col items-start gap-4 rounded-xl border border-line bg-canvas p-6 sm:flex-row sm:items-center">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
          <Smartphone className="size-6" aria-hidden />
        </span>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Mobile App für Mitarbeitende</h3>
          <p className="mt-1 text-ink-muted">Schichten, Verfügbarkeit, Urlaub und Schichttausch in der App für iOS und Android. Die App befindet sich in Vorbereitung für die App Stores – bis dahin funktioniert GastroTeam im Browser jedes Smartphones.</p>
        </div>
      </div>
    </Section>
  )
}

const STEPS = [
  { icon: Building2, title: 'Betrieb anlegen', text: 'Registrieren, Standort und Öffnungszeiten eintragen – in wenigen Minuten erledigt.' },
  { icon: UserPlus, title: 'Team einladen', text: 'Mitarbeitende anlegen und per E-Mail oder Link einladen.' },
  { icon: CalendarDays, title: 'Planen & veröffentlichen', text: 'Woche planen, Hinweise prüfen und den Plan veröffentlichen.' },
  { icon: Smartphone, title: 'Alle sind informiert', text: 'Ihr Team sieht seine Schichten sofort und wird über Änderungen benachrichtigt.' },
]

function HowItWorks() {
  return (
    <Section id="so-funktionierts" eyebrow="So funktioniert's" title="In vier Schritten zum ersten Schichtplan">
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative rounded-xl border border-line bg-surface p-6 shadow-card">
            <span className="text-sm font-semibold text-brand-700">Schritt {i + 1}</span>
            <s.icon className="mt-3 size-6 text-ink" aria-hidden />
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-ink-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Roles() {
  const cols = [
    { title: 'Für Inhaber und Leitungen', items: ['Wochenplan in Minuten statt Stunden', 'Konflikte und Mehrstunden auf einen Blick', 'Anträge und Tausch zentral freigeben', 'Geplante Stunden für die Lohnvorbereitung exportieren', 'Mehrere Standorte mit eigenen Zuständigkeiten'] },
    { title: 'Für Mitarbeitende', items: ['Eigene Schichten immer aktuell auf dem Handy', 'Verfügbarkeit selbst eintragen', 'Urlaub mit einem Tipp beantragen', 'Schichten tauschen ohne Telefonkette', 'Benachrichtigung bei jeder Änderung'] },
  ]
  return (
    <Section title="Für alle im Team gemacht" className="bg-surface">
      <div className="grid gap-5 md:grid-cols-2">
        {cols.map((c) => (
          <div key={c.title} className="rounded-xl border border-line bg-canvas p-8">
            <h3 className="text-xl font-semibold">{c.title}</h3>
            <ul className="mt-5 space-y-3">
              {c.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

const PLANS = [
  { name: 'Starter', price: 19, info: 'Für kleine Teams', items: ['1 Standort', 'Bis 5 aktive Mitarbeitende', 'Schichtplanung mit Prüfung', 'Urlaubsanträge'], recommended: false },
  { name: 'Team', price: 39, info: 'Für die meisten Betriebe', items: ['1 Standort', 'Bis 15 aktive Mitarbeitende', 'Alles aus Starter', 'Schichttausch & Verfügbarkeiten', 'Auswertungen & CSV-Export', 'E-Mail-Benachrichtigungen'], recommended: true },
  { name: 'Business', price: 79, info: 'Für mehrere Standorte', items: ['Bis 5 Standorte', 'Bis 40 aktive Mitarbeitende', 'Alles aus Team', 'Individuelle Rechte für Leitungen'], recommended: false },
]

function Pricing() {
  return (
    <Section id="preise" eyebrow="Preise" title="Faire Preise pro Betrieb" intro="Testen Sie 30 Tage lang alle Business-Funktionen. Danach wählen Sie den passenden Tarif.">
      <div className="grid gap-5 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.name} className={`relative flex flex-col rounded-xl border bg-surface p-8 shadow-card ${p.recommended ? 'border-brand-600 ring-1 ring-brand-600' : 'border-line'}`}>
            {p.recommended && <span className="absolute -top-3 left-8 rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white">Empfohlen</span>}
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-sm text-ink-muted">{p.info}</p>
            <p className="mt-6">
              <span className="text-4xl font-extrabold tracking-tight">{p.price} €</span>
              <span className="text-ink-muted"> / Monat</span>
            </p>
            <p className="text-xs text-ink-faint">je Betrieb, zzgl. gesetzlicher MwSt.</p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.items.map((it) => (
                <li key={it} className="flex gap-3 text-sm">
                  <Check className="size-5 shrink-0 text-brand-700" aria-hidden />
                  {it}
                </li>
              ))}
            </ul>
            <a
              href={REGISTER_URL}
              className={`mt-8 rounded-md px-4 py-3 text-center font-semibold ${p.recommended ? 'bg-brand-700 text-white hover:bg-brand-800' : 'border border-line-strong hover:bg-subtle'}`}
            >
              Kostenlos testen
            </a>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-ink-faint">Die Abrechnung wird vor dem Ende der Testphase eingerichtet. Vertragsbedingungen und Kündigungsfristen sehen Sie vor der Buchung.</p>
    </Section>
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

function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Häufige Fragen" className="bg-surface">
      <div className="mx-auto max-w-3xl divide-y divide-line rounded-xl border border-line bg-canvas">
        {FAQS.map((f) => (
          <details key={f.q} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown className="size-5 shrink-0 text-ink-faint transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="mt-3 text-ink-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}

function Cta() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-brand-900 px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Ihr nächster Schichtplan in 15 Minuten</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">Registrieren Sie sich, laden Sie Ihr Team ein und veröffentlichen Sie den ersten Plan – kostenlos und unverbindlich.</p>
        <a href={REGISTER_URL} className="mt-8 inline-block rounded-md bg-white px-6 py-3.5 font-semibold text-brand-900 hover:bg-brand-50">
          Jetzt kostenlos testen
        </a>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Roles />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
