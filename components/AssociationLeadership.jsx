'use client';

import { useState, useEffect } from 'react';
import FadeIn from './ui/FadeIn';

const EXECUTIVE_OFFICERS = [
  {
    name: "Gagan G Prabhu",
    role: "President",
    title: "Developer and Team Lead",
    organization: "SAP Labs India Pvt Ltd",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Gagan-G-prabhu.webp"
  },
  {
    name: "Bhuvanamitra S",
    role: "Vice president",
    title: "Geospatial Engineer",
    organization: "SatSure, Bengaluru",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/BhuvanamitraS.webp"
  },
  {
    name: "Snehal V Rao",
    role: "Secretary",
    title: "Quantity Surveyor",
    organization: "Simons and Associates, Udupi",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Snehal-V-Rao.webp"
  },
  {
    name: "Shreeraj Bhat",
    role: "Joint Secretary",
    title: "Technical Lead",
    organization: "Cloudbox AI",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shreerajbhat.webp"
  },
  {
    name: "Ganesh U G",
    role: "Treasurer",
    title: "Assistant Professor",
    organization: "Dept.of E &C, SMVITM, Bantakal",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Ganesh-U-G.webp"
  }
];

const ADVISORY_BOARD = [
  { name: "Rahul V Kotian", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Mr.-Rahul-Kotian.webp" },
  { name: "Narasimha Pai", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Mr.-Narasimha-Pai.webp" },
  { name: "Karthik A V", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Mr.-Karthik-A-V.webp" },
  { name: "Deeksha D", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Ms.-Deeksha-D.webp" },
  { name: "Sushanth Sanil", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Mr.-Sushanth-Sanil.webp" }
];

const BOARD_MEMBERS = [
  { name: "Ajesh", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Ajesh.webp" },
  { name: "Allen Jacob", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Allen-Jacob.webp" },
  { name: "Alok M Shanbhag", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Alok-M-Shanbhag.webp" },
  { name: "Ansuman", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Ansuman.webp" },
  { name: "Anurag Rao", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Anurag-Rao.webp" },
  { name: "Ashwath Shetty", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Ashwath-Shetty.webp" },
  { name: "Chandana", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Chandana-1.webp" },
  { name: "Devika Lakshmeesha", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Devika-Lakshmeesha.webp" },
  { name: "Gautham Shet", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Gautham-Shet.webp" },
  { name: "Hithesh Mendon", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Hithesh-Mendon.webp" },
  { name: "Lahari Vaidya", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Lahari-Vaidya.webp" },
  { name: "Nihal Shetty", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Nihal-Shetty.webp" },
  { name: "Nikhil Acharya", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Nikhil-Acharya.webp" },
  { name: "Nithishwar", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Nithishwar.webp" },
  { name: "P Shivani", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/P-Shivani.webp" },
  { name: "Pratham L Kamath", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Pratham-L-Kamath.webp" },
  { name: "Roshan Kotian", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Roshan-Kotian.webp" },
  { name: "Samanvitha Bhagavath", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Samanvitha-Bhagavath.webp" },
  { name: "Sampath Kumar", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Sampath-Kumar.webp" },
  { name: "Shankar Shenoy", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shankar-Shenoy.webp" },
  { name: "Shilpa Shetty", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shilpa-Shetty.webp" },
  { name: "Shishira Bhat", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shishira-Bhat.webp" },
  { name: "Shreya Shetty", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shreya-Shetty.webp" },
  { name: "Shrinath Patkar", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shrinath-Patkar.webp" },
  { name: "Shrivathsa Bhat", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shrivathsa-Bhat.webp" },
  { name: "Shrutha V Bhat", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shrutha-V-Bhat.webp" }
];

const FACULTY_COORDINATORS = [
  { name: "Dr. Raviprabha K", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Dr.-Raviprabha-K.webp" },
  { name: "Aditya Kudva", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Aditya-Kudva.webp" },
  { name: "Ganesh U G", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Ganesh-U-G-1.webp" },
  { name: "Megha Rani", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Megha-Rani.webp" },
  { name: "Preethi M", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Preethi-M.webp" },
  { name: "Roshan S Kotian", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Roshan-S-Kotian.webp" },
  { name: "Rukmini Bhat B", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Rukmini-Bhat-B.webp" },
  { name: "Sarvesh S Rao", image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Sarvesh-S-Rao.webp" }
];

export default function AssociationLeadership() {
  const [activeTab, setActiveTab] = useState('core');

  useEffect(() => {
    let interval;
    if (activeTab === 'board' || activeTab === 'advisory' || activeTab === 'faculty') {
      interval = setInterval(() => {
        const sliderId = activeTab === 'board' ? 'board-slider' : (activeTab === 'advisory' ? 'advisory-slider' : 'faculty-slider');
        const container = document.getElementById(sliderId);
        if (container && container.children.length > 0) {
          const cardWidth = container.children[0].offsetWidth + 24; // 24px = 1.5rem gap
          const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
          
          if (isAtEnd) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section className="section-padding wrapper">
      <FadeIn>
        <div className="section-header">
          <h2>Association Leadership</h2>
          <p>Meet the dedicated alumni office bearers leading the SMVITM Alumni Association (2025-27).</p>
        </div>
        
        {/* Tab Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem', marginBottom: '3rem' }}>
          <button 
            onClick={() => setActiveTab('core')}
            className={activeTab === 'core' ? 'btn-primary' : 'btn-outline'}
            style={{ borderRadius: '50px', padding: '0.75rem 1.5rem', fontWeight: 600, border: activeTab === 'core' ? 'none' : '2px solid var(--border-light)' }}
          >
            Core Committee
          </button>
          <button 
            onClick={() => setActiveTab('advisory')}
            className={activeTab === 'advisory' ? 'btn-primary' : 'btn-outline'}
            style={{ borderRadius: '50px', padding: '0.75rem 1.5rem', fontWeight: 600, border: activeTab === 'advisory' ? 'none' : '2px solid var(--border-light)' }}
          >
            Advisory Board
          </button>
          <button 
            onClick={() => setActiveTab('board')}
            className={activeTab === 'board' ? 'btn-primary' : 'btn-outline'}
            style={{ borderRadius: '50px', padding: '0.75rem 1.5rem', fontWeight: 600, border: activeTab === 'board' ? 'none' : '2px solid var(--border-light)' }}
          >
            Board Members
          </button>
          <button 
            onClick={() => setActiveTab('faculty')}
            className={activeTab === 'faculty' ? 'btn-primary' : 'btn-outline'}
            style={{ borderRadius: '50px', padding: '0.75rem 1.5rem', fontWeight: 600, border: activeTab === 'faculty' ? 'none' : '2px solid var(--border-light)' }}
          >
            Faculty Coordinators
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'core' && (
          <FadeIn>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', 
              gap: '1.75rem'
            }}>
              {EXECUTIVE_OFFICERS.map((officer) => (
                <div key={officer.name} style={{ 
                  background: 'var(--white)', 
                  borderRadius: '16px', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  border: '1.5px solid rgba(0,0,0,0.15)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    width: '100%',
                    paddingTop: '120%',
                    backgroundImage: `url(${officer.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                    flexShrink: 0,
                  }} />
                  <div style={{
                    padding: '1rem 1rem 1.2rem',
                    borderTop: '1px solid var(--border-light)',
                    textAlign: 'center',
                  }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--accent-dark)', margin: '0 0 0.3rem 0', fontWeight: 700 }}>
                      {officer.name}
                    </h3>
                    <span style={{
                      fontSize: '0.72rem',
                      color: 'var(--secondary-color)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      display: 'block',
                    }}>
                      {officer.role}
                    </span>
                    <span style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-body)',
                      display: 'block',
                      marginTop: '0.25rem',
                      lineHeight: '1.4',
                    }}>
                      {officer.title}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      display: 'block',
                      marginTop: '0.15rem',
                      lineHeight: '1.4',
                    }}>
                      {officer.organization}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === 'advisory' && (
          <FadeIn>
            <style>{`
              #advisory-slider::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div 
              id="advisory-slider"
              style={{
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                padding: '1rem 0 2rem 0',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {ADVISORY_BOARD.map((member, index) => (
                <div key={index} style={{
                  width: '320px',
                  flexShrink: 0,
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === 'board' && (
          <FadeIn>
            <style>{`
              #board-slider::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div 
              id="board-slider"
              style={{
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                padding: '1rem 0 2rem 0',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {BOARD_MEMBERS.map((member, index) => (
                <div key={index} style={{
                  width: '320px',
                  flexShrink: 0,
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === 'faculty' && (
          <FadeIn>
            <style>{`
              #faculty-slider::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div 
              id="faculty-slider"
              style={{
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                padding: '1rem 0 2rem 0',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {FACULTY_COORDINATORS.map((member, index) => (
                <div key={index} style={{
                  width: '320px',
                  flexShrink: 0,
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </FadeIn>
    </section>
  );
}
