'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      setIsMenuOpen(false);
      await signOut();
      router.refresh();
      router.push('/');
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}
      id="navbar"
      style={{
        boxShadow: scrolled || isMenuOpen ? '0 10px 30px rgba(0,0,0,0.08)' : 'none',
        padding: scrolled ? '0.5rem 0' : '1rem 0',
      }}
    >
      <div className="nav-container">
        <Link href="/" className="logo">
          <span className="logo-text">SMVITM<span className="logo-accent">AA</span></span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link href="/directory" className={`nav-link ${pathname === '/directory' ? 'active' : ''}`}>Directory</Link>
          <Link href="/yearbook" className={`nav-link ${pathname?.startsWith('/yearbook') ? 'active' : ''}`}>Yearbook</Link>
          <Link href="/community" className={`nav-link ${pathname === '/community' ? 'active' : ''}`}>Community</Link>
          <Link href="/opportunities" className={`nav-link ${pathname === '/opportunities' ? 'active' : ''}`}>Jobs</Link>
          <Link href="/events" className={`nav-link ${pathname === '/events' ? 'active' : ''}`}>Events</Link>
          <Link href="/giving" className={`nav-link ${pathname === '/giving' ? 'active' : ''}`}>Giving</Link>
          
          <div className="mobile-actions">
            {user ? (
              <>
                <Link href="/dashboard" className="nav-link" style={{ fontWeight: 600, color: 'var(--primary-color)' }}>Keep Track</Link>
                <button 
                  className="btn-outline" 
                  onClick={handleLogout}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/login"
                className="btn-primary" 
                style={{ textDecoration: 'none', width: '100%', textAlign: 'center' }}
              >
                Portal Login
              </Link>
            )}
          </div>
        </div>

        <div className="nav-actions">
          {user ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {['admin','superadmin'].includes(profile?.role || user?.user_metadata?.role) && (
                <Link href="/admin" className="nav-link" style={{ fontWeight: 700, color: 'var(--secondary-color)' }}>Admin</Link>
              )}
              <Link href="/dashboard" className="nav-link" style={{ fontWeight: 600, color: 'var(--primary-color)' }}>Dashboard</Link>
              <button 
                className="btn-outline" 
                onClick={handleLogout}
                style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              className="btn-primary" 
              style={{ textDecoration: 'none' }}
            >
              Portal Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
