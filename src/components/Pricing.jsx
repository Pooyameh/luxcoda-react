import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    upfront: '$999',
    monthly: '$69/mo',
    tagline: 'Everything you need to get online and be found.',
    features: [
      'Custom-designed website',
      'Fully mobile responsive',
      'SEO-ready structure',
      'Contact forms',
      'Monthly hosting & maintenance',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    upfront: '$1,499',
    monthly: '$149/mo',
    tagline: 'Built to rank higher and earn more trust.',
    features: [
      'Everything in Starter',
      'Premium animations',
      'Active SEO management',
      'Google Business setup & management',
      'Monthly performance reports',
    ],
    featured: false,
  },
  {
    name: 'Accelerate',
    upfront: '$1,999',
    monthly: '$249/mo',
    tagline: 'The complete growth system for serious businesses.',
    features: [
      'Everything in Growth',
      'Facebook & Instagram ad setup',
      'Google Ads management',
      'Social media content calendar',
      'Review generation strategy',
    ],
    featured: true,
    recommended: true,
  },
  {
    name: 'Premium',
    upfront: 'Let\'s Talk',
    monthly: null,
    tagline: 'A fully managed presence — done entirely for you.',
    features: [
      'Everything in Accelerate',
      'Professional photography',
      'Booking systems & paywalls',
      'Email newsletters',
      'Full social media management',
    ],
    featured: false,
    custom: true,
  },
]

export default function Pricing({ onOpenModal }) {
  return (
    <section id="pricing" style={{
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 4vw, 4rem)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(3rem, 7vw, 6rem)', maxWidth: 640 }}
        >
          <span style={{
            fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            display: 'block', marginBottom: '0.75rem',
          }}>
            Transparent Pricing
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
          }}>
            No surprises.
            <br />
            <span className="gradient-text">Just results.</span>
          </h2>
        </motion.div>

        {/* Pricing Bands */}
        <div>
          {/* Column headers (desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 2fr 1fr',
              gap: 'clamp(1rem, 3vw, 3rem)',
              padding: '0 0 1rem',
              marginBottom: '0.5rem',
            }}
            className="pricing-header"
          >
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Plan</span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>What's included</span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', textAlign: 'right' }}>Investment</span>
          </motion.div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 0 }} />

          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              {/* Featured wrapper */}
              <div style={{
                position: 'relative',
                ...(plan.featured ? {
                  background: 'rgba(94,174,255,0.04)',
                  margin: '0 -1.5rem',
                  padding: '0 1.5rem',
                } : {}),
              }}>
                {/* Recommended badge */}
                {plan.recommended && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
                    borderRadius: '2px 2px 0 0',
                  }} />
                )}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 2fr 1fr',
                    gap: 'clamp(1rem, 3vw, 3rem)',
                    alignItems: 'start',
                    padding: plan.featured
                      ? 'clamp(2rem, 4vw, 3rem) 0'
                      : 'clamp(1.75rem, 3.5vw, 2.75rem) 0',
                  }}
                  className="pricing-row"
                >
                  {/* Plan name */}
                  <div>
                    {plan.recommended && (
                      <div style={{
                        display: 'inline-block',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.65rem',
                        borderRadius: 100,
                        background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                        color: '#fff',
                        marginBottom: '0.65rem',
                      }}>
                        Recommended
                      </div>
                    )}
                    <h3 style={{
                      fontSize: plan.featured
                        ? 'clamp(1.4rem, 2.8vw, 2.2rem)'
                        : 'clamp(1.2rem, 2.2vw, 1.8rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: '#fff',
                      marginBottom: '0.4rem',
                    }}>
                      {plan.name}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(0.82rem, 1.2vw, 0.9rem)',
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.5,
                    }}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Features */}
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}>
                    {plan.features.map(feat => (
                      <li key={feat} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: plan.featured ? '#5eaeff' : 'rgba(94,174,255,0.7)', marginTop: '0.18em', flexShrink: 0 }}>
                          <Check size={13} strokeWidth={2.5} />
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: plan.featured
                        ? 'clamp(1.5rem, 3vw, 2.5rem)'
                        : 'clamp(1.3rem, 2.5vw, 2rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      ...(plan.featured ? {
                        background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      } : { color: '#fff' }),
                      lineHeight: 1.1,
                    }}>
                      {plan.upfront}
                    </div>
                    {plan.monthly && (
                      <div style={{
                        fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: '0.25rem',
                      }}>
                        + {plan.monthly}
                      </div>
                    )}
                    {plan.custom && (
                      <button
                        onClick={onOpenModal}
                        style={{
                          marginTop: '0.75rem',
                          fontSize: '0.78rem',
                          color: 'rgba(255,255,255,0.65)',
                          background: 'none',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: 100,
                          padding: '0.4rem 0.9rem',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.2s, color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                      >
                        Get a quote
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              {i < plans.length - 1 && (
                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
              )}
            </motion.div>
          ))}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.4)',
            textAlign: 'center',
          }}
        >
          Not sure which plan is right for you? Claim your free mock-up and we'll recommend the best fit.
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-header { display: none !important; }
          .pricing-row {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .pricing-row > div:last-child {
            text-align: left !important;
          }
        }
        @media (max-width: 900px) {
          .pricing-header {
            grid-template-columns: 1fr 1fr !important;
          }
          .pricing-header > span:nth-child(2) { display: none; }
          .pricing-row {
            grid-template-columns: 1fr 1fr !important;
          }
          .pricing-row > ul { display: none !important; }
        }
      `}</style>
    </section>
  )
}
