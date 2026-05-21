'use client';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

const ADMIN_ROLES = ['admin', 'superadmin'];

export default function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  // Derive role from profile (db) or user_metadata (auth) — whichever is present
  const role = profile?.role || user?.user_metadata?.role;
  const isAdmin = ADMIN_ROLES.includes(role);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [loading, user, router]);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--primary-color)', fontSize: '1.1rem', fontWeight: 600 }}>
        Verifying admin credentials...
      </p>
    </div>
  );

  if (!user) return null;

  if (!isAdmin) return (
    <div style={{
      height: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center', padding: '2rem'
    }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '24px',
        background: 'rgba(123,20,54,0.1)', color: 'var(--primary-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ShieldAlert size={40} />
      </div>
      <div>
        <h2 style={{ color: 'var(--accent-dark)', margin: '0 0 0.5rem' }}>Access Restricted</h2>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>
          This page is only accessible to administrators.<br />
          Your current role: <strong style={{ color: 'var(--primary-color)' }}>{role || 'Not set'}</strong>
        </p>
      </div>
      <button onClick={() => router.push('/')} style={{
        background: 'var(--primary-color)', color: 'white', border: 'none',
        borderRadius: '12px', padding: '0.75rem 1.75rem', fontWeight: 700,
        cursor: 'pointer', fontSize: '0.95rem',
      }}>
        Return Home
      </button>
    </div>
  );

  return children;
}
