import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'

const steps = [
  {
    num: '01',
    label: 'Discovery',
    heading: 'We start by listening.',
    body: 'Before we sketch a single pixel, we sit down with you. We learn your business inside and out — who your customers are, what makes you different from the shop down the road, and what "success" actually looks like for you. No questionnaires. No assumptions. A real conversation, usually over coffee.',
    flip: false,
  },
  {
    num: '02',
    label: 'Design',
    heading: 'Every detail, intentional.',
    body: 'We don\'t use templates. Every element on your site is designed from scratch — the typography, the spacing, the way your images breathe on the page. We obsess over the details your competitors don\'t even notice. The result is a site that doesn\'t just look good — it feels like your brand came to life on screen.',
    flip: true,
  },
  {
    num: '03',
    label: 'Develop',
    heading: 'Built for speed. Engineered to last.',
    body: 'Your site is hand-coded on the same modern frameworks used by the world\'s top agencies — React, Vite, GSAP, Three.js. No bloated WordPress themes, no page builders that break overnight. Every line of code is written for performance, accessibility, and the kind of smooth interactions that make visitors stop and pay attention.',
    flip: false,
  },
  {
    num: '04',
    label: 'Launch & Grow',
    heading: 'Go live with confidence.',
    body: 'Launch day is just the beginning. We handle hosting, SSL, analytics setup, and ongoing support. As your business grows, your site grows with it. Need to add a booking system next quarter? A blog? We\'re a message away. You\'ll never be left wondering who to call.',
    flip: true,
  },
]

function Step({ num, label, heading, body, flip }) {
  const numRef     = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(numRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: numRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.set(contentRef.current, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      className="process-step"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(2rem, 6vw, 8rem)',
        alignItems: 'center',
        padding: '10vh clamp(1.5rem, 5vw, 4rem)',
        maxWidth: 1100,
        margin: '0 auto',
        minHeight: '90vh',
      }}
    >
      {/* Number side */}
      <div style={{
        order: flip ? 2 : 1,
        display: 'flex',
        justifyContent: flip ? 'flex-end' : 'flex-start',
        position: 'relative',
      }}>
        <div
          ref={numRef}
          style={{
            fontFamily: '"Bodoni Moda", serif',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 15vw, 14rem)',
            lineHeight: 1,
            color: 'var(--white)',
            opacity: 0.06,
            userSelect: 'none',
            willChange: 'transform',
          }}
        >
          {num}
        </div>
      </div>

      {/* Content side */}
      <div ref={contentRef} style={{ order: flip ? 1 : 2 }}>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '1.25rem',
        }}>
          {label}
        </p>

        <AnimatedText
          as="h3"
          style={{
            fontFamily: '"Bodoni Moda", serif',
            fontWeight: 600,
            fontSize: 'clamp(1.3rem, 2.5vw, 2.2rem)',
            color: 'var(--white)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}
          start="top 85%"
        >
          {heading}
        </AnimatedText>

        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
          color: 'var(--muted-strong)',
          lineHeight: 1.8,
          maxWidth: 480,
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" style={{ background: 'transparent', padding: '5vh 0' }}>
      {steps.map((s, i) => (
        <Step key={i} {...s} />
      ))}

      <style>{`
        @media (max-width: 640px) {
          .process-step {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .process-step > div { order: unset !important; }
        }
      `}</style>
    </section>
  )
}
