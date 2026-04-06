import FadeIn from '../../components/ui/FadeIn';
import Image from 'next/image';

export const metadata = {
  title: 'Media & Gallery | SMVITMAA',
};

export default function MediaPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>Media & Gallery</h1>
          <p>Relive the memories. Browse officially logged alumni visits, notable achievements, and campus event highlights.</p>
        </FadeIn>
      </section>
      
      {/* ALUMNI VISITS LOG */}
      <section className="section-padding bg-light">
        <FadeIn className="wrapper">
          <div className="section-header">
            <h2>Logged Alumni Visits</h2>
            <p>Highlights from our structured alumni campus visit program.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ position: 'relative', height: '250px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
              <Image src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop" alt="Alumni Visit 1" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', padding: '1rem' }}>
                 <h4 style={{ color: 'white', margin: 0 }}>Dr. Smitha - Guest Lecture</h4>
              </div>
            </div>
            
            <div style={{ position: 'relative', height: '250px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
              <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop" alt="Alumni Visit 2" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', padding: '1rem' }}>
                 <h4 style={{ color: 'white', margin: 0 }}>Tech Talk: AI Trends</h4>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
      
      {/* ALUMNI ACHIEVEMENTS */}
      <section className="section-padding">
        <FadeIn className="wrapper">
          <div className="section-header">
            <h2>Alumni Achievements</h2>
            <p>Celebrating the global footprint of SMVITM graduates.</p>
          </div>
          <div className="feed-grid">
             {/* Dynamic placeholders for achievements */}
             <article className="feed-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem', flex: 1 }}>
                   <h3 style={{ color: 'var(--primary-color)' }}>Niveus Solutions Expansion</h3>
                   <p style={{ textAlign: 'justify' }}>Proud of our alumni founders at Niveus Solutions for expanding their global cloud consulting operations.</p>
                </div>
             </article>
             <article className="feed-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem', flex: 1 }}>
                   <h3 style={{ color: 'var(--primary-color)' }}>Apple Engineering Excellence</h3>
                   <p style={{ textAlign: 'justify' }}>Commending Shilpa Shetty (Batch 2014) for her sustained software engineering contributions at Apple India.</p>
                </div>
             </article>
             <article className="feed-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem', flex: 1 }}>
                   <h3 style={{ color: 'var(--primary-color)' }}>Olympic Gold Quest</h3>
                   <p style={{ textAlign: 'justify' }}>Recognizing Prajwal Bhat&apos;s incredible journey as a Strength and Conditioning Coach at the highest athletic levels.</p>
                </div>
             </article>
          </div>
        </FadeIn>
      </section>

      {/* EVENT GALLERY */}
      <section className="section-padding bg-light">
        <FadeIn className="wrapper">
          <div className="section-header">
            <h2>Reunion Galleries</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ position: 'relative', height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" alt="Gallery Image" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative', height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop" alt="Gallery Image" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative', height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1470&auto=format&fit=crop" alt="Gallery Image" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
