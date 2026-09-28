import { useRef } from 'react';
import { Star, ArrowUpRight, Heart } from 'lucide-react';
import { GoogleMark } from '../components/Icons';
import { salon } from '../data/salon';
import { useSectionMotion } from '../utils/animation';
export function Reviews() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);
  return (
    <section className="reviews section-shell" id="reviews" ref={root}>
      <div className="reviews-intro" data-reveal>
        <span className="section-label">
          <span /> A little love, shared
        </span>
        <h2>
          Good feelings.
          <br />
          Real people.
        </h2>
        <p>
          Every visit is personal. Discover what our guests have shared, or tell us about your own
          feel-good moment.
        </p>
        <a className="text-link" href={salon.google} target="_blank" rel="noopener noreferrer">
          Read our Google reviews <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="google-review-card" data-reveal>
        <div className="google-card-top">
          <GoogleMark />
          <span>Google reviews</span>
          <Heart size={23} strokeWidth={1.3} />
        </div>
        <div className="rating-display">
          <strong>{salon.rating}</strong>
          <div>
            <span className="stars" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={21} fill="currentColor" />
              ))}
            </span>
            <p>Based on {salon.reviewCount} Google reviews</p>
          </div>
        </div>
        <p className="rating-caption">
          A small neighbourhood salon.
          <br />A lot of heart.
        </p>
        <div className="rating-card-bottom">
          <span>Checked September 2026</span>
          <a
            href={salon.google}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Google reviews"
          >
            <ArrowUpRight size={23} />
          </a>
        </div>
      </div>
    </section>
  );
}
