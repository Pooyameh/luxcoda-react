import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  {
    number: '01',
    title: 'We talk',
    description: 'A quick 10-minute call. We learn your trade, your area, and what makes you the best at what you do.',
  },
  {
    number: '02',
    title: 'We build',
    description: 'Your site goes live within 48 hours. Custom designed, mobile ready, built to show up on Google.',
  },
  {
    number: '03',
    title: 'You get calls',
    description: "Customers in your area find you, see your work, and pick up the phone. That's it.",
  },
];

function ChevronArrow() {
  return (
    <div className="hiw-arrow" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      alignSelf: 'center',
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke="#c8a052" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
      </svg>
    </div>
  );
}

export default function Portfolio() {
  const headRef  = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
      });
      gsap.from(cardsRef.current.querySelectorAll('.hiw-card'), {
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', stagger: 0.14,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" style={{
      padding: 'clamp(100px, 12vh, 140px) var(--content-padding)',
    }}>
      <div className="content-wrap">
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            Here's how it works.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 440,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            No long process. No endless meetings. Just results.
          </p>
        </div>

        {/* Cards + arrows wrapper */}
        <div ref={cardsRef} className="hiw-grid">
          {steps.map((step, i) => (
            <>
              <div key={step.number} className="hiw-card" style={{
                position: 'relative',
                borderLeft: '3px solid #c8a052',
                borderRadius: 12,
                padding: 40,
                overflow: 'hidden',
                transition: 'background 0.3s ease',
              }}>
                {/* Watermark number */}
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  top: 12,
                  right: 20,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(64px, 8vw, 96px)',
                  color: '#c8a052',
                  opacity: 0.12,
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  {step.number}
                </div>

                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.4rem, 2vw, 1.65rem)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: '0.85rem',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'var(--body-size)',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {step.description}
                </p>
              </div>

              {/* Chevron between cards (desktop only) */}
              {i < steps.length - 1 && <ChevronArrow key={`arrow-${i}`} />}
            </>
          ))}
        </div>
      </div>

      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 0 8px;
          align-items: stretch;
        }
        .hiw-card:hover {
          background: rgba(255,255,255,0.03);
        }
        @media (max-width: 767px) {
          .hiw-grid {
            grid-template-columns: 1fr;
            gap: 20px 0;
          }
          .hiw-arrow { display: none; }
          .hiw-card { padding: 32px 28px; }
        }
      `}</style>
    </section>
  );
}
