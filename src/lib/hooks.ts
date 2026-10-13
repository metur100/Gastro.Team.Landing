import { useEffect, useState, useSyncExternalStore } from 'react'
import Lenis from 'lenis'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', notify)
      return () => mql.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/**
 * Drives a scripted animation: returns the current phase (0…times.length) and loops after `cycle` ms.
 * Only runs while `active`; with reduced motion it stays on `staticPhase`.
 * `times` must be a stable (module-level) array.
 */
export function usePhases(times: readonly number[], cycle: number, active: boolean, staticPhase = times.length) {
  const reduce = usePrefersReducedMotion()
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!active || reduce) return
    let timers: number[] = []
    const run = () => {
      setPhase(0)
      timers = times.map((t, i) => window.setTimeout(() => setPhase(i + 1), t))
      timers.push(window.setTimeout(run, cycle))
    }
    run()
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [active, reduce, times, cycle])
  return reduce ? staticPhase : phase
}

let lenis: Lenis | null = null

/** Smooth, inertia-based page scrolling. Disabled for users who prefer reduced motion. */
export function useSmoothScroll() {
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    if (reduce) return
    lenis = new Lenis({ autoRaf: true, anchors: { offset: -88 }, lerp: 0.1 })
    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [reduce])
}

/** Scrolls to an absolute page offset, through the smooth scroller when it is active. */
export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}
