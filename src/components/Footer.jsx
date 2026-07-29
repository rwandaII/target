import { Link } from 'react-router-dom';

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com', icon: 'f' },
  { name: 'Linkedin', url: 'https://linkedin.com', icon: 'in' },
  { name: 'Instagram', url: 'https://instagram.com', icon: 'ig' },
  { name: 'TikTok', url: 'https://tiktok.com', icon: 'tt' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'yt' }
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-about">
          <div className="footer-logo">TARGET<span>TRADERS</span></div>
          <p>Target Traders Ltd is a leading retail company specialising in health and well-being products. With a network of stores across multiple markets, we are committed to making quality products accessible to everyone.</p>
          <h4 style={{ marginTop: 24, textTransform: 'uppercase', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: 1, marginBottom: 12 }}>Social networks</h4>
          <div className="footer-social">
            {socialLinks.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>{s.icon}</a>
            ))}
          </div>
        </div>
        <div>
          <h4>About us</h4>
          <div className="footer-links">
            <Link to="/our-mission">Our Mission</Link>
            <Link to="/our-values">Our Values</Link>
            <Link to="/our-commitments">Our Commitments</Link>
            <Link to="/our-vision-for-future-healthcare">Our Vision for Future Healthcare</Link>
            <Link to="/our-markets">Our Markets</Link>
            <Link to="/our-markets#kigali">Kigali</Link>
            <Link to="/our-markets#musanze">Musanze</Link>
            <Link to="/our-markets#rusagara">Rusagara</Link>
          </div>
        </div>
        <div>
          <h4>Our activities</h4>
          <div className="footer-links">
            <Link to="/target-depot">Target Depot</Link>
            <Link to="/target-parapharma">Target Parapharma</Link>
            <Link to="/target-traders">Target Traders</Link>
          </div>
        </div>
        <div>
          <h4>Career</h4>
          <div className="footer-links">
            <Link to="/our-career-opportunities">Career Opportunities</Link>
          </div>

          <h4 style={{ marginTop: 24, textTransform: 'uppercase', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: 1, marginBottom: 12 }}>Websites</h4>
          <div className="footer-links">
            <Link to="/">Target Traders Ltd</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <h4 style={{ marginTop: 24, textTransform: 'uppercase', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: 1, marginBottom: 12 }}>Career</h4>
          <div className="footer-links">
            <Link to="/our-career-opportunities">Career Opportunities</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; Target Traders Ltd</span>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/legal-notice">Legal Notice</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
