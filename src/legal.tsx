import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { Footer, Header } from './components/Layout'
import {
  APP_URL,
  CONTACT_EMAIL,
  DATENSCHUTZ,
  EDITORIAL_EMAIL,
  IMPRESSUM,
  KONTO_LOESCHEN,
  OPERATOR,
  SUPPORT,
  SUPPORT_EMAIL,
} from './config'
import './index.css'

const STAND = '02.11.2026'

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 text-xl font-semibold first:mt-0">{children}</h2>
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 font-semibold">{children}</h3>
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 leading-relaxed text-ink-muted">{children}</p>
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-muted">{children}</ul>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a className="font-medium text-brand-700 underline decoration-brand-700/30 underline-offset-4 hover:decoration-brand-700" href={href} {...(external ? { rel: 'noopener' } : {})}>
      {children}
    </a>
  )
}

function Mail({ to }: { to: string }) {
  return <A href={`mailto:${to}`}>{to}</A>
}

function Address() {
  return (
    <p className="mt-3 leading-relaxed text-ink-muted">
      {OPERATOR.name}
      <br />
      {OPERATOR.business}
      <br />
      {OPERATOR.street}
      <br />
      {OPERATOR.city}
      <br />
      {OPERATOR.country}
    </p>
  )
}

function Impressum() {
  return (
    <>
      <H2>Anbieter</H2>
      <Address />
      <P>Die App GastroTeam wird von Medin Turkes · Certi Development entwickelt.</P>
      <H2>Kontakt</H2>
      <P>
        Telefon: {OPERATOR.phone}
        <br />
        E-Mail: <Mail to={CONTACT_EMAIL} />
        <br />
        Support zur App: <Mail to={SUPPORT_EMAIL} /> (siehe <A href={SUPPORT}>Hilfe &amp; Kontakt</A>)
      </P>
      <H2>Umsatzsteuer</H2>
      <P>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: {OPERATOR.vatId}</P>
      <H2>Verantwortlich für journalistisch-redaktionelle Inhalte (§ 18 Abs. 2 MStV)</H2>
      <P>
        {OPERATOR.name}, {OPERATOR.street}, {OPERATOR.city}, {OPERATOR.country}, E-Mail: <Mail to={EDITORIAL_EMAIL} />
      </P>
      <H2>Verbraucherstreitbeilegung</H2>
      <P>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 Verbraucherstreitbeilegungsgesetz).</P>
      <H2>Haftung für Inhalte und Links</H2>
      <P>
        Wir erstellen die Inhalte dieser Website mit Sorgfalt, übernehmen aber keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität. Für Inhalte externer
        Websites, auf die wir verlinken, ist stets der jeweilige Anbieter verantwortlich. Hinweise auf rechtswidrige Inhalte nehmen wir per E-Mail entgegen und
        entfernen betroffene Inhalte bzw. Links nach Kenntnis umgehend. Dienstpläne, Mitarbeiterdaten und Notizen in GastroTeam werden von den jeweiligen Betrieben
        eingegeben, die dafür verantwortlich sind.
      </P>
      <H2>Urheberrecht und Lizenzen</H2>
      <P>
        Texte, Grafiken und das Logo von GastroTeam unterliegen dem Urheberrecht. Die Schriftarten Geist und Instrument Serif werden lokal von diesem Server
        ausgeliefert und stehen unter der SIL Open Font License 1.1.
      </P>
    </>
  )
}

function Datenschutz() {
  return (
    <>
      <H2>1. Das Wichtigste in Kürze</H2>
      <UL>
        <li>GastroTeam ist ein Werkzeug zur Schichtplanung für Gastronomiebetriebe. Wir verarbeiten die Daten, die dafür nötig sind: Konto, Dienstplan, Verfügbarkeiten, Abwesenheiten und Schichttausch.</li>
        <li>Keine Werbung, keine Analyse- oder Tracking-Tools, keine Tracking-Cookies – weder auf dieser Website noch in der Web-App oder den Apps.</li>
        <li>Anwendungsserver und Datenbank werden in Rechenzentren in der EU betrieben; E-Mails versenden wir über einen Mailserver in Deutschland.</li>
        <li>Ihr Konto können Sie jederzeit selbst in der App oder der Web-App löschen (siehe <A href={KONTO_LOESCHEN}>Konto löschen</A>).</li>
      </UL>

      <H2>2. Verantwortlicher</H2>
      <Address />
      <P>
        Telefon: {OPERATOR.phone}
        <br />
        E-Mail: <Mail to={CONTACT_EMAIL} />
      </P>
      <P>
        Ein Datenschutzbeauftragter ist nicht benannt, da hierzu keine gesetzliche Pflicht besteht (Art. 37 DSGVO, § 38 BDSG): Mit der Verarbeitung
        personenbezogener Daten sind bei uns weniger als 20 Personen ständig beschäftigt, und unsere Kerntätigkeit besteht weder in einer umfangreichen
        Überwachung noch in der umfangreichen Verarbeitung besonderer Kategorien personenbezogener Daten.
      </P>

      <H2>3. Wer ist wofür verantwortlich?</H2>
      <P>
        Wir sind Verantwortlicher für diese Website, für die Benutzerkonten (Anmeldedaten), für Support-Anfragen und für technische Protokolle.
      </P>
      <P>
        Der jeweilige Betrieb (Restaurant, Café, Bar usw.) ist Verantwortlicher für die Daten seiner Mitarbeitenden, also für Mitarbeiterprofile, Dienstpläne,
        Verfügbarkeiten, Abwesenheiten und Schichttausch. Diese Daten verarbeiten wir als Auftragsverarbeiter im Auftrag des Betriebs (Art. 28 DSGVO). Möchten
        Sie als Mitarbeiterin oder Mitarbeiter Rechte bezüglich dieser Daten geltend machen, wenden Sie sich bitte an Ihren Betrieb; Anfragen, die uns erreichen,
        leiten wir an ihn weiter und unterstützen ihn bei der Bearbeitung.
      </P>

      <H2>4. Besuch dieser Website</H2>
      <P>
        Diese Website wird über GitHub Pages bereitgestellt, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim
        Aufruf verarbeitet GitHub technisch notwendige Daten (insbesondere IP-Adresse, Zeitpunkt, aufgerufene Adresse, Browser- und Geräteinformationen), um die
        Seiten auszuliefern und den Dienst abzusichern. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren Bereitstellung (Art. 6 Abs. 1 lit. f
        DSGVO). Weitere Informationen: <A href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement">Datenschutzerklärung von GitHub</A>.
      </P>
      <P>Diese Website setzt keine Cookies, speichert nichts in Ihrem Browser und lädt keine Inhalte von Drittanbietern; Schriftarten werden lokal ausgeliefert.</P>

      <H2>5. Nutzung von GastroTeam (Web-App und Apps)</H2>
      <P>
        GastroTeam besteht aus der Web-App (<A href={APP_URL}>{APP_URL.replace('https://', '')}</A>), den Apps für Android und iOS und einem Anwendungsserver.
        Betriebe registrieren sich in der Web-App; Mitarbeitende werden von ihrem Betrieb per Einladungslink eingeladen und legen dabei ihr Konto an.
      </P>
      <H3>a) Benutzerkonto und Anmeldung (wir sind Verantwortlicher)</H3>
      <UL>
        <li><strong>Kontodaten:</strong> Vor- und Nachname, E-Mail-Adresse, Passwort (ausschließlich als Hash), bevorzugte Sprache, Zeitpunkt der Registrierung, der E-Mail-Bestätigung und der letzten Anmeldung;</li>
        <li><strong>Schutz vor Angriffen:</strong> Wir zählen fehlgeschlagene Anmeldungen und sperren das Konto nach fünf Fehlversuchen für 15 Minuten;</li>
        <li><strong>Sitzungen:</strong> ein Zugriffstoken (15 Minuten gültig) und ein Aktualisierungstoken (bis zu 14 Tage, Sitzung höchstens 30 Tage), von dem wir nur einen Hash speichern – zusammen mit IP-Adresse und Browser- bzw. App-Kennung der Anmeldung, um Sitzungen nachvollziehen und missbräuchlich verwendete Sitzungen beenden zu können. Die Web-App hält das Aktualisierungstoken in einem technisch notwendigen, nur für den Server lesbaren Cookie (HttpOnly); die Apps speichern es verschlüsselt im Schlüsselbund (iOS) bzw. Android Keystore (§ 25 Abs. 2 Nr. 2 TDDDG);</li>
        <li><strong>Mitgliedschaften:</strong> Betrieb, Rolle (Inhaber:in, Leitung, Mitarbeiter:in), Berechtigungen und zugeordnete Standorte.</li>
      </UL>
      <P>
        Rechtsgrundlage ist der Vertrag über die Nutzung von GastroTeam (Art. 6 Abs. 1 lit. b DSGVO), für Sicherheitsmaßnahmen zusätzlich unser berechtigtes
        Interesse an einem sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Wir versenden E-Mails zur Bestätigung der E-Mail-Adresse und zum Zurücksetzen des
        Passworts.
      </P>
      <H3>b) Betriebs- und Planungsdaten (im Auftrag des Betriebs)</H3>
      <UL>
        <li><strong>Betrieb:</strong> Name, Kontakt-E-Mail, Telefonnummer, Standorte mit Anschrift und Öffnungszeiten, Rollen (z. B. Service, Küche), Planungsregeln sowie Tarif und Testzeitraum (es werden keine Zahlungsdaten verarbeitet);</li>
        <li><strong>Mitarbeiterprofil:</strong> Vor- und Nachname, E-Mail-Adresse, optional Telefonnummer, Rolle, Standorte, Status, vertragliche Wochenstunden, Beginn und Ende der Beschäftigung, Sprache sowie eine interne Notiz der Leitung;</li>
        <li><strong>Dienstplan:</strong> Schichten mit Datum, Uhrzeit, Pause, Standort, Rolle und Notiz, Veröffentlichungen des Plans und daraus berechnete geplante Stunden;</li>
        <li><strong>Verfügbarkeiten:</strong> wöchentliche Zeiten (verfügbar, bevorzugt, nicht verfügbar) und einzelne nicht verfügbare Tage mit optionaler Notiz;</li>
        <li><strong>Abwesenheiten:</strong> Urlaub, Fortbildung, unbezahlter Urlaub, Krankmeldung oder Sonstiges mit Zeitraum, optionaler Notiz und Entscheidung der Leitung. Bei Krankmeldungen werden nur die Tage gespeichert; bitte geben Sie keine Diagnosen an;</li>
        <li><strong>Schichttausch:</strong> angebotene Schicht, beteiligte Kolleg:innen, optionale Nachricht, Status und Entscheidung;</li>
        <li><strong>Benachrichtigungen</strong> in der App zu neuen Plänen, Änderungen und Entscheidungen sowie – je nach Tarif – eine E-Mail dazu;</li>
        <li><strong>Änderungsprotokoll:</strong> wichtige Aktionen (z. B. Veröffentlichung eines Plans, Entscheidungen über Anträge, Änderungen an Mitarbeitenden und Einstellungen) mit Zeitpunkt, Benutzerkennung und IP-Adresse, damit der Betrieb Änderungen nachvollziehen kann.</li>
      </UL>
      <P>
        Der Betrieb verarbeitet diese Daten zur Durchführung des Beschäftigungsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO i. V. m. § 26 BDSG; bei Krankmeldungen
        Art. 9 Abs. 2 lit. b DSGVO). Welche Mitarbeitenden welche Daten sehen, legt der Betrieb fest: Mitarbeitende sehen ihre eigenen Daten und – je nach
        Einstellung – die Schichten ihrer Kolleg:innen; Leitungen sehen die Daten der Standorte, für die sie zuständig sind.
      </P>

      <H2>6. Die Apps für Android und iOS</H2>
      <UL>
        <li><strong>Auf dem Gerät:</strong> Die App speichert das Aktualisierungstoken und den zuletzt gewählten Betrieb verschlüsselt im Schlüsselbund bzw. Android Keystore. Beim Abmelden werden sie gelöscht.</li>
        <li><strong>Push-Mitteilungen:</strong> Erst wenn Sie in der App „Push-Mitteilungen aktivieren“ antippen und zustimmen, fragt die App das Betriebssystem nach einer Gerätekennung für Push-Nachrichten und überträgt sie an unseren Server. Mitteilungen werden dann über den Push-Dienst von Expo (650 Industries, Inc., USA) sowie Apple bzw. Google an Ihr Gerät zugestellt. In der aktuellen App-Version ist dieser Dienst noch nicht eingerichtet; es werden keine Gerätekennungen übertragen. Beim Abmelden und beim Löschen des Kontos wird die Kennung entfernt. Rechtsgrundlage: Art. 6 Abs. 1 lit. a und b DSGVO.</li>
        <li><strong>Keine weiteren Zugriffe:</strong> Die Apps verwenden weder Standort noch Kamera, Mikrofon, Kontakte oder Fotos.</li>
        <li><strong>Keine Werbung, keine Analyse:</strong> Die Apps enthalten keine Werbe- oder Analyse-SDKs und nutzen keine Werbe-ID.</li>
        <li><strong>App-Stores:</strong> Beim Herunterladen über Google Play (Google Ireland Limited) oder den App Store (Apple Distribution International Ltd.) verarbeiten diese Anbieter Daten in eigener Verantwortung.</li>
      </UL>

      <H2>7. Web-App im Browser</H2>
      <P>
        Die Dateien der Web-App werden ebenfalls über GitHub Pages ausgeliefert (siehe Abschnitt 4). Die Web-App speichert den zuletzt gewählten Betrieb und
        Standort im lokalen Speicher (localStorage) Ihres Browsers; diese Angaben verlassen Ihr Gerät nicht (§ 25 Abs. 2 Nr. 2 TDDDG). Das Zugriffstoken liegt nur
        im Arbeitsspeicher.
      </P>
      <P>
        Die Web-App lädt die Schriftart „Inter“ von Google Fonts (Google LLC). Dabei werden Ihre IP-Adresse, die aufgerufene Adresse und Browserinformationen an
        Server von Google übertragen; nach Angaben von Google werden dabei keine Cookies gesetzt und die Daten nicht zur Profilbildung oder für Werbung genutzt
        (<A href="https://developers.google.com/fonts/faq/privacy">Google Fonts FAQ</A>). Rechtsgrundlage ist unser berechtigtes Interesse an einer einheitlichen
        Darstellung (Art. 6 Abs. 1 lit. f DSGVO). Diese Website und die Apps laden keine Schriftarten von Google.
      </P>

      <H2>8. Server, E-Mail-Versand und Protokolle</H2>
      <P>
        Der Anwendungsserver (gastroteam.runasp.net) und die Datenbank liegen bei MonsterASP.NET (siehe Abschnitt 10). Beim Zugriff verarbeitet der
        Hosting-Anbieter technisch notwendige Verbindungsdaten (IP-Adresse, Zeitpunkt, aufgerufene Adresse, Statuscode, Browser- bzw. App-Kennung) für den
        sicheren Betrieb und die Abwehr von Angriffen (Art. 6 Abs. 1 lit. f DSGVO). Nach der{' '}
        <A href="https://www.monsterasp.net/Privacy/">Datenschutzerklärung des Anbieters</A> werden Server-Protokolle höchstens 6 Monate, Sicherheits- und
        Angriffserkennungsprotokolle höchstens 12 Monate gespeichert. Zur Begrenzung von Anfragen wertet unser Server die IP-Adresse kurzzeitig im
        Arbeitsspeicher aus.
      </P>
      <P>
        E-Mails (Bestätigung der E-Mail-Adresse, Passwort zurücksetzen, Einladungen, Benachrichtigungen) versenden wir über den Mailserver der netcup GmbH mit
        dem Absender noreply@gentlegroup.de. Wir messen nicht, ob E-Mails geöffnet oder Links darin angeklickt werden.
      </P>

      <H2>9. Kontakt und Support</H2>
      <P>
        Wenn Sie uns per E-Mail schreiben, verarbeiten wir Ihre E-Mail-Adresse, Ihren Namen und den Inhalt Ihrer Nachricht, um die Anfrage zu beantworten
        (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO). Das Postfach {CONTACT_EMAIL} wird bei der netcup GmbH betrieben, das Support-Postfach {SUPPORT_EMAIL} bei
        Google (Gmail).
      </P>

      <H2>10. Empfänger und Auftragsverarbeiter</H2>
      <P>Wir geben Daten nur weiter, soweit es für GastroTeam erforderlich ist. Dienstleister, die in unserem Auftrag tätig sind, sind nach Art. 28 DSGVO gebunden.</P>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm text-ink-muted">
          <thead>
            <tr className="border-b border-line text-ink">
              <th className="py-2 pr-4 font-semibold">Empfänger</th>
              <th className="py-2 pr-4 font-semibold">Zweck</th>
              <th className="py-2 font-semibold">Ort</th>
            </tr>
          </thead>
          <tbody className="align-top">
            <tr className="border-b border-line">
              <td className="py-2 pr-4">Ihr Betrieb und – je nach Rolle und Einstellung – Ihre Kolleg:innen</td>
              <td className="py-2 pr-4">Dienstplanung, Anträge und Freigaben</td>
              <td className="py-2">–</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">MonsterASP.NET s.r.o., Jičínská 226/17, 130 00 Prag, Tschechien</td>
              <td className="py-2 pr-4">Hosting von Anwendungsserver und Datenbank, Datensicherungen; Auftragsverarbeitung gemäß den <A href="https://www.monsterasp.net/Terms/">Nutzungsbedingungen</A> des Anbieters (Ziff. 8.2)</td>
              <td className="py-2">EU</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">netcup GmbH, Emmy-Noether-Straße 10, 76131 Karlsruhe</td>
              <td className="py-2 pr-4">Versand von E-Mails; Postfach {CONTACT_EMAIL}</td>
              <td className="py-2">Deutschland</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">GitHub, Inc., San Francisco, USA</td>
              <td className="py-2 pr-4">Bereitstellung dieser Website und der Dateien der Web-App (GitHub Pages)</td>
              <td className="py-2">USA – EU-US Data Privacy Framework</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">Google LLC (Google Fonts), Google Ireland Limited (Gmail)</td>
              <td className="py-2 pr-4">Schriftart der Web-App; Support-Postfach</td>
              <td className="py-2">EU/USA – EU-US Data Privacy Framework</td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-4">650 Industries, Inc. (Expo), Palo Alto, USA</td>
              <td className="py-2 pr-4">Zustellung von Push-Mitteilungen – erst nach Einrichtung und Ihrer Zustimmung</td>
              <td className="py-2">USA – EU-US Data Privacy Framework</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Google Ireland Limited (Google Play), Apple Distribution International Ltd. (App Store)</td>
              <td className="py-2 pr-4">Vertrieb der Apps – in eigener Verantwortung</td>
              <td className="py-2">Irland, ggf. USA</td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        Einen Zahlungsdienstleister setzen wir nicht ein. Darüber hinaus geben wir Daten nur weiter, wenn wir gesetzlich dazu verpflichtet sind (Art. 6 Abs. 1
        lit. c DSGVO).
      </P>

      <H2>11. Übermittlung in Drittländer</H2>
      <P>
        Soweit Dienstleister ihren Sitz in den USA haben oder Daten dorthin übermitteln können (GitHub, Google, Expo), erfolgt dies auf Grundlage des
        Angemessenheitsbeschlusses zum EU-US Data Privacy Framework (Art. 45 DSGVO), sofern der Anbieter zertifiziert ist, und ergänzend auf Grundlage von
        EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
      </P>

      <H2>12. Speicherdauer</H2>
      <UL>
        <li><strong>Benutzerkonto:</strong> bis Sie es löschen. Dabei werden Name, E-Mail-Adresse, Passwort und Geräte-Kennungen sofort entfernt bzw. anonymisiert und Ihre Benachrichtigungen gelöscht (siehe <A href={KONTO_LOESCHEN}>Konto löschen</A>).</li>
        <li><strong>Planungsdaten</strong> (Schichten, Abwesenheiten, Verfügbarkeiten, Schichttausch): solange der Betrieb sie benötigt bzw. bis zur Löschung des Betriebs; nach dem Löschen eines Kontos oder dem Anonymisieren eines Mitarbeiterprofils bleiben sie ohne Namen und Kontaktdaten für die Auswertungen des Betriebs erhalten.</li>
        <li><strong>Sitzungsdaten und Änderungsprotokoll</strong> (einschließlich IP-Adresse): derzeit für die Dauer des Betriebskontos; eine automatische frühere Löschung ist in Vorbereitung. Auf Anfrage löschen wir sie früher, soweit sie nicht mehr erforderlich sind.</li>
        <li><strong>Server-Protokolle beim Hosting-Anbieter:</strong> höchstens 6 Monate, Sicherheitsprotokolle höchstens 12 Monate.</li>
        <li><strong>Datensicherungen:</strong> Gelöschte Daten können noch bis zu 21 Tage in Backups des Hosting-Anbieters enthalten sein (<A href="https://www.monsterasp.net/Terms/">Nutzungsbedingungen des Anbieters</A>, Ziff. 7.3).</li>
        <li><strong>Support-Anfragen:</strong> bis zur abschließenden Bearbeitung, sofern keine gesetzliche Aufbewahrungspflicht besteht.</li>
      </UL>

      <H2>13. Datensicherheit</H2>
      <P>
        Wir schützen Ihre Daten unter anderem durch verschlüsselte Übertragung (HTTPS), die Speicherung von Passwörtern und Tokens ausschließlich als Hash, eine
        strikte Trennung der Daten der einzelnen Betriebe, rollen- und standortbezogene Berechtigungen und die vorübergehende Kontosperre nach Fehlversuchen.
      </P>

      <H2>14. Ihre Rechte</H2>
      <P>
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
        Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO). Eine Kopie Ihrer Daten können
        Sie in der Web-App unter „Profil &amp; Datenschutz“ selbst herunterladen. Erteilte Einwilligungen (z. B. für Push-Mitteilungen) können Sie jederzeit in den
        Systemeinstellungen Ihres Geräts widerrufen. Wenden Sie sich für alles Weitere an <Mail to={CONTACT_EMAIL} />; bei Planungsdaten bitte an Ihren Betrieb.
      </P>
      <P>
        Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO), etwa bei der für uns zuständigen{' '}
        <A href="https://www.ldi.nrw.de/">Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</A>.
      </P>

      <H2>15. Änderungen</H2>
      <P>Wir passen diese Erklärung an, wenn sich GastroTeam oder die rechtlichen Anforderungen ändern. Es gilt die jeweils hier veröffentlichte Fassung.</P>
    </>
  )
}

function KontoLoeschen() {
  return (
    <>
      <P>
        Auf dieser Seite erfahren Sie, wie Sie Ihr GastroTeam-Konto löschen, welche Daten dabei gelöscht werden und welche Daten aus welchem Grund erhalten
        bleiben. Das gilt für die Apps für Android und iOS und für die Web-App.
      </P>

      <H2>In der App löschen</H2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-ink-muted">
        <li>Melden Sie sich in der GastroTeam-App an.</li>
        <li>Öffnen Sie den Tab <strong>Profil</strong> und tippen Sie unter „Konto“ auf <strong>Konto löschen</strong>.</li>
        <li>Bestätigen Sie mit Ihrem Passwort. Das Konto wird sofort gelöscht und Sie werden abgemeldet.</li>
      </ol>
      <P>In der Web-App finden Sie dieselbe Funktion unter „Profil &amp; Datenschutz“. Dort können Sie vorher auch eine Kopie Ihrer Daten herunterladen.</P>

      <H2>Per E-Mail löschen lassen</H2>
      <P>
        Sie kommen nicht mehr in Ihr Konto? Schreiben Sie von der E-Mail-Adresse, mit der Ihr Konto registriert ist, an <Mail to={CONTACT_EMAIL} /> mit dem
        Betreff „Kontolöschung GastroTeam“. Zu Ihrem Schutz können wir vor der Löschung eine Bestätigung Ihrer Identität anfordern. Wir bearbeiten Anträge
        unverzüglich, spätestens innerhalb eines Monats (Art. 12 Abs. 3 DSGVO), und bestätigen die Löschung per E-Mail.
      </P>

      <H2>Inhaber:innen eines Betriebs</H2>
      <P>
        Sind Sie alleinige:r Inhaber:in eines Betriebs, lehnt die App die Löschung ab, damit der Betrieb nicht ohne Verantwortliche zurückbleibt. Schreiben Sie
        uns in diesem Fall an <Mail to={CONTACT_EMAIL} />: Wir übertragen die Inhaberschaft auf eine andere Person Ihres Betriebs oder löschen den gesamten
        Betrieb. Bei der Löschung eines Betriebs werden Betriebsdaten, Standorte, Mitarbeiterprofile, Dienstpläne, Abwesenheiten, Verfügbarkeiten und
        Schichttausch des Betriebs gelöscht.
      </P>

      <H2>Was gelöscht wird</H2>
      <UL>
        <li>Ihre Anmeldung: E-Mail-Adresse, Name und Passwort werden entfernt; das Konto kann nicht mehr verwendet werden,</li>
        <li>alle Anmeldesitzungen auf allen Geräten und die Gerätekennungen für Push-Mitteilungen,</li>
        <li>Ihre Benachrichtigungen,</li>
        <li>Ihre Mitgliedschaften in Betrieben werden beendet,</li>
        <li>Ihr Mitarbeiterprofil wird anonymisiert: Name, E-Mail-Adresse, Telefonnummer, Profilbild und interne Notizen werden entfernt.</li>
      </UL>

      <H2>Was aufbewahrt wird – und wie lange</H2>
      <UL>
        <li><strong>Planungsdaten des Betriebs</strong> (vergangene Schichten, Abwesenheiten, Schichttausch) bleiben beim Betrieb erhalten, sind aber keinem Namen mehr zugeordnet – solange der Betrieb sie benötigt bzw. bis zur Löschung des Betriebs.</li>
        <li><strong>Änderungsprotokoll und abgelaufene Sitzungen</strong> verweisen nur noch auf eine interne Kennung ohne Namen oder E-Mail-Adresse; sie enthalten die IP-Adresse der jeweiligen Aktion und bleiben derzeit für die Dauer des Betriebskontos gespeichert. Auf Anfrage löschen wir sie früher.</li>
        <li><strong>Server-Protokolle des Hosting-Anbieters:</strong> höchstens 6 Monate, Sicherheitsprotokolle höchstens 12 Monate.</li>
        <li><strong>Datensicherungen:</strong> Gelöschte Daten können noch bis zu 21 Tage in Backups des Hosting-Anbieters enthalten sein; sie werden nicht wiederhergestellt oder anderweitig verwendet.</li>
        <li>Bereits versendete E-Mails liegen in den Postfächern der Empfänger und können von uns nicht gelöscht werden.</li>
      </UL>
      <P>
        Weitere Informationen finden Sie in der <A href={DATENSCHUTZ}>Datenschutzerklärung</A>. Fragen? <A href={SUPPORT}>Hilfe &amp; Kontakt</A>.
      </P>
    </>
  )
}

const FAQ: [string, ReactNode][] = [
  [
    'Wie bekomme ich ein Konto?',
    <>
      Betriebe registrieren sich in der <A href={APP_URL}>Web-App</A> und testen GastroTeam 30 Tage kostenlos. Mitarbeitende werden von ihrem Betrieb per
      Einladungslink eingeladen und legen beim Öffnen des Links in der App oder im Browser ihr Passwort fest. In der App selbst gibt es keine offene
      Registrierung.
    </>,
  ],
  ['Meine Einladung ist abgelaufen.', 'Einladungslinks gelten 7 Tage und nur einmal. Bitten Sie Ihre Leitung, Ihnen eine neue Einladung zu senden.'],
  [
    'Ich habe mein Passwort vergessen.',
    'Tippen Sie auf dem Anmeldebildschirm auf „Passwort vergessen?“. Sie erhalten eine E-Mail mit einem Link zum Zurücksetzen. Nach fünf Fehlversuchen ist das Konto für 15 Minuten gesperrt.',
  ],
  ['Ich sehe keine Schichten.', 'Schichten erscheinen, sobald Ihre Leitung den Dienstplan der Woche veröffentlicht hat. Entwürfe sind für Mitarbeitende nicht sichtbar. Ziehen Sie die Liste nach unten, um sie zu aktualisieren.'],
  [
    'Wie tausche ich eine Schicht?',
    'Öffnen Sie unter „Schichten“ die Schicht und tippen Sie auf „Schicht tauschen“. Sie können sie einer Kollegin bzw. einem Kollegen oder allen am Standort anbieten. Je nach Einstellung Ihres Betriebs muss die Leitung den Tausch noch freigeben.',
  ],
  ['Wie beantrage ich Urlaub oder melde mich krank?', 'Unter „Anfragen“ → „Urlaub“ → „Neuer Antrag“. Den Status sehen Sie in derselben Liste. Bitte geben Sie bei Krankmeldungen keine Diagnosen an.'],
  ['Ich arbeite in mehreren Betrieben.', 'Mit einem Konto können Sie mehreren Betrieben angehören. Wechseln Sie den Betrieb in der App unter „Profil“.'],
  ['Push-Mitteilungen kommen nicht an.', 'Push-Mitteilungen sind in der aktuellen App-Version noch nicht eingerichtet. Alle Benachrichtigungen finden Sie in der App unter „Profil“ → „Alle Benachrichtigungen“.'],
  [
    'Wie lösche ich mein Konto?',
    <>
      In der App unter „Profil“ → „Konto löschen“. Details: <A href={KONTO_LOESCHEN}>Konto und Daten löschen</A>.
    </>,
  ],
]

function Support() {
  return (
    <>
      <H2>Kontakt</H2>
      <P>
        Schreiben Sie uns an <Mail to={SUPPORT_EMAIL} />. Bitte nennen Sie den Namen Ihres Betriebs und
        Ihr Gerät (z. B. Android oder iPhone) – niemals ein Passwort.
      </P>
      <P>
        Fragen zu Ihrem Dienstplan, zu Urlaubsanträgen oder Freigaben beantwortet am schnellsten Ihre Leitung. Datenschutzanfragen richten Sie bitte an{' '}
        <Mail to={CONTACT_EMAIL} />.
      </P>
      <H2>Häufige Fragen</H2>
      <div className="mt-4 space-y-3">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border border-line bg-surface px-5 py-4">
            <summary className="cursor-pointer list-none font-semibold marker:hidden">{q}</summary>
            <p className="mt-2 leading-relaxed text-ink-muted">{a}</p>
          </details>
        ))}
      </div>
      <H2>Rechtliches</H2>
      <P>
        <A href={DATENSCHUTZ}>Datenschutzerklärung</A> · <A href={IMPRESSUM}>Impressum</A> · <A href={KONTO_LOESCHEN}>Konto löschen</A>
      </P>
    </>
  )
}

const PAGES: Record<string, { title: string; subtitle?: string; body: () => ReactNode }> = {
  impressum: { title: 'Impressum', subtitle: `Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) · Stand: ${STAND}`, body: Impressum },
  datenschutz: { title: 'Datenschutzerklärung', subtitle: `für die Website, die Web-App und die Apps von GastroTeam · Stand: ${STAND}`, body: Datenschutz },
  'konto-loeschen': { title: 'Konto und Daten löschen', subtitle: `für die Apps für Android und iOS und die Web-App · Stand: ${STAND}`, body: KontoLoeschen },
  support: { title: 'Hilfe & Kontakt', subtitle: 'Support für die App GastroTeam (Android und iOS) und die Web-App', body: Support },
}

const page = PAGES[document.getElementById('root')!.dataset.page ?? ''] ?? PAGES.impressum
const Body = page.body
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header home={false} />
    <div className="grain relative overflow-hidden bg-night px-4 pb-20 pt-36 text-white sm:px-6 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="relative z-[2] mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">{page.title === 'Hilfe & Kontakt' ? 'Support' : 'Rechtliches'}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] [overflow-wrap:anywhere] sm:text-6xl">{page.title}</h1>
        {page.subtitle && <p className="mt-4 text-sm text-mist">{page.subtitle}</p>}
      </div>
    </div>
    <main id="inhalt" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper px-4 pb-24 pt-14 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Body />
      </div>
    </main>
    <Footer />
  </StrictMode>,
)
