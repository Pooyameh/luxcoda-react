/* ProPaint Brisbane — clean white / teal */
export default function ProPaintBrisbane() {
  const swatchColors = ['#f8f5f0', '#1e293b', '#6b8f6b', '#c45a2d', '#374151', '#7dd3fc'];

  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#fff', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <div style={{ background: '#fff', padding: '0 52px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#0891b2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎨</div>
          <span style={{ color: '#0c4a6e', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>ProPaint Brisbane</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Interior', 'Exterior', 'Commercial'].map(l => (
            <span key={l} style={{ color: '#64748b', fontSize: 15, fontWeight: 500 }}>{l}</span>
          ))}
          <button style={{ background: '#0891b2', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 26px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Get a Quote</button>
        </div>
      </div>

      {/* HERO — centered */}
      <div style={{ background: '#fff', padding: '56px 52px 36px', textAlign: 'center', flexShrink: 0 }}>
        <div style={{ display: 'inline-block', background: '#ecfeff', color: '#0891b2', borderRadius: 999, padding: '5px 18px', fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
          Brisbane's Professional Painters
        </div>
        <h1 style={{ color: '#0c4a6e', fontSize: 50, fontWeight: 900, lineHeight: 1.0, margin: '0 0 8px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Brisbane's
        </h1>
        <h1 style={{ color: '#0c4a6e', fontSize: 50, fontWeight: 900, lineHeight: 1.0, margin: '0 0 8px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Professional
        </h1>
        <h1 style={{ color: '#0891b2', fontSize: 50, fontWeight: 900, lineHeight: 1.05, margin: '0 0 22px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Painters.
        </h1>
        <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.65, margin: '0 auto 28px', maxWidth: 480 }}>
          Interior & exterior painting for homes and businesses. Clean lines. Quality finish. Guaranteed.
        </p>
        <button style={{ background: '#0891b2', color: '#fff', border: 'none', borderRadius: 8, padding: '16px 44px', fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-block' }}>Get a Free Quote</button>

        {/* Color swatches */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}>
          {swatchColors.map((c, i) => (
            <div key={i} style={{
              width: 36, height: 36,
              borderRadius: '50%',
              background: c,
              border: '2px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }} />
          ))}
        </div>
      </div>

      {/* WHY US */}
      <div style={{ background: '#f8fafc', padding: '28px 52px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { icon: '📋', title: 'Free Quotes', desc: 'No obligation — just honest advice' },
            { icon: '🛡️', title: 'Fully Insured', desc: 'Public liability & warranty included' },
            { icon: '⭐', title: '10yr Guarantee', desc: 'We stand behind our work' },
          ].map(f => (
            <div key={f.title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '22px 18px', textAlign: 'center' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{f.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#0c4a6e', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
