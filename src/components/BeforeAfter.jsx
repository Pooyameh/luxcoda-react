import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScreenCard from './ScreenCard';
import UglySite from './mini-sites/UglySite';
import ReliablePlumbing from './mini-sites/ReliablePlumbing';

/* Cards are roughly half content-width with gap.
   Content-wrap = 1200px, 2 cols with ~48px gap → each ≈ 576px
   Scale = 576 / 1400 ≈ 0.41 */
const SCALE = 0.41;
const INNER_H = Math.round(1400 * (10 / 16)); // 875

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
            <ScreenCard>
              <div style={{ width: '1400px', height: `${INNER_H}px`, transform: `scale(${SCALE})`, transformOrigin: 'top left' }}>
                <UglySite />
              </div>
            </ScreenCard>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 'var(--small-size)',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: '0.875rem',
            }}>
              This is most websites.
            </p>
          </div>

          {/* After */}
          <div ref={rightRef}>
            <ScreenCard>
              <div style={{ width: '1400px', height: `${INNER_H}px`, transform: `scale(${SCALE})`, transformOrigin: 'top left' }}>
                <ReliablePlumbing />
              </div>
            </ScreenCard>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--accent)',
              textAlign: 'center',
              marginTop: '0.875rem',
            }}>
              This is a Luxcoda site.
            </p>
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
