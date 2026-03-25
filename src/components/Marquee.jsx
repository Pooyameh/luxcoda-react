const TRACK_A = [
  { text: 'Custom Web Design', color: '#5eaeff' },
  { text: 'Brisbane Business', color: null },
  { text: '7 Day Delivery', color: '#a855f7' },
  { text: 'No Templates', color: null },
  { text: 'Google Ready', color: '#5eaeff' },
  { text: 'Mobile First', color: null },
  { text: 'SEO Optimised', color: '#a855f7' },
  { text: 'Conversion Focused', color: null },
  { text: 'Custom Web Design', color: '#5eaeff' },
  { text: 'Brisbane Business', color: null },
  { text: '7 Day Delivery', color: '#a855f7' },
  { text: 'No Templates', color: null },
  { text: 'Google Ready', color: '#5eaeff' },
  { text: 'Mobile First', color: null },
  { text: 'SEO Optimised', color: '#a855f7' },
  { text: 'Conversion Focused', color: null },
]

const TRACK_B = [
  { text: 'Brand Identity', color: '#c084fc' },
  { text: 'Landing Pages', color: null },
  { text: 'E-Commerce', color: '#5eaeff' },
  { text: 'Local SEO', color: null },
  { text: 'Google Ads', color: '#c084fc' },
  { text: 'Booking Systems', color: null },
  { text: 'Social Media', color: '#5eaeff' },
  { text: 'Premium Animations', color: null },
  { text: 'Brand Identity', color: '#c084fc' },
  { text: 'Landing Pages', color: null },
  { text: 'E-Commerce', color: '#5eaeff' },
  { text: 'Local SEO', color: null },
  { text: 'Google Ads', color: '#c084fc' },
  { text: 'Booking Systems', color: null },
  { text: 'Social Media', color: '#5eaeff' },
  { text: 'Premium Animations', color: null },
]

const Dot = () => (
  <span
    style={{
      display: 'inline-block',
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
      flexShrink: 0,
      verticalAlign: 'middle',
    }}
  />
)

export default function Marquee() {
  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(94,174,255,0.06) 0%, rgba(168,85,247,0.06) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {/* Edge fades */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 130,
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
          width: 130,
          background: 'linear-gradient(270deg, #0a0a1a, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Track A — forward */}
      <div style={{ padding: '16px 0 10px', overflow: 'hidden' }}>
        <div className="marquee-track">
          {TRACK_A.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 18,
                padding: '0 24px',
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: item.color || 'rgba(240,240,255,0.75)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
              <Dot />
            </span>
          ))}
        </div>
      </div>

      {/* Track B — reverse */}
      <div style={{ padding: '10px 0 16px', overflow: 'hidden' }}>
        <div className="marquee-track-reverse">
          {TRACK_B.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 18,
                padding: '0 24px',
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: item.color || 'rgba(240,240,255,0.75)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
              <Dot />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
