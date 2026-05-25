'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedIndex(null);
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedIndex]);

  const showNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{ color: 'var(--text-muted)' }}>No images available yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="photo-gallery-wall">
        {images.map((url, index) => (
          <div key={index} className="gallery-item group" onClick={() => setSelectedIndex(index)}>
            <img src={url} alt={`Gallery Image ${index + 1}`} loading="lazy" />
            <div className="gallery-overlay">
              <span className="view-text">View Poster</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal using Portal to escape CSS transform bounds */}
      {mounted && selectedIndex !== null && createPortal(
        <div className="lightbox-overlay active" onClick={(e) => { if (e.target.classList.contains('lightbox-overlay')) setSelectedIndex(null); }}>
          <button className="lightbox-close" onClick={() => setSelectedIndex(null)} aria-label="Close">
            <X size={32} />
          </button>
          
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); showPrev(); }} aria-label="Previous">
            <ChevronLeft size={40} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img key={selectedIndex} src={images[selectedIndex]} alt={`Gallery Image ${selectedIndex + 1}`} />
          </div>

          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); showNext(); }} aria-label="Next">
            <ChevronRight size={40} />
          </button>
          
          <div className="lightbox-counter">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
