'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Upload, Trash2, Image, FileText, Link2, Plus, X, ExternalLink } from 'lucide-react';

const MEDIA_TYPES = ['Event', 'Achievement', 'News', 'Document', 'Gallery', 'Other'];

function UploadForm({ onUploaded }) {
  const [form, setForm] = useState({ title: '', description: '', type: 'Event', url: '', file: null });
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef();

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setMsg('Title is required.'); return; }
    setUploading(true);
    setMsg('');

    let fileUrl = form.url;

    // If file selected, upload to Supabase Storage
    if (form.file) {
      const ext = form.file.name.split('.').pop();
      const path = `media/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('alumni-media')
        .upload(path, form.file, { upsert: true, contentType: form.file.type });
      if (uploadError) { setMsg(`Upload error: ${uploadError.message}`); setUploading(false); return; }
      const { data: { publicUrl } } = supabase.storage.from('alumni-media').getPublicUrl(path);
      fileUrl = publicUrl;
    }

    const { error } = await supabase.from('media_items').insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      type: form.type,
      url: fileUrl || null,
    });

    setUploading(false);
    if (error) { setMsg(`Error: ${error.message}`); return; }
    setMsg('');
    setForm({ title: '', description: '', type: 'Event', url: '', file: null });
    if (fileRef.current) fileRef.current.value = '';
    onUploaded();
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'white', borderRadius: '20px', padding: '1.75rem',
      border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      marginBottom: '2rem',
    }}>
      <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.1rem', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Plus size={18} style={{ color: 'var(--primary-color)' }} /> Add Media / Announcement
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={labelStyle}>Title *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Annual Alumni Meet 2025" style={inputStyle} required />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={labelStyle}>Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value)} style={inputStyle}>
            {MEDIA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', gridColumn: '1/-1' }}>
          <label style={labelStyle}>Description</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)}
            rows={2} placeholder="Optional description..." style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }} />
        </div>

        {/* File OR URL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={labelStyle}>Upload File</label>
          <input type="file" ref={fileRef} accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={e => set('file', e.target.files[0] || null)}
            style={{ ...inputStyle, padding: '8px' }} />
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Images, PDFs, documents</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={labelStyle}>Or External URL</label>
          <input value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://..." style={inputStyle} />
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>YouTube, Google Drive, etc.</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
        {msg && <span style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 600 }}>{msg}</span>}
        <button type="submit" disabled={uploading} style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '0.75rem 1.5rem', borderRadius: '12px', border: 'none',
          background: 'var(--primary-color)', color: 'white', cursor: uploading ? 'not-allowed' : 'pointer',
          fontWeight: 700, fontSize: '0.9rem', opacity: uploading ? 0.7 : 1, marginLeft: 'auto',
        }}>
          <Upload size={16} /> {uploading ? 'Uploading...' : 'Add Entry'}
        </button>
      </div>
    </form>
  );
}

export default function AdminMediaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const fetchItems = async () => {
    setLoading(true);
    let q = supabase.from('media_items').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') q = q.eq('type', filter);
    const { data } = await q;
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [filter]);

  const handleDelete = async (item) => {
    setDeleting(item.id);
    // If it was a storage upload, try to remove from storage
    if (item.url?.includes('alumni-media')) {
      const path = item.url.split('/alumni-media/')[1];
      if (path) await supabase.storage.from('alumni-media').remove([path]);
    }
    await supabase.from('media_items').delete().eq('id', item.id);
    setDeleting(null);
    showToast('Item deleted');
    fetchItems();
  };

  const typeColors = { Event: '#7B1436', Achievement: '#C59048', News: '#122147', Document: '#2563eb', Gallery: '#059669', Other: '#6b7280' };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1100px' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 999,
          background: 'var(--accent-dark)', color: 'white', padding: '12px 20px',
          borderRadius: '12px', fontSize: '0.88rem', fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}>{toast}</div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--accent-dark)' }}>Media & Announcements</h1>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Upload files, add external links, and manage portal media.</p>
      </div>

      <UploadForm onUploaded={fetchItems} />

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', ...MEDIA_TYPES].map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            padding: '7px 16px', borderRadius: '999px', border: '1.5px solid',
            borderColor: filter === t ? 'var(--primary-color)' : 'var(--border-light)',
            background: filter === t ? 'var(--primary-color)' : 'white',
            color: filter === t ? 'white' : 'var(--text-muted)',
            cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', textTransform: 'capitalize',
          }}>{t === 'all' ? 'All' : t}</button>
        ))}
      </div>

      {/* Items Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', height: '120px', border: '1px solid var(--border-light)', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '20px', padding: '4rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
          <Image size={40} style={{ color: 'var(--border-light)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>No media items yet. Add one above.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {items.map(item => {
            const color = typeColors[item.type] || '#6b7280';
            const isImage = item.url && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(item.url);
            return (
              <div key={item.id} style={{
                background: 'white', borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}>
                {isImage ? (
                  <div style={{ height: '140px', overflow: 'hidden', background: '#f0f0f0' }}>
                    <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ height: '80px', background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.url ? <Link2 size={28} style={{ color }} /> : <FileText size={28} style={{ color }} />}
                  </div>
                )}
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <p style={{ margin: 0, fontWeight: 800, color: 'var(--accent-dark)', fontSize: '0.9rem', lineHeight: 1.3 }}>{item.title}</p>
                    <span style={{ padding: '2px 8px', background: `${color}18`, color, borderRadius: '999px', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>
                      {item.type}
                    </span>
                  </div>
                  {item.description && (
                    <p style={{ margin: '0 0 0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
                          width: '28px', height: '28px', borderRadius: '7px', border: '1.5px solid var(--border-light)',
                          background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--text-muted)', textDecoration: 'none'
                        }}><ExternalLink size={12} /></a>
                      )}
                      <button onClick={() => handleDelete(item)} disabled={deleting === item.id} style={{
                        width: '28px', height: '28px', borderRadius: '7px', border: 'none',
                        background: 'rgba(220,38,38,0.09)', color: '#dc2626',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}><Trash2 size={12} /></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const labelStyle = { fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' };
const inputStyle = {
  padding: '10px 14px', border: '1.5px solid var(--border-light)', borderRadius: '10px',
  outline: 'none', fontSize: '0.88rem', fontFamily: 'var(--font-body)',
  color: 'var(--text-dark)', width: '100%', boxSizing: 'border-box',
  background: 'var(--bg-light)',
};
