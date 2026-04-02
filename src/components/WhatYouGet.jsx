import { useInView } from '../hooks/useInView';

const features = [
  {
    title: 'Custom Design',
    desc: 'No templates. Built from scratch for your business.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    title: 'Works on Every Device',
    desc: 'Looks just as good on a phone as a laptop.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    title: 'Shows Up on Google',
    desc: 'SEO done right so customers actually find you.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    title: 'Fast & Reliable',
    desc: 'No slow loading, no downtime, no headaches.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: 'Ongoing Support',
    desc: "We don't disappear after launch.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-.45a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    title: 'Content That Converts',
    desc: 'Words and layout designed to get people to call you.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
];

function FeatureCard({ feature, delay, isVisible }) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 32,
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}s`,
        transitionProperty: 'opacity, transform, box-shadow, border-color',
        transitionDuration: '0.6s, 0.6s, 0.25s, 0.25s',
        transitionTimingFunction: 'ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = 'var(--accent-light)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ marginBottom: 16 }}>{feature.icon}</div>
      <h3 style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 600,
        fontSize: '1.125rem',
        color: 'var(--text-primary)',
        marginBottom: 8,
      }}>
        {feature.title}
      </h3>
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 400,
        fontSize: 'var(--small)',
        color: 'var(--text-body)',
        lineHeight: 1.5,
        margin: 0,
      }}>
        {feature.desc}
      </p>
    </div>
  );
}

export default function WhatYouGet() {
  const [headingRef, headingVisible] = useInView();
  const [gridRef, gridVisible] = useInView({ threshold: 0.05 });

  return (
    <section style={{
      background: 'var(--bg-primary)',
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap">
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
            Everything you need. Nothing you don't.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              feature={f}
              delay={i * 0.08}
              isVisible={gridVisible}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
