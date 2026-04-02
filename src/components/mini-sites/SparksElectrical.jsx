/* Sparks Electrical — dark navy / amber / blue */
export default function SparksElectrical() {
  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#060f1a', display: 'flex', flexDirection: 'column' }}>

      {/* NAV */}
      <div style={{ background: '#0d1b30', padding: '0 52px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#f59e0b', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d1b30" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 22, letterSpacing: '-0.025em' }}>Sparks Electrical</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {['Services', 'Areas', 'Reviews', 'About'].map(l => (
            <span key={l} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: 500 }}>{l}</span>
          ))}
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 26px', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Call Now</button>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2744 55%, #0d1b30 100%)', padding: '56px 52px 48px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        {/* Availability badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 999, padding: '6px 16px', marginBottom: 28 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Available 24/7 · Same Day Service</span>
        </div>

        {/* Headline */}
        <h1 style={{ color: '#fff', fontSize: 54, fontWeight: 900, lineHeight: 1.0, margin: '0 0 8px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Licensed Electricians
        </h1>
        <h1 style={{ color: '#3b82f6', fontSize: 54, fontWeight: 900, lineHeight: 1.05, margin: '0 0 22px', letterSpacing: '-0.035em', fontFamily: 'inherit' }}>
          Brisbane.
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.65, margin: '0 0 32px', maxWidth: 520 }}>
          Residential and commercial electrical work done right. Fast quotes, clean installs, no shortcuts.
        </p>

        <div style={{ display: 'flex', gap: 14, marginBottom: 32 }}>
          <button style={{ background: '#f59e0b', color: '#0d1b30', border: 'none', borderRadius: 10, padding: '16px 36px', fontWeight: 800, fontSize: 17, cursor: 'pointer', fontFamily: 'inherit' }}>Get a Free Quote →</button>
          <button style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 10, padding: '16px 36px', fontWeight: 600, fontSize: 17, cursor: 'pointer', fontFamily: 'inherit' }}>0414 758 891</button>
        </div>

        {/* Star rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: 20 }}>★</span>)}
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 600 }}>4.9</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>from 127 Google reviews</span>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div style={{ background: '#060f1a', padding: '32px 52px', flexShrink: 0, flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: 'Power Points', desc: 'Install & upgrade' },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Safety Switches', desc: 'Protect your family' },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>, title: 'LED Lighting', desc: 'Energy saving design' },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>, title: 'Solar & Storage', desc: 'Panels & batteries' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: '22px 20px' }}>
              <div style={{ marginBottom: 14 }}>{card.icon}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{card.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {['Licensed & Insured', '15+ Years Experience', 'Same Day Service', 'Free Quotes'].map((t, i, arr) => (
            <span key={t} style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 500 }}>
              {t}{i < arr.length - 1 && <span style={{ marginLeft: 32, color: 'rgba(255,255,255,0.15)' }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
