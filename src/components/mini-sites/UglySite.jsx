/* The "before" ugly site — deliberately terrible */
export default function UglySite() {
  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'Georgia, "Times New Roman", serif', background: '#f0ead0', display: 'flex', flexDirection: 'column' }}>

      {/* UGLY NAV — too many links, crammed, dated */}
      <div style={{ background: '#336699', padding: '0 14px', height: 48, display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0, borderBottom: '4px solid #ffff00' }}>
        {['HOME', 'ABOUT US', 'SERVICES', 'GALLERY', 'TESTIMONIALS', 'CONTACT US', 'FAQ', 'LINKS'].map((l, i) => (
          <span key={l} style={{
            color: i === 0 ? '#ffff00' : '#fff',
            fontSize: 11,
            fontWeight: 700,
            padding: '0 10px',
            borderRight: '1px solid rgba(255,255,255,0.25)',
            whiteSpace: 'nowrap',
            fontFamily: 'Arial, sans-serif',
            textTransform: 'uppercase',
          }}>{l}</span>
        ))}
      </div>

      {/* "Welcome" line — tiny, centered, lost */}
      <div style={{ background: '#f0ead0', padding: '8px', textAlign: 'center', borderBottom: '1px solid #ccc', flexShrink: 0 }}>
        <span style={{ fontSize: 11, color: '#555', fontFamily: 'Arial', fontStyle: 'italic' }}>*** WELCOME TO OUR WEBSITE ***</span>
      </div>

      {/* UGLY HERO */}
      <div style={{ background: 'linear-gradient(to right, #6a0dad, #0066cc, #1e90ff)', padding: '28px 20px 24px', textAlign: 'center', flexShrink: 0, borderBottom: '5px solid #ffff00' }}>
        <div style={{ fontSize: 11, color: '#ffff99', fontFamily: 'Arial', letterSpacing: 1, marginBottom: 10 }}>
          ★★★ BRISBANE'S #1 PLUMBING COMPANY ★★★
        </div>
        <h1 style={{
          color: '#ffff00',
          fontSize: 40,
          fontWeight: 900,
          margin: '0 0 8px',
          textShadow: '3px 3px 0 #000, 0 0 20px rgba(255,255,0,0.5)',
          fontFamily: 'Impact, "Arial Black", sans-serif',
          lineHeight: 1.15,
        }}>
          Welcome to Dave's Plumbing!!
        </h1>
        <p style={{ color: '#cce5ff', fontSize: 13, margin: '0 0 6px', fontFamily: 'Arial' }}>
          Servicing Brisbane &amp; Surrounds since 2008!!
        </p>
        <p style={{ color: '#fff', fontSize: 11, margin: '0 0 16px', fontFamily: 'Comic Sans MS, cursive, Arial' }}>
          We are the BEST plumbers in BRISBANE!!!! Call us TODAY!!!!
        </p>
        <button style={{
          background: '#00ff00',
          color: '#ff0000',
          border: '4px solid #009900',
          padding: '12px 24px',
          fontSize: 17,
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'Comic Sans MS, cursive, Arial Black',
          textTransform: 'uppercase',
          boxShadow: '4px 4px 0 #000',
          letterSpacing: 1,
        }}>
          &gt;&gt;&gt; CLICK HERE!!! &lt;&lt;&lt;
        </button>
      </div>

      {/* THREE BOXES */}
      <div style={{ background: '#f0ead0', padding: '14px 16px', flexShrink: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { title: 'OUR SERVICES!!', body: 'We do ALL types of plumbing!! Leaking taps!! Blocked drains!! Hot water!! Gas fitting!! AND MORE!! Call us NOW for the BEST prices in Brisbane!!' },
          { title: 'WHY CHOOSE US???', body: '20+ years experience!! Family owned!! The CHEAPEST prices!! Fully licensed!! We are the BEST in Brisbane!!! Don\'t go anywhere else!!! CALL NOW!!!' },
          { title: 'CONTACT INFO', body: 'PHONE: 0400 111 222\nMOBILE: 0411 333 444\nFAX: 07 3333 4444\nEMAIL: dave@plumbing.net.au\nADDRESS: 123 Some St Brisbane' },
        ].map(box => (
          <div key={box.title} style={{ background: '#fffde7', border: '3px solid #336699' }}>
            <div style={{ background: '#003366', color: '#ffcc00', fontFamily: '"Arial Black", Arial', fontSize: 11, fontWeight: 900, padding: '5px 8px', textTransform: 'uppercase' }}>
              {box.title}
            </div>
            <p style={{ fontSize: 11, color: '#333', fontFamily: 'Arial', lineHeight: 1.45, margin: 0, padding: '8px', whiteSpace: 'pre-line' }}>{box.body}</p>
          </div>
        ))}
      </div>

      {/* AGGRESSIVE BOTTOM BANNER */}
      <div style={{ background: '#cc0000', color: '#ffff00', fontFamily: '"Arial Black", Arial', fontSize: 13, fontWeight: 900, padding: '10px 16px', textAlign: 'center', border: '3px dashed #ffff00', flexShrink: 0, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        🔧 SPECIAL OFFER THIS MONTH ONLY!!! FREE CALL-OUT!!! LIMITED TIME!!! RING NOW DON'T MISS OUT!!! 🔧
      </div>
    </div>
  );
}
