'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { MessageSquare, Trash2, Eye, AlertTriangle, MessageCircle, ChevronRight } from 'lucide-react';

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function AdminModerationPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2800); };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(60);
    setPosts(data || []);
    setLoading(false);
  }, []);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('comments').select('*, posts(title)').order('created_at', { ascending: false }).limit(60);
    setComments(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (activeTab === 'posts') fetchPosts();
    else fetchComments();
  }, [activeTab, fetchPosts, fetchComments]);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setDeleting(confirmTarget.id);
    const table = activeTab === 'posts' ? 'posts' : 'comments';
    const { error } = await supabase.from(table).delete().eq('id', confirmTarget.id);
    setDeleting(null);
    setConfirmTarget(null);
    if (!error) {
      showToast(`${activeTab === 'posts' ? 'Post' : 'Comment'} deleted`);
      if (activeTab === 'posts') fetchPosts(); else fetchComments();
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1100px' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 999,
          background: '#dc2626', color: 'white', padding: '12px 20px',
          borderRadius: '12px', fontSize: '0.88rem', fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}>{toast}</div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--accent-dark)' }}>Content Moderation</h1>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Review and remove community posts and comments.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'inline-flex', background: 'white', borderRadius: '14px', border: '1px solid var(--border-light)', padding: '4px', gap: '4px', marginBottom: '1.5rem' }}>
        {[['posts', MessageSquare, 'Posts'], ['comments', MessageCircle, 'Comments']].map(([tab, Icon, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 20px',
            borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: activeTab === tab ? 'var(--primary-color)' : 'transparent',
            color: activeTab === tab ? 'white' : 'var(--text-muted)',
            fontWeight: 700, fontSize: '0.88rem',
          }}>
            <Icon size={15} />{label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        {loading ? (
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: '72px', background: '#f5f5f5', borderRadius: '12px', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : (activeTab === 'posts' ? posts : comments).length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <MessageSquare size={40} style={{ color: 'var(--border-light)', marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>No {activeTab} found.</p>
          </div>
        ) : activeTab === 'posts' ? (
          posts.map(post => (
            <div key={post.id} style={{
              display: 'flex', gap: '1rem', padding: '1.1rem 1.5rem',
              borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'flex-start',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
              onMouseLeave={e => e.currentTarget.style.background = 'white'}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(123,20,54,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', flexShrink: 0,
              }}>
                <MessageSquare size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</p>
                <p style={{ margin: '3px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  by <strong>{post.author_name || 'Unknown'}</strong> · {post.category} · {timeAgo(post.created_at)}
                </p>
                <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#888', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.content}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <a href={`/community/${post.id}`} target="_blank" rel="noopener noreferrer" style={{
                  width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid var(--border-light)',
                  background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', textDecoration: 'none',
                }} title="View post"><Eye size={14} /></a>
                <button onClick={() => setConfirmTarget(post)} style={{
                  width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                  background: 'rgba(220,38,38,0.09)', color: '#dc2626',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }} title="Delete post"><Trash2 size={14} /></button>
              </div>
            </div>
          ))
        ) : (
          comments.map(comment => (
            <div key={comment.id} style={{
              display: 'flex', gap: '1rem', padding: '1.1rem 1.5rem',
              borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'flex-start',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
              onMouseLeave={e => e.currentTarget.style.background = 'white'}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(18,33,71,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-dark)', flexShrink: 0,
              }}>
                <MessageCircle size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  by <strong style={{ color: 'var(--accent-dark)' }}>{comment.author_name || 'Unknown'}</strong>
                  {comment.posts?.title && <> on <em>"{comment.posts.title}"</em></>}
                  · {timeAgo(comment.created_at)}
                </p>
                <p style={{ margin: '6px 0 0', fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                  {comment.content}
                </p>
              </div>
              <button onClick={() => setConfirmTarget(comment)} style={{
                width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                background: 'rgba(220,38,38,0.09)', color: '#dc2626', flexShrink: 0,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Trash2 size={14} /></button>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirm */}
      {confirmTarget && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div style={{
            background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '400px', width: '100%',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)', textAlign: 'center',
          }}>
            <AlertTriangle size={40} style={{ color: '#dc2626', marginBottom: '1rem' }} />
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--accent-dark)' }}>
              Delete {activeTab === 'posts' ? 'Post' : 'Comment'}?
            </h3>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 1.5rem', fontSize: '0.9rem' }}>
              {activeTab === 'posts' ? (
                <>This will permanently delete <strong>"{confirmTarget.title}"</strong> and all its comments.</>
              ) : (
                <>This will permanently delete this comment by <strong>{confirmTarget.author_name}</strong>.</>
              )}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setConfirmTarget(null)} style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', border: '1.5px solid var(--border-light)', background: 'white', cursor: 'pointer', fontWeight: 700 }}>
                Cancel
              </button>
              <button onClick={handleDelete} disabled={!!deleting} style={{
                padding: '0.65rem 1.5rem', borderRadius: '10px', border: 'none',
                background: '#dc2626', color: 'white', cursor: 'pointer', fontWeight: 700,
                opacity: deleting ? 0.7 : 1,
              }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
