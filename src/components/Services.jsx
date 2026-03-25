import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Web Design',
    tag: '01',
    desc: 'Bespoke, pixel-perfect websites built from scratch that reflect your brand and convert visitors into customers.',
    color: '#5eaeff',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    title: 'E-Commerce',
    tag: '02',
    desc: 'Online stores with seamless checkout, inventory management, and payment integrations that sell 24/7.',
    color: '#a78bfa',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    title: 'SEO & Google',
    tag: '03',
    desc: 'Built to rank. Every site we build is optimised for Google from day one — structured data, speed, and local SEO.',
    color: '#34d399',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Brand Identity',
    tag: '04',
    desc: 'Logo, colour palette, and typography systems that make your business look premium and professional across every touchpoint.',
    color: '#f472b6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Landing Pages',
    tag: '05',
    desc: 'High-converting single pages for ads, campaigns, and promotions — designed to turn clicks into enquiries.',
    color: '#fbbf24',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Ongoing Care',
    tag: '06',
    desc: 'Monthly maintenance, hosting, updates, and priority support so your site stays fast, secure, and up to date.',
    color: '#a855f7',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current
      if (!track) return

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 48)

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      return () => tween.kill()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0a0a1a',
        overflow: 'hidden',
      }}
    >
      {/* Section header — visible while pinned */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '60px 48px 0',
          pointerEvents: 'none',
        }}
        className="lg:block hidden"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span style={{ display: 'inline-block', width: 32, height: 2, background: 'linear-gradient(90deg, #5eaeff, #a855f7)' }} />
          <span className="section-label">What We Build</span>
        </div>
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800,
            color: '#f0f0ff',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Services that{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            drive results
          </span>
        </h2>
      </div>

      {/* Mobile heading */}
      <div className="lg:hidden block" style={{ padding: '60px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span style={{ display: 'inline-block', width: 32, height: 2, background: 'linear-gradient(90deg, #5eaeff, #a855f7)' }} />
          <span className="section-label">What We Build</span>
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 800, color: '#f0f0ff', margin: 0 }}>
          Services that{' '}
          <span style={{ background: 'linear-gradient(135deg, #5eaeff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            drive results
          </span>
        </h2>
      </div>

      {/* Horizontal scroll track — desktop */}
      <div
        className="lg:block hidden"
        style={{ paddingTop: 160, paddingBottom: 60, overflow: 'hidden' }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 24,
            paddingLeft: 48,
            paddingRight: 48,
            width: 'max-content',
            alignItems: 'stretch',
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* Vertical grid — mobile */}
      <div
        className="lg:hidden grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
          padding: '0 24px 60px',
        }}
      >
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} mobile />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ service, index, mobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: mobile ? index * 0.08 : 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        width: mobile ? 'auto' : 360,
        flexShrink: 0,
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 20,
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        cursor: 'default',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${service.color}33`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
      }}
    >
      {/* Tag + Icon row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '3.5rem',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.04)',
            letterSpacing: '0.05em',
          }}
        >
          {service.tag}
        </span>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: `${service.color}15`,
            border: `1px solid ${service.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: service.color,
          }}
        >
          {service.icon}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#f0f0ff',
          margin: 0,
        }}
      >
        {service.title}
      </h3>

      {/* Desc */}
      <p
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: '0.925rem',
          fontWeight: 400,
          color: 'rgba(240,240,255,0.65)',
          margin: 0,
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {service.desc}
      </p>

      {/* Bottom accent line */}
      <div
        style={{
          height: 2,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${service.color}60, transparent)`,
        }}
      />
    </motion.div>
  )
}
