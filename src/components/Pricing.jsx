import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'

const plans = [
  {
    name: 'Starter',
    price: '$999 + $59/mo',
    pitch: 'Your foundation. Clean, fast, unforgettable.',
    desc: 'A fully custom-designed website built from scratch — no templates, no page builders. Includes a bespoke homepage, up to 4 inner pages, mobile-first responsive design, basic SEO setup, contact form integration, and deployment on blazing-fast hosting. Perfect for new businesses or anyone ready to replace their DIY site with something professional.',
    includes: ['Custom design', 'Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO', 'Fast hosting', 'SSL certificate', '30 days post-launch support'],
  },
  {
    name: 'Growth',
    price: '$1,499 + $129/mo',
    pitch: 'Everything in Starter, plus the strategy to get found.',
    desc: 'Your site should be working for you around the clock. Growth includes everything in Starter plus active monthly SEO — keyword research, on-page optimisation, Google Business Profile setup, monthly performance reporting, and local search strategy. We don\'t just build your site; we make sure the right people find it.',
    includes: ['Everything in Starter', 'Monthly SEO', 'Keyword strategy', 'Google Business Profile', 'Analytics dashboard', 'Performance reports', 'Priority support'],
  },
  {
    name: 'Pro',
    price: '$1,999 + $249/mo',
    pitch: 'Your full digital engine. Design, content, and growth — handled.',
    desc: 'For businesses that want to go beyond a website. Pro includes everything in Growth plus a monthly content calendar, social media template designs, lead capture forms with automated email follow-ups, blog setup, and quarterly strategy calls. Think of it as having a digital marketing team on retainer — without the overhead.',
    includes: ['Everything in Growth', 'Content calendar', 'Social media templates', 'Lead capture', 'Email automation', 'Blog setup', 'Quarterly strategy calls'],
  },
  {
    name: 'Custom',
    price: 'By quote',
    pitch: 'If you can imagine it, we\'ll engineer it.',
    desc: 'For projects that need more. Membership paywalls, appointment booking systems, e-commerce with custom product configurators, interactive 3D experiences, multi-language support, API integrations, complex forms and workflows — whatever your business needs, we\'ll scope it, design it, and build it to spec. Every Custom project starts with a free discovery session.',
    includes: ['Tailored to your needs', 'Free discovery session', 'Dedicated project manager', 'Custom integrations', 'Ongoing development'],
  },
]

function PlanRow({ name, price, pitch, desc, includes, index, onOpenModal }) {
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
            delay: index * 0.06,
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
        borderBottom: '1px solid rgba(240,236,228,0.06)',
        padding: 'clamp(3rem, 8vh, 5rem) 0',
      }}
    >
      {/* Plan name */}
      <AnimatedText
        as="h3"
        style={{
          fontFamily: '"Bodoni Moda", serif',
          fontWeight: 700,
          fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
          color: 'var(--white)',
          lineHeight: 1,
          marginBottom: '0.6rem',
        }}
        start="top 90%"
      >
        {name}
      </AnimatedText>

      {/* Price */}
      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 500,
        fontSize: 15,
        color: 'var(--gold)',
        letterSpacing: '0.05em',
        marginBottom: '0.75rem',
      }}>
        {price}
      </p>

      {/* Pitch */}
      <p style={{
        fontFamily: '"Bodoni Moda", serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
        color: 'var(--muted-strong)',
        marginBottom: '1.25rem',
        lineHeight: 1.4,
      }}>
        {pitch}
      </p>

      {/* Description */}
      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 300,
        fontSize: 14,
        color: 'var(--muted)',
        maxWidth: 520,
        lineHeight: 1.8,
        marginBottom: '1.25rem',
      }}>
        {desc}
      </p>

      {/* Includes — inline list */}
      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 400,
        fontSize: 13,
        color: 'var(--muted)',
        marginBottom: '1.5rem',
        lineHeight: 1.6,
      }}>
        {includes.join(' · ')}
      </p>

      {/* CTA */}
      <button
        onClick={onOpenModal}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          cursor: 'pointer',
          transition: 'opacity 0.2s',
          textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
        onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
      >
        Get Started →
      </button>
    </div>
  )
}

export default function Pricing({ onOpenModal }) {
  return (
    <section id="pricing" style={{ background: 'transparent', padding: 'min(18vh, 160px) 0' }}>
      <div className="content-wrap">
        {plans.map((p, i) => (
          <PlanRow key={p.name} index={i} onOpenModal={onOpenModal} {...p} />
        ))}

        {/* Closing note */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 14,
          color: 'var(--muted)',
          marginTop: '8vh',
          lineHeight: 1.8,
        }}>
          Every project starts with a free mock-up. No commitment. No invoice until you&apos;re thrilled.
        </p>
      </div>
    </section>
  )
}
