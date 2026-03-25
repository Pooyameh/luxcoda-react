const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/luxcoda',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/luxcoda',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
]

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#060614',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient line top */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(94,174,255,0.4) 30%, rgba(168,85,247,0.4) 70%, transparent)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 36,
          marginBottom: 40,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <img
              src="/logo.png"
              alt="Luxcoda"
              style={{ height: 48, width: 'auto', objectFit: 'contain', marginBottom: 16 }}
            />
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.88rem', color: 'rgba(240,240,255,0.45)', lineHeight: 1.7, margin: '0 0 20px' }}>
              Custom website design for Brisbane businesses. No templates. Live in 7 days.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(240,240,255,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(94,174,255,0.4)'
                    e.currentTarget.style.color = '#5eaeff'
                    e.currentTarget.style.background = 'rgba(94,174,255,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = 'rgba(240,240,255,0.5)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,240,255,0.3)', marginBottom: 16, marginTop: 0 }}>
              Navigation
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: '0.9rem',
                    color: 'rgba(240,240,255,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#5eaeff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,255,0.5)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,240,255,0.3)', marginBottom: 16, marginTop: 0 }}>
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href="tel:0414758891"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.9rem', color: 'rgba(240,240,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#5eaeff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,255,0.5)')}
              >
                0414 758 891
              </a>
              <a
                href="mailto:enquiries@luxcoda.com"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.9rem', color: 'rgba(240,240,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#a855f7')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,255,0.5)')}
              >
                enquiries@luxcoda.com
              </a>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.88rem', color: 'rgba(240,240,255,0.35)' }}>
                Brisbane, Queensland
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.8rem', color: 'rgba(240,240,255,0.25)', margin: 0 }}>
            © {new Date().getFullYear()} Luxcoda. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.8rem', color: 'rgba(240,240,255,0.25)', margin: 0 }}>
            Website by{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 600,
              }}
            >
              Luxcoda
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
