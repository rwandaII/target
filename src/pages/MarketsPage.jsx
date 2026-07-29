import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MarketsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Markets</h1>
          <p>Thriving growth across Rwanda</p>
        </div>
      </section>
      <section className="page-body">
        <h2>Target Traders Ltd – an innovative vision in Rwanda</h2>
        <p>Founded in 2014, Target Traders Ltd quickly established itself as a <strong>disruptive player in the health and wellness sector</strong>. Our concept: to <strong>offer health, care and well-being products at accessible prices</strong>, in a professional, regulated and secure environment. This approach immediately gained the support of key partners – banks, investors and industry authorities.</p>
        <p>This support enabled Target Traders Ltd to lay a solid foundation for a sustainable model aligned with the market's key challenges of <strong>accessibility</strong>, <strong>quality</strong> and <strong>transparency</strong>.</p>
        <p>Since its creation, Target Traders Ltd has followed a carefully <strong>managed and progressive growth strategy</strong> across Rwanda, strengthening its presence in key cities.</p>

        <section id="kigali" style={{ scrollMarginTop: 100, marginTop: 48 }}>
          <h2>Kigali</h2>
          <p>Our presence in <strong>Kigali</strong>, the capital and largest city of Rwanda, represents our primary market. With multiple stores strategically located across the city, we serve thousands of customers daily. Kigali is the heart of our operations and our flagship location.</p>
        </section>

        <section id="musanze" style={{ scrollMarginTop: 100, marginTop: 48 }}>
          <h2>Musanze</h2>
          <p><strong>Musanze</strong>, located in the northern province of Rwanda, is a key growth market for Target Traders Ltd. Our stores in Musanze bring quality health and well-being products to the local community, supporting the region's development and providing access to essential healthcare products.</p>
        </section>

        <section id="rusagara" style={{ scrollMarginTop: 100, marginTop: 48 }}>
          <h2>Rusagara</h2>
          <p><strong>Rusagara</strong> represents our commitment to serving communities across Rwanda. Our presence in Rusagara extends our reach and ensures that customers in every region can access the products and services they need for their health and well-being.</p>
        </section>

        <h2 style={{ marginTop: 48 }}>Our Rwandan Network</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          marginTop: 32,
          textAlign: 'center'
        }}>
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏪</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>50+</div>
            <div style={{ fontSize: 14, color: '#555' }}>parapharmacies in Rwanda</div>
          </div>
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>💊</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>15+</div>
            <div style={{ fontSize: 14, color: '#555' }}>pharmacies in Rwanda</div>
          </div>
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔬</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>5+</div>
            <div style={{ fontSize: 14, color: '#555' }}>instituts in Rwanda</div>
          </div>
          <div style={{ background: '#f7f9fc', borderRadius: 12, padding: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌍</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>1</div>
            <div style={{ fontSize: 14, color: '#555' }}>country – Rwanda</div>
          </div>
        </div>

        <div style={{ marginTop: 48, padding: 32, background: '#e8f5e9', borderRadius: 12, textAlign: 'center' }}>
          <h2 style={{ marginTop: 0 }}>E-Commerce Sales</h2>
          <p style={{ fontSize: 16, marginBottom: 20 }}>Visit our online sales platform for all your health and well-being needs.</p>
          <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block' }}>
            Browse Our E-Commerce Site →
          </a>
        </div>
      </section>
    </>
  );
}
