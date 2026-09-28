import { useRef, useState } from 'react';
import { ArrowUpRight, Scissors, Sparkles, Flower2 } from 'lucide-react';
import { services } from '../data/salon';
import type { Category } from '../data/salon';
import { SectionHeading } from '../components/SectionHeading';
import { gsap, useGSAP, useSectionMotion } from '../utils/animation';
const filters: Category[] = ['All services', 'Hair', 'Skin & beauty', 'Grooming'];
const icons = { scissors: Scissors, sparkles: Sparkles, flower: Flower2 };
export function Services({ onBook }: { onBook: (service?: string) => void }) {
  const [filter, setFilter] = useState<Category>('All services');
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);
  const visible = services.filter((s) => filter === 'All services' || s.category === filter);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.service-card', {
          y: 45,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.service-grid', start: 'top 90%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true },
  );
  return (
    <section className="services section-shell section-space" id="services" ref={root}>
      <SectionHeading label="The service collection" title="A good day starts here.">
        <p>
          From a little refresh to a whole new look.
          <br />
          Find your kind of feel-good.
        </p>
      </SectionHeading>
      <div className="service-filters" role="group" aria-label="Filter services">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
            <span>
              {f === 'All services'
                ? '06'
                : f === 'Hair'
                  ? '03'
                  : f === 'Skin & beauty'
                    ? '02'
                    : '01'}
            </span>
          </button>
        ))}
      </div>
      <div className="service-grid" aria-live="polite">
        {visible.map((s) => {
          const Icon = icons[s.icon];
          return (
            <button
              className="service-card"
              key={s.name}
              onClick={() => onBook(s.name)}
              aria-label={`Enquire about ${s.name}`}
            >
              <div className="service-image">
                <img
                  src={`/images/${s.image}.jpg`}
                  alt={s.description}
                  width="850"
                  height="1050"
                  loading="lazy"
                />
                <span className="service-icon">
                  <Icon size={21} strokeWidth={1.35} />
                </span>
                <span className="service-open">
                  <ArrowUpRight size={23} />
                </span>
              </div>
              <div className="service-title">
                <h3>{s.name}</h3>
              </div>
              <p>{s.description}</p>
            </button>
          );
        })}
      </div>
      <p className="service-footnote">
        Every service starts with a conversation.{' '}
        <button onClick={() => onBook('Help choosing a service')}>
          Let’s find what works for you <ArrowUpRight size={14} />
        </button>
      </p>
    </section>
  );
}
