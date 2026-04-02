import { useState } from 'react';
import { useInView } from '../hooks/useInView';

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-.45a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function ContactCard({ icon, label, value, href, sublabel, isVisible, delay }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 32,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <div style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 600,
        fontSize: 'var(--small)',
        color: 'var(--text-muted)',
        marginBottom: 6,
      }}>
        {label}
      </div>
      <a
        href={href}
        style={{
          display: 'block',
          fontFamily: 'Sora, sans-serif',
          fontWeight: 700,
          fontSize: 'var(--h3)',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          transition: 'color 0.25s ease',
          lineHeight: 1.2,
          wordBreak: 'break-all',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
      >
        {value}
      </a>
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'var(--small)',
        color: 'var(--text-muted)',
        marginTop: 8,
      }}>
        {sublabel}
      </div>
    </div>
  );
}

export default function Contact() {
  const [ref, isVisible] = useInView({ threshold: 0.05 });
  const [formRef, formVisible] = useInView({ threshold: 0.05 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const inputStyle = (focused) => ({
    width: '100%',
    border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: 8,
    padding: '14px 16px',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '1rem',
    color: 'var(--text-primary)',
    background: '#fff',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px var(--accent-light)' : 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    boxSizing: 'border-box',
  });

  return (
    <section
      id="contact"
      style={{
        background: 'var(--bg-primary)',
        padding: 'var(--section-padding) var(--content-padding)',
      }}
    >
      <div className="content-wrap">
        {/* Heading */}
        <div ref={ref}>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700,
            fontSize: 'var(--h2)',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            Let's talk.
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'var(--body)',
            color: 'var(--text-body)',
            maxWidth: 500,
            lineHeight: 1.6,
            marginBottom: 'clamp(2rem, 5vw, 3.5rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}>
            Give us a call or shoot us an email. No pressure, no jargon — just a straight conversation about what you need.
          </p>
        </div>

        {/* Contact cards */}
        <div className="contact-cards" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          marginBottom: 'clamp(2rem, 5vw, 3.5rem)',
        }}>
          <ContactCard
            icon={<PhoneIcon />}
            label="Call us"
            value="0414 758 891"
            href="tel:0414758891"
            sublabel="Mon–Fri, 8am–6pm"
            isVisible={isVisible}
            delay={0.15}
          />
          <ContactCard
            icon={<MailIcon />}
            label="Email us"
            value="enquiries@luxcoda.com"
            href="mailto:enquiries@luxcoda.com"
            sublabel="We'll reply within 24 hours"
            isVisible={isVisible}
            delay={0.25}
          />
        </div>

        {/* Form */}
        <div
          ref={formRef}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            Or send us a message:
          </p>

          <form
            onSubmit={e => e.preventDefault()}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                fontSize: 'var(--small)',
                color: 'var(--text-muted)',
                marginBottom: 6,
              }}>
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle(false)}
                onFocus={e => Object.assign(e.target.style, { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-light)' })}
                onBlur={e => Object.assign(e.target.style, { borderColor: 'var(--border)', boxShadow: 'none' })}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                fontSize: 'var(--small)',
                color: 'var(--text-muted)',
                marginBottom: 6,
              }}>
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle(false)}
                onFocus={e => Object.assign(e.target.style, { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-light)' })}
                onBlur={e => Object.assign(e.target.style, { borderColor: 'var(--border)', boxShadow: 'none' })}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                fontSize: 'var(--small)',
                color: 'var(--text-muted)',
                marginBottom: 6,
              }}>
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your business and what you're after..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle(false), resize: 'vertical', minHeight: 120 }}
                onFocus={e => Object.assign(e.target.style, { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-light)' })}
                onBlur={e => Object.assign(e.target.style, { borderColor: 'var(--border)', boxShadow: 'none' })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="submit"
                className="contact-submit-btn"
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '14px 32px',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Send Message
              </button>
            </div>
          </form>

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'var(--small)',
            color: 'var(--text-muted)',
            marginTop: '1.25rem',
          }}>
            Or find us on Instagram{' '}
            <a
              href="https://instagram.com/luxcoda"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', fontWeight: 500 }}
            >
              @luxcoda
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contact-cards { grid-template-columns: 1fr !important; }
          .contact-submit-btn { width: 100%; }
        }
      `}</style>
    </section>
  );
}
