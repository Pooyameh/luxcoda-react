function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border)',
      padding: '48px var(--content-padding)',
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
            fontSize: '1.25rem',
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

        {/* Right nav */}
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
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
