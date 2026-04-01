const links = [
  { label: 'How It Works', href: '#process' },
  { label: 'Pricing',      href: '#pricing'  },
  { label: 'Contact',      href: '#contact'  },
]

const labelStyle = {
  fontFamily: 'var(--sans)',
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.3)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--black)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: 'clamp(1.5rem, 3vh, 2rem) clamp(1.5rem, 5vw, 4rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>

        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ ...labelStyle, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 14, letterSpacing: '0.05em' }}>
            Luxcoda
          </span>
          <span style={labelStyle}>© 2026 Luxcoda</span>
        </div>

        {/* Center nav */}
        <div style={{ display: 'flex', gap: '2rem' }} className="footer-nav">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={labelStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right */}
        <span style={labelStyle}>Built by Luxcoda</span>
      </div>

      <style>{`
        @media (max-width: 640px) { .footer-nav { display: none !important; } }
      `}</style>
    </footer>
  )
}
