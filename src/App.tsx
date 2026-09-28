import { lazy, Suspense, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Family } from './sections/Family';
import { Experience } from './sections/Experience';
import { Gallery } from './sections/Gallery';
import { Reviews } from './sections/Reviews';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Craft } from './sections/Craft';
import { MotionCoordinator, Ribbon, ScrollDetails } from './components/MotionDetails';
const BookingDialog = lazy(() => import('./components/BookingDialog'));
export default function App() {
  const [booking, setBooking] = useState<string | null>(null);
  const onBook = (service = '') => setBooking(service);
  return (
    <>
      <Navigation onBook={() => onBook()} />
      <ScrollDetails />
      <main id="main">
        <Hero onBook={() => onBook()} />
        <Ribbon />
        <Services onBook={onBook} />
        <Craft />
        <About />
        <Family onBook={onBook} />
        <Experience onBook={onBook} />
        <Gallery />
        <Reviews />
        <Contact onBook={() => onBook()} />
      </main>
      <Footer onBook={() => onBook()} />
      <MotionCoordinator />
      {booking !== null ? (
        <Suspense
          fallback={
            <div className="booking-loading" role="status">
              Preparing your visit…
            </div>
          }
        >
          <BookingDialog initialService={booking} onClose={() => setBooking(null)} />
        </Suspense>
      ) : null}
    </>
  );
}
