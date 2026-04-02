export default function PhoneMockup({ children, style = {} }) {
  return (
    <div style={{
      display: 'inline-block',
      background: '#1a1a1a',
      borderRadius: '2.25rem',
      padding: '12px 5px 10px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      width: '100%',
      maxWidth: 280,
      ...style,
    }}>
      {/* Dynamic island */}
      <div style={{
        width: '34%',
        height: 14,
        background: '#0a0a0a',
        borderRadius: 999,
        margin: '0 auto 4px',
      }} />
      {/* Screen */}
      <div style={{
        background: '#fff',
        borderRadius: '1.75rem',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '9/19.5',
      }}>
        {/* Status bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 14px 2px',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          zIndex: 10,
          fontSize: 9,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: 600,
          color: '#111',
        }}>
          <span>9:41</span>
          <svg width="40" height="10" viewBox="0 0 40 10" fill="#111">
            <rect x="0" y="5" width="3" height="5" rx="0.5"/>
            <rect x="5" y="3" width="3" height="7" rx="0.5"/>
            <rect x="10" y="1" width="3" height="9" rx="0.5"/>
            <rect x="18" y="2" width="6" height="6" rx="1" fill="none" stroke="#111" strokeWidth="1"/>
            <rect x="24" y="4" width="2" height="2" rx="0.5"/>
            <rect x="19" y="3" width="4" height="4" rx="0.5"/>
            <rect x="30" y="1" width="8" height="7" rx="1.5" fill="none" stroke="#111" strokeWidth="1"/>
            <rect x="31.5" y="2.5" width="5" height="4" rx="0.5"/>
            <rect x="38.5" y="3" width="1.5" height="3" rx="0.5"/>
          </svg>
        </div>
        {/* Content */}
        <div style={{ paddingTop: 20, height: '100%', overflow: 'hidden' }}>
          {children}
        </div>
        {/* Home indicator */}
        <div style={{
          position: 'absolute',
          bottom: 6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 4,
          background: '#1a1a1a',
          borderRadius: 2,
          opacity: 0.25,
        }} />
      </div>
    </div>
  );
}
