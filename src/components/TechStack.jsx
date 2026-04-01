import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiJavascript, SiHtml5, SiPython, SiAnthropic, SiOpenai, SiGithub } from 'react-icons/si'

const ICON_SIZE = 52

const techs = [
  {
    Icon: () => <SiJavascript size={ICON_SIZE} color="#F7DF1E" />,
    name: 'JavaScript',
    role: 'The Language',
    body: 'Every animation, interaction, and live feature on this site runs on modern JavaScript — fast, lightweight, and built for the web.',
    accent: '#F7DF1E',
    glow: 'rgba(247,223,30,0.1)',
    glowHex: '#F7DF1E',
  },
  {
    Icon: () => <SiHtml5 size={ICON_SIZE} color="#E34F26" />,
    name: 'HTML',
    role: 'The Structure',
    body: 'Clean, semantic HTML forms the foundation of every site — fast-loading, accessible, and search-engine ready from the ground up.',
    accent: '#E34F26',
    glow: 'rgba(227,79,38,0.1)',
    glowHex: '#E34F26',
  },
  {
    Icon: () => <SiPython size={ICON_SIZE} color="#4B8BBE" />,
    name: 'Python',
    role: 'The Backend',
    body: 'Python powers server-side logic, automation workflows, and AI integrations — turning complex requirements into clean, maintainable code.',
    accent: '#4B8BBE',
    glow: 'rgba(75,139,190,0.1)',
    glowHex: '#4B8BBE',
  },
  {
    Icon: () => <SiAnthropic size={ICON_SIZE} color="#CC785C" />,
    name: 'Claude Code',
    role: 'The Architect',
    body: 'We use Claude Code to debug, review, and optimise our code — catching issues quickly and keeping every project clean, fast, and reliable.',
    accent: '#CC785C',
    glow: 'rgba(204,120,92,0.1)',
    glowHex: '#CC785C',
  },
  {
    Icon: () => <SiOpenai size={ICON_SIZE} color="#10a37f" />,
    name: 'OpenAI',
    role: 'The Intelligence',
    body: 'GPT models power the AI-assisted development workflow — from copy refinement to technical problem-solving.',
    accent: '#10a37f',
    glow: 'rgba(16,163,127,0.1)',
    glowHex: '#10a37f',
  },
  {
    Icon: () => <SiGithub size={ICON_SIZE} color="#fff" />,
    name: 'GitHub',
    role: 'The Foundation',
    body: 'Version control, project management, and deployment pipelines — every line of code tracked and shipped through GitHub.',
    accent: '#aaa',
    glow: 'rgba(170,170,170,0.07)',
    glowHex: '#aaa',
  },
]

const SCROLL_TOTAL = 3600
const STEP = 1 / techs.length

export default function TechStack() {
  const sectionRef = useRef(null)
  const slideRefs = useRef([])
  const glowRefs = useRef([])
  const dotsRef = useRef([])
  const iconRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      slideRefs.current.slice(1).forEach(el => {
        gsap.set(el, { opacity: 0, y: 28, filter: 'blur(8px)' })
      })
      glowRefs.current.slice(1).forEach(el => {
        gsap.set(el, { opacity: 0 })
      })
      iconRefs.current.slice(1).forEach(el => {
        gsap.set(el, { opacity: 0, scale: 0.7, rotationY: -90 })
      })
      dotsRef.current.forEach((dot, i) => {
        if (i > 0) gsap.set(dot, { width: 6, backgroundColor: 'rgba(255,255,255,0.18)' })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${SCROLL_TOTAL}`,
          pin: true,
          scrub: 2.2,
          anticipatePin: 1,
        },
      })

      for (let i = 0; i < techs.length - 1; i++) {
        const exitPos  = i * STEP + STEP * 0.70
        const enterPos = i * STEP + STEP * 0.80

        // Exit
        tl.to(slideRefs.current[i],
          { opacity: 0, y: -22, filter: 'blur(7px)', duration: STEP * 0.14, ease: 'power2.in' },
          exitPos
        )
        tl.to(glowRefs.current[i],
          { opacity: 0, duration: STEP * 0.2, ease: 'power1.in' },
          exitPos
        )
        tl.to(iconRefs.current[i],
          { opacity: 0, scale: 0.8, rotationY: 90, duration: STEP * 0.14, ease: 'power2.in' },
          exitPos
        )

        // Enter
        tl.fromTo(slideRefs.current[i + 1],
          { opacity: 0, y: 28, filter: 'blur(7px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: STEP * 0.18, ease: 'power2.out' },
          enterPos
        )
        tl.to(glowRefs.current[i + 1],
          { opacity: 1, duration: STEP * 0.22, ease: 'power1.out' },
          enterPos
        )
        tl.fromTo(iconRefs.current[i + 1],
          { opacity: 0, scale: 0.7, rotationY: -90 },
          { opacity: 1, scale: 1, rotationY: 0, duration: STEP * 0.2, ease: 'power2.out' },
          enterPos
        )

        // Dots
        tl.to(dotsRef.current[i],
          { width: 6, backgroundColor: 'rgba(255,255,255,0.18)', duration: STEP * 0.08 },
          exitPos
        )
        tl.to(dotsRef.current[i + 1],
          { width: 28, backgroundColor: techs[i + 1].glowHex, duration: STEP * 0.08 },
          enterPos
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} style={{
      height: '100vh',
      background: '#07071a',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* Per-tech background glow */}
      {techs.map((tech, i) => (
        <div
          key={i + '-glow'}
          ref={el => glowRefs.current[i] = el}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${tech.glow} 0%, transparent 70%)`,
            filter: 'blur(30px)',
            opacity: i === 0 ? 1 : 0,
          }}
        />
      ))}

      {/* Grid mesh */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, black 5%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, black 5%, transparent 100%)',
      }} />

      {/* Section label */}
      <div style={{
        position: 'absolute',
        top: 'calc(68px + clamp(0.75rem, 1.5vh, 1.25rem))',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 2,
      }}>
        <span className="section-label">Built With</span>
      </div>

      {/* Slides */}
      {techs.map((tech, i) => (
        <div
          key={tech.name}
          ref={el => slideRefs.current[i] = el}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
            padding: '70px clamp(1.25rem, 5vw, 5rem) clamp(4rem, 7vh, 6rem)',
            gap: 'clamp(0.75rem, 2vh, 1.5rem)',
            zIndex: 1,
          }}
        >
          {/* Icon — 3D flip container */}
          <div
            ref={el => iconRefs.current[i] = el}
            style={{
              width: 96, height: 96, borderRadius: 26,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: `1px solid ${tech.accent}25`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px ${tech.glow}, 0 24px 60px rgba(0,0,0,0.5)`,
              opacity: i === 0 ? 1 : 0,
            }}
          >
            <tech.Icon />
          </div>

          <span style={{
            fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: tech.accent, opacity: 0.9,
          }}>
            {tech.role}
          </span>

          <h2 style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 7.5rem)',
            fontWeight: 900, letterSpacing: '-0.055em',
            lineHeight: 0.93, color: '#fff', margin: 0,
          }}>
            {tech.name}
          </h2>

          <p style={{
            fontSize: 'clamp(0.92rem, 1.35vw, 1.04rem)',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.75, maxWidth: 480, margin: 0,
          }}>
            {tech.body}
          </p>

          {/* Counter */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            marginTop: '0.25rem',
          }}>
            <span style={{
              fontSize: '0.65rem', fontWeight: 600,
              color: tech.accent, opacity: 0.5,
              letterSpacing: '0.08em',
            }}>
              0{i + 1} / 0{techs.length}
            </span>
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
              height: 4, borderRadius: 3,
              width: i === 0 ? 28 : 6,
              backgroundColor: i === 0 ? tech.glowHex : 'rgba(255,255,255,0.18)',
              transition: 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}
