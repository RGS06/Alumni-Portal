'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/ui/FadeIn';
import { HandCoins, Check, Heart, Trophy, Building, ArrowRight, ExternalLink, X } from 'lucide-react';

export default function GivingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEsc = (e) => {
        if (e.key === 'Escape') setIsModalOpen(false);
      };
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>Give Back to SMVITM</h1>
          <p>Every contribution to the Corpus Fund helps shape the future of our institution and supports meritorious students.</p>
        </FadeIn>
      </section>
      
      {/* CORPUS FUND SUMMARY */}
      <section className="section-padding bg-light">
        <FadeIn className="wrapper giving-split">
          <div className="giving-visual">
            <div className="gold-card">
              <div className="gold-icon"><HandCoins /></div>
              <h3>Alumni Corpus Fund</h3>
              <p style={{ textAlign: 'center', fontSize: '1.25rem', marginBottom: '1.5rem', width: '100%', display: 'block' }}>Supporting Excellence</p>
              <button 
                className="btn-outline-white" 
                style={{ width: '100%' }}
                onClick={() => setIsModalOpen(true)}
              >
                View Policy Details <ExternalLink className="ml-2" size={16} />
              </button>
            </div>
          </div>
          
          <div className="giving-content">
            <h2 style={{ color: 'var(--primary-color)' }}>Empowering Future Engineers</h2>
            <p style={{ textAlign: 'justify' }}>
              The <strong>SMVITM Alumni Corpus Fund</strong> has been established with the core objective of aggregating philanthropic contributions from our alumni network. This centralized fund ensures that your contributions are strategically utilized to maximize institutional impact, maintaining the highest levels of transparency and accountability under the guidance of the Executive Committee.
            </p>
            <p style={{ textAlign: 'justify' }}>
              By contributing to the corpus, you directly participate in the socio-educational mission of SMVITM, ensuring that financial constraints never hinder academic brilliance.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* PILLARS OF IMPACT */}
      <section className="section-padding">
        <FadeIn className="wrapper">
          <div className="section-header">
            <h2>Pillars of Impact</h2>
            <p>How the Corpus Fund is utilized across the campus.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="access-card">
              <div className="ac-icon" style={{ background: 'rgba(123, 20, 54, 0.1)', color: 'var(--primary-color)' }}><Trophy /></div>
              <h3>Merit Scholarships</h3>
              <p style={{ textAlign: 'justify' }}>Providing substantial financial assistance to academically exceptional and economically backward students, ensuring uninterrupted education.</p>
            </div>
            
            <div className="access-card">
              <div className="ac-icon" style={{ background: 'rgba(197, 144, 72, 0.1)', color: 'var(--secondary-color)' }}><Building /></div>
              <h3>Infrastructure</h3>
              <p style={{ textAlign: 'justify' }}>Strategic allocation towards the continuous enhancement of Core Facilities, Labs, and R&D centers keeping SMVITM at the cutting edge.</p>
            </div>
            
            <div className="access-card">
              <div className="ac-icon" style={{ background: 'rgba(18, 33, 71, 0.1)', color: 'var(--accent-dark)' }}><Heart /></div>
              <h3>Student Welfare</h3>
              <p style={{ textAlign: 'justify' }}>Supporting technical projects, national-level competition participation, and holistic well-being initiatives across departments.</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA SECTION */}
      <section className="cta-banner">
         <div className="cta-overlay"></div>
         <FadeIn className="cta-content wrapper">
            <h2>Make Your Contribution Today</h2>
            <p style={{ marginBottom: '2rem' }}>Together, we can build a legacy of excellence and support the next generation of SMVITM engineers.</p>
            
            <div style={{ background: 'var(--white)', padding: '3.5rem', borderRadius: 'var(--radius-lg)', maxWidth: '600px', margin: '0 auto', color: 'var(--text-dark)', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
               <h3 style={{ marginBottom: '1.25rem', color: 'var(--primary-color)', fontSize: '1.75rem', fontWeight: 800 }}>Empower the Future</h3>
               <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1.05rem' }}>
                  Your generosity fuels the dreams of aspiring engineers. Join hundreds of philanthropic alumni in building a world-class institutional legacy.
               </p>
               <Link href="/giving/contribute" className="btn-primary large" style={{ width: '100%', textDecoration: 'none' }}>
                  Contribute Now <ArrowRight className="ml-2" size={20} />
               </Link>
            </div>
         </FadeIn>
      </section>

      {/* REACT PDF MODAL */}
      <div 
        className={`modal-overlay ${isModalOpen ? 'active' : ''}`}
        onClick={(e) => {
          if (e.target.classList.contains('modal-overlay')) setIsModalOpen(false);
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Corpus Fund Policy</h3>
            <button 
              className="modal-close-btn" 
              aria-label="Close Modal"
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </button>
          </div>
          <div className="modal-body">
            <iframe 
              src="https://docs.google.com/viewer?url=https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Alumni-Corpus-Fund-Scanned.pdf&embedded=true" 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }} 
              title="Alumni Corpus Fund Policy"
            />
          </div>
        </div>
      </div>
    </>
  );
}
