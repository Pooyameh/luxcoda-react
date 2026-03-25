import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: 'clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 4rem)',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <img src="/logo.png" alt="Luxcoda" style={{ height: 28, width: 'auto', opacity: 0.7 }} />
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
            © 2026 Luxcoda
          </span>
        </div>

        <span style={{
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.3)',
        }}>
          Website by{' '}
          <span className="gradient-text" style={{ fontWeight: 600 }}>Luxcoda</span>
        </span>
      </div>
    </footer>
  )
}
