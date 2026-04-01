import AnimatedText from './AnimatedText'

export default function Difference() {
  return (
    <section style={{ background: 'transparent' }}>

      {/* Beat 1 — italic, muted, ~80vh */}
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 8vw, 10rem)',
        textAlign: 'center',
      }}>
        <AnimatedText
          as="p"
          style={{
            fontFamily: '"Bodoni Moda", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
            color: 'var(--muted-strong)',
            lineHeight: 1.25,
            maxWidth: 800,
          }}
        >
          Every local business deserves a website that works as hard as they do.
        </AnimatedText>
      </div>

      {/* Beat 2 — white, italic, ~80vh */}
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 8vw, 10rem)',
        textAlign: 'center',
      }}>
        <AnimatedText
          as="p"
          style={{
            fontFamily: '"Bodoni Moda", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
            color: 'var(--white)',
            lineHeight: 1.25,
            maxWidth: 800,
          }}
        >
          But most agencies hand you a template, slap your logo on it, and call it done.
        </AnimatedText>
      </div>

      {/* Beat 3 — the punch, ~70vh */}
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 8vw, 10rem)',
        textAlign: 'center',
      }}>
        <AnimatedText
          as="p"
          style={{
            fontFamily: '"Bodoni Moda", serif',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            color: 'var(--gold)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
          delay={0.05}
        >
          Not us.
        </AnimatedText>
      </div>

    </section>
  )
}
