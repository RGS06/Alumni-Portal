'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import FadeIn from './ui/FadeIn';
import PhotoGallery from './PhotoGallery';

export default function AlumniEducationists({ showHeader = true }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdu = async () => {
      const { data, error } = await supabase
        .from('spotlights')
        .select('image_url, batch_year')
        .eq('category', 'educationist')
        .order('batch_year', { ascending: false });

      if (!error && data) {
        setImages(data.map(row => row.image_url));
      }
      setLoading(false);
    };

    fetchEdu();
  }, []);

  return (
    <section className={`alumni-visits bg-light ${showHeader ? 'section-padding fade-in-up' : ''}`}>
      <FadeIn className={showHeader ? "wrapper" : ""}>
        {showHeader && (
          <div className="section-header">
            <h2>Eminent Educationists</h2>
            <p>
              Celebrating our alumni who have pursued excellence in academia and are shaping the future of education worldwide.
            </p>
          </div>
        )}
        
        <div style={{ marginTop: showHeader ? '3rem' : '0' }}>
          <PhotoGallery images={images} />
        </div>
      </FadeIn>
    </section>
  );
}
