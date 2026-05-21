import Link from 'next/link';
import FadeIn from './ui/FadeIn';

export default function MentorshipHighlight() {
  return (
    <section className="mentorship-highlight section-padding bg-light">
      <FadeIn className="wrapper align-center">
        <div className="mentorship-box" style={{ background: '#FFFFFF', borderColor: 'rgba(0,0,0,0.08)' }}>
          <h2>Shape the Next Generation</h2>
          <p>Guidance changes lives. Volunteer to be a mentor, share your industry insights, and help students or junior alumni navigate their career growth successfully.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <Link href="/mentorship" className="btn-primary large">Find a Mentor</Link>
            <Link href="/mentorship" className="btn-outline large">Become a Mentor</Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
