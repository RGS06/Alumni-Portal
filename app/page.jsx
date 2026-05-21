import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import QuickAccess from '../components/QuickAccess';
import AboutPreview from '../components/AboutPreview';
import LatestUpdates from '../components/LatestUpdates';
import MentorshipHighlight from '../components/MentorshipHighlight';
import AlumniGiving from '../components/AlumniGiving';
import CTABanner from '../components/CTABanner';
import SupabaseTest from '../components/ui/SupabaseTest';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <QuickAccess />
      <AboutPreview />
      <LatestUpdates />
      <MentorshipHighlight />
      <AlumniGiving />
      <CTABanner />
      <SupabaseTest />
    </>
  );
}
