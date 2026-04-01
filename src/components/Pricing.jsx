import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    upfront: '$999',
    monthly: '$69/mo',
    tagline: 'Everything you need to get online and be found.',
    features: ['Custom-designed website', 'Fully mobile responsive', 'SEO-ready structure', 'Contact forms', 'Monthly hosting & maintenance'],
    accent: '#5eaeff',
  },
  {
    name: 'Growth',
    upfront: '$1,499',
    monthly: '$149/mo',
    tagline: 'Built to rank higher and earn more trust.',
    features: ['Everything in Starter', 'Premium animations', 'Active SEO management', 'Google Business setup & management', 'Monthly performance reports'],
    accent: '#a855f7',
  },
  {
    name: 'Accelerate',
    upfront: '$1,999',
    monthly: '$249/mo',
    tagline: 'The complete growth system for serious businesses.',
    features: ['Everything in Growth', 'Facebook & Instagram ad setup', 'Google Ads management', 'Social media content calendar', 'Review generation strategy'],
    featured: true,
    accent: '#22d3ee',
  },
  {
    name: 'Premium',
    upfront: 'Custom',
    monthly: null,
    tagline: 'A fully managed presence — done entirely for you.',
    features: ['Everything in Accelerate', 'Professional photography', 'Booking systems & paywalls', 'Email newsletters', 'Full social media management'],
    custom: true,
    accent: '#f472b6',
  },
]

/* ─── Tilt Plan Card ─── */
function PlanCard({ plan, onOpenModal, delay }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 22, stiffness: 200 })
  const sy = useSpring(y, { damping: 22, stiffness: 200 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={cardRef}
      className="pricing-plan"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ perspective: '900px', height: '100%' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          height: '100%',
          borderRadius: 24,
          padding: plan.featured ? 'clamp(1.5rem, 3vw, 2.25rem)' : 'clamp(1.25rem, 2.5vw, 2rem)',
          background: plan.featured
            ? 'rgba(34,211,238,0.06)'
            : 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: plan.featured
            ? '1px solid rgba(34,211,238,0.28)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: plan.featured
            ? '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 60px rgba(34,211,238,0.08)'
            : '0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column',
          position: 'relative', overflow: 'hidden',
          boxSizing: 'border-box',
        }}
        whileHover={{
          boxShadow: plan.featured
            ? `0 48px 120px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 80px rgba(34,211,238,0.14)`
            : `0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px ${plan.accent}12`,
          borderColor: plan.featured ? 'rgba(34,211,238,0.45)' : `${plan.accent}30`,
          transition: { duration: 0.3 },
        }}
      >
        {/* Gradient corner glow on featured */}
        {plan.featured && (
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '60%', height: '60%',
            background: 'radial-gradient(circle at 100% 0%, rgba(34,211,238,0.12) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Recommended badge */}
        {plan.featured && (
          <div style={{
            display: 'inline-block', alignSelf: 'flex-start',
            fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.25rem 0.7rem', borderRadius: 100,
            background: 'linear-gradient(135deg, #22d3ee, #5eaeff)',
            color: '#fff', marginBottom: '0.75rem',
            boxShadow: '0 4px 16px rgba(34,211,238,0.3)',
            transform: 'translateZ(18px)',
            transformStyle: 'preserve-3d',
          }}>
            ✦ Recommended
          </div>
        )}

        {/* Plan name */}
        <div style={{
          fontSize: plan.featured
            ? 'clamp(1.2rem, 2.2vw, 1.75rem)'
            : 'clamp(1rem, 1.8vw, 1.45rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          color: '#fff', marginBottom: '0.35rem',
          transform: 'translateZ(16px)',
          transformStyle: 'preserve-3d',
        }}>
          {plan.name}
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: '0.78rem', color: 'rgba(255,255,255,0.52)',
          lineHeight: 1.5, marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {plan.tagline}
        </div>

        {/* Price */}
        <div style={{
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          transform: 'translateZ(14px)',
          transformStyle: 'preserve-3d',
        }}>
          <div style={{
            fontSize: plan.featured
              ? 'clamp(1.8rem, 3.5vw, 2.75rem)'
              : 'clamp(1.5rem, 2.8vw, 2.25rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
            ...(plan.featured ? {
              background: 'linear-gradient(135deg, #22d3ee, #5eaeff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } : { color: '#fff' }),
          }}>
            {plan.upfront}
          </div>
          {plan.monthly && (
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>
              + {plan.monthly}
            </div>
          )}
          {plan.custom && (
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.25rem' }}>
              Contact us for pricing
            </div>
          )}
        </div>

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
          {plan.features.map(f => (
            <li key={f} style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.55rem',
              fontSize: 'clamp(0.78rem, 1vw, 0.88rem)',
              color: 'rgba(255,255,255,0.8)', lineHeight: 1.45,
            }}>
              <span style={{
                color: plan.featured ? '#22d3ee' : plan.accent,
                marginTop: '0.12em', flexShrink: 0,
                filter: plan.featured ? '0 0 8px rgba(34,211,238,0.5)' : 'none',
              }}>
                <Check size={12} strokeWidth={2.5} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ marginTop: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
          {plan.custom ? (
            <button
              onClick={onOpenModal}
              className="btn-ghost"
              style={{
                width: '100%', padding: '0.75rem',
                fontSize: '0.85rem', fontWeight: 600,
              }}
            >
              Get a Quote
            </button>
          ) : (
            <button
              onClick={onOpenModal}
              className={plan.featured ? 'btn-primary' : 'btn-ghost'}
              style={{
                width: '100%', padding: '0.75rem',
                fontSize: '0.85rem', fontWeight: 600,
              }}
            >
              {plan.featured ? <span>Get Started ✦</span> : 'Get Started'}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Pricing({ onOpenModal }) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=900',
        pin: true,
        anticipatePin: 1,
        scrub: 1.8,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="pricing" style={{
      height: '100vh',
      background: '#060618',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '80px clamp(1.25rem, 5vw, 5rem) clamp(3rem, 5vh, 4rem)',
      boxSizing: 'border-box',
      position: 'relative',
    }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.04) 0%, rgba(94,174,255,0.03) 30%, rgba(168,85,247,0.03) 60%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div style={{
        maxWidth: 1400, margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 1,
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)', textAlign: 'center' }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
            Transparent Pricing
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
          }}>
            No surprises.{' '}
            <span className="gradient-text">Just results.</span>
          </h2>
        </motion.div>

        {/* 4-column card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          alignItems: 'stretch',
        }} className="pricing-grid">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              onOpenModal={onOpenModal}
              delay={i * 0.09}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            marginTop: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)', textAlign: 'center',
          }}
        >
          Claim a free mock-up and we'll recommend the best fit for your business.
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
