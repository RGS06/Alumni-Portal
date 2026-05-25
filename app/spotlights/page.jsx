'use client';
import { useState } from 'react';
import FadeIn from '../../components/ui/FadeIn';
import AlumniVisits from '../../components/AlumniVisits';
import AlumniEducationists from '../../components/AlumniEducationists';
import AlumnestAlbum from '../../components/AlumnestAlbum';

export default function SpotlightsPage() {
  const [activeTab, setActiveTab] = useState('visits');

  return (
    <>
      <div className="page-header">
        <FadeIn className="wrapper">
          <h1>Alumni Spotlights</h1>
          <p>Celebrating the achievements, visits, and contributions of our global alumni network.</p>
        </FadeIn>
      </div>

      <div className="bg-light" style={{ minHeight: '60vh', paddingBottom: '4rem' }}>
        <div className="wrapper" style={{ paddingTop: '2rem' }}>
          <div className="category-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <button 
              className={`nav-link ${activeTab === 'visits' ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', fontSize: '1.1rem', paddingBottom: '0.5rem', cursor: 'pointer', fontWeight: activeTab === 'visits' ? '700' : '600' }}
              onClick={() => setActiveTab('visits')}
            >
              Campus Visits
            </button>
            <button 
              className={`nav-link ${activeTab === 'educationists' ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', fontSize: '1.1rem', paddingBottom: '0.5rem', cursor: 'pointer', fontWeight: activeTab === 'educationists' ? '700' : '600' }}
              onClick={() => setActiveTab('educationists')}
            >
              Eminent Educationists
            </button>
            <button 
              className={`nav-link ${activeTab === 'alumnest' ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', fontSize: '1.1rem', paddingBottom: '0.5rem', cursor: 'pointer', fontWeight: activeTab === 'alumnest' ? '700' : '600', color: activeTab === 'alumnest' ? 'var(--primary-color)' : '' }}
              onClick={() => setActiveTab('alumnest')}
            >
              Alumnest Gallery
            </button>
          </div>
        </div>

        {activeTab === 'visits' && (
           <div className="fade-in-up visible">
              <AlumniVisits showHeader={false} />
           </div>
        )}

        {activeTab === 'educationists' && (
          <div className="fade-in-up visible">
            <AlumniEducationists showHeader={false} />
          </div>
        )}

        {activeTab === 'alumnest' && (
          <div className="fade-in-up visible">
            <AlumnestAlbum />
          </div>
        )}
      </div>
    </>
  );
}
