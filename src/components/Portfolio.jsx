import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    name: "Maddison's Florist",
    category: 'Retail & E-Commerce',
    location: 'Brisbane CBD',
    gradient: 'linear-gradient(135deg, #f9a8d4 0%, #e879f9 40%, #a855f7 100%)',
    accent: '#f9a8d4',
    tags: ['E-Commerce', 'Booking System'],
    blocks: [
      { w: '60%', h: 14, top: 22, left: 20, opacity: 0.9 },
      { w: '40%', h: 10, top: 44, left: 20, opacity: 0.6 },
      { w: '28%', h: 28, top: 64, left: 20, opacity: 0.5, radius: 6 },
      { w: '28%', h: 28, top: 64, left: 56, opacity: 0.5, radius: 6 },
    ],
  },
  {
    name: 'Peak Performance',
    category: 'Health & Fitness',
    location: 'Fortitude Valley',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 60%, #e94560 100%)',
    accent: '#e94560',
    tags: ['Gym Website', 'Class Bookings'],
    blocks: [
      { w: '80%', h: 18, top: 18, left: 10, opacity: 0.8 },
      { w: '50%', h: 10, top: 44, left: 10, opacity: 0.5 },
      { w: '35%', h: 34, top: 62, left: 10, opacity: 0.4, radius: 4 },
      { w: '35%', h: 34, top: 62, left: 52, opacity: 0.4, radius: 4 },
    ],
  },
  {
    name: 'The Wine Room',
    category: 'Hospitality',
    location: 'New Farm',
    gradient: 'linear-gradient(135deg, #2d0a1f 0%, #6b2137 50%, #c9963e 100%)',
    accent: '#c9963e',
    tags: ['Restaurant', 'Reservations'],
    blocks: [
      { w: '55%', h: 16, top: 20, left: 22, opacity: 0.9 },
      { w: '45%', h: 10, top: 44, left: 27, opacity: 0.55 },
      { w: '60%', h: 3, top: 62, left: 20, opacity: 0.35 },
      { w: '50%', h: 3, top: 70, left: 25, opacity: 0.25 },
    ],
  },
  {
    name: 'Dr. Sarah Chen',
    category: 'Healthcare',
    location: 'Chermside',
    gradient: 'linear-gradient(135deg, #0a2a3a 0%, #0d4f6e 50%, #2dd4bf 100%)',
    accent: '#2dd4bf',
    tags: ['Medical', 'Online Bookings'],
    blocks: [
      { w: '65%', h: 14, top: 22, left: 17, opacity: 0.85 },
      { w: '50%', h: 10, top: 42, left: 25, opacity: 0.55 },
      { w: '30%', h: 30, top: 60, left: 12, opacity: 0.45, radius: 8 },
      { w: '30%', h: 30, top: 60, left: 58, opacity: 0.45, radius: 8 },
    ],
  },
  {
    name: 'Harbour View Realty',
    category: 'Real Estate',
    location: 'Hamilton',
    gradient: 'linear-gradient(135deg, #0a0a20 0%, #1a2850 50%, #c9a84c 100%)',
    accent: '#c9a84c',
    tags: ['Real Estate', 'Property Listings'],
    blocks: [
      { w: '70%', h: 16, top: 18, left: 15, opacity: 0.9 },
      { w: '45%', h: 10, top: 42, left: 27, opacity: 0.5 },
      { w: '25%', h: 36, top: 60, left: 8, opacity: 0.4, radius: 6 },
      { w: '25%', h: 36, top: 60, left: 38, opacity: 0.4, radius: 6 },
      { w: '25%', h: 36, top: 60, left: 68, opacity: 0.4, radius: 6 },
    ],
  },
  {
    name: 'Craft Coffee Co.',
    category: 'Café & Retail',
    location: 'South Bank',
    gradient: 'linear-gradient(135deg, #1a0f08 0%, #3d1f0d 40%, #8b5a2b 70%, #d4a064 100%)',
    accent: '#d4a064',
    tags: ['Café', 'Online Store'],
    blocks: [
      { w: '60%', h: 14, top: 22, left: 20, opacity: 0.85 },
      { w: '40%', h: 10, top: 42, left: 30, opacity: 0.55 },
      { w: '80%', h: 24, top: 62, left: 10, opacity: 0.35, radius: 6 },
    ],
  },
]

export default function Portfolio() {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [isDragging, setIsDragging] = useState(false)

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0a0a1a',
        padding: '100px 0',
        overflow: 'hidden',
      }}
    >
      {/* Orb */}
      <div className="orb" style={{
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 65%)',
        top: '30%',
        left: '60%',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', marginBottom: 52 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ display: 'inline-block', width: 32, height: 2, background: 'linear-gradient(90deg, #5eaeff, #a855f7)' }} />
            <span className="section-label">Our Work</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: '#f0f0ff', margin: 0 }}>
              Built for{' '}
              <span style={{ background: 'linear-gradient(135deg, #5eaeff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Brisbane
              </span>
            </h2>
            <p style={{ color: 'rgba(240,240,255,0.45)', fontFamily: "'Syne', sans-serif", fontSize: '0.82rem', letterSpacing: '0.06em', margin: 0 }}>
              ← Drag to explore →
            </p>
          </div>
        </motion.div>
      </div>

      {/* Draggable carousel */}
      <div style={{ overflow: 'hidden', paddingLeft: 24, paddingRight: 24 }}>
        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={{ right: 0, left: -(projects.length * 340 - (typeof window !== 'undefined' ? window.innerWidth - 48 : 1200)) }}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="portfolio-drag"
          style={{
            display: 'flex',
            gap: 20,
            width: 'max-content',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isInView={isInView} isDragging={isDragging} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isInView, isDragging }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => !isDragging && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        width: 320,
        flexShrink: 0,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.07)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Mockup visual */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 220,
          background: project.gradient,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Browser chrome */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 28,
          background: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 6,
        }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
          ))}
          <div style={{
            marginLeft: 10,
            flex: 1,
            height: 14,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 4,
            maxWidth: 160,
          }} />
        </div>

        {/* Fake website content blocks */}
        {project.blocks.map((b, bi) => (
          <div
            key={bi}
            style={{
              position: 'absolute',
              width: `${b.w}`,
              height: b.h,
              top: `${b.top}%`,
              left: `${b.left}%`,
              background: `rgba(255,255,255,${b.opacity})`,
              borderRadius: b.radius || 3,
            }}
          />
        ))}

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,26,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '10px 22px',
              borderRadius: 8,
              border: `1px solid ${project.accent}`,
              color: project.accent,
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
            }}
          >
            VIEW PROJECT
          </div>
        </motion.div>
      </motion.div>

      {/* Card info */}
      <div style={{
        padding: '20px 22px',
        background: '#0f0f24',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#f0f0ff', margin: 0 }}>
            {project.name}
          </h3>
          <span style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: '0.72rem',
            color: 'rgba(240,240,255,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4,
            padding: '2px 8px',
            whiteSpace: 'nowrap',
            marginLeft: 8,
          }}>
            {project.location}
          </span>
        </div>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.82rem', color: 'rgba(240,240,255,0.5)', margin: '0 0 12px' }}>
          {project.category}
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {project.tags.map((tag, ti) => (
            <span
              key={ti}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: project.accent,
                background: `${project.accent}15`,
                border: `1px solid ${project.accent}30`,
                borderRadius: 4,
                padding: '3px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
