export default function ParapharmaciesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Parapharmacies</h1>
          <p>Fair prices, wide selection and personalised advice</p>
        </div>
      </section>
      <section className="page-body">
        <h2>Our parapharmacies – more than just a health & well-being store</h2>
        <p>At Target Traders Ltd, our parapharmacies are designed with you in mind: accessible, bright and trustworthy spaces where you can easily find essential products for your health and well-being. We combine a <strong>wide assortment, fair prices and personalised professional guidance</strong> to meet your everyday needs.</p>
        <p>We offer more than <strong>10,000 carefully selected products</strong> to meet all of your needs. Our products come from well-known brands as well as specialised laboratories, often unavailable through traditional channels. This diversity allows us to meet a wide range of needs, <strong>whatever your profile, expectations or lifestyle.</strong></p>

        <h3>A wide range tailored to your needs</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          margin: '32px 0'
        }}>
          {[
            { icon: '🧴', title: 'Beauty & Care' },
            { icon: '🧼', title: 'Hygiene' },
            { icon: '🥗', title: 'Nutrition & Dietetics' },
            { icon: '👶', title: 'Baby & Mum Care' },
            { icon: '🩹', title: 'Bandages' },
            { icon: '🌿', title: 'Essential Oils' }
          ].map((item) => (
            <div key={item.title} style={{
              background: '#f7f9fc',
              borderRadius: 12,
              padding: 32,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{item.title}</div>
            </div>
          ))}
        </div>

        <h3>A place of trust and guidance</h3>
        <p>Our parapharmacies are designed as <strong>spaces for listening and advising</strong>. Our teams – <strong>dietitians, naturopaths, beauticians, pharmacists</strong> – are here to guide you with professionalism and care. They provide advice without ever replacing medical professionals, helping you make informed and responsible choices.</p>
        <p>With parapharmacies across Rwanda, we provide our expertise and high-quality advice to our customers to ensure reliable access to health and well-being.</p>

        <h3>Our offering is also available online</h3>
        <p>Our full parapharmacy range is also available on our online platform. The online shop maintains the same high standards as our stores: <strong>strict product selection, transparent pricing and continuous professional advice.</strong></p>
        <p>Users can find detailed product information, track new arrivals and choose from several pickup or delivery options. A joint offering that enables everyone to meet their health and well-being needs wherever they choose.</p>
      </section>
    </>
  );
}
