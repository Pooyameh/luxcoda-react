import { useRef, useEffect, createRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const gridItems = [
  { src: '/showcase/accordion.mp4', label: 'Accordion Gallery',  colSpan: 2, aspect: '16/9'  },
  { src: '/showcase/product.mp4',   label: '3D Product',         colSpan: 1, aspect: '9/16'  },
  { src: '/showcase/cards.mp4',     label: 'Expanding Cards',    colSpan: 1, aspect: '9/16'  },
  { src: '/showcase/mosaic.mp4',    label: 'Photo Mosaic',       colSpan: 1, aspect: '9/16'  },
  { src: '/showcase/magnetic.mp4',  label: 'Magnetic Cursor',    colSpan: 1, aspect: '4/3'   },
  { src: '/showcase/compare.mp4',   label: 'Before / After',     colSpan: 1, aspect: '4/3'   },
  { src: '/showcase/parallax.mp4',  label: 'Parallax Depth',     colSpan: 3, aspect: '21/9'  },
];

function VideoCard({ src, label, style = {} }) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        height: '100%',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
        e.currentTarget.style.transform = 'scale(1.015)';
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
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '32px 16px 14px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
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
  const itemRefs = useRef(gridItems.map(() => createRef()));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 22, duration: 0.8, ease: 'power3.out',
      });
      itemRefs.current.forEach((ref, i) => {
        if (!ref.current) return;
        gsap.from(ref.current, {
          scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true },
          opacity: 0, y: 24, duration: 0.8, ease: 'power3.out',
          delay: (i % 3) * 0.1,
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
            Interactive experiences designed for local trades and businesses.
          </p>
        </div>

        {/* Desktop/Tablet grid */}
        <div className="port-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
        }}>
          {gridItems.map((item, i) => (
            <div
              key={item.src}
              ref={itemRefs.current[i]}
              style={{
                gridColumn: `span ${item.colSpan}`,
                aspectRatio: item.aspect,
              }}
            >
              <VideoCard src={item.src} label={item.label} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .port-grid {
            grid-template-columns: 1fr !important;
          }
          .port-grid > div {
            grid-column: span 1 !important;
          }
          .port-grid > div[style*="21/9"] {
            aspect-ratio: 16/9 !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .port-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .port-grid > div[style*="span 3"] { grid-column: span 2 !important; }
        }
      `}</style>
    </section>
  );
}
