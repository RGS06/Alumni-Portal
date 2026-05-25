'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import FadeIn from './ui/FadeIn';
import PhotoGallery from './PhotoGallery';

export default function AlumniVisits({ showHeader = true }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      const { data, error } = await supabase
        .from('spotlights')
        .select('image_url')
        .eq('category', 'visit')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setImages(data.map(row => row.image_url));
      }
      setLoading(false);
    };

    fetchVisits();
  }, []);

  return (
    <section className={`alumni-visits bg-light ${showHeader ? 'section-padding fade-in-up' : ''}`}>
      <FadeIn className={showHeader ? "wrapper" : ""}>
        {showHeader && (
          <div className="section-header">
            <h2>Alumni Campus Visits</h2>
            <p>
              Our alumni frequently return to campus to inspire, mentor, and share their industry experiences with current students.
            </p>
          </div>
        )}
        
        <div style={{ marginTop: showHeader ? '3rem' : '0' }}>
          <PhotoGallery images={images} />
        </div>

        {showHeader && (
          <div className="align-center mt-8">
              <a href="/spotlights" className="btn-outline large">View Full Gallery</a>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
