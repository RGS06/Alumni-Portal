'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../components/AuthContext';
import * as XLSX from 'xlsx';
import {
  Search, Check, Star, Trophy, Cake, Upload, Plus,
  Trash2, Edit2, X, Save, FileSpreadsheet, Users,
  UserPlus, ChevronLeft, ChevronRight, AlertCircle, Download
} from 'lucide-react';

// ── Column mapping for Excel import ──────────────────────────
// Maps common header variations to our field names
const COLUMN_MAP = {
  // Name variants
  'name':                    'full_name',
  'full name':               'full_name',
  'student name':            'full_name',
  'name of the student':     'full_name',
  'name of student':         'full_name',
  'candidate name':          'full_name',
  'candidate':               'full_name',
  'student':                 'full_name',
  // USN → temp field (used to auto-detect department; not saved to DB)
  'usn':                     '_usn',
  'roll no':                 '_usn',
  'roll number':             '_usn',
  'registration no':         '_usn',
  'sl no':                   '_sl',    // ignored, just stops it polluting entries
  // Batch / Year
  'batch':                   'batch',
  'year':                    'batch',
  'graduation year':         'batch',
  'passout':                 'batch',
  'batch year':              'batch',
  // Department
  'department':              'department',
  'dept':                    'department',
  'branch':                  'department',
  // Birthday
  'dob':                     'birthday',
  'date of birth':           'birthday',
  'date of birth dd/mm/yyyy':'birthday',
  'birthday':                'birthday',
  'birth date':              'birthday',
  'date of birth (dd/mm/yyyy)': 'birthday',
  // Job / Company
  'company':                 'company',
  'organisation':            'company',
  'organization':            'company',
  'employer':                'company',
  'designation':             'job_title',
  'job title':               'job_title',
  'role':                    'job_title',
  'position':                'job_title',
  // Location
  'location':                'location',
  'city':                    'location',
  'place':                   'location',
  // LinkedIn
  'linkedin':                'linkedin_url',
  'linkedin url':            'linkedin_url',
};

// ── USN dept-code → canonical full department name ───────────
// USN format: 4MW[YY][DEPT][###]  e.g. 4MW10CS001, 4MW14CV040
const DEPT_CODE_MAP = {
  'CS': 'Computer Science & Engineering',
  'CV': 'Civil Engineering',
  'ME': 'Mechanical Engineering',
  'EC': 'Electronics & Communication Engineering',
  'EE': 'Electrical & Electronics Engineering',
  'IS': 'Information Science & Engineering',
  'AD': 'AI & Data Science',
  'AI': 'AI & Machine Learning',
  'BT': 'Biotechnology',
  'CH': 'Chemical Engineering',
  'MB': 'MBA',
  'MCA': 'MCA',
};

// Also normalize any free-text dept names that might already exist
const DEPT_TEXT_NORM = {
  'cse': 'Computer Science & Engineering',
  'computer science': 'Computer Science & Engineering',
  'cs': 'Computer Science & Engineering',
  'civil': 'Civil Engineering',
  'mechanical': 'Mechanical Engineering',
  'mech': 'Mechanical Engineering',
  'ece': 'Electronics & Communication Engineering',
  'electronics': 'Electronics & Communication Engineering',
  'eee': 'Electrical & Electronics Engineering',
  'ise': 'Information Science & Engineering',
  'information science': 'Information Science & Engineering',
  'aids': 'AI & Data Science',
  'ai & data science': 'AI & Data Science',
  'aiml': 'AI & Machine Learning',
  'ai & machine learning': 'AI & Machine Learning',
};

/** Extract department full name from a USN string like '4MW10CS001' */
const deptFromUSN = (usn) => {
  if (!usn) return null;
  // Match the 2–3 letter dept code after 2-digit year: e.g. 4MW10CS001 → CS
  const m = String(usn).toUpperCase().match(/^[A-Z0-9]{3}\d{2}([A-Z]{2,3})\d/);
  if (!m) return null;
  return DEPT_CODE_MAP[m[1]] || null;
};

/** Normalize a free-text department name to canonical form */
const normalizeDept = (dept) => {
  if (!dept) return null;
  const key = dept.trim().toLowerCase();
  return DEPT_TEXT_NORM[key] || DEPT_CODE_MAP[dept.trim().toUpperCase()] || dept.trim();
};

const REQUIRED_FIELDS = ['full_name'];
const ALL_FIELDS = ['full_name','department','batch','birthday','job_title','company','location','linkedin_url','bio'];
const PAGE_SIZE = 15;

const inputStyle = {
  padding: '10px 14px', border: '1.5px solid var(--border-light)', borderRadius: '10px',
  outline: 'none', fontSize: '0.88rem', fontFamily: 'var(--font-body)',
  color: 'var(--text-dark)', width: '100%', boxSizing: 'border-box', background: 'var(--bg-light)',
};
const labelStyle = { fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' };

// ── Toast helper ─────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
      background: type === 'error' ? '#dc2626' : 'var(--accent-dark)',
      color: 'white', padding: '12px 20px', borderRadius: '12px',
      fontSize: '0.88rem', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      animation: 'slideIn 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px'
    }}>
      {type === 'error' ? <AlertCircle size={15} /> : <Check size={15} />} {msg}
    </div>
  );
}

// ── Manual Add / Edit Modal ───────────────────────────────────
function EntryModal({ entry, onClose, onSave }) {
  const isEdit = !!entry?.id;
  const blank = { full_name:'', department:'', batch:'', birthday:'', job_title:'', company:'', location:'', linkedin_url:'', bio:'', is_hall_of_fame: false, hall_of_fame_reason:'' };
  const [form, setForm] = useState(entry ? { ...blank, ...entry } : blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const { user } = useAuth();

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.full_name.trim()) { setErr('Name is required.'); return; }
    setSaving(true); setErr('');
    const payload = {
      full_name: form.full_name.trim(), department: form.department || null,
      batch: form.batch || null, birthday: form.birthday || null,
      job_title: form.job_title || null, company: form.company || null,
      location: form.location || null, linkedin_url: form.linkedin_url || null,
      bio: form.bio || null, is_hall_of_fame: form.is_hall_of_fame,
      hall_of_fame_reason: form.hall_of_fame_reason || null,
      updated_at: new Date().toISOString(),
    };
    try {
      let error;
      if (isEdit) {
        ({ error } = await supabase.from('yearbook_entries').update(payload).eq('id', entry.id));
      } else {
        ({ error } = await supabase.from('yearbook_entries').insert({ ...payload, added_by: user?.id }));
      }
      if (error) {
        console.error('Supabase error:', error);
        // Give a helpful message for common errors
        if (error.message?.includes('does not exist')) {
          setErr('Table not found. Please run yearbook_entries_schema.sql in Supabase first.');
        } else if (error.code === '42501' || error.message?.includes('policy')) {
          setErr('Permission denied. Ensure your account has admin role in the profiles table.');
        } else {
          setErr(error.message || 'Save failed. Check console for details.');
        }
        return;
      }
      onSave();
      onClose();
    } catch (e) {
      console.error('Unexpected error:', e);
      setErr(`Unexpected error: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };


  const field = (label, key, type='text') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={form[key] || ''} onChange={e => set(key, e.target.value)} style={inputStyle} />
    </div>
  );

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)', zIndex:998, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div style={{ background:'white', borderRadius:'24px', width:'100%', maxWidth:'600px', maxHeight:'90vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 25px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--border-light)', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--bg-light)' }}>
          <h3 style={{ margin:0, fontSize:'1.1rem', color:'var(--accent-dark)' }}>{isEdit ? 'Edit Entry' : 'Add Alumni Manually'}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}><X size={20}/></button>
        </div>

        <div style={{ padding:'1.5rem', overflowY:'auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          {field('Full Name *', 'full_name')}
          {field('Batch Year', 'batch')}
          {field('Department', 'department')}
          {field('Birthday', 'birthday', 'date')}
          {field('Job Title', 'job_title')}
          {field('Company', 'company')}
          {field('Location', 'location')}
          {field('LinkedIn URL', 'linkedin_url', 'url')}
          <div style={{ gridColumn:'1/-1', display:'flex', flexDirection:'column', gap:'5px' }}>
            <label style={labelStyle}>Bio</label>
            <textarea value={form.bio||''} onChange={e => set('bio', e.target.value)} rows={2} style={{ ...inputStyle, resize:'vertical', fontFamily:'var(--font-body)' }} />
          </div>
          <div style={{ gridColumn:'1/-1' }}>
            <button onClick={() => set('is_hall_of_fame', !form.is_hall_of_fame)} style={{
              display:'flex', alignItems:'center', gap:'8px', padding:'8px 16px', borderRadius:'10px',
              border:`1.5px solid ${form.is_hall_of_fame ? '#C59048' : 'var(--border-light)'}`,
              background: form.is_hall_of_fame ? 'rgba(197,144,72,0.1)' : 'white',
              color: form.is_hall_of_fame ? '#C59048' : 'var(--text-muted)',
              cursor:'pointer', fontWeight:700, fontSize:'0.85rem',
            }}>
              {form.is_hall_of_fame ? <Check size={13}/> : <Star size={13}/>}
              {form.is_hall_of_fame ? 'Hall of Fame ✓' : 'Add to Hall of Fame'}
            </button>
            {form.is_hall_of_fame && (
              <input value={form.hall_of_fame_reason||''} onChange={e => set('hall_of_fame_reason', e.target.value)}
                placeholder="Reason for recognition..." style={{ ...inputStyle, marginTop:'0.5rem' }} />
            )}
          </div>
        </div>

        <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid var(--border-light)', display:'flex', gap:'1rem', justifyContent:'space-between', alignItems:'center', background:'var(--bg-light)' }}>
          <span style={{ fontSize:'0.85rem', color:'#dc2626', fontWeight:600 }}>{err}</span>
          <div style={{ display:'flex', gap:'1rem' }}>
            <button onClick={onClose} style={{ padding:'0.65rem 1.25rem', borderRadius:'10px', border:'1.5px solid var(--border-light)', background:'white', cursor:'pointer', fontWeight:700, fontSize:'0.88rem', color:'var(--text-muted)' }}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'0.65rem 1.25rem', borderRadius:'10px', border:'none', background:'var(--primary-color)', color:'white', cursor:saving?'not-allowed':'pointer', fontWeight:700, fontSize:'0.88rem', opacity:saving?0.7:1 }}>
              <Save size={14}/> {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Alumni'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Excel Import Panel ────────────────────────────────────────
function ExcelImportPanel({ onImported }) {
  const { user } = useAuth();
  const fileRef = useRef();
  const [preview, setPreview] = useState(null); // { headers, rows, mapped }
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [result, setResult] = useState(null); // { success, errors }
  const [dragOver, setDragOver] = useState(false);

  const parseFile = (file) => {
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'binary', cellDates: false });

        // ── Process ALL sheets; use sheet tab name as batch if it looks like a year ──
        const allMappedRows = [];
        let combinedHeaders = [];
        let combinedTotal = 0;

        wb.SheetNames.forEach(sheetName => {
          // Determine if the sheet name itself is a 4-digit year (e.g. "2014", "2015")
          const sheetBatch = /^\d{4}$/.test(sheetName.trim()) ? sheetName.trim() : null;

          const ws = wb.Sheets[sheetName];
          const raw = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
          if (raw.length < 2) return; // skip empty sheets

          // Find the header row (first row that has recognizable column names)
          let headerRowIdx = 0;
          for (let ri = 0; ri < Math.min(25, raw.length); ri++) {
            const candidate = (raw[ri] || []).map(h => 
              String(h || '').replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
            );
            if (candidate.some(h => COLUMN_MAP[h] !== undefined)) {
              headerRowIdx = ri;
              break;
            }
          }

          const headers = (raw[headerRowIdx] || []).map(h => String(h || '').replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase());
          const dataRows = raw.slice(headerRowIdx + 1).filter(r => r.some(cell => cell !== '' && cell != null));
          combinedTotal += dataRows.length;

          // Build fieldMap for this sheet
          const fieldMap = {};
          headers.forEach((h, i) => {
            // Try exact match first, then try collapsing whitespace/newlines
            const normalized = h.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
            const mapped = COLUMN_MAP[h] || COLUMN_MAP[normalized];
            if (mapped) fieldMap[i] = mapped;
          });

          if (combinedHeaders.length === 0) {
            combinedHeaders = headers.map((h, i) => ({ raw: h, mapped: fieldMap[i] || null }));
          }

          const mappedRows = dataRows.map(row => {
            const entry = {};
            Object.entries(fieldMap).forEach(([i, field]) => {
              const val = row[i] != null ? String(row[i]).trim() : '';
              if (val) entry[field] = val;
            });
            // Auto-detect department from USN if not already set
            if (!entry.department) {
              const fromUSN = deptFromUSN(entry._usn);
              if (fromUSN) entry.department = fromUSN;
            } else {
              // Normalize any free-text department name
              entry.department = normalizeDept(entry.department);
            }
            // Use sheet name as batch if no batch column found
            if (!entry.batch && sheetBatch) entry.batch = sheetBatch;
            return entry;
          }).filter(r => r.full_name); // must have a name

          allMappedRows.push(...mappedRows);
        });

        if (allMappedRows.length === 0) {
          setPreview({ error: 'No valid rows found. Ensure rows have at least a Name column.' });
          return;
        }

        setPreview({
          headers: combinedHeaders,
          rows: allMappedRows,
          total: combinedTotal,
          skipped: combinedTotal - allMappedRows.length,
        });
      } catch (err) {
        setPreview({ error: `Failed to parse file: ${err.message}` });
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleFile = (file) => {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['xlsx','xls','csv'].includes(ext)) { setPreview({ error: 'Please upload an .xlsx, .xls or .csv file.' }); return; }
    parseFile(file);
  };

  // Only fields that exist in the yearbook_entries table
  const DB_FIELDS = new Set(['full_name','department','batch','birthday','job_title','company','location','linkedin_url','avatar_url','bio','is_hall_of_fame','hall_of_fame_reason','added_by']);

  const handleImport = async () => {
    if (!preview?.rows?.length) return;
    setImporting(true);
    const rows = preview.rows.map(r => {
      // Resolve birthday first
      const birthday = r.birthday ? formatDate(r.birthday) : null;
      // Build payload with only known DB columns
      const payload = { added_by: user?.id };
      Object.entries(r).forEach(([k, v]) => {
        if (DB_FIELDS.has(k) && k !== 'birthday') payload[k] = v || null;
      });
      payload.birthday = birthday;  // already null-safe
      return payload;
    });

    // Batch insert in chunks of 50 to prevent Supabase connection timeouts
    const CHUNK = 50;
    let successCount = 0, errors = [];
    setImportProgress(0);

    for (let i = 0; i < rows.length; i += CHUNK) {
      const chunk = rows.slice(i, i + CHUNK);
      const { error } = await supabase.from('yearbook_entries').insert(chunk);
      
      if (error) {
        // Fallback: If a chunk fails, break it into mini-chunks of 5 instead of 1-by-1
        // (1-by-1 triggers Cloudflare rate limits and causes the app to hang forever)
        const MINI_CHUNK = 5;
        let chunkSuccess = 0;
        let processedInChunk = 0;
        
        for (let j = 0; j < chunk.length; j += MINI_CHUNK) {
          const mini = chunk.slice(j, j + MINI_CHUNK);
          const { error: miniErr } = await supabase.from('yearbook_entries').insert(mini);
          
          if (miniErr) {
            errors.push(`Rows ${i+j+1} to ${i+j+mini.length} failed: ${miniErr.message}`);
          } else {
            chunkSuccess += mini.length;
          }
          processedInChunk += mini.length;
          setImportProgress(i + processedInChunk);
          await new Promise(resolve => setTimeout(resolve, 200)); // Rate limit protection
        }
        successCount += chunkSuccess;
      } else {
        successCount += chunk.length;
        setImportProgress(Math.min(i + CHUNK, rows.length));
      }
      
      // Delay to avoid hitting Supabase API rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setImporting(false);
    setResult({ success: successCount, errors });
    if (successCount > 0) { setPreview(null); onImported(); }
  };

  const formatDate = (val) => {
    // Handle all date format variations seen in Excel files
    if (!val) return null;
    const s = String(val).trim();
    if (!s) return null;

    // 1. Already ISO: YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

    // Month name abbreviation lookup
    const MONTHS = {
      jan:'01', feb:'02', mar:'03', apr:'04', may:'05', jun:'06',
      jul:'07', aug:'08', sep:'09', oct:'10', nov:'11', dec:'12'
    };

    // 2. D-Mon-YY or D-Mon-YYYY  e.g. "9-Dec-92", "16-Apr-92", "3-May-92", "26-May-1990"
    const dMonY = s.match(/^(\d{1,2})[\-\/\s]([A-Za-z]{3,9})[\-\/\s](\d{2}|\d{4})$/);
    if (dMonY) {
      const day = dMonY[1].padStart(2, '0');
      const mon = MONTHS[dMonY[2].toLowerCase().slice(0, 3)];
      if (mon) {
        let yr = dMonY[3];
        if (yr.length === 2) yr = (parseInt(yr) <= 30 ? '20' : '19') + yr;
        return `${yr}-${mon}-${day}`;
      }
    }

    // 3. DD-MM-YYYY or DD/MM/YYYY  e.g. "26-05-1990", "18-09-1992"
    const dmY4 = s.match(/^(\d{1,2})[\-\/](\d{1,2})[\-\/](\d{4})$/);
    if (dmY4) return `${dmY4[3]}-${dmY4[2].padStart(2,'0')}-${dmY4[1].padStart(2,'0')}`;

    // 4. M/D/YYYY or MM/DD/YYYY (US format as seen in second image)  e.g. "9/22/1996", "11/4/1997"
    //    Heuristic: if month part > 12 it must be D/M/YYYY, otherwise treat as M/D/YYYY
    const mdY = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (mdY) {
      const p1 = parseInt(mdY[1]), p2 = parseInt(mdY[2]), yr = mdY[3];
      if (p1 > 12) {
        // Must be D/M/YYYY
        return `${yr}-${mdY[2].padStart(2,'0')}-${mdY[1].padStart(2,'0')}`;
      } else if (p2 > 12) {
        // Must be M/D/YYYY
        return `${yr}-${mdY[1].padStart(2,'0')}-${mdY[2].padStart(2,'0')}`;
      } else {
        // Ambiguous — US Excel files typically store M/D/YYYY
        return `${yr}-${mdY[1].padStart(2,'0')}-${mdY[2].padStart(2,'0')}`;
      }
    }

    // 5. DD-MM-YY or DD/MM/YY e.g. "13-02-92"
    const dmY2 = s.match(/^(\d{1,2})[\-\/](\d{1,2})[\-\/](\d{2})$/);
    if (dmY2) {
      const yr = (parseInt(dmY2[3]) <= 30 ? '20' : '19') + dmY2[3];
      return `${yr}-${dmY2[2].padStart(2,'0')}-${dmY2[1].padStart(2,'0')}`;
    }

    // 6. Excel serial number (number only) — xlsx with cellDates:false may give this
    if (/^\d{4,5}$/.test(s)) {
      const serial = parseInt(s);
      // Excel epoch: Jan 1 1900 = serial 1 (with leap-year bug: serial 60 = Feb 29 1900 which didn't exist)
      const d = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
      if (!isNaN(d)) return d.toISOString().slice(0, 10);
    }

    // 7. Fallback: native Date.parse
    const d = new Date(s);
    if (!isNaN(d)) return d.toISOString().slice(0, 10);

    // 8. Could not parse — return null so the field is left empty
    return null;
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Name', 'Batch', 'Department', 'DOB', 'Designation', 'Company', 'Location', 'LinkedIn'],
      ['Rahul Nayak', '2018', 'Computer Science', '1996-03-15', 'Software Engineer', 'TCS', 'Bengaluru', 'https://linkedin.com/...'],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Alumni');
    XLSX.writeFile(wb, 'alumni_import_template.xlsx');
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      {/* Download Template */}
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <button onClick={downloadTemplate} style={{
          display:'flex', alignItems:'center', gap:'8px', padding:'8px 16px',
          borderRadius:'10px', border:'1.5px solid var(--border-light)',
          background:'white', color:'var(--accent-dark)', cursor:'pointer',
          fontWeight:700, fontSize:'0.82rem',
        }}>
          <Download size={14}/> Download Template
        </button>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--primary-color)' : 'var(--border-light)'}`,
          borderRadius:'20px', padding:'3rem', textAlign:'center', cursor:'pointer',
          background: dragOver ? 'rgba(123,20,54,0.03)' : 'var(--bg-light)',
          transition:'all 0.2s ease',
        }}>
        <FileSpreadsheet size={40} style={{ color: dragOver ? 'var(--primary-color)' : 'var(--text-muted)', marginBottom:'0.75rem' }} />
        <p style={{ margin:'0 0 0.25rem', fontWeight:700, color:'var(--accent-dark)', fontSize:'1rem' }}>
          Drop your Excel / CSV file here
        </p>
        <p style={{ margin:0, fontSize:'0.82rem', color:'var(--text-muted)' }}>
          or click to browse · Supports .xlsx, .xls, .csv
        </p>
        <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{ display:'none' }}
          onChange={e => handleFile(e.target.files[0])} />
      </div>

      {/* Column mapping guide */}
      <div style={{ background:'rgba(18,33,71,0.04)', borderRadius:'14px', padding:'1rem 1.25rem' }}>
        <p style={{ margin:'0 0 0.5rem', fontSize:'11px', fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>Accepted Column Headers</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
          {Object.keys(COLUMN_MAP).slice(0, 16).map(k => (
            <span key={k} style={{ background:'white', border:'1px solid var(--border-light)', borderRadius:'6px', padding:'3px 10px', fontSize:'0.75rem', color:'var(--text-muted)', fontFamily:'monospace' }}>{k}</span>
          ))}
        </div>
      </div>

      {/* Parse Error */}
      {preview?.error && (
        <div style={{ background:'rgba(220,38,38,0.08)', border:'1px solid rgba(220,38,38,0.2)', borderRadius:'12px', padding:'1rem 1.25rem', display:'flex', gap:'10px', alignItems:'center' }}>
          <AlertCircle size={18} style={{ color:'#dc2626', flexShrink:0 }} />
          <p style={{ margin:0, color:'#dc2626', fontSize:'0.88rem', fontWeight:600 }}>{preview.error}</p>
        </div>
      )}

      {/* Preview Table */}
      {preview?.rows?.length > 0 && (
        <div style={{ background:'white', borderRadius:'20px', border:'1px solid rgba(0,0,0,0.06)', overflow:'hidden', boxShadow:'0 4px 16px rgba(0,0,0,0.04)' }}>
          {/* Summary bar */}
          <div style={{ padding:'1rem 1.5rem', borderBottom:'1px solid var(--border-light)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'0.5rem' }}>
            <div style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
              <span style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'0.88rem', fontWeight:700, color:'#22c55e' }}>
                <Check size={15}/> {preview.rows.length} rows ready to import
              </span>
              {preview.skipped > 0 && (
                <span style={{ fontSize:'0.82rem', color:'#f59e0b', fontWeight:600 }}>
                  {preview.skipped} rows skipped (no name)
                </span>
              )}
            </div>
            <button onClick={handleImport} disabled={importing} style={{
              display:'flex', alignItems:'center', gap:'8px', padding:'0.65rem 1.5rem',
              borderRadius:'12px', border:'none', background:'var(--primary-color)', color:'white',
              cursor:importing?'not-allowed':'pointer', fontWeight:700, fontSize:'0.88rem', opacity:importing?0.7:1
            }}>
              <Upload size={14}/> {importing ? `Importing... ${importProgress} / ${preview.rows.length}` : `Import ${preview.rows.length} Alumni`}
            </button>
          </div>

          {/* Column Mapping */}
          <div style={{ padding:'0.75rem 1.5rem', background:'rgba(197,144,72,0.06)', borderBottom:'1px solid var(--border-light)', display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            {preview.headers.filter(h => h.mapped).map(h => (
              <span key={h.raw} style={{ fontSize:'0.75rem', display:'flex', alignItems:'center', gap:'4px' }}>
                <span style={{ background:'white', border:'1px solid var(--border-light)', borderRadius:'4px', padding:'2px 8px', fontFamily:'monospace', color:'var(--text-muted)' }}>{h.raw}</span>
                <span style={{ color:'var(--text-muted)' }}>→</span>
                <span style={{ fontWeight:700, color:'var(--accent-dark)' }}>{h.mapped}</span>
              </span>
            ))}
          </div>

          {/* Data table preview */}
          <div style={{ overflowX:'auto', maxHeight:'320px', overflowY:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.82rem' }}>
              <thead style={{ position:'sticky', top:0 }}>
                <tr style={{ background:'var(--bg-light)', borderBottom:'1px solid var(--border-light)' }}>
                  <th style={thStyle}>#</th>
                  {['Name','Batch','Department','Birthday','Job Title','Company','Location'].map(h => <th key={h} style={thStyle}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {preview.rows.slice(0, 50).map((row, i) => (
                  <tr key={i} style={{ borderBottom:'1px solid rgba(0,0,0,0.04)' }}>
                    <td style={{ ...tdStyle, color:'var(--text-muted)' }}>{i+1}</td>
                    <td style={{ ...tdStyle, fontWeight:700, color:'var(--accent-dark)' }}>{row.full_name||'—'}</td>
                    <td style={tdStyle}>{row.batch||'—'}</td>
                    <td style={tdStyle}>{row.department||'—'}</td>
                    <td style={tdStyle}>{row.birthday||'—'}</td>
                    <td style={tdStyle}>{row.job_title||'—'}</td>
                    <td style={tdStyle}>{row.company||'—'}</td>
                    <td style={tdStyle}>{row.location||'—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {preview.rows.length > 50 && (
              <p style={{ textAlign:'center', padding:'0.75rem', color:'var(--text-muted)', fontSize:'0.8rem' }}>
                ... and {preview.rows.length - 50} more rows
              </p>
            )}
          </div>
        </div>
      )}

      {/* Import Result */}
      {result && (
        <div style={{ background: result.errors.length === 0 ? 'rgba(34,197,94,0.08)' : 'rgba(220,38,38,0.06)', border:`1px solid ${result.errors.length === 0 ? 'rgba(34,197,94,0.25)' : 'rgba(220,38,38,0.2)'}`, borderRadius:'14px', padding:'1.25rem' }}>
          <p style={{ margin:'0 0 0.25rem', fontWeight:700, color: result.errors.length===0 ? '#16a34a' : '#dc2626' }}>
            {result.success > 0 ? `✅ ${result.success} alumni imported successfully!` : '❌ Import failed.'}
          </p>
          {result.errors.map((e,i) => <p key={i} style={{ margin:'4px 0 0', fontSize:'0.8rem', color:'#dc2626' }}>{e}</p>)}
        </div>
      )}
    </div>
  );
}

// ── Entries List (manually added / imported) ──────────────────
function EntriesList({ refresh }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [editTarget, setEditTarget] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [batches, setBatches] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Load distinct batches & departments for filter dropdowns
  useEffect(() => {
    const loadFilters = async () => {
      const [{ data: bData }, { data: dData }] = await Promise.all([
        supabase.from('yearbook_entries').select('batch').not('batch','is',null).limit(10000),
        supabase.from('yearbook_entries').select('department').not('department','is',null).limit(10000),
      ]);
      setBatches([...new Set((bData||[]).map(r=>r.batch))].sort((a,b)=>b-a));
      setDepartments([...new Set((dData||[]).map(r=>r.department))].sort());
    };
    loadFilters();
  }, [refresh]);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    let q = supabase.from('yearbook_entries').select('*', { count:'exact' });
    if (search.trim()) q = q.or(`full_name.ilike.%${search}%,batch.ilike.%${search}%,department.ilike.%${search}%`);
    if (filterBatch) q = q.eq('batch', filterBatch);
    if (filterDept)  q = q.eq('department', filterDept);
    q = q.order('batch', { ascending:false }).order('full_name').range(page*PAGE_SIZE, (page+1)*PAGE_SIZE-1);
    const { data, count } = await q;
    setEntries(data||[]);
    setTotal(count||0);
    setLoading(false);
  }, [search, filterBatch, filterDept, page, refresh]);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  const handleDelete = async () => {
    setDeleting(true);
    await supabase.from('yearbook_entries').delete().eq('id', delTarget.id);
    setDeleting(false);
    setDelTarget(null);
    fetchEntries();
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    try {
      // Step 1: Fetch all matching IDs (bypassing 1000 API limit with limit(10000))
      let idQuery = supabase.from('yearbook_entries').select('id').limit(10000);
      if (filterBatch) idQuery = idQuery.eq('batch', filterBatch);
      else if (filterDept) idQuery = idQuery.eq('department', filterDept);
      const { data: allIds, error: idErr } = await idQuery;
      if (idErr) { console.error('Delete all - fetch IDs error:', idErr); return; }

      // Step 2: Delete in chunks of 500
      const ids = (allIds || []).map(r => r.id);
      const CHUNK = 500;
      for (let i = 0; i < ids.length; i += CHUNK) {
        const chunk = ids.slice(i, i + CHUNK);
        const { error } = await supabase.from('yearbook_entries').delete().in('id', chunk);
        if (error) console.error(`Delete chunk ${i}-${i+CHUNK} error:`, error);
      }
    } finally {
      setDeletingAll(false);
      setShowDeleteAll(false);
      setPage(0);
      fetchEntries();
    }
  };

  const totalPages = Math.ceil(total/PAGE_SIZE);
  const hasFilters = search.trim() || filterBatch || filterDept;
  const deleteAllLabel = filterBatch
    ? `Batch ${filterBatch}`
    : filterDept ? filterDept
    : 'ALL entries';

  const selectStyle = {
    padding:'9px 12px', border:'1.5px solid var(--border-light)', borderRadius:'10px',
    outline:'none', background:'var(--bg-light)', fontFamily:'var(--font-body)',
    fontSize:'0.85rem', color:'var(--text-dark)', cursor:'pointer',
  };

  return (
    <div>
      {/* ── Filter / Action Bar ── */}
      <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.25rem', alignItems:'center', flexWrap:'wrap' }}>
        {/* Search */}
        <div style={{ flex:1, minWidth:'180px', position:'relative', display:'flex', alignItems:'center' }}>
          <Search size={14} style={{ position:'absolute', left:'12px', color:'var(--text-muted)', pointerEvents:'none' }} />
          <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search name, batch or dept..."
            style={{ ...inputStyle, paddingLeft:'34px' }} />
        </div>

        {/* Batch filter */}
        <select value={filterBatch} onChange={e => { setFilterBatch(e.target.value); setPage(0); }} style={selectStyle}>
          <option value="">All Batches</option>
          {batches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        {/* Department filter */}
        <select value={filterDept} onChange={e => { setFilterDept(e.target.value); setPage(0); }} style={selectStyle}>
          <option value="">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        {/* Clear filters */}
        {hasFilters && (
          <button onClick={() => { setSearch(''); setFilterBatch(''); setFilterDept(''); setPage(0); }}
            style={{ padding:'9px 14px', border:'1.5px solid var(--border-light)', borderRadius:'10px', background:'white', color:'var(--text-muted)', cursor:'pointer', fontWeight:600, fontSize:'0.82rem', display:'flex', alignItems:'center', gap:'5px' }}>
            <X size={12}/> Clear
          </button>
        )}

        {/* Entry count */}
        <span style={{ fontSize:'0.82rem', color:'var(--text-muted)', whiteSpace:'nowrap', marginLeft:'auto' }}>{total} entries</span>

        {/* Delete All */}
        <button onClick={() => setShowDeleteAll(true)}
          style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 14px', borderRadius:'10px', border:'1.5px solid rgba(220,38,38,0.3)', background:'rgba(220,38,38,0.06)', color:'#dc2626', cursor:'pointer', fontWeight:700, fontSize:'0.82rem' }}>
          <Trash2 size={13}/> Delete All
        </button>
      </div>

      {/* ── Table ── */}
      <div style={{ background:'white', borderRadius:'16px', overflow:'hidden', border:'1px solid rgba(0,0,0,0.06)', boxShadow:'0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
            <thead>
              <tr style={{ background:'var(--bg-light)', borderBottom:'1px solid var(--border-light)' }}>
                {['Name','Batch','Department','Birthday','Job / Company','HOF','Actions'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? Array.from({length:6}).map((_,i) => (
                <tr key={i}>{Array.from({length:7}).map((__,j) => (
                  <td key={j} style={{ padding:'12px 14px' }}>
                    <div style={{ height:'12px', background:'#f0f0f0', borderRadius:'4px', animation:'pulse 1.5s infinite' }} />
                  </td>
                ))}</tr>
              )) : entries.length===0 ? (
                <tr><td colSpan={7} style={{ padding:'3rem', textAlign:'center', color:'var(--text-muted)' }}>No entries found.</td></tr>
              ) : entries.map(e => (
                <tr key={e.id} style={{ borderBottom:'1px solid rgba(0,0,0,0.04)', transition:'background 0.15s' }}
                  onMouseEnter={ev => ev.currentTarget.style.background='#fafafa'}
                  onMouseLeave={ev => ev.currentTarget.style.background='white'}>
                  <td style={{ ...tdStyle, fontWeight:700, color:'var(--accent-dark)' }}>{e.full_name}</td>
                  <td style={tdStyle}>{e.batch||'—'}</td>
                  <td style={tdStyle}>{e.department||'—'}</td>
                  <td style={tdStyle}>{e.birthday ? new Date(e.birthday).toLocaleDateString('en-IN',{day:'2-digit',month:'short'}) : '—'}</td>
                  <td style={tdStyle}>
                    {e.job_title||''} {e.company ? <span style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>@ {e.company}</span> : ''}
                    {!e.job_title && !e.company && '—'}
                  </td>
                  <td style={{ ...tdStyle, textAlign:'center' }}>{e.is_hall_of_fame ? '🏆' : '—'}</td>
                  <td style={tdStyle}>
                    <div style={{ display:'flex', gap:'6px' }}>
                      <button onClick={() => setEditTarget(e)} style={{ width:'30px', height:'30px', borderRadius:'8px', border:'none', background:'rgba(18,33,71,0.08)', color:'var(--accent-dark)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Edit2 size={13}/></button>
                      <button onClick={() => setDelTarget(e)} style={{ width:'30px', height:'30px', borderRadius:'8px', border:'none', background:'rgba(220,38,38,0.08)', color:'#dc2626', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div style={{ padding:'0.75rem 1.25rem', borderTop:'1px solid var(--border-light)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:'0.8rem', color:'var(--text-muted)' }}>Page {page+1}/{totalPages}</span>
            <div style={{ display:'flex', gap:'6px' }}>
              <button onClick={() => setPage(p=>Math.max(0,p-1))} disabled={page===0} style={{ ...pBtn, opacity:page===0?0.4:1 }}><ChevronLeft size={15}/></button>
              <button onClick={() => setPage(p=>Math.min(totalPages-1,p+1))} disabled={page>=totalPages-1} style={{ ...pBtn, opacity:page>=totalPages-1?0.4:1 }}><ChevronRight size={15}/></button>
            </div>
          </div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editTarget && <EntryModal entry={editTarget} onClose={() => setEditTarget(null)} onSave={() => { setEditTarget(null); fetchEntries(); }} />}

      {/* ── Delete Single Confirm ── */}
      {delTarget && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)', zIndex:998, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ background:'white', borderRadius:'20px', padding:'2rem', maxWidth:'360px', width:'100%', textAlign:'center', boxShadow:'0 25px 60px rgba(0,0,0,0.25)' }}>
            <AlertCircle size={36} style={{ color:'#dc2626', marginBottom:'1rem' }} />
            <h3 style={{ margin:'0 0 0.5rem', color:'var(--accent-dark)' }}>Delete Entry?</h3>
            <p style={{ color:'var(--text-muted)', margin:'0 0 1.5rem', fontSize:'0.9rem' }}>Permanently delete <strong>{delTarget.full_name}</strong>?</p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center' }}>
              <button onClick={() => setDelTarget(null)} style={{ padding:'0.65rem 1.25rem', borderRadius:'10px', border:'1.5px solid var(--border-light)', background:'white', cursor:'pointer', fontWeight:700 }}>Cancel</button>
              <button onClick={handleDelete} disabled={deleting} style={{ padding:'0.65rem 1.25rem', borderRadius:'10px', border:'none', background:'#dc2626', color:'white', cursor:'pointer', fontWeight:700 }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete All Confirm ── */}
      {showDeleteAll && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)', zIndex:998, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ background:'white', borderRadius:'20px', padding:'2rem', maxWidth:'400px', width:'100%', textAlign:'center', boxShadow:'0 25px 60px rgba(0,0,0,0.25)' }}>
            <Trash2 size={36} style={{ color:'#dc2626', marginBottom:'1rem' }} />
            <h3 style={{ margin:'0 0 0.5rem', color:'var(--accent-dark)' }}>Delete {deleteAllLabel}?</h3>
            <p style={{ color:'var(--text-muted)', margin:'0 0 0.25rem', fontSize:'0.9rem' }}>
              This will permanently delete <strong>{total} entries</strong>
              {filterBatch ? ` from Batch ${filterBatch}` : filterDept ? ` from ${filterDept}` : ' from the entire database'}.
            </p>
            <p style={{ color:'#dc2626', margin:'0 0 1.5rem', fontSize:'0.82rem', fontWeight:600 }}>This action cannot be undone.</p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center' }}>
              <button onClick={() => setShowDeleteAll(false)} style={{ padding:'0.65rem 1.25rem', borderRadius:'10px', border:'1.5px solid var(--border-light)', background:'white', cursor:'pointer', fontWeight:700 }}>Cancel</button>
              <button onClick={handleDeleteAll} disabled={deletingAll} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'0.65rem 1.25rem', borderRadius:'10px', border:'none', background:'#dc2626', color:'white', cursor:deletingAll?'not-allowed':'pointer', fontWeight:700, opacity:deletingAll?0.7:1 }}>
                <Trash2 size={14}/> {deletingAll ? 'Deleting...' : `Delete ${total} Entries`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Main Page ─────────────────────────────────────────────────
export default function AdminYearbookPage() {
  const [activeTab, setActiveTab] = useState('import');
  const [showAdd, setShowAdd] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState({ msg:'', type:'success' });

  const showToast = (msg, type='success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg:'', type:'success' }), 3000);
  };

  const onImported = () => {
    showToast('Alumni imported successfully!');
    setRefreshKey(k => k+1);
    setActiveTab('entries');
  };

  return (
    <div style={{ padding:'2.5rem', maxWidth:'1100px' }}>
      <Toast msg={toast.msg} type={toast.type} />

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ margin:0, fontSize:'1.8rem', color:'var(--accent-dark)' }}>Yearbook Management</h1>
          <p style={{ margin:'4px 0 0', color:'var(--text-muted)', fontSize:'0.9rem' }}>Import from Excel, add manually, or edit Hall of Fame entries.</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{
          display:'flex', alignItems:'center', gap:'8px', padding:'0.75rem 1.5rem',
          borderRadius:'12px', border:'none', background:'var(--primary-color)', color:'white',
          cursor:'pointer', fontWeight:700, fontSize:'0.9rem',
        }}>
          <UserPlus size={17}/> Add Manually
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display:'inline-flex', background:'white', borderRadius:'14px', border:'1px solid var(--border-light)', padding:'4px', gap:'4px', marginBottom:'2rem' }}>
        {[
          ['import', FileSpreadsheet, 'Excel Import'],
          ['entries', Users, 'Imported Entries'],
        ].map(([tab, Icon, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            display:'flex', alignItems:'center', gap:'8px', padding:'9px 20px',
            borderRadius:'10px', border:'none', cursor:'pointer',
            background: activeTab===tab ? 'var(--primary-color)' : 'transparent',
            color: activeTab===tab ? 'white' : 'var(--text-muted)',
            fontWeight:700, fontSize:'0.88rem',
          }}>
            <Icon size={15}/>{label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'import' && <ExcelImportPanel onImported={onImported} />}
      {activeTab === 'entries' && <EntriesList refresh={refreshKey} />}

      {/* Manual Add Modal */}
      {showAdd && (
        <EntryModal entry={null} onClose={() => setShowAdd(false)} onSave={() => {
          setShowAdd(false);
          showToast('Alumni added successfully!');
          setRefreshKey(k => k+1);
          setActiveTab('entries');
        }} />
      )}

      <style jsx global>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
      `}</style>
    </div>
  );
}

const thStyle = { padding:'10px 14px', textAlign:'left', fontSize:'10px', fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.8px', whiteSpace:'nowrap' };
const tdStyle = { padding:'11px 14px', color:'var(--text-body)', fontSize:'0.85rem' };
const pBtn = { padding:'5px 9px', borderRadius:'7px', border:'1.5px solid var(--border-light)', background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' };
