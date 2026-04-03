import { useState } from 'react';

export default function LogoCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{
      background: 'var(--bg-primary)',
      padding: 'clamp(40px, 8vh, 80px) var(--content-padding)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Glow behind the card */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(74,144,184,0.1) 0%, transparent 65%)',
          transition: 'opacity 0.5s ease',
          opacity: hovered ? 1.5 : 1,
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* 3D Card */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            zIndex: 1,
            width: 280,
            height: 320,
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            padding: '40px 32px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: hovered
              ? '0 24px 72px rgba(0,0,0,0.6), 0 0 60px rgba(74,144,184,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74,144,184,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
            transform: hovered
              ? 'perspective(800px) rotateY(-3deg) rotateX(2deg) translateY(-4px)'
              : 'perspective(800px) rotateY(-8deg) rotateX(5deg)',
            transition: 'transform 0.5s ease, box-shadow 0.5s ease',
            cursor: 'default',
          }}
        >
          <img
            src="/luxcoda-lc-sharp-large_1.png"
            alt="Luxcoda"
            style={{
              height: 110,
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
            marginBottom: 6,
            textAlign: 'center',
          }}>
            Luxcoda
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}>
            Web Design · Brisbane
          </div>
        </div>
      </div>
    </section>
  );
}
