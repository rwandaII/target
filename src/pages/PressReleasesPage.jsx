import { Link } from 'react-router-dom';
import { newsArticles } from '../data/news';

export default function PressReleasesPage() {
  const byCategory = (cat) => newsArticles.filter(a => a.category === cat);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Press Releases</h1>
          <p>Official press releases from Target Traders Ltd</p>
        </div>
      </section>
      <section className="page-body">
        <h2>Press Releases</h2>
        <div className="news-listing-grid">
          {byCategory('press-releases').map((a) => (
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
      </section>
    </>
  );
}
