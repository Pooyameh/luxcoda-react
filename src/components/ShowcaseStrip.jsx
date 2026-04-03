const videos = [
  { src: '/showcase/accordion.mp4', label: 'Accordion Gallery' },
  { src: '/showcase/parallax.mp4',  label: 'Parallax Depth' },
  { src: '/showcase/product.mp4',   label: '3D Product View' },
];

// Duplicate for seamless loop
const allVideos = [...videos, ...videos];

function VideoCard({ src, label }) {
  return (
    <div style={{
      width: 380,
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
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '24px 16px 14px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.55)',
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
      padding: 'clamp(40px, 6vh, 60px) 0',
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    }}>
      <div
        className="marquee-track"
        style={{ gap: 20, paddingLeft: 20 }}
      >
        {allVideos.map((v, i) => (
          <VideoCard key={i} src={v.src} label={v.label} />
        ))}
      </div>
    </section>
  );
}
