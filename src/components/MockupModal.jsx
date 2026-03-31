import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  padding: '0.85rem 1rem',
  fontSize: '0.95rem',
  color: '#fff',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
  WebkitAppearance: 'none',
}

export default function MockupModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', business: '', phone: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

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
    { key: 'name', label: 'Your Name', placeholder: 'Jane Smith', type: 'text' },
    { key: 'business', label: 'Business Name', placeholder: 'Smith & Co.', type: 'text' },
    { key: 'phone', label: 'Phone Number', placeholder: '04xx xxx xxx', type: 'tel' },
    { key: 'email', label: 'Email Address', placeholder: 'jane@smithco.com.au', type: 'email' },
  ]

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
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 201,
              width: 'min(520px, calc(100vw - 2rem))',
              maxHeight: 'calc(100svh - 2rem)',
              overflowY: 'auto',
              background: 'rgba(8,8,22,0.92)',
              backdropFilter: 'blur(48px)',
              WebkitBackdropFilter: 'blur(48px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.7)',
              borderRadius: 26,
              padding: 'clamp(2rem, 5vw, 3rem)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50%', width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              <X size={15} color="rgba(255,255,255,0.65)" />
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    display: 'inline-block',
                    fontSize: '0.65rem', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem', borderRadius: 100,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(94,174,255,0.2)',
                    marginBottom: '1rem',
                  }}>
                    <span className="gradient-text">Free &amp; No Commitment</span>
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15,
                    color: '#fff', marginBottom: '0.5rem',
                  }}>
                    Claim Your Free Mock-Up
                  </h2>
                  <p style={{
                    fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65,
                  }}>
                    Tell us a bit about your business and we'll design a custom preview — no cost, no obligation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {fields.map(field => (
                    <div key={field.key}>
                      <label style={{
                        display: 'block', fontSize: '0.76rem', fontWeight: 600,
                        letterSpacing: '0.05em', color: 'rgba(255,255,255,0.55)',
                        marginBottom: '0.4rem', textTransform: 'uppercase',
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
                          ...inputStyle,
                          borderColor: focused === field.key
                            ? 'rgba(94,174,255,0.45)'
                            : 'rgba(255,255,255,0.1)',
                          background: focused === field.key
                            ? 'rgba(94,174,255,0.05)'
                            : 'rgba(255,255,255,0.04)',
                          boxShadow: focused === field.key
                            ? '0 0 0 3px rgba(94,174,255,0.08)'
                            : 'none',
                        }}
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    style={{
                      marginTop: '0.5rem',
                      background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                      color: '#fff', border: 'none', borderRadius: 100,
                      padding: '1rem', fontSize: '1rem',
                      fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                      letterSpacing: '0.01em',
                      boxShadow: '0 0 32px rgba(94,174,255,0.2)',
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.01)' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    Send My Request
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  textAlign: 'center',
                  padding: 'clamp(1rem, 4vw, 2rem) 0',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '1rem',
                }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(94,174,255,0.08)',
                  border: '1px solid rgba(94,174,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 32px rgba(94,174,255,0.15)',
                }}>
                  <CheckCircle size={30} strokeWidth={1.5} color="#5eaeff" />
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                  fontWeight: 800, letterSpacing: '-0.03em', color: '#fff',
                }}>
                  You're all set!
                </h2>
                <p style={{
                  fontSize: '1rem', color: 'rgba(255,255,255,0.58)',
                  lineHeight: 1.65, maxWidth: 340,
                }}>
                  Thanks for reaching out. We'll be in touch within 24 hours with your custom mock-up.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    marginTop: '0.5rem',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 100, padding: '0.75rem 2rem',
                    fontSize: '0.9rem', fontWeight: 500,
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
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
