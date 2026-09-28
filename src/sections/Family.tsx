import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { ArrowUpRight, Check } from 'lucide-react';
import { useSectionMotion } from '../utils/animation';
const groups = [
  {
    name: 'For women',
    heading: 'Your hair. Your expression.',
    text: 'A considered cut, a fresh style or a little extra care. Make room for a look that feels entirely your own.',
    image: 'portrait',
    services: [
      'Precision haircuts & styling',
      'Hair colour & conditioning',
      'Facials & skin care',
      'Beauty & occasion preparation',
    ],
  },
  {
    name: 'For men',
    heading: 'Good grooming, your way.',
    text: 'A crisp cut, a shaped beard, a fresh start. Everyday grooming with attention to the details that matter to you.',
    image: 'grooming',
    services: [
      'Haircuts & fresh fades',
      'Beard shaping & grooming',
      'Hair styling & finishing',
      'Hair & scalp treatments',
    ],
  },
  {
    name: 'For the family',
    heading: 'Different styles. One salon.',
    text: 'Little trims and big changes. Bring everyone along for a relaxed visit, with time and care for each member of your family.',
    image: 'hair',
    services: [
      'Children’s haircuts',
      'Hair care for every generation',
      'Appointments together',
      'A welcoming, relaxed visit',
    ],
  },
];
export function Family({ onBook }: { onBook: (service?: string) => void }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);
  const group = groups[active];
  return (
    <section className="family section-space" id="family" ref={root}>
      <div className="section-shell">
        <div className="family-header" data-reveal>
          <span className="section-label">
            <span /> Everyone belongs here
          </span>
          <h2>One salon. Every version of you.</h2>
        </div>
        <div className="family-tabs" role="tablist" aria-label="Services for you">
          {groups.map((g, i) => (
            <button
              key={g.name}
              role="tab"
              id={`family-tab-${i}`}
              aria-selected={active === i}
              aria-controls="family-panel"
              tabIndex={active === i ? 0 : -1}
              className={active === i ? 'active' : ''}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                  e.preventDefault();
                  const next =
                    e.key === 'Home'
                      ? 0
                      : e.key === 'End'
                        ? 2
                        : (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3;
                  setActive(next);
                  document.getElementById(`family-tab-${next}`)?.focus();
                }
              }}
            >
              {g.name}
            </button>
          ))}
        </div>
        <div
          id="family-panel"
          role="tabpanel"
          aria-labelledby={`family-tab-${active}`}
          className="family-content"
          key={group.name}
        >
          <div className="family-photo">
            <img
              src={`/images/${group.image}.jpg`}
              width="850"
              height="1050"
              alt={`${group.name}: salon style inspiration`}
              loading="lazy"
            />
            <span className="family-photo-label">A little care goes a long way.</span>
          </div>
          <div className="family-copy">
            <h3>{group.heading}</h3>
            <p>{group.text}</p>
            <ul>
              {group.services.map((s) => (
                <li key={s}>
                  <Check size={17} />
                  {s}
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              onClick={() => onBook(group.name)}
              endIcon={<ArrowUpRight size={17} />}
            >
              Plan your visit
            </Button>
          </div>
          <span className="family-amp" aria-hidden="true">
            &
          </span>
        </div>
      </div>
    </section>
  );
}
