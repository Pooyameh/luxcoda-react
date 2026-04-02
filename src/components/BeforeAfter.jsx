import { useInView } from '../hooks/useInView';
import LaptopMockup from './devices/LaptopMockup';

function UglySite() {
  return (
    <div style={{
      width: '1100px',
      transform: 'scale(0.32)',
      transformOrigin: 'top left',
      height: '700px',
      overflow: 'hidden',
      fontFamily: 'Georgia, serif',
    }}>
      {/* Hideous nav */}
      <div style={{
        background: 'linear-gradient(90deg, #003366, #0066cc)',
        padding: '0 16px',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        borderBottom: '3px solid #ffcc00',
      }}>
        {['HOME', 'SERVICES', 'ABOUT US', 'GALLERY', 'TESTIMONIALS', 'FAQ', 'CONTACT US'].map((l, i) => (
          <span key={l} style={{
            color: i === 0 ? '#ffcc00' : '#fff',
            fontSize: 11,
            fontWeight: 700,
            padding: '0 10px',
            borderRight: '1px solid rgba(255,255,255,0.2)',
            whiteSpace: 'nowrap',
            fontFamily: 'Arial, sans-serif',
          }}>{l}</span>
        ))}
      </div>
      {/* Ugly hero */}
      <div style={{
        background: 'linear-gradient(160deg, #336699 0%, #6633cc 50%, #003366 100%)',
        padding: '30px 24px 24px',
        textAlign: 'center',
        borderBottom: '4px solid #ffcc00',
      }}>
        <div style={{
          fontSize: 11, color: '#ffff99', fontFamily: 'Arial',
          textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8,
        }}>
          ★ WELCOME TO OUR WEBSITE ★
        </div>
        <h1 style={{
          color: '#ffff00',
          fontSize: 44,
          fontWeight: 900,
          margin: '0 0 6px',
          textShadow: '2px 2px 4px #000, 0 0 20px rgba(255,255,0,0.5)',
          fontFamily: 'Impact, Arial Black, sans-serif',
          lineHeight: 1.1,
        }}>
          Welcome to Dave's Plumbing!!
        </h1>
        <p style={{ color: '#cce5ff', fontSize: 13, margin: '0 0 16px', fontFamily: 'Arial' }}>
          Servicing Brisbane and surrounding areas since 2003
        </p>
        <button style={{
          background: '#00ff00',
          color: '#000',
          border: '3px solid #009900',
          borderRadius: 0,
          padding: '12px 28px',
          fontSize: 16,
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'Arial Black, sans-serif',
          textTransform: 'uppercase',
          boxShadow: '3px 3px 0 #000',
        }}>
          Click Here!!!
        </button>
      </div>
      {/* Cluttered body */}
      <div style={{ background: '#f0f0e0', padding: '16px 20px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
        }}>
          {[
            { title: 'OUR SERVICES!!', body: 'We do ALL types of plumbing!! Leaking taps, blocked drains, hot water systems, gas fitting AND MORE!! Call us NOW for the BEST prices in Brisbane!!' },
            { title: 'WHY CHOOSE US', body: '20+ years experience. Family owned. Cheap prices. Fully licensed. We are the BEST plumbers in Brisbane. Don\'t go anywhere else!! CALL NOW!!!' },
            { title: 'CONTACT', body: 'PHONE: 0400 111 222\nMOBILE: 0411 333 444\nFAX: 07 3333 4444\nEMAIL: dave@davesplumbing.com.au\nADDRESS: 123 Some Street, Brisbane QLD 4000' },
          ].map(c => (
            <div key={c.title} style={{
              background: '#fffde7',
              border: '2px solid #cc9900',
              padding: '12px',
            }}>
              <div style={{
                background: '#003366', color: '#ffcc00',
                fontFamily: 'Arial Black', fontSize: 12, fontWeight: 900,
                padding: '4px 8px', marginBottom: 8, textTransform: 'uppercase',
              }}>{c.title}</div>
              <p style={{ fontSize: 11, color: '#333', fontFamily: 'Arial', lineHeight: 1.4, margin: 0, whiteSpace: 'pre-line' }}>{c.body}</p>
            </div>
          ))}
        </div>
        {/* Marquee-style ugly banner */}
        <div style={{
          background: '#ff6600', color: '#fff',
          fontFamily: 'Arial Black', fontWeight: 900, fontSize: 13,
          padding: '8px 16px', marginTop: 12, textAlign: 'center',
          border: '2px dashed #ffff00',
        }}>
          🔧 SPECIAL OFFER: FREE CALL-OUT THIS MONTH ONLY! RING NOW! DON'T MISS OUT!! 🔧
        </div>
      </div>
    </div>
  );
}

function SharpSite() {
  return (
    <div style={{
      width: '1100px',
      transform: 'scale(0.32)',
      transformOrigin: 'top left',
      height: '700px',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Clean nav */}
      <div style={{
        background: '#fff',
        padding: '0 40px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: '#1e40af', borderRadius: 8 }} />
          <span style={{ fontWeight: 700, fontSize: 18, color: '#111', letterSpacing: '-0.02em' }}>Dave's Plumbing</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: '#6b7280' }}>Services</span>
          <span style={{ fontSize: 14, color: '#6b7280' }}>About</span>
          <span style={{ fontSize: 14, color: '#6b7280' }}>Reviews</span>
          <button style={{
            background: '#1e40af', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 24px',
            fontWeight: 600, fontSize: 14, cursor: 'pointer',
          }}>
            Get a Free Quote →
          </button>
        </div>
      </div>
      {/* Clean hero */}
      <div style={{
        background: '#eff6ff',
        padding: '60px 40px 40px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'inline-block', background: '#dbeafe', color: '#1e40af',
            borderRadius: 999, padding: '4px 14px', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>
            Licensed · Insured · Brisbane
          </div>
          <h1 style={{ fontSize: 46, fontWeight: 800, color: '#111', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Plumbing done right. First time.
          </h1>
          <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.6, margin: '0 0 24px' }}>
            20 years serving Brisbane. No surprises, no shortcuts — just clean, reliable work you can count on.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{
              background: '#1e40af', color: '#fff', border: 'none',
              borderRadius: 8, padding: '14px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            }}>
              Get a Free Quote
            </button>
            <button style={{
              background: '#fff', color: '#1e40af',
              border: '2px solid #1e40af',
              borderRadius: 8, padding: '14px 28px', fontWeight: 600, fontSize: 15, cursor: 'pointer',
            }}>
              0414 758 891
            </button>
          </div>
        </div>
        <div style={{
          background: '#1e40af', borderRadius: 16, padding: '28px',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {[
            { n: '500+', l: 'Jobs completed' },
            { n: '4.9★', l: 'Google rating' },
            { n: '20yr', l: 'Experience' },
          ].map(s => (
            <div key={s.n} style={{
              background: 'rgba(255,255,255,0.1)', borderRadius: 10,
              padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{s.n}</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Service cards */}
      <div style={{ background: '#fff', padding: '28px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {[
          { t: 'Blocked Drains', d: 'Same-day clearing' },
          { t: 'Hot Water', d: 'Install & repairs' },
          { t: 'Gas Fitting', d: 'Cert. gas plumber' },
        ].map(c => (
          <div key={c.t} style={{
            border: '1px solid #e5e7eb', borderRadius: 10, padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: '#eff6ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{c.t}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{c.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [headingRef, headingVisible] = useInView();
  const [leftRef, leftVisible] = useInView();
  const [rightRef, rightVisible] = useInView();

  return (
    <section style={{
      background: 'var(--bg-secondary)',
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap">
        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700,
            fontSize: 'var(--h2)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
          }}>
            First impressions win jobs.
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'var(--body)',
            color: 'var(--text-body)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Your customers check your site before they call. What are they seeing?
          </p>
        </div>

        {/* Mockups */}
        <div className="ba-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 4vw, 4rem)',
        }}>
          {/* Before */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            <LaptopMockup>
              <UglySite />
            </LaptopMockup>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              fontSize: 'var(--small)',
              color: 'var(--text-muted)',
              marginTop: '1rem',
              textAlign: 'center',
            }}>
              Most websites look like this.
            </p>
          </div>

          {/* After */}
          <div
            ref={rightRef}
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
            }}
          >
            <LaptopMockup>
              <SharpSite />
            </LaptopMockup>
            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--accent)',
              marginTop: '1rem',
              textAlign: 'center',
            }}>
              Yours won't.
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
