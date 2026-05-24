import FadeIn from '../../components/ui/FadeIn';
import LatestUpdates from '../../components/LatestUpdates';



export const metadata = {
  title: 'Alumni Events | SMVITMAA',
};

export default function EventsPage() {
  return (
    <>
      <section className="page-header">
        <FadeIn className="wrapper">
          <h1>Events, Meets & Interactions</h1>
          <p>Stay connected through our officially sanctioned alumni meets and regular interaction programs.</p>
        </FadeIn>
      </section>
      


      <LatestUpdates />
    </>
  );
}
