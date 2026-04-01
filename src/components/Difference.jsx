import AnimatedText from './AnimatedText'

export default function Difference() {
  return (
    <section style={{ background: 'transparent', padding: '15vh 0' }}>

      {/* Statement 1 — left aligned */}
      <div style={{
        paddingLeft: 'clamp(1.5rem, 10vw, 14rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
        paddingBottom: '25vh',
      }}>
        <AnimatedText
          as="p"
          style={{
            fontFamily: 'var(--display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 5.5vw, 5rem)',
            color: 'var(--white)',
            lineHeight: 1.15,
          }}
        >
          Most agency websites look the same.
        </AnimatedText>
      </div>

      {/* Statement 2 — right aligned */}
      <div style={{
        paddingRight: 'clamp(1.5rem, 10vw, 14rem)',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'right',
      }}>
        <AnimatedText
          as="p"
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
            color: 'var(--gold)',
            lineHeight: 1.05,
          }}
        >
          Yours won't.
        </AnimatedText>
      </div>

    </section>
  )
}
