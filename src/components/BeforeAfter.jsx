import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LaptopMockup from './devices/LaptopMockup';

function UglySite() {
  return (
    <div style={{
      width: '1100px',
      transform: 'scale(0.31)',
      transformOrigin: 'top left',
      height: '740px',
      overflow: 'hidden',
      fontFamily: 'Georgia, serif',
    }}>
      {/* Awful nav */}
      <div style={{
        background: 'linear-gradient(90deg, #003399, #6600cc)',
        padding: '0 12px',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        borderBottom: '4px solid #ffff00',
      }}>
        {['HOME', 'ABOUT', 'SERVICES', 'GALLERY', 'TESTIMONIALS', 'CONTACT US', 'FAQ'].map((l, i) => (
          <span key={l} style={{
            color: i === 0 ? '#ffff00' : '#fff',
            fontSize: 10,
            fontWeight: 900,
            padding: '0 8px',
            borderRight: '1px solid rgba(255,255,255,0.2)',
            whiteSpace: 'nowrap',
            fontFamily: 'Arial Black, Arial, sans-serif',
          }}>{l}</span>
        ))}
      </div>
      {/* Ugly hero */}
      <div style={{
        background: 'linear-gradient(160deg, #336699 0%, #6633cc 40%, #003366 100%)',
        padding: '28px 20px 20px',
        textAlign: 'center',
        borderBottom: '5px solid #ffcc00',
      }}>
        <div style={{ fontSize: 10, color: '#ffff99', fontFamily: 'Arial', letterSpacing: 2, marginBottom: 8 }}>
          ★★★ WELCOME TO OUR WEBSITE ★★★
        </div>
        <h1 style={{
          color: '#ffff00',
          fontSize: 42,
          fontWeight: 900,
          margin: '0 0 8px',
          textShadow: '3px 3px 0 #000, 0 0 20px rgba(255,255,0,0.6)',
          fontFamily: 'Impact, Arial Black, sans-serif',
          lineHeight: 1.1,
        }}>
          Welcome to Dave's Plumbing!!
        </h1>
        <p style={{ color: '#cce5ff', fontSize: 13, margin: '0 0 14px', fontFamily: 'Arial' }}>
          Servicing Brisbane &amp; Surrounds since 2003!!!
        </p>
        <button style={{
          background: '#00ff00',
          color: '#000',
          border: '4px solid #009900',
          padding: '12px 24px',
          fontSize: 15,
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'Arial Black, sans-serif',
          textTransform: 'uppercase',
          boxShadow: '4px 4px 0 #000',
        }}>
          CLICK HERE!!!
        </button>
      </div>
      {/* Cluttered body */}
      <div style={{ background: '#f0ead0', padding: '14px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { title: 'OUR SERVICES!!', body: 'We do ALL types of plumbing!! Leaking taps, blocked drains, hot water systems, gas fitting AND MORE!! Call us NOW for BEST prices in Brisbane!!' },
            { title: 'WHY CHOOSE US???', body: '20+ years!! Family owned!! Cheap prices!! Fully licensed!! We are the BEST plumbers in Brisbane!!! Don\'t go anywhere else!! CALL NOW!!!' },
            { title: 'CONTACT INFO', body: 'PHONE: 0400 111 222\nMOBILE: 0411 333 444\nFAX: 07 3333 4444\nEMAIL: dave@davesplumbing.com.au\nADDRESS: 123 Some St, Brisbane' },
          ].map(c => (
            <div key={c.title} style={{
              background: '#fffde7',
              border: '3px solid #cc9900',
              padding: '10px',
            }}>
              <div style={{
                background: '#003366', color: '#ffcc00',
                fontFamily: 'Arial Black', fontSize: 11, fontWeight: 900,
                padding: '4px 8px', marginBottom: 6, textTransform: 'uppercase',
              }}>{c.title}</div>
              <p style={{ fontSize: 10, color: '#333', fontFamily: 'Arial', lineHeight: 1.4, margin: 0, whiteSpace: 'pre-line' }}>{c.body}</p>
            </div>
          ))}
        </div>
        <div style={{
          background: '#ff6600', color: '#fff',
          fontFamily: 'Arial Black', fontSize: 12, padding: '8px',
          marginTop: 10, textAlign: 'center',
          border: '3px dashed #ffff00',
        }}>
          🔧 SPECIAL OFFER THIS MONTH ONLY!! FREE CALL-OUT!! RING NOW DON'T MISS OUT!! 🔧
        </div>
      </div>
    </div>
  );
}

function SharpSite() {
  return (
    <div style={{
      width: '1100px',
      transform: 'scale(0.31)',
      transformOrigin: 'top left',
      height: '740px',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      {/* Clean nav */}
      <div style={{
        background: '#fff',
        padding: '0 40px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: '#1d4ed8', borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 18, color: '#111', letterSpacing: '-0.03em' }}>Dave's Plumbing</span>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Services', 'About', 'Reviews'].map(l => (
            <span key={l} style={{ fontSize: 14, color: '#6b7280' }}>{l}</span>
          ))}
          <button style={{
            background: '#1d4ed8', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14,
          }}>
            Get a Free Quote →
          </button>
        </div>
      </div>
      {/* Clean hero */}
      <div style={{
        background: '#eff6ff',
        padding: '56px 40px 40px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'inline-block', background: '#dbeafe', color: '#1d4ed8',
            borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, marginBottom: 16,
          }}>
            Licensed · Insured · Brisbane
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, color: '#111', lineHeight: 1.05, margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Plumbing done right.<br />First time.
          </h1>
          <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.6, margin: '0 0 24px' }}>
            20 years serving Brisbane. No surprises, no shortcuts — just clean work you can count on.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{
              background: '#1d4ed8', color: '#fff', border: 'none',
              borderRadius: 8, padding: '14px 28px', fontWeight: 700, fontSize: 15,
            }}>
              Get a Free Quote
            </button>
            <button style={{
              background: '#fff', color: '#1d4ed8',
              border: '2px solid #1d4ed8',
              borderRadius: 8, padding: '14px 28px', fontWeight: 600, fontSize: 15,
            }}>
              0414 758 891
            </button>
          </div>
        </div>
        <div style={{
          background: '#1d4ed8', borderRadius: 16, padding: '28px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {[{ n: '500+', l: 'Jobs completed' }, { n: '4.9★', l: 'Google rating' }, { n: '20yr', l: 'Experience' }].map(s => (
            <div key={s.n} style={{
              background: 'rgba(255,255,255,0.1)', borderRadius: 10,
              padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{s.n}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Services row */}
      <div style={{ background: '#fff', padding: '24px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {[
          { t: 'Blocked Drains', d: 'Same-day clearing' },
          { t: 'Hot Water', d: 'All brands, fast service' },
          { t: 'Gas Fitting', d: 'Certified gas plumber' },
        ].map(c => (
          <div key={c.t} style={{
            border: '1px solid #e5e7eb', borderRadius: 10, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1d4ed8' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{c.t}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{c.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 24, duration: 0.8, ease: 'power3.out',
      });
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: leftRef.current, start: 'top 80%', once: true },
        opacity: 0, x: -40, duration: 0.9, ease: 'power3.out', delay: 0.1,
      });
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: rightRef.current, start: 'top 80%', once: true },
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out', delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{
      background: 'var(--bg-surface)',
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap">
        {/* Heading */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            First impressions win jobs.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Your customers check your site before they call. What are they seeing?
          </p>
        </div>

        {/* Mockups side by side */}
        <div className="ba-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
        }}>
          <div ref={leftRef}>
            <LaptopMockup>
              <UglySite />
            </LaptopMockup>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 'var(--small-size)',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: '1rem',
            }}>
              This is most websites.
            </p>
          </div>
          <div ref={rightRef}>
            <LaptopMockup>
              <SharpSite />
            </LaptopMockup>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--accent)',
              textAlign: 'center',
              marginTop: '1rem',
            }}>
              This is a Luxcoda site.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .ba-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
