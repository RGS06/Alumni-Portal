'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import FadeIn from '../../../components/ui/FadeIn';
import {
  ArrowLeft, Search, GraduationCap, Briefcase, MapPin,
  ExternalLink, ChevronRight, X, Trophy, Cake
} from 'lucide-react';

const PAGE_SIZE = 20;

function AlumniProfileCard({ profile }) {
  const initials = profile.full_name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  // Format birthday as "15 Mar 1996"
  const formatDOB = (val) => {
    if (!val) return null;
    const d = new Date(val);
    if (isNaN(d)) return null;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const dob = formatDOB(profile.birthday);

  return (
    <div style={{
      background: 'white', borderRadius: '20px', overflow: 'hidden',
      border: profile.is_hall_of_fame ? '1.5px solid rgba(197,144,72,0.4)' : '1px solid var(--border-light)',
      boxShadow: profile.is_hall_of_fame ? '0 4px 24px rgba(197,144,72,0.12)' : '0 2px 12px rgba(0,0,0,0.05)',
      transition: 'all 0.25s cubic-bezier(0.25,0.8,0.25,1)',
      display: 'flex', flexDirection: 'column',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = 'rgba(123,20,54,0.25)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = profile.is_hall_of_fame ? '0 4px 24px rgba(197,144,72,0.12)' : '0 2px 12px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = profile.is_hall_of_fame ? 'rgba(197,144,72,0.4)' : 'var(--border-light)';
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '4px', background: profile.is_hall_of_fame
        ? 'linear-gradient(90deg, #C59048, #e8b860)'
        : 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))' }} />

      <div style={{ padding: '1.25rem 1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>

        {/* ── Row 1: Avatar + Name + HOF badge ── */}
        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.full_name}
              style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', flexShrink: 0 }} />
          ) : (
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--primary-color), #a01c47)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: 800, color: 'white',
            }}>
              {initials}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <p style={{
                margin: 0, fontWeight: 800, color: 'var(--accent-dark)',
                fontSize: '0.95rem', lineHeight: 1.3,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {profile.full_name || 'Unknown'}
              </p>
              {profile.is_hall_of_fame && <Trophy size={13} style={{ color: '#C59048', flexShrink: 0 }} />}
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 700 }}>
              Batch of {profile.batch}
            </p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: '1px', background: 'var(--border-light)' }} />

        {/* ── Row 2: Info pills ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {profile.department && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.79rem', color: 'var(--text-body)' }}>
              <GraduationCap size={13} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.department}</span>
            </span>
          )}
          {dob && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.79rem', color: 'var(--text-body)' }}>
              <Cake size={13} style={{ color: 'var(--secondary-color)', flexShrink: 0 }} />
              {dob}
            </span>
          )}
          {(profile.job_title || profile.company) && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.79rem', color: 'var(--text-muted)' }}>
              <Briefcase size={13} style={{ color: '#6b7280', flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {[profile.job_title, profile.company].filter(Boolean).join(' @ ')}
              </span>
            </span>
          )}
          {profile.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.79rem', color: 'var(--text-muted)' }}>
              <MapPin size={13} style={{ flexShrink: 0 }} /> {profile.location}
            </span>
          )}
        </div>

        {/* ── LinkedIn ── */}
        {profile.linkedin_url && (
          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '5px',
              color: '#0077b5', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none',
            }}>
            <ExternalLink size={11} /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
// Next.js 14: params is a plain object — do NOT use React.use() on it
export default function BatchYearbookPage({ params }) {
  // Direct destructure — works in Next.js 14.x
  const { batch } = params;
  const decodedBatch = decodeURIComponent(batch);

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [departments, setDepartments] = useState([]);

  // Fetches from BOTH profiles (registered) and yearbook_entries (imported)
  const fetchProfiles = async (pageNum = 0, append = false) => {
    const isFirst = pageNum === 0;
    if (isFirst) setLoading(true); else setLoadingMore(true);

    const nameFilter = search.trim();

    try {
      // Parallel fetch both tables
      const [
        { data: pData, count: pCount, error: pErr },
        { data: yeData, error: yeErr },
      ] = await Promise.all([
        // Registered users (profiles table)
        (() => {
          let q = supabase
            .from('profiles')
            .select('*', { count: 'exact' })
            .eq('batch', decodedBatch)
            .order('full_name')
            .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1);
          if (nameFilter) q = q.ilike('full_name', `%${nameFilter}%`);
          if (filterDept) q = q.eq('department', filterDept);
          return q;
        })(),
        // Admin-imported entries — fetch all for this batch
        (() => {
          let q = supabase
            .from('yearbook_entries')
            .select('*')
            .eq('batch', decodedBatch)
            .order('full_name')
            .limit(500);
          if (nameFilter) q = q.ilike('full_name', `%${nameFilter}%`);
          if (filterDept) q = q.eq('department', filterDept);
          return q;
        })(),
      ]);

      if (pErr) console.error('profiles fetch error:', pErr);
      if (yeErr) console.error('yearbook_entries fetch error:', yeErr);

      // Tag source for display
      const profileList = (pData || []).map(p => ({ ...p, _source: 'profile' }));
      const entryList   = (yeData || []).map(e => ({ ...e, _source: 'entry' }));

      // Deduplicate by name+batch — use id when available, else name key
      const seen = new Set();
      const merged = [...profileList, ...entryList].filter(p => {
        const key = p.id || `${p.full_name?.toLowerCase()}-${p.batch}`;
        if (seen.has(key)) return false;
        seen.add(key); return true;
      });

      const total = (pCount || 0) + (yeData?.length || 0);
      if (append) {
        setProfiles(prev => {
          const seenIds = new Set();
          return [...prev, ...merged].filter(p => {
            const k = p.id;
            if (seenIds.has(k)) return false;
            seenIds.add(k); return true;
          });
        });
      } else {
        setProfiles(merged);
      }
      setTotalCount(total);
      setHasMore((pageNum + 1) * PAGE_SIZE < (pCount || 0));
    } catch (err) {
      console.error('fetchProfiles error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchProfiles(0, false);
  }, [decodedBatch, search, filterDept]);

  // Distinct departments from both tables for this batch
  useEffect(() => {
    const fetchDepts = async () => {
      const [{ data: pDepts }, { data: yeDepts }] = await Promise.all([
        supabase.from('profiles').select('department').eq('batch', decodedBatch).not('department', 'is', null),
        supabase.from('yearbook_entries').select('department').eq('batch', decodedBatch).not('department', 'is', null),
      ]);
      const all = [...(pDepts || []), ...(yeDepts || [])].map(d => d.department).filter(Boolean);
      setDepartments([...new Set(all)].sort());
    };
    fetchDepts();
  }, [decodedBatch]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchProfiles(next, true);
  };

  const hasActiveFilters = search.trim() || filterDept;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>

      {/* ── Header ──────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #0a1428 0%, var(--accent-dark) 60%, #1a2d5f 100%)',
        padding: '6rem 0 4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)',
          backgroundSize: '28px 28px', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', right: '-60px', width: '350px', height: '350px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(197,144,72,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="wrapper">
          <Link href="/yearbook" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            fontSize: '0.9rem', fontWeight: 600, marginBottom: '2rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >
            <ArrowLeft size={16} /> Back to Yearbook
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{
                margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)',
                fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px'
              }}>
                Graduating Class
              </p>
              <h1 style={{ color: 'white', fontSize: '5rem', margin: 0, lineHeight: 1, fontWeight: 900, letterSpacing: '-0.04em' }}>
                {decodedBatch}
              </h1>
            </div>

          </div>
        </div>
      </div>

      {/* ── Search + Filter Bar ──────────────────────────────── */}
      <div style={{
        position: 'sticky', top: '70px', zIndex: 100,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-light)',
        padding: '1rem 0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}>
        <div className="wrapper" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder={`Search ${decodedBatch} batch...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '0.8rem 1rem 0.8rem 2.6rem',
                border: '1.5px solid var(--border-light)', borderRadius: '12px',
                outline: 'none', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                background: 'var(--bg-light)', color: 'var(--text-dark)',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(123,20,54,0.4)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
            />
          </div>

          {departments.length > 1 && (
            <select
              value={filterDept}
              onChange={e => setFilterDept(e.target.value)}
              style={{
                padding: '0.8rem 1rem', border: '1.5px solid var(--border-light)',
                borderRadius: '12px', outline: 'none', background: 'var(--bg-light)',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-dark)',
                cursor: 'pointer',
              }}>
              <option value="">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          )}

          {hasActiveFilters && (
            <button onClick={() => { setSearch(''); setFilterDept(''); }} style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(123,20,54,0.08)', color: 'var(--primary-color)',
              border: 'none', borderRadius: '10px', padding: '0.7rem 1rem',
              fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
            }}>
              <X size={13} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ── Profiles Grid ──────────────────────────────────── */}
      <div className="wrapper" style={{ padding: '3rem 2rem 5rem' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '20px', height: '220px',
                border: '1px solid var(--border-light)', animation: 'pulse 1.5s ease infinite',
              }} />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div style={{
            background: 'white', borderRadius: '24px', padding: '5rem 2rem',
            textAlign: 'center', border: '1px solid var(--border-light)',
          }}>
            <GraduationCap size={48} style={{ color: 'var(--border-light)', marginBottom: '1rem' }} />
            <h3 style={{ color: 'var(--accent-dark)', margin: '0 0 0.5rem' }}>No profiles found</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
              {hasActiveFilters ? 'Try adjusting your search or filters.' : `No alumni for Batch ${decodedBatch} yet.`}
            </p>
            {hasActiveFilters && (
              <button onClick={() => { setSearch(''); setFilterDept(''); }} style={{
                marginTop: '1.5rem', background: 'var(--primary-color)', color: 'white',
                border: 'none', borderRadius: '10px', padding: '0.75rem 1.5rem',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem',
            }}>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                {profiles.length === totalCount
                  ? <><strong style={{ color: 'var(--accent-dark)' }}>{totalCount}</strong> alumni in this batch</>  
                  : <>Showing <strong style={{ color: 'var(--accent-dark)' }}>{profiles.length}</strong> of <strong style={{ color: 'var(--accent-dark)' }}>{totalCount}</strong> alumni</>}
              </p>
            </div>

            <FadeIn>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {profiles.map(profile => <AlumniProfileCard key={`${profile._source}-${profile.id}`} profile={profile} />)}
              </div>
            </FadeIn>

            {/* Load More — for profiles table overflow only */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  style={{
                    background: loadingMore ? 'var(--bg-light)' : 'var(--primary-color)',
                    color: loadingMore ? 'var(--text-muted)' : 'white',
                    border: loadingMore ? '1.5px solid var(--border-light)' : 'none',
                    borderRadius: '14px', padding: '1rem 2.5rem',
                    fontWeight: 700, fontSize: '0.95rem', cursor: loadingMore ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  }}>
                  {loadingMore ? (
                    <>
                      <div style={{
                        width: '16px', height: '16px', border: '2px solid rgba(0,0,0,0.2)',
                        borderTopColor: 'var(--text-muted)', borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                      }} />
                      Loading...
                    </>
                  ) : (
                    <>Load More Alumni <ChevronRight size={16} /></>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
