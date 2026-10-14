/** Public URL of the GastroTeam web app. */
export const APP_URL = 'https://gastro-app.gentlegroup.de'
export const REGISTER_URL = `${APP_URL}/registrieren`
export const LOGIN_URL = `${APP_URL}/anmelden`
/** Placeholder contact address – replace before publishing. */
export const CONTACT_EMAIL = 'kontakt@gastroteam.example'

const base = import.meta.env.BASE_URL
export const HOME = base
export const IMPRESSUM = `${base}impressum/`
export const DATENSCHUTZ = `${base}datenschutz/`
