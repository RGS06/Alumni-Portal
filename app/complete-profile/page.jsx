'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthContext';
import { User, Settings, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function CompleteProfilePage() {
  const { user, profile, isComplete, loading, refreshProfile } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    role: 'alumni',
    department: '',
    batch: '',
    isAlumniFaculty: false
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // If auth is not loading and we have a complete profile, go to dashboard
    if (!loading && isComplete) {
      router.push('/dashboard');
    }
    
    // Prefill if some profile data exists
    if (profile) {
      setFormData({
        fullName: profile.full_name || '',
        role: profile.role || 'alumni',
        department: profile.department || '',
        batch: profile.batch || '',
        isAlumniFaculty: profile.is_alumni_faculty || false
      });
    }
  }, [loading, isComplete, profile, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setErrorMsg('');

    try {
      // Use null for batch if it's empty to avoid database type errors
      const updatedBatch = formData.batch || null;

      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id, // Primary key for upsert
          full_name: formData.fullName,
          role: formData.role,
          department: formData.department,
          batch: updatedBatch
        })
        .select(); // Ensure we get data back if needed

      if (error) {
        console.error('Update Error:', error);
        setErrorMsg(`Update Failed: ${error.message}`);
        setSubmitLoading(false);
        return;
      }

      // Update auth metadata so isComplete is recognized instantly
      const { error: metaError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          role: formData.role,
          department: formData.department,
          batch: updatedBatch,
          is_alumni_faculty: formData.isAlumniFaculty
        }
      });

      if (metaError) {
        console.error('Metadata update error:', metaError);
      }

      // Force session refresh so AuthContext picks up new metadata
      await supabase.auth.refreshSession();
      await refreshProfile();
      router.push('/dashboard');
    } catch (err) {
      console.error('Catch Error:', err);
      setErrorMsg('An unexpected error occurred. Please try again.');
      setSubmitLoading(false);
    }
  };

  if (loading) return null;

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

          <h1 style={{ fontSize: '28px' }}>Complete Your Profile</h1>
          <p style={{ fontSize: '13px' }}>Just one last step! Provide your institutional details to unlock all portal features.</p>
        </div>

        {/* Form Area */}
        <div className="auth-form-area signup-area">
          <div className="auth-form-head" style={{ marginBottom: '16px' }}>
            <h2>Finalize Setup</h2>
            <p>Tell us more about your affiliation with SMVITM.</p>
          </div>

          {errorMsg && (
            <div style={{ margin: '10px 0 16px', padding: '10px 12px', borderRadius: '12px', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)', color: '#b91c1c', fontSize: '13px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}
          
          <form onSubmit={handleCompleteProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            
            <div className="auth-field" style={{ gridColumn: 'span 2' }}>
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrap">
                <div className="icon"><User size={18} /></div>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
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

            <button type="submit" disabled={submitLoading} className="auth-btn" style={{ gridColumn: 'span 2', marginTop: '10px' }}>
              {submitLoading ? 'Updating Profile...' : 'Complete & Enter Portal'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
