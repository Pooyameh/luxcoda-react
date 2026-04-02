import { useState } from 'react';

export default function ScreenCard({
  children,
  aspectRatio = '16/10',
  onClick,
  style = {},
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
        aspectRatio,
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: hovered ? '0 0 40px rgba(196,90,45,0.08)' : '0 0 0 transparent',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
