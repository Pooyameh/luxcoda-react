function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: 64,
        background: 'var(--bg-primary)',
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
          <a
            href="#"
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            Luxcoda
          </a>

          {/* Desktop nav links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button
              onClick={() => scrollTo('work')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Sora, sans-serif', fontWeight: 500,
                fontSize: 'var(--small)', color: 'var(--text-muted)',
                transition: 'color 0.25s ease',
                padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              Work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Sora, sans-serif', fontWeight: 500,
                fontSize: 'var(--small)', color: 'var(--text-muted)',
                transition: 'color 0.25s ease',
                padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              Contact
            </button>
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
              borderRadius: 6,
              padding: '8px 16px',
              fontFamily: 'Sora, sans-serif',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'background 0.25s ease',
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
