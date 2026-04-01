import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing'  },
  { label: 'Contact', href: '#contact'  },
]

export default function Navbar({ onOpenModal }) {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
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
        zIndex: 50,
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        background: scrolled ? 'rgba(5,5,5,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.08)' : '1px solid transparent',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Wordmark */}
          <a
            href="#"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: 12,
              color: 'var(--white)',
              textDecoration: 'none',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            Luxcoda
          </a>

          {/* Desktop center links */}
          <div className="nav-links" style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
            {links.map((l, i) => (
              <span key={l.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {i > 0 && (
                  <span style={{ color: 'var(--gold)', fontSize: 10, lineHeight: 1 }}>·</span>
                )}
                <a
                  href={l.href}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >
                  {l.label}
                </a>
              </span>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="btn-gold nav-cta"
              onClick={onOpenModal}
              style={{ display: 'none', padding: '10px 24px', fontSize: 11 }}
            >
              Free Mock-Up →
            </button>

            {/* Hamburger */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              style={{
                background: 'none', border: 'none',
                padding: '0.5rem', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                gap: 5, alignItems: 'center',
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 20, height: 1,
                  background: 'var(--white)',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  ...(mobileOpen && i === 0 ? { transform: 'translateY(6px) rotate(45deg)' } : {}),
                  ...(mobileOpen && i === 1 ? { opacity: 0 } : {}),
                  ...(mobileOpen && i === 2 ? { transform: 'translateY(-6px) rotate(-45deg)' } : {}),
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 49,
              background: 'rgba(5,5,5,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.25rem',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.5 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: '"Bodoni Moda", serif',
                  fontWeight: 400,
                  fontSize: 'clamp(2rem, 9vw, 3.5rem)',
                  color: 'var(--muted-strong)',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                  transition: 'color 0.2s',
                  padding: '0.3rem 0',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-strong)'}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="btn-gold"
              onClick={() => { setMobileOpen(false); onOpenModal() }}
              style={{ marginTop: '2rem' }}
            >
              Free Mock-Up →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .nav-links    { display: flex !important; }
          .nav-cta      { display: inline-block !important; }
          .nav-hamburger{ display: none !important; }
        }
      `}</style>
    </>
  )
}
