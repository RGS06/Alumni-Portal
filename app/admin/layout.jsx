'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminRoute from '../../components/AdminRoute';
import {
  LayoutDashboard, Users, BookOpen, MessageSquare,
  Image, Settings, ChevronRight, Menu, X, Shield
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview',     href: '/admin',             icon: LayoutDashboard },
  { label: 'Alumni Profiles', href: '/admin/alumni',   icon: Users },
  { label: 'Yearbook',     href: '/admin/yearbook',    icon: BookOpen },
  { label: 'Moderation',   href: '/admin/moderation',  icon: MessageSquare },
  { label: 'Media',        href: '/admin/media',       icon: Image },
];

function AdminSidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  return (
    <aside style={{
      width: collapsed ? '64px' : '220px',
      background: 'linear-gradient(180deg, #0a1428 0%, var(--accent-dark) 100%)',
      height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 200,
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.25s ease',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '1.25rem 0' : '1.25rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        minHeight: '64px',
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={18} style={{ color: '#C59048', flexShrink: 0 }} />
            <span style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
              ADMIN PANEL
            </span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px',
          width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
          flexShrink: 0,
        }}>
          {collapsed ? <Menu size={15} /> : <X size={15} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname?.startsWith(href));
          return (
            <Link key={href} href={href} title={collapsed ? label : undefined} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: collapsed ? '12px 0' : '11px 14px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: '10px', textDecoration: 'none',
              background: active ? 'rgba(197,144,72,0.18)' : 'transparent',
              border: active ? '1px solid rgba(197,144,72,0.3)' : '1px solid transparent',
              color: active ? '#C59048' : 'rgba(255,255,255,0.55)',
              fontWeight: active ? 700 : 500,
              fontSize: '0.87rem',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}>
              <Icon size={17} style={{ flexShrink: 0 }} />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* Back to portal */}
      {!collapsed && (
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem',
            textDecoration: 'none', fontWeight: 500,
          }}>
            <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
            Back to Portal
          </Link>
        </div>
      )}
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 220;

  return (
    <AdminRoute>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f5f8' }}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main style={{
          marginLeft: `${sidebarWidth}px`,
          flex: 1, transition: 'margin-left 0.25s ease',
          minWidth: 0,
        }}>
          {children}
        </main>
      </div>
    </AdminRoute>
  );
}
