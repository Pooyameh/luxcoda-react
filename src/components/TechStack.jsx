import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Brand icons ───────────────────────────────────────────────────────────────

function JSIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="10" fill="#F7DF1E"/>
      <text x="7" y="50" fontSize="36" fontWeight="bold" fill="#323330" fontFamily="monospace">JS</text>
    </svg>
  )
}

function ClaudeIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="10" fill="#CC785C"/>
      <path d="M22 44L32 20L42 44" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M25.5 36H38.5" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  )
}

function OpenAIIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="10" fill="#10a37f"/>
      <path d="M32 16 L32.1 16 M32 16 L32 48 M16 32 L48 32 M20 20 L44 44 M44 20 L20 44" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="10" fill="#24292e"/>
      <path d="M32 12C21 12 12 21 12 32.3C12 41.4 17.9 49.1 26.1 51.8C27.1 52 27.5 51.4 27.5 50.8V47.3C22 48.5 20.8 44.8 20.8 44.8C19.9 42.5 18.6 41.8 18.6 41.8C16.8 40.6 18.7 40.6 18.7 40.6C20.7 40.7 21.7 42.7 21.7 42.7C23.5 45.7 26.4 44.8 27.6 44.3C27.8 43 28.3 42.1 28.9 41.6C24.4 41.1 19.6 39.3 19.6 31.5C19.6 29.3 20.4 27.5 21.7 26.1C21.5 25.6 20.8 23.5 21.9 20.7C21.9 20.7 23.6 20.2 27.5 22.8C29.1 22.4 30.8 22.2 32.5 22.2C34.2 22.2 35.9 22.4 37.5 22.8C41.4 20.2 43.1 20.7 43.1 20.7C44.2 23.5 43.5 25.6 43.3 26.1C44.6 27.5 45.4 29.3 45.4 31.5C45.4 39.3 40.6 41.1 36.1 41.6C36.8 42.2 37.5 43.5 37.5 45.5V50.8C37.5 51.4 37.9 52 38.9 51.8C47.1 49.1 53 41.4 53 32.3C53 21 44 12 32 12Z" fill="white"/>
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const techs = [
  {
    Icon: JSIcon,
    name: 'JavaScript',
    role: 'The Language',
    body: 'Every animation, interaction, and live feature on this site runs on modern JavaScript — fast, lightweight, and built for the web.',
    accent: '#F7DF1E',
    bg: 'rgba(247,223,30,0.05)',
  },
  {
    Icon: ClaudeIcon,
    name: 'Claude Code',
    role: 'The Architect',
    body: "This entire site was designed and built using Claude Code — Anthropic's AI development environment. Smart code, zero bloat.",
    accent: '#CC785C',
    bg: 'rgba(204,120,92,0.05)',
  },
  {
    Icon: OpenAIIcon,
    name: 'OpenAI',
    role: 'The Intelligence',
    body: 'GPT models power the AI-assisted development workflow — from copy refinement to technical problem-solving.',
    accent: '#10a37f',
    bg: 'rgba(16,163,127,0.05)',
  },
  {
    Icon: GitHubIcon,
    name: 'GitHub',
    role: 'The Foundation',
    body: 'Version control, project management, and deployment pipelines — every line of code tracked and shipped through GitHub.',
    accent: '#888',
    bg: 'rgba(136,136,136,0.05)',
  },
]

export default function TechStack() {
  const sectionRef = useRef(null)
  const slideRefs = useRef([])
  const glowRefs = useRef([])
  const dotsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let lastIdx = 0

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1200',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(techs.length - 1, Math.floor(self.progress * techs.length))

          if (idx !== lastIdx) {
            const prev = lastIdx
            lastIdx = idx

            // Cross-fade content slides
            gsap.to(slideRefs.current[prev], {
              opacity: 0, scale: 1.02, filter: 'blur(6px)',
              duration: 0.4, ease: 'power2.in', overwrite: true,
            })
            gsap.fromTo(slideRefs.current[idx],
              { opacity: 0, scale: 0.96, filter: 'blur(6px)' },
              { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', overwrite: true }
            )

            // Cross-fade background glows
            gsap.to(glowRefs.current[prev], { opacity: 0, duration: 0.8, overwrite: true })
            gsap.to(glowRefs.current[idx], { opacity: 1, duration: 0.8, overwrite: true })

            // Animate dots (use each tech's accent colour)
            dotsRef.current.forEach((dot, i) => {
              gsap.to(dot, {
                width: i === idx ? 28 : 6,
                backgroundColor: i === idx ? techs[idx].accent : 'rgba(255,255,255,0.15)',
                duration: 0.3,
                overwrite: true,
              })
            })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} style={{
      height: '100vh',
      background: '#0a0612',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* Section label */}
      <div style={{
        position: 'absolute', top: 'clamp(1.5rem, 4vh, 3rem)',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 2,
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.32)',
        }}>
          Built With
        </span>
      </div>

      {/* Per-tech background glows (all rendered, GSAP fades between them) */}
      {techs.map((tech, i) => (
        <div
          key={i + '-glow'}
          ref={el => glowRefs.current[i] = el}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${tech.bg} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            opacity: i === 0 ? 1 : 0,
          }}
        />
      ))}

      {/* All tech slides overlaid — GSAP crossfades between them */}
      {techs.map((tech, i) => (
        <div
          key={tech.name}
          ref={el => slideRefs.current[i] = el}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === 0 ? 1 : 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 clamp(1.25rem, 4vw, 4rem)',
            gap: 'clamp(1rem, 2.5vh, 1.75rem)',
            zIndex: 1,
          }}
        >
          <tech.Icon />

          <span style={{
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: tech.accent,
            opacity: 0.9,
          }}>
            {tech.role}
          </span>

          <h2 style={{
            fontSize: 'clamp(2.8rem, 7vw, 7rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 0.95,
            color: '#fff',
            margin: 0,
          }}>
            {tech.name}
          </h2>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            maxWidth: 480,
            margin: 0,
          }}>
            {tech.body}
          </p>
        </div>
      ))}

      {/* Progress dots */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(1.5rem, 4vh, 3rem)',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.5rem', alignItems: 'center',
        zIndex: 2,
      }}>
        {techs.map((tech, i) => (
          <div
            key={i}
            ref={el => dotsRef.current[i] = el}
            style={{
              height: 5,
              borderRadius: 3,
              width: i === 0 ? 28 : 6,
              backgroundColor: i === 0 ? tech.accent : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
