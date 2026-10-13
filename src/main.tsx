import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { Footer, Header } from './components/Layout'
import { useSmoothScroll } from './lib/hooks'
import { ScrollProgress } from './lib/motion'
import { AppShowcase } from './sections/AppShowcase'
import { Bento } from './sections/Bento'
import { Chapters } from './sections/Chapters'
import { Faq, FinalCta, Pricing } from './sections/Closing'
import { Hero } from './sections/Hero'
import { Roles, Steps } from './sections/Journey'
import { ChaosToOrder, Marquee, Statement } from './sections/Story'
import './index.css'

function Home() {
  useSmoothScroll()
  return (
    <MotionConfig reducedMotion="user">
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-night">
        Zum Inhalt springen
      </a>
      <ScrollProgress />
      <Header />
      <main id="inhalt">
        <Hero />
        <Marquee />
        <Statement />
        <ChaosToOrder />
        <Chapters />
        <Bento />
        <AppShowcase />
        <Steps />
        <Roles />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
