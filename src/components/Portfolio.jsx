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
    description: 'Customers in your area find you, see your work, and pick up the phone. That\'s it.',
  },
];

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
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" style={{
      background: 'var(--bg-surface)',
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap">
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
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

        <div ref={cardsRef} className="hiw-grid">
          {steps.map(step => (
            <div key={step.number} className="hiw-card" style={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: 32,
            }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.75rem, 5vw, 3.5rem)',
                color: '#c8a052',
                lineHeight: 1,
                marginBottom: '1rem',
                letterSpacing: '-0.03em',
              }}>
                {step.number}
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: 'var(--h3-size)',
                color: 'var(--text-primary)',
                letterSpacing: 'var(--h3-spacing)',
                lineHeight: 'var(--h3-line-height)',
                marginBottom: '0.75rem',
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
          ))}
        </div>
      </div>

      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 767px) {
          .hiw-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
