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
            Your website is losing you jobs.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Right now, someone in your area just Googled what you do. They found 3 businesses. The one with the best site gets the call.
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

            {/* Problems card */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
              padding: '20px 24px',
              marginTop: 16,
            }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 14,
              }}>
                This is most websites.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {problems.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 5, height: 5,
                      background: 'rgba(255,80,80,0.5)',
                      borderRadius: 1,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.02em',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
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

            {/* Benefits card */}
            <div style={{
              background: 'rgba(74,144,184,0.03)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(74,144,184,0.08)',
              borderRadius: 12,
              padding: '20px 24px',
              marginTop: 16,
            }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 14,
              }}>
                This is a Luxcoda site.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {benefits.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 5, height: 5,
                      background: 'rgba(74,144,184,0.6)',
                      borderRadius: 1,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.02em',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
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
