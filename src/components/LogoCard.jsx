import { useState } from 'react';

export default function LogoCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
    <style>{`
      @media (max-width: 639px) {
        .logo-card-inner {
          transform: perspective(800px) rotateY(-2deg) rotateX(1.5deg) !important;
          width: 220px !important;
          height: 260px !important;
        }
      }
    `}</style>
    <section style={{
      padding: 'clamp(40px, 8vh, 80px) var(--content-padding)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Ambient glow behind the card */}
        <div style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(74,144,184,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* 3D glass card */}
        <div
          className="logo-card-inner"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            zIndex: 1,
            width: 260,
            height: 300,
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px 28px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: hovered
              ? '0 24px 72px rgba(0,0,0,0.6), 0 0 60px rgba(74,144,184,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74,144,184,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
            transform: 'perspective(800px) rotateY(-5deg) rotateX(3deg)',
            transition: 'transform 0.5s ease, box-shadow 0.5s ease',
            cursor: 'default',
          }}
        >
          <img
            src="/luxcoda-lc-sharp-large_1.png"
            alt="Luxcoda"
            style={{
              height: 100,
              width: 'auto',
              display: 'block',
              marginBottom: 20,
            }}
          />
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            textAlign: 'center',
          }}>
            Luxcoda
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
