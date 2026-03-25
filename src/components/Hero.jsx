import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { Button } from '@/components/ui/button'
import MockupDialog from './MockupDialog'

/* ── Browser mockup visual ─────────────────────────────── */
function BrowserMockup({ isLoaded }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 540 }}>
      {/* Main browser window */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(12, 12, 30, 0.85)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow:
            '0 50px 120px rgba(94,174,255,0.12), 0 20px 60px rgba(168,85,247,0.1), 0 0 0 1px rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '11px 16px',
            background: 'rgba(255,255,255,0.035)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div
              key={i}
              style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.9 }}
            />
          ))}
          <div
            style={{
              marginLeft: 10,
              flex: 1,
              height: 22,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 6,
              maxWidth: 220,
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              gap: 6,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(94,174,255,0.5)' }} />
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.02em',
              }}
            >
              luxcoda.com
            </span>
          </div>
        </div>

        {/* Fake website */}
        <div style={{ background: '#0d0d1f' }}>
          {/* Fake nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 22px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ width: 90, height: 14, background: 'rgba(255,255,255,0.18)', borderRadius: 4 }} />
            <div style={{ display: 'flex', gap: 12 }}>
              {[52, 60, 56, 48].map((w, i) => (
                <div
                  key={i}
                  style={{ width: w, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}
                />
              ))}
            </div>
          </div>

          {/* Fake hero */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(94,174,255,0.18) 0%, rgba(168,85,247,0.18) 100%)',
              padding: '32px 22px 28px',
            }}
          >
            <div
              style={{
                width: '70%',
                height: 24,
                background: 'rgba(255,255,255,0.22)',
                borderRadius: 6,
                marginBottom: 10,
              }}
            />
            <div
              style={{
                width: '50%',
                height: 24,
                background: 'rgba(255,255,255,0.22)',
                borderRadius: 6,
                marginBottom: 18,
              }}
            />
            <div
              style={{
                width: '85%',
                height: 9,
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 4,
                marginBottom: 7,
              }}
            />
            <div
              style={{
                width: '65%',
                height: 9,
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 4,
                marginBottom: 22,
              }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <div
                style={{
                  width: 110,
                  height: 30,
                  background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                  borderRadius: 7,
                }}
              />
              <div
                style={{
                  width: 88,
                  height: 30,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 7,
                }}
              />
            </div>
          </div>

          {/* Fake service cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 10,
              padding: '18px 22px 22px',
            }}
          >
            {[
              { color: '#5eaeff' },
              { color: '#a855f7' },
              { color: '#34d399' },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: `${c.color}10`,
                  border: `1px solid ${c.color}25`,
                  borderRadius: 10,
                  padding: '14px 12px',
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    background: `${c.color}22`,
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    width: '88%',
                    height: 8,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 3,
                    marginBottom: 6,
                  }}
                />
                <div
                  style={{
                    width: '72%',
                    height: 6,
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: 3,
                    marginBottom: 5,
                  }}
                />
                <div
                  style={{
                    width: '90%',
                    height: 6,
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: 3,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating stat — "7 Day Delivery" */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        className="float-a"
        style={{
          position: 'absolute',
          top: -22,
          right: -36,
          background: 'rgba(10, 10, 30, 0.92)',
          border: '1px solid rgba(94,174,255,0.3)',
          borderRadius: 14,
          padding: '13px 18px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: 'rgba(94,174,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
            }}
          >
            ⚡
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#f0f0ff',
                lineHeight: 1.2,
              }}
            >
              7 Day Delivery
            </div>
            <div
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '0.68rem',
                color: 'rgba(240,240,255,0.75)',
              }}
            >
              From brief to live
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating stat — "Brisbane-Based" */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 2.25, ease: [0.16, 1, 0.3, 1] }}
        className="float-b"
        style={{
          position: 'absolute',
          bottom: 28,
          left: -44,
          background: 'rgba(10, 10, 30, 0.92)',
          border: '1px solid rgba(168,85,247,0.3)',
          borderRadius: 14,
          padding: '13px 18px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: 'rgba(168,85,247,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
            }}
          >
            📍
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#f0f0ff',
                lineHeight: 1.2,
              }}
            >
              Brisbane-Based
            </div>
            <div
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '0.68rem',
                color: 'rgba(240,240,255,0.75)',
              }}
            >
              Local studio, global quality
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating stat — "No Templates" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: -18,
          right: 50,
          background: 'rgba(10, 10, 30, 0.92)',
          border: '1px solid rgba(52,211,153,0.3)',
          borderRadius: 14,
          padding: '10px 16px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#34d399',
              boxShadow: '0 0 8px rgba(52,211,153,0.6)',
            }}
          />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#f0f0ff',
            }}
          >
            No templates. Ever.
          </span>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Hero ──────────────────────────────────────────────── */
export default function Hero({ isLoaded }) {
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const metaRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
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
          stagger: 0.065,
          duration: 0.9,
          ease: 'power4.out',
          delay: 0.15,
        }
      )

      const subSplit = new SplitType(subRef.current, {
        types: 'words',
        wordClass: 'split-word',
      })

      gsap.fromTo(
        subSplit.words,
        { y: '70%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.04,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.6,
        }
      )

      gsap.fromTo(
        metaRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.95,
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
        paddingBottom: 80,
      }}
    >
      {/* Background orbs */}
      <div
        className="orb"
        style={{
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(94,174,255,0.13) 0%, transparent 65%)',
          top: '-25%',
          left: '-15%',
        }}
      />
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(168,85,247,0.11) 0%, transparent 65%)',
          bottom: '-20%',
          right: '-10%',
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Two-column layout on lg+ */}
        <div
          style={{ display: 'grid', alignItems: 'center', gap: 60 }}
          className="lg:grid-cols-[1.1fr_0.9fr] grid-cols-1"
        >
          {/* ── Left content ── */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 }}
              style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 36,
                  height: 2,
                  background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
                  borderRadius: 2,
                }}
              />
              <span className="section-label">Brisbane Web Design Studio</span>
            </motion.div>

            {/* Logo — large */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: 36 }}
            >
              <img
                src="/logo.png"
                alt="Luxcoda"
                style={{
                  width: 'clamp(200px, 40vw, 360px)',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </motion.div>

            {/* Headline */}
            <div style={{ overflow: 'hidden', marginBottom: 10 }}>
              <h1
                ref={headlineRef}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3rem, 8vw, 7.5rem)',
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
            <div style={{ overflow: 'hidden', marginBottom: 44 }}>
              <p
                ref={subRef}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                  fontWeight: 500,
                  color: 'rgba(240,240,255,0.88)',
                  margin: 0,
                  maxWidth: 560,
                  lineHeight: 1.55,
                }}
              >
                No templates. No cookie-cutters. A bespoke site built for your business — live in 7 days.
              </p>
            </div>

            {/* CTAs + phone */}
            <div
              ref={metaRef}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}
            >
              <MockupDialog
                trigger={
                  <Button
                    className="gradient-btn"
                    style={{ height: 50, padding: '0 30px', borderRadius: 12, fontSize: '0.95rem' }}
                  >
                    Claim Free Mock-Up
                  </Button>
                }
              />

              <Button
                className="ghost-btn"
                style={{ height: 50, padding: '0 30px', borderRadius: 12, fontSize: '0.95rem' }}
                onClick={() =>
                  document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View Our Work
              </Button>

              <a
                href="tel:0414758891"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  color: '#f0f0ff',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  padding: '11px 20px',
                  borderRadius: 12,
                  border: '1px solid rgba(94,174,255,0.22)',
                  background: 'rgba(94,174,255,0.06)',
                  transition: 'all 0.2s',
                  height: 50,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(94,174,255,0.55)'
                  e.currentTarget.style.background = 'rgba(94,174,255,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(94,174,255,0.22)'
                  e.currentTarget.style.background = 'rgba(94,174,255,0.06)'
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5eaeff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                0414 758 891
              </a>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 1.6, duration: 0.8 }}
              style={{
                marginTop: 56,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 48,
                  background: 'linear-gradient(180deg, rgba(94,174,255,0.8), transparent)',
                  borderRadius: 1,
                }}
              />
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,240,255,0.4)',
                  writingMode: 'vertical-lr',
                }}
              >
                Scroll
              </span>
            </motion.div>
          </div>

          {/* ── Right visual (desktop only) ── */}
          <div
            className="hidden lg:flex"
            style={{ justifyContent: 'flex-end', paddingRight: 20 }}
          >
            <BrowserMockup isLoaded={isLoaded} />
          </div>
        </div>
      </div>
    </section>
  )
}
