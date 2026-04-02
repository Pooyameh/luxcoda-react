function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
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
          {/* Wordmark */}
          <a href="#" style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
          }}>
            Luxcoda
          </a>

          {/* Desktop links */}
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
          </div>

          {/* Mobile CTA */}
          <button
            className="nav-mobile"
            onClick={() => scrollTo('contact')}
            style={{
              display: 'none',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 100,
              padding: '8px 20px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            Let's Talk
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
