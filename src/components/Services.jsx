import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Phone3D from './devices/Phone3D';
import LaptopMockup from './devices/LaptopMockup';
import PhoneMockup from './devices/PhoneMockup';

/* ── Reusable scroll-animated row ── */
function FeatureRow({ textLeft, title, description, visual, index }) {
  const rowRef = useRef(null);
  const textRef = useRef(null);
  const visRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: rowRef.current, start: 'top 78%', once: true },
        opacity: 0,
        x: textLeft ? -36 : 36,
        duration: 0.85,
        ease: 'power3.out',
      });
      gsap.from(visRef.current, {
        scrollTrigger: { trigger: rowRef.current, start: 'top 78%', once: true },
        opacity: 0,
        x: textLeft ? 36 : -36,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.18,
      });
    });
    return () => ctx.revert();
  }, [textLeft]);

  return (
    <div
      ref={rowRef}
      className="feature-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '45fr 55fr',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'center',
        padding: 'clamp(60px, 8vh, 90px) 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Order depends on textLeft */}
      {textLeft ? (
        <>
          <div ref={textRef}>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'var(--h3-size)',
              color: 'var(--text-primary)',
              letterSpacing: 'var(--h3-spacing)',
              lineHeight: 'var(--h3-line-height)',
              marginBottom: '1rem',
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'var(--body-size)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
            }}>
              {description}
            </p>
          </div>
          <div ref={visRef}>{visual}</div>
        </>
      ) : (
        <>
          <div ref={visRef}>{visual}</div>
          <div ref={textRef}>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'var(--h3-size)',
              color: 'var(--text-primary)',
              letterSpacing: 'var(--h3-spacing)',
              lineHeight: 'var(--h3-line-height)',
              marginBottom: '1rem',
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'var(--body-size)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
            }}>
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Feature visuals ── */

function PhoneCanvas() {
  return (
    <div style={{ width: '100%', height: 360, borderRadius: 16, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 3.8], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} color="#111" />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#c8d8f0" />
        <pointLight position={[-2, -1, 2]} intensity={0.4} color="#c45a2d" />
        <Environment preset="city" />
        <Phone3D
          screenColor="#16a34a"
          rotation={[0.1, 0.3, 0]}
          position={[0, 0, 0]}
          scale={0.9}
          mouseTrack={true}
          mouseIntensity={0.09}
        />
      </Canvas>
    </div>
  );
}

function ResponsiveMockups() {
  const miniLaptop = (
    <div style={{
      width: '500px',
      transform: 'scale(0.58)',
      transformOrigin: 'top left',
      height: '320px',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ background: '#1d4ed8', padding: '0 20px', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Dave's Plumbing</span>
        <button style={{ background: '#fff', color: '#1d4ed8', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 700, fontSize: 11 }}>Call Now</button>
      </div>
      <div style={{ background: '#eff6ff', padding: '28px 20px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 8px', letterSpacing: '-0.03em' }}>Plumbing done right.<br />First time.</h2>
        <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 14px' }}>Licensed · Brisbane · 20 years experience</p>
        <button style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontWeight: 700, fontSize: 12 }}>Get a Free Quote</button>
      </div>
    </div>
  );

  const mobileInner = (
    <div style={{
      width: '240px',
      transform: 'scale(0.82)',
      transformOrigin: 'top left',
      height: '560px',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
      background: '#eff6ff',
    }}>
      <div style={{ background: '#1d4ed8', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Dave's Plumbing</span>
        <button style={{ background: '#fff', color: '#1d4ed8', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 700, fontSize: 10 }}>Call</button>
      </div>
      <div style={{ padding: '24px 14px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Plumbing done right.</h2>
        <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 16px' }}>Licensed · Brisbane</p>
        <button style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 6, padding: '12px', fontWeight: 700, fontSize: 13, width: '100%' }}>Get a Free Quote</button>
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 28,
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 500 }}>DESKTOP</p>
        <LaptopMockup>{miniLaptop}</LaptopMockup>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 500 }}>MOBILE</p>
        <PhoneMockup style={{ maxWidth: 160 }}>{mobileInner}</PhoneMockup>
      </div>
    </div>
  );
}

function GoogleResult() {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 28,
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      {/* Search bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-hover)',
        borderRadius: 8, padding: '10px 14px', marginBottom: 20,
      }}>
        <svg width="16" height="16" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>plumber brisbane</span>
      </div>

      {/* #1 result — our client */}
      <div style={{
        padding: '14px 16px',
        background: 'var(--bg-elevated)',
        borderRadius: 8,
        marginBottom: 8,
        borderLeft: '3px solid var(--accent)',
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>davesplumbing.com.au</div>
        <div style={{ fontSize: 16, color: '#4a9eff', fontWeight: 600, marginBottom: 4 }}>Dave's Plumbing — Brisbane's Trusted Plumber</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, lineHeight: 1.4 }}>
          Fast, reliable plumbing for Brisbane homes and businesses. Licensed, insured. Same-day...
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[1,2,3,4,5].map(s => (
            <span key={s} style={{ color: '#f59e0b', fontSize: 12 }}>★</span>
          ))}
          <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>4.9 (127 reviews)</span>
        </div>
      </div>

      {/* #2, #3 — greyed out */}
      {['Competitor Plumbing Co.', 'Another Plumber Pty Ltd'].map((name, i) => (
        <div key={name} style={{
          padding: '12px 16px',
          borderRadius: 8,
          marginBottom: 6,
          opacity: 0.35,
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>competitor{i + 1}.com.au</div>
          <div style={{ fontSize: 14, color: '#4a9eff', marginBottom: 3 }}>{name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>Plumbing services Brisbane...</div>
        </div>
      ))}
    </div>
  );
}

function LighthouseScores() {
  const scores = [
    { label: 'Performance', value: 99, color: '#22c55e' },
    { label: 'Accessibility', value: 100, color: '#22c55e' },
    { label: 'SEO', value: 98, color: '#22c55e' },
  ];
  const R = 38;
  const C = 2 * Math.PI * R;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: '32px 28px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
      }}>
        <div style={{ width: 20, height: 20, background: '#f59e0b', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 10, color: '#000', fontWeight: 800 }}>L</span>
        </div>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--text-primary)',
        }}>
          Google Lighthouse Report
        </span>
      </div>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        {scores.map(({ label, value, color }) => {
          const offset = C - (value / 100) * C;
          return (
            <div key={label} style={{ textAlign: 'center' }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                {/* Track */}
                <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                {/* Arc */}
                <circle
                  cx="50" cy="50" r={R} fill="none"
                  stroke={color} strokeWidth="8"
                  strokeDasharray={C}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{
                    '--arc-total': C,
                    '--arc-offset': offset,
                    animation: 'arcDraw 1.2s ease-out forwards',
                  }}
                />
                <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
                  fill={color} fontSize="22" fontWeight="700"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {value}
                </text>
              </svg>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 11,
                color: 'var(--text-muted)',
                marginTop: 4,
                fontWeight: 500,
              }}>
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 28,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid var(--border)',
        paddingBottom: 16, marginBottom: 20,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>L</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Luxcoda Support</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#22c55e' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Online
          </div>
        </div>
      </div>

      {[
        { from: 'client', text: 'Hey can we add a booking page to the site?' },
        { from: 'luxcoda', text: "Absolutely. I'll have a draft ready by tonight. Any specific fields you need on the form?" },
        { from: 'client', text: 'Just name, phone, and preferred time works.' },
        { from: 'luxcoda', text: 'Done. ✓ Live by tomorrow morning.' },
      ].map((msg, i) => (
        <div key={i} style={{
          display: 'flex',
          justifyContent: msg.from === 'client' ? 'flex-end' : 'flex-start',
          marginBottom: 10,
        }}>
          <div style={{
            background: msg.from === 'client' ? 'var(--accent)' : 'var(--bg-elevated)',
            color: msg.from === 'client' ? '#fff' : 'var(--text-secondary)',
            border: msg.from === 'client' ? 'none' : '1px solid var(--border)',
            borderRadius: msg.from === 'client' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            padding: '10px 14px',
            fontSize: 13,
            lineHeight: 1.5,
            maxWidth: '78%',
          }}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    textLeft: true,
    title: 'Custom Design',
    description: 'No templates. Every site is designed from scratch to match your business, your customers, and your city.',
    visual: <PhoneCanvas />,
  },
  {
    textLeft: false,
    title: 'Works on Every Device',
    description: "Same site. Perfect on a laptop, tablet, or phone. Because 80% of your customers are searching on mobile.",
    visual: <ResponsiveMockups />,
  },
  {
    textLeft: true,
    title: 'Shows Up on Google',
    description: 'SEO done right from day one. Your site is built so customers can actually find you when they search.',
    visual: <GoogleResult />,
  },
  {
    textLeft: false,
    title: 'Fast & Reliable',
    description: 'No slow loading, no downtime. We build fast sites because slow sites cost you jobs.',
    visual: <LighthouseScores />,
  },
  {
    textLeft: true,
    title: 'Ongoing Support',
    description: "We don't disappear after launch. Need changes? Got questions? We respond fast — like a teammate, not a vendor.",
    visual: <ChatMockup />,
  },
];

export default function Services() {
  return (
    <section style={{
      background: 'var(--bg-primary)',
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap">
        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 7rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            Everything your business needs online.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            No templates. No jargon. Just a website that works as hard as you do.
          </p>
        </div>

        {/* Feature rows */}
        {features.map((f, i) => (
          <FeatureRow key={f.title} {...f} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .feature-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
