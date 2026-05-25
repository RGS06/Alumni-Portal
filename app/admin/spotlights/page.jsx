'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';

export default function AdminSpotlights() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ category: 'visit', image_url: '', batch_year: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('spotlights')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching spotlights:", error);
    else setRecords(data || []);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.image_url) return;
    setSaving(true);

    const { error } = await supabase.from('spotlights').insert([
      {
        category: formData.category,
        image_url: formData.image_url,
        batch_year: formData.batch_year || null
      }
    ]);

    if (error) {
      console.error("Error adding record:", error);
      alert("Failed to add record.");
    } else {
      setFormData({ category: 'visit', image_url: '', batch_year: '' });
      fetchRecords();
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    const { error } = await supabase.from('spotlights').delete().eq('id', id);
    if (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    } else {
      fetchRecords();
    }
  };

  const handleMigrateOldData = async () => {
    const visits = [
      "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Christan.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Deviprasad.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ganesh-Hatwar.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Jathin.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Dhiraj-Jogi.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Kishor.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Srinivas-and-shreesha.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Shivaprasad.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Vineeth-Sampath-and-others.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Nikhil-Shetty.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Priyanka-K-P.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Rakshith-Alva.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Shreesha.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Shreya-Shetty.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Srinath-Patkar.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Vaishakh.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Suhas.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Rashmitha.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Niveditha.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Gautham-Shet.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Sukitha.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Chidanand.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Dhanish-Shastri.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ratnashree-and-others.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Akarsh.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Dhanraj-Ranjani.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Sridhar.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Deepthi-guruprasad.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Preetham-rohan-pavan.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Srihari.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Claton.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ashwath-Shetty.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Adith-Holla.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Sinchana.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Usha-H.webp", "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Vidisha-P-Shet.webp"
    ].map(url => ({ category: 'visit', image_url: url, batch_year: null }));
    
    const eduImages = [
      { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-Puneeth-Acharya.webp", year: "2021" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ms._VAISHALI_BANGERA.webp", year: "2020" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-HITHESH-MENDON.webp", year: "2019" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Dr.-Krishnaraj-Chadaga.webp", year: "2018" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Chandana.webp", year: "2017" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ms.-LAHARI-VAIDYA.webp", year: "2017" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-Shreenidhi-H-Bhat.webp", year: "2016" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/SHANKAR-SHENOY.webp", year: "2016" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/AJESH.webp", year: "2016" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Lavanya.webp", year: "2015" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-Bhargav.webp", year: "2015" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-GANESH-U-G.webp", year: "2015" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-ROSHAN-S-KOTIAN.webp", year: "2015" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ms._Ramyashree.webp", year: "2015" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Musica_Supriya.webp", year: "2015" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Prathwin-raj.webp", year: "2015" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Anusha-B-Rao.webp", year: "2015" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ms.-HARSHITHA-BHAT.webp", year: "2014" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Shwetha-Kamath.webp", year: "2014" }, { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Amrutha-Bhat.webp", year: "2014" }
    ].map(item => ({ category: 'educationist', image_url: item.url, batch_year: item.year }));

    const allRecords = [...visits, ...eduImages];
    if (confirm("This will migrate all 56 hardcoded images to the database. Proceed?")) {
      setSaving(true);
      const { error } = await supabase.from('spotlights').insert(allRecords);
      if (error) alert("Migration failed: " + error.message);
      else {
        alert("Migration successful!");
        fetchRecords();
      }
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1100px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--accent-dark)', letterSpacing: '-0.02em' }}>
          Spotlights Manager
        </h1>
        <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Upload WordPress URLs for Alumni Visits and Eminent Educationists.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem' }}>
        
        {/* Form Container */}
        <div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Plus size={18} /> Add New Image</h3>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Category</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                >
                  <option value="visit">Campus Visit</option>
                  <option value="educationist">Eminent Educationist</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Image URL (WordPress Link)</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://..."
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Batch Year (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2018"
                  value={formData.batch_year}
                  onChange={e => setFormData({...formData, batch_year: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>

              <button disabled={saving} type="submit" style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem' }}>
                {saving ? 'Saving...' : 'Add Image'}
              </button>
            </form>
          </div>

          {records.length === 0 && !loading && (
             <div style={{ marginTop: '1.5rem', background: 'rgba(197, 144, 72, 0.1)', border: '1px solid #c59048', padding: '1.5rem', borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-dark)' }}>Initial Setup</h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>You currently have 0 records in the database. Would you like to automatically import the 56 existing hardcoded images?</p>
                <button onClick={handleMigrateOldData} disabled={saving} style={{ background: '#c59048', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, width: '100%' }}>
                  Migrate 56 Old Records
                </button>
             </div>
          )}
        </div>

        {/* List Container */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}><ImageIcon size={18} /> Manage Images ({records.length})</h3>
          
          {loading ? (
            <p>Loading...</p>
          ) : records.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No images found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {records.map(r => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', border: '1px solid #eee', borderRadius: '8px' }}>
                  <img src={r.image_url} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{r.category === 'visit' ? 'Campus Visit' : 'Educationist'}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.image_url}</p>
                    {r.batch_year && <span style={{ display: 'inline-block', background: '#f0f0f0', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', marginTop: '4px' }}>Batch {r.batch_year}</span>}
                  </div>
                  <button onClick={() => handleDelete(r.id)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', padding: '0.5rem' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
