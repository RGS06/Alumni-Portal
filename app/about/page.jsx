import FadeIn from '../../components/ui/FadeIn';
import FeaturedAlumni from '../../components/FeaturedAlumni';
import { 
  Shield, MapPin, Users, CheckCircle2, UserCheck, 
  CalendarDays, LineChart, FileText, Settings, BookOpen, Clock, Target, Briefcase
} from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About SMVITMAA | Alumni Portal',
};

const EXECUTIVE_OFFICERS = [
  {
    name: "Gagan G Prabhu",
    role: "President",
    title: "Developer and Team Lead",
    organization: "SAP Labs India Pvt Ltd",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Gagan-G-prabhu.webp"
  },
  {
    name: "Bhuvanamitra S",
    role: "Vice president",
    title: "Geospatial Engineer",
    organization: "SatSure, Bengaluru",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/BhuvanamitraS.webp"
  },
  {
    name: "Snehal V Rao",
    role: "Secretary",
    title: "Quantity Surveyor",
    organization: "Simons and Associates, Udupi",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Snehal-V-Rao.webp"
  },
  {
    name: "Shreeraj Bhat",
    role: "Joint Secretary",
    title: "Technical Lead",
    organization: "Cloudbox AI",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Shreerajbhat.webp"
  },
  {
    name: "Ganesh U G",
    role: "Treasurer",
    title: "Assistant Professor",
    organization: "Dept.of E &C, SMVITM, Bantakal",
    image: "https://sode-edu.in/smvitm/wp-content/uploads/2026/04/Ganesh-U-G.webp"
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>About SMVITMAA</h1>
          <p>Learn about our vision, leadership, and the operational guidelines driving our global alumni network forward.</p>
        </FadeIn>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="section-padding wrapper">
        <FadeIn>
          <div className="about-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)', textAlign: 'center' }}>Our Mission & Legacy</h2>
            <p style={{ textAlign: 'justify' }}>
              The Shri Madhwa Vadiraja Institute of Technology & Management Alumni Association (SMVITMAA) is a formally registered entity under the Karnataka Societies Registration Act, 1960 (Serial No. 17). Our primary mission is to foster a robust and enduring bond between the institution and its global community of graduates.
            </p>
            <p style={{ textAlign: 'justify' }}>
              We are dedicated to establishing dynamic alumni connections, driving impactful mentorship programs, providing career guidance to emerging graduates, and leading philanthropic initiatives that benefit the entire academic community. Operating from our registered office at SMVITM Bantakal, the association underwent a significant by-law amendment in 2018 to further streamline and expand our strategic operations globally.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', margin: '3rem 0' }}>
              <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}>
                  <Shield size={40} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}/>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Governing Body</h3>
                  <p style={{ textAlign: 'center', marginBottom: 0, fontSize: '0.95rem' }}>Directed by a dedicated Executive Committee overseeing continuous institutional integration.</p>
              </div>
              <div style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}>
                  <MapPin size={40} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}/>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Registered Office</h3>
                  <p style={{ textAlign: 'center', marginBottom: 0, fontSize: '0.95rem' }}>SMVITM Bantakal, Udupi District, Karnataka. Serving as the central hub for global chapters.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginTop: '2rem' }}>
              <div>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-dark)', borderBottom: '2px solid var(--secondary-color)', display: 'inline-block', paddingBottom: '0.25rem' }}>Membership Categories</h3>
                <ul style={{ display: 'grid', gap: '1.25rem' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}><CheckCircle2 style={{ color: 'var(--secondary-color)', flexShrink: 0 }} size={20} /> <span style={{ textAlign: 'left' }}><strong>Life Members:</strong> Full rights within the association network.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}><CheckCircle2 style={{ color: 'var(--secondary-color)', flexShrink: 0 }} size={20} /> <span style={{ textAlign: 'left' }}><strong>Associate Members:</strong> Members part of extended initiatives.</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}><CheckCircle2 style={{ color: 'var(--secondary-color)', flexShrink: 0 }} size={20} /> <span style={{ textAlign: 'left' }}><strong>Honorary Members:</strong> Distinguished individuals recognized for service.</span></li>
                </ul>
              </div>

              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--accent-dark)', borderBottom: '2px solid var(--primary-color)', display: 'inline-block', paddingBottom: '0.25rem' }}>
                   Objectives
                </h3>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-body)', textAlign: 'justify', lineHeight: '1.8' }}>
                  <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>The primary objective of the Alumni cell is to establish a strong link between the institution and its alumni.</li>
                  <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>To build a network between our current students with the alumni.</li>
                  <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>To arrange reunions at prime locations considering the concentration of alumni.</li>
                  <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>To keep our alumni informed about the developments in our institution.</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

      </section>

      {/* ASSOCIATION LEADERSHIP (OFFICE BEARERS) */}
      <section className="section-padding wrapper">
        <FadeIn>
          <div className="section-header">
            <h2>Association Leadership</h2>
            <p>Meet the dedicated alumni office bearers leading the SMVITM Alumni Association.</p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', 
            gap: '1.75rem',
            marginTop: '3rem'
          }}>
            {EXECUTIVE_OFFICERS.map((officer) => (
              <div key={officer.name} style={{ 
                background: 'var(--white)', 
                borderRadius: '16px', 
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                border: '1.5px solid rgba(0,0,0,0.15)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Photo — CSS background, 3:4 ratio, face always visible */}
                <div style={{
                  width: '100%',
                  paddingTop: '120%',
                  backgroundImage: `url(${officer.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  backgroundRepeat: 'no-repeat',
                  flexShrink: 0,
                }} />

                {/* Info strip */}
                <div style={{
                  padding: '1rem 1rem 1.2rem',
                  borderTop: '1px solid var(--border-light)',
                  textAlign: 'center',
                }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--accent-dark)', margin: '0 0 0.3rem 0', fontWeight: 700 }}>
                    {officer.name}
                  </h3>
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--secondary-color)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                  }}>
                    {officer.role}
                  </span>
                  <span style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-body)',
                    display: 'block',
                    marginTop: '0.25rem',
                    lineHeight: '1.4',
                  }}>
                    {officer.title}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginTop: '0.15rem',
                    lineHeight: '1.4',
                  }}>
                    {officer.organization}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* DETAILED GOVERNANCE & OPERATIONS */}
      <section className="section-padding bg-light">
        <FadeIn className="wrapper">
          <div className="section-header">
            <h2>Governance & Operations</h2>
            <p>Strict procedures ensuring continuous excellence and engagement, led by Institutional Coordinator Dr. Raviprabha K.</p>
          </div>

          {/* Coordinator Card */}
          <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '2rem', maxWidth: '800px', margin: '0 auto 4rem auto', flexWrap: 'wrap', justifyContent: 'center' }}>
             <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
               <Image src="https://sode-edu.in/smvitm/wp-content/uploads/2015/02/RAVIPRABHA-CHEM.jpg" alt="Dr. Raviprabha K." fill style={{ objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--secondary-color)', boxShadow: '0 8px 24px rgba(197,144,72,0.2)' }} />
             </div>
             <div style={{ flex: '1', minWidth: '300px', textAlign: 'left' }}>
               <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: 'var(--primary-color)' }}>Dr. Raviprabha K.</h3>
               <span style={{ display: 'inline-block', background: 'rgba(18, 33, 71, 0.08)', color: 'var(--accent-dark)', padding: '0.35rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>Institutional Alumni Coordinator</span>
               <p style={{ margin: 0, color: 'var(--text-body)', textAlign: 'justify', fontSize: '1.05rem' }}>Directing the complete lifecycle of alumni engagement at SMVITM, ensuring strategic goals are met across all technical departments with utmost dedication.</p>
             </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            
            {/* Roles & Responsibility Block */}
            <div style={{ background: 'linear-gradient(135deg, var(--accent-dark) 0%, #1a2f60 100%)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', color: 'var(--white)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="ac-icon" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--secondary-color)', marginBottom: 0, width: '50px', height: '50px' }}><Briefcase size={24} /></div>
                <h3 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--white)' }}>Roles and Responsibilities</h3>
              </div>
              <ul style={{ paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.9)', textAlign: 'justify', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>Be in regular contact with alumni and update the information pertaining to their work (name of the company, designation, alternate mail id, contact number, achievements, higher education details etc.) through mail or social media.</li>
                <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>Organize at least one alumni interaction program every semester in respective departments for final or pre-final year students.</li>
                <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>Responsibility as coordinators for Alumni meet conducted by the institution (within/ outside campus).</li>
                <li style={{ marginBottom: '0.75rem', listStyleType: 'disc' }}>Mail invitations to alumni pertaining to major events at our institution.</li>
                <li style={{ listStyleType: 'disc' }}>Invite alumni as judges for events at the institute.</li>
              </ul>
            </div>
            
            {/* Operational Block 1 */}
            <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="ac-icon" style={{ background: 'rgba(123, 20, 54, 0.1)', color: 'var(--primary-color)', marginBottom: 0, width: '50px', height: '50px' }}><Settings size={24} /></div>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Committee Coordinators Selection</h3>
              </div>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-body)', textAlign: 'justify', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>The Institutional Coordinator requests the HODs of all technical departments to allocate two faculty members as department alumni coordinators (with only one from Civil Engineering).</li>
                <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>HODs assign these responsibilities during the first department meeting before the academic year commences.</li>
                <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>If an alumnus has joined the department as faculty, they shall inherently be allocated this responsibility.</li>
                <li style={{ listStyleType: 'disc' }}>HODs then communicate coordinator details to the Institutional Alumni Coordinator.</li>
              </ul>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Operational Block 2 */}
                <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="ac-icon" style={{ background: 'rgba(197, 144, 72, 0.1)', color: 'var(--secondary-color)', marginBottom: 0, width: '50px', height: '50px' }}><FileText size={24} /></div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Preparation of Perspective Plan</h3>
                  </div>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-body)', textAlign: 'justify', lineHeight: '1.8' }}>
                    <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>A meeting is convened at the start of the academic year via circular to map out the committee&apos;s perspective plan.</li>
                    <li style={{ listStyleType: 'disc' }}>In consultation with the HOD, department coordinators suggest names of alumni to invite for final/pre-final year addresses.</li>
                  </ul>
                </div>

                {/* Operational Block 3 */}
                <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="ac-icon" style={{ background: 'rgba(18, 33, 71, 0.1)', color: 'var(--accent-dark)', marginBottom: 0, width: '50px', height: '50px' }}><BookOpen size={24} /></div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Arranging Alumni Talks</h3>
                  </div>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-body)', textAlign: 'justify', lineHeight: '1.8' }}>
                    <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>Talk dates are finalized in consultation with the concerned alumnus, then conveyed to the HOD and Institutional Coordinator.</li>
                    <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>An official invitation/circular is mailed to the alumnus, target audience, HODs, and faculty.</li>
                    <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>The speaker is presented with a college memento, a t-shirt, and a copy of the annual magazine.</li>
                    <li style={{ listStyleType: 'disc' }}>A formal report is prepared and distributed to leadership and institutional social channels.</li>
                  </ul>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Operational Block 4 */}
                <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="ac-icon" style={{ background: 'rgba(123, 20, 54, 0.1)', color: 'var(--primary-color)', marginBottom: 0, width: '50px', height: '50px' }}><UserCheck size={24} /></div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Alumni Institutional Visits</h3>
                  </div>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-body)', textAlign: 'justify', lineHeight: '1.8' }}>
                    <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>Office staff across all departments strictly maintain a register detailing any alumni department visits.</li>
                    <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>Visiting alumni are promptly directed to meet their concerned department coordinators.</li>
                    <li style={{ listStyleType: 'disc' }}>Coordinators log necessary updates, such as precise current work information details from the alumnus.</li>
                  </ul>
                </div>

                {/* Operational Block 5 */}
                <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="ac-icon" style={{ background: 'rgba(197, 144, 72, 0.1)', color: 'var(--secondary-color)', marginBottom: 0, width: '50px', height: '50px' }}><Clock size={24} /></div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Alumni Feedback Protocol</h3>
                  </div>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-body)', textAlign: 'justify', lineHeight: '1.8' }}>
                    <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>Crucial feedback regarding the curriculum and institution is formally collected one year post-graduation.</li>
                    <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>Feedback forms are proactively mailed to alumni exactly a year after their graduation date.</li>
                    <li style={{ listStyleType: 'disc' }}>Additionally, feedback forms are provided to be filled whenever an alumnus physically visits the institution.</li>
                  </ul>
                </div>
            </div>

            {/* Operational Block 6 */}
            <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="ac-icon" style={{ background: 'rgba(18, 33, 71, 0.1)', color: 'var(--accent-dark)', marginBottom: 0, width: '50px', height: '50px' }}><CalendarDays size={24} /></div>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Conduction of Alumni Meets</h3>
              </div>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-body)', textAlign: 'justify', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>The Institutional Coordinator serves as the central focal point and main event organizer for Alumni Meets held either at or outside the institution.</li>
                <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>Department coordinators act as the core committee managing inviting, registration, event management, food logistics, and reporting.</li>
                <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>Volunteer support is highly encouraged from active association members across required operational areas.</li>
                <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>Invitations and registrations are distributed via mail, social media platforms, and verified via the portal/website natively. Reg confirmation is obtained immediately.</li>
                <li style={{ marginBottom: '0.5rem', listStyleType: 'disc' }}>The event is hosted directly by the institution or jointly operated alongside localized alumni chapters.</li>
                <li style={{ listStyleType: 'disc' }}>A comprehensive event report is drafted and submitted to all HODs, Principal, webmaster, and news syndicates.</li>
              </ul>
            </div>

          </div>
        </FadeIn>
      </section>

      <FeaturedAlumni />
    </>
  );
}
