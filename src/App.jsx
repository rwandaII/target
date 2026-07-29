import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MissionPage from './pages/MissionPage';
import ValuesPage from './pages/ValuesPage';
import CommitmentsPage from './pages/CommitmentsPage';
import VisionPage from './pages/VisionPage';
import MarketsPage from './pages/MarketsPage';
import LeadershipPage from './pages/LeadershipPage';
import TargetDepotPage from './pages/TargetDepotPage';
import TargetParapharmaPage from './pages/TargetParapharmaPage';
import TargetTradersPage from './pages/TargetTradersPage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import PressReleasesPage from './pages/PressReleasesPage';
import ContactPage from './pages/ContactPage';
import CareerPage from './pages/CareerPage';
import PrivacyPage from './pages/PrivacyPage';
import LegalNoticePage from './pages/LegalNoticePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import './App.css';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="page-content">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/our-mission" element={<Layout><MissionPage /></Layout>} />
      <Route path="/our-values" element={<Layout><ValuesPage /></Layout>} />
      <Route path="/our-commitments" element={<Layout><CommitmentsPage /></Layout>} />
      <Route path="/our-vision-for-future-healthcare" element={<Layout><VisionPage /></Layout>} />
      <Route path="/our-markets" element={<Layout><MarketsPage /></Layout>} />
      <Route path="/our-leadership" element={<Layout><LeadershipPage /></Layout>} />
      <Route path="/target-depot" element={<Layout><TargetDepotPage /></Layout>} />
      <Route path="/target-parapharma" element={<Layout><TargetParapharmaPage /></Layout>} />
      <Route path="/target-traders" element={<Layout><TargetTradersPage /></Layout>} />
      <Route path="/our-news" element={<Layout><NewsPage /></Layout>} />
      <Route path="/news/:slug" element={<Layout><NewsArticlePage /></Layout>} />
      <Route path="/press-releases" element={<Layout><PressReleasesPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/our-career-opportunities" element={<Layout><CareerPage /></Layout>} />
      <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
      <Route path="/legal-notice" element={<Layout><LegalNoticePage /></Layout>} />
      <Route path="/privacy-policy" element={<Layout><PrivacyPolicyPage /></Layout>} />
    </Routes>
  );
}
