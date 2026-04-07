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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SESSION_KEY = 'luxcoda_submitted';

export default function Contact() {
  const sectionRef = useRef(null);

  // Form fields
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // React-side honeypot

  // Validation errors
  const [errors, setErrors] = useState({});

  // Submission state — initialise from sessionStorage so refresh doesn't re-enable form
  const [submitted, setSubmitted]     = useState(() => !!sessionStorage.getItem(SESSION_KEY));
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting]   = useState(false);

  // In-memory rate limiting (belt-and-suspenders on top of sessionStorage)
  const [mountTime]                          = useState(Date.now);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.contact-anim'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function validate() {
    const e = {};

    // Name — required, 2–100 chars
    const n = name.trim();
    if (!n || n.length < 2)  e.name = 'Please enter your name (at least 2 characters).';
    else if (n.length > 100) e.name = 'Name is too long.';

    // Phone — required, digits only, at least 8 digits
    const digits = phone.replace(/\D/g, '');
    if (!phone.trim())         e.phone = 'Please enter your phone number.';
    else if (digits.length < 8) e.phone = 'Phone number must be at least 8 digits.';

    // Email — optional, but must be valid if provided
    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      e.email = 'Please enter a valid email address.';
    }

    // Message — required, 10–2000 chars
    const m = message.trim();
    if (!m || m.length < 10)    e.message = 'Message must be at least 10 characters.';
    else if (m.length > 2000)   e.message = 'Message is too long (max 2000 characters).';

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 1. React honeypot — silent fake success
    if (honeypot) { markSubmitted(); return; }

    // 2. Timing check — submitted too fast for a human
    if (Date.now() - mountTime < 3000) { markSubmitted(); return; }

    // 3. Cooldown — 60s between submissions
    if (lastSubmitTime && Date.now() - lastSubmitTime < 60000) {
      setSubmitError('Please wait a moment before sending another message.');
      return;
    }

    // 4. Client-side validation
    if (!validate()) return;

    // 5. Submit to Netlify
    setSubmitting(true);
    setSubmitError('');

    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        'bot-field': '',
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setLastSubmitTime(Date.now());
      markSubmitted();
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  function markSubmitted() {
    sessionStorage.setItem(SESSION_KEY, '1');
    setSubmitted(true);
  }

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

  const handleFocus = (ev) => {
    ev.target.style.borderColor = 'rgba(74,144,184,0.4)';
    ev.target.style.boxShadow = '0 0 0 3px rgba(74,144,184,0.1)';
  };
  const handleBlur = (ev) => {
    ev.target.style.borderColor = 'rgba(255,255,255,0.08)';
    ev.target.style.boxShadow = 'none';
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 500,
    fontSize: 'var(--small-size)',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
  };

  const fieldErrorStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 12,
    color: 'rgba(255,100,100,0.75)',
    marginTop: 6,
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
            Let's build.
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

        {/* Form card */}
        <div className="contact-anim" style={{ ...GLASS, padding: 'clamp(28px, 5vw, 44px)' }}>
          {submitted ? (
            /* Thank-you panel */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 'clamp(32px, 6vw, 56px) 24px',
              gap: 16,
            }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: '50%',
                background: 'rgba(74,184,140,0.12)',
                border: '1px solid rgba(74,184,140,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
                marginBottom: 8,
              }}>
                ✓
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}>
                Message received.
              </h3>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'var(--body-size)',
                color: 'var(--text-secondary)',
                maxWidth: 380,
                lineHeight: 1.6,
              }}>
                Thanks, we'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            /* The form */
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              data-netlify-recaptcha="true"
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {/* Netlify hidden fields */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              {/* React-side honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Row 1: Name + Phone */}
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Name <span style={{ color: 'rgba(255,100,100,0.6)' }}>*</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ ...inputStyle, borderColor: errors.name ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.name && <p style={fieldErrorStyle}>{errors.name}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Phone <span style={{ color: 'rgba(255,100,100,0.6)' }}>*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="04xx xxx xxx"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ ...inputStyle, borderColor: errors.phone ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  {errors.phone && <p style={fieldErrorStyle}>{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Email (optional) */}
              <div>
                <label style={labelStyle}>Email <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>optional</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ ...inputStyle, borderColor: errors.email ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.email && <p style={fieldErrorStyle}>{errors.email}</p>}
              </div>

              {/* Row 3: Message */}
              <div>
                <label style={labelStyle}>Message <span style={{ color: 'rgba(255,100,100,0.6)' }}>*</span></label>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="Tell us about your business and what you're after..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: 120,
                    borderColor: errors.message ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.message && <p style={fieldErrorStyle}>{errors.message}</p>}
              </div>

              {/* Submit row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
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
                  disabled={submitting}
                  style={{
                    background: submitting ? 'rgba(255,255,255,0.6)' : '#ffffff',
                    color: '#0a0a0a',
                    border: 'none',
                    borderRadius: 100,
                    padding: '14px 32px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '1rem',
                    cursor: submitting ? 'default' : 'pointer',
                    transition: 'background 0.25s ease',
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = submitting ? 'rgba(255,255,255,0.6)' : '#ffffff'; }}
                >
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </div>

              {/* Network / rate-limit error */}
              {submitError && (
                <div style={{
                  padding: '14px 20px',
                  background: 'rgba(255,80,80,0.06)',
                  border: '1px solid rgba(255,80,80,0.12)',
                  borderRadius: 12,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  color: 'rgba(255,120,120,0.85)',
                  textAlign: 'center',
                }}>
                  {submitError}
                </div>
              )}
            </form>
          )}
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
