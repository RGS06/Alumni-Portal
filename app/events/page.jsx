import FadeIn from '../../components/ui/FadeIn';
import LatestUpdates from '../../components/LatestUpdates';
import { Calendar, Users, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Alumni Events | SMVITMAA',
};

export default function EventsPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>Events, Meets & Interactions</h1>
          <p>Stay connected through our officially sanctioned alumni meets and regular interaction programs across global chapters.</p>
        </FadeIn>
      </section>
      
      <section className="section-padding wrapper">
        <FadeIn className="trust-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '4rem' }}>
          <div className="trust-card" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
             <div className="trust-icon" style={{ background: 'var(--white)', boxShadow: 'var(--shadow-soft)' }}><Calendar /></div>
             <div>
               <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Annual Alumni Meets</h3>
               <p style={{ fontSize: '0.85rem' }}>Our flagship campus reunions organized by the Executive Committee.</p>
             </div>
          </div>
          
          <div className="trust-card" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
             <div className="trust-icon" style={{ background: 'var(--white)', boxShadow: 'var(--shadow-soft)' }}><Users /></div>
             <div>
               <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Chapter Gatherings</h3>
               <p style={{ fontSize: '0.85rem' }}>Regional network interaction programs hosted across major tech hubs.</p>
             </div>
          </div>
          
          <div className="trust-card" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
             <div className="trust-icon" style={{ background: 'var(--white)', boxShadow: 'var(--shadow-soft)' }}><Briefcase /></div>
             <div>
               <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Industry Interaction</h3>
               <p style={{ fontSize: '0.85rem' }}>Formal networking events closing the gap between academia and corporate.</p>
             </div>
          </div>
        </FadeIn>
      </section>
      
      <LatestUpdates />
    </>
  );
}
