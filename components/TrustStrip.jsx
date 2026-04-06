'use client';
import { useState } from 'react';
import FadeIn from './ui/FadeIn';
import { BookOpen, Rocket, Award, HandCoins, ArrowRight } from 'lucide-react';

export default function TrustStrip() {
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps = [
    {
      id: "student",
      title: "Current Student",
      icon: <BookOpen size={24} />,
      heading: "Building the Foundation",
      description: "Even before graduation, the alumni network is here. Get paired with industry mentors, secure highly-coveted internships through alumni referrals, and attend exclusive guest lectures from graduates who have walked the same halls.",
      actionText: "Explore Mentorship"
    },
    {
      id: "early-career",
      title: "Early Career",
      icon: <Rocket size={24} />,
      heading: "Accelerating Your Growth",
      description: "Just graduated? We've got your back. Tap into our global directory to find SMVITM alumni in your new city. Access professional resume reviews, interview prep, and direct job opportunities posted exclusively for our network.",
      actionText: "View Job Board"
    },
    {
      id: "leader",
      title: "Industry Leader",
      icon: <Award size={24} />,
      heading: "Expand Your Influence",
      description: "As your career peaks, the portal becomes a powerful tool for executive networking. Recruit top-tier engineering talent directly from SMVITM, build strategic business partnerships, and establish your legacy as an industry voice.",
      actionText: "Recruit Talent"
    },
    {
      id: "giving-back",
      title: "Giving Back",
      icon: <HandCoins size={24} />,
      heading: "Empowering the Next Generation",
      description: "Complete the circle. Support meritorious students through the Corpus Fund, establish scholarships in your name, or simply return to campus to judge hackathons and deliver inspiring keynote addresses.",
      actionText: "Make an Impact"
    }
  ];

  return (
    <section className="trust-strip" style={{ padding: '6rem 0', background: 'var(--bg-main)', borderTop: '1px solid var(--border-light)' }}>
      <FadeIn className="wrapper">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>The SMVITM Journey</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>A lifelong partnership from your first day on campus to the peak of your career.</p>
        </div>
        
        {/* Interactive Timeline */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Timeline Nodes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '3rem' }}>
            {/* Horizontal Connecting Line */}
            <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '3px', background: 'var(--border-light)', zIndex: 0 }}></div>
            
            {journeySteps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    width: '120px'
                  }}
                >
                  <div style={{ 
                    width: '50px', height: '50px', 
                    borderRadius: '50%', 
                    background: isActive ? 'var(--primary-color)' : 'var(--bg-light)', 
                    color: isActive ? 'var(--white)' : 'var(--text-muted)',
                    border: `3px solid ${isActive ? 'rgba(123, 20, 54, 0.2)' : 'var(--border-light)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 10px 20px rgba(123, 20, 54, 0.2)' : 'none',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)'
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ 
                    marginTop: '1rem', 
                    fontWeight: isActive ? 700 : 500, 
                    color: isActive ? 'var(--accent-dark)' : 'var(--text-muted)',
                    fontSize: '0.95rem',
                    textAlign: 'center',
                    transition: 'color 0.3s ease'
                  }}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dynamic Content Panel */}
          <div style={{ 
            background: 'var(--bg-light)', 
            padding: '3rem', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-soft)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'all 0.4s ease-in-out',
            minHeight: '260px',
            justifyContent: 'center'
          }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
              {journeySteps[activeStep].heading}
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2rem' }}>
              {journeySteps[activeStep].description}
            </p>
            <button className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {journeySteps[activeStep].actionText} <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </FadeIn>
    </section>
  );
}
