import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GLASS = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
};

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-.45a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.contact-anim'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: '16px 18px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '1rem',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxSizing: 'border-box',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgba(74,144,184,0.4)';
    e.target.style.boxShadow = '0 0 0 3px rgba(74,144,184,0.1)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 500,
    fontSize: 'var(--small-size)',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
  };

  return (
    <section id="contact" ref={sectionRef} style={{
      background: 'var(--bg-primary)',
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap" style={{ maxWidth: 800 }}>
        {/* Heading */}
        <div className="contact-anim" style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            Let's talk.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Give us a call or shoot us an email. No pressure, no jargon — just a straight conversation about what you need.
          </p>
        </div>

        {/* Contact cards */}
        <div className="contact-cards contact-anim" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          {/* Phone */}
          <div style={{ ...GLASS, padding: 32 }}>
            <div style={{ marginBottom: 16 }}><PhoneIcon /></div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 'var(--small-size)', color: 'var(--text-muted)', marginBottom: 8 }}>Call us</div>
            <a href="tel:0414758891" style={{
              display: 'block',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'var(--h3-size)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 10,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              0414 758 891
            </a>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>Mon–Fri, 8am–6pm</div>
          </div>

          {/* Email */}
          <div style={{ ...GLASS, padding: 32 }}>
            <div style={{ marginBottom: 16 }}><MailIcon /></div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 'var(--small-size)', color: 'var(--text-muted)', marginBottom: 8 }}>Email us</div>
            <a href="mailto:enquiries@luxcoda.com" style={{
              display: 'block',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 10,
              wordBreak: 'break-all',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              enquiries@luxcoda.com
            </a>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>We reply within 24 hours</div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-anim" style={{ ...GLASS, padding: 'clamp(28px, 5vw, 44px)' }}>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about your business and what you're after..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              {/* Social links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>
                  Find us on
                </span>
                <a
                  href="https://instagram.com/luxcoda"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://facebook.com/luxcoda"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>

              <button
                type="submit"
                className="contact-btn"
                style={{
                  background: '#ffffff',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: 100,
                  padding: '14px 32px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); opacity: 1; }
        @media (max-width: 640px) {
          .contact-cards { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .contact-btn { width: 100%; text-align: center; }
        }
      `}</style>
    </section>
  );
}
