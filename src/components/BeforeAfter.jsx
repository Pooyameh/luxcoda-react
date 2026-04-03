import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const problems = [
  'Slow loading',
  'Outdated design',
  'No clear CTA',
  'No reviews on first page',
  'Poor SEO',
  'Not mobile friendly',
];

const benefits = [
  'Clear CTA',
  'Captivating design',
  'Fast & responsive',
  'Trust signals upfront',
  'SEO optimized',
  'Works on every device',
];

function CheckRow({ label, variant }) {
  const isProblem = variant === 'problem';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 16px',
      background: isProblem ? 'rgba(255,50,50,0.04)' : 'rgba(74,144,184,0.04)',
      border: isProblem ? '1px solid rgba(255,50,50,0.08)' : '1px solid rgba(74,144,184,0.08)',
      borderRadius: 10,
    }}>
      <span style={{
        fontSize: 14,
        fontWeight: 700,
        color: isProblem ? 'rgba(255,100,100,0.5)' : 'rgba(74,144,184,0.7)',
        flexShrink: 0,
        lineHeight: 1,
        minWidth: 14,
        textAlign: 'center',
      }}>
        {isProblem ? '✕' : '✓'}
      </span>
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 13,
        fontWeight: 400,
        color: isProblem ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.65)',
        lineHeight: 1.4,
      }}>
        {label}
      </span>
    </div>
  );
}

export default function BeforeAfter() {
  const headingRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 22, duration: 0.8, ease: 'power3.out',
      });
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: leftRef.current, start: 'top 78%', once: true },
        opacity: 0, x: -30, duration: 0.85, ease: 'power3.out', delay: 0.1,
      });
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: rightRef.current, start: 'top 78%', once: true },
        opacity: 0, x: 30, duration: 0.85, ease: 'power3.out', delay: 0.28,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{
      background: 'var(--bg-primary)',
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap">
        {/* Heading */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            First impressions win jobs.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Your customers check your site before they call. What are they seeing?
          </p>
        </div>

        {/* Side-by-side */}
        <div className="ba-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
        }}>
          {/* Before */}
          <div ref={leftRef}>
            <div style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}>
              <img
                src="/before-cardetailing.png"
                alt="Before — typical outdated website"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: 'var(--small-size)',
              color: 'var(--text-muted)',
              textAlign: 'left',
              margin: '1rem 0 0.75rem',
            }}>
              This is most websites.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {problems.map(t => <CheckRow key={t} label={t} variant="problem" />)}
            </div>
          </div>

          {/* After */}
          <div ref={rightRef}>
            <div style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
            }}>
              <img
                src="/after-cardetailing.png"
                alt="After — Luxcoda premium website"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              textAlign: 'left',
              margin: '1rem 0 0.75rem',
            }}>
              This is a Luxcoda site.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {benefits.map(t => <CheckRow key={t} label={t} variant="benefit" />)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .ba-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
