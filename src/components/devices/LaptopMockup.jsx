export default function LaptopMockup({ children, style = {} }) {
  return (
    <div style={{ display: 'inline-block', width: '100%', ...style }}>
      {/* Laptop frame */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '12px 12px 0 0',
        padding: '8px 8px 0 8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Browser chrome */}
        <div style={{
          height: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
          <div style={{
            flex: 1,
            height: 14,
            background: '#2a2a2a',
            borderRadius: 7,
            maxWidth: '45%',
            margin: '0 auto',
          }} />
        </div>
        {/* Screen */}
        <div style={{
          background: '#fff',
          aspectRatio: '16/10',
          borderRadius: '2px 2px 0 0',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {children}
        </div>
      </div>
      {/* Chin/base */}
      <div style={{
        background: '#141414',
        height: 14,
        borderRadius: '0 0 6px 6px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '28%',
          height: 3,
          background: '#0e0e0e',
          borderRadius: 2,
        }} />
      </div>
    </div>
  );
}
