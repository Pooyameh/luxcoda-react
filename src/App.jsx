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
import { useScrollStore } from './useScrollEvents'

gsap.registerPlugin(ScrollTrigger)

function SectionDivider() {
  return (
    <div style={{
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, rgba(111,163,199,0.15) 30%, rgba(111,163,199,0.15) 70%, transparent 100%)',
    }} />
  )
}

// ── Tracks scroll progress + section visibility → zustand store ───────────────
function ScrollTracker() {
  useEffect(() => {
    const { setScroll, setActiveSection } = useScrollStore.getState()

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // IntersectionObserver on every element with [data-section]
    const sections = document.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.dataset.section)
          }
        })
      },
      { threshold: [0.3, 0.5, 0.7] },
    )
    sections.forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return null
}

export default function App() {
  const [loading,    setLoading]    = useState(true)
  const [isLoaded,   setIsLoaded]   = useState(false)
  const [modalOpen,  setModalOpen]  = useState(false)
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

  // ── Gold scroll progress line ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      const prog  = total > 0 ? window.scrollY / total : 0
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
    <div style={{ background: '#050508', color: 'var(--white)', overflowX: 'hidden' }}>

      {/* Fixed 3D canvas */}
      <Background3D />

      {/* Film grain */}
      <div className="grain-overlay" />

      {/* Gold scroll progress line */}
      <div className="scroll-progress-line" ref={progressLineRef} />

      {/* Custom cursor */}
      <Cursor />

      {/* Scroll tracker — must be inside the component tree but renders nothing */}
      <ScrollTracker />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar onOpenModal={() => setModalOpen(true)} />

        <div data-section="hero">
          <Hero isLoaded={isLoaded} onOpenModal={() => setModalOpen(true)} />
        </div>

        <SectionDivider />

        <div data-section="difference">
          <Difference />
        </div>

        <div data-section="process">
          <Process />
        </div>

        <SectionDivider />

        <div data-section="pricing">
          <Pricing onOpenModal={() => setModalOpen(true)} />
        </div>

        <div data-section="cta">
          <Cta onOpenModal={() => setModalOpen(true)} />
        </div>

        <SectionDivider />

        <div data-section="techstack">
          <TechStack />
        </div>

        <SectionDivider />

        <div data-section="contact">
          <Contact />
        </div>

        <Footer />
      </div>

      <MockupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
