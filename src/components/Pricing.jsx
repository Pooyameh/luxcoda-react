import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import MockupDialog from './MockupDialog'

const plans = [
  {
    name: 'Starter',
    price: '$799',
    monthly: '$49/mo',
    desc: 'Perfect for new businesses wanting a professional online presence fast.',
    features: [
      'Up to 5 custom pages',
      'Mobile responsive design',
      'Contact form',
      'Google Business setup',
      'Basic SEO optimisation',
      'SSL & hosting included',
      '1 round of revisions',
      'Live in 7 days',
    ],
    cta: 'Get Started',
    highlight: false,
    accent: '#5eaeff',
  },
  {
    name: 'Growth',
    price: '$999',
    monthly: '$129/mo',
    desc: 'For established businesses ready to level up their online presence and attract more leads.',
    features: [
      'Up to 10 custom pages',
      'Premium animations & interactions',
      'Blog / news section',
      'Advanced SEO + Google Analytics',
      'Speed & performance optimisation',
      'Social media integration',
      'Priority support',
      '2 rounds of revisions',
      'Monthly updates included',
    ],
    cta: 'Most Popular',
    highlight: true,
    accent: '#a855f7',
  },
  {
    name: 'Premium',
    price: 'Custom',
    monthly: 'Quote',
    desc: 'Full-service digital partnership for growing businesses with complex needs.',
    features: [
      'Unlimited pages',
      'E-commerce / booking systems',
      'Custom functionality & integrations',
      'Brand identity package',
      'Ongoing growth strategy',
      'Dedicated account manager',
      'Monthly reporting & analytics',
      'Unlimited revisions',
    ],
    cta: 'Let\'s Talk',
    highlight: false,
    accent: '#c084fc',
  },
]

const CheckIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function Pricing() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0d0d22',
        padding: '100px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div className="orb" style={{
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(94,174,255,0.09) 0%, transparent 65%)',
        top: '-10%',
        left: '-5%',
      }} />
      <div className="orb" style={{
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 65%)',
        bottom: '-5%',
        right: '-5%',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ display: 'inline-block', width: 32, height: 2, background: 'linear-gradient(90deg, #5eaeff, #a855f7)' }} />
            <span className="section-label">Transparent Pricing</span>
            <span style={{ display: 'inline-block', width: 32, height: 2, background: 'linear-gradient(270deg, #5eaeff, #a855f7)' }} />
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: '#f0f0ff', margin: '0 0 16px' }}>
            Simple,{' '}
            <span style={{ background: 'linear-gradient(135deg, #5eaeff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              honest
            </span>{' '}
            pricing
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '1.05rem', color: 'rgba(240,240,255,0.6)', margin: 0 }}>
            No hidden fees. No lock-in contracts. Cancel anytime.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Featured badge */}
              {plan.highlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                    color: '#fff',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    padding: '5px 18px',
                    borderRadius: 20,
                    whiteSpace: 'nowrap',
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <Card
                style={{
                  height: '100%',
                  background: plan.highlight
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.03)',
                  border: plan.highlight
                    ? '1px solid rgba(168,85,247,0.35)'
                    : '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 20,
                  padding: 0,
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: plan.highlight
                    ? '0 0 60px rgba(168,85,247,0.12)'
                    : 'none',
                }}
              >
                {/* Gradient top border for featured */}
                {plan.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
                    borderRadius: '20px 20px 0 0',
                  }} />
                )}

                <CardHeader style={{ padding: '32px 28px 20px' }}>
                  {/* Plan name */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <CardTitle style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: plan.accent,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>
                      {plan.name}
                    </CardTitle>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${plan.accent}15`,
                      border: `1px solid ${plan.accent}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: 8 }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '3.2rem',
                      lineHeight: 1,
                      letterSpacing: '0.02em',
                      color: '#f0f0ff',
                    }}>
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: '0.85rem',
                        color: 'rgba(240,240,255,0.45)',
                        marginLeft: 4,
                      }}>
                        upfront
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: plan.accent,
                    marginBottom: 16,
                  }}>
                    {plan.monthly !== 'Quote' ? `+ ${plan.monthly} ongoing` : 'Get a tailored quote'}
                  </div>

                  <CardDescription style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: '0.88rem',
                    color: 'rgba(240,240,255,0.6)',
                    lineHeight: 1.6,
                  }}>
                    {plan.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Divider */}
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                  {/* Features */}
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <CheckIcon color={plan.accent} />
                        <span style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: '0.88rem',
                          color: 'rgba(240,240,255,0.8)',
                          lineHeight: 1.4,
                        }}>
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
                          style={{ width: '100%', height: 46, borderRadius: 10, fontSize: '0.9rem' }}
                        >
                          {plan.cta} — Claim Free Mock-Up
                        </Button>
                      }
                    />
                  ) : plan.name === 'Premium' ? (
                    <a
                      href="tel:0414758891"
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <Button
                        className="ghost-btn"
                        style={{ width: '100%', height: 46, borderRadius: 10, fontSize: '0.9rem' }}
                      >
                        {plan.cta} — 0414 758 891
                      </Button>
                    </a>
                  ) : (
                    <MockupDialog
                      trigger={
                        <Button
                          className="ghost-btn"
                          style={{ width: '100%', height: 46, borderRadius: 10, fontSize: '0.9rem' }}
                        >
                          {plan.cta}
                        </Button>
                      }
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{
            textAlign: 'center',
            marginTop: 40,
            fontFamily: "'Barlow', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(240,240,255,0.35)',
          }}
        >
          All plans include a free mock-up before you commit. Not happy? You don't pay a cent.
        </motion.p>
      </div>
    </section>
  )
}
