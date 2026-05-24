import FadeIn from '../../components/ui/FadeIn';
import { 
  Shield, MapPin, Users, CheckCircle2, UserCheck, 
  CalendarDays, LineChart, FileText, Settings, BookOpen, Clock, Target, Briefcase
} from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About SMVITMAA | Alumni Portal',
};

import AssociationLeadership from '../../components/AssociationLeadership';

export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>About SMVITMAA</h1>
          <p>Learn about our vision, leadership, and the operational guidelines driving our alumni network forward.</p>
        </FadeIn>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="section-padding wrapper">
        <FadeIn>
          <div className="about-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)', textAlign: 'center' }}>Our Mission & Legacy</h2>
            <p style={{ textAlign: 'justify' }}>
              The Shri Madhwa Vadiraja Institute of Technology & Management Alumni Association (SMVITMAA) is a formally registered entity under the Karnataka Societies Registration Act, 1960 (Serial No. 17). Our primary mission is to foster a robust and enduring bond between the institution and its community of graduates.
            </p>
            <p style={{ textAlign: 'justify' }}>
              We are dedicated to establishing dynamic alumni connections, driving impactful mentorship programs, providing career guidance to emerging graduates, and leading philanthropic initiatives that benefit the entire academic community. Operating from our registered office at SMVITM Bantakal, the association underwent a significant by-law amendment in 2018 to further streamline and expand our strategic operations widely.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
              <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}>
                  <Shield size={40} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}/>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Governing Body</h3>
                  <p style={{ textAlign: 'center', marginBottom: 0, fontSize: '0.95rem' }}>Directed by a dedicated Executive Committee overseeing continuous institutional integration.</p>
              </div>
              <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}>
                  <MapPin size={40} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}/>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Registered Office</h3>
                  <p style={{ textAlign: 'center', marginBottom: 0, fontSize: '0.95rem' }}>SMVITM Bantakal, Udupi District, Karnataka.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginTop: '2rem' }}>


              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--accent-dark)', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '0.25rem' }}>
                   Objectives
                </h3>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-body)', textAlign: 'justify', lineHeight: '1.8' }}>
                  <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>The primary objective of the Alumni cell is to establish a strong link between the institution and its alumni.</li>
                  <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>To build a network between our current students with the alumni.</li>
                  <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>To arrange reunions at prime locations considering the concentration of alumni.</li>
                  <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>To keep our alumni informed about the developments in our institution.</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

      </section>

      {/* DETAILED GOVERNANCE & OPERATIONS */}
      <section className="section-padding bg-light">
        <FadeIn className="wrapper">
          {/* Coordinator Card */}
          <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '2rem', maxWidth: '800px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
             <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
               <Image src="https://sode-edu.in/smvitm/wp-content/uploads/2015/02/RAVIPRABHA-CHEM.jpg" alt="Dr. Raviprabha K." fill style={{ objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--secondary-color)', boxShadow: '0 8px 24px rgba(197,144,72,0.2)' }} />
             </div>
             <div style={{ flex: '1', minWidth: '300px', textAlign: 'left' }}>
               <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: 'var(--primary-color)' }}>Dr. Raviprabha K.</h3>
               <span style={{ display: 'inline-block', background: 'rgba(18, 33, 71, 0.08)', color: 'var(--accent-dark)', padding: '0.35rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>Institutional Alumni Coordinator</span>
               <p style={{ margin: 0, color: 'var(--text-body)', textAlign: 'justify', fontSize: '1.05rem' }}>Directing the complete lifecycle of alumni engagement at SMVITM, ensuring strategic goals are met across all technical departments with utmost dedication.</p>
             </div>
          </div>
        </FadeIn>
      </section>

      {/* ASSOCIATION LEADERSHIP (OFFICE BEARERS) */}
      <AssociationLeadership />


    </>
  );
}
