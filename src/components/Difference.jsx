import { motion } from 'framer-motion'

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
    body: 'Monthly hosting, maintenance, and updates are included. We\'re a Brisbane studio — same time zone, same city, always available when you need us.',
  },
]

const rowVar = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export default function Difference() {
  return (
    <section style={{
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 4vw, 4rem)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}>
            The Difference
          </span>
        </motion.div>

        {/* Rows */}
        <div>
          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              background: 'rgba(255,255,255,0.08)',
              transformOrigin: 'left',
            }}
          />

          {items.map((item, i) => (
            <motion.div
              key={item.num}
              custom={i}
              variants={rowVar}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(3rem,6vw,6rem) 1fr 1fr',
                gap: 'clamp(1rem, 3vw, 3rem)',
                alignItems: 'start',
                padding: 'clamp(2rem, 4vw, 3.5rem) 0',
              }}
              className="flex-col-mobile"
              >
                {/* Number */}
                <span className="gradient-text" style={{
                  fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  paddingTop: '0.2em',
                }}>
                  {item.num}
                </span>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: '#fff',
                }}>
                  {item.title}
                </h3>

                {/* Body */}
                <p style={{
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.7,
                  paddingTop: '0.35em',
                }}>
                  {item.body}
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .flex-col-mobile {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  )
}
