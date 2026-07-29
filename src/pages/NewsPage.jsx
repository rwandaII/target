import { Link } from 'react-router-dom';
import { newsArticles } from '../data/news';

export default function NewsPage() {
  const byCategory = (cat) => newsArticles.filter(a => a.category === cat);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our News</h1>
          <p>Projects, innovations, store openings – don't miss anything happening at Target Traders Ltd</p>
        </div>
      </section>
      <section className="page-body">
        <h2>Our News</h2>
        <div className="news-listing-grid">
          {byCategory('our-news').map((a) => (
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
