'use client';
import { useState, useEffect } from 'react';
import FadeIn from './ui/FadeIn';
import { HandCoins, Check, ExternalLink, X } from 'lucide-react';

export default function AlumniGiving() {
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
      <section id="giving" className="giving-section section-padding">
        <FadeIn className="wrapper giving-split">
          <div className="giving-visual">
            <div className="gold-card">
              <div className="gold-icon"><HandCoins /></div>
              <h3>Alumni Corpus Fund</h3>
              <p style={{ textAlign: 'center', marginBottom: '1rem' }}>Supporting Excellence</p>
              <button 
                className="btn-outline-white mt-4" 
                onClick={() => setIsModalOpen(true)}
              >
                View Policy Details <ExternalLink className="ml-2" size={16} />
              </button>
            </div>
          </div>
          <div className="giving-content">
            <h2>Leave a Lasting Impact</h2>
            <p>The SMVITM Corpus Fund is dedicated to empowering meritorious students and advancing institutional infrastructure. Your contributions play a profound role in the college&apos;s socio-educational mission.</p>
            <ul className="impact-list">
              <li><Check className="check-icon" /> Fueling purely academic scholarships.</li>
              <li><Check className="check-icon" /> Transparent allocation of funds.</li>
              <li><Check className="check-icon" /> Enhancing R&D and core facilities.</li>
            </ul>
            <button className="btn-secondary large mt-6">Contribute Now</button>
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
              src="/Alumni-corpus-fund.pdf" 
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
