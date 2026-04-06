'use client';
import FadeIn from './ui/FadeIn';
import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedAlumni() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -330, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 330, behavior: 'smooth' });
  };

  return (
    <section className="featured-alumni section-padding bg-light">
      <FadeIn className="wrapper">
        <div className="section-header">
          <h2>Featured Alumni</h2>
          <p>Leaders transforming industries across the globe.</p>
        </div>
        
        <div className="slider-container">
          <button className="slider-btn prev-btn" onClick={scrollLeft} aria-label="Previous Alumni">
            <ChevronLeft />
          </button>
          
          <div className="alumni-scroll" ref={scrollRef}>
            <div className="alumni-card">
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem auto' }}>
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="Rahul Kotian" fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--secondary-color)' }} />
              </div>
              <h4>Rahul Kotian</h4>
              <span className="role">Head Projects</span>
              <span className="company">Interior Fit-out</span>
              <p>President of SMVITMAA. Civil Engg, Batch of 2014.</p>
            </div>
            
            <div className="alumni-card">
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem auto' }}>
                <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" alt="Lahari Vaidya" fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--secondary-color)' }} />
              </div>
              <h4>Lahari Vaidya</h4>
              <span className="role">Asst. Professor</span>
              <span className="company">SMVITM</span>
              <p>Secretary of SMVITMAA. E&C Engg, Batch of 2017.</p>
            </div>
            
            <div className="alumni-card">
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem auto' }}>
                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" alt="Allen Jacob" fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--secondary-color)' }} />
              </div>
              <h4>Allen Jacob</h4>
              <span className="role">Mechanical Engineer</span>
              <span className="company">Germany</span>
              <p>Board Member. Mechanical Engg, Batch of 2014.</p>
            </div>
            
            <div className="alumni-card">
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1.5rem auto' }}>
                <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" alt="Shilpa Shetty" fill style={{ objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--secondary-color)' }} />
              </div>
              <h4>Shilpa Shetty</h4>
              <span className="role">Software Engineer</span>
              <span className="company">Apple India</span>
              <p>Board Member. E&C Engg, Batch of 2014.</p>
            </div>
          </div>

          <button className="slider-btn next-btn" onClick={scrollRight} aria-label="Next Alumni">
            <ChevronRight />
          </button>
        </div>
      </FadeIn>
    </section>
  );
}
