import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import Laptop3D from './devices/Laptop3D';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} color="#111" />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#c8d8f0" />
      <pointLight position={[-3, -1, 2]} intensity={0.4} color="#c45a2d" />
      <Environment preset="city" />

      <Laptop3D
        screenColor="#2d5fa8"
        rotation={[0.28, -0.25, 0]}
        position={[0, -0.3, 0]}
        scale={0.8}
        mouseTrack={true}
        mouseIntensity={0.1}
      />

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.5} />
      </EffectComposer>
    </Canvas>
  );
}

export default function Hero() {
  const tagRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const els = [tagRef.current, h1Ref.current, subRef.current, ctaRef.current, canvasRef.current];
    gsap.set(els, { opacity: 0, y: 24 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(tagRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(h1Ref.current,     { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.55')
      .to(subRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.55')
      .to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to(canvasRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.45');

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
      padding: `clamp(100px, 15vh, 160px) var(--content-padding) 60px`,
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* Tag */}
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

      {/* Headline */}
      <h1 ref={h1Ref} style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: 'var(--h1-size)',
        color: 'var(--text-primary)',
        letterSpacing: 'var(--h1-spacing)',
        lineHeight: 'var(--h1-line-height)',
        maxWidth: 900,
        margin: '0 auto',
      }}>
        Your work speaks for itself.
        <br />
        Your website should too.
      </h1>

      {/* Subtext */}
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

      {/* CTAs */}
      <div ref={ctaRef} style={{
        display: 'flex',
        gap: '0.75rem',
        marginTop: '2.25rem',
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

      {/* 3D Laptop canvas */}
      <div ref={canvasRef} style={{
        width: '100%',
        maxWidth: 700,
        height: 'clamp(320px, 45vw, 520px)',
        margin: '3rem auto 0',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        <HeroCanvas />
      </div>
    </section>
  );
}
