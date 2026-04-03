import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const problemTags = [
  'Slow loading',
  'Outdated design',
  'No clear CTA',
  'No reviews on first page',
  'Poor SEO',
  'Not mobile friendly',
];

const benefitTags = [
  'Clear CTA',
  'Captivating design',
  'Fast & responsive',
  'Trust signals upfront',
  'SEO optimized',
  'Works on every device',
];

function TagPill({ label, variant }) {
  const isProblem = variant === 'problem';
  return (
    <span style={{
      display: 'inline-block',
      padding: '6px 14px',
      borderRadius: 999,
      fontSize: 12,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 500,
      background: isProblem ? 'rgba(255,255,255,0.04)' : 'rgba(74,144,184,0.08)',
      border: isProblem ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(74,144,184,0.15)',
      color: isProblem ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.58)',
    }}>
      {label}
    </span>
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
      background: 'var(--bg-surface)',
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

        {/* Side-by-side cards */}
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
              fontWeight: 400,
              fontSize: 'var(--small-size)',
              color: 'var(--text-muted)',
              textAlign: 'center',
              margin: '0.875rem 0 0.75rem',
            }}>
              This is most websites.
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
            }}>
              {problemTags.map(t => <TagPill key={t} label={t} variant="problem" />)}
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
              textAlign: 'center',
              margin: '0.875rem 0 0.75rem',
            }}>
              This is a Luxcoda site.
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
            }}>
              {benefitTags.map(t => <TagPill key={t} label={t} variant="benefit" />)}
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
