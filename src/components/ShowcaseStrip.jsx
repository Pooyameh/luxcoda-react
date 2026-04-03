const desktopVideos = [
  { src: '/showcase/accordion.mp4', label: 'Accordion Gallery' },
  { src: '/showcase/reveal.mp4',    label: 'Mask Reveal' },
  { src: '/showcase/parallax.mp4',  label: 'Parallax Depth' },
  { src: '/showcase/magnetic.mp4',  label: 'Magnetic Cursor' },
  { src: '/showcase/compare.mp4',   label: 'Before / After Slider' },
];

// Render the full set twice for a seamless CSS marquee loop.
// Each video element is independent — no cloning of DOM nodes.
const allCards = [...desktopVideos, ...desktopVideos];

function VideoCard({ src, label }) {
  return (
    <div style={{
      width: 400,
      flexShrink: 0,
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.06)',
      aspectRatio: '16/9',
      position: 'relative',
    }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        ref={(el) => {
          if (el) {
            el.play().catch(() => {});
            el.addEventListener('ended', () => { el.currentTime = 0; el.play().catch(() => {}); });
          }
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '28px 16px 14px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.04em',
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default function ShowcaseStrip() {
  return (
    <section style={{
      padding: '0 0 clamp(40px, 6vh, 60px)',
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    }}>
      <div className="marquee-track" style={{ gap: 20, paddingLeft: 20 }}>
        {allCards.map((v, i) => (
          <VideoCard key={i} src={v.src} label={v.label} />
        ))}
      </div>
    </section>
  );
}
