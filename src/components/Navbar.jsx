import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'How It Works', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(null)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) {
        setHidden(false)
        setScrolled(false)
      } else if (y > lastY.current + 4) {
        setHidden(true)
        setScrolled(true)
      } else if (y < lastY.current - 4) {
        setHidden(false)
        setScrolled(true)
      }
      lastY.current = y
    }
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
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
        transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
        background: scrolled ? 'rgba(1,1,18,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.5)' : 'none',
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Luxcoda"
              style={{
                height: 28, width: 'auto',
                transition: 'opacity 0.25s, filter 0.25s',
                filter: 'brightness(1)',
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            />
          </a>

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ display: 'none', alignItems: 'center', gap: '2.5rem' }}>
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: '2px',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            {/* CTA button */}
            <button
              onClick={onOpenModal}
              className="btn-primary nav-cta"
              style={{
                padding: '0.52rem 1.25rem',
                fontSize: '0.83rem',
                boxShadow: '0 0 24px rgba(94,174,255,0.18)',
                display: 'none',
              }}
            >
              <span>Free Mock-Up</span>
            </button>

            {/* Hamburger */}
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
                  transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s, background 0.3s',
                  ...(mobileOpen && i === 0 ? { transform: 'translateY(6.5px) rotate(45deg)', background: '#22d3ee' } : {}),
                  ...(mobileOpen && i === 1 ? { opacity: 0 } : {}),
                  ...(mobileOpen && i === 2 ? { transform: 'translateY(-6.5px) rotate(-45deg)', background: '#22d3ee' } : {}),
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(1,1,18,0.97)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {/* Background glow */}
            <div style={{
              position: 'absolute', top: '30%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80vw', height: '80vw', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, rgba(94,174,255,0.04) 40%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }} />

            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                  fontSize: 'clamp(2rem, 9vw, 3.5rem)',
                  fontWeight: 800, letterSpacing: '-0.04em',
                  padding: '0.4rem 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.28, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => { setMobileOpen(false); onOpenModal() }}
              className="btn-primary"
              style={{
                marginTop: '1.5rem',
                padding: '1rem 2.75rem',
                fontSize: '1.1rem',
                boxShadow: '0 0 60px rgba(94,174,255,0.22), 0 0 120px rgba(168,85,247,0.15)',
              }}
            >
              <span>Claim Free Mock-Up</span>
            </motion.button>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38 }}
              style={{
                marginTop: '1rem',
                display: 'flex', gap: '1.5rem',
                fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.05em',
              }}
            >
              <a href="https://instagram.com/luxcoda" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                Instagram
              </a>
              <a href="https://facebook.com/luxcoda" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                Facebook
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop-links { display: flex !important; }
          .nav-cta { display: block !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
