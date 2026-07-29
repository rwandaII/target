import { useParams, Link } from 'react-router-dom';
import { newsArticles } from '../data/news';

export default function NewsArticlePage() {
  const { slug } = useParams();
  const article = newsArticles.find(a => a.id === slug);

  if (!article) {
    return (
      <section className="page-content">
        <div className="page-body" style={{ textAlign: 'center', paddingTop: 120 }}>
          <h2>Article not found</h2>
          <p style={{ marginBottom: 24 }}>The article you are looking for does not exist.</p>
          <Link to="/our-news" className="btn btn-primary">Back to News</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{article.title}</h1>
          <p>{article.date}</p>
        </div>
      </section>
      <section className="page-body">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {article.content.split('\n').map((para, i) => {
            const trimmed = para.trim();
            if (!trimmed) return null;
            return <p key={i}>{trimmed}</p>;
          })}
          <div style={{ marginTop: 40 }}>
            <Link to="/our-news" className="btn btn-primary">← Back to News</Link>
          </div>
        </div>
      </section>
    </>
  );
}
