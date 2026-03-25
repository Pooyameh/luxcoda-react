import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

// Scroll budget: 350vh container → 250vh of scroll
// 4 items each start revealing at 0, 0.22, 0.44, 0.66 and finish at +0.18
const RANGES = [
  [0,    0.18],
  [0.22, 0.40],
  [0.44, 0.62],
  [0.66, 0.84],
]

export default function Difference() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // One useTransform pair per item (React rules — no hooks in loops)
  const op0 = useTransform(scrollYProgress, RANGES[0], [0, 1])
  const y0  = useTransform(scrollYProgress, RANGES[0], [36, 0])
  const op1 = useTransform(scrollYProgress, RANGES[1], [0, 1])
  const y1  = useTransform(scrollYProgress, RANGES[1], [36, 0])
  const op2 = useTransform(scrollYProgress, RANGES[2], [0, 1])
  const y2  = useTransform(scrollYProgress, RANGES[2], [36, 0])
  const op3 = useTransform(scrollYProgress, RANGES[3], [0, 1])
  const y3  = useTransform(scrollYProgress, RANGES[3], [36, 0])

  const opacities = [op0, op1, op2, op3]
  const ys        = [y0,  y1,  y2,  y3]

  return (
    // Outer scroll track — dark navy background
    <div ref={containerRef} style={{ height: '350vh', background: '#06091a' }}>

      {/* Sticky viewport */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
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

          {/* Rows */}
          {items.map((item, i) => (
            <motion.div key={item.num} style={{ opacity: opacities[i], y: ys[i] }}>
              <div style={{
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
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .diff-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        }
      `}</style>
    </div>
  )
}
