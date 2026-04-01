import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

function PricingCard({ name, price, pitch, desc, includes, index, onOpenModal }) {
  const [hovered, setHovered] = useState(false)
  const cardRef  = useRef(null)
  const wrapRef  = useRef(null)
  const isMobile = useRef(typeof window !== 'undefined' && window.innerWidth < 768).current

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(wrapRef.current, { opacity: 0, y: 24 })
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(wrapRef.current, {
            opacity: 1, y: 0,
            duration: 0.9, ease: 'power2.out',
            delay: index * 0.07,
          })
        },
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [index])

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
    }
  }

  return (
    <div ref={wrapRef}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setTimeout(() => setHovered(false), 300)}
        style={{
          background: hovered ? 'rgba(111,163,199,0.06)' : 'rgba(232,237,242,0.02)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${hovered ? 'rgba(111,163,199,0.20)' : 'rgba(232,237,242,0.06)'}`,
          borderRadius: '16px',
          padding: 'clamp(24px, 3vw, 36px)',
          transition: 'background 0.5s cubic-bezier(0.23,1,0.32,1), border-color 0.5s cubic-bezier(0.23,1,0.32,1)',
          transformStyle: 'preserve-3d',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Diagonal shine */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: hovered
            ? 'linear-gradient(135deg, rgba(111,163,199,0.08) 0%, transparent 50%, rgba(111,163,199,0.04) 100%)'
            : 'none',
          borderRadius: '16px',
          pointerEvents: 'none',
          transition: 'background 0.5s ease',
        }} />

        {/* Corner accent dot */}
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '6px', height: '6px', borderRadius: '50%',
          background: hovered ? '#6fa3c7' : 'rgba(111,163,199,0.2)',
          transition: 'all 0.4s ease',
          boxShadow: hovered ? '0 0 12px rgba(111,163,199,0.4)' : 'none',
        }} />

        {/* Plan name */}
        <h3 style={{
          fontFamily: '"Bodoni Moda", serif',
          fontWeight: 700,
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#e8edf2',
          margin: '0 0 8px 0',
          lineHeight: 1.1,
        }}>
          {name}
        </h3>

        {/* Price */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6fa3c7',
          letterSpacing: '0.05em',
          margin: '0 0 16px 0',
        }}>
          {price}
        </p>

        {/* Pitch */}
        <p style={{
          fontFamily: '"Bodoni Moda", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
          color: 'rgba(232,237,242,0.5)',
          margin: '0 0 16px 0',
          lineHeight: 1.5,
        }}>
          {pitch}
        </p>

        {/* Description */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 300,
          fontSize: '13px',
          color: 'rgba(232,237,242,0.4)',
          lineHeight: 1.8,
          margin: '0 0 20px 0',
        }}>
          {desc}
        </p>

        {/* Includes */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          color: 'rgba(232,237,242,0.3)',
          lineHeight: 1.8,
          margin: '0 0 24px 0',
        }}>
          {includes.join(' · ')}
        </p>

        {/* CTA */}
        <button
          onClick={onOpenModal}
          style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: hovered ? '#8fc4e0' : '#6fa3c7',
            transition: 'color 0.3s ease',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}
        >
          GET STARTED
          <span style={{
            display: 'inline-block',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          }}>→</span>
        </button>
      </div>
    </div>
  )
}

export default function Pricing({ onOpenModal }) {
  return (
    <section id="pricing" style={{ background: 'transparent', padding: 'min(18vh, 160px) 0' }}>
      <div className="content-wrap">
        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            alignItems: 'start',
          }}
        >
          {plans.map((p, i) => (
            <PricingCard key={p.name} index={i} onOpenModal={onOpenModal} {...p} />
          ))}
        </div>

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

      <style>{`
        @media (max-width: 767px) {
          .pricing-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
