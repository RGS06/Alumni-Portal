'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Send, Trash2, Pencil, Clock, Tag } from 'lucide-react';

const ROLE_COLORS = {
  alumni:    { bg: 'rgba(123,20,54,.12)',  color: '#7B1436' },
  student:   { bg: 'rgba(18,33,71,.10)',   color: '#122147' },
  faculty:   { bg: 'rgba(197,144,72,.15)', color: '#a37639' },
  admin:     { bg: 'rgba(123,20,54,.18)',  color: '#7B1436' },
  superadmin:{ bg: 'rgba(197,144,72,.20)', color: '#C59048' },
};

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60)  return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Avatar({ name, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, var(--primary-color), #5a0f27)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700, fontSize: size * 0.38,
    }}>
      {(name || 'U')[0].toUpperCase()}
    </div>
  );
}

function RoleBadge({ role }) {
  const s = ROLE_COLORS[role] || ROLE_COLORS.alumni;
  return (
    <span style={{ padding: '2px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: s.bg, color: s.color, letterSpacing: '.4px' }}>
      {(role || 'member').toUpperCase()}
    </span>
  );
}

function formatContent(text) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'underline' }}>{part}</a>;
    }
    return part;
  });
}

export default function PostDetailPage({ params }) {
  const { postId } = params;
  const { user } = useAuth();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const [deleting, setDeleting] = useState(false);

  const isAdmin = ['admin','superadmin'].includes(user?.user_metadata?.role);
  const isOwnPost = user && post && user.id === post.user_id;

  useEffect(() => {
    async function fetchData() {
      const [{ data: postData }, { data: commentsData }] = await Promise.all([
        supabase.from('posts').select('*').eq('id', postId).single(),
        supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true }),
      ]);
      setPost(postData);
      setComments(commentsData || []);
      if (postData) setEditForm({ title: postData.title, content: postData.content });
      setLoading(false);
    }
    fetchData();
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    setError('');

    const { data, error: err } = await supabase.from('comments').insert({
      post_id:     postId,
      user_id:     user.id,
      content:     commentText.trim(),
      author_name: user?.user_metadata?.full_name || user?.email,
      author_role: user?.user_metadata?.role || 'member',
    }).select().single();

    if (err) {
      setError(err.message);
    } else {
      setComments(prev => [...prev, data]);
      setCommentText('');
    }
    setSubmitting(false);
  };

  const handleDeletePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setDeleting(true);
    await supabase.from('posts').delete().eq('id', postId);
    router.push('/community');
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    const { error: err } = await supabase.from('posts').update({
      title: editForm.title, content: editForm.content
    }).eq('id', postId);
    if (!err) {
      setPost(prev => ({ ...prev, title: editForm.title, content: editForm.content }));
      setEditing(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId);
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingTop: '2rem' }}>
        <div className="wrapper" style={{ maxWidth: '800px', marginTop: '2rem' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-light)', animation: 'pulse 1.5s infinite' }}>
            <div style={{ height: '32px', background: '#f0f0f0', borderRadius: '12px', width: '70%', marginBottom: '1rem' }} />
            <div style={{ height: '16px', background: '#f0f0f0', borderRadius: '12px', width: '40%', marginBottom: '1.5rem' }} />
            <div style={{ height: '180px', background: '#f0f0f0', borderRadius: '12px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--text-muted)' }}>Discussion not found</h2>
        <Link href="/community" style={{ marginTop: '1rem', color: 'var(--primary-color)', fontWeight: 700 }}>← Back to Forum</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', paddingBottom: '4rem', paddingTop: '100px' }}>
      {/* Navigation Bar */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '1.25rem 0', position: 'sticky', top: '105px', zIndex: 100, backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.85)' }}>
        <div className="wrapper">
          <Link href="/community" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px', 
            color: 'var(--accent-dark)', fontSize: '0.9rem', fontWeight: 700, 
            textDecoration: 'none', transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: '8px 20px', borderRadius: '999px',
            background: 'var(--bg-light)', border: '1px solid var(--border-light)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateX(-4px)';
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = 'var(--primary-color)';
              e.currentTarget.style.color = 'var(--primary-color)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(123,20,54,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.background = 'var(--bg-light)';
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.color = 'var(--accent-dark)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
            }}>
            <ArrowLeft size={18} /> Back to Community
          </Link>
        </div>
      </div>

      <div className="wrapper" style={{ maxWidth: '780px', marginTop: '2.5rem' }}>
        {/* Post Card */}
        <div style={{ background: 'white', borderRadius: '28px', padding: '2.25rem', border: '1px solid var(--border-light)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', marginBottom: '1.5rem' }}>
          {editing ? (
            <form onSubmit={handleEditPost}>
              <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} required
                style={{ width: '100%', padding: '14px', border: '1px solid var(--border-light)', borderRadius: '12px', marginBottom: '14px', fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', outline: 'none', boxSizing: 'border-box' }} />
              <textarea value={editForm.content} onChange={e => setEditForm({ ...editForm, content: e.target.value })} required rows={6}
                style={{ width: '100%', padding: '14px', border: '1px solid var(--border-light)', borderRadius: '12px', marginBottom: '14px', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ padding: '11px 24px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 15px rgba(123,20,54,0.15)' }}>Save Changes</button>
                <button type="button" onClick={() => setEditing(false)} style={{ padding: '11px 24px', background: 'transparent', border: '1px solid var(--border-light)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-muted)' }}>Discard</button>
              </div>
            </form>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <RoleBadge role={post.author_role} />
                  <span style={{ padding: '4px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: 'rgba(197,144,72,.1)', color: '#8a6428', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                    {post.category}
                  </span>
                </div>
                {(isOwnPost || isAdmin) && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {isOwnPost && (
                      <button onClick={() => setEditing(true)} title="Edit post"
                        style={{ padding: '8px', borderRadius: '10px', border: '1px solid var(--border-light)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-light)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Pencil size={16} />
                      </button>
                    )}
                    <button onClick={handleDeletePost} disabled={deleting} title="Delete post"
                      style={{ padding: '8px', borderRadius: '10px', border: '1px solid rgba(239,68,68,.2)', background: 'rgba(239,68,68,.03)', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#dc2626', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,.03)'; e.currentTarget.style.color = '#dc2626'; }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              <h1 style={{ fontSize: '2rem', color: 'var(--accent-dark)', marginBottom: '1.1rem', lineHeight: 1.3, fontWeight: 800, letterSpacing: '-0.02em' }}>{post.title}</h1>
              <div style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: '2.25rem' }}>
                {formatContent(post.content)}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '1.75rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <Avatar name={post.author_name} size={40} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ margin: 0, fontWeight: 800, color: 'var(--accent-dark)', fontSize: '0.95rem', textAlign: 'left' }}>{post.author_name || 'Anonymous'}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> Posted {timeAgo(post.created_at)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Comments Section */}
        <div style={{ background: 'white', borderRadius: '28px', padding: '2.25rem', border: '1px solid var(--border-light)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-dark)', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
            <MessageCircle size={20} style={{ color: 'var(--primary-color)' }} />
            {comments.length === 0 ? 'No Replies' : `${comments.length} ${comments.length === 1 ? 'Reply' : 'Replies'}`}
          </h3>

          {/* Comment list */}
          {comments.length === 0 ? (
            <div style={{ padding: '0.5rem 0 2rem', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
              No replies yet. Start the conversation below.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
              {comments.map(c => {
                const canDelete = user && (user.id === c.user_id || isAdmin);
                return (
                  <div key={c.id} style={{ display: 'flex', gap: '15px', padding: '1.25rem', background: 'var(--bg-light)', borderRadius: '18px', border: '1px solid var(--border-light)', position: 'relative' }}>
                    <Avatar name={c.author_name} size={34} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-dark)' }}>{c.author_name || 'Anonymous'}</span>
                        <RoleBadge role={c.author_role} />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'auto', fontWeight: 500 }}>{timeAgo(c.created_at)}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{c.content}</p>
                    </div>
                    {canDelete && (
                      <button onClick={() => handleDeleteComment(c.id)} title="Delete comment"
                        style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(239,68,68,.4)', borderRadius: '8px' }}>
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Add comment */}
          {user ? (
            <form onSubmit={handleComment} style={{ marginTop: '0.5rem' }}>
              {error && (
                <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)', color: '#b91c1c', fontSize: '13px', marginBottom: '1.25rem' }}>
                  {error}
                </div>
              )}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Avatar name={user?.user_metadata?.full_name} size={38} />
                <div style={{ flex: 1, border: '1px solid var(--border-light)', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-light)', transition: 'all 0.2s ease' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(123,20,54,.3)'; e.currentTarget.style.background = 'white'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'var(--bg-light)'; }}>
                  <textarea
                    value={commentText} onChange={e => setCommentText(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={3}
                    style={{ width: '100%', padding: '14px', border: 'none', outline: 'none', resize: 'none', fontSize: '0.92rem', fontFamily: 'var(--font-body)', background: 'transparent', color: 'var(--text-dark)', boxSizing: 'border-box', lineHeight: 1.6 }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 16px', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'rgba(0,0,0,0.01)' }}>
                    <button type="submit" disabled={submitting || !commentText.trim()}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 22px', background: 'linear-gradient(135deg, var(--primary-color), #5a0f27)',
                        color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer',
                        fontSize: '0.9rem', transition: 'all 0.2s ease',
                        boxShadow: '0 4px 12px rgba(123,20,54,0.2)',
                        opacity: (!commentText.trim() || submitting) ? 0.6 : 1
                      }}>
                      <Send size={16} />
                      {submitting ? 'Posting...' : 'Post Reply'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div style={{ padding: '2rem', background: 'var(--bg-light)', borderRadius: '20px', textAlign: 'center', border: '1px dashed var(--border-light)' }}>
              <p style={{ margin: '0 0 15px', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>
                Join the discussion to share your insights.
              </p>
              <Link href="/login" style={{ display: 'inline-block', background: 'var(--primary-color)', color: 'white', padding: '0.75rem 2rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 12px rgba(123,20,54,0.15)' }}>Sign In to Reply</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
