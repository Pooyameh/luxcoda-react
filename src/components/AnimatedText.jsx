import { useRef, useLayoutEffect, Fragment } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * AnimatedText — character-level scroll entrance animation.
 * Words are wrapped in display:inline-block;white-space:nowrap containers
 * so the browser can only break between words, never mid-word.
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

  // Split into words; wrap each word in an inline-block nowrap container
  // so the browser never breaks a word mid-character.
  const words = text.split(' ')

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ perspective: '1000px', display: 'block', ...style }}
    >
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="at-word">
            {word.split('').map((char, ci) => (
              <span key={ci} className="at-char">{char}</span>
            ))}
          </span>
          {wi < words.length - 1 && (
            <span className="at-char">{'\u00A0'}</span>
          )}
        </Fragment>
      ))}
    </Tag>
  )
}
