import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@fontsource-variable/geist'
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

// Register once — all components share this
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
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
    if (isLoaded) {
      const timer = setTimeout(() => ScrollTrigger.refresh(), 200)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  const handleLoadingComplete = () => {
    setLoading(false)
    setTimeout(() => setIsLoaded(true), 200)
  }

  return (
    <div style={{ background: '#060610', color: '#fff', overflowX: 'hidden' }}>
      <Cursor />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} isLoaded={isLoaded} />
      <Difference />
      <Process />
      <Pricing onOpenModal={() => setModalOpen(true)} />
      <TechStack />
      <Cta onOpenModal={() => setModalOpen(true)} />
      <Contact />
      <Footer />

      <MockupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
