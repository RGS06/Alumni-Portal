import FadeIn from './ui/FadeIn';

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="cta-overlay"></div>
      <FadeIn className="cta-content wrapper">
        <h2>Be a part of the SMVITM Alumni Network</h2>
        <p>Don&apos;t miss out on exclusive opportunities, reconnections, and the power of our community.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button className="btn-secondary large">Join Now</button>
          <button className="btn-outline-white large">Connect With Alumni</button>
        </div>
      </FadeIn>
    </section>
  );
}
