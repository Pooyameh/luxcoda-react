import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Tell Us About\nYour Business',
    body: 'Fill out a short form or give us a call. We learn about your business, your goals, your customers, and what you need from your website.',
    align: 'left',
  },
  {
    num: '02',
    title: 'We Design Your\nFree Mock-Up',
    body: 'Within 48 hours, we\'ll design a custom preview of your new site — built specifically for your business. No obligations, no payment required.',
    align: 'right',
  },
  {
    num: '03',
    title: 'Build, Review\n& Refine',
    body: 'Once you\'re happy with the direction, we build the full site. You get revision rounds to make sure every detail is exactly right.',
    align: 'left',
  },
  {
    num: '04',
    title: 'Launch & Maintain',
    body: 'We handle every technical detail of the launch — hosting, domain, speed optimisation. Then we stay on to keep your site fast and up to date every month.',
    align: 'right',
  },
]

export default function Process() {
  return (
    <section id="process" style={{
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 4vw, 4rem)',
      background: 'rgba(255,255,255,0.015)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(3rem, 8vw, 7rem)',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span style={{
              fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              display: 'block', marginBottom: '0.75rem',
            }}>
              How It Works
            </span>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#fff',
            }}>
              From brief
              <br />
              <span className="gradient-text">to live.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              maxWidth: 360,
            }}
          >
            Four steps from your first conversation to a live, revenue-generating website.
          </motion.p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: step.align === 'right' ? '1fr auto' : 'auto 1fr',
                alignItems: 'center',
                padding: 'clamp(2.5rem, 5vw, 4.5rem) 0',
                borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                overflow: 'hidden',
              }}
              className="process-step"
            >
              {/* Giant background number */}
              <div style={{
                position: 'absolute',
                [step.align === 'right' ? 'right' : 'left']: '-0.05em',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 'clamp(8rem, 22vw, 22rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                background: 'linear-gradient(135deg, rgba(94,174,255,0.06), rgba(168,85,247,0.06))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
              }}>
                {step.num}
              </div>

              {/* Content — switches side based on align */}
              {step.align === 'left' ? (
                <>
                  <div style={{
                    position: 'relative', zIndex: 1,
                    maxWidth: 520,
                    paddingRight: 'clamp(1rem, 4vw, 4rem)',
                  }}>
                    <StepContent step={step} />
                  </div>
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div style={{
                    position: 'relative', zIndex: 1,
                    maxWidth: 520,
                    paddingLeft: 'clamp(1rem, 4vw, 4rem)',
                    textAlign: 'right',
                  }}>
                    <StepContent step={step} rightAlign />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-step {
            grid-template-columns: 1fr !important;
            text-align: left !important;
          }
          .process-step > div:last-child:empty {
            display: none;
          }
          .process-step > div:first-child:empty {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

function StepContent({ step, rightAlign }) {
  return (
    <>
      <span className="gradient-text" style={{
        fontSize: '0.78rem', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        display: 'block', marginBottom: '0.9rem',
      }}>
        Step {step.num}
      </span>
      <h3 style={{
        fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
        color: '#fff',
        marginBottom: '1.1rem',
        whiteSpace: 'pre-line',
      }}>
        {step.title}
      </h3>
      <p style={{
        fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.75,
      }}>
        {step.body}
      </p>
    </>
  )
}
