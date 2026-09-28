import { lazy, Suspense, useRef, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { gallery, salon } from '../data/salon';
import { useSectionMotion } from '../utils/animation';
const GalleryDialog = lazy(() => import('../components/GalleryDialog'));
export function Gallery() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="gallery section-shell section-space" id="gallery" ref={root}>
      <SectionHeading label="The inspiration edit" title="Find your next “that’s me”.">
        <a className="text-link" href={salon.google} target="_blank" rel="noopener noreferrer">
          See our salon on Google <ArrowUpRight size={18} />
        </a>
      </SectionHeading>
      <div className="gallery-grid">
        {gallery.map((g, i) => (
          <button
            className={`gallery-tile gallery-tile-${i}`}
            key={g.image}
            onClick={() => setSelected(i)}
            aria-label={`View ${g.title}`}
            data-image-reveal
          >
            <img
              src={`/images/${g.image}.jpg`}
              alt={g.title}
              width="850"
              height="1050"
              loading="lazy"
            />
            <span className="gallery-plus">
              <Plus size={21} />
            </span>
            <span className="gallery-caption">
              <span>{g.tag}</span>
              <strong>{g.title}</strong>
            </span>
          </button>
        ))}
      </div>
      <p className="gallery-note">
        A curated moodboard of hair, skin and beauty inspiration. Imagery is illustrative; explore
        our Google profile for salon photos.
      </p>
      {selected !== null ? (
        <Suspense
          fallback={
            <div className="booking-loading" role="status">
              Opening the inspiration edit…
            </div>
          }
        >
          <GalleryDialog
            selected={selected}
            onSelect={setSelected}
            onClose={() => setSelected(null)}
          />
        </Suspense>
      ) : null}
    </section>
  );
}
