'use client';

import { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FeedbackWidget() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <a 
      href="https://docs.google.com/forms/d/e/1FAIpQLSeRtfLm1RRe-bJgYHaP2hhlOzwBLQKy1Z2rQy4TuPJ6a_huTA/viewform?usp=sharing&ouid=107034298863071536838"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="feedback-widget"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 999,
        background: 'linear-gradient(135deg, var(--primary-color), #a01c47)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: isHovered ? '0.8rem 1.25rem 0.8rem 1rem' : '1rem',
        borderRadius: '99px',
        boxShadow: '0 10px 25px rgba(123, 20, 54, 0.4)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        textDecoration: 'none',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      <MessageSquarePlus size={22} style={{ flexShrink: 0 }} />
      
      <span style={{
        fontWeight: 600,
        fontSize: '0.95rem',
        marginLeft: isHovered ? '10px' : '0px',
        maxWidth: isHovered ? '150px' : '0px',
        opacity: isHovered ? 1 : 0,
        transition: 'all 0.3s ease',
      }}>
        Share Feedback
      </span>
    </a>
  );
}
