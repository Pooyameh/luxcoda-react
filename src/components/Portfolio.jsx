import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const videos = [
  { src: '/showcase/accordion.mp4', label: 'Accordion Gallery' },
  { src: '/showcase/parallax.mp4',  label: 'Parallax Depth' },
  { src: '/showcase/product.mp4',   label: '3D Product' },
  { src: '/showcase/cards.mp4',     label: 'Expanding Cards' },
  { src: '/showcase/mosaic.mp4',    label: 'Photo Mosaic' },
  { src: '/showcase/magnetic.mp4',  label: 'Magnetic Cursor' },
  { src: '/showcase/compare.mp4',   label: 'Before / After' },
];

function VideoCard({ src, label }) {
  return (
    <div
      className="port-card"
      style={{
        aspectRatio: '16 / 10',
        width: '100%',
        minHeight: 0,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
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
        padding: '10px 14px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 500,
        pointerEvents: 'none',
      }}>
        {label}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
      });
      gsap.from(gridRef.current.querySelectorAll('.port-card'), {
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" style={{
      background: 'var(--bg-surface)',
      padding: 'var(--section-padding) clamp(20px, 3vw, 48px)',
      paddingBottom: 'calc(var(--section-padding) + 40px)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
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

        <div ref={gridRef} className="port-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          alignItems: 'start',
        }}>
          {videos.map((v) => (
            <VideoCard key={v.src} src={v.src} label={v.label} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) and (max-width: 1023px) {
          .port-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .port-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
