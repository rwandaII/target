import { Link } from 'react-router-dom';

const values = [
  { icon: 'https://www.medi-market-group.com/wp-content/uploads/2025/10/1-Leader-icone.png', title: 'Leader', desc: 'At Target Traders Ltd, every employee works in an environment conducive to taking initiative and demonstrating leadership, regardless of their role. Thanks to their skills and personality, each person quickly becomes a strategic asset, contributing to delivering a high-quality and reliable service to our customers.' },
  { icon: 'https://www.medi-market-group.com/wp-content/uploads/2025/10/2-Engages-icone.png', title: 'Engagement', desc: 'Engagement is the source of our energy. Every day, we give our best for our clients, colleagues, suppliers, and the entire organization. This positive energy translates into human relationships filled with recognition and collaboration, embodied in our work on the ground.' },
  { icon: 'https://www.medi-market-group.com/wp-content/uploads/2025/10/3-Efficace-icone.png', title: 'Efficiency', desc: 'Results are our shared priority. At Target Traders Ltd, our employees work in an agile organization with the tools and resources needed to analyze and optimize processes. Together, we ensure that our clients receive fast, effective, and sustainable solutions.' },
  { icon: 'https://www.medi-market-group.com/wp-content/uploads/2025/10/4-Passionne-icone.png', title: 'Passion', desc: 'Health and well-being are at the core of our profession. We naturally share this passion with our colleagues, partners, and clients, ensuring the dissemination and accessibility of our expertise to all relevant stakeholders.' },
  { icon: 'https://www.medi-market-group.com/wp-content/uploads/2025/10/5-Sincere-icone.png', title: 'Sincerity', desc: 'Mutual trust is a fundamental pillar within our organization. We encourage transparency and openness, especially in cases of mistakes or failures, fostering a respectful environment for differing ideas and opinions. This authenticity strengthens cohesion and confidence in our organization.' },
  { icon: 'https://www.medi-market-group.com/wp-content/uploads/2025/10/6-Famille-icone.png', title: 'Family spirit', desc: 'Collective success is the key to our progress. More than just a slogan, the family spirit is a reality at Target Traders Ltd, where collaboration, teamwork, and respect for individuality are at the heart of our corporate culture. Together, we achieve our shared goals.' }
];

export default function ValuesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Values</h1>
          <p>A culture of excellence based on strong values</p>
        </div>
      </section>
      <section className="page-body">
        <h2>Our work at the heart of the healthcare mission</h2>
        <p>At Target Traders Ltd, our values are the <strong>foundation of our corporate culture</strong> and the driving force behind our success. They define who we are, what we believe in and <strong>how we work each and every day.</strong></p>
        <p>These principles allow us to innovate together, provide an <strong>optimal customer experience</strong> and <strong>strengthen our position as a leader</strong> in the health and well-being market.</p>

        <h3>The keys to our collective success</h3>
        <p>Guided by <strong>responsible leadership</strong>, unwavering <strong>commitment</strong> and a constant quest for <strong>efficiency</strong>, we place <strong>passion</strong> at the heart of our actions. <strong>Sincerity</strong> and mutual <strong>trust</strong> nurture our relationships, while <strong>family spirit</strong> ensures collaboration and respect for everyone.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 32,
          margin: '40px 0'
        }}>
          {values.map((v) => (
            <div key={v.title} style={{
              background: '#f7f9fc',
              borderRadius: 12,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}>
              <img src={v.icon} alt={v.title} style={{ width: 48, height: 48 }} />
              <h4 style={{ fontSize: 20, fontWeight: 700 }}>{v.title}</h4>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <h3>A unique professional experience</h3>
        <p>These values are not just words: they guide our actions every day, shape our corporate culture and make our <strong>employees' professional experience unique</strong>. Joining Target Traders Ltd means taking part in a collective adventure where every contribution has a <strong>direct impact on the quality of service we provide to our customers</strong>. It also means working in a <strong>dynamic environment</strong>, alongside <strong>engaged and passionate colleagues</strong>, within a <strong>supportive and stimulating workspace.</strong></p>
        <p>Want to be part of the Target Traders Ltd adventure?</p>

        <Link to="/our-career-opportunities" className="btn btn-primary" style={{ marginTop: 16 }}>Explore Career Opportunities</Link>
      </section>
    </>
  );
}
