/* AutoCare Mechanics — dark / red */
export default function AutoCareMechanics() {
  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#0d0d0d', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <div style={{ background: '#111111', padding: '0 52px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#dc2626', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 000 12c0 2.76 1.12 5.26 2.93 7.07"/><path d="M4.93 4.93A10 10 0 0124 12c0 2.76-1.12 5.26-2.93 7.07"/></svg>
          </div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>AutoCare Mechanics</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {['Services', 'Booking', 'Reviews'].map(l => (
            <span key={l} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, fontWeight: 500 }}>{l}</span>
          ))}
          <button style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 26px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Book Now</button>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: '#111111', padding: '52px 52px 40px', flexShrink: 0, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(220,38,38,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-block', background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 6, padding: '5px 14px', marginBottom: 28 }}>
          <span style={{ color: '#dc2626', fontSize: 13, fontWeight: 700 }}>South Brisbane · Open 6 Days</span>
        </div>

        <h1 style={{ color: '#fff', fontSize: 52, fontWeight: 900, lineHeight: 1.0, margin: '0 0 6px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>Your Car.</h1>
        <h1 style={{ color: '#dc2626', fontSize: 52, fontWeight: 900, lineHeight: 1.05, margin: '0 0 22px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>Our Priority.</h1>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.65, margin: '0 0 32px', maxWidth: 500 }}>
          Full-service mechanics in South Brisbane. Honest pricing. No surprises.
        </p>

        <button style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '15px 36px', fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: 'inherit' }}>Book a Service →</button>
      </div>

      {/* SERVICE PILLS */}
      <div style={{ background: '#0d0d0d', padding: '24px 52px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {['Logbook Service', 'Brake Repair', 'Tyre Fitting', 'Air Conditioning', 'Diagnostics', 'Roadworthy'].map(s => (
            <div key={s} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '8px 18px', fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW */}
      <div style={{ background: '#111111', margin: '0 52px 0', padding: '22px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
          {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: 18 }}>★</span>)}
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginLeft: 8, alignSelf: 'center' }}>89 Google reviews</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
          "Best mechanic in Brisbane. Honest, fast, and fair pricing. Won't take my car anywhere else."
        </p>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 10 }}>— Marcus T., Woolloongabba</div>
      </div>
    </div>
  );
}
