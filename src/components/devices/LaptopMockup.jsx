export default function LaptopMockup({ children, style = {} }) {
  return (
    <div style={{
      display: 'inline-block',
      width: '100%',
      ...style,
    }}>
      {/* Laptop body */}
      <div style={{
        background: '#1a1816',
        borderRadius: '12px 12px 0 0',
        padding: '8px 8px 0 8px',
        boxShadow: 'var(--shadow-lg)',
      }}>
        {/* Browser chrome bar */}
        <div style={{
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          paddingLeft: '10px',
          paddingRight: '10px',
          marginBottom: '0',
        }}>
          {/* Traffic lights */}
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
          {/* URL bar */}
          <div style={{
            flex: 1,
            maxWidth: '40%',
            margin: '0 auto',
            height: '14px',
            background: '#2a2826',
            borderRadius: '7px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }} />
        </div>

        {/* Screen */}
        <div style={{
          background: '#ffffff',
          aspectRatio: '16 / 10',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {children}
        </div>
      </div>

      {/* Laptop base / chin */}
      <div style={{
        background: '#141210',
        height: '14px',
        borderRadius: '0 0 4px 4px',
        position: 'relative',
      }}>
        {/* Hinge line */}
        <div style={{
          position: 'absolute',
          top: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30%',
          height: '3px',
          background: '#0e0d0c',
          borderRadius: '2px',
        }} />
      </div>
    </div>
  );
}
