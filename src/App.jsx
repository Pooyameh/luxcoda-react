import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Background3D    from './components/Background3D'
import Cursor          from './components/Cursor'
import LoadingScreen   from './components/LoadingScreen'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import Difference      from './components/Difference'
import Process         from './components/Process'
import TechStack       from './components/TechStack'
import Pricing         from './components/Pricing'
import Cta             from './components/Cta'
import Contact         from './components/Contact'
import Footer          from './components/Footer'
import MockupModal     from './components/MockupModal'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading,       setLoading]       = useState(true)
  const [isLoaded,      setIsLoaded]      = useState(false)
  const [modalOpen,     setModalOpen]     = useState(false)
  const [scrollProg,    setScrollProg]    = useState(0)
  const progressLineRef = useRef(null)

  // ── Lenis + GSAP ScrollTrigger sync ───────────────────────────────────────
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  // ── Scroll progress → 3D canvas + progress line ───────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.body.scrollHeight - window.innerHeight
      const prog     = total > 0 ? scrolled / total : 0
      setScrollProg(prog)
      if (progressLineRef.current) {
        progressLineRef.current.style.height = `${prog * 100}%`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Refresh ScrollTrigger after load ─────────────────────────────────────
  useEffect(() => {
    if (isLoaded) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 300)
      return () => clearTimeout(t)
    }
  }, [isLoaded])

  const handleLoadingComplete = () => {
    setLoading(false)
    setTimeout(() => setIsLoaded(true), 200)
  }

  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)', overflowX: 'hidden' }}>

      {/* Fixed 3D canvas behind everything */}
      <Background3D scrollProgress={scrollProg} />

      {/* Film grain */}
      <div className="grain-overlay" />

      {/* Gold scroll progress line */}
      <div className="scroll-progress-line" ref={progressLineRef} />

      {/* Custom cursor */}
      <Cursor />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Page content — all above the canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar onOpenModal={() => setModalOpen(true)} />
        <Hero isLoaded={isLoaded} onOpenModal={() => setModalOpen(true)} />
        <Difference />
        <Process />
        <TechStack />
        <Pricing onOpenModal={() => setModalOpen(true)} />
        <Cta onOpenModal={() => setModalOpen(true)} />
        <Contact />
        <Footer />
      </div>

      <MockupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
