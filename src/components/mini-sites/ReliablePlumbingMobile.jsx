/* Reliable Plumbing — MOBILE layout (560×1000, portrait) */
export default function ReliablePlumbingMobile() {
  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#fff', display: 'flex', flexDirection: 'column' }}>

      {/* MOBILE NAV */}
      <div style={{ background: '#1d4ed8', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>Reliable Plumbing</span>
        <button style={{ background: '#fff', color: '#1d4ed8', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Call Now</button>
      </div>

      {/* MOBILE HERO */}
      <div style={{ background: '#eff6ff', padding: '32px 20px 28px', flexShrink: 0, textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#dbeafe', color: '#1d4ed8', borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
          Licensed · Brisbane · 24/7
        </div>
        <h1 style={{ color: '#0f172a', fontSize: 30, fontWeight: 900, lineHeight: 1.1, margin: '0 0 14px', letterSpacing: '-0.025em', fontFamily: 'inherit' }}>
          Plumbing done right.<br />
          <span style={{ color: '#1d4ed8' }}>First time.</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: '0 0 22px' }}>
          Fast, reliable. Licensed & insured.
        </p>
        <button style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 8, padding: '14px', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
          Get a Free Quote
        </button>
        <button style={{ background: '#fff', color: '#1d4ed8', border: '2px solid #1d4ed8', borderRadius: 8, padding: '12px', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', width: '100%', marginTop: 10 }}>
          Call 0414 758 891
        </button>
      </div>

      {/* MOBILE SERVICES */}
      <div style={{ padding: '24px 20px', flex: 1, background: '#fff' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Our Services</div>
        {['Blocked Drains', 'Leaking Taps', 'Hot Water', 'Gas Fitting', 'Emergency Repairs'].map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1d4ed8', flexShrink: 0 }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{s}</span>
            <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: 18 }}>›</span>
          </div>
        ))}
      </div>

      {/* TRUST */}
      <div style={{ background: '#eff6ff', padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flexShrink: 0 }}>
        {[{ n: '4.8★', l: 'Google' }, { n: '500+', l: 'Jobs done' }].map(s => (
          <div key={s.n} style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#1d4ed8' }}>{s.n}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
