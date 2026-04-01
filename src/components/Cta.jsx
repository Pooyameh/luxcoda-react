import AnimatedText from './AnimatedText'

export default function Cta({ onOpenModal }) {
  return (
    <section style={{
      background: 'transparent',
      padding: '20vh clamp(1.5rem, 8vw, 8rem)',
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* Label */}
      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '2rem',
      }}>
        The Next Step
      </p>

      <AnimatedText
        as="h2"
        style={{
          fontFamily: '"Bodoni Moda", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
          color: 'var(--white)',
          lineHeight: 1.2,
          maxWidth: 800,
          marginBottom: '3rem',
        }}
      >
        Your competitors already look the same. You won&apos;t.
      </AnimatedText>

      <button
        className="btn-gold"
        onClick={onOpenModal}
        style={{ fontSize: 11, letterSpacing: '0.2em', padding: '16px 40px' }}
      >
        Claim Your Free Mock-Up →
      </button>

      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 300,
        fontSize: 13,
        color: 'var(--muted)',
        marginTop: '1.25rem',
      }}>
        Free. No commitment. Delivered in 72 hours.
      </p>

    </section>
  )
}
