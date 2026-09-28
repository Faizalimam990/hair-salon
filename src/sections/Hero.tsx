import { useRef } from 'react';
import Button from '@mui/material/Button';
import { ArrowUpRight, ArrowDown, Star, MapPin, Scissors } from 'lucide-react';
import { WhatsAppIcon, GoogleMark } from '../components/Icons';
import { salon, whatsappUrl } from '../data/salon';
import { gsap, useGSAP } from '../utils/animation';
export function Hero({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-heading-line span', { yPercent: 105, duration: 1.1, stagger: 0.12 })
          .from(
            '.hero-intro, .hero-actions, .hero-social',
            { y: 20, autoAlpha: 0, stagger: 0.12, duration: 0.7 },
            '-.6',
          )
          .from(
            '.hero-portrait',
            { clipPath: 'inset(0 0 100% 0 round 220px 220px 16px 16px)', duration: 1.3 },
            0,
          )
          .from('.hero-note', { scale: 0.85, rotation: 10, autoAlpha: 0, duration: 0.8 }, 0.6);
      });
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('.hero-portrait img', {
          yPercent: 9,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
        });
        gsap.to('.hero-amp', {
          y: -80,
          rotation: 8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section className="hero section-shell" id="home" ref={root}>
      <div className="hero-copy">
        <p className="hero-location">
          <span className="tiny-spark">✧</span> Your neighbourhood. Your new favourite salon.
        </p>
        <h1>
          <span className="hero-heading-line">
            <span>A little time</span>
          </span>
          <span className="hero-heading-line">
            <span>
              for <em>you.</em>
            </span>
          </span>
        </h1>
        <p className="hero-intro">
          Great hair. Glowing skin. A feeling that stays.
          <br />
          Thoughtful hair and beauty care for every
          <br className="desktop-break" /> member of the family.
        </p>
        <div className="hero-actions">
          <Button variant="contained" onClick={onBook} endIcon={<ArrowUpRight size={18} />}>
            Book an appointment
          </Button>
          <a className="quiet-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={19} /> WhatsApp us
          </a>
        </div>
        <a className="hero-social" href={salon.google} target="_blank" rel="noopener noreferrer">
          <GoogleMark />
          <div>
            <span className="rating-line">
              <b>5.0</b>
              <span className="stars" role="img" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </span>
            </span>
            <span className="review-small">A little love from our Google guests</span>
          </div>
        </a>
      </div>
      <div className="hero-visual">
        <span className="hero-amp" aria-hidden="true">
          &
        </span>
        <div className="hero-portrait">
          <img
            src="/images/hero.jpg"
            alt="Editorial portrait with long, softly textured hair"
            width="1200"
            height="1500"
            fetchPriority="high"
          />
          <div className="portrait-caption">
            <span>Come as you are.</span>
            <span>Leave feeling like you.</span>
          </div>
        </div>
        <div className="hero-note">
          <Scissors size={26} strokeWidth={1} />
          <span>
            A fresh cut.
            <br />A fresh feeling.
          </span>
          <span className="note-star">✧</span>
        </div>
        <div className="vertical-caption">Hair, skin & a little self-care</div>
      </div>
      <div className="hero-bottom">
        <a href="#services">
          <span className="scroll-circle">
            <ArrowDown size={16} />
          </span>{' '}
          Find your feel-good
        </a>
        <span>
          <MapPin size={14} /> Andheri East, Mumbai
        </span>
      </div>
    </section>
  );
}
