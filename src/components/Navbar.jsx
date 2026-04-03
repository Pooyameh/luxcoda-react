import { useEffect, useRef, useState } from 'react';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const [visible, setVisible] = useState(true);
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
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            textDecoration: 'none',
          }}>
            <img
              src="/luxcoda-lc-sharp.png"
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
            {[
              { label: 'Work', id: 'work' },
              { label: 'Contact', id: 'contact' },
            ].map((l, i) => (
              <span key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {i > 0 && (
                  <span style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    padding: '0 4px',
                    userSelect: 'none',
                  }}>·</span>
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

            {/* Desktop CTA */}
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

          {/* Mobile CTA */}
          <button
            className="nav-mobile"
            onClick={() => scrollTo('contact')}
            style={{
              display: 'none',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 100,
              padding: '8px 20px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Get a Mock-Up
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 1023px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: block !important; }
        }
      `}</style>
    </>
  );
}
