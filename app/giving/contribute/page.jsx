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
    marginTop: '6px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--accent-dark)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const sectionLabel = {
    fontSize: '1.1rem',
    fontWeight: 800,
    color: 'var(--primary-color)',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  /* ── Payment / Success screen ─────────────────────────── */
  if (submitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <FadeIn>
          <div style={{
            textAlign: 'center',
            padding: 'clamp(1.5rem, 5vw, 4rem)',
            background: 'white',
            borderRadius: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
            maxWidth: '680px',
            width: '100%',
          }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(197,144,72,0.1)', color: 'var(--secondary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CreditCard size={40} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', marginBottom: '1rem', color: 'var(--primary-color)' }}>
              Complete Your Transfer
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem' }}>
              To complete your contribution of <strong>₹ {formData.amount || 'XXXX'}</strong>, please transfer the amount to the following bank account or scan the QR code. Mention your name or PAN in the transaction remarks.
            </p>

            {/* Bank + QR — stack on mobile */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem',
              textAlign: 'left',
            }}>
              {/* Bank details */}
              <div style={{
                background: 'var(--bg-light)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px dashed var(--border-light)',
              }}>
                {[
                  { label: 'Account Name', value: 'SMVITM Alumni Association' },
                  { label: 'Account No.', value: '50100580780652' },
                  { label: 'IFSC Code', value: 'HDFC0009540' },
                  { label: 'Branch', value: 'HDFC Bank, Shirva' },
                ].map((row, i, arr) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    paddingBottom: i < arr.length - 1 ? '0.75rem' : 0,
                    marginBottom: i < arr.length - 1 ? '0.75rem' : 0,
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border-light)' : 'none',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.88rem', flexShrink: 0 }}>
                      {row.label}
                    </span>
                    <span style={{
                      fontWeight: 800,
                      color: 'var(--accent-dark)',
                      fontSize: row.label === 'Account No.' || row.label === 'IFSC Code' ? '1rem' : '0.95rem',
                      letterSpacing: row.label === 'Account No.' || row.label === 'IFSC Code' ? '0.5px' : 0,
                      wordBreak: 'break-all',
                      textAlign: 'right',
                    }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* QR code */}
              <div style={{
                background: 'var(--bg-light)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px dashed var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                <p style={{ fontWeight: 800, color: 'var(--accent-dark)', margin: 0, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Scan to Pay
                </p>
                <div style={{ padding: '0.75rem', background: 'white', borderRadius: '16px', display: 'inline-block', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', width: '100%', maxWidth: '240px' }}>
                  <img
                    src="https://sode-edu.in/smvitm/wp-content/uploads/2026/04/QR-CODE-ALUMNI.webp"
                    alt="Payment QR Code"
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem', padding: '0 0.5rem' }}>
              Once the transfer is successful, an official receipt will be sent to <strong>{formData.email}</strong> within 7-10 working days after realization of funds.
            </p>
            <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: '100%' }}>
              Back to Home
            </Link>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #4c0d22 0%, var(--accent-dark) 50%, #1e3675 100%)',
        padding: 'clamp(4rem, 8vw, 6rem) 0 clamp(7rem, 12vw, 10rem) 0',
        color: 'white',
        marginBottom: '-6rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', backgroundSize: '200px' }} />
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(197,144,72,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="wrapper" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/giving" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem',
            padding: '10px 22px', borderRadius: '50px',
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)', marginBottom: '2rem',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateX(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateX(0)'; }}
          >
            <ArrowLeft size={18} /> Back to Giving Overview
          </Link>

          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', margin: 0, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Make Your Impact
          </h1>
          <p style={{ marginTop: '1.25rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', lineHeight: 1.6 }}>
            Join a legacy of excellence. Your contribution directly fuels the academic dreams and institutional growth of SMVITM.
          </p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="wrapper">
        <style>{`
          .contribute-layout {
            display: grid;
            grid-template-columns: minmax(280px, 1fr) 2fr;
            gap: 2.5rem;
            align-items: start;
          }
          .form-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          .amount-grid {
            display: grid;
            grid-template-columns: minmax(160px, 1fr) 1.5fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .tax-row {
            display: flex;
            gap: 2rem;
            align-items: flex-start;
          }
          @media (max-width: 900px) {
            .contribute-layout {
              grid-template-columns: 1fr;
            }
          }
          @media (max-width: 600px) {
            .form-grid-2 {
              grid-template-columns: 1fr;
            }
            .amount-grid {
              grid-template-columns: 1fr;
            }
            .tax-row {
              flex-direction: column;
              gap: 1rem;
            }
          }
        `}</style>

        <div className="contribute-layout">

          {/* Left: Policy sidebar */}
          <FadeIn>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-dark)', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', background: 'rgba(123,20,54,0.06)', borderRadius: '10px', color: 'var(--primary-color)', flexShrink: 0 }}>
                  <Info size={20} />
                </div>
                Policy Highlights
              </h3>
              <div style={{ display: 'grid', gap: '1.75rem' }}>
                {[
                  { title: 'Legacy Model', text: 'Principal preservation: Only interest generated is used for scholarships, ensuring a permanent legacy.', icon: <CheckCircle2 size={16} /> },
                  { title: 'Merit First', text: 'Supporting students with >85% marks and family income under ₹10 Lakhs.', icon: <Trophy size={16} /> },
                  { title: 'Named Endowments', text: 'Batches/individuals can establish named scholarships for personalized impact.', icon: <Heart size={16} /> },
                  { title: 'Tax Benefits', text: 'Indian Citizens eligible for 80G Tax Exemption (provide PAN for receipt).', icon: <FileText size={16} /> },
                  { title: 'Transparency', text: 'Accounts are reviewed annually for full accountability.', icon: <ShieldCheck size={16} /> },
                  { title: 'Official Receipts', text: 'Emailed within 7-10 working days of successful funds realization.', icon: <CheckCircle2 size={16} /> },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary-color)', opacity: 0.8 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--primary-color)', marginBottom: '4px' }}>
                        {item.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn>
            <form onSubmit={handleSubmit} style={{
              background: 'white',
              padding: 'clamp(1.5rem, 4vw, 3.5rem)',
              borderRadius: '32px',
              border: '1px solid var(--border-light)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.04)',
            }}>

              {/* Donor Information */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={sectionLabel}><Heart size={20} /> Donor Information</h3>
                <div className="form-grid-2">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input required style={inputStyle} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="As per bank records" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email ID</label>
                    <input required type="email" style={inputStyle} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="For sending receipt" />
                  </div>
                  <div>
                    <label style={labelStyle}>Mobile No.</label>
                    <input required style={inputStyle} value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} placeholder="+91" />
                  </div>
                  <div>
                    <label style={labelStyle}>Batch / Affiliation</label>
                    <input required style={inputStyle} value={formData.batch} onChange={e => setFormData({ ...formData, batch: e.target.value })} placeholder="e.g. 2014-2018 or Faculty" />
                  </div>
                </div>
              </div>

              {/* Contribution Details */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={sectionLabel}><CreditCard size={20} /> Contribution Details</h3>
                <div className="amount-grid">
                  <div>
                    <label style={labelStyle}>Amount (INR)</label>
                    <input required type="number" min="100" style={{ ...inputStyle, fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-color)' }} value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} placeholder="₹ 1000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Purpose of Donation</label>
                    <select required style={inputStyle} value={formData.purpose} onChange={e => setFormData({ ...formData, purpose: e.target.value })}>
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
                  <textarea rows={2} style={inputStyle} value={formData.remarks} onChange={e => setFormData({ ...formData, remarks: e.target.value })} placeholder="Any specific message or dedication..." />
                </div>
              </div>

              {/* Tax Information */}
              <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
                <h3 style={{ ...sectionLabel, color: 'var(--accent-dark)', fontSize: '0.95rem' }}><FileText size={18} /> Tax Information (80G)</h3>
                <div className="tax-row">
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>PAN Number</label>
                    <input style={{ ...inputStyle, background: 'white' }} value={formData.pan} onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })} placeholder="ABCDE1234F" maxLength={10} />
                  </div>
                  <div style={{ flex: 1, paddingTop: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-body)' }}>
                      <input type="checkbox" checked={formData.receive80G} onChange={e => setFormData({ ...formData, receive80G: e.target.checked })} style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)', flexShrink: 0 }} />
                      I require an 80G Tax Exemption Receipt
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button type="submit" formNoValidate className="btn-primary large" style={{ width: '100%', padding: '1.1rem', fontSize: '1.05rem', letterSpacing: '0.5px' }}>
                  Review &amp; Continue to Payment <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                </button>
                <p style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  By clicking continue, you agree to our{' '}
                  <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600 }}>Refund Policy</span> and{' '}
                  <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600 }}>Terms of Service</span>.
                  {' '}Your IP address and session data are logged for security.
                </p>
              </div>

            </form>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
