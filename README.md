# GastroTeam – Landing Page

Static marketing site for GastroTeam (German). Vite + React + TypeScript + Tailwind CSS v4, built as a multi-page site
(`/`, `/impressum/`, `/datenschutz/`) so every page works on GitHub Pages without client-side routing.

## Design & motion

- **Motion** (`motion/react`) for entrance, scroll-linked and layout animations; **Lenis** for smooth scrolling.
- Self-hosted fonts via Fontsource (Geist Variable, Instrument Serif) – no requests to Google Fonts.
- Sections live in `src/sections/`; shared motion primitives (`Reveal`, `WordRise`, `ScrollWords`, `Magnetic`, `SpotlightCard`, `Counter`) in `src/lib/motion.tsx`.
- Highlights: scripted product demo in the hero (`HeroBoard.tsx`: an open shift is dragged, checked, published and pushed to the phone),
  pinned "chaos → order" story (`Story.tsx`), pinned feature chapters with animated product visuals (`Chapters.tsx`), fanning phones (`AppShowcase.tsx`).
- `prefers-reduced-motion` is respected: smooth scrolling is off, scripted demos show their final state and scroll-linked transforms are disabled.

## Develop

```bash
npm ci
npm run dev                                   # http://localhost:5173
npx tsc -b && npx vite build --base=/Gastro.Team.Landing/
npx vite preview --base=/Gastro.Team.Landing/  # check the production build
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml` and publishes to GitHub Pages
(enable *Settings → Pages → Source: GitHub Actions* once). The base path is derived from the repository name;
with a custom domain add `public/CNAME` and update the canonical/OG URLs in the three HTML files, `robots.txt` and `sitemap.xml`.

## Before going public – replace

- **Impressum** and **Datenschutzerklärung** (`src/legal.tsx`): currently clearly marked placeholders; must be replaced with legally reviewed content.
- **Contact address** `kontakt@gastroteam.example` and **app URL** in `src/config.ts`.
- Prices on the page mirror the configured plans (19/39/79 € per month, product hypotheses) – keep them in sync with the app.

The page contains no testimonials, customer logos or statistics; all product views (board, phones, cards) are HTML/CSS illustrations with fictional names.
