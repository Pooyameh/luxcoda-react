import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Difference from './components/Difference'
import Process from './components/Process'
import Pricing from './components/Pricing'
import TechStack from './components/TechStack'
import Cta from './components/Cta'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MockupModal from './components/MockupModal'
import Background3D from './components/Background3D'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollLineRef = useRef(null)

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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? scrolled / total : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(timer)
  }, [])

  // Gold scroll-progress line
  useEffect(() => {
    const line = scrollLineRef.current
    if (!line) return
    const ctx = gsap.context(() => {
      gsap.to(line, {
        scaleY: 1,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  // Global GSAP hover underline for all .hover-underline elements
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.hover-underline')
      const cleanup = []

      els.forEach((el) => {
        const bar = el.querySelector('.underline-bar')
        if (!bar) return

        const enter = () => gsap.to(bar, { scaleX: 1, duration: 0.4, ease: 'power2.out', overwrite: true })
        const leave = () => gsap.to(bar, { scaleX: 0, duration: 0.3, ease: 'power2.in', overwrite: true })

        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        cleanup.push(() => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      })

      return () => cleanup.forEach(fn => fn())
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', overflowX: 'hidden' }}>
      <Background3D scrollProgress={scrollProgress} />
      <div className="scroll-line" ref={scrollLineRef} />

      <Cursor />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar onOpenModal={() => setModalOpen(true)} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero onOpenModal={() => setModalOpen(true)} isLoaded={true} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Difference />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Process />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Pricing onOpenModal={() => setModalOpen(true)} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <TechStack />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Cta onOpenModal={() => setModalOpen(true)} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Contact />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>

      <MockupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
