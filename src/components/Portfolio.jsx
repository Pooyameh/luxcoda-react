import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const videos = [
  { src: '/showcase/reveal.mp4',   label: 'Mask Reveal Effect',      span: 2 },
  { src: '/showcase/cards.mp4',    label: 'Expanding Card Stack',    span: 1 },
  { src: '/showcase/mosaic.mp4',   label: 'Photo Mosaic Grid',       span: 1 },
  { src: '/showcase/magnetic.mp4', label: 'Magnetic Cursor',         span: 1 },
  { src: '/showcase/compare.mp4',  label: 'Before/After Slider',     span: 1 },
];

function VideoCard({ src, label, animRef }) {
  return (
    <div
      ref={animRef}
      style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s ease, transform 0.3s ease' }}
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
        padding: '32px 20px 16px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
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
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const refs = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 22, duration: 0.8, ease: 'power3.out',
      });
      refs.forEach((ref, i) => {
        gsap.from(ref.current, {
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
          opacity: 0, y: 28, duration: 0.85, ease: 'power3.out',
          delay: (i % 3) * 0.12,
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

        {/* Top row: featured wide card */}
        <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <div style={{ aspectRatio: '16/6' }}>
            <VideoCard src={videos[0].src} label={videos[0].label} animRef={card1Ref} />
          </div>
        </div>

        {/* Bottom row: 4 equal cards */}
        <div className="port-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {[videos[1], videos[2], videos[3], videos[4]].map((v, i) => (
            <div key={v.src} style={{ aspectRatio: '4/5' }}>
              <VideoCard src={v.src} label={v.label} animRef={refs[i + 1]} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .port-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .port-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
