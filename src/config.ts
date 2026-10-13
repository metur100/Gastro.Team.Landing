/** Public URL of the GastroTeam web app (change when a custom domain is used). */
export const APP_URL = 'https://metur100.github.io/GastroTeam'
export const REGISTER_URL = `${APP_URL}/registrieren`
export const LOGIN_URL = `${APP_URL}/anmelden`
/** Placeholder contact address – replace before publishing. */
export const CONTACT_EMAIL = 'kontakt@gastroteam.example'

const base = import.meta.env.BASE_URL
export const HOME = base
export const IMPRESSUM = `${base}impressum/`
export const DATENSCHUTZ = `${base}datenschutz/`
