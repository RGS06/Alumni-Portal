'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Search, Edit2, Trash2, X, Save, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const PAGE_SIZE = 15;
const ROLES = ['alumni', 'student', 'faculty', 'admin', 'superadmin'];
const DEPTS = ['Computer Science', 'E&C Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Information Science', 'Electrical Engineering', 'MBA', 'MCA'];

function EditModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({
    full_name: profile.full_name || '',
    department: profile.department || '',
    batch: profile.batch || '',
    role: profile.role || 'alumni',
    company: profile.company || '',
    job_title: profile.job_title || '',
    location: profile.location || '',
    linkedin_url: profile.linkedin_url || '',
    birthday: profile.birthday || '',
    bio: profile.bio || '',
    is_hall_of_fame: profile.is_hall_of_fame || false,
    hall_of_fame_reason: profile.hall_of_fame_reason || '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    const { error } = await supabase.from('profiles').update({ ...form, updated_at: new Date().toISOString() }).eq('id', profile.id);
    setSaving(false);
    if (error) { setMsg(`Error: ${error.message}`); return; }
    setMsg('Saved ✓');
    setTimeout(() => { onSave(); onClose(); }, 800);
  };

  const field = (label, key, type = 'text', opts = null) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
      {opts ? (
        <select value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle}>
          {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea value={form[key]} onChange={e => set(key, e.target.value)} rows={3}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }} />
      ) : (
        <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle} />
      )}
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(6px)', zIndex: 999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: 'white', borderRadius: '24px', width: '100%', maxWidth: '640px',
        maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-light)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--bg-light)',
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--accent-dark)' }}>Edit Profile</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {field('Full Name', 'full_name')}
          {field('Role', 'role', 'text', ROLES)}
          {field('Department', 'department', 'text', DEPTS)}
          {field('Batch Year', 'batch')}
          {field('Company', 'company')}
          {field('Job Title', 'job_title')}
          {field('Location', 'location')}
          {field('LinkedIn URL', 'linkedin_url')}
          {field('Birthday', 'birthday', 'date')}
          <div style={{ gridColumn: '1/-1' }}>{field('Bio', 'bio', 'textarea')}</div>

          {/* Hall of Fame toggle */}
          <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hall of Fame</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button onClick={() => set('is_hall_of_fame', !form.is_hall_of_fame)} style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                borderRadius: '10px', border: '1.5px solid',
                borderColor: form.is_hall_of_fame ? '#C59048' : 'var(--border-light)',
                background: form.is_hall_of_fame ? 'rgba(197,144,72,0.1)' : 'white',
                color: form.is_hall_of_fame ? '#C59048' : 'var(--text-muted)',
                cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              }}>
                {form.is_hall_of_fame ? <Check size={14} /> : null}
                {form.is_hall_of_fame ? 'In Hall of Fame' : 'Add to Hall of Fame'}
              </button>
            </div>
            {form.is_hall_of_fame && (
              <input
                type="text" value={form.hall_of_fame_reason}
                onChange={e => set('hall_of_fame_reason', e.target.value)}
                placeholder="Reason for recognition..."
                style={inputStyle}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem', borderTop: '1px solid var(--border-light)',
          display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--bg-light)',
        }}>
          <span style={{ fontSize: '0.85rem', color: msg.includes('Error') ? '#e53e3e' : '#22c55e', fontWeight: 600 }}>{msg}</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={onClose} style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', border: '1.5px solid var(--border-light)', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '0.65rem 1.25rem',
              borderRadius: '10px', border: 'none', background: 'var(--primary-color)', color: 'white',
              cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.88rem',
              opacity: saving ? 0.7 : 1,
            }}>
              <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '10px 14px', border: '1.5px solid var(--border-light)', borderRadius: '10px',
  outline: 'none', fontSize: '0.88rem', fontFamily: 'var(--font-body)',
  color: 'var(--text-dark)', width: '100%', boxSizing: 'border-box',
  background: 'var(--bg-light)',
};

export default function AdminAlumniPage() {
  const [profiles, setProfiles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    let q = supabase.from('profiles').select('*', { count: 'exact' });
    if (search.trim()) q = q.ilike('full_name', `%${search.trim()}%`);
    if (filterRole) q = q.eq('role', filterRole);
    q = q.order('created_at', { ascending: false }).range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    const { data, count } = await q;
    setProfiles(data || []);
    setTotal(count || 0);
    setLoading(false);
  }, [search, filterRole, page]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleDelete = async (id) => {
    setDeleting(true);
    await supabase.from('profiles').delete().eq('id', id);
    setDeleting(false);
    setDeleteTarget(null);
    fetch();
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1100px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--accent-dark)' }}>Alumni Profiles</h1>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{total} total profiles</p>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={15} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search by name..."
            style={{ ...inputStyle, paddingLeft: '40px' }}
          />
        </div>
        <select value={filterRole} onChange={e => { setFilterRole(e.target.value); setPage(0); }} style={{ ...inputStyle, width: 'auto' }}>
          <option value="">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-light)', borderBottom: '1px solid var(--border-light)' }}>
                {['Name', 'Dept / Batch', 'Role', 'Company', 'Birthday', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} style={{ padding: '14px 16px' }}>
                        <div style={{ height: '14px', background: '#f0f0f0', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : profiles.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No profiles found.</td></tr>
              ) : profiles.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-dark)' }}>{p.full_name || '—'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{p.id.slice(0, 8)}...</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                    <div>{p.department || '—'}</div>
                    {p.batch && <div style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 600 }}>Batch {p.batch}</div>}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 800,
                      background: 'rgba(123,20,54,0.08)', color: 'var(--primary-color)',
                      textTransform: 'uppercase', letterSpacing: '0.5px'
                    }}>{p.role || 'alumni'}</span>
                    {p.is_hall_of_fame && <span style={{ marginLeft: '6px', fontSize: '12px' }}>🏆</span>}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    {p.job_title ? `${p.job_title}` : ''}
                    {p.company ? <div style={{ fontSize: '0.75rem' }}>{p.company}</div> : '—'}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    {p.birthday ? new Date(p.birthday).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => setSelectedProfile(p)} style={{
                        width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                        background: 'rgba(18,33,71,0.08)', color: 'var(--accent-dark)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }} title="Edit"><Edit2 size={14} /></button>
                      <button onClick={() => setDeleteTarget(p)} style={{
                        width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                        background: 'rgba(220,38,38,0.08)', color: '#dc2626',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Page {page + 1} of {totalPages}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                style={{ ...paginationBtn, opacity: page === 0 ? 0.4 : 1 }}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                style={{ ...paginationBtn, opacity: page >= totalPages - 1 ? 0.4 : 1 }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedProfile && (
        <EditModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} onSave={fetch} />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div style={{
            background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '400px', width: '100%',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--accent-dark)' }}>Delete Profile?</h3>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 1.5rem', fontSize: '0.9rem' }}>
              This will permanently delete <strong>{deleteTarget.full_name}</strong>'s profile. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', border: '1.5px solid var(--border-light)', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteTarget.id)} disabled={deleting} style={{
                padding: '0.65rem 1.5rem', borderRadius: '10px', border: 'none',
                background: '#dc2626', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem',
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

const paginationBtn = {
  padding: '6px 10px', borderRadius: '8px', border: '1.5px solid var(--border-light)',
  background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
};
