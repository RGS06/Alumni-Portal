'use client';
import FadeIn from './ui/FadeIn';
import { MessageSquare, Briefcase, BookOpen, Users, Calendar, Newspaper } from 'lucide-react';
import Link from 'next/link';

const CARDS = [
  { icon: <MessageSquare size={26} />, title: 'Forum', desc: 'Join department-wise discussions, ask questions, and share knowledge.', href: '/community' },
  { icon: <Briefcase size={26} />, title: 'Jobs & Internships', desc: 'Find exclusive opportunities posted internally by SMVITM alumni.', href: '/opportunities' },
  { icon: <BookOpen size={26} />, title: 'Mentorship', desc: 'Sign up to guide junior students or find a mentor in your industry.', href: '/mentorship' },
  { icon: <Users size={26} />, title: 'Alumni Directory', desc: 'Search by batch, department, or company to build your network.', href: '/directory' },
  { icon: <Calendar size={26} />, title: 'Events', desc: 'RSVP for chapter meets, flagship reunions, and webinars.', href: '/events' },
  { icon: <Newspaper size={26} />, title: 'News & Achievements', desc: 'Stay updated with the proudest moments of our global family.', href: '/media' },
];

export default function QuickAccess() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0f1c3f 0%, #122147 50%, #1a2f60 100%)',
      padding: '5rem 0 6rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />
      {/* Gold glow top-right */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197,144,72,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <FadeIn className="wrapper">
        <div className="section-header" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ color: '#ffffff' }}>Explore the Community</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center' }}>
            Everything you need to stay connected and accelerate your career.
          </p>
        </div>

        <div className="access-grid">
          {CARDS.map(({ icon, title, desc, href }) => (
            <Link href={href} key={title} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.25rem 1.75rem',
                backdropFilter: 'blur(8px)',
                transition: 'var(--transition)',
                cursor: 'pointer',
                height: '100%',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.11)';
                  e.currentTarget.style.borderColor = 'rgba(197,144,72,0.45)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '54px', height: '54px', borderRadius: '14px',
                  background: 'rgba(197,144,72,0.15)', color: 'var(--secondary-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  {icon}
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.15rem', marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.92rem', textAlign: 'left', lineHeight: '1.6' }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
