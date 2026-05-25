'use client';

import FadeIn from './ui/FadeIn';
import { ExternalLink, Image as ImageIcon, Camera } from 'lucide-react';

export default function AlumnestAlbum() {
  // Using some of your existing WordPress images to make the polaroids look authentic!
  const polaroids = [
    { src: 'https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Sukitha.webp', rotate: '-8deg', z: 1, x: '-20px', y: '10px' },
    { src: 'https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Rakshith-Alva.webp', rotate: '5deg', z: 2, x: '80px', y: '-30px' },
    { src: 'https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ratnashree-and-others.webp', rotate: '-2deg', z: 3, x: '30px', y: '40px' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto 4rem auto', padding: '0 2rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--accent-dark) 0%, #1e3675 100%)',
        borderRadius: '24px',
        padding: '4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        boxShadow: '0 25px 50px rgba(18, 33, 71, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decor */}
        <div style={{
          position: 'absolute', width: '300px', height: '300px', 
          background: 'radial-gradient(circle, rgba(197, 144, 72, 0.15) 0%, transparent 70%)',
          top: '-100px', left: '-100px', borderRadius: '50%'
        }} />

        {/* Text Content */}
        <div style={{ position: 'relative', zIndex: 10, color: 'white' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(197, 144, 72, 0.2)', padding: '6px 16px', borderRadius: '99px', color: 'var(--secondary-color)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            <Camera size={16} /> Official Gallery
          </div>
          <h2 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1rem', lineHeight: 1 }}>ALUMNEST</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Relive the memories, the laughter, and the connections from our grand annual alumni meet. Dive into the official photo album and spot your friends!
          </p>
          
          <a 
            href="https://photos.app.goo.gl/JafV6TLjLWpf13yq5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}
          >
            <ImageIcon size={20} /> View Google Photos Album <ExternalLink size={18} />
          </a>
        </div>

        {/* Interactive Polaroids */}
        <div style={{ position: 'relative', height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1000px' }}>
          {polaroids.map((p, i) => (
            <div 
              key={i} 
              className="alumnest-polaroid"
              style={{
                position: 'absolute',
                width: '220px',
                height: '240px',
                background: 'white',
                padding: '12px 12px 40px 12px',
                borderRadius: '8px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                transform: `translateX(${p.x}) translateY(${p.y}) rotate(${p.rotate})`,
                zIndex: p.z,
                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                <img src={p.src} alt="Alumnest Memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
          
          {/* Add CSS hover effects globally via style tag to avoid modifying globals.css for a single component */}
          <style dangerouslySetInnerHTML={{__html: `
            .alumnest-polaroid:hover {
              transform: scale(1.15) translateY(-20px) rotate(0deg) !important;
              z-index: 50 !important;
              box-shadow: 0 30px 60px rgba(0,0,0,0.5) !important;
            }
            @media (max-width: 768px) {
              .alumnest-polaroid { width: 150px !important; height: 170px !important; }
            }
          `}} />
        </div>
      </div>
    </div>
  );
}
