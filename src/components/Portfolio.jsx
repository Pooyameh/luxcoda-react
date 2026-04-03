import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/*
  Grid: 3 columns on desktop, 2 on tablet, 1 on mobile.
  Desktop-recorded videos → 16/10 (landscape).
  Phone-recorded videos   → 4/5  (compromise so they don't tower).
  One "hero" card (accordion) spans 2 columns.
  Bottom card (parallax) spans all 3 columns at a cinematic 21/9.
*/

const items = [
  // Row 1
  { src: '/showcase/accordion.mp4', label: 'Accordion Gallery', colSpan: 2, aspect: '16/10', phone: false },
  { src: '/showcase/product.mp4',   label: '3D Product',        colSpan: 1, aspect: '4/5',   phone: true  },
  // Row 2
  { src: '/showcase/cards.mp4',     label: 'Expanding Cards',   colSpan: 1, aspect: '4/5',   phone: true  },
  { src: '/showcase/magnetic.mp4',  label: 'Magnetic Cursor',   colSpan: 1, aspect: '16/10', phone: false },
  { src: '/showcase/mosaic.mp4',    label: 'Photo Mosaic',      colSpan: 1, aspect: '4/5',   phone: true  },
  // Row 3
  { src: '/showcase/compare.mp4',   label: 'Before / After',    colSpan: 2, aspect: '16/10', phone: false },
  // Row 4 — full-width
  { src: '/showcase/parallax.mp4',  label: 'Parallax Depth',    colSpan: 3, aspect: '21/9',  phone: false },
];

function PortfolioCard({ src, label, colSpan, aspect }) {
  return (
    <div
      className={`p-card p-span-${colSpan}`}
      style={{
        gridColumn: `span ${colSpan}`,
        aspectRatio: aspect,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        ref={(el) => { if (el) el.play().catch(() => {}); }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '28px 16px 12px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.04em',
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const headRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 22, duration: 0.8, ease: 'power3.out',
      });
      gsap.from(sectionRef.current.querySelectorAll('.p-card'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.07,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} style={{
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
            Interactive experiences designed for trades and local businesses.
          </p>
        </div>

        <div className="port-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {items.map((item) => (
            <PortfolioCard
              key={item.src}
              src={item.src}
              label={item.label}
              colSpan={item.colSpan}
              aspect={item.aspect}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Tablet */
        @media (min-width: 640px) and (max-width: 1023px) {
          .port-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .port-grid .p-card { grid-column: span 1 !important; }
        }
        /* Mobile */
        @media (max-width: 639px) {
          .port-grid { grid-template-columns: 1fr !important; }
          .port-grid .p-card { grid-column: span 1 !important; aspect-ratio: 16/9 !important; }
        }
      `}</style>
    </section>
  );
}
