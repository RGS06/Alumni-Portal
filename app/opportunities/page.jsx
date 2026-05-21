import FadeIn from '../../components/ui/FadeIn';
import { Briefcase, MapPin, Building2, CalendarDays } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Alumni Opportunities | SMVITMAA',
};

export default function OpportunitiesPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>Exclusive Opportunities</h1>
          <p>Find jobs, internships, and referrals posted exclusively by our alumni network.</p>
        </FadeIn>
      </section>
      
      <section className="section-padding bg-light">
        <FadeIn className="wrapper community-layout">
          <div className="community-sidebar">
            <Link href="/login" className="btn-primary" style={{ width: '100%', marginBottom: '2rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>Post a Job</Link>
            <div className="sidebar-menu">
              <button className="active">All Jobs</button>
              <button>Internships</button>
              <button>Experienced Roles</button>
              <button>Referral Programs</button>
            </div>
          </div>
          
          <div className="jobs-grid">
            <div className="job-card">
              <div className="job-info">
                <h3>Frontend Developer (React/Next.js)</h3>
                <p><Building2 size={16} /> Niveus Solutions <MapPin size={16} style={{ marginLeft: '1rem' }} /> Udupi / Hybrid</p>
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ background: 'var(--bg-light)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>Full-time</span>
                  <span style={{ background: 'var(--bg-light)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', marginLeft: '0.5rem' }}>Posted by Alumni</span>
                </div>
              </div>
              <Link href="/login" className="btn-secondary" style={{ display: 'inline-block', textDecoration: 'none' }}>Apply Now</Link>
            </div>

            <div className="job-card">
              <div className="job-info">
                <h3>Data Analyst Intern</h3>
                <p><Building2 size={16} /> Mu Sigma <MapPin size={16} style={{ marginLeft: '1rem' }} /> Bengaluru</p>
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ background: 'var(--bg-light)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>Internship</span>
                  <span className="text-muted" style={{ marginLeft: '1rem', fontSize: '0.85rem' }}><CalendarDays size={14} style={{ display: 'inline', marginRight: '4px' }} /> Posted 2 days ago</span>
                </div>
              </div>
              <Link href="/login" className="btn-secondary" style={{ display: 'inline-block', textDecoration: 'none' }}>Apply Now</Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
