import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    upfront: '$999',
    monthly: '$69/mo',
    tagline: 'Everything you need to get online and be found.',
    features: ['Custom-designed website', 'Fully mobile responsive', 'SEO-ready structure', 'Contact forms', 'Monthly hosting & maintenance'],
  },
  {
    name: 'Growth',
    upfront: '$1,499',
    monthly: '$149/mo',
    tagline: 'Built to rank higher and earn more trust.',
    features: ['Everything in Starter', 'Premium animations', 'Active SEO management', 'Google Business setup & management', 'Monthly performance reports'],
  },
  {
    name: 'Accelerate',
    upfront: '$1,999',
    monthly: '$249/mo',
    tagline: 'The complete growth system for serious businesses.',
    features: ['Everything in Growth', 'Facebook & Instagram ad setup', 'Google Ads management', 'Social media content calendar', 'Review generation strategy'],
    featured: true,
  },
  {
    name: 'Premium',
    upfront: "Let's Talk",
    monthly: null,
    tagline: 'A fully managed presence — done entirely for you.',
    features: ['Everything in Accelerate', 'Professional photography', 'Booking systems & paywalls', 'Email newsletters', 'Full social media management'],
    custom: true,
  },
]

export default function Pricing({ onOpenModal }) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=700',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Stagger each plan row in as the user scrolls
      tl.fromTo(
        '.pricing-plan-row',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 0.5, ease: 'power2.out' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="pricing" style={{
      height: '100vh',
      background: '#050e0c',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto', width: '100%',
        padding: '0 clamp(1.25rem, 4vw, 4rem)',
      }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(1.2rem, 2.5vw, 2rem)' }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            display: 'block', marginBottom: '0.5rem',
          }}>
            Transparent Pricing
          </span>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05,
          }}>
            No surprises.{' '}
            <span className="gradient-text">Just results.</span>
          </h2>
        </div>

        {/* Column labels */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '0.1rem' }} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.8fr 0.9fr',
            gap: 'clamp(0.75rem, 2.5vw, 2.5rem)',
            padding: '0.6rem 0',
            marginBottom: '0.1rem',
          }}
          className="pricing-header"
        >
          {['Plan', "What's included", 'Investment'].map(h => (
            <span key={h} style={{
              fontSize: '0.68rem', letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase',
              ...(h === 'Investment' ? { textAlign: 'right' } : {}),
            }}>{h}</span>
          ))}
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* Plan rows — each starts invisible, GSAP staggers them in */}
        {plans.map((plan) => (
          <div key={plan.name} className="pricing-plan-row" style={{ opacity: 0 }}>
            {plan.featured && (
              <div style={{ height: 2, background: 'linear-gradient(90deg, #5eaeff, #a855f7)', borderRadius: '2px 2px 0 0' }} />
            )}
            <div style={{
              ...(plan.featured ? { background: 'rgba(94,174,255,0.04)', margin: '0 -0.75rem', padding: '0 0.75rem' } : {}),
            }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1.8fr 0.9fr',
                  gap: 'clamp(0.75rem, 2.5vw, 2.5rem)',
                  alignItems: 'start',
                  padding: plan.featured
                    ? 'clamp(0.9rem, 1.8vw, 1.4rem) 0'
                    : 'clamp(0.7rem, 1.4vw, 1.1rem) 0',
                }}
                className="pricing-row"
              >
                {/* Name col */}
                <div>
                  {plan.featured && (
                    <div style={{
                      display: 'inline-block',
                      fontSize: '0.6rem', fontWeight: 700,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '0.22rem 0.6rem', borderRadius: 100,
                      background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                      color: '#fff', marginBottom: '0.5rem',
                    }}>Recommended</div>
                  )}
                  <div style={{
                    fontSize: plan.featured
                      ? 'clamp(1.1rem, 2vw, 1.7rem)'
                      : 'clamp(0.95rem, 1.6vw, 1.4rem)',
                    fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.25rem',
                  }}>{plan.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.4 }}>{plan.tagline}</div>
                </div>

                {/* Features col */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.4rem',
                      fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.45,
                    }}>
                      <span style={{ color: plan.featured ? '#5eaeff' : 'rgba(94,174,255,0.65)', marginTop: '0.14em', flexShrink: 0 }}>
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price col */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: plan.featured
                      ? 'clamp(1.3rem, 2.4vw, 2.1rem)'
                      : 'clamp(1.1rem, 1.9vw, 1.7rem)',
                    fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
                    ...(plan.featured ? {
                      background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    } : { color: '#fff' }),
                  }}>{plan.upfront}</div>
                  {plan.monthly && (
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.42)', marginTop: '0.2rem' }}>
                      + {plan.monthly}
                    </div>
                  )}
                  {plan.custom && (
                    <button onClick={onOpenModal} style={{
                      marginTop: '0.5rem', fontSize: '0.72rem',
                      color: 'rgba(255,255,255,0.58)', background: 'none',
                      border: '1px solid rgba(255,255,255,0.13)', borderRadius: 100,
                      padding: '0.35rem 0.8rem', cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'rgba(255,255,255,0.58)' }}
                    >Get a quote</button>
                  )}
                </div>
              </div>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>
        ))}

        <p style={{
          marginTop: 'clamp(0.75rem, 1.5vw, 1.2rem)',
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center',
        }}>
          Claim a free mock-up and we'll recommend the best fit for your business.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-header { display: none !important; }
          .pricing-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .pricing-row > div:last-child { text-align: left !important; }
        }
      `}</style>
    </div>
  )
}
