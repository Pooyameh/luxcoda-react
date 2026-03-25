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

const WEBSITE_TYPES = [
  'Business / Corporate',
  'E-Commerce / Online Store',
  'Restaurant / Hospitality',
  'Health / Medical',
  'Real Estate',
  'Trades / Construction',
  'Beauty / Wellness',
  'Fitness / Gym',
  'Professional Services',
  'Other',
]

const fieldStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  height: 44,
  color: '#f0f0ff',
  fontFamily: "'Barlow', sans-serif",
  fontSize: '0.9rem',
}

const labelStyle = {
  display: 'block',
  fontFamily: "'Syne', sans-serif",
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.09em',
  color: 'rgba(240,240,255,0.65)',
  marginBottom: 6,
}

export default function MockupDialog({ trigger }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    websiteType: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1300)
  }

  const handleOpenChange = (val) => {
    setOpen(val)
    if (!val) {
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', businessName: '', phone: '', email: '', websiteType: '' })
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
          borderRadius: 22,
          maxWidth: 460,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* Gradient top bar */}
        <div
          style={{
            height: 3,
            background: 'linear-gradient(90deg, #5eaeff, #c084fc, #a855f7)',
            borderRadius: '22px 22px 0 0',
          }}
        />

        <div style={{ padding: '32px 30px' }}>
          {!submitted ? (
            <>
              <DialogHeader style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background:
                        'linear-gradient(135deg, rgba(94,174,255,0.18), rgba(168,85,247,0.18))',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5eaeff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#5eaeff',
                    }}
                  >
                    Free Mock-Up
                  </span>
                </div>
                <DialogTitle
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#f0f0ff',
                    lineHeight: 1.25,
                    marginBottom: 8,
                  }}
                >
                  See your new website before you commit
                </DialogTitle>
                <DialogDescription
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: '0.875rem',
                    color: 'rgba(240,240,255,0.78)',
                    lineHeight: 1.65,
                  }}
                >
                  Fill in your details and we'll create a custom design mockup for your business within 48 hours — completely free, no obligation.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                    style={fieldStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Business Name</label>
                  <Input
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    placeholder="Acme Pty Ltd"
                    required
                    style={fieldStyle}
                  />
                </div>

                {/* Website type */}
                <div>
                  <label style={labelStyle}>Type of Business</label>
                  <select
                    name="websiteType"
                    value={form.websiteType}
                    onChange={handleChange}
                    required
                    style={{
                      ...fieldStyle,
                      width: '100%',
                      padding: '0 14px',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(240,240,255,0.5)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" disabled style={{ background: '#0f0f24' }}>
                      Select your industry…
                    </option>
                    {WEBSITE_TYPES.map((t) => (
                      <option key={t} value={t} style={{ background: '#0f0f24' }}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="04XX XXX XXX"
                    required
                    style={fieldStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email Address</label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@yourbusiness.com.au"
                    required
                    style={fieldStyle}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="gradient-btn"
                  style={{
                    marginTop: 6,
                    height: 50,
                    borderRadius: 12,
                    fontSize: '0.95rem',
                    opacity: loading ? 0.75 : 1,
                  }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ animation: 'spin 0.8s linear infinite' }}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    'Send My Free Mock-Up Request'
                  )}
                </Button>

                <p
                  style={{
                    textAlign: 'center',
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: '0.73rem',
                    color: 'rgba(240,240,255,0.45)',
                    margin: 0,
                  }}
                >
                  No spam. No commitment. Just a free design.
                </p>
              </form>
            </>
          ) : (
            /* Thank you state */
            <div style={{ textAlign: 'center', padding: '20px 0 14px' }}>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(94,174,255,0.18), rgba(168,85,247,0.18))',
                  border: '1px solid rgba(94,174,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5eaeff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#f0f0ff',
                  margin: '0 0 12px',
                }}
              >
                You're on the list!
              </h3>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.92rem',
                  color: 'rgba(240,240,255,0.82)',
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                  maxWidth: 320,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Thanks, <strong style={{ color: '#f0f0ff' }}>{form.name}</strong>! Your free design mockup will be ready within{' '}
                <strong style={{ color: '#5eaeff' }}>48 hours</strong>. Check your inbox at{' '}
                <strong style={{ color: '#f0f0ff' }}>{form.email}</strong>.
              </p>
              <a href="tel:0414758891" style={{ textDecoration: 'none' }}>
                <Button
                  className="ghost-btn"
                  style={{ height: 46, padding: '0 30px', borderRadius: 12 }}
                >
                  Call Us — 0414 758 891
                </Button>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
