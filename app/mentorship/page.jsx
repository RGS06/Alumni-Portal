import FadeIn from '../../components/ui/FadeIn';
import { BookOpen, Presentation, Users, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mentorship Program | SMVITMAA',
};

export default function MentorshipPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>Mentorship & Alumni Talks</h1>
          <p>Bridge the gap between graduation and career success through guided mentorship and our flagship Alumni Talk series.</p>
        </FadeIn>
      </section>
      
      <section className="section-padding bg-light">
        <FadeIn className="wrapper">
          <div className="section-header">
            <h2>Institutional Engagement Practices</h2>
            <p>Our commitment to student growth is powered by direct alumni involvement through structured programs.</p>
          </div>
          
          <div className="access-grid" style={{ marginBottom: '4rem' }}>
             <div className="access-card">
                <div className="ac-icon" style={{ background: 'rgba(123, 20, 54, 0.1)', color: 'var(--primary-color)' }}><Presentation /></div>
                <h3>Alumni Talks Series</h3>
                <p style={{ textAlign: 'justify' }}>Our highly successful institutional practice. We regularly invite domain-expert alumni back to campus (or virtually) to conduct intensive technical and career-oriented sessions directly with current students.</p>
             </div>
             
             <div className="access-card">
                <div className="ac-icon" style={{ background: 'rgba(197, 144, 72, 0.1)', color: 'var(--secondary-color)' }}><Users /></div>
                <h3>Direct Student Engagement</h3>
                <p style={{ textAlign: 'justify' }}>Beyond formal talks, alumni are encouraged to participate in panel discussions, project evaluations, and one-on-one virtual mentoring sessions, heavily impacting the academic ecosystem.</p>
             </div>
             
             <div className="access-card">
                <div className="ac-icon" style={{ background: 'rgba(18, 33, 71, 0.1)', color: 'var(--accent-dark)' }}><GraduationCap /></div>
                <h3>1-on-1 Mentorship</h3>
                <p style={{ textAlign: 'justify' }}>Sign up to guide junior students or find a mentor in your industry. Get resume reviews, interview tips, and direct referrals from seniors who have walked your path.</p>
             </div>
          </div>
        </FadeIn>
      </section>
      
      <section className="section-padding">
        <FadeIn className="wrapper align-center">
          <div className="mentorship-box" style={{ background: 'var(--white)', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ color: 'var(--primary-color)' }}>Shape the Next Generation</h2>
            <p style={{ textAlign: 'justify' }}>Guidance changes lives. Volunteer to be a mentor, share your industry insights, and help students or junior alumni navigate their career growth successfully. The Department Coordinators will facilitate your integration into the schedule.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
              <Link href="/directory" className="btn-primary large" style={{ textDecoration: 'none' }}>Find a Mentor</Link>
              <Link href="/contact" className="btn-outline large" style={{ textDecoration: 'none' }}>Register to Speak / Mentor</Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
