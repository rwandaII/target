import { Link } from 'react-router-dom';
import { newsArticles } from '../data/news';

const activities = [
  { icon: '🏪', title: 'Target Depot', desc: 'Our depots offer a wide range of health, wellness, and beauty products in a modern retail environment.', link: '/target-depot' },
  { icon: '💊', title: 'Target Parapharma', desc: 'Parapharmacy providing prescription medications, health advice, and patient-centered care.', link: '/target-parapharma' },
  { icon: '🔬', title: 'Target Traders', desc: 'Specialised services dedicated to advanced healthcare, aesthetic medicine, and wellness treatments.', link: '/target-traders' }
];

const timeline = [
  { year: '2014', text: 'Opening of our first pharmacy in Rwanda — the beginning of our journey in health and well-being.' },
  { year: '2016', text: 'Expansion to a second pharmacy location, growing our presence in the community.' },
  { year: '2018', text: 'Launch of parapharmacy operations, broadening our product offering.' },
  { year: '2019', text: 'Introduction of our online pharmacy platform for digital accessibility.' },
  { year: '2022', text: 'Growth to multiple retail locations across Rwanda.' },
  { year: '2025', text: 'Diversification into new health and wellness segments.' },
  { year: '2026', text: 'Launch of three operating businesses: Target Depot, Target Parapharma, and Target Traders.' }
];

const stats = [
  { number: '70+', label: 'retail locations' },
  { number: '1', label: 'country – Rwanda' },
  { number: '1,500+', label: 'team members' },
  { number: '10,000+', label: 'products' },
  { number: '2M+', label: 'customers' }
];

export default function HomePage() {
  const latestNews = newsArticles.slice(0, 3);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1>Health and well-being expertise accessible to everyone, today and tomorrow.</h1>
          <p>Target Traders Ltd is a dynamic retail group in Rwanda dedicated to making health, wellness, and beauty products accessible to everyone.</p>
          <Link to="/our-mission" className="btn btn-accent">
            Discover Our Mission →
          </Link>
        </div>
      </section>

      <section className="mission-intro">
        <div className="container">
          <div>
            <h2>Who We Are</h2>
            <p>At Target Traders Ltd, we believe that everyone deserves the very best in healthcare and well-being. We're convinced there's a better way – one that starts with your needs, not with market habits. Our mission: to make a wide range of high-quality products and services accessible to as many people as possible, at the fairest price.</p>
            <p>We are a key player in the distribution of parapharmacy and pharmacy products in Rwanda with many points of sale. Our unique model is based on three major commitments: offering competitive prices, ensuring a wide choice of products and providing personalised advice.</p>
            <Link to="/our-mission" className="btn btn-primary">Discover Our Mission</Link>
          </div>
          <div className="mission-quote">
            <blockquote>"Our mission is to enable everyone to take care of their health and well-being by providing access to quality products at the best prices."</blockquote>
            <cite>— <strong>Our CEO</strong>, Target Traders Ltd</cite>
          </div>
        </div>
      </section>

      <section className="activities-section">
        <div className="container">
          <h2>Our Activities</h2>
          <p>Our model is unique – just like our DNA. Our solution? A network of physical stores and a digital offering. To stay close to you, wherever you are.</p>
          <div className="activities-grid">
            {activities.map((a) => (
              <div key={a.title} className="activity-card">
                <div className="icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <Link to={a.link} className="read-more">Read more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="container">
          <div>
            <h2>Building the Healthcare of Tomorrow</h2>
            <p>At Target Traders Ltd, we do much more than distribute health and well-being products: we're creating a responsible ecosystem to support every health journey – towards sustainable and accessible healthcare for all.</p>
            <p>We believe that health goes beyond temporary treatments: it represents a genuine lifestyle centred on prevention, education and personalised support.</p>
            <Link to="/our-vision-for-future-healthcare" className="btn btn-primary">Our Vision for the Future of Healthcare</Link>
          </div>
          <div className="vision-image">🔭</div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <h2>Target Traders Ltd in numbers*</h2>
          <p className="date">* 31.12.2025</p>
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="career-section">
        <div className="container">
          <h2>We believe in the strength of every talent</h2>
          <p>With us, your ideas come to life.</p>
          <p className="sub-text">Joining us means becoming part of a collective adventure. Together, let's build the healthcare of tomorrow.</p>
          <Link to="/our-career-opportunities" className="btn btn-primary">Explore Our Job Opportunities</Link>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <h2>Our Story</h2>
          <div className="timeline">
            {timeline.map((t) => (
              <div key={t.year} className="timeline-item">
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-text">{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <h2>Our News</h2>
          <p>Projects, innovations, store openings – don't miss anything happening at Target Traders Ltd.</p>
          <div className="news-grid">
            {latestNews.map((a) => (
              <Link key={a.id} to={`/news/${a.id}`} className="news-card">
                <div className="news-card-img">📰</div>
                <div className="news-card-body">
                  <div className="news-card-date">{a.date}</div>
                  <div className="news-card-title">{a.title}</div>
                  <span className="news-card-link">Read more</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/our-news" className="news-all-link">All Our News</Link>
        </div>
      </section>

      <section className="partnership-section">
        <div className="container">
          <h2>Together with Pink Ribbon, we're joining forces to raise awareness, promote prevention and offer support.</h2>
          <p>Find out about our commitment and actions in the fight against breast cancer.</p>
          <Link to="/our-commitments" className="btn">Our Commitments</Link>
        </div>
      </section>
    </>
  );
}
