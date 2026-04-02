import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScreenCard from './ScreenCard';
import SparksElectrical from './mini-sites/SparksElectrical';
import SmithConstruction from './mini-sites/SmithConstruction';
import ProPaintBrisbane from './mini-sites/ProPaintBrisbane';
import GreenEdgeLandscaping from './mini-sites/GreenEdgeLandscaping';
import AutoCareMechanics from './mini-sites/AutoCareMechanics';

/* Content-wrap = 1200px.
   Large card (full-width or 2/3 col) ≈ 760px → scale = 760/1400 ≈ 0.54
   Small card (1/3 col or half) ≈ 380px → scale = 380/1400 ≈ 0.27
   Medium card (half) ≈ 576px → scale = 576/1400 ≈ 0.41 */
const INNER_H = Math.round(1400 * (10 / 16)); // 875

function SiteCard({ name, subtitle, scale, children, animRef }) {
  const innerH = Math.round((1 / scale) * 100); // not used, we use INNER_H directly

  return (
    <div ref={animRef} style={{ display: 'flex', flexDirection: 'column' }}>
      <ScreenCard>
        <div style={{
          width: '1400px',
          height: `${INNER_H}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}>
          {children}
        </div>
      </ScreenCard>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '0.875rem',
        padding: '0 4px',
      }}>
        <div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: 'var(--text-primary)',
          }}>{name}</div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--small-size)',
            color: 'var(--text-muted)',
            marginTop: 2,
          }}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const headRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 22, duration: 0.8, ease: 'power3.out',
      });
      [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref].forEach((ref, i) => {
        gsap.from(ref.current, {
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
          opacity: 0, y: 28, duration: 0.85, ease: 'power3.out',
          delay: (i % 2) * 0.15,
        });
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
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            Built by Luxcoda.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 440,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            A sample of sites we've designed for local trades and businesses.
          </p>
        </div>

        {/* Row 1: large left + stacked right */}
        <div className="port-row" style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          alignItems: 'start',
        }}>
          <SiteCard name="Sparks Electrical" subtitle="Electrician · Brisbane" scale={0.54} animRef={card1Ref}>
            <SparksElectrical />
          </SiteCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
            <SiteCard name="Smith Construction" subtitle="Builder · Brisbane" scale={0.27} animRef={card2Ref}>
              <SmithConstruction />
            </SiteCard>
            <SiteCard name="ProPaint Brisbane" subtitle="Painter · Brisbane" scale={0.27} animRef={card3Ref}>
              <ProPaintBrisbane />
            </SiteCard>
          </div>
        </div>

        {/* Row 2: stacked left + large right */}
        <div className="port-row" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          alignItems: 'start',
        }}>
          <SiteCard name="GreenEdge Landscaping" subtitle="Landscaper · Gold Coast" scale={0.27} animRef={card4Ref}>
            <GreenEdgeLandscaping />
          </SiteCard>

          <SiteCard name="AutoCare Mechanics" subtitle="Mechanic · Brisbane" scale={0.41} animRef={card5Ref}>
            <AutoCareMechanics />
          </SiteCard>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .port-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
