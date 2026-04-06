'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { ArrowLeft, Send, FileText, Tag, AlignLeft } from 'lucide-react';

const CATEGORIES = ['Career Guidance', 'Higher Studies', 'Internships', 'Technical', 'General'];

export default function CreatePostPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '', category: 'General' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');

    console.log('Post Submission Started:', {
      user_id: user.id
    });

    try {
      const { error: insertError } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          title:   form.title.trim(),
          content: form.content.trim(),
          category: form.category,
          author_name: user?.user_metadata?.full_name || user?.email || 'Anonymous',
          author_role: user?.user_metadata?.role || 'alumni'
        });

      if (insertError) {
        console.error('Supabase Insert Error:', insertError);
        setError(`Submission Failed: ${insertError.message}`);
        setLoading(false);
        return;
      }

      router.push('/community');
    } catch (err) {
      console.error('Unexpected submission error:', err);
      setError(`An unexpected error occurred: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingBottom: '4rem' }}>
        {/* Top bar */}
        <div style={{ background: 'linear-gradient(135deg, var(--accent-dark), #1e3675)', padding: '2.5rem 0' }}>
          <div className="wrapper">
            <Link href="/community" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,.75)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', marginBottom: '1rem' }}>
              <ArrowLeft size={16} /> Back to Forum
            </Link>
            <h1 style={{ color: 'white', fontSize: '2rem', margin: 0 }}>Start a Discussion</h1>
            <p style={{ color: 'rgba(255,255,255,.7)', margin: '6px 0 0', textAlign: 'left' }}>
              Share your knowledge, ask questions, or seek guidance from the community.
            </p>
          </div>
        </div>

        <div className="wrapper" style={{ marginTop: '2rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {/* Author preview */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-soft)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), #5a0f27)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>
                {(user?.user_metadata?.full_name || user?.email || 'U')[0].toUpperCase()}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.95rem', textAlign: 'left' }}>
                  {user?.user_metadata?.full_name || user?.email}
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'left', textTransform: 'capitalize' }}>
                  {user?.user_metadata?.role || 'Member'} · {user?.user_metadata?.department || ''}
                </p>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-soft)' }}>
              {error && (
                <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)', color: '#b91c1c', fontSize: '13px', marginBottom: '1.25rem' }}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Category */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '.3px' }}>
                    <Tag size={14} /> CATEGORY
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {CATEGORIES.map(cat => (
                      <button key={cat} type="button" onClick={() => setForm({ ...form, category: cat })}
                        style={{
                          padding: '7px 16px', borderRadius: '999px', border: '2px solid', cursor: 'pointer',
                          fontSize: '0.85rem', fontWeight: 600, transition: 'all .15s ease',
                          borderColor: form.category === cat ? 'var(--primary-color)' : 'var(--border-light)',
                          background: form.category === cat ? 'rgba(123,20,54,.08)' : 'transparent',
                          color: form.category === cat ? 'var(--primary-color)' : 'var(--text-muted)',
                        }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '.3px' }}>
                    <FileText size={14} /> TITLE
                  </label>
                  <input
                    type="text" required maxLength={150}
                    placeholder="Give your discussion a clear, descriptive title..."
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    style={{
                      width: '100%', padding: '14px 16px', border: '1px solid var(--border-light)',
                      borderRadius: '12px', outline: 'none', fontSize: '1rem', fontFamily: 'var(--font-body)',
                      color: 'var(--text-dark)', transition: 'border-color .15s ease', boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(123,20,54,.4)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                  />
                  <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {form.title.length}/150
                  </div>
                </div>

                {/* Content */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '.3px' }}>
                    <AlignLeft size={14} /> CONTENT
                  </label>
                  <textarea
                    required rows={8} maxLength={5000}
                    placeholder="Share your thoughts, experiences, or questions in detail. More context gets better responses!"
                    value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                    style={{
                      width: '100%', padding: '14px 16px', border: '1px solid var(--border-light)',
                      borderRadius: '12px', outline: 'none', fontSize: '0.95rem', fontFamily: 'var(--font-body)',
                      color: 'var(--text-dark)', resize: 'vertical', lineHeight: 1.7, transition: 'border-color .15s ease', boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(123,20,54,.4)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                  />
                  <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {form.content.length}/5000
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link href="/community" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '13px', borderRadius: '12px', border: '1px solid var(--border-light)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'none', textAlign: 'center' }}>
                    Cancel
                  </Link>
                  <button type="submit" disabled={loading}
                    style={{
                      flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '13px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, var(--primary-color), #5a0f27)',
                      color: 'white', fontWeight: 700, fontSize: '0.95rem',
                      boxShadow: '0 8px 20px rgba(123,20,54,.25)',
                      opacity: loading ? 0.7 : 1,
                    }}>
                    <Send size={16} />
                    {loading ? 'Posting...' : 'Publish Discussion'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
