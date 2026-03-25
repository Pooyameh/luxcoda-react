import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'

function InstagramIcon({ size = 18, color = '#5eaeff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ size = 18, color = '#5eaeff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const contacts = [
  {
    Icon: ({ size, color }) => <Phone size={size} color={color} strokeWidth={1.75} />,
    label: 'Phone',
    value: '0414 758 891',
    href: 'tel:0414758891',
  },
  {
    Icon: ({ size, color }) => <Mail size={size} color={color} strokeWidth={1.75} />,
    label: 'Email',
    value: 'enquiries@luxcoda.com',
    href: 'mailto:enquiries@luxcoda.com',
  },
  {
    Icon: InstagramIcon,
    label: 'Instagram',
    value: '@luxcoda',
    href: 'https://instagram.com/luxcoda',
  },
  {
    Icon: FacebookIcon,
    label: 'Facebook',
    value: 'facebook.com/luxcoda',
    href: 'https://facebook.com/luxcoda',
  },
]

export default function Contact() {
  return (
    <section id="contact" style={{
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 4vw, 4rem)',
      background: 'rgba(255,255,255,0.01)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 8vw, 8rem)',
        alignItems: 'center',
      }}
      className="contact-grid"
      >
        {/* Left — Big headline */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{
            fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            display: 'block', marginBottom: '1.5rem',
          }}>
            Get in Touch
          </span>
          <h2 style={{
            fontSize: 'clamp(3.5rem, 9vw, 9rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            color: 'transparent',
            WebkitTextStroke: '1.5px transparent',
            background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Let's
            <br />
            Talk.
          </h2>
          <p style={{
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.65,
            maxWidth: 380,
          }}>
            Brisbane-based and ready to build. Reach out by phone, email, or social — we respond fast.
          </p>
        </motion.div>

        {/* Right — Contact details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.25rem, 1vw, 0.5rem)' }}>
          {contacts.map((item, i) => {
            const { Icon } = item
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(1rem, 2vw, 1.75rem)',
                  padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.25rem, 2.5vw, 2rem)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  textDecoration: 'none',
                  transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
                  background: 'rgba(255,255,255,0.02)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(94,174,255,0.35)'
                  e.currentTarget.style.background = 'rgba(94,174,255,0.05)'
                  e.currentTarget.style.transform = 'translateX(6px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(94,174,255,0.15), rgba(168,85,247,0.15))',
                }}>
                  <Icon size={18} color="#5eaeff" />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: '0.2rem',
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                    fontWeight: 500,
                    color: '#fff',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.value}
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
