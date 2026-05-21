'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../components/AuthContext';
import { Users, MessageSquare, BookOpen, Trophy, Cake, TrendingUp, Activity, ArrowUpRight } from 'lucide-react';

function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.75rem',
      border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      display: 'flex', flexDirection: 'column', gap: '1rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: `${color}18`, color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} />
        </div>
        <ArrowUpRight size={16} style={{ color: '#ccc' }} />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: 'var(--accent-dark)', lineHeight: 1 }}>{value ?? '—'}</p>
        <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
        {sub && <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color }}>{sub}</p>}
      </div>
    </div>
  );
}

function RecentRow({ name, role, dept, batch, created_at }) {
  const initials = name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
  const ago = created_at ? (() => {
    const diff = (Date.now() - new Date(created_at)) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  })() : '';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 0',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '12px',
        background: 'linear-gradient(135deg, var(--primary-color), #a01c47)',
        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.85rem', fontWeight: 800, flexShrink: 0,
      }}>{initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name || 'Unnamed'}</p>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dept} {batch ? `• Batch ${batch}` : ''}</p>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <span style={{
          display: 'inline-block', padding: '3px 10px', borderRadius: '999px', fontSize: '10px',
          fontWeight: 700, background: 'rgba(123,20,54,0.08)', color: 'var(--primary-color)',
          textTransform: 'uppercase', letterSpacing: '0.5px',
        }}>{role || 'alumni'}</span>
        <p style={{ margin: '3px 0 0', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ago}</p>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: alumni },
        { count: posts },
        { count: hofCount },
        { data: bdData },
        { data: recentProfiles },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('posts').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_hall_of_fame', true),
        supabase.from('profiles').select('birthday').not('birthday', 'is', null),
        supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(7),
      ]);

      const today = new Date();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayMD = `${mm}-${dd}`;
      const bdToday = (bdData || []).filter(p => {
        if (!p.birthday) return false;
        const d = new Date(p.birthday);
        return `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` === todayMD;
      }).length;

      setStats({ alumni, posts, hofCount, bdToday });
      setRecent(recentProfiles || []);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const adminName = user?.user_metadata?.full_name?.split(' ')[0] || 'Admin';

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live Dashboard</span>
        </div>
        <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--accent-dark)', letterSpacing: '-0.02em' }}>
          Welcome back, <span style={{ color: 'var(--primary-color)' }}>{adminName}</span>
        </h1>
        <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Here's an overview of the SMVITM Alumni Portal.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <StatCard label="Total Alumni" value={loading ? '...' : stats.alumni} icon={Users} color="#7B1436" />
        <StatCard label="Forum Posts" value={loading ? '...' : stats.posts} icon={MessageSquare} color="#122147" />
        <StatCard label="Hall of Fame" value={loading ? '...' : stats.hofCount} icon={Trophy} color="#C59048" />
        <StatCard label="Birthdays Today" value={loading ? '...' : stats.bdToday} icon={Cake} color="#e06c2a" sub={stats.bdToday > 0 ? '🎉 Celebrate!' : ''} />
      </div>

      {/* Recent Signups */}
      <div style={{
        background: 'white', borderRadius: '20px', padding: '1.75rem',
        border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--accent-dark)',display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={17} style={{ color: 'var(--primary-color)' }} /> Recent Signups
          </h3>
          <a href="/admin/alumni" style={{ fontSize: '0.82rem', color: 'var(--primary-color)', fontWeight: 700, textDecoration: 'none' }}>
            View All →
          </a>
        </div>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ height: '56px', background: '#f5f5f5', borderRadius: '10px', marginBottom: '8px', animation: 'pulse 1.5s infinite' }} />
          ))
        ) : recent.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No profiles yet.</p>
        ) : (
          recent.map(p => <RecentRow key={p.id} {...p} />)
        )}
      </div>
    </div>
  );
}
