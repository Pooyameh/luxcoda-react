import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
          end: '+=700',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Stagger each row in as the user scrolls through the pin
      tl.fromTo(
        '.diff-item',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 0.5, ease: 'power2.out' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} style={{
      height: '100vh',
      background: '#06091a',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto', width: '100%',
        padding: '0 clamp(1.25rem, 4vw, 4rem)',
      }}>

        {/* Section label */}
        <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.38)',
          }}>
            The Difference
          </span>
        </div>

        {/* Top rule */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 0 }} />

        {/* Rows — each starts invisible, GSAP staggers them in */}
        {items.map((item) => (
          <div key={item.num} className="diff-item" style={{ opacity: 0 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(2.5rem, 5vw, 5rem) 1fr 1fr',
                gap: 'clamp(0.75rem, 2.5vw, 2.5rem)',
                alignItems: 'start',
                padding: 'clamp(1.1rem, 2.2vw, 1.8rem) 0',
              }}
              className="diff-row"
            >
              <span className="gradient-text" style={{
                fontSize: '0.8rem', fontWeight: 700,
                letterSpacing: '0.05em', paddingTop: '0.15em',
              }}>
                {item.num}
              </span>

              <h3 style={{
                fontSize: 'clamp(1.3rem, 2.8vw, 2.4rem)',
                fontWeight: 700, letterSpacing: '-0.03em',
                lineHeight: 1.1, color: '#fff',
              }}>
                {item.title}
              </h3>

              <p style={{
                fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7, paddingTop: '0.25em',
              }}>
                {item.body}
              </p>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .diff-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        }
      `}</style>
    </div>
  )
}
