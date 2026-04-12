export default function ShowcaseStrip() {
  const items = [
    'Sites built in 24 hours',
    'You own the code',
    'No lock-in contracts',
    'From $499',
  ];

  return (
    <section style={{
      padding: '32px var(--content-padding)',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.8rem',
        fontWeight: 500,
        letterSpacing: '0.06em',
        color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.8,
        margin: 0,
      }}>
        {items.map((item, i) => (
          <span key={item}>
            {item}
            {i < items.length - 1 && (
              <span style={{ color: '#c8a052', margin: '0 0.6em' }}>·</span>
            )}
          </span>
        ))}
      </p>
    </section>
  );
}
