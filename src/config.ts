/** Public URL of the GastroTeam web app. */
export const APP_URL = 'https://gastro-app.gentlegroup.de'
export const REGISTER_URL = `${APP_URL}/registrieren`
export const LOGIN_URL = `${APP_URL}/anmelden`

/** Operator (Impressum / controller), same as https://gentlegroup.de/impressum. */
export const OPERATOR = {
  name: 'Berk-Can Atesoglu',
  business: 'Gentle Group Studios',
  street: 'Girardetstraße 17',
  city: '42109 Wuppertal',
  country: 'Deutschland',
  phone: '+49 175 4701892',
  vatId: 'DE346263022',
} as const
/** General, legal and privacy contact. */
export const CONTACT_EMAIL = 'office@gentlegroup.de'
/** App support address (same as in the Google Play and App Store listings). */
export const SUPPORT_EMAIL = 'certidevelopment@gmail.com'
/** Responsible for editorial content (§ 18 Abs. 2 MStV). */
export const EDITORIAL_EMAIL = 'office@gentle-webdesign.com'

const base = import.meta.env.BASE_URL
export const HOME = base
export const IMPRESSUM = `${base}impressum/`
export const DATENSCHUTZ = `${base}datenschutz/`
export const KONTO_LOESCHEN = `${base}konto-loeschen/`
export const SUPPORT = `${base}support/`
