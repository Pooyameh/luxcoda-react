import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BeforeAfter from './components/BeforeAfter'
import WhatYouGet from './components/WhatYouGet'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ background: 'var(--bg-primary)', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <BeforeAfter />
      <WhatYouGet />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  )
}
