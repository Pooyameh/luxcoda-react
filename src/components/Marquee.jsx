export default function Marquee() {
  const items = [
    'Custom Web Design',
    'Brisbane Business',
    '7 Day Delivery',
    'No Templates',
    'Google Ready',
    'Mobile First',
    'SEO Optimised',
    'Conversion Focused',
    'Custom Web Design',
    'Brisbane Business',
    '7 Day Delivery',
    'No Templates',
    'Google Ready',
    'Mobile First',
    'SEO Optimised',
    'Conversion Focused',
  ]

  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(94,174,255,0.08) 0%, rgba(168,85,247,0.08) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        padding: '18px 0',
      }}
    >
      {/* Edge fades */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: 'linear-gradient(90deg, #0a0a1a, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: 'linear-gradient(270deg, #0a0a1a, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 20,
              padding: '0 28px',
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: i % 4 === 0
                ? '#5eaeff'
                : i % 4 === 2
                ? '#a855f7'
                : 'rgba(240,240,255,0.55)',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <span
              style={{
                display: 'inline-block',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
