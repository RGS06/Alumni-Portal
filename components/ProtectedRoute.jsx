'use client';
import { useAuth } from './AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, isComplete, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (!isComplete && pathname !== '/complete-profile') {
        router.push('/complete-profile');
      }
    }
  }, [user, isComplete, loading, router, pathname]);

  if (loading) {
    return (
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: 600 }}>Authenticating Secure Session...</p>
      </div>
    );
  }

  if (!user) return null;
  // If profile is incomplete and we're not on the complete-profile page, show nothing while we redirect
  if (!isComplete && pathname !== '/complete-profile') return null;

  return children;
}

