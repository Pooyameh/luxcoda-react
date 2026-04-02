import { useInView } from '../hooks/useInView';
import LaptopMockup from './devices/LaptopMockup';

function ElectricianMiniSite() {
  return (
    <div style={{
      width: '1200px',
      transform: 'scale(0.32)',
      transformOrigin: 'top left',
      height: '700px',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Nav */}
      <div style={{
        background: '#1e3a5f',
        padding: '0 40px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 22 }}>PowerUp Electrical</span>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Services</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>About</span>
          <button style={{
            background: '#f59e0b', color: '#1a1816', border: 'none',
            borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>
            Call Now
          </button>
        </div>
      </div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)',
        padding: '80px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        <div style={{
          background: 'rgba(245,158,11,0.15)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: 4,
          padding: '6px 16px',
          width: 'fit-content',
          color: '#f59e0b', fontSize: 13, fontWeight: 600,
        }}>
          Licensed & Insured · Brisbane
        </div>
        <h1 style={{ color: '#fff', fontSize: 56, fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
          Brisbane's Trusted<br />Electricians
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, margin: 0, maxWidth: 480 }}>
          Residential, commercial, emergency — we handle it all. Licensed electricians available 7 days.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <button style={{
            background: '#f59e0b', color: '#1a1816', border: 'none',
            borderRadius: 8, padding: '16px 36px', fontWeight: 700, fontSize: 16, cursor: 'pointer',
          }}>
            Call for a Free Quote
          </button>
          <button style={{
            background: 'transparent', color: '#fff',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: 8, padding: '16px 36px', fontWeight: 600, fontSize: 16, cursor: 'pointer',
          }}>
            Our Services
          </button>
        </div>
      </div>
      {/* Service cards */}
      <div style={{
        background: '#f8f9fa',
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 20,
      }}>
        {[
          { title: 'Residential', desc: 'New builds, rewires, fault finding' },
          { title: 'Commercial', desc: 'Offices, retail, warehouses' },
          { title: 'Emergency', desc: '24/7 callouts, same-day service' },
        ].map(card => (
          <div key={card.title} style={{
            background: '#fff',
            borderRadius: 10,
            padding: '24px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: 'rgba(30,58,95,0.08)',
              marginBottom: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700, color: '#1a1816' }}>{card.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const [ref, isVisible] = useInView({ threshold: 0.05 });

  return (
    <section style={{
      background: 'var(--bg-primary)',
      paddingTop: 64,
      minHeight: 'calc(100vh - 0px)',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div
        ref={ref}
        className="content-wrap"
        style={{
          width: '100%',
          padding: 'var(--section-padding) var(--content-padding)',
        }}
      >
        <div className="hero-inner" style={{
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}>
          {/* Left: copy */}
          <div>
            <h1 style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: 'var(--h1)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}>
              Your work speaks for itself.
              <br />
              Your website should too.
            </h1>

            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: 'var(--body)',
              color: 'var(--text-body)',
              lineHeight: 1.6,
              maxWidth: 480,
              marginTop: '1.25rem',
              marginBottom: 0,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}>
              We build websites for Brisbane tradies and local businesses that actually get you more work.
            </p>

            <div style={{
              marginTop: '2rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            }}>
              <button
                onClick={() => scrollTo('contact')}
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '16px 32px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, transform 0.25s ease',
                  display: 'inline-block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Let's Talk
              </button>
            </div>
          </div>

          {/* Right: laptop mockup */}
          <div
            className="hero-mockup"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'perspective(1000px) rotateY(-5deg) rotateX(2deg)'
                : 'perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(24px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
              animation: isVisible ? 'heroFloat 3s ease-in-out infinite alternate' : 'none',
            }}
          >
            <LaptopMockup>
              <ElectricianMiniSite />
            </LaptopMockup>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          from { transform: perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(0px); }
          to   { transform: perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(-8px); }
        }
        @media (max-width: 1023px) {
          .hero-inner { grid-template-columns: 1fr !important; }
          .hero-mockup {
            transform: none !important;
            animation: none !important;
            max-width: 560px;
            margin: 0 auto;
          }
        }
        @media (max-width: 1023px) {
          .hero-cta-btn { width: 100%; display: block; text-align: center; }
        }
      `}</style>
    </section>
  );
}
