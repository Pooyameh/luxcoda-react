import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'

const plans = [
  {
    name:  'Starter',
    price: '$999 + $59/mo',
    desc:  'A sharp, custom-designed site for businesses ready to look professional online.',
  },
  {
    name:  'Growth',
    price: '$1,499 + $129/mo',
    desc:  'Everything in Starter plus active SEO to get found by the right people.',
  },
  {
    name:  'Pro',
    price: '$1,999 + $249/mo',
    desc:  'Content calendars, lead forms, and ongoing optimisation. Your full digital engine.',
  },
  {
    name:  'Custom',
    price: 'By quote',
    desc:  'Paywalls, bookings, complex integrations. If you can imagine it, we\'ll build it.',
  },
]

function PlanRow({ name, price, desc, index }) {
  const rowRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(rowRef.current, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: rowRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(rowRef.current, {
            opacity: 1, y: 0,
            duration: 0.9, ease: 'power2.out',
            delay: index * 0.08,
          })
        },
      })
    }, rowRef)
    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={rowRef}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: 'clamp(2rem, 4vh, 3.5rem) 0',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 'clamp(1rem, 3vw, 4rem)',
        alignItems: 'start',
      }}
      className="plan-row"
    >
      <div>
        <AnimatedText
          as="h3"
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 600,
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            color: 'var(--white)',
            lineHeight: 1,
            marginBottom: '0.75rem',
          }}
          start="top 90%"
        >
          {name}
        </AnimatedText>
        <p style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 14,
          color: 'var(--text-muted)',
          maxWidth: 400,
          lineHeight: 1.6,
          marginTop: '0.5rem',
        }}>
          {desc}
        </p>
      </div>

      <div style={{ textAlign: 'right', paddingTop: '0.5rem' }}>
        <p style={{
          fontFamily: 'var(--sans)',
          fontWeight: 500,
          fontSize: 14,
          color: 'var(--gold)',
          whiteSpace: 'nowrap',
        }}>
          {price}
        </p>
      </div>
    </div>
  )
}

export default function Pricing({ onOpenModal }) {
  return (
    <section id="pricing" style={{ background: 'transparent', padding: '15vh 0' }}>
      <div className="content-wrap">
        {plans.map((p, i) => (
          <PlanRow key={p.name} index={i} {...p} />
        ))}

        {/* Bottom border */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

        <div style={{ marginTop: '3rem' }}>
          <button className="btn-gold" onClick={onOpenModal}>
            Start with a free mock-up →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .plan-row { grid-template-columns: 1fr !important; }
          .plan-row > div:last-child { text-align: left !important; padding-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}
