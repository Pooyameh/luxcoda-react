import { useInView } from '../hooks/useInView';
import LaptopMockup from './devices/LaptopMockup';
import PhoneMockup from './devices/PhoneMockup';

/* ── Mini site: Sparks Electrical ── */
function SparksElectrical() {
  return (
    <div style={{
      width: '1200px',
      transform: 'scale(0.32)',
      transformOrigin: 'top left',
      height: '750px',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#0f172a',
        padding: '0 48px',
        height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, background: '#f59e0b', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Sparks Electrical</span>
        </div>
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {['Services', 'Areas', 'Reviews', 'About'].map(l => (
            <span key={l} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>{l}</span>
          ))}
          <button style={{
            background: '#f59e0b', color: '#0f172a', border: 'none',
            borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
          }}>
            Call Now
          </button>
        </div>
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)',
        padding: '64px 48px 48px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)',
          borderRadius: 999, padding: '5px 16px', marginBottom: 24,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ color: '#f59e0b', fontSize: 13, fontWeight: 600 }}>Available 7 Days · Same Day Service</span>
        </div>
        <h1 style={{
          color: '#fff', fontSize: 60, fontWeight: 900,
          lineHeight: 1.0, margin: '0 0 20px', letterSpacing: '-0.03em',
        }}>
          Licensed Electricians<br />
          <span style={{ color: '#f59e0b' }}>Brisbane.</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, maxWidth: 520, lineHeight: 1.6, margin: '0 0 32px' }}>
          Residential and commercial electrical work done right. Fast quotes, clean installs, no shortcuts.
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <button style={{
            background: '#f59e0b', color: '#0f172a', border: 'none',
            borderRadius: 10, padding: '18px 40px', fontWeight: 800, fontSize: 17, cursor: 'pointer',
          }}>
            Get a Free Quote
          </button>
          <button style={{
            background: 'rgba(255,255,255,0.08)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 10, padding: '18px 40px', fontWeight: 600, fontSize: 17, cursor: 'pointer',
          }}>
            0414 758 891
          </button>
        </div>
      </div>
      <div style={{ background: '#fff', padding: '32px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
        {['Power Points', 'Safety Switches', 'LED Lighting', 'Solar & Batteries'].map(s => (
          <div key={s} style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: 10, padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mini site: GreenEdge Landscaping (phone) ── */
function GreenEdgeLandscaping() {
  return (
    <div style={{
      width: '420px',
      transform: 'scale(0.62)',
      transformOrigin: 'top left',
      height: '900px',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
      background: '#fff',
    }}>
      {/* Mobile nav */}
      <div style={{
        background: '#14532d',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>GreenEdge</span>
        <button style={{
          background: '#22c55e', color: '#fff', border: 'none',
          borderRadius: 6, padding: '7px 14px', fontWeight: 700, fontSize: 13,
        }}>
          Call Now
        </button>
      </div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #14532d 0%, #166534 100%)',
        padding: '32px 20px',
        textAlign: 'center',
      }}>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: '0 0 10px', lineHeight: 1.15 }}>
          Gold Coast<br />Landscaping
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: '0 0 20px', lineHeight: 1.5 }}>
          Gardens, lawns, and outdoor spaces that look amazing all year round.
        </p>
        <button style={{
          background: '#22c55e', color: '#fff', border: 'none',
          borderRadius: 8, padding: '13px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
          width: '100%',
        }}>
          Get a Free Quote
        </button>
      </div>
      {/* Services */}
      <div style={{ padding: '24px 20px', background: '#fff' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#14532d', marginBottom: 14 }}>Our Services</h2>
        {['Lawn Mowing & Edging', 'Garden Design', 'Irrigation Systems', 'Tree & Hedge Trimming'].map(s => (
          <div key={s} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 0', borderBottom: '1px solid #f0fdf4',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: '#374151' }}>{s}</span>
          </div>
        ))}
      </div>
      {/* Trust block */}
      <div style={{
        background: '#f0fdf4', margin: '0 20px', borderRadius: 10, padding: '16px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        {[{ n: '200+', l: 'Happy clients' }, { n: '4.8★', l: 'Google rating' }].map(s => (
          <div key={s.n} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#14532d' }}>{s.n}</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mini site: Reliable Plumbing (laptop) ── */
function ReliablePlumbing() {
  return (
    <div style={{
      width: '1100px',
      transform: 'scale(0.32)',
      transformOrigin: 'top left',
      height: '680px',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        padding: '0 40px',
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: '#1d4ed8', letterSpacing: '-0.02em' }}>Reliable Plumbing Co.</span>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Services</span>
          <span style={{ fontSize: 13, color: '#6b7280' }}>About</span>
          <button style={{
            background: '#1d4ed8', color: '#fff', border: 'none',
            borderRadius: 6, padding: '9px 20px', fontWeight: 700, fontSize: 13,
          }}>
            Call 0414 758 891
          </button>
        </div>
      </div>
      {/* Split hero */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 320,
      }}>
        <div style={{
          padding: '48px 40px', background: '#fff',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={{
            background: '#eff6ff', color: '#1d4ed8',
            borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700,
            width: 'fit-content', marginBottom: 20,
          }}>
            Brisbane · Licensed · 24/7 Emergency
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#111', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            No leaks.<br />No drama.<br />Done right.
          </h1>
          <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6, margin: '0 0 28px' }}>
            Brisbane's reliable plumbers for homes and small businesses. On time, upfront pricing.
          </p>
          <button style={{
            background: '#1d4ed8', color: '#fff', border: 'none',
            borderRadius: 8, padding: '14px 28px', fontWeight: 700, fontSize: 15,
            width: 'fit-content', cursor: 'pointer',
          }}>
            Book a Plumber →
          </button>
        </div>
        <div style={{
          background: '#1d4ed8',
          padding: '48px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16,
        }}>
          {[
            { title: 'Blocked Drains', desc: 'Same-day clearing' },
            { title: 'Leaking Taps', desc: 'Fast, affordable repairs' },
            { title: 'Hot Water', desc: 'All brands, all types' },
            { title: 'Emergency', desc: '24/7 callouts' },
          ].map(item => (
            <div key={item.title} style={{
              background: 'rgba(255,255,255,0.1)', borderRadius: 10,
              padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#60a5fa', flexShrink: 0 }} />
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{item.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust bar */}
      <div style={{
        background: '#f8fafc', padding: '20px 40px',
        display: 'flex', justifyContent: 'space-around',
        borderTop: '1px solid #e5e7eb',
      }}>
        {['5★ Google Rating', '300+ Jobs Done', 'Upfront Pricing', 'Licensed & Insured'].map(t => (
          <div key={t} style={{
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1d4ed8' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectLabel({ name, location, isVisible, delay = 0 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      marginTop: '1rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      <div>
        <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
          {name}
        </div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'var(--small)', color: 'var(--text-muted)', marginTop: 2 }}>
          {location}
        </div>
      </div>
      <a
        href="#"
        style={{
          fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
          fontSize: 'var(--small)', color: 'var(--accent)',
          transition: 'opacity 0.25s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        onClick={e => e.preventDefault()}
      >
        View project →
      </a>
    </div>
  );
}

export default function Portfolio() {
  const [headingRef, headingVisible] = useInView();
  const [project1Ref, project1Visible] = useInView({ threshold: 0.1 });
  const [project2Ref, project2Visible] = useInView({ threshold: 0.05 });

  return (
    <section
      id="work"
      style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--section-padding) var(--content-padding)',
      }}
    >
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
          }}>
            Built by Luxcoda.
          </h2>
        </div>

        {/* Project 1 — Featured full-width */}
        <div
          ref={project1Ref}
          style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: project1Visible ? 1 : 0,
            transform: project1Visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <LaptopMockup>
            <SparksElectrical />
          </LaptopMockup>
          <ProjectLabel
            name="Sparks Electrical"
            location="Electrician, Brisbane"
            isVisible={project1Visible}
            delay={0.2}
          />
        </div>

        {/* Projects 2 & 3 — side by side */}
        <div
          ref={project2Ref}
          className="portfolio-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 'clamp(2rem, 4vw, 3rem)',
            alignItems: 'start',
          }}
        >
          {/* Phone mockup */}
          <div style={{
            opacity: project2Visible ? 1 : 0,
            transform: project2Visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PhoneMockup>
                <GreenEdgeLandscaping />
              </PhoneMockup>
            </div>
            <ProjectLabel
              name="GreenEdge Landscaping"
              location="Gold Coast"
              isVisible={project2Visible}
              delay={0.3}
            />
          </div>

          {/* Laptop mockup */}
          <div style={{
            opacity: project2Visible ? 1 : 0,
            transform: project2Visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>
            <LaptopMockup>
              <ReliablePlumbing />
            </LaptopMockup>
            <ProjectLabel
              name="Reliable Plumbing"
              location="Brisbane"
              isVisible={project2Visible}
              delay={0.4}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .portfolio-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
