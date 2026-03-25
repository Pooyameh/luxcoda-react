import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import MockupDialog from './MockupDialog'

const plans = [
  {
    name: 'Starter',
    price: '$999',
    monthly: '$69',
    desc: 'The perfect foundation for any Brisbane business ready to launch a professional online presence.',
    features: [
      'Custom website design',
      'Mobile responsive layout',
      'SEO-ready structure',
      'Contact forms',
      'Monthly hosting included',
      'Ongoing maintenance',
    ],
    cta: 'Get Started',
    highlight: false,
    badge: null,
    accent: '#5eaeff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    name: 'Growth',
    price: '$1,499',
    monthly: '$149',
    desc: 'Everything in Starter, plus active tools to grow your search presence and online authority.',
    features: [
      'Everything in Starter',
      'Premium animations & interactions',
      'Active SEO management',
      'Google Business setup & management',
      'Monthly performance reports',
    ],
    cta: 'Start Growing',
    highlight: false,
    badge: null,
    accent: '#818cf8',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    name: 'Accelerate',
    price: '$1,999',
    monthly: '$249',
    desc: 'Our most powerful package — everything you need to dominate your market online.',
    features: [
      'Everything in Growth',
      'Facebook & Instagram ad setup',
      'Google Ads management',
      'Social media content calendar',
      'Review generation strategy',
    ],
    cta: 'Accelerate My Business',
    highlight: true,
    badge: 'RECOMMENDED',
    accent: '#a855f7',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    name: 'Premium',
    price: 'Custom',
    monthly: null,
    desc: 'A complete white-glove digital partnership — every service, fully handled for you.',
    features: [
      'Everything in Accelerate',
      'Professional photography',
      'Booking systems & paywalls',
      'Newsletters & email marketing',
      'Full social media management',
    ],
    cta: "Let's Talk",
    highlight: false,
    badge: null,
    accent: '#c084fc',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

const CheckIcon = ({ color }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, marginTop: 1 }}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function Pricing() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 })

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0d0d22',
        padding: '120px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(94,174,255,0.07) 0%, transparent 65%)',
          top: '-20%',
          left: '-15%',
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)',
          bottom: '-15%',
          right: '-10%',
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 44,
                height: 1.5,
                background: 'linear-gradient(90deg, transparent, #5eaeff)',
                borderRadius: 2,
              }}
            />
            <span className="section-label">Transparent Pricing</span>
            <span
              style={{
                display: 'inline-block',
                width: 44,
                height: 1.5,
                background: 'linear-gradient(270deg, transparent, #a855f7)',
                borderRadius: 2,
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#f0f0ff',
              margin: '0 0 20px',
              lineHeight: 1.05,
            }}
          >
            Honest pricing,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              zero surprises
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(240,240,255,0.85)',
              margin: '0 auto',
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            No lock-in contracts. Cancel anytime. Every plan includes a free mock-up before you commit.
          </p>
        </motion.div>

        {/* 4-column pricing grid */}
        <div
          style={{
            display: 'grid',
            gap: 20,
            alignItems: 'start',
          }}
          className="xl:grid-cols-4 md:grid-cols-2 grid-cols-1"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: plan.highlight ? -12 : 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ position: 'relative' }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: -15,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                    color: '#fff',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    padding: '5px 18px',
                    borderRadius: 20,
                    whiteSpace: 'nowrap',
                    zIndex: 2,
                    boxShadow: '0 4px 20px rgba(168,85,247,0.4)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div
                className="pricing-card"
                style={{
                  background: plan.highlight
                    ? 'rgba(168,85,247,0.09)'
                    : 'rgba(255,255,255,0.03)',
                  border: plan.highlight
                    ? '1px solid rgba(168,85,247,0.45)'
                    : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 22,
                  padding: '32px 26px 28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: plan.highlight
                    ? '0 0 60px rgba(168,85,247,0.18), 0 24px 80px rgba(0,0,0,0.35)'
                    : '0 4px 24px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Gradient top border on featured card */}
                {plan.highlight && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
                      borderRadius: '22px 22px 0 0',
                    }}
                  />
                )}

                {/* Icon + plan name */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${plan.accent}18`,
                      border: `1px solid ${plan.accent}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: plan.accent,
                      flexShrink: 0,
                    }}
                  >
                    {plan.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: plan.accent,
                    }}
                  >
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div style={{ marginBottom: plan.monthly ? 4 : 8 }}>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '3.2rem',
                      letterSpacing: '0.02em',
                      color: '#f0f0ff',
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span
                      style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: '0.78rem',
                        color: 'rgba(240,240,255,0.7)',
                        marginLeft: 4,
                      }}
                    >
                      upfront
                    </span>
                  )}
                </div>

                {/* Monthly */}
                {plan.monthly ? (
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: plan.accent,
                      marginBottom: 18,
                    }}
                  >
                    + {plan.monthly}/mo ongoing
                  </div>
                ) : (
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: plan.accent,
                      marginBottom: 18,
                    }}
                  >
                    Custom quote
                  </div>
                )}

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: '0.875rem',
                    color: 'rgba(240,240,255,0.85)',
                    lineHeight: 1.65,
                    margin: '0 0 20px',
                  }}
                >
                  {plan.desc}
                </p>

                {/* Divider */}
                <div
                  style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 20 }}
                />

                {/* Features */}
                <ul
                  style={{
                    listStyle: 'none',
                    margin: '0 0 28px',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 11,
                    flex: 1,
                  }}
                >
                  {plan.features.map((f, fi) => (
                    <li
                      key={fi}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
                    >
                      <CheckIcon color={plan.accent} />
                      <span
                        style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: '0.875rem',
                          color: 'rgba(240,240,255,0.88)',
                          lineHeight: 1.45,
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.highlight ? (
                  <MockupDialog
                    trigger={
                      <Button
                        className="gradient-btn"
                        style={{
                          width: '100%',
                          height: 48,
                          borderRadius: 12,
                          fontSize: '0.875rem',
                        }}
                      >
                        {plan.cta}
                      </Button>
                    }
                  />
                ) : plan.price === 'Custom' ? (
                  <a href="tel:0414758891" style={{ textDecoration: 'none', display: 'block' }}>
                    <Button
                      className="ghost-btn"
                      style={{ width: '100%', height: 48, borderRadius: 12, fontSize: '0.875rem' }}
                    >
                      Call 0414 758 891
                    </Button>
                  </a>
                ) : (
                  <MockupDialog
                    trigger={
                      <Button
                        className="ghost-btn"
                        style={{
                          width: '100%',
                          height: 48,
                          borderRadius: 12,
                          fontSize: '0.875rem',
                        }}
                      >
                        {plan.cta}
                      </Button>
                    }
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            textAlign: 'center',
            marginTop: 52,
            fontFamily: "'Barlow', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(240,240,255,0.55)',
            lineHeight: 1.6,
          }}
        >
          All plans include a <strong style={{ color: 'rgba(240,240,255,0.85)' }}>free design mock-up</strong> before you commit. Not happy? You don't pay a cent.
        </motion.p>
      </div>
    </section>
  )
}
