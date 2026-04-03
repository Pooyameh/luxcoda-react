import { useEffect, useRef, useState } from 'react';

function scrollTo(id, closeMenu) {
  closeMenu?.();
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

function HamburgerIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <rect y="0"  width="22" height="2" rx="1" fill="white" />
      <rect y="7"  width="22" height="2" rx="1" fill="white" />
      <rect y="14" width="22" height="2" rx="1" fill="white" />
    </svg>
  );
}

export default function Navbar() {
  const [visible, setVisible]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (y < 100) {
        setVisible(true);
      } else if (diff > 5) {
        setVisible(false);
      } else if (diff < -5) {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const navLinks = [
    { label: 'Work',    id: 'work'    },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: 64,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
      }}>
        <div style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 var(--content-padding)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo + Wordmark */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
            <img
              src="/luxcoda-lc-sharp-large_1.png"
              alt="LC"
              style={{ height: 28, width: 'auto', display: 'block' }}
            />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}>
              Luxcoda
            </span>
          </a>

          {/* Desktop: nav links + CTA */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map((l, i) => (
              <span key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {i > 0 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', padding: '0 4px', userSelect: 'none' }}>·</span>
                )}
                <button
                  onClick={() => scrollTo(l.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 'var(--small-size)',
                    color: 'var(--text-muted)',
                    padding: '4px 8px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {l.label}
                </button>
              </span>
            ))}

            <button
              onClick={() => scrollTo('contact')}
              style={{
                marginLeft: 16,
                background: '#ffffff',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: 100,
                padding: '10px 24px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 500,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'background 0.25s ease, transform 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get a Free Mock-Up
            </button>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 0,
            }}
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.2s ease',
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          style={{
            position: 'absolute',
            top: 20,
            right: 24,
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: 28,
            cursor: 'pointer',
            lineHeight: 1,
            padding: 4,
            opacity: 0.7,
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Nav links */}
        {navLinks.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id, close)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: '1.75rem',
              color: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'color 0.2s ease',
              padding: '4px 0',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >
            {l.label}
          </button>
        ))}

        {/* CTA button */}
        <button
          onClick={() => scrollTo('contact', close)}
          style={{
            marginTop: 8,
            background: '#ffffff',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: 100,
            padding: '14px 36px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.25s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.85)'}
          onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
        >
          Get a Free Mock-Up
        </button>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop   { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
