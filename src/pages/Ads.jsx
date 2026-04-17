import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Scene3D from '../components/Scene3D';

const GLASS = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function scrollToContact(e) {
  e.preventDefault();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Section heading ── */
function SectionHead({ eyebrow, h2, sub, maxWidth = 560 }) {
  return (
    <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
      {eyebrow && (
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: 'var(--h2-size)',
        color: 'var(--text-primary)',
        letterSpacing: 'var(--h2-spacing)',
        lineHeight: 'var(--h2-line-height)',
        marginBottom: sub ? '0.75rem' : 0,
      }}>
        {h2}
      </h2>
      {sub && (
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'var(--body-size)',
          color: 'var(--text-secondary)',
          maxWidth,
          margin: '0 auto',
          lineHeight: 1.65,
        }}>
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* ── Section 1 — Hero ── */
function AdsHero() {
  return (
    <section style={{
      padding: 'clamp(100px, 14vh, 160px) var(--content-padding) clamp(80px, 10vh, 120px)',
      textAlign: 'center',
    }}>
      <div className="content-wrap">
        <motion.p
          {...fadeUp}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          Get more jobs through our marketing system
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(36px, 7vw, 64px)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            maxWidth: 780,
            margin: '0 auto 1.5rem',
          }}
        >
          Get more jobs without chasing leads.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '0 auto 2.5rem',
            lineHeight: 1.65,
          }}
        >
          We set up and manage your campaigns so your phone rings with real customers. You focus on the tools, we handle the marketing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <a
            href="#contact"
            onClick={scrollToContact}
            style={{
              display: 'inline-block',
              background: 'var(--text-primary)',
              color: '#0a0a0a',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'var(--body-size)',
              padding: '14px 28px',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Book a Free Consultation
          </a>
          <a
            href="#contact"
            onClick={scrollToContact}
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: 'var(--body-size)',
              padding: '13px 27px',
              borderRadius: 8,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
          >
            See how it works
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--small-size)',
            color: 'var(--text-muted)',
            marginTop: '1.25rem',
          }}
        >
          Only 10 free consultation spots this month.
        </motion.p>
      </div>
    </section>
  );
}

/* ── Section 2 — How It Works ── */
const steps = [
  {
    number: '01',
    title: 'We research your market',
    description: 'Our in-house engine pulls live cost-per-lead data, competitor activity, and search trends for your specific trade and location.',
  },
  {
    number: '02',
    title: 'We build your campaigns',
    description: 'Search ads to catch homeowners actively looking. Social ads to reach the ones who haven\'t searched yet. Retargeting to close the ones who visited but didn\'t call.',
  },
  {
    number: '03',
    title: 'We optimise weekly',
    description: 'Every week we review what\'s working, pause what isn\'t, test new creative, and adjust targeting. You get a monthly report showing leads, cost per lead, and ROI.',
  },
];

function HowItWorks() {
  return (
    <section style={{ padding: 'clamp(56px, 10vh, 120px) var(--content-padding)' }}>
      <div className="content-wrap">
        <SectionHead h2="How it works" />
        <div className="ads-steps-grid">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              {...fadeUp}
              style={{
                ...GLASS,
                padding: 'clamp(28px, 4vw, 40px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div aria-hidden="true" style={{
                position: 'absolute',
                top: 8,
                right: 16,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(64px, 8vw, 88px)',
                color: 'rgba(255,255,255,0.04)',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {step.number}
              </div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                marginBottom: '0.75rem',
              }}>
                {step.number}
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                marginBottom: '0.85rem',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'var(--body-size)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 3 — Campaign Tool Showcase ── */
function CampaignShowcase() {
  return (
    <section style={{ padding: 'clamp(56px, 10vh, 120px) var(--content-padding)' }}>
      <div className="content-wrap">
        <SectionHead
          h2="See your campaign plan before you spend a dollar."
          sub="Our in-house campaign engine analyses live market data, competitor pricing, and proven advertising methods to generate ready-to-launch campaigns — tailored to your trade, location, and budget. Built by us, not a third-party tool."
          maxWidth={680}
        />

        <motion.div {...fadeUp} className="ads-images-grid">
          <img
            src="/campaign.png"
            alt="Campaign plan with market research and budget breakdown"
            style={{
              width: '100%',
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              display: 'block',
            }}
          />
          <img
            src="/Result.png"
            alt="Expected results and awareness level budget allocation"
            style={{
              width: '100%',
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              display: 'block',
            }}
          />
        </motion.div>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'var(--small-size)',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: '1.25rem',
          lineHeight: 1.6,
        }}>
          Example campaign plan generated for a Brisbane painting business. Based on live industry data.
        </p>
      </div>
    </section>
  );
}

/* ── Section 4 — What's Included ── */
const inclusions = [
  'Search campaign setup and management',
  'Social media campaign setup and management',
  'Custom ad copy generated for your trade',
  'Audience targeting and retargeting',
  'Weekly optimisation and A/B testing',
  'Monthly performance report',
];

function WhatYouGet() {
  return (
    <section style={{ padding: 'clamp(56px, 10vh, 120px) var(--content-padding)' }}>
      <div className="content-wrap">
        <SectionHead h2="What's included" />
        <motion.div
          {...fadeUp}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0',
            maxWidth: 720,
            margin: '0 auto',
          }}
        >
          {inclusions.map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'var(--body-size)',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 5 — Pricing ── */
function Pricing() {
  return (
    <section style={{ padding: 'clamp(56px, 10vh, 120px) var(--content-padding)' }}>
      <div className="content-wrap">
        <SectionHead h2="Simple pricing. No surprises." />

        <motion.div
          {...fadeUp}
          style={{
            ...GLASS,
            maxWidth: 500,
            margin: '0 auto',
            padding: 'clamp(32px, 5vw, 48px)',
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: 22,
            color: 'var(--text-muted)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '0.35rem',
            textDecoration: 'line-through',
            opacity: 0.5,
          }}>
            $500/month
          </div>

          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 52,
            color: 'var(--text-primary)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '0.4rem',
          }}>
            $250<span style={{ fontSize: 20, fontWeight: 400, color: 'var(--text-muted)', letterSpacing: 0 }}>/month</span>
          </div>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--small-size)',
            color: 'var(--text-secondary)',
            marginBottom: '1.25rem',
            lineHeight: 1.5,
          }}>
            First month only — then $500/month. Cancel anytime.
          </p>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            marginBottom: '0.75rem',
            lineHeight: 1.5,
          }}>
            Get more jobs through our marketing system
          </p>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--small-size)',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '0.5rem',
          }}>
            You pay ad spend direct to the platforms. We never touch your ad money.
          </p>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--small-size)',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
          }}>
            No lock-in contracts.
          </p>

          <a
            href="#contact"
            onClick={scrollToContact}
            style={{
              display: 'block',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'var(--body-size)',
              padding: '13px 0',
              borderRadius: 8,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.25)',
              textAlign: 'center',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Get Started
          </a>
        </motion.div>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'var(--small-size)',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: '1.5rem',
        }}>
          Setup fee waived for the first 10 clients.
        </p>
      </div>
    </section>
  );
}

/* ── Section 6 — FAQ ── */
const faqs = [
  {
    q: 'How much should I spend on ads?',
    a: 'Most tradies start with $500–1500/month in ad spend. We recommend a budget based on your trade, location, and how many jobs you want per month.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most campaigns start generating leads within the first week. The algorithm needs 7–14 days to optimise, so results improve over the first month.',
  },
  {
    q: 'Do I need a website first?',
    a: 'Yes, ads need somewhere to send traffic. We build websites too — ask about our website + ads bundle.',
  },
  {
    q: "What if it doesn't work?",
    a: 'No lock-in contracts. If you are not happy after the first month, you walk away. But with proper setup and a reasonable budget, paid ads work for every trade.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          padding: '20px 0',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500,
          fontSize: 'var(--body-size)',
          color: 'var(--text-primary)',
          lineHeight: 1.4,
        }}>
          {q}
        </span>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{
            color: 'var(--text-muted)',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'var(--body-size)',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          paddingBottom: 20,
          margin: 0,
        }}>
          {a}
        </p>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <section style={{ padding: 'clamp(56px, 10vh, 120px) var(--content-padding)' }}>
      <div className="content-wrap">
        <SectionHead h2="Common questions" />
        <motion.div {...fadeUp} style={{ maxWidth: 680, margin: '0 auto' }}>
          {faqs.map((item) => (
            <FAQItem key={item.q} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 7 — Contact Form ── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADS_SESSION_KEY = 'luxcoda_ads_submitted';

function AdsContact() {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(() => !!sessionStorage.getItem(ADS_SESSION_KEY));
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [mountTime]                   = useState(Date.now);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  function validate() {
    const e = {};
    const n = name.trim();
    if (!n || n.length < 2)  e.name = 'Please enter your name (at least 2 characters).';
    else if (n.length > 100) e.name = 'Name is too long.';

    const digits = phone.replace(/\D/g, '');
    if (!phone.trim())          e.phone = 'Please enter your phone number.';
    else if (digits.length < 8) e.phone = 'Phone number must be at least 8 digits.';

    if (email.trim() && !EMAIL_RE.test(email.trim()))
      e.email = 'Please enter a valid email address.';

    const m = message.trim();
    if (!m || m.length < 10)   e.message = 'Message must be at least 10 characters.';
    else if (m.length > 2000)  e.message = 'Message is too long (max 2000 characters).';

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (honeypot) { markSubmitted(); return; }
    if (Date.now() - mountTime < 3000) { markSubmitted(); return; }
    if (lastSubmitTime && Date.now() - lastSubmitTime < 60000) {
      setSubmitError('Please wait a moment before sending another message.');
      return;
    }
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.target)).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setLastSubmitTime(Date.now());
      markSubmitted();
    } catch {
      setSubmitError('Something went wrong. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  function markSubmitted() {
    sessionStorage.setItem(ADS_SESSION_KEY, '1');
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
    <section id="contact" style={{ padding: 'var(--section-padding) var(--content-padding)' }}>
      <div className="content-wrap" style={{ maxWidth: 800 }}>

        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            Book your free consultation.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Tell us about your trade and we will map out a full campaign strategy. No cost, no obligation.
          </p>
        </motion.div>

        <motion.div {...fadeUp} style={{ ...GLASS, padding: 'clamp(28px, 5vw, 44px)' }}>
          {submitted ? (
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
            <form
              name="ads-contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <input type="hidden" name="form-name" value="ads-contact" />
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

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Name <span style={{ color: 'rgba(255,100,100,0.6)' }}>*</span></label>
                  <input
                    type="text" name="name" placeholder="Your name"
                    value={name} onChange={e => setName(e.target.value)}
                    style={{ ...inputStyle, borderColor: errors.name ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)' }}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                  {errors.name && <p style={fieldErrorStyle}>{errors.name}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Phone <span style={{ color: 'rgba(255,100,100,0.6)' }}>*</span></label>
                  <input
                    type="tel" name="phone" placeholder="04xx xxx xxx"
                    value={phone} onChange={e => setPhone(e.target.value)}
                    style={{ ...inputStyle, borderColor: errors.phone ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)' }}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                  {errors.phone && <p style={fieldErrorStyle}>{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>optional</span></label>
                <input
                  type="email" name="email" placeholder="your@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ ...inputStyle, borderColor: errors.email ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)' }}
                  onFocus={handleFocus} onBlur={handleBlur}
                />
                {errors.email && <p style={fieldErrorStyle}>{errors.email}</p>}
              </div>

              <div>
                <label style={labelStyle}>Message <span style={{ color: 'rgba(255,100,100,0.6)' }}>*</span></label>
                <textarea
                  rows={5} name="message"
                  placeholder="Tell us about your trade and what you're after..."
                  value={message} onChange={e => setMessage(e.target.value)}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: 120,
                    borderColor: errors.message ? 'rgba(255,80,80,0.4)' : 'rgba(255,255,255,0.08)',
                  }}
                  onFocus={handleFocus} onBlur={handleBlur}
                />
                {errors.message && <p style={fieldErrorStyle}>{errors.message}</p>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <button
                  type="submit"
                  className="ads-contact-btn"
                  disabled={submitting}
                  style={{
                    background: submitting ? 'rgba(255,255,255,0.6)' : '#ffffff',
                    color: '#0a0a0a',
                    border: 'none',
                    borderRadius: 100,
                    padding: '14px 40px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '1rem',
                    cursor: submitting ? 'default' : 'pointer',
                    transition: 'background 0.25s ease',
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = submitting ? 'rgba(255,255,255,0.6)' : '#ffffff'; }}
                >
                  {submitting ? 'Sending…' : 'Book Free Consultation'}
                </button>

                {/* Phone number as plain text below submit */}
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'var(--small-size)',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}>
                  Prefer to call?{' '}
                  <a
                    href="tel:0414758891"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    0414 758 891
                  </a>
                </p>
              </div>

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
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 8 — CTA Footer ── */
function CTAFooter() {
  return (
    <section style={{ padding: 'clamp(64px, 10vh, 120px) var(--content-padding)', textAlign: 'center' }}>
      <div className="content-wrap">
        <motion.div {...fadeUp}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '1rem',
          }}>
            Ready to get your phone ringing?
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 520,
            margin: '0 auto 2.5rem',
            lineHeight: 1.65,
          }}>
            Book a free consultation. We will review your current presence and show you exactly where you are losing leads.
          </p>
          <a
            href="#contact"
            onClick={scrollToContact}
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 'var(--body-size)',
              padding: '15px 36px',
              borderRadius: 8,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            }}
          >
            Book Your Spot
          </a>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--small-size)',
            color: 'var(--text-muted)',
            marginTop: '1.25rem',
          }}>
            Or text us. We reply fast.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function Ads() {
  return (
    <>
      <Scene3D />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <AdsHero />
        <HowItWorks />
        <CampaignShowcase />
        <WhatYouGet />
        <Pricing />
        <FAQ />
        <AdsContact />
        <CTAFooter />
        <Footer />
      </div>

      <style>{`
        .ads-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
        }
        .ads-images-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 3vw, 32px);
          margin-top: clamp(2rem, 4vw, 3rem);
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); opacity: 1; }
        @media (max-width: 767px) {
          .ads-steps-grid { grid-template-columns: 1fr; }
          .ads-images-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
          .ads-contact-btn { width: 100%; }
        }
      `}</style>
    </>
  );
}
