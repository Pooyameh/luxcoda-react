import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const tagRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const els = [tagRef.current, h1Ref.current, subRef.current, ctaRef.current];
    gsap.set(els, { opacity: 0, y: 22 });

    const tl = gsap.timeline({ delay: 0.05 });
    tl.to(tagRef.current,  { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
      .to(h1Ref.current,   { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.5')
      .to(subRef.current,  { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.55')
      .to(ctaRef.current,  { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5');

    return () => tl.kill();
  }, []);

  return (
    <section style={{
      minHeight: 'calc(100svh - 120px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 64,
    }}>
      <div style={{
        textAlign: 'center',
        padding: 'clamp(60px, 10vh, 120px) var(--content-padding) clamp(24px, 4vh, 48px)',
        maxWidth: 900,
        width: '100%',
        margin: '0 auto',
      }}>
        <p ref={tagRef} style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500,
          fontSize: 'var(--small-size)',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          Web Design — Est. 2026 · Brisbane
        </p>

        <h1 ref={h1Ref} style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 'var(--h1-size)',
          color: 'var(--text-primary)',
          letterSpacing: 'var(--h1-spacing)',
          lineHeight: 'var(--h1-line-height)',
          margin: '0 auto',
        }}>
          Look the part.
          <br />
          Get the job.
        </h1>

        <p ref={subRef} style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: 'var(--body-size)',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: 520,
          margin: '1.75rem auto 0',
          letterSpacing: '-0.01em',
        }}>
          We build websites for Brisbane tradies and local businesses that actually get you more work.
        </p>

        <div ref={ctaRef} className="hero-cta" style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => scrollTo('contact')}
            style={{
              background: '#ffffff',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: 100,
              padding: '14px 36px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#ffffff';
            }}
          >
            Let's Talk
          </button>

          <button
            onClick={() => scrollTo('work')}
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 100,
              padding: '14px 36px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'border-color 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            See Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
