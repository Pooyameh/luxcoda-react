import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function MockupDialog({ trigger }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const handleOpenChange = (val) => {
    setOpen(val)
    if (!val) {
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', businessName: '', phone: '', email: '' })
      }, 400)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <span onClick={() => setOpen(true)} style={{ display: 'contents', cursor: 'pointer' }}>
        {trigger}
      </span>

      <DialogContent
        style={{
          background: '#0f0f24',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          maxWidth: 440,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* Gradient top bar */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
          borderRadius: '20px 20px 0 0',
        }} />

        <div style={{ padding: '32px 28px' }}>
          {!submitted ? (
            <>
              <DialogHeader style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(94,174,255,0.2), rgba(168,85,247,0.2))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5eaeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5eaeff' }}>
                    Free Mock-Up
                  </span>
                </div>
                <DialogTitle style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#f0f0ff',
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}>
                  See your new website before you commit
                </DialogTitle>
                <DialogDescription style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.88rem',
                  color: 'rgba(240,240,255,0.55)',
                  lineHeight: 1.6,
                }}>
                  Fill in your details and we'll create a custom design mockup for your business within 48 hours — completely free.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: 'rgba(240,240,255,0.55)',
                    marginBottom: 6,
                  }}>
                    Your Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      height: 44,
                      color: '#f0f0ff',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '0.92rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: 'rgba(240,240,255,0.55)',
                    marginBottom: 6,
                  }}>
                    Business Name
                  </label>
                  <Input
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    placeholder="Acme Pty Ltd"
                    required
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      height: 44,
                      color: '#f0f0ff',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '0.92rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: 'rgba(240,240,255,0.55)',
                    marginBottom: 6,
                  }}>
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="04XX XXX XXX"
                    required
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      height: 44,
                      color: '#f0f0ff',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '0.92rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: 'rgba(240,240,255,0.55)',
                    marginBottom: 6,
                  }}>
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@yourbusiness.com.au"
                    required
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      height: 44,
                      color: '#f0f0ff',
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: '0.92rem',
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="gradient-btn"
                  style={{
                    marginTop: 4,
                    height: 48,
                    borderRadius: 10,
                    fontSize: '0.95rem',
                    opacity: loading ? 0.75 : 1,
                  }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send My Free Mock-Up Request'
                  )}
                </Button>

                <p style={{ textAlign: 'center', fontFamily: "'Barlow', sans-serif", fontSize: '0.75rem', color: 'rgba(240,240,255,0.3)', margin: 0 }}>
                  No spam. No commitment. Just a free design.
                </p>
              </form>
            </>
          ) : (
            /* Thank you state */
            <div style={{ textAlign: 'center', padding: '20px 0 12px' }}>
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(94,174,255,0.2), rgba(168,85,247,0.2))',
                border: '1px solid rgba(94,174,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5eaeff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#f0f0ff', margin: '0 0 12px' }}>
                You're on the list! 🎉
              </h3>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: '0.92rem', color: 'rgba(240,240,255,0.6)', lineHeight: 1.65, margin: '0 0 28px', maxWidth: 320, marginLeft: 'auto', marginRight: 'auto' }}>
                Thanks, <strong style={{ color: '#f0f0ff' }}>{form.name}</strong>! We'll have your free design mockup ready within <strong style={{ color: '#5eaeff' }}>48 hours</strong>. Check your inbox at <strong style={{ color: '#f0f0ff' }}>{form.email}</strong>.
              </p>
              <a href="tel:0414758891" style={{ textDecoration: 'none' }}>
                <Button className="ghost-btn" style={{ height: 44, padding: '0 28px', borderRadius: 10 }}>
                  Call Us Now — 0414 758 891
                </Button>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
