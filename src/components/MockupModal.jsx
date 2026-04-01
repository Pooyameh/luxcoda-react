import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

export default function MockupModal({ isOpen, onClose }) {
  const [form,      setForm]      = useState({ name: '', business: '', phone: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused,   setFocused]   = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      const t = setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', business: '', phone: '', email: '' })
      }, 400)
      return () => clearTimeout(t)
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const fields = [
    { key: 'name',     label: 'Your Name',      placeholder: 'Jane Smith',          type: 'text'  },
    { key: 'business', label: 'Business Name',   placeholder: 'Smith & Co.',         type: 'text'  },
    { key: 'phone',    label: 'Phone Number',    placeholder: '04xx xxx xxx',        type: 'tel'   },
    { key: 'email',    label: 'Email Address',   placeholder: 'jane@smithco.com.au', type: 'email' },
  ]

  const inputBase = {
    width: '100%',
    background: 'rgba(232,237,242,0.03)',
    border: '1px solid rgba(232,237,242,0.09)',
    borderRadius: 4,
    padding: '0.9rem 1.1rem',
    fontSize: '0.95rem',
    color: 'var(--white)',
    fontFamily: '"DM Sans", sans-serif',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
    WebkitAppearance: 'none',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 201,
              width: 'min(520px, calc(100vw - 2rem))',
              maxHeight: 'calc(100svh - 2rem)',
              overflowY: 'auto',
              background: 'rgba(5,5,5,0.96)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(111,163,199,0.15)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.75)',
              borderRadius: 4,
              padding: 'clamp(2rem, 5vw, 3rem)',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute', top: '1.1rem', right: '1.1rem',
                background: 'rgba(232,237,242,0.04)',
                border: '1px solid rgba(232,237,242,0.08)',
                borderRadius: '50%', width: 34, height: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,237,242,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,237,242,0.04)' }}
            >
              <X size={14} color="rgba(232,237,242,0.5)" />
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                  }}>
                    Free &amp; No Commitment
                  </p>
                  <h2 style={{
                    fontFamily: '"Bodoni Moda", serif',
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: 'var(--white)',
                    marginBottom: '0.5rem',
                  }}>
                    Claim Your Free Mock-Up
                  </h2>
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 300,
                    fontSize: '0.88rem',
                    color: 'var(--muted)',
                    lineHeight: 1.65,
                  }}>
                    Tell us about your business and we&apos;ll design a custom preview — no cost, no obligation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {fields.map(field => (
                    <div key={field.key}>
                      <label style={{
                        display: 'block',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        letterSpacing: '0.15em',
                        color: 'var(--muted)',
                        marginBottom: '0.4rem',
                        textTransform: 'uppercase',
                      }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        required
                        onFocus={() => setFocused(field.key)}
                        onBlur={() => setFocused(null)}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        style={{
                          ...inputBase,
                          borderColor: focused === field.key
                            ? 'rgba(111,163,199,0.4)'
                            : 'rgba(232,237,242,0.09)',
                          background: focused === field.key
                            ? 'rgba(111,163,199,0.04)'
                            : 'rgba(232,237,242,0.03)',
                          boxShadow: focused === field.key
                            ? '0 0 0 3px rgba(111,163,199,0.06)'
                            : 'none',
                        }}
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="btn-gold"
                    style={{
                      marginTop: '0.4rem',
                      padding: '1rem',
                      fontSize: '0.88rem',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    Send My Request →
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  textAlign: 'center',
                  padding: 'clamp(1rem, 4vw, 2rem) 0',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '1rem',
                }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  style={{
                    width: 76, height: 76, borderRadius: '50%',
                    background: 'rgba(111,163,199,0.06)',
                    border: '1px solid rgba(111,163,199,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <CheckCircle size={32} strokeWidth={1.5} color="var(--accent)" />
                </motion.div>

                <h2 style={{
                  fontFamily: '"Bodoni Moda", serif',
                  fontSize: 'clamp(1.4rem, 4vw, 1.85rem)',
                  fontWeight: 700,
                  color: 'var(--white)',
                }}>
                  You&apos;re all set!
                </h2>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 300,
                  fontSize: '0.95rem',
                  color: 'var(--muted-strong)',
                  lineHeight: 1.65,
                  maxWidth: 340,
                }}>
                  Thanks for reaching out. We&apos;ll be in touch within 24 hours with your custom mock-up.
                </p>

                <div style={{
                  display: 'flex', gap: '2rem',
                  padding: '1rem 1.5rem',
                  borderRadius: 4,
                  background: 'rgba(232,237,242,0.02)',
                  border: '1px solid rgba(111,163,199,0.1)',
                  marginTop: '0.25rem',
                }}>
                  {[
                    { value: '24h', label: 'Response time' },
                    { value: '7d',  label: 'To launch' },
                  ].map(({ value, label }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{
                        fontFamily: '"Bodoni Moda", serif',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: 'var(--accent)',
                      }}>
                        {value}
                      </div>
                      <div style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '0.68rem',
                        color: 'var(--muted)',
                        marginTop: '0.1rem',
                      }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onClose}
                  className="btn-gold"
                  style={{ marginTop: '0.25rem', padding: '0.75rem 2rem', fontSize: '0.85rem' }}
                >
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
