export default function Footer() {
  return (
    <footer style={{
      background: 'var(--text-primary)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '40px var(--content-padding)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <span style={{
          fontFamily: 'Sora, sans-serif',
          fontWeight: 700,
          fontSize: 'var(--small)',
          color: 'var(--bg-primary)',
          letterSpacing: '0.05em',
        }}>
          Luxcoda
        </span>
        <span style={{
          fontFamily: 'Sora, sans-serif',
          fontWeight: 500,
          fontSize: 'var(--small)',
          color: 'rgba(245, 243, 240, 0.45)',
        }}>
          © 2026 · Brisbane, Australia
        </span>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div {
            flex-direction: column !important;
            text-align: center;
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
