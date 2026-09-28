import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import {
  ArrowUpRight,
  Flower2,
  Scissors,
  Sparkles,
  Heart,
  MessageCircle,
  Leaf,
} from 'lucide-react';
import { gsap, useGSAP, useSectionMotion } from '../utils/animation';
const rituals = [
  {
    name: 'Skin rituals',
    title: 'A pause that looks good on you.',
    text: 'Switch off the outside world. Settle into a facial ritual of cleansing, massage and nourishment, chosen around your skin and how you want to feel.',
    image: 'facial',
    service: 'Facials & skin',
    tags: ['Cleanse', 'Nourish', 'Unwind'],
  },
  {
    name: 'Hair therapy',
    title: 'Give your hair a little love.',
    text: 'A busy week, a new season, or just because. Talk to us about your hair and scalp, then settle into a care ritual tailored to your needs.',
    image: 'styling',
    service: 'Hair spa & treatments',
    tags: ['Consult', 'Condition', 'Refresh'],
  },
  {
    name: 'Beauty moments',
    title: 'For the occasion. And for you.',
    text: 'There doesn’t have to be a special occasion. From small finishing touches to getting ready for something lovely, make a little time to feel your best.',
    image: 'beauty',
    service: 'Beauty rituals',
    tags: ['Discover', 'Personalise', 'Enjoy'],
  },
];
export function Experience({ onBook }: { onBook: (service?: string) => void }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useSectionMotion(root);
  const ritual = rituals[active];
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.ritual-photo', {
          clipPath: 'inset(0 0 100% 0 round 6px)',
          duration: 1.15,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.ritual-layout', start: 'top 82%', once: true },
        });
        gsap.from('.ritual-copy > *', {
          y: 25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ritual-layout', start: 'top 82%', once: true },
        });
        const treatment = gsap.timeline({
          scrollTrigger: {
            trigger: '.ritual-visual',
            start: 'top 85%',
            end: 'bottom 30%',
            scrub: 0.7,
          },
        });
        treatment
          .fromTo(
            '.serum-pipette',
            { y: -15, rotation: -9 },
            { y: 8, rotation: 4, svgOrigin: '35 60', duration: 1 },
            0,
          )
          .fromTo(
            '.serum-drop',
            { y: 0, scale: 0.5, opacity: 0 },
            {
              y: 45,
              scale: 1,
              opacity: 1,
              transformOrigin: 'center',
              duration: 0.35,
              stagger: 0.15,
              repeat: 1,
            },
            0.1,
          )
          .to('.serum-drop', { opacity: 0, duration: 0.2 }, 0.8)
          .fromTo(
            '.ritual-halo',
            { rotation: -12, scale: 0.9 },
            { rotation: 12, scale: 1.04, duration: 1.4 },
            0,
          )
          .fromTo(
            '.ritual-photo img',
            { scale: 1.12, yPercent: -3 },
            { scale: 1.03, yPercent: 2, duration: 1.4 },
            0,
          );
        gsap.fromTo(
          '.face-mask',
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'bottom',
            ease: 'none',
            scrollTrigger: {
              trigger: '.ritual-layout',
              start: 'top 85%',
              end: 'bottom 85%',
              scrub: 1,
            },
          },
        );
        gsap.to('.face-sparkles', {
          rotation: 35,
          y: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: '.ritual-layout',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [active], revertOnUpdate: true },
  );
  return (
    <section className="experience section-space" id="experience" ref={root}>
      <div className="section-shell">
        <div className="experience-top" data-reveal>
          <span className="section-label">
            <span /> The slow-down collection
          </span>
          <p>A little less rush. A little more ritual.</p>
        </div>
        <div className="ritual-tabs" role="group" aria-label="Featured treatments">
          {rituals.map((r, i) => (
            <button
              key={r.name}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={active === i ? 'active' : ''}
            >
              {i === 0 ? (
                <Flower2 size={19} />
              ) : i === 1 ? (
                <Scissors size={19} />
              ) : (
                <Sparkles size={19} />
              )}{' '}
              {r.name}
            </button>
          ))}
        </div>
        <div className="ritual-layout">
          <div className="ritual-copy" key={ritual.name}>
            <h2>{ritual.title}</h2>
            <p>{ritual.text}</p>
            <div className="ritual-steps">
              {ritual.tags.map((tag, i) => (
                <span key={tag}>
                  <span className="ritual-step-dot">{i + 1}</span>
                  {tag}
                </span>
              ))}
            </div>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => onBook(ritual.service)}
              endIcon={<ArrowUpRight size={18} />}
            >
              Make time for yourself
            </Button>
          </div>
          <div className="ritual-visual">
            <div className="ritual-halo" aria-hidden="true" />
            <div className="serum-illustration" aria-hidden="true">
              <svg viewBox="0 0 75 155" fill="none">
                <g className="serum-pipette">
                  <rect
                    x="24"
                    y="8"
                    width="27"
                    height="35"
                    rx="11"
                    fill="#d8c4df"
                    stroke="#f5e9f9"
                  />
                  <path d="M22 38h31v15H22Z" fill="#8a7192" stroke="#d8c4df" />
                  <path
                    d="M30 53v40l7 13 7-13V53"
                    fill="#af93ba"
                    fillOpacity=".45"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path d="M34 60v30" stroke="#f5e9f9" strokeOpacity=".7" />
                </g>
                {[0, 1].map((i) => (
                  <path
                    key={i}
                    className="serum-drop"
                    d="M37 112q-10 13 0 15q10-2 0-15Z"
                    fill="#d8c4df"
                  />
                ))}
              </svg>
            </div>
            <div className="ritual-photo" key={ritual.image}>
              <img
                src={`/images/${ritual.image}.jpg`}
                alt={`${ritual.name} treatment inspiration`}
                width="850"
                height="1050"
                loading="lazy"
              />
            </div>
            <div className="face-illustration" aria-hidden="true">
              <svg viewBox="0 0 170 200" fill="none">
                <path
                  d="M39 63C30 22 140 9 134 66L123 122C113 150 99 164 85 164C66 164 47 141 43 119Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  className="face-mask"
                  d="M47 66C64 47 108 47 126 65L118 113Q104 145 85 149Q65 143 52 116Z"
                  fill="#b4a3bf"
                  fillOpacity=".55"
                />
                <path
                  d="M53 89q12 11 25 0M96 89q13 11 24 0M89 94l-5 20h9M72 130q15 7 29-1M62 153l-6 30M108 153l8 30M56 181L18 195M116 181l36 14"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  className="face-sparkles"
                  d="M142 32v22m-11-11h22M27 114v16m-8-8h16"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
              <span>Care, thoughtfully chosen.</span>
            </div>
          </div>
        </div>
        <div className="care-values">
          <div data-reveal>
            <Heart size={24} strokeWidth={1.3} />
            <h3>Care that listens</h3>
            <p>Your preferences come first. We start by understanding what you have in mind.</p>
          </div>
          <div data-reveal>
            <Scissors size={24} strokeWidth={1.3} />
            <h3>Attention to detail</h3>
            <p>From the first consultation to the final finish, the little things matter.</p>
          </div>
          <div data-reveal>
            <Leaf size={24} strokeWidth={1.3} />
            <h3>Thoughtful treatments</h3>
            <p>Talk through product choices and care options that suit your hair and skin.</p>
          </div>
          <div data-reveal>
            <MessageCircle size={24} strokeWidth={1.3} />
            <h3>Easy from the start</h3>
            <p>One WhatsApp conversation to ask a question or plan your whole family’s visit.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
