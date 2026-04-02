/* Smith Construction — dark / bold / orange */
export default function SmithConstruction() {
  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#111111', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <div style={{ background: '#111111', padding: '0 52px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, background: '#ea580c', borderRadius: 6 }} />
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>Smith Construction</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Projects', 'Services', 'About'].map(l => (
            <span key={l} style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, fontWeight: 500 }}>{l}</span>
          ))}
          <button style={{ background: '#ea580c', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 26px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Contact</button>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: '#1a1a1a', padding: '52px 52px 44px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 50px)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(234,88,12,0.12)', border: '1px solid rgba(234,88,12,0.3)', borderRadius: 6, padding: '6px 14px', marginBottom: 28 }}>
          <span style={{ color: '#ea580c', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Brisbane · QLD</span>
        </div>

        <h1 style={{ color: '#fff', fontSize: 52, fontWeight: 900, lineHeight: 1.0, margin: '0 0 6px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Building Brisbane
        </h1>
        <h1 style={{ color: '#ea580c', fontSize: 52, fontWeight: 900, lineHeight: 1.05, margin: '0 0 22px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Since 2015.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.65, margin: '0 0 32px', maxWidth: 500 }}>
          Commercial & residential construction. On time. On budget. Built to last.
        </p>
        <div style={{ display: 'flex', gap: 14 }}>
          <button style={{ background: '#ea580c', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}>View Our Projects →</button>
          <button style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '14px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}>Call Us</button>
        </div>
      </div>

      {/* PROJECT CARDS */}
      <div style={{ background: '#111111', padding: '28px 52px', flex: 1 }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>Recent Projects</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: 'Riverside Apartment Renovation', type: 'Residential · West End', color: '#2a2a2a' },
            { title: 'Commercial Fit-Out', type: 'Commercial · Fortitude Valley', color: '#252525' },
          ].map(p => (
            <div key={p.title} style={{ background: p.color, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
              {/* Photo placeholder */}
              <div style={{ height: 130, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{p.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
