import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
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

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  const handleLoadingComplete = () => {
    setLoading(false)
    // Small delay so the exit animation starts before hero animates in
    setTimeout(() => setIsLoaded(true), 200)
  }

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <div style={{ background: '#050508', color: '#fff', overflowX: 'hidden', minHeight: '100vh' }}>
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
