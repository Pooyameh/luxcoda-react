import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { Button } from '@/components/ui/button'
import MockupDialog from './MockupDialog'

export default function Hero({ isLoaded }) {
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const metaRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      // Headline word-by-word reveal
      const headlineSplit = new SplitType(headlineRef.current, {
        types: 'words',
        wordClass: 'split-word',
      })

      gsap.fromTo(
        headlineSplit.words,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.07,
          duration: 0.85,
          ease: 'power4.out',
          delay: 0.1,
        }
      )

      // Subtitle line reveal
      const subSplit = new SplitType(subRef.current, {
        types: 'words',
        wordClass: 'split-word',
      })

      gsap.fromTo(
        subSplit.words,
        { y: '80%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.04,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.55,
        }
      )

      // Meta info fade up
      gsap.fromTo(
        metaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.85,
        }
      )

      return () => {
        headlineSplit.revert()
        subSplit.revert()
      }
    })

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0a0a1a',
        paddingTop: 100,
        paddingBottom: 60,
      }}
    >
      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(94,174,255,0.15) 0%, transparent 65%)',
          top: '-20%',
          left: '-10%',
        }}
      />
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 65%)',
          bottom: '-10%',
          right: '-5%',
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 32,
              height: 2,
              background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
            }}
          />
          <span className="section-label">Brisbane Web Design Studio</span>
        </motion.div>

        {/* Logo in hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.0 }}
          style={{ marginBottom: 32 }}
        >
          <img
            src="/logo.png"
            alt="Luxcoda"
            style={{ height: 'auto', width: 220, maxWidth: '55vw', objectFit: 'contain' }}
          />
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              color: '#f0f0ff',
              margin: 0,
              fontWeight: 400,
            }}
          >
            Custom Websites for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #5eaeff 0%, #c084fc 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Brisbane
            </span>{' '}
            Businesses.
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{ overflow: 'hidden', marginBottom: 40 }}>
          <p
            ref={subRef}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
              fontWeight: 500,
              color: 'rgba(240,240,255,0.65)',
              margin: 0,
              maxWidth: 640,
              lineHeight: 1.5,
            }}
          >
            No templates. No cookie-cutters. A bespoke site built for your business — live in 7 days.
          </p>
        </div>

        {/* Phone + CTAs */}
        <div ref={metaRef} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          {/* Phone */}
          <a
            href="tel:0414758891"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: '#f0f0ff',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '0.03em',
              padding: '10px 20px',
              borderRadius: 10,
              border: '1px solid rgba(94,174,255,0.25)',
              background: 'rgba(94,174,255,0.06)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(94,174,255,0.6)'
              e.currentTarget.style.background = 'rgba(94,174,255,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(94,174,255,0.25)'
              e.currentTarget.style.background = 'rgba(94,174,255,0.06)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5eaeff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            0414 758 891
          </a>

          {/* Claim Free Mock-Up CTA */}
          <MockupDialog
            trigger={
              <Button
                className="gradient-btn"
                style={{
                  height: 46,
                  padding: '0 28px',
                  borderRadius: 10,
                  fontSize: '0.95rem',
                }}
              >
                Claim Free Mock-Up
              </Button>
            }
          />

          {/* View Our Work */}
          <Button
            className="ghost-btn"
            style={{
              height: 46,
              padding: '0 28px',
              borderRadius: 10,
              fontSize: '0.95rem',
            }}
            onClick={() => {
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Our Work
          </Button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: -20,
            left: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 1,
              height: 60,
              background: 'linear-gradient(180deg, rgba(94,174,255,0.8), transparent)',
            }}
          />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(240,240,255,0.3)',
              writingMode: 'vertical-lr',
            }}
          >
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  )
}
