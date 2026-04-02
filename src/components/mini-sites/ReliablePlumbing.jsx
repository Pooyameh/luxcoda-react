/* Reliable Plumbing — clean white / navy / blue */
export default function ReliablePlumbing() {
  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#fff', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <div style={{ background: '#fff', padding: '0 52px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#1d4ed8', borderRadius: 8 }} />
          <span style={{ color: '#0f172a', fontWeight: 800, fontSize: 20, letterSpacing: '-0.025em' }}>Reliable Plumbing Co.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Services', 'About', 'Contact'].map(l => (
            <span key={l} style={{ color: '#64748b', fontSize: 15, fontWeight: 500 }}>{l}</span>
          ))}
          <button style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 26px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Call Now</button>
        </div>
      </div>

      {/* HERO — split layout */}
      <div style={{ background: '#fff', padding: '52px 52px 44px', display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 52, alignItems: 'center', flexShrink: 0 }}>
        {/* Left: copy */}
        <div>
          <div style={{ display: 'inline-block', background: '#eff6ff', color: '#1d4ed8', borderRadius: 999, padding: '5px 16px', fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
            Brisbane · Licensed & Insured · 24/7
          </div>
          <h1 style={{ color: '#0f172a', fontSize: 46, fontWeight: 900, lineHeight: 1.05, margin: '0 0 18px', letterSpacing: '-0.03em', fontFamily: 'inherit' }}>
            No leaks.<br />No drama.<br />
            <span style={{ color: '#1d4ed8' }}>Done right.</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.7, margin: '0 0 28px', maxWidth: 420 }}>
            Fast, reliable plumbing for homes and businesses across Brisbane. Licensed, insured, on time.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 30px', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}>Book a Plumber →</button>
            <button style={{ background: '#fff', color: '#1d4ed8', border: '2px solid #1d4ed8', borderRadius: 8, padding: '14px 30px', fontWeight: 600, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}>0414 758 891</button>
          </div>
        </div>

        {/* Right: stacked service cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { color: '#1d4ed8', icon: '🔧', name: 'Blocked Drains', note: 'Same-day clearing' },
            { color: '#0891b2', icon: '💧', name: 'Leaking Taps', note: 'Fast affordable fix' },
            { color: '#0369a1', icon: '🔥', name: 'Hot Water Systems', note: 'All brands & types' },
            { color: '#7c3aed', icon: '⚡', name: 'Emergency Callouts', note: '24/7 available' },
          ].map(s => (
            <div key={s.name} style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderLeft: `4px solid ${s.color}`,
              borderRadius: '0 10px 10px 0',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST ROW */}
      <div style={{ background: '#eff6ff', padding: '18px 52px', display: 'flex', justifyContent: 'space-around', flexShrink: 0 }}>
        {[
          { icon: '✓', text: '4.8★ Google Rating' },
          { icon: '✓', text: '500+ Jobs Completed' },
          { icon: '✓', text: 'Same Day Available' },
          { icon: '✓', text: 'Upfront Pricing' },
        ].map(b => (
          <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#1d4ed8', fontWeight: 800, fontSize: 16 }}>{b.icon}</span>
            <span style={{ color: '#1e3a5f', fontSize: 14, fontWeight: 600 }}>{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
