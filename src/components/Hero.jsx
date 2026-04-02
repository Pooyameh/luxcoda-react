import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScreenCard from './ScreenCard';
import SparksElectrical from './mini-sites/SparksElectrical';
import ReliablePlumbing from './mini-sites/ReliablePlumbing';
import GreenEdgeLandscaping from './mini-sites/GreenEdgeLandscaping';
import SmithConstruction from './mini-sites/SmithConstruction';
import ProPaintBrisbane from './mini-sites/ProPaintBrisbane';
import AutoCareMechanics from './mini-sites/AutoCareMechanics';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* Each showcase card: 350px wide, scale = 350/1400 = 0.25 */
const CARD_W = 350;
const SCALE = CARD_W / 1400;
const INNER_H = Math.round(1400 * (10 / 16)); // 875

const sites = [
  { component: SparksElectrical, name: 'Sparks Electrical' },
  { component: ReliablePlumbing, name: 'Reliable Plumbing' },
  { component: GreenEdgeLandscaping, name: 'GreenEdge Landscaping' },
  { component: SmithConstruction, name: 'Smith Construction' },
  { component: ProPaintBrisbane, name: 'ProPaint Brisbane' },
  { component: AutoCareMechanics, name: 'AutoCare Mechanics' },
];

function ShowcaseCard({ site }) {
  const Site = site.component;
  return (
    <div style={{ width: CARD_W, flexShrink: 0 }}>
      <ScreenCard>
        <div style={{
          width: '1400px',
          height: `${INNER_H}px`,
          transform: `scale(${SCALE})`,
          transformOrigin: 'top left',
        }}>
          <Site />
        </div>
      </ScreenCard>
    </div>
  );
}

const allSites = [...sites, ...sites]; // duplicate for seamless loop

export default function Hero() {
  const tagRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const stripRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    const els = [tagRef.current, h1Ref.current, subRef.current, ctaRef.current];
    gsap.set(els, { opacity: 0, y: 22 });
    gsap.set([stripRef.current, badgesRef.current], { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.05 });
    tl.to(tagRef.current,    { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
      .to(h1Ref.current,     { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.5')
      .to(subRef.current,    { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.55')
      .to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
      .to(stripRef.current,  { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.35')
      .to(badgesRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4');

    return () => tl.kill();
  }, []);

  return (
    <section style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 64,
    }}>
      {/* Text content */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(60px, 10vh, 120px) var(--content-padding) 0',
        maxWidth: 960,
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
          fontWeight: 600,
          fontSize: 'var(--h1-size)',
          color: 'var(--text-primary)',
          letterSpacing: 'var(--h1-spacing)',
          lineHeight: 'var(--h1-line-height)',
          maxWidth: 860,
          margin: '0 auto',
        }}>
          Your work speaks for itself.
          <br />
          Your website should too.
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

        <div ref={ctaRef} style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => scrollTo('contact')}
            style={{
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 100,
              padding: '14px 36px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--accent-hover)';
              e.currentTarget.style.boxShadow = '0 0 30px var(--accent-glow)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--accent)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Let's Talk
          </button>
          <button
            onClick={() => scrollTo('work')}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 100,
              padding: '14px 36px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            See Our Work
          </button>
        </div>
      </div>

      {/* Scrolling showcase strip */}
      <div ref={stripRef} style={{
        width: '100%',
        marginTop: 'clamp(3rem, 6vh, 5rem)',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
      }}>
        <div className="marquee-track" style={{ gap: 16, paddingLeft: 16 }}>
          {allSites.map((site, i) => (
            <ShowcaseCard key={i} site={site} />
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div ref={badgesRef} style={{
        padding: '1.5rem var(--content-padding)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}>
        {['Custom Design', 'Mobile First', 'SEO Ready', 'Fast Loading', 'Ongoing Support'].map((b, i, arr) => (
          <span key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {i > 0 && <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>·</span>}
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: 'var(--small-size)',
              color: 'var(--text-muted)',
            }}>
              {b}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
