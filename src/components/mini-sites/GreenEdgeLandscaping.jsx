/* GreenEdge Landscaping — light green / natural */
export default function GreenEdgeLandscaping() {
  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#f0fdf4', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <div style={{ background: '#fff', padding: '0 52px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid #f0fdf4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#16a34a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌿</div>
          <span style={{ color: '#14532d', fontWeight: 800, fontSize: 20, letterSpacing: '-0.025em' }}>GreenEdge</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Services', 'Gallery', 'About'].map(l => (
            <span key={l} style={{ color: '#6b7280', fontSize: 15, fontWeight: 500 }}>{l}</span>
          ))}
          <button style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 26px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Free Quote</button>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: '#f0fdf4', padding: '52px 52px 44px', flexShrink: 0 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.25)', borderRadius: 999, padding: '5px 16px', marginBottom: 24 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a' }} />
          <span style={{ color: '#15803d', fontSize: 14, fontWeight: 600 }}>Serving Gold Coast & South-East QLD</span>
        </div>
        <h1 style={{ color: '#14532d', fontSize: 52, fontWeight: 900, lineHeight: 1.0, margin: '0 0 8px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Gold Coast
        </h1>
        <h1 style={{ color: '#14532d', fontSize: 52, fontWeight: 900, lineHeight: 1.0, margin: '0 0 8px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Landscaping
        </h1>
        <h1 style={{ color: '#16a34a', fontSize: 52, fontWeight: 900, lineHeight: 1.05, margin: '0 0 22px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Done Different.
        </h1>
        <p style={{ color: '#4b5563', fontSize: 17, lineHeight: 1.65, margin: '0 0 32px', maxWidth: 500 }}>
          Gardens, lawns, and outdoor spaces that look amazing all year round. Trusted by 200+ Gold Coast families.
        </p>
        <button style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: 10, padding: '16px 36px', fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: 'inherit' }}>Get a Free Quote →</button>
      </div>

      {/* SERVICES */}
      <div style={{ background: '#fff', padding: '32px 52px', flexShrink: 0, flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { emoji: '🌿', title: 'Lawn & Turf', desc: 'Mowing, edging, turf supply & laying' },
            { emoji: '🌸', title: 'Garden Design', desc: 'Full design and planting service' },
            { emoji: '💧', title: 'Irrigation', desc: 'Automatic watering systems' },
          ].map(s => (
            <div key={s.title} style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 12, padding: '24px 20px' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>{s.emoji}</span>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#14532d', marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{ marginTop: 28, background: '#dcfce7', borderRadius: 10, padding: '16px 24px', display: 'flex', justifyContent: 'space-around' }}>
          {[
            { n: '200+', l: 'Happy clients' },
            { n: '4.8★', l: 'Google rating' },
            { n: '6yr', l: 'Est. 2018' },
          ].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#14532d' }}>{s.n}</div>
              <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
