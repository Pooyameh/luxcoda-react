/* Inline mini-website cards for the marquee */
const sites = [
  {
    name: 'Sparks Electrical',
    bg: '#0f172a',
    accent: '#f59e0b',
    headerBg: '#1e3a5f',
    type: 'Electrician',
    heroText: 'Licensed Electricians Brisbane',
  },
  {
    name: 'Reliable Plumbing',
    bg: '#eff6ff',
    accent: '#1d4ed8',
    headerBg: '#1d4ed8',
    type: 'Plumber',
    heroText: 'No leaks. No drama.',
  },
  {
    name: 'GreenEdge Landscaping',
    bg: '#f0fdf4',
    accent: '#16a34a',
    headerBg: '#14532d',
    type: 'Landscaper',
    heroText: 'Beautiful Gardens, Gold Coast',
  },
  {
    name: 'Smith Construction',
    bg: '#1a1a1a',
    accent: '#f97316',
    headerBg: '#111',
    type: 'Builder',
    heroText: 'Built to Last. Built by Smith.',
  },
  {
    name: 'ProPaint Brisbane',
    bg: '#fafafa',
    accent: '#7c3aed',
    headerBg: '#fff',
    type: 'Painter',
    heroText: 'Clean Finishes. Every Time.',
  },
  {
    name: 'AutoCare Mechanics',
    bg: '#111',
    accent: '#ef4444',
    headerBg: '#1a1a1a',
    type: 'Mechanic',
    heroText: 'Your Car, Our Priority.',
  },
];

function SiteCard({ site }) {
  const dark = ['#0f172a', '#1a1a1a', '#111'].includes(site.bg);
  const textColor = dark ? '#fff' : '#111';
  const subColor = dark ? 'rgba(255,255,255,0.5)' : '#6b7280';

  return (
    <div style={{
      width: 300,
      height: 200,
      flexShrink: 0,
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden',
      transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'scale(1.02)';
      e.currentTarget.style.borderColor = 'var(--border-hover)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Mini site inside */}
      <div style={{
        width: '100%',
        height: '100%',
        background: site.bg,
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}>
        {/* Nav */}
        <div style={{
          background: site.headerBg,
          padding: '0 14px',
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${site.accent}22`,
        }}>
          <span style={{ color: dark ? '#fff' : textColor, fontWeight: 700, fontSize: 11 }}>
            {site.name}
          </span>
          <div style={{
            background: site.accent,
            color: '#fff',
            borderRadius: 4,
            padding: '3px 8px',
            fontSize: 9,
            fontWeight: 700,
          }}>
            Call Now
          </div>
        </div>
        {/* Hero area */}
        <div style={{
          padding: '16px 14px',
          borderBottom: `1px solid ${site.accent}22`,
        }}>
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            color: site.accent,
            marginBottom: 6,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {site.type} — Brisbane
          </div>
          <div style={{
            fontSize: 13,
            fontWeight: 800,
            color: textColor,
            lineHeight: 1.2,
            marginBottom: 8,
          }}>
            {site.heroText}
          </div>
          <div style={{
            display: 'inline-block',
            background: site.accent,
            color: '#fff',
            borderRadius: 4,
            padding: '4px 10px',
            fontSize: 9,
            fontWeight: 700,
          }}>
            Get a Free Quote →
          </div>
        </div>
        {/* Service mini-cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 6,
          padding: '10px 14px',
        }}>
          {['Service 1', 'Service 2', 'Service 3'].map(s => (
            <div key={s} style={{
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              borderRadius: 6,
              padding: '6px',
              textAlign: 'center',
            }}>
              <div style={{ width: 12, height: 12, background: site.accent, borderRadius: 3, margin: '0 auto 4px' }} />
              <div style={{ fontSize: 8, color: subColor }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Duplicate for seamless loop
const allSites = [...sites, ...sites];

export default function Showcase() {
  return (
    <section style={{
      padding: '60px 0 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Label */}
      <p style={{
        textAlign: 'center',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 500,
        fontSize: 'var(--small-size)',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '2rem',
      }}>
        Built by Luxcoda
      </p>

      {/* Marquee strip */}
      <div style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        overflow: 'hidden',
      }}>
        <div className="marquee-track" style={{ paddingLeft: 16 }}>
          {allSites.map((site, i) => (
            <SiteCard key={i} site={site} />
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        padding: '0 var(--content-padding)',
      }}>
        {[
          'Custom Design',
          'Mobile First',
          'SEO Ready',
          'Fast Loading',
          'Ongoing Support',
        ].map((badge, i, arr) => (
          <span key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {i > 0 && (
              <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>·</span>
            )}
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: 'var(--small-size)',
              color: 'var(--text-muted)',
            }}>
              {badge}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
