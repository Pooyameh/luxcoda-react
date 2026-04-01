import { motion } from 'framer-motion'

function InstagramIcon({ size = 16, color = 'rgba(255,255,255,0.4)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ size = 16, color = 'rgba(255,255,255,0.4)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/luxcoda', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://facebook.com/luxcoda', Icon: FacebookIcon },
]

const links = [
  { label: 'How It Works', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      background: '#010112',
      overflow: 'hidden',
    }}>
      {/* Top gradient line */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(94,174,255,0.25) 20%, rgba(168,85,247,0.25) 50%, rgba(34,211,238,0.2) 80%, transparent)',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translate(-50%, 50%)',
        width: '60vw', height: '30vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(94,174,255,0.04) 0%, rgba(168,85,247,0.03) 50%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Main footer row */}
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(1.5rem, 3vh, 2.5rem) clamp(1.25rem, 5vw, 5rem)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.25rem',
        position: 'relative', zIndex: 1,
      }}>

        {/* Left — logo + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src="/logo.png"
            alt="Luxcoda"
            style={{ height: 24, width: 'auto', opacity: 0.5, transition: 'opacity 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
          />
          <div style={{
            width: 1, height: 16,
            background: 'rgba(255,255,255,0.1)',
          }} />
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.01em' }}>
            © 2026 Luxcoda
          </span>
        </div>

        {/* Center — nav links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="footer-nav">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.78rem', color: 'rgba(255,255,255,0.32)',
                textDecoration: 'none', letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.72)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.32)'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — socials + credit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'background 0.25s, border-color 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(94,174,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(94,174,255,0.25)'
                e.currentTarget.querySelector('svg').setAttribute('stroke', '#5eaeff')
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.querySelector('svg').setAttribute('stroke', 'rgba(255,255,255,0.4)')
              }}
            >
              <Icon size={14} />
            </a>
          ))}

          <div style={{
            width: 1, height: 16,
            background: 'rgba(255,255,255,0.08)',
          }} />

          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>
            Built by{' '}
            <span className="gradient-text" style={{ fontWeight: 600 }}>Luxcoda</span>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-nav { display: none !important; }
        }
      `}</style>
    </footer>
  )
}
