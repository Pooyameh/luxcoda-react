function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-primary)' }}>
      {/* Glass card */}
      <div style={{
        padding: 'clamp(40px, 6vh, 64px) var(--content-padding)',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 'clamp(36px, 6vw, 56px) clamp(48px, 8vw, 80px)',
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          <img
            src="/luxcoda-lc-sharp-large_1.png"
            alt="Luxcoda"
            style={{ height: 100, width: 'auto', margin: '0 auto 20px', display: 'block' }}
          />
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.375rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            marginBottom: 6,
          }}>
            Luxcoda
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--small-size)',
            color: 'var(--text-muted)',
          }}>
            Web Design · Brisbane
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '32px var(--content-padding)',
      }}>
        <div style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          {/* Left */}
          <div>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '1.125rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.25rem',
            }}>
              Luxcoda
            </div>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'var(--small-size)',
              color: 'var(--text-muted)',
            }}>
              © 2026 · Brisbane, Australia
            </div>
          </div>

          {/* Right: nav + social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {[
                { label: 'Pricing', href: '/pricing' },
                { label: 'Work', action: () => scrollTo('work') },
                { label: 'Contact', action: () => scrollTo('contact') },
              ].map((l, i) => (
                <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {i > 0 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: 10, padding: '0 4px' }}>·</span>
                  )}
                  {l.href ? (
                    <a
                      href={l.href}
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 'var(--small-size)',
                        color: 'var(--text-muted)',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <button
                      onClick={l.action}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 'var(--small-size)',
                        color: 'var(--text-muted)',
                        padding: 0,
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      {l.label}
                    </button>
                  )}
                </span>
              ))}
            </nav>

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <a
                href="https://instagram.com/luxcoda"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com/luxcoda"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div:last-child > div { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
