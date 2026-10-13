# GastroTeam – Landing Page

Static marketing site for GastroTeam (German). Vite + React + TypeScript + Tailwind CSS v4, built as a multi-page site
(`/`, `/impressum/`, `/datenschutz/`) so every page works on GitHub Pages without client-side routing.

## Develop

```bash
npm ci
npm run dev                                   # http://localhost:5173
npx tsc -b && npx vite build --base=/GastroTeam.Landing/
npx vite preview --base=/GastroTeam.Landing/  # check the production build
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml` and publishes to GitHub Pages
(enable *Settings → Pages → Source: GitHub Actions* once). The base path is derived from the repository name;
with a custom domain add `public/CNAME` and update the canonical/OG URLs in the three HTML files, `robots.txt` and `sitemap.xml`.

## Before going public – replace

- **Impressum** and **Datenschutzerklärung** (`src/legal.tsx`): currently clearly marked placeholders; must be replaced with legally reviewed content.
- **Contact address** `kontakt@gastroteam.example` and **app URL** in `src/config.ts`.
- Prices on the page mirror the configured plans (19/39/79 € per month, product hypotheses) – keep them in sync with the app.
- Fonts are loaded from Google Fonts; consider self-hosting them (privacy).

The page contains no testimonials, customer logos or statistics; the product view in the hero is an HTML/CSS illustration.
