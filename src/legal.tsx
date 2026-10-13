import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { Footer, Header } from './components/Layout'
import { CONTACT_EMAIL } from './config'
import './index.css'

function Placeholder() {
  return (
    <div role="note" className="mb-10 rounded-2xl border border-ember-700/30 bg-ember-50 px-5 py-4 text-ember-700">
      <p className="font-semibold">Platzhalter</p>
      <p className="mt-1 text-sm">Dieser Text ist eine Vorlage und muss vor der Veröffentlichung durch rechtlich geprüfte Angaben des Betreibers ersetzt werden.</p>
    </div>
  )
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-10 text-xl font-semibold">{children}</h2>
}

function Impressum() {
  return (
    <>
      <Placeholder />
      <H2>Angaben gemäß § 5 DDG</H2>
      <p className="mt-3 text-ink-muted">[Firmenname und Rechtsform]<br />[Straße und Hausnummer]<br />[PLZ und Ort]</p>
      <H2>Vertreten durch</H2>
      <p className="mt-3 text-ink-muted">[Name der vertretungsberechtigten Person]</p>
      <H2>Kontakt</H2>
      <p className="mt-3 text-ink-muted">E-Mail: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><br />Telefon: [Telefonnummer]</p>
      <H2>Registereintrag</H2>
      <p className="mt-3 text-ink-muted">[Registergericht und Registernummer, falls vorhanden]</p>
      <H2>Umsatzsteuer-ID</H2>
      <p className="mt-3 text-ink-muted">[USt-IdNr. gemäß § 27a UStG, falls vorhanden]</p>
      <H2>Verantwortlich für den Inhalt</H2>
      <p className="mt-3 text-ink-muted">[Name und Anschrift]</p>
      <H2>Verbraucherstreitbeilegung</H2>
      <p className="mt-3 text-ink-muted">[Angabe zur Teilnahme an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle]</p>
    </>
  )
}

function Datenschutz() {
  return (
    <>
      <Placeholder />
      <H2>1. Verantwortlicher</H2>
      <p className="mt-3 text-ink-muted">[Name, Anschrift und Kontaktdaten des Verantwortlichen; ggf. Datenschutzbeauftragte/r]</p>
      <H2>2. Hosting dieser Website</H2>
      <p className="mt-3 text-ink-muted">[Angaben zum Hosting-Anbieter dieser Seite, Art der verarbeiteten Daten (z. B. Server-Logfiles), Rechtsgrundlage und Speicherdauer]</p>
      <H2>3. Einbindung von Schriftarten</H2>
      <p className="mt-3 text-ink-muted">Diese Website verwendet Schriftarten, die zusammen mit der Website vom selben Server ausgeliefert werden. Beim Aufruf werden dafür keine Daten an Dritte (z. B. Google Fonts) übertragen.</p>
      <H2>4. Nutzung der Anwendung GastroTeam</H2>
      <p className="mt-3 text-ink-muted">[Kategorien personenbezogener Daten (Konto-, Mitarbeiter-, Planungsdaten), Zwecke, Rechtsgrundlagen, Auftragsverarbeitung für Kundenbetriebe, Speicherort und Speicherdauer]</p>
      <H2>5. Empfänger und Auftragsverarbeiter</H2>
      <p className="mt-3 text-ink-muted">[Liste der Unterauftragsverarbeiter, z. B. Hosting von Anwendung und Datenbank, E-Mail-Versand, Push-Dienste]</p>
      <H2>6. Ihre Rechte</H2>
      <p className="mt-3 text-ink-muted">[Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Beschwerderecht bei einer Aufsichtsbehörde]</p>
      <H2>7. Kontakt zum Datenschutz</H2>
      <p className="mt-3 text-ink-muted">E-Mail: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    </>
  )
}

const page = document.getElementById('root')!.dataset.page
const title = page === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header home={false} />
    <div className="grain relative overflow-hidden bg-night px-4 pb-20 pt-36 text-white sm:px-6 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="relative z-[2] mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Rechtliches</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1>
      </div>
    </div>
    <main id="inhalt" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper px-4 pb-24 pt-14 sm:px-6">
      <div className="mx-auto max-w-3xl">{page === 'impressum' ? <Impressum /> : <Datenschutz />}</div>
    </main>
    <Footer />
  </StrictMode>,
)
