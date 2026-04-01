const links = [
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing'  },
  { label: 'Contact', href: '#contact'  },
]

const dimStyle = {
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(240,236,228,0.25)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--black)',
      borderTop: '1px solid rgba(240,236,228,0.04)',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>

        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}>
            Luxcoda
          </span>
          <span style={{ ...dimStyle, letterSpacing: '0.05em' }}>© 2026</span>
        </div>

        {/* Center nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} className="footer-nav">
          {links.map((l, i) => (
            <span key={l.href} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {i > 0 && <span style={{ color: 'rgba(240,236,228,0.15)', fontSize: 10 }}>·</span>}
              <a
                href={l.href}
                style={dimStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,236,228,0.25)'}
              >
                {l.label}
              </a>
            </span>
          ))}
        </div>

        {/* Right */}
        <span style={{ ...dimStyle, color: 'rgba(240,236,228,0.2)' }}>Built by Luxcoda</span>
      </div>

      <style>{`
        @media (max-width: 640px) { .footer-nav { display: none !important; } }
      `}</style>
    </footer>
  )
}
