import FadeIn from '../../components/ui/FadeIn';
import { Search, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Alumni Directory | SMVITMAA',
};

export default function DirectoryPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>Alumni Directory</h1>
          <p>Find, connect, and collaborate with peers across the globe.</p>
        </FadeIn>
      </section>
      
      <section className="section-padding wrapper">
        <FadeIn className="search-filters">
          <div className="search-bar">
            <Search size={20} style={{ position: 'absolute', left: '1.25rem', color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search by name, company, or location..." style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', outline: 'none' }} />
          </div>
          <div className="filters" style={{ display: 'flex', gap: '1rem' }}>
            <select aria-label="Batch">
              <option>All Batches</option>
              <option>2023</option>
              <option>2014</option>
            </select>
            <select aria-label="Department">
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Civil Engineering</option>
              <option>Mechanical</option>
            </select>
          </div>
        </FadeIn>
        
        <FadeIn className="dir-grid mt-6">
          <div className="alumni-card">
            <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem auto' }}>
              <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="Rahul Kotian" fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--secondary-color)' }} />
            </div>
            <h4>Rahul Kotian</h4>
            <span className="role">Head Projects</span>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <MapPin size={16} /> Bengaluru
            </p>
            <Link href="/login" className="btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>Connect</Link>
          </div>
          {/* Duplicates for UI preview */}
          <div className="alumni-card">
            <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem auto' }}>
              <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" alt="Shilpa Shetty" fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--secondary-color)' }} />
            </div>
            <h4>Shilpa Shetty</h4>
            <span className="role">Software Engineer</span>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <MapPin size={16} /> Apple India
            </p>
            <Link href="/login" className="btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>Connect</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
