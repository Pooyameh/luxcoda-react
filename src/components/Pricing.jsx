import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const tiers = [
  {
    name: 'Sprint',
    nameSize: 80,
    nameStyle: 'italic',
    nameWeight: 400,
    price: 'From $1,500',
    priceSize: 24,
    body: 'A sharp, focused site. Live in two weeks.',
    bodyOpacity: 0.6,
  },
  {
    name: 'Build',
    nameSize: 120,
    nameStyle: 'normal',
    nameWeight: 700,
    price: 'From $3,500',
    priceSize: 32,
    body: 'Full custom design and development. The one they remember.',
    bodyOpacity: 1,
    featured: true,
  },
  {
    name: 'Scale',
    nameSize: 80,
    nameStyle: 'italic',
    nameWeight: 400,
    price: 'From $6,000',
    priceSize: 24,
    body: 'Ongoing partnership. Strategy, design, and growth.',
    bodyOpacity: 0.6,
  },
]

function Tier({ tier }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(ref.current, { opacity: 0, x: -40 })
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(ref.current, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
          })
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="pricing-type"
      style={{ cursor: 'default' }}
    >
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: tier.nameWeight,
          fontStyle: tier.nameStyle,
          fontSize: `clamp(${tier.nameSize * 0.55}px, ${tier.nameSize * 0.08}vw, ${tier.nameSize}px)`,
          color: 'var(--white)',
          lineHeight: 1,
          margin: 0,
          transition: 'color 0.3s ease',
        }}
      >
        {tier.name}
      </h2>

      <p
        className="pricing-price"
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: `clamp(${tier.priceSize * 0.7}px, ${tier.priceSize * 0.1}vw, ${tier.priceSize}px)`,
          color: 'var(--gold)',
          margin: '0.6rem 0 0.8rem',
          transition: 'transform 0.3s ease',
        }}
      >
        {tier.price}
      </p>

      <p
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 16,
          color: 'var(--white)',
          opacity: tier.bodyOpacity,
          margin: 0,
          maxWidth: 480,
          lineHeight: 1.6,
        }}
      >
        {tier.body}
      </p>
    </div>
  )
}

export default function Pricing() {
  const btnRef     = useRef(null)
  const lastRef    = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(btnRef.current, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: lastRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(btnRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4,
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pricing"
      style={{
        background: 'transparent',
        padding: 'clamp(4rem, 8vh, 8rem) clamp(2rem, 10vw, 16rem)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 120,
        }}
      >
        {tiers.map((tier, i) => (
          <div key={tier.name} ref={i === tiers.length - 1 ? lastRef : null}>
            <Tier tier={tier} />
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 'clamp(4rem, 8vh, 8rem)',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <button ref={btnRef} className="btn-outline-gold" data-magnetic>
          Let's talk about your project →
        </button>
      </div>

      <style>{`
        .pricing-type:hover h2 { color: var(--gold) !important; }
        .pricing-type:hover .pricing-price { transform: translateY(-4px); }
      `}</style>
    </section>
  )
}
