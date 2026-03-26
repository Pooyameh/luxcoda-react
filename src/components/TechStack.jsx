import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiJavascript, SiHtml5, SiPython, SiAnthropic, SiOpenai, SiGithub } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

// ── Brand icons ───────────────────────────────────────────────────────────────

const ICON_SIZE = 64

function JSIcon() {
  return <SiJavascript size={ICON_SIZE} color="#F7DF1E" />
}

function HTMLIcon() {
  return <SiHtml5 size={ICON_SIZE} color="#E34F26" />
}

function PythonIcon() {
  return <SiPython size={ICON_SIZE} color="#3776AB" />
}

function ClaudeIcon() {
  return <SiAnthropic size={ICON_SIZE} color="#CC785C" />
}

function OpenAIIcon() {
  return <SiOpenai size={ICON_SIZE} color="#fff" />
}

function GitHubIcon() {
  return <SiGithub size={ICON_SIZE} color="#fff" />
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
    Icon: HTMLIcon,
    name: 'HTML',
    role: 'The Structure',
    body: 'Clean, semantic HTML forms the foundation of every site — fast-loading, accessible, and search-engine ready from the ground up.',
    accent: '#E34F26',
    bg: 'rgba(227,79,38,0.05)',
  },
  {
    Icon: PythonIcon,
    name: 'Python',
    role: 'The Backend',
    body: 'Python powers server-side logic, automation workflows, and AI integrations — turning complex requirements into clean, maintainable code.',
    accent: '#3776AB',
    bg: 'rgba(55,118,171,0.05)',
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
  const charRefs = useRef([])   // charRefs[i] = array of inner char spans
  const bodyRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize non-first slides
      for (let i = 1; i < techs.length; i++) {
        gsap.set(slideRefs.current[i], { opacity: 0 })
        gsap.set(glowRefs.current[i], { opacity: 0 })
        gsap.set(charRefs.current[i] || [], { y: '120%' })
        gsap.set(bodyRefs.current[i], { y: 32 })
      }

      let lastIdx = 0

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1800',
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / techs.length,
          duration: { min: 0.2, max: 0.3 },
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const idx = Math.min(techs.length - 1, Math.floor(self.progress * techs.length))

          if (idx !== lastIdx) {
            const prev = lastIdx
            lastIdx = idx

            // Exit old slide: chars fly out upward, then hide
            const prevChars = charRefs.current[prev] || []
            gsap.to(prevChars, {
              y: '-120%', stagger: 0.01, duration: 0.2, ease: 'power2.in', overwrite: true,
              onComplete: () => gsap.set(slideRefs.current[prev], { opacity: 0 }),
            })
            gsap.to(bodyRefs.current[prev], { y: -28, duration: 0.22, ease: 'power2.in', overwrite: true })
            gsap.to(glowRefs.current[prev], { opacity: 0, duration: 0.6, overwrite: true })

            // Enter new slide: show instantly, chars slide up from below
            gsap.set(slideRefs.current[idx], { opacity: 1 })
            gsap.to(glowRefs.current[idx], { opacity: 1, duration: 0.8, overwrite: true })
            const idxChars = charRefs.current[idx] || []
            gsap.fromTo(idxChars,
              { y: '120%' },
              { y: '0%', stagger: 0.05, duration: 0.55, ease: 'power3.out', overwrite: true, delay: 0.06 }
            )
            gsap.fromTo(bodyRefs.current[idx],
              { y: 32 },
              { y: 0, duration: 0.5, ease: 'power2.out', overwrite: true, delay: 0.3 }
            )

            // Dots
            dotsRef.current.forEach((dot, i) => {
              gsap.to(dot, {
                width: i === idx ? 28 : 6,
                backgroundColor: i === idx ? techs[idx].accent : 'rgba(255,255,255,0.15)',
                duration: 0.3, overwrite: true,
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
      background: '#282b35',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* Section label */}
      <div style={{
        position: 'absolute', top: 'calc(72px + clamp(0.75rem, 1.5vh, 1.25rem))',
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

      {/* Per-tech background glows */}
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

      {/* Slides */}
      {techs.map((tech, i) => (
        <div
          key={tech.name}
          ref={el => slideRefs.current[i] = el}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === 0 ? 1 : 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
            padding: '72px clamp(1.25rem, 4vw, 4rem) 0',
            gap: 'clamp(1rem, 2.5vh, 1.75rem)',
            zIndex: 1,
          }}
        >
          <tech.Icon />

          <span style={{
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: tech.accent, opacity: 0.9,
          }}>
            {tech.role}
          </span>

          {/* Name — letter by letter */}
          <h2 style={{
            fontSize: 'clamp(2.8rem, 7vw, 7rem)',
            fontWeight: 900, letterSpacing: '-0.05em',
            lineHeight: 0.95, color: '#fff', margin: 0,
          }}>
            {tech.name.split('').map((char, ci) =>
              char === ' ' ? (
                <span key={ci} style={{ display: 'inline-block', width: '0.28em' }} />
              ) : (
                <span key={ci} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <span
                    ref={el => {
                      if (!charRefs.current[i]) charRefs.current[i] = []
                      charRefs.current[i][ci] = el
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </span>
                </span>
              )
            )}
          </h2>

          <div style={{ overflow: 'hidden' }}>
            <p
              ref={el => bodyRefs.current[i] = el}
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.7, maxWidth: 480, margin: 0,
              }}
            >
              {tech.body}
            </p>
          </div>
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
              height: 5, borderRadius: 3,
              width: i === 0 ? 28 : 6,
              backgroundColor: i === 0 ? tech.accent : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
