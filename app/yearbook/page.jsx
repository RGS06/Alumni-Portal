'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../components/AuthContext';
import Link from 'next/link';
import FadeIn from '../../components/ui/FadeIn';
import {
  Search, GraduationCap, Star, Trophy, Cake, ArrowRight,
  MapPin, Briefcase, Heart, Sparkles, Users, ChevronRight
} from 'lucide-react';

// ── Birthday Spotlight Card ───────────────────────────────
function BirthdayCard({ profile, onWish, wishedIds }) {
  const initials = profile.full_name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const hasWished = wishedIds.has(profile.id);

  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--border-light)',
      borderRadius: '16px',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: '1 1 280px',
      minWidth: '260px',
      maxWidth: '380px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    }}>
      {/* Subtle left accent */}
      <div style={{
        position: 'absolute', left: 0, top: '20%', bottom: '20%',
        width: '3px', background: 'var(--secondary-color)', borderRadius: '0 2px 2px 0'
      }} />

      {/* Avatar */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt={profile.full_name}
            style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '52px', height: '52px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary-color), #a01c47)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: 800, color: 'white',
          }}>
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-dark)', fontSize: '0.95rem',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {profile.full_name}
        </p>
        <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {[profile.department, profile.batch ? `Batch ${profile.batch}` : null].filter(Boolean).join(' · ')}
        </p>
        {profile.job_title && (
          <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {[profile.job_title, profile.company].filter(Boolean).join(', ')}
          </p>
        )}
      </div>

      {/* Wish button */}
      <button
        onClick={() => onWish(profile.id)}
        disabled={hasWished}
        style={{
          flexShrink: 0,
          background: hasWished ? 'transparent' : 'var(--primary-color)',
          color: hasWished ? 'var(--text-muted)' : 'white',
          border: hasWished ? '1px solid var(--border-light)' : 'none',
          borderRadius: '8px', padding: '7px 14px', fontWeight: 600,
          fontSize: '0.78rem', cursor: hasWished ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', gap: '5px',
          transition: 'all 0.2s ease', whiteSpace: 'nowrap',
        }}>
        <Heart size={12} style={{ fill: hasWished ? 'none' : 'white' }} />
        {hasWished ? 'Sent' : 'Wish'}
      </button>
    </div>
  );
}

// ─── Alumni Profile Card ─────────────────────────────────────
function AlumniCard({ profile }) {
  const initials = profile.full_name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{
      background: 'white', borderRadius: '20px', padding: '1.5rem',
      border: '1px solid var(--border-light)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      transition: 'all 0.25s cubic-bezier(0.25,0.8,0.25,1)',
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = 'rgba(123,20,54,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = 'var(--border-light)';
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt={profile.full_name}
            style={{ width: '62px', height: '62px', borderRadius: '16px', objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{
            width: '62px', height: '62px', borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--primary-color), #a01c47)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', fontWeight: 800, color: 'white', flexShrink: 0,
          }}>
            {initials}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontWeight: 800, color: 'var(--accent-dark)', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {profile.full_name || 'Unknown'}
          </p>
          <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600 }}>
            Batch of {profile.batch}
          </p>
          {profile.is_hall_of_fame && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'rgba(197,144,72,0.15)', color: 'var(--secondary-color)',
              fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', marginTop: '4px'
            }}>
              <Trophy size={10} /> Hall of Fame
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {profile.department && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <GraduationCap size={13} style={{ flexShrink: 0, color: 'var(--primary-color)' }} />
            {profile.department}
          </span>
        )}
        {(profile.job_title || profile.company) && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Briefcase size={13} style={{ flexShrink: 0, color: 'var(--secondary-color)' }} />
            {[profile.job_title, profile.company].filter(Boolean).join(' @ ')}
          </span>
        )}
        {profile.location && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <MapPin size={13} style={{ flexShrink: 0 }} /> {profile.location}
          </span>
        )}
      </div>

      {profile.linkedin_url && (
        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            color: '#0077b5', fontSize: '0.78rem', fontWeight: 700,
            textDecoration: 'none', marginTop: 'auto',
          }}>
          LinkedIn Profile <ChevronRight size={13} />
        </a>
      )}
    </div>
  );
}

// ─── Batch Group Card ────────────────────────────────────────
function BatchGroupCard({ batch, count }) {
  return (
    <Link href={`/yearbook/${batch}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white', borderRadius: '20px',
        border: '1px solid var(--border-light)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        padding: '1.75rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'all 0.25s ease', cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
          e.currentTarget.style.borderColor = 'rgba(123,20,54,0.2)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
          e.currentTarget.style.borderColor = 'var(--border-light)';
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))' }} />
        <div>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: 'var(--accent-dark)', lineHeight: 1 }}>{batch}</p>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            <Users size={13} style={{ display: 'inline', marginRight: '5px' }} />
            {count} {count === 1 ? 'alumni' : 'alumni'}
          </p>
        </div>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: 'rgba(123,20,54,0.06)', color: 'var(--primary-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}

// ─── Hall of Fame Card ───────────────────────────────────────
function HallOfFameCard({ profile }) {
  const initials = profile.full_name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f1c3f 0%, #122147 60%, #1a2d5f 100%)',
      borderRadius: '20px', padding: '2rem',
      border: '1px solid rgba(197,144,72,0.25)',
      boxShadow: '0 8px 32px rgba(18,33,71,0.3)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px',
        background: 'radial-gradient(circle, rgba(197,144,72,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '24px', height: '24px', color: '#C59048', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Trophy size={24} />
      </div>

      {profile.avatar_url ? (
        <img src={profile.avatar_url} alt={profile.full_name}
          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #C59048' }} />
      ) : (
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'rgba(197,144,72,0.2)', border: '3px solid #C59048',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem', fontWeight: 800, color: '#C59048',
        }}>
          {initials}
        </div>
      )}

      <div>
        <p style={{ margin: 0, fontWeight: 800, color: 'white', fontSize: '1.05rem' }}>{profile.full_name}</p>
        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
          {profile.department} • Batch {profile.batch}
        </p>
        {profile.job_title && (
          <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#C59048', fontWeight: 600 }}>
            {profile.job_title}{profile.company ? ` @ ${profile.company}` : ''}
          </p>
        )}
      </div>

      {profile.hall_of_fame_reason && (
        <p style={{
          margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6, fontStyle: 'italic', textAlign: 'center'
        }}>
          "{profile.hall_of_fame_reason}"
        </p>
      )}
    </div>
  );
}

// ─── Main Yearbook Page ──────────────────────────────────────
export default function YearbookPage() {
  const { user } = useAuth();
  const [batches, setBatches] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [hallOfFame, setHallOfFame] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [wishedIds, setWishedIds] = useState(new Set());
  const [activeTab, setActiveTab] = useState('batch'); // 'batch' | 'dept'
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch page data ONCE on mount (batch groups, depts, birthdays, HOF)
  // NOT dependent on `user` — avoids re-fetching (and flashing empty) whenever auth resolves
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayMD = `${mm}-${dd}`; // e.g. "05-21"

        // Helper to fetch all rows for a single column (paginated past the 1000-row default limit)
        const fetchAllColumn = async (table, column) => {
          let allData = [];
          let page = 0;
          while (true) {
            const { data } = await supabase
              .from(table)
              .select(column)
              .not(column, 'is', null)
              .range(page * 1000, (page + 1) * 1000 - 1);
            if (!data || data.length === 0) break;
            allData.push(...data);
            if (data.length < 1000) break;
            page++;
          }
          return allData;
        };

        // Fetch ALL rows that have a birthday (paginated), filter MM-DD in JS.
        // NOTE: .like() does NOT work on PostgreSQL `date` columns (LIKE is text-only).
        // We fetch all non-null birthday rows in pages and match month+day client-side.
        const fetchTodayBirthdays = async (table) => {
          let matched = [];
          let page = 0;
          while (true) {
            const { data } = await supabase
              .from(table)
              .select('*')
              .not('birthday', 'is', null)
              .range(page * 1000, (page + 1) * 1000 - 1);
            if (!data || data.length === 0) break;
            // birthday is stored as "YYYY-MM-DD" — grab the last 5 chars for MM-DD
            data.forEach(p => {
              if (p.birthday && p.birthday.slice(5) === todayMD) matched.push(p);
            });
            if (data.length < 1000) break;
            page++;
          }
          return matched;
        };

        const [
          pBatch, yeBatch,
          pDept, yeDept,
          pBd, yeBd,
          { data: pHof }, { data: yeHof }
        ] = await Promise.all([
          fetchAllColumn('profiles', 'batch'),
          fetchAllColumn('yearbook_entries', 'batch'),
          fetchAllColumn('profiles', 'department'),
          fetchAllColumn('yearbook_entries', 'department'),
          fetchTodayBirthdays('profiles'),
          fetchTodayBirthdays('yearbook_entries'),
          supabase.from('profiles').select('*').eq('is_hall_of_fame',true).limit(8),
          supabase.from('yearbook_entries').select('*').eq('is_hall_of_fame',true).limit(8),
        ]);

        const batchMap = {};
        [...(pBatch||[]), ...(yeBatch||[])].forEach(r => {
          if (r.batch) batchMap[r.batch] = (batchMap[r.batch]||0)+1;
        });
        setBatches(Object.entries(batchMap)
          .map(([batch,count]) => ({ batch, count }))
          .sort((a,b) => b.batch - a.batch));

        const deptMap = {};
        [...(pDept||[]), ...(yeDept||[])].forEach(r => {
          if (r.department) deptMap[r.department] = (deptMap[r.department]||0)+1;
        });
        setDepartments(Object.entries(deptMap)
          .map(([department,count]) => ({ department, count }))
          .sort((a,b) => a.department.localeCompare(b.department)));

        // Merge profiles + yearbook_entries, de-duplicate by (name+batch)
        const seen = new Set();
        const allBirthdays = [...(pBd||[]), ...(yeBd||[])].filter(p => {
          const key = `${p.full_name?.toLowerCase().trim()}-${p.batch}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setBirthdays(allBirthdays);
        setHallOfFame([...(pHof||[]), ...(yeHof||[])].slice(0, 8));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []); // ← empty array: runs once on mount, NOT when user changes

  // ── Fetch birthday wishes separately when user becomes available
  useEffect(() => {
    if (!user) return;
    supabase.from('yearbook_wishes').select('to_user').eq('from_user', user.id)
      .then(({ data }) => {
        if (data) setWishedIds(new Set(data.map(w => w.to_user)));
      });
  }, [user?.id]); // only re-runs if user ID actually changes

  // ── Debounced search with race-condition protection via request counter
  const searchReqRef = useRef(0);
  useEffect(() => {
    // When search is cleared, immediately reset results without waiting
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const reqId = ++searchReqRef.current; // stamp this request
    const timer = setTimeout(async () => {
      const q = searchQuery.trim();
      const filter = `full_name.ilike.%${q}%,department.ilike.%${q}%,batch.ilike.%${q}%,company.ilike.%${q}%,job_title.ilike.%${q}%`;
      const [{ data: pRes }, { data: yeRes }] = await Promise.all([
        supabase.from('profiles').select('*').or(filter).limit(16),
        supabase.from('yearbook_entries').select('*').or(filter).limit(16),
      ]);
      // Discard stale responses — only apply the latest request
      if (reqId !== searchReqRef.current) return;
      const seen = new Set();
      const merged = [...(pRes||[]), ...(yeRes||[])].filter(p => {
        const key = `${p.full_name?.toLowerCase()}-${p.batch}`;
        if (seen.has(key)) return false;
        seen.add(key); return true;
      });
      setSearchResults(merged.slice(0, 24));
      setIsSearching(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);


  // Send birthday wish
  const handleWish = useCallback(async (toUserId) => {
    if (!user) return;
    const { error } = await supabase.from('yearbook_wishes').insert({
      from_user: user.id,
      to_user: toUserId,
      message: '🎉 Happy Birthday! Wishing you a wonderful day!',
      emoji: '🎉',
    });
    if (!error) {
      setWishedIds(prev => new Set([...prev, toUserId]));
    }
  }, [user]);

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>

      {/* ── Page Header ────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #0a1428 0%, var(--accent-dark) 50%, #1a2d5f 100%)',
        padding: '7rem 0 6rem', position: 'relative', overflow: 'hidden',
      }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)',
          backgroundSize: '28px 28px', pointerEvents: 'none',
        }} />
        {/* Gold glow */}
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(197,144,72,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px', width: '350px', height: '350px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,20,54,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <FadeIn className="wrapper">
          <h1 style={{ color: 'white', fontSize: '3.5rem', margin: '0 0 1rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            SMVITM <span style={{ color: '#C59048' }}>Yearbook</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', margin: 0, lineHeight: 1.7, textAlign: 'left' }}>
            Browse alumni by batch or department, celebrate birthdays, and explore the hall of fame. A living archive of every generation.
          </p>
        </FadeIn>
      </div>

      {/* ── Sticky Search Bar ──────────────────────────────── */}
      <div style={{
        position: 'sticky', top: '70px', zIndex: 100,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-light)',
        padding: '1rem 0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        <div className="wrapper" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{
              position: 'absolute', left: '1rem', color: 'var(--text-muted)', pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search by name, batch, department or company..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '0.9rem 1rem 0.9rem 2.75rem',
                border: '1.5px solid var(--border-light)', borderRadius: '14px',
                outline: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                color: 'var(--text-dark)', background: 'var(--bg-light)',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(123,20,54,0.4)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
            />
            {isSearching && (
              <div style={{
                position: 'absolute', right: '1rem', width: '18px', height: '18px',
                border: '2px solid var(--primary-color)', borderTopColor: 'transparent',
                borderRadius: '50%', animation: 'spin 0.7s linear infinite'
              }} />
            )}
          </div>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{
              background: 'none', border: '1.5px solid var(--border-light)', borderRadius: '10px',
              padding: '0.7rem 1rem', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600,
              fontSize: '0.85rem',
            }}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="wrapper" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* ── Search Results ──────────────────────────────── */}
        {isSearchActive && (
          <FadeIn>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--accent-dark)' }}>
                  Search Results
                  <span style={{ marginLeft: '10px', fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    ({searchResults.length} found)
                  </span>
                </h2>
              </div>
              {searchResults.length === 0 && !isSearching ? (
                <div style={{
                  background: 'white', borderRadius: '20px', padding: '4rem 2rem',
                  textAlign: 'center', border: '1px solid var(--border-light)',
                }}>
                  <Search size={40} style={{ color: 'var(--border-light)', marginBottom: '1rem' }} />
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>
                    No alumni found for "{searchQuery}"
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {searchResults.map(profile => <AlumniCard key={profile.id} profile={profile} />)}
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* ── Birthday Spotlight ────────────────────────────── */}
        {!isSearchActive && (
          <FadeIn>
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem'
              }}>
                <Cake size={16} style={{ color: 'var(--secondary-color)' }} />
                <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-dark)' }}>
                  Birthdays Today
                </h2>
                {birthdays.length > 0 && (
                  <span style={{
                    marginLeft: '4px', fontSize: '11px', fontWeight: 700,
                    background: 'rgba(197,144,72,0.12)', color: 'var(--secondary-color)',
                    padding: '2px 9px', borderRadius: '999px', letterSpacing: '0.3px'
                  }}>{birthdays.length}</span>
                )}
              </div>

              {birthdays.length === 0 ? (
                <div style={{
                  background: 'white', border: '1px solid var(--border-light)',
                  borderRadius: '14px', padding: '1.5rem 2rem',
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                }}>
                  <Cake size={18} style={{ color: 'var(--border-light)', flexShrink: 0 }} />
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    No alumni birthdays today. Come back on{' '}
                    <span style={{ color: 'var(--accent-dark)', fontWeight: 600 }}>
                      {new Date(Date.now() + 86400000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                    .
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {birthdays.map(profile => (
                    <BirthdayCard
                      key={profile.id}
                      profile={profile}
                      onWish={handleWish}
                      wishedIds={wishedIds}
                    />
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        )}


        {/* ── Browse Groups ───────────────────────────────── */}
        {!isSearchActive && (
          <FadeIn>
            <div>
              {/* Tab toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--accent-dark)' }}>Browse Alumni</h2>
                <div style={{
                  display: 'flex', background: 'white', borderRadius: '14px',
                  border: '1px solid var(--border-light)', padding: '4px', gap: '4px',
                }}>
                  {['batch', 'dept'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{
                      padding: '8px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                      fontWeight: 700, fontSize: '0.88rem', transition: 'all 0.2s ease',
                      background: activeTab === tab ? 'var(--primary-color)' : 'transparent',
                      color: activeTab === tab ? 'white' : 'var(--text-muted)',
                    }}>
                      {tab === 'batch' ? 'By Batch' : 'By Department'}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: '20px', height: '110px', border: '1px solid var(--border-light)', animation: 'pulse 1.5s ease infinite' }} />
                  ))}
                </div>
              ) : activeTab === 'batch' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  {batches.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1' }}>No batch data available yet.</p>
                  ) : batches.map(({ batch, count }) => (
                    <BatchGroupCard key={batch} batch={batch} count={count} />
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  {departments.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1' }}>No department data available yet.</p>
                  ) : departments.map(({ department, count }) => (
                    <Link key={department} href={`/yearbook?dept=${encodeURIComponent(department)}`} style={{ textDecoration: 'none' }}>
                      <div style={{
                        background: 'white', borderRadius: '20px', padding: '1.5rem',
                        border: '1px solid var(--border-light)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: 'all 0.25s ease', cursor: 'pointer',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; }}
                      >
                        <div>
                          <p style={{ margin: 0, fontWeight: 800, color: 'var(--accent-dark)', fontSize: '0.95rem' }}>{department}</p>
                          <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <Users size={11} style={{ display: 'inline', marginRight: '4px' }} />{count} alumni
                          </p>
                        </div>
                        <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* ── Hall of Fame ────────────────────────────────── */}
        {!isSearchActive && hallOfFame.length > 0 && (
          <FadeIn>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'rgba(197,144,72,0.15)', color: 'var(--secondary-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Trophy size={22} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--accent-dark)' }}>Hall of Fame</h2>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Notable alumni who have made SMVITM proud
                  </p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {hallOfFame.map(profile => <HallOfFameCard key={profile.id} profile={profile} />)}
              </div>
            </div>
          </FadeIn>
        )}

      </div>

      {/* Keyframe styles */}
      <style jsx global>{`
        @keyframes birthdayGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(197,144,72,0.15); }
          50% { box-shadow: 0 0 30px rgba(197,144,72,0.35); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
