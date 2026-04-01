import AnimatedText from './AnimatedText'

export default function Cta({ onOpenModal }) {
  return (
    <section style={{
      background: 'transparent',
      padding: '20vh clamp(1.5rem, 8vw, 8rem)',
      textAlign: 'center',
    }}>

      <AnimatedText
        as="h2"
        style={{
          fontFamily: 'var(--display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 6vw, 5.5rem)',
          color: 'var(--white)',
          lineHeight: 1.15,
          marginBottom: '3rem',
        }}
      >
        Ready to stand out?
      </AnimatedText>

      <a href="#contact" className="btn-gold" onClick={onOpenModal}>
        Free Mock-Up
      </a>

    </section>
  )
}
