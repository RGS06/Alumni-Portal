import FadeIn from './ui/FadeIn';
import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-overlay"></div>
      <FadeIn className="cta-content wrapper">
        <h2>Be a part of the SMVITM Alumni Network</h2>
        <p>Don&apos;t miss out on exclusive opportunities, reconnections, and the power of our community.</p>
        <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link href="/signup" className="btn-secondary large">Join Now</Link>
          <Link href="/directory" className="btn-outline-white large">Connect With Alumni</Link>
        </div>
      </FadeIn>
    </section>
  );
}
