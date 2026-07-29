import { Link } from 'react-router-dom';

export default function CareerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Your Career at Target Traders Ltd</h1>
          <p>Where talent meets passion</p>
        </div>
      </section>
      <section className="page-body">
        <h2>Where talent meets passion</h2>
        <p>At Target Traders Ltd, we are proud to put <strong>health and well-being at the centre of everything we do</strong>. It's more than a mission: it's a purpose that guides every project, initiative and employee.</p>
        <p>We don't look for resources. <strong>We look for talent</strong>: curious, passionate, motivated people who are ready to learn, share and take on challenges in a welcoming and supportive environment.</p>
        <p>Enter a <strong>dynamic professional environment</strong> where your talent and expertise will be recognised. Explore our career opportunities.</p>

        <h3>Our career opportunities</h3>
        <p>At Target Traders Ltd, our career opportunities are organised around three main areas:</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          margin: '32px 0'
        }}>
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏪</div>
            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Points of sale</h4>
            <p style={{ fontSize: 14, color: '#555' }}>As a healthcare professional, you are in direct contact with customers, providing personalised advice and expertise to support them daily.</p>
            <p style={{ fontSize: 13, color: '#888', marginTop: 12 }}><em>Typical roles: beautician, dietitian, naturopath, pharmacist, pharmacy assistant, store manager.</em></p>
          </div>
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Warehouse</h4>
            <p style={{ fontSize: 14, color: '#555' }}>You contribute to essential logistics management, ensuring products are received, stored and shipped with accuracy and efficiency.</p>
            <p style={{ fontSize: 13, color: '#888', marginTop: 12 }}><em>Typical roles: order picker, warehouse operator, stock manager, logistics supervisor, etc.</em></p>
          </div>
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏢</div>
            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Head Office</h4>
            <p style={{ fontSize: 14, color: '#555' }}>You support Target Traders Ltd's strategy and development with your skills in support and cross-functional roles.</p>
            <p style={{ fontSize: 13, color: '#888', marginTop: 12 }}><em>Typical roles: marketing, digital, human resources, finance, communication, IT, etc.</em></p>
          </div>
        </div>

        <h3>An environment for your success and fulfilment</h3>
        <p>Being part of Target Traders Ltd means benefiting from a <strong>dynamic environment</strong> where teamwork and well-being are top priorities. We support your development through <strong>regular training</strong> and <strong>growth opportunities</strong> tailored to your ambitions.</p>
        <p>Join us in making health and well-being accessible to everyone. Can't find a position that fits you? Create your opportunity at Target Traders Ltd by sending a <strong>speculative application</strong>.</p>

        <Link to="/contact" className="btn btn-primary" style={{ marginTop: 16 }}>Contact Us for Opportunities</Link>
      </section>
    </>
  );
}
