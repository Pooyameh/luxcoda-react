import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'How It Works', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
        background: scrolled ? 'rgba(6,6,16,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.4)' : 'none',
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 4vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 70,
        }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'inherit',
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#fff',
            }}>Luxcoda</span>
          </a>

          <div className="nav-desktop-links">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onOpenModal}
              className="nav-cta"
              style={{
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                color: '#fff',
                border: 'none',
                borderRadius: 100,
                padding: '0.55rem 1.35rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '0.01em',
                boxShadow: '0 0 24px rgba(94,174,255,0.2)',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
            >
              Free Mock-Up
            </button>

            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', gap: 5,
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 1.5,
                  background: '#fff', borderRadius: 2,
                  transition: 'transform 0.3s, opacity 0.3s',
                  ...(mobileOpen && i === 0 ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}),
                  ...(mobileOpen && i === 1 ? { opacity: 0 } : {}),
                  ...(mobileOpen && i === 2 ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}),
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(6,6,16,0.97)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: '#fff', textDecoration: 'none',
                  fontSize: 'clamp(2rem, 8vw, 3rem)',
                  fontWeight: 700, letterSpacing: '-0.03em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.27, duration: 0.4 }}
              onClick={() => { setMobileOpen(false); onOpenModal() }}
              style={{
                marginTop: '0.5rem',
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                color: '#fff', border: 'none', borderRadius: 100,
                padding: '1rem 2.5rem', fontSize: '1.1rem',
                fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 0 48px rgba(94,174,255,0.25)',
              }}
            >
              Free Mock-Up
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop-links { display: none; align-items: center; gap: 2.5rem; }
        .nav-link:hover { color: #fff !important; }
        .nav-cta { display: none; }
        .nav-cta:hover { opacity: 0.85 !important; transform: scale(1.02) !important; }
        .nav-hamburger { display: flex; }
        @media (min-width: 768px) {
          .nav-desktop-links { display: flex; }
          .nav-cta { display: block; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
