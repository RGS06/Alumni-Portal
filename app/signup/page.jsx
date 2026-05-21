'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../components/AuthContext';
import { User, Mail, Lock, Settings, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'alumni',
    department: '',
    batch: '',
    isAlumniFaculty: false
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && !success) router.push('/dashboard');
  }, [user, success, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          role: formData.role,
          department: formData.department,
          batch: formData.batch,
          is_alumni_faculty: formData.isAlumniFaculty,
        },
      },
    });

    // "Database error saving new user" means Supabase Auth created the user in
    // auth.users but the handle_new_user trigger failed. Treat it as a soft error —
    // we'll manually upsert the profile row below.
    const isTriggerError =
      signUpError?.message?.toLowerCase().includes('database error saving new user') ||
      signUpError?.message?.toLowerCase().includes('database error');

    if (signUpError && !isTriggerError) {
      // Hard auth errors (email taken, weak password, etc.) — stop here
      setErrorMsg(signUpError.message);
      setLoading(false);
      return;
    }

    // Get the user from the response (works even when trigger fails)
    const newUser = signUpData?.user;

    if (newUser) {
      // Always upsert the profile row directly — covers both:
      // (a) trigger worked fine  →  on conflict do nothing / update
      // (b) trigger failed       →  inserts the row ourselves
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: newUser.id,
        full_name: formData.fullName,
        role: formData.role,
        department: formData.department,
        batch: formData.batch || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

      if (profileError) {
        console.warn('Profile upsert warning (non-fatal):', profileError.message);
      }
    } else {
      // No user object at all — true failure (e.g. email already registered)
      setErrorMsg(signUpError?.message || 'Registration failed. Please try again.');
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper signup-wrapper">
        
        {/* Left Banner */}
        <div className="auth-banner">
          <div className="auth-pill">
            <span style={{opacity:0.8}}>|</span> SHRI MADHWA VADIRAJA INSTITUTE OF TECHNOLOGY & MANAGEMENT <span style={{opacity:0.8}}>|</span>
          </div>
          
          <div className="auth-logo-wrap" style={{ position: 'relative', width: '130px', height: '130px' }}>
            <Image 
              src="https://sode-edu.in/smvitm/wp-content/uploads/2026/04/SMVITM-White-Logo.webp" 
              alt="SMVITM Logo" 
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <h1 style={{ fontSize: '28px' }}>Join the Network</h1>
          <p style={{ fontSize: '13px' }}>Create your secured profile to seamlessly connect with the SMVITM community.</p>
        </div>

        {/* Form Area */}
        <div className="auth-form-area signup-area">
          <div className="auth-form-head" style={{ marginBottom: '16px' }}>
            <h2>Request Access</h2>
            <p>Provision your secure institutional identity.</p>
          </div>

          {errorMsg && (
            <div style={{ margin: '10px 0 16px', padding: '10px 12px', borderRadius: '12px', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)', color: '#b91c1c', fontSize: '13px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}
          
          {success ? (
            <div style={{ background: '#ECFDF5', color: '#047857', padding: '2rem', borderRadius: '14px', textAlign: 'center', border: '1px solid #10B981', marginTop: '20px' }}>
              <h3 style={{ marginBottom: '10px', color: '#047857', fontSize: '18px' }}>Registration Successful!</h3>
              <p style={{ fontSize: '14px' }}>Your secure identity has been provisioned.</p>
              <p style={{ marginTop: '10px', fontSize: '13px', opacity: 0.8 }}>Redirecting to secure dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSignup} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              
              <div className="auth-field" style={{ gridColumn: 'span 2' }}>
                <label className="auth-label">Full Name</label>
                <div className="auth-input-wrap">
                  <div className="icon"><User size={18} /></div>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
                </div>
              </div>

              <div className="auth-field" style={{ gridColumn: 'span 2' }}>
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrap">
                  <div className="icon"><Mail size={18} /></div>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
                </div>
              </div>

              <div className="auth-field" style={{ gridColumn: 'span 2' }}>
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <div className="icon"><Lock size={18} /></div>
                  <input type={showPassword ? 'text' : 'password'} name="password" required minLength={6} value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '12px' }}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="auth-field" style={{ gridColumn: '1 / 2' }}>
                <label className="auth-label">Portal Role</label>
                <div className="auth-input-wrap" style={{ padding: '4px 8px' }}>
                  <div className="icon"><Briefcase size={18} /></div>
                  <select name="role" required value={formData.role} onChange={handleChange} style={{ padding: '8px 0' }}>
                    <option value="alumni">Alumni</option>
                    <option value="student">Current Student</option>
                    <option value="faculty">Faculty Member</option>
                  </select>
                </div>
              </div>

              <div className="auth-field" style={{ gridColumn: '2 / 3' }}>
                {formData.role === 'faculty' ? (
                  <label className="auth-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', height: '100%', marginTop: '20px' }}>
                    <input 
                      type="checkbox" 
                      name="isAlumniFaculty" 
                      checked={formData.isAlumniFaculty} 
                      onChange={(e) => setFormData({...formData, isAlumniFaculty: e.target.checked})}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>Also an SMVITM Alumnus?</span>
                  </label>
                ) : (
                  <>
                    <label className="auth-label">Grad Batch</label>
                    <div className="auth-input-wrap" style={{ padding: '12px 8px' }}>
                      <div className="icon"><GraduationCap size={18} /></div>
                      <input type="number" name="batch" min="2014" max="2040" required value={formData.batch} onChange={handleChange} placeholder="e.g. 2018" />
                    </div>
                  </>
                )}
              </div>

              {formData.role === 'faculty' && formData.isAlumniFaculty && (
                <div className="auth-field" style={{ gridColumn: 'span 2' }}>
                  <label className="auth-label">SMVITM Graduation Batch</label>
                  <div className="auth-input-wrap">
                    <div className="icon"><GraduationCap size={18} /></div>
                    <input type="number" name="batch" min="2014" max="2040" required value={formData.batch} onChange={handleChange} placeholder="The year you graduated from SMVITM" />
                  </div>
                </div>
              )}

              <div className="auth-field" style={{ gridColumn: 'span 2' }}>
                <label className="auth-label">Academic Program</label>
                <div className="auth-input-wrap" style={{ padding: '4px 8px' }}>
                  <div className="icon"><Settings size={18} /></div>
                  <select name="department" required value={formData.department} onChange={handleChange} style={{ padding: '8px 0', fontSize: '13px' }}>
                    <option value="" disabled>Select Department / Program</option>
                    <option value="B.E Artificial Intelligence & Data Science">B.E Artificial Intelligence & Data Science</option>
                    <option value="B.E Artificial Intelligence & Machine Learning">B.E Artificial Intelligence & Machine Learning</option>
                    <option value="B.E Civil Engineering">B.E Civil Engineering</option>
                    <option value="B.E Computer Science & Engineering">B.E Computer Science & Engineering</option>
                    <option value="B.E Electronics & Communication Engineering">B.E Electronics & Communication Engineering</option>
                    <option value="B.E Mechanical Engineering">B.E Mechanical Engineering</option>
                    <option value="MBA Master of Business Administration">MBA Master of Business Administration</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading} className="auth-btn" style={{ gridColumn: 'span 2', marginTop: '4px' }}>
                {loading ? 'Provisioning Identity...' : 'Complete Registration'}
              </button>
            </form>
          )}

          <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
            Already an active member? <Link href="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Login</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
