'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../components/AuthContext';
import FadeIn from '../../components/ui/FadeIn';
import { Briefcase, Users, HeartHandshake, Calendar, Search, FileText, Settings, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email || 'User';
  const userRole = user?.user_metadata?.role || 'Member';
  const dept = user?.user_metadata?.department || 'Not Specified';
  const batch = user?.user_metadata?.batch || 'N/A';

  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingBottom: '5rem' }}>
        {/* Dashboard Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--accent-dark) 0%, #1e3675 100%)', 
          padding: '5rem 0 7rem', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle pattern overlay */}
          <div style={{ 
            position: 'absolute', inset: 0, opacity: 0.05, 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
            backgroundSize: '24px 24px' 
          }} />
          
          <div className="wrapper">
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ 
                  width: '90px', height: '90px', borderRadius: '24px', 
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.5rem', color: 'white', fontWeight: 800,
                  backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}>
                  {userName[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <h1 style={{ color: 'white', fontSize: '2.8rem', margin: 0, letterSpacing: '-0.02em' }}>
                    Welcome back, <span style={{ color: 'var(--secondary-color)' }}>{userName.split(' ')[0]}</span>
                  </h1>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', margin: '8px 0 0', fontWeight: 500 }}>
                    Manage your profile, connect with peers, and stay updated with SMVITM.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Content Section */}
        <div className="wrapper" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
              
              {/* Profile Snapshot Card */}
              <div style={{ 
                background: 'white', padding: '2.5rem', borderRadius: '32px', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.06)', border: '1px solid var(--border-light)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: 'var(--accent-dark)' }}>Account Overview</h3>
                  <span style={{ 
                    padding: '6px 16px', borderRadius: '999px', fontSize: '11px', fontWeight: 800,
                    background: 'rgba(123,20,54,0.1)', color: 'var(--primary-color)',
                    letterSpacing: '1px', textTransform: 'uppercase'
                  }}>
                    {userRole}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                  <div style={infoGroup}>
                    <p style={infoLabel}>Full Name</p>
                    <p style={infoValue}>{userName}</p>
                  </div>
                  <div style={infoGroup}>
                    <p style={infoLabel}>Department</p>
                    <p style={infoValue}>{dept}</p>
                  </div>
                  <div style={infoGroup}>
                    <p style={infoLabel}>Graduation Batch</p>
                    <p style={infoValue}>{batch}</p>
                  </div>
                  <div style={infoGroup}>
                    <p style={infoLabel}>Email Access</p>
                    <p style={infoValue}>{user?.email}</p>
                  </div>
                </div>

                <Link href="/complete-profile" style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  marginTop: '3rem', color: 'var(--primary-color)', fontWeight: 700, 
                  fontSize: '0.95rem', textDecoration: 'none'
                }}>
                  Update Preferences <Search size={16} />
                </Link>
              </div>

              {/* Dynamic Actions Card */}
              <div style={{ 
                background: 'white', padding: '2.5rem', borderRadius: '32px', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.06)', border: '1px solid var(--border-light)' 
              }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: 'var(--accent-dark)', marginBottom: '2rem' }}>
                  Quick Nav
                </h3>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {/* Common: Forum */}
                  <Link href="/community" style={navCard}>
                    <div style={navIconBox}><FileText size={20} /></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.95rem' }}>Community Forum</p>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Latest discussions & queries</p>
                    </div>
                  </Link>

                  {(userRole === 'alumni' || user?.user_metadata?.is_alumni_faculty) && (
                    <>
                      <Link href="/directory" style={navCard}>
                        <div style={navIconBox}><Users size={20} /></div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.95rem' }}>Member Directory</p>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Find batchmates & friends</p>
                        </div>
                      </Link>
                      <Link href="/giving" style={navCard}>
                        <div style={navIconBox}><HeartHandshake size={20} /></div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.95rem' }}>Give Back</p>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Support SMVITM development</p>
                        </div>
                      </Link>
                    </>
                  )}

                  {userRole === 'student' && (
                    <>
                      <Link href="/opportunities" style={navCard}>
                        <div style={navIconBox}><Briefcase size={20} /></div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.95rem' }}>Jobs & Internships</p>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Curated by alumni network</p>
                        </div>
                      </Link>
                      <Link href="/directory" style={navCard}>
                        <div style={navIconBox}><Search size={20} /></div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.95rem' }}>Alumni Mentors</p>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Request career guidance</p>
                        </div>
                      </Link>
                    </>
                  )}

                  {['admin', 'superadmin'].includes(userRole) && (
                    <div style={{ ...navCard, border: '1px solid rgba(197, 144, 72, 0.3)', background: 'rgba(197, 144, 72, 0.05)' }}>
                      <div style={{ ...navIconBox, background: 'var(--secondary-color)', color: 'white' }}><ShieldAlert size={20} /></div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.95rem' }}>Admin Console</p>
                        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Portal management</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </div>
    </ProtectedRoute>
  );
}

const infoGroup = { display: 'flex', flexDirection: 'column', gap: '4px' };
const infoLabel = { margin: 0, textTransform: 'uppercase', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em' };
const infoValue = { margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--accent-dark)' };

const navCard = {
  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem',
  background: 'var(--bg-light)', borderRadius: '20px', border: '1px solid var(--border-light)',
  textDecoration: 'none', transition: 'all 0.2s ease', cursor: 'pointer'
};

const navIconBox = {
  width: '44px', height: '44px', borderRadius: '12px', background: 'white',
  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)',
  boxShadow: '0 4px 10px rgba(0,0,0,0.03)', flexShrink: 0
};

