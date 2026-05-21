import { Linkedin, Facebook, Youtube, Instagram, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <span style={{ color: 'var(--white)' }}>SMVITM</span>
            <span className="logo-accent">AA</span>
          </div>
          <p>Connecting generations of excellence. A unified network for growth, mentorship, and opportunity.</p>
          <div className="social-links mt-4" style={{ display: 'flex' }}>
            <a href="https://www.linkedin.com/company/shri-madhwa-vadiraja-institute-of-technology-and-management/" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
            <a href="https://www.facebook.com/officialsmvitm" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/smvitm.sode/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/SMVITMBANTAKAL" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About SMVITMAA</Link></li>
            <li><Link href="/community">Community & Forum</Link></li>
            <li><Link href="/directory">Directory</Link></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
            <li><a href="https://sode-edu.in/" target="_blank" rel="noopener noreferrer">Main SMVITM Site <ExternalLink size={14} style={{ display: 'inline-block', marginLeft: '4px' }} /></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="wrapper">
          <p>&copy; {new Date().getFullYear()} Shri Madhwa Vadiraja Institute of Technology & Management Alumni Association. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
