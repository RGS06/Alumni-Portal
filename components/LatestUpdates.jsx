import FadeIn from './ui/FadeIn';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LatestUpdates() {
  return (
    <section className="latest-updates section-padding bg-light">
      <FadeIn className="wrapper">
        <div className="section-header">
          <h2>Latest Updates</h2>
          <p>What&apos;s happening inside the network.</p>
        </div>
        
        <div className="feed-grid">
          <article className="feed-card">
            <div className="feed-img">
              <Image src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop" alt="Event" fill style={{ objectFit: 'cover' }} />
              <span className="feed-tag">Event</span>
            </div>
            <div className="feed-content">
              <h3>Annual Alumni Meet 2026</h3>
              <p>Join us this December as we host the largest reunion in SMVITM history. Register early to book your spots and reconnect with batchmates.</p>
              <Link href="/events" className="feed-link">
                Read More <ChevronRight size={18} />
              </Link>
            </div>
          </article>
          
          <article className="feed-card">
            <div className="feed-img">
              <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" alt="Talk" fill style={{ objectFit: 'cover' }} />
              <span className="feed-tag talk">Tech Talk</span>
            </div>
            <div className="feed-content">
              <h3>AI in Healthcare - Guest Lecture</h3>
              <p>Dr. Smitha, an alumnus from the 2015 batch, recently visited the campus to discuss disruptive innovations in med-tech.</p>
              <Link href="/mentorship" className="feed-link">
                Read More <ChevronRight size={18} />
              </Link>
            </div>
          </article>
          
          <article className="feed-card">
            <div className="feed-img">
              <Image src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&h=300&fit=crop" alt="Achievement" fill style={{ objectFit: 'cover' }} />
              <span className="feed-tag achieve">Achievement</span>
            </div>
            <div className="feed-content">
              <h3>Startup Success: Niveus Solutions</h3>
              <p>Congratulating our alumni involved with Niveus for their recent expansion. Read the exclusive interview with the founders.</p>
              <Link href="/media" className="feed-link">
                Read More <ChevronRight size={18} />
              </Link>
            </div>
          </article>
        </div>
      </FadeIn>
    </section>
  );
}
