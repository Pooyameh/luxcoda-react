import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * AnimatedText — character-level scroll entrance animation.
 *
 * Props:
 *   children  — string text to animate
 *   as        — HTML tag (default 'span')
 *   className — CSS class on the wrapper
 *   style     — inline style on the wrapper
 *   delay     — extra delay before stagger starts (seconds)
 *   start     — ScrollTrigger start position (default 'top 85%')
 */
export default function AnimatedText({
  children,
  as: Tag = 'span',
  className = '',
  style = {},
  delay = 0,
  start = 'top 85%',
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const chars = el.querySelectorAll('.at-char')
    gsap.set(chars, {
      opacity: 0,
      y: 40,
      rotateX: 40,
      transformOrigin: '0% 50% -50px',
    })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.03,
            delay,
          })
        },
      })
    })

    return () => ctx.revert()
  }, [delay, start])

  const text = typeof children === 'string' ? children : ''

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ perspective: '1000px', display: 'block', ...style }}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="at-char">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  )
}
