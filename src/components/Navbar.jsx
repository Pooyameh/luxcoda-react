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
    const onScroll = () => setScrolled(window.scrollY > 40)
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
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 4vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}>
          {/* Logo — only visible once user scrolls past Hero */}
          <a href="#" style={{
            display: 'flex', alignItems: 'center', textDecoration: 'none',
            opacity: scrolled ? 1 : 0,
            pointerEvents: scrolled ? 'auto' : 'none',
            transition: 'opacity 0.4s ease',
          }}>
            <img src="/logo.png" alt="Luxcoda" style={{ height: 36, width: 'auto' }} />
          </a>

          {/* Desktop Links — hidden below md via media query class */}
          <div className="nav-desktop-links">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Desktop CTA */}
            <button
              onClick={onOpenModal}
              className="nav-cta"
              style={{
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                color: '#fff',
                border: 'none',
                borderRadius: 100,
                padding: '0.6rem 1.4rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '0.01em',
              }}
            >
              Claim Free Mock-Up
            </button>

            {/* Hamburger — shown below md */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 5,
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: 24,
                  height: 1.5,
                  background: '#fff',
                  borderRadius: 2,
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: '#141519',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: 'clamp(2rem, 8vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.27, duration: 0.4 }}
              onClick={() => { setMobileOpen(false); onOpenModal() }}
              style={{
                marginTop: '0.5rem',
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                color: '#fff', border: 'none',
                borderRadius: 100,
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Claim Free Mock-Up
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop-links {
          display: none;
          align-items: center;
          gap: 2.5rem;
        }
        .nav-link {
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: #fff !important;
        }
        .nav-cta {
          display: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .nav-cta:hover {
          opacity: 0.85;
          transform: scale(1.03);
        }
        .nav-hamburger {
          display: flex;
        }
        @media (min-width: 768px) {
          .nav-desktop-links {
            display: flex;
          }
          .nav-cta {
            display: block;
          }
          .nav-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
