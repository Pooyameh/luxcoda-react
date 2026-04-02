import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-.45a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
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
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '14px 16px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '1rem',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--accent)';
    e.target.style.boxShadow = '0 0 0 3px var(--accent-subtle)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--border)';
    e.target.style.boxShadow = 'none';
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
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 32,
          }}>
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
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              0414 758 891
            </a>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>Mon–Fri, 8am–6pm</div>
          </div>

          {/* Email */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 32,
          }}>
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
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              enquiries@luxcoda.com
            </a>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'var(--small-size)', color: 'var(--text-muted)' }}>We reply within 24 hours</div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-anim" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 'clamp(24px, 5vw, 40px)',
        }}>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map(field => (
              <div key={field.key}>
                <label style={{
                  display: 'block',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 'var(--small-size)',
                  color: 'var(--text-muted)',
                  marginBottom: 8,
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  style={{ ...inputStyle, '::placeholder': { color: 'var(--text-muted)' } }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            ))}
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 500,
                fontSize: 'var(--small-size)',
                color: 'var(--text-muted)',
                marginBottom: 8,
              }}>
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your business and what you're after..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                className="contact-btn"
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 100,
                  padding: '14px 36px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent-hover)';
                  e.currentTarget.style.boxShadow = '0 0 28px var(--accent-glow)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Send Message
              </button>
            </div>
          </form>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--small-size)',
            color: 'var(--text-muted)',
            marginTop: '1.5rem',
            textAlign: 'center',
          }}>
            Or find us on{' '}
            <a href="https://instagram.com/luxcoda" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--accent)', fontWeight: 500 }}>
              Instagram @luxcoda
            </a>
            {' · '}
            <a href="https://facebook.com/luxcoda" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--accent)', fontWeight: 500 }}>
              Facebook
            </a>
          </p>
        </div>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: var(--text-muted); opacity: 1; }
        @media (max-width: 640px) {
          .contact-cards { grid-template-columns: 1fr !important; }
          .contact-btn { width: 100%; }
        }
      `}</style>
    </section>
  );
}
