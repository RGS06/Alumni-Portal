'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../components/AuthContext';
import Link from 'next/link';
import { Plus, MessageCircle, Search, Flame, Clock, ChevronRight, BookOpen, Briefcase, GraduationCap, Lightbulb, Users, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  { label: 'All', value: 'all', icon: Users },
  { label: 'Career Guidance', value: 'Career Guidance', icon: Briefcase },
  { label: 'Higher Studies', value: 'Higher Studies', icon: GraduationCap },
  { label: 'Internships', value: 'Internships', icon: BookOpen },
  { label: 'Technical', value: 'Technical', icon: Lightbulb },
  { label: 'General', value: 'General', icon: MessageCircle },
];

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
  return `${Math.floor(diff/86400)}d ago`;
}

function PostCard({ post, commentCounts }) {
  const roleStyle = ROLE_COLORS[post.author_role] || ROLE_COLORS.alumni;
  const count = commentCounts[post.id] ?? 0;

  return (
    <Link href={`/community/${post.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="forum-post-card" style={{
        background: 'white',
        padding: '1.75rem',
        borderRadius: '24px',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-soft)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Top Section */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{
                padding: '4px 12px', borderRadius: '999px', fontSize: '10px', fontWeight: 800,
                background: roleStyle.bg, color: roleStyle.color, letterSpacing: '0.8px',
                textTransform: 'uppercase', boxShadow: `0 2px 10px ${roleStyle.bg}`
              }}>{post.author_role || 'member'}</span>
              
              <span style={{
                padding: '4px 12px', borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                background: 'rgba(197,144,72,.08)', color: '#a37639', letterSpacing: '0.5px'
              }}>{post.category.toUpperCase()}</span>
            </div>
            
            <h3 style={{ 
              fontSize: '1.25rem', 
              color: 'var(--accent-dark)', 
              marginBottom: '10px', 
              lineHeight: 1.35,
              fontWeight: 700,
              letterSpacing: '-0.01em'
            }}>
              {post.title}
            </h3>
            
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-muted)', 
              margin: 0, 
              lineHeight: 1.6,
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden',
              textAlign: 'left'
            }}>
              {post.content}
            </p>
          </div>
          
          <div style={{ 
            width: '36px', height: '36px', borderRadius: '12px', 
            background: 'var(--bg-light)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)',
            transition: 'all 0.2s ease', flexShrink: 0
          }} className="chevron-icon">
            <ChevronRight size={20} />
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          marginTop: '1.5rem', paddingTop: '1.25rem',
          borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary-color), #5a0f27)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: '14px', color: 'white', fontWeight: 800,
              boxShadow: '0 4px 12px rgba(123,20,54,0.15)'
            }}>
              {(post.author_name || 'U')[0].toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-dark)', textAlign: 'left' }}>
                {post.author_name || 'Anonymous'}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'left' }}>
                {timeAgo(post.created_at)}
              </span>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'rgba(123,20,54,0.04)', padding: '6px 14px', 
            borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)' 
          }}>
            <MessageCircle size={15} />
            <span>{count} {count === 1 ? 'Reply' : 'Replies'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [search, setSearch] = useState('');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    // Use a timestamp filter to bypass potential edge/session caching
    let query = supabase.from('posts').select('*');
    
    if (activeCategory !== 'all') query = query.eq('category', activeCategory);
    if (search.trim()) query = query.ilike('title', `%${search.trim()}%`);
    
    // Sort by newest first
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching posts:', error);
    } else if (data) {
      setPosts(data);
      
      // Fetch comment counts for these posts
      const ids = data.map(p => p.id);
      if (ids.length > 0) {
        const { data: counts } = await supabase
          .from('comments')
          .select('post_id')
          .in('post_id', ids);
          
        if (counts) {
          const map = {};
          counts.forEach(c => { map[c.post_id] = (map[c.post_id] || 0) + 1; });
          setCommentCounts(map);
        }
      }
    }
    setLoading(false);
  }, [activeCategory, search]);

  useEffect(() => {
    fetchPosts();
    
    // Optional: Realtime subscription if enabled on the DB
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchPosts]);

  const displayedPosts = sortBy === 'active'
    ? [...posts].sort((a, b) => (commentCounts[b.id] || 0) - (commentCounts[a.id] || 0))
    : posts;

  return (
    <>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--accent-dark) 0%, #1e3675 100%)',
        padding: '4rem 0 3rem',
        color: 'white', textAlign: 'center',
      }}>
        <div className="wrapper">
          <h1 style={{ color: 'white', fontSize: '2.8rem', marginBottom: '0.75rem' }}>Community Forum</h1>
          <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            Ask questions, share insights, and connect with the SMVITM community.
          </p>
          {user && (
            <Link href="/community/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginTop: '1.5rem', background: '#C59048', color: 'white', padding: '0.75rem 1.75rem',
              borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(197,144,72,.4)' }}>
              <Plus size={18} /> New Discussion
            </Link>
          )}
        </div>
      </section>

      <section className="section-padding bg-light">
        <div className="wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }}>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: '110px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-light)', marginBottom: '1rem' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '12px', textAlign: 'left' }}>CATEGORIES</p>
                {CATEGORIES.map(({ label, value, icon: Icon }) => (
                  <button key={value} onClick={() => setActiveCategory(value)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px', width: '100%',
                      padding: '12px 18px', borderRadius: '12px', border: 'none', cursor: 'pointer', marginBottom: '6px',
                      fontWeight: 700, fontSize: '0.92rem', transition: 'all .2s ease',
                      background: activeCategory === value ? 'rgba(123,20,54,0.08)' : 'white',
                      color: activeCategory === value ? 'var(--primary-color)' : 'var(--text-muted)',
                      boxShadow: activeCategory === value ? 'inset 0 0 0 1px rgba(123,20,54,0.1)' : 'none'
                    }}
                    onMouseEnter={e => {
                      if (activeCategory !== value) {
                        e.currentTarget.style.background = 'var(--bg-light)';
                        e.currentTarget.style.color = 'var(--accent-dark)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (activeCategory !== value) {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = 'var(--text-muted)';
                      }
                    }}>
                    <div style={{ width: '20px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} />
                    </div>
                    {label}
                  </button>
                ))}
              </div>

              {!user && (
                <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 12px', textAlign: 'center' }}>Join the conversation!</p>
                  <Link href="/login" style={{ display: 'block', background: 'var(--primary-color)', color: 'white', padding: '0.65rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem' }}>Sign In</Link>
                </div>
              )}
            </div>

            {/* Main Feed */}
            <div>
              {/* Toolbar */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'white', borderRadius: '12px', padding: '10px 16px',
                  border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-soft)' }}>
                  <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search discussions..."
                    style={{ border: 'none', outline: 'none', fontSize: '0.95rem', width: '100%', background: 'transparent', color: 'var(--text-dark)' }} />
                </div>
                <div style={{ display: 'flex', gap: '6px', background: 'white', padding: '6px', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-soft)' }}>
                  {[['latest', Clock], ['active', Flame]].map(([val, Icon]) => (
                    <button key={val} onClick={() => setSortBy(val)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px',
                        borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                        background: sortBy === val ? 'var(--primary-color)' : 'transparent',
                        color: sortBy === val ? 'white' : 'var(--text-muted)',
                      }}>
                      <Icon size={14} /> {val.charAt(0).toUpperCase() + val.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts */}
              {loading ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border-light)', animation: 'pulse 1.5s infinite' }}>
                      <div style={{ height: '14px', background: '#f0f0f0', borderRadius: '8px', width: '30%', marginBottom: '12px' }} />
                      <div style={{ height: '20px', background: '#f0f0f0', borderRadius: '8px', width: '80%', marginBottom: '10px' }} />
                      <div style={{ height: '14px', background: '#f0f0f0', borderRadius: '8px', width: '60%' }} />
                    </div>
                  ))}
                </div>
              ) : displayedPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
                  <MessageCircle size={48} color="var(--border-light)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>No discussions yet</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', margin: '0 0 1.5rem' }}>
                    {search ? 'Try a different search term.' : 'Be the first to start a conversation!'}
                  </p>
                  {user && <Link href="/community/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-color)', color: 'white', padding: '0.65rem 1.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}><Plus size={16} /> Start Discussion</Link>}
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {displayedPosts.map(post => (
                    <PostCard key={post.id} post={post} commentCounts={commentCounts} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
