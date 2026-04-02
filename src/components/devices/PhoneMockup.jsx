export default function PhoneMockup({ children, style = {} }) {
  return (
    <div style={{
      display: 'inline-block',
      background: '#1a1816',
      borderRadius: '2.5rem',
      padding: '12px 5px 10px 5px',
      boxShadow: 'var(--shadow-lg)',
      width: '100%',
      maxWidth: '280px',
      ...style,
    }}>
      {/* Dynamic island */}
      <div style={{
        width: '35%',
        height: '14px',
        background: '#1a1816',
        borderRadius: '999px',
        margin: '0 auto 4px auto',
        position: 'relative',
        zIndex: 2,
      }} />

      {/* Screen */}
      <div style={{
        background: '#ffffff',
        borderRadius: '1.75rem',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '9 / 19.5',
      }}>
        {/* Status bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 14px 4px',
          fontSize: '9px',
          fontFamily: 'Sora, sans-serif',
          fontWeight: 600,
          color: '#1a1816',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {/* Signal */}
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <rect x="0" y="5" width="2" height="3" rx="0.5" fill="#1a1816"/>
              <rect x="3" y="3" width="2" height="5" rx="0.5" fill="#1a1816"/>
              <rect x="6" y="1" width="2" height="7" rx="0.5" fill="#1a1816"/>
              <rect x="9" y="0" width="2" height="8" rx="0.5" fill="#1a1816"/>
            </svg>
            {/* Wifi */}
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M5 6.5a1 1 0 110 2 1 1 0 010-2z" fill="#1a1816"/>
              <path d="M2.5 4.5C3.2 3.8 4.05 3.5 5 3.5s1.8.3 2.5 1" stroke="#1a1816" strokeWidth="1" strokeLinecap="round"/>
              <path d="M.5 2.5C1.9 1.1 3.35.5 5 .5s3.1.6 4.5 2" stroke="#1a1816" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            {/* Battery */}
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <rect x="0.5" y="0.5" width="11" height="7" rx="1.5" stroke="#1a1816"/>
              <rect x="1.5" y="1.5" width="8" height="5" rx="1" fill="#1a1816"/>
              <path d="M12.5 3v2" stroke="#1a1816" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ paddingTop: '22px', height: '100%', overflow: 'hidden' }}>
          {children}
        </div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '4px',
          background: '#1a1816',
          borderRadius: '2px',
          opacity: 0.3,
        }} />
      </div>
    </div>
  );
}
