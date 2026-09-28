import Button from '@mui/material/Button';
import { ArrowUpRight, ArrowUp, Heart } from 'lucide-react';
import { Brand } from '../components/Brand';
import { WhatsAppIcon } from '../components/Icons';
import { salon, whatsappUrl } from '../data/salon';
import { useRef } from 'react';
import { gsap, useGSAP } from '../utils/animation';
export function Footer({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
          })
          .from('.cta-flower', { rotation: -100, scale: 0.25, opacity: 0, duration: 1.1 })
          .from(
            '.final-cta p, .final-cta h2, .cta-actions',
            { y: 35, opacity: 0, duration: 1, stagger: 0.12 },
            0.15,
          );
        gsap.from('.cta-line', {
          scale: 0.7,
          rotation: -45,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <>
      <section className="final-cta" ref={root}>
        <div className="section-shell">
          <span className="cta-flower" aria-hidden="true">
            ✳
          </span>
          <p>Your next good hair day is calling.</p>
          <h2>
            Let’s make it
            <br />a little more <em>you.</em>
          </h2>
          <div className="cta-actions">
            <Button
              variant="contained"
              color="secondary"
              onClick={onBook}
              endIcon={<ArrowUpRight size={19} />}
            >
              Book an appointment
            </Button>
            <a
              href={whatsappUrl()}
              className="quiet-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={19} /> WhatsApp us
            </a>
          </div>
          <span className="cta-line" aria-hidden="true" />
        </div>
      </section>
      <footer className="footer section-shell">
        <div className="footer-top">
          <Brand />
          <p>
            Hair. Skin. A little self-care.
            <br />
            For you and everyone you love.
          </p>
          <a className="text-link" href="#home">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {salon.name}
          </span>
          <span>
            Made for feel-good moments <Heart size={12} />
          </span>
          <a href={salon.google} target="_blank" rel="noopener noreferrer">
            Find us on Google <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mens and Womens Family Salon on WhatsApp"
      >
        <span className="whatsapp-tooltip">A little chat?</span>
        <WhatsAppIcon size={25} />
      </a>
    </>
  );
}
