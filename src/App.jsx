import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor'
import LoadingScreen from './components/LoadingScreen'
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

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP's ticker (time in seconds → raf expects ms)
    const tickerFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  // Refresh ScrollTrigger positions after loading screen exits
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => ScrollTrigger.refresh(), 150)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  const handleLoadingComplete = () => {
    setLoading(false)
    setTimeout(() => setIsLoaded(true), 200)
  }

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <div style={{ background: '#050508', color: '#fff', overflowX: 'hidden' }}>
      <Cursor />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} isLoaded={isLoaded} />
      <Difference />
      <Process />
      <Pricing onOpenModal={openModal} />
      <TechStack />
      <Cta onOpenModal={openModal} />
      <Contact />
      <Footer />

      <MockupModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  )
}
