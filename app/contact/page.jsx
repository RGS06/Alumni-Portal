import FadeIn from '../../components/ui/FadeIn';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | SMVITMAA',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>Contact Us</h1>
          <p>Have questions, want to update details, or provide feedback? Reach out to the committee.</p>
        </FadeIn>
      </section>
      
      <section className="section-padding bg-light">
        <FadeIn className="wrapper about-grid">
           <div>
              <h2>Get In Touch</h2>
              <p>The Alumni Cell is always open to feedback and collaboration.</p>
              
              <div style={{ marginTop: '2rem' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-dark)' }}><MapPin className="text-secondary" /> SMVITM Campus, Bantakal, Udupi</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-dark)' }}><Mail className="text-secondary" /> alumni@sode-edu.in</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-dark)' }}><Phone className="text-secondary" /> +91 0820 2589182</p>
              </div>
           </div>
           
           <div className="post-input" style={{ flexDirection: 'column', gap: '1.5rem', padding: '2.5rem' }}>
             <input type="text" placeholder="Your Name" style={{ borderRadius: '8px', padding: '1rem' }} />
             <input type="email" placeholder="Your Email" style={{ borderRadius: '8px', padding: '1rem' }} />
             <textarea placeholder="Your Message..." rows={5} style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '1rem', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '1rem', resize: 'vertical' }}></textarea>
             <button className="btn-primary large">Send Message</button>
           </div>
        </FadeIn>
      </section>
    </>
  );
}
