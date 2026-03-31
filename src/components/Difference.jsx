import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const items = [
  {
    num: '01',
    title: 'No Templates',
    body: 'Every site is designed and built from scratch. No Squarespace, no Wix, no generic themes re-skinned with your logo. Your business is unique — your website should be too.',
  },
  {
    num: '02',
    title: 'Live in 7 Days',
    body: 'From brief to launch in under a week. Most agencies take 6–12 weeks and charge double. We move fast without cutting corners.',
  },
  {
    num: '03',
    title: 'Built to Convert',
    body: 'Every layout, headline, and button is designed to turn visitors into customers — not to win a design award. Your site is a sales tool, and we treat it like one.',
  },
  {
    num: '04',
    title: 'Ongoing & Local',
    body: "Monthly hosting, maintenance, and updates included. We're a Brisbane studio — same city, same time zone, always available.",
  },
]

export default function Difference() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2800',
          pin: true,
          scrub: 2.0,
          anticipatePin: 1,
        },
      })

      // Section label + rule fade in
      tl.fromTo('.diff-header',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
        0
      )

      // Each row reveals with clip-path + blur
      items.forEach((_, i) => {
        const start = 0.15 + i * 0.22

        tl.fromTo(
          `.diff-row-${i}`,
          { opacity: 0, y: 28, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.18, ease: 'power2.out' },
          start
        )
        tl.fromTo(
          `.diff-num-${i}`,
          { y: '105%' },
          { y: '0%', duration: 0.14, ease: 'power2.out' },
          start
        )
        tl.fromTo(
          `.diff-title-${i}`,
          { y: '105%' },
          { y: '0%', duration: 0.18, ease: 'power2.out' },
          start + 0.02
        )
        tl.fromTo(
          `.diff-body-${i}`,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.16, ease: 'power2.out' },
          start + 0.06
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} style={{
      height: '100vh',
      background: '#07070f',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      padding: 'clamp(80px, 11vh, 110px) 0 clamp(3rem, 6vh, 5rem)',
    }}>
      {/* Background orb */}
      <div style={{
        position: 'absolute', top: '30%', right: '-10%', pointerEvents: 'none',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(94,174,255,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div style={{
        maxWidth: 1400, margin: '0 auto', width: '100%',
        padding: '0 clamp(1.25rem, 4vw, 4rem)',
        position: 'relative', zIndex: 1,
      }}>

        {/* Section header */}
        <div className="diff-header" style={{ opacity: 0, marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>
            The Difference
          </span>
        </div>

        {/* Top divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)', marginBottom: 0 }} />

        {items.map((item, idx) => (
          <div key={item.num} className={`diff-row-${idx}`} style={{ opacity: 0 }}>
            <div
              className="diff-row-inner"
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(2.5rem, 5vw, 5rem) 1fr 1.1fr',
                gap: 'clamp(0.75rem, 2.5vw, 2.5rem)',
                alignItems: 'start',
                padding: 'clamp(1.2rem, 2.2vw, 1.9rem) 0',
              }}
            >
              {/* Number */}
              <div style={{ overflow: 'hidden', paddingTop: '0.2em' }}>
                <span className={`diff-num-${idx} gradient-text`} style={{
                  display: 'inline-block',
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em',
                }}>
                  {item.num}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 'clamp(1.35rem, 2.8vw, 2.5rem)',
                fontWeight: 700, letterSpacing: '-0.035em',
                lineHeight: 1.1, color: '#fff', margin: 0,
                overflow: 'hidden',
              }}>
                <span className={`diff-title-${idx}`} style={{ display: 'inline-block' }}>
                  {item.title}
                </span>
              </h3>

              {/* Body */}
              <p className={`diff-body-${idx}`} style={{
                fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.75, margin: 0,
                opacity: 0,
              }}>
                {item.body}
              </p>
            </div>

            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)' }} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .diff-row-inner { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        }
      `}</style>
    </div>
  )
}
