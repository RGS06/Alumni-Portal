import FadeIn from './ui/FadeIn';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section id="about" className="about-preview section-padding">
      <FadeIn className="wrapper about-grid">
        <div className="about-content">
          <h2>Empowering the SMVITM Family</h2>
          <p>The Shri Madhwa Vadiraja Institute of Technology & Management Alumni Association (SMVITMAA) is a formally registered body (under Act 1960) dedicated to fostering a lifelong bond between the institution and its graduates.</p>
          <p>Our Alumni Cell actively bridges the gap between campus and corporate, working tirelessly to integrate alumni into the institutional fabric through talks, resources, and continuous engagement.</p>
          <Link href="/about" className="btn-primary mt-4 inline-flex items-center">
            Learn More About SMVITMAA <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
        <div className="about-visual" style={{ position: 'relative', height: '400px' }}>
          <Image 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop" 
            alt="SMVITM Campus"
            fill
            className="rounded-img shadow-lg"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </FadeIn>
    </section>
  );
}
