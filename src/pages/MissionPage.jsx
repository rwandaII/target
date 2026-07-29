import { Link } from 'react-router-dom';

export default function MissionPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Mission</h1>
          <p>Making health accessible to everyone in Rwanda</p>
        </div>
      </section>
      <section className="page-body">
        <h2>Making health accessible to everyone in Rwanda</h2>
        <p>Target Traders Ltd is a key player in the distribution of <Link to="/target-parapharma">parapharmacy</Link> and <Link to="/target-depot">pharmacy</Link> products, present across Rwanda with many points of sale. Our unique model is based on three major commitments: offering <strong>competitive prices</strong>, ensuring a <strong>wide choice of products</strong> and providing <strong>personalised advice</strong>.</p>
        <p>Through this physical and digital network, our mission is to make health and well-being expertise accessible to everyone in Rwanda.</p>

        <h3>Innovating for a more accessible health market</h3>
        <p>For too long, health and well-being have been associated with high prices, lack of transparency and unequal accessibility. We wanted to offer customers a strong alternative, based on <strong>fairness, expertise and trust</strong>. Our ambition is rooted in a deep conviction: your health should not be a luxury, <strong>but a fundamental right for everyone.</strong></p>

        <h3>At the heart of our identity are three major commitments</h3>

        <h3>💎 Price</h3>
        <p>We guarantee <strong>low prices</strong> so that you are never excluded from care and well-being. For over 10 years, our approach, based on a <strong>transparent and regulated pricing policy in compliance with applicable regulations</strong>, has significantly reduced the average price paid by consumers for health and well-being products.</p>

        <h3>🎯 Choice</h3>
        <p>We offer an extensive range of over <strong>10,000 products</strong> covering all of your daily needs: <strong>care and beauty, hygiene, bandaging, essential oils, nutrition and dietetics, baby and mother.</strong> These products are always available in our stores and come from <strong>well-known brands as well as more specialised laboratories</strong> to meet your expectations.</p>

        <h3>💡 Advice</h3>
        <p>We focus on <strong>personalised support</strong> through our certified health and well-being experts. <strong>Pharmacists, naturopaths, nutritionists, dietitians and beauticians</strong> advise you in-store with <strong>passion and professionalism</strong> so that you can make the <strong>best decisions for your health</strong>.</p>

        <p>This vision guides us every day and is what we fully commit to: <strong>enabling you to take care of your health without compromise, at every stage of your life.</strong></p>

        <h3>More than just a distributor – a committed health partner</h3>
        <p>Today, more than ever, we want to be a <strong>true supporter of collective well-being</strong>. We aim to meet your medical and paramedical needs, relying on the <strong>expertise of our teams</strong> and a <strong>diversified and accessible offering</strong>. Our ambition is to strengthen your <strong>satisfaction</strong> by becoming a trusted partner who accompanies you throughout your <strong>health journey</strong>. Our goal is to provide a unique experience, where you feel heard, understood and supported.</p>
        <p>What's more, we aim to be a <strong>voice</strong> among health actors, defending strong values of <strong>transparency</strong>, <strong>accessibility</strong> and <strong>quality</strong>, so that everyone can benefit from expertise and care tailored to their needs.</p>
        <p><strong>At Target Traders Ltd, your health comes first.</strong></p>

        <Link to="/our-vision-for-future-healthcare" className="btn btn-primary" style={{ marginTop: 24 }}>Our Vision for Tomorrow</Link>
      </section>
    </>
  );
}
