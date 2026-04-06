'use client';

import { useState } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import { ShieldCheck, CreditCard, FileText, Heart, Info, ArrowLeft, CheckCircle2, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function ContributePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    department: '',
    batch: '',
    amount: '',
    purpose: '',
    pan: '',
    receive80G: false,
    remarks: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would integrate with Razorpay/Stripe
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    background: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-body)',
    marginTop: '6px'
  };

  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--accent-dark)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const sectionLabel = {
    fontSize: '1.1rem',
    fontWeight: 800,
    color: 'var(--primary-color)',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', maxWidth: '500px' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(34,197,94,0.1)', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle2 size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Initiation Successful</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Thank you for your generous contribution. A secure payment link and bank transfer instructions have been sent to <strong>{formData.email}</strong>.
            </p>
            <Link href="/dashboard" className="btn-primary" style={{ textDecoration: 'none', width: '100%' }}>Back to Dashboard</Link>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Branded Premium Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #4c0d22 0%, var(--accent-dark) 50%, #1e3675 100%)', 
        padding: '6rem 0 10rem 0', 
        color: 'white',
        marginBottom: '-6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Mesh Pattern */}
        <div style={{ 
          position: 'absolute', inset: 0, opacity: 0.1, 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
          backgroundSize: '200px'
        }} />
        
        {/* Glow Effects */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(197,144,72,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="wrapper" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/giving" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px', 
            color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem',
            padding: '12px 28px', borderRadius: '50px', 
            background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '3rem',
            transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateX(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
          }}>
            <ArrowLeft size={18} /> Back to Giving Overview
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
          </div>

          <h1 style={{ fontSize: '3.5rem', margin: 0, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>Make Your Impact</h1>
          <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', lineHeight: 1.6 }}>
            Join a legacy of excellence. Your contribution directly fuels the academic dreams and institutional growth of SMVITM.
          </p>
        </div>
      </div>

      <div className="wrapper">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left Sidebar: Instructions */}
          <FadeIn>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-dark)', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', background: 'rgba(123,20,54,0.06)', borderRadius: '10px', color: 'var(--primary-color)' }}>
                  <Info size={20} />
                </div>
                Policy Highlights
              </h3>

              <div style={{ display: 'grid', gap: '1.75rem' }}>
                {[
                  { title: 'Legacy Model', text: 'Principal preservation: Only the interest generated is used for scholarships, ensuring a permanent legacy.', icon: <CheckCircle2 size={16} /> },
                  { title: 'Merit First', text: 'Supporting students with >85% marks and family income under ₹10 Lakhs.', icon: <Trophy size={16} /> },
                  { title: 'Named Endowments', text: 'Batches/individuals can establish named scholarships for personalized impact.', icon: <Heart size={16} /> },
                  { title: 'Tax Benefits', text: 'Indian Citizens are eligible for 80G Tax Exemption (provide PAN for receipt).', icon: <FileText size={16} /> },
                  { title: 'Transparency', text: 'Audited Transparency: Accounts are reviewed annually for full accountability.', icon: <ShieldCheck size={16} /> },
                  { title: 'Official Receipts', text: 'Emailed within 7-10 working days of successful funds realization.', icon: <CheckCircle2 size={16} /> }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary-color)', opacity: 0.8 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--primary-color)', marginBottom: '4px' }}>
                        {item.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, textAlign: 'justify' }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </FadeIn>

          {/* Right Column: The Form */}
          <FadeIn>
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '3.5rem', borderRadius: '32px', border: '1px solid var(--border-light)', boxShadow: '0 20px 60px rgba(0,0,0,0.04)' }}>
              
              {/* Section 1: Donor Identity */}
              <div style={{ marginBottom: '3.5rem' }}>
                <h3 style={sectionLabel}><Heart size={20} /> Donor Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input required style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="As per bank records" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email ID</label>
                    <input required type="email" style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="For sending receipt" />
                  </div>
                  <div>
                    <label style={labelStyle}>Mobile No.</label>
                    <input required style={inputStyle} value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} placeholder="+91" />
                  </div>
                  <div>
                    <label style={labelStyle}>Batch / Affiliation</label>
                    <input required style={inputStyle} value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} placeholder="e.g. 2014-2018 or Faculty" />
                  </div>
                </div>
              </div>

              {/* Section 2: Donation Detail */}
              <div style={{ marginBottom: '3.5rem' }}>
                <h3 style={sectionLabel}><CreditCard size={20} /> Contribution Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1.5fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Amount (INR)</label>
                    <input required type="number" min="100" style={{ ...inputStyle, fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-color)' }} value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="₹ 1000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Purpose of Donation</label>
                    <select required style={inputStyle} value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}>
                      <option value="">Select Purpose</option>
                      <option value="Merit Scholarships">Merit Scholarships</option>
                      <option value="Infrastructure Development">Infrastructure Development</option>
                      <option value="Student Welfare / Projects">Student Welfare / Projects</option>
                      <option value="General Corpus Fund">General Corpus Fund</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Remarks (Optional)</label>
                  <textarea rows={2} style={inputStyle} value={formData.remarks} onChange={e => setFormData({...formData, remarks: e.target.value})} placeholder="Any specific message or dedication..." />
                </div>
              </div>

              {/* Section 3: Tax Visibility */}
              <div style={{ marginBottom: '3rem', padding: '2rem', background: 'var(--bg-light)', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
                <h3 style={{ ...sectionLabel, color: 'var(--accent-dark)', fontSize: '0.95rem' }}><FileText size={18} /> Tax Information (80G)</h3>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>PAN Number</label>
                    <input style={{ ...inputStyle, background: 'white' }} value={formData.pan} onChange={e => setFormData({...formData, pan: e.target.value.toUpperCase()})} placeholder="ABCDE1234F" maxLength={10} />
                  </div>
                  <div style={{ flex: 1, paddingTop: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-body)' }}>
                      <input type="checkbox" checked={formData.receive80G} onChange={e => setFormData({...formData, receive80G: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
                      I require an 80G Tax Exemption Receipt
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="btn-primary large" style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  Review & Continue to Payment <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                </button>
                <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  By clicking continue, you agree to our <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600 }}>Refund Policy</span> and <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600 }}>Terms of Service</span>.
                   Your IP address and session data are logged for security.
                </p>
              </div>

            </form>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
