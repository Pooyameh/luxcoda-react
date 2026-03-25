const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/luxcoda',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/luxcoda',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '7 Days', label: 'Average Go-Live' },
  { value: '100%', label: 'Custom Designs' },
  { value: '5★', label: 'Client Rating' },
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient line at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(94,174,255,0.45) 30%, rgba(168,85,247,0.45) 70%, transparent)',
        }}
      />

      {/* Stats strip */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '48px 24px 0',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 1,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 56,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '24px 28px',
                background: '#060614',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.2rem',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  marginBottom: 6,
                  background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,240,255,0.55)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 40px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 290 }}>
            <img
              src="/logo.png"
              alt="Luxcoda"
              style={{ height: 46, width: 'auto', objectFit: 'contain', marginBottom: 16 }}
            />
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '0.875rem',
                color: 'rgba(240,240,255,0.6)',
                lineHeight: 1.75,
                margin: '0 0 22px',
              }}
            >
              Custom website design for Brisbane businesses. No templates. No lock-in contracts. Live in 7 days.
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
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(240,240,255,0.55)',
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
                    e.currentTarget.style.color = 'rgba(240,240,255,0.55)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(240,240,255,0.35)',
                marginBottom: 18,
                marginTop: 0,
              }}
            >
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
                    color: 'rgba(240,240,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#5eaeff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,255,0.6)')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(240,240,255,0.35)',
                marginBottom: 18,
                marginTop: 0,
              }}
            >
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href="tel:0414758891"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(240,240,255,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#5eaeff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,255,0.75)')}
              >
                0414 758 891
              </a>
              <a
                href="mailto:enquiries@luxcoda.com"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(240,240,255,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#a855f7')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,255,0.75)')}
              >
                enquiries@luxcoda.com
              </a>
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.875rem',
                  color: 'rgba(240,240,255,0.45)',
                }}
              >
                Brisbane, Queensland, AU
              </span>
              <a
                href="https://luxcoda.com"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.875rem',
                  color: 'rgba(240,240,255,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#5eaeff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,255,0.55)')}
              >
                luxcoda.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(240,240,255,0.3)',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Luxcoda. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(240,240,255,0.3)',
              margin: 0,
            }}
          >
            Designed &amp; built by{' '}
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
