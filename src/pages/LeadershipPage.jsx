export default function LeadershipPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Leadership</h1>
          <p>A strong and agile organisation</p>
        </div>
      </section>
      <section className="page-body">
        <h2>A strong and agile organisation</h2>
        <p>Target Traders Ltd is built on a clear and efficient organisation, driven by dedicated leadership, to <strong>make health and well-being accessible to all</strong>. This structure combines <strong>strategic coordination and local anchoring</strong>, ensuring consistency, transparency and compliance.</p>

        <h3>Governance serving our customers</h3>
        <p>The Group's supervision is ensured by:</p>
        <ul>
          <li><strong>A Board of Directors,</strong> composed of experienced and independent members, which defines the key strategic directions, oversees sustainable value creation and guarantees transparency and compliance.</li>
          <li><strong>An Executive Committee,</strong> which defines and implements the operational strategy, embodies our values and supports the teams to deliver the best customer experience.</li>
        </ul>

        <h3>Chief Executive Officer</h3>
        <div style={{
          maxWidth: 300,
          margin: '32px auto',
          textAlign: 'center'
        }}>
          <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 36,
            fontWeight: 700
          }}>
            MA
          </div>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>MBARUSHIMANA ASS</div>
          <div style={{ fontSize: 14, color: '#666' }}>Chief Executive Officer</div>
        </div>

        <h3>Strategic hub in Rwanda</h3>
        <p>Target Traders Ltd's headquarters is located in <strong>Kigali</strong>, where our culture of agility and commitment was forged. The head office brings together <strong>key functions</strong> – logistics, marketing, finance, human resources – strengthening both <strong>efficiency</strong> and <strong>proximity</strong> to our customers.</p>

        <h3>Transparency and compliance</h3>
        <p>Our organisation also relies on strict adherence to legal and regulatory obligations: <strong>data protection (GDPR-compliant)</strong>, <strong>product safety</strong> and <strong>service quality</strong>. <strong>Transparency</strong> towards our customers, partners and employees is a constant priority.</p>
      </section>
    </>
  );
}
