import { useRef, useLayoutEffect } from 'react'
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
    upfront: "Custom",
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
          end: '+=1400',
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      })

      tl.fromTo('.pricing-title-block',
        { opacity: 0, y: 22, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.2, ease: 'power2.out' },
        0
      )
      tl.fromTo('.pricing-plan',
        { opacity: 0, y: 26, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 0.3, ease: 'power2.out' },
        0.15
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="pricing" style={{
      height: '100vh',
      background: '#060612',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'visible',
      padding: '80px 0 clamp(3rem, 5vh, 4.5rem)',
      boxSizing: 'border-box',
    }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '70vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, rgba(94,174,255,0.04) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div style={{
        maxWidth: 1400, margin: '0 auto', width: '100%',
        padding: '0 clamp(1.25rem, 4vw, 4rem)',
        position: 'relative', zIndex: 1,
      }}>

        {/* Header */}
        <div className="pricing-title-block" style={{ opacity: 0, marginBottom: 'clamp(0.75rem, 1.5vw, 1.2rem)' }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            display: 'block', marginBottom: '0.5rem',
          }}>
            Transparent Pricing
          </span>
          <h2 style={{
            fontSize: 'clamp(1.7rem, 3.5vw, 3.4rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
          }}>
            No surprises.{' '}
            <span className="gradient-text">Just results.</span>
          </h2>
        </div>

        {/* Plans */}
        <div style={{
          borderRadius: 20,
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.11)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}>
          {/* Column labels */}
          <div className="pricing-header-row" style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.8fr 0.85fr',
            gap: 'clamp(0.75rem, 2.5vw, 2.5rem)',
            padding: 'clamp(0.45rem, 0.8vw, 0.7rem) clamp(1.25rem, 2.5vw, 2rem)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['Plan', "What's included", 'Investment'].map((h, hi) => (
              <span key={h} style={{
                fontSize: '0.66rem', letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
                ...(hi === 2 ? { textAlign: 'right' } : {}),
              }}>{h}</span>
            ))}
          </div>

          {plans.map((plan, pi) => (
            <div
              key={plan.name}
              className="pricing-plan"
              style={{
                opacity: 0,
                borderBottom: pi < plans.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                ...(plan.featured ? {
                  background: 'rgba(94,174,255,0.04)',
                  borderLeft: '2px solid',
                  borderImage: 'linear-gradient(180deg, #5eaeff, #a855f7) 1',
                } : {}),
              }}
            >
              <div
                className="pricing-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1.8fr 0.85fr',
                  gap: 'clamp(0.75rem, 2.5vw, 2.5rem)',
                  alignItems: 'start',
                  padding: plan.featured
                    ? 'clamp(0.65rem, 1.2vw, 1rem) clamp(1.25rem, 2.5vw, 2rem)'
                    : 'clamp(0.5rem, 0.9vw, 0.8rem) clamp(1.25rem, 2.5vw, 2rem)',
                }}
              >
                {/* Name col */}
                <div>
                  {plan.featured && (
                    <div style={{
                      display: 'inline-block', fontSize: '0.6rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '0.22rem 0.6rem', borderRadius: 100,
                      background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                      color: '#fff', marginBottom: '0.4rem',
                    }}>Recommended</div>
                  )}
                  <div style={{
                    fontSize: plan.featured
                      ? 'clamp(1.05rem, 1.8vw, 1.55rem)'
                      : 'clamp(0.9rem, 1.5vw, 1.3rem)',
                    fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.2rem',
                  }}>{plan.name}</div>
                  <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>{plan.tagline}</div>
                </div>

                {/* Features col */}
                <ul className="pricing-features-col" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.4rem',
                      fontSize: 'clamp(0.76rem, 1vw, 0.86rem)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.45,
                    }}>
                      <span style={{ color: plan.featured ? '#5eaeff' : 'rgba(94,174,255,0.55)', marginTop: '0.15em', flexShrink: 0 }}>
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price col */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: plan.featured
                      ? 'clamp(1.2rem, 2.2vw, 2rem)'
                      : 'clamp(1rem, 1.7vw, 1.55rem)',
                    fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
                    ...(plan.featured ? {
                      background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    } : { color: '#fff' }),
                  }}>{plan.upfront}</div>
                  {plan.monthly && (
                    <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.38)', marginTop: '0.15rem' }}>
                      + {plan.monthly}
                    </div>
                  )}
                  {plan.custom && (
                    <button
                      onClick={onOpenModal}
                      style={{
                        marginTop: '0.4rem', fontSize: '0.7rem',
                        color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100,
                        padding: '0.3rem 0.75rem', cursor: 'pointer', fontFamily: 'inherit',
                        backdropFilter: 'blur(8px)', transition: 'border-color 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                    >Get a quote</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{
          marginTop: 'clamp(0.75rem, 1.5vw, 1.2rem)',
          fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center',
        }}>
          Claim a free mock-up and we'll recommend the best fit for your business.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-header-row { display: none !important; }
          .pricing-features-col { display: none !important; }
          .pricing-row {
            grid-template-columns: 1fr auto !important;
            gap: 0.75rem 1rem !important;
            align-items: center !important;
          }
          .pricing-row > div:last-child { text-align: right !important; }
        }
      `}</style>
    </div>
  )
}
