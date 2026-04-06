'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../components/AuthContext';
import { User, Lock } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        
        {/* Left Banner */}
        <div className="auth-banner">
          <div className="auth-pill">
            <span style={{opacity:0.8}}>|</span> SHRI MADHWA VADIRAJA INSTITUTE OF TECHNOLOGY & MANAGEMENT <span style={{opacity:0.8}}>|</span>
          </div>
          
          <div className="auth-logo-wrap" style={{ position: 'relative', width: '160px', height: '160px' }}>
            <Image 
              src="https://sode-edu.in/smvitm/wp-content/uploads/2026/04/SMVITM-White-Logo.webp" 
              alt="SMVITM Logo" 
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <h1>Alumni Portal</h1>
          <p>Reconnect with your institution, access exclusive opportunities, and manage your directory profile securely.</p>
        </div>

        {/* Form Area */}
        <div className="auth-form-area">
          <div className="auth-form-head">
            <h2>Sign in</h2>
            <p>Enter your credentials to continue.</p>
          </div>

          {errorMsg && (
            <div style={{ margin: '10px 0 16px', padding: '10px 12px', borderRadius: '12px', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)', color: '#b91c1c', fontSize: '13px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <div className="icon"><User size={20} /></div>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <div className="icon"><Lock size={20} /></div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '12px' }}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 18px', gap: '12px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', userSelect: 'none' }}>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>

            <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
              Don't have an account? <Link href="/signup" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Sign up</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
