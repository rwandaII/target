import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [form, setForm] = useState({ lastName: '', firstName: '', email: '', country: '', subject: '', description: '', consent: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We are available to answer all of your questions and provide you with the information you need</p>
        </div>
      </section>
      <section className="page-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <h2>Questions or comments?</h2>
            <p style={{ marginBottom: 24 }}>* indicates required fields</p>
            {submitted ? (
              <div style={{
                background: '#e8f5e9',
                borderRadius: 12,
                padding: 32,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <h3>Thank you for your message!</h3>
                <p style={{ color: '#555' }}>We will get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Last name *</label>
                  <input type="text" required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>First name *</label>
                  <input type="text" required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email address *</label>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Subject of the request *</label>
                  <select required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                    <option value="">-- Choose --</option>
                    <option value="Commercial">Commercial request</option>
                    <option value="Real estate">Real estate proposal</option>
                    <option value="Online shop support">Online shop support</option>
                    <option value="Press relations">Press relations</option>
                    <option value="Partnerships">Partnerships / Sponsorship</option>
                    <option value="New supplier">New supplier</option>
                    <option value="Marketing">Marketing request</option>
                    <option value="Legal rights">Legal rights / GDPR</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description of the request *</label>
                  <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <input type="checkbox" id="consent" required checked={form.consent} onChange={e => setForm({...form, consent: e.target.checked})} style={{ width: 'auto', marginTop: 4 }} />
                  <label htmlFor="consent" style={{ fontSize: 13, fontWeight: 400 }}>
                    By submitting this form, I agree that the information entered may be used, exploited, and processed to enable us to contact me in accordance with our privacy policy. *
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
              </form>
            )}
          </div>
          <div>
            <h2>Our head office</h2>

            <div style={{ marginBottom: 32 }}>
              <h3>Rwanda</h3>
              <p>KG 123 Avenue<br />Kigali<br />Rwanda</p>
            </div>

            <h3>Applications</h3>
            <p>For any career opportunities, we invite you to visit our careers page directly.</p>
            <Link to="/our-career-opportunities" className="btn btn-primary" style={{ marginTop: 8 }}>Target Traders Ltd Careers</Link>
          </div>
        </div>
      </section>
    </>
  );
}
