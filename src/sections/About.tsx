import { useRef } from 'react';
import { Heart, ArrowUpRight, Scissors } from 'lucide-react';
import { gsap, useGSAP, useSectionMotion } from '../utils/animation';
export function About() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const paths = gsap.utils.toArray<SVGPathElement>('.hair-strand', root.current);
        paths.forEach((p) => {
          const length = p.getTotalLength();
          gsap.fromTo(
            p,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top 90%',
                end: 'bottom 50%',
                scrub: 1,
              },
            },
          );
        });
        gsap.to('.scissor-drawing', {
          motionPath: {
            path: '.hair-strand',
            align: '.hair-strand',
            alignOrigin: [0.5, 0.5],
            autoRotate: -35,
          },
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section className="about section-shell section-space" id="about" ref={root}>
      <div className="about-art" data-image-reveal>
        <img
          src="/images/salon.jpg"
          width="850"
          height="1050"
          alt="A bright, welcoming salon interior, shown for inspiration"
          loading="lazy"
        />
        <div className="about-stamp">
          <Heart size={24} strokeWidth={1} />
          <span>
            A space for
            <br />
            everyone.
          </span>
        </div>
        <span className="image-disclaimer">Salon atmosphere inspiration</span>
      </div>
      <div className="about-copy" data-reveal>
        <span className="section-label">
          <span /> Hello, neighbour.
        </span>
        <h2>
          More than a salon.
          <br />
          Your time to reset.
        </h2>
        <p>
          There’s something about a fresh haircut. The lighter feeling. The extra confidence. The
          moment in the mirror that makes you smile.
        </p>
        <p>
          At Mens&WomensFamilySalon, we make space for those little moments. A trim for him, a new
          look for her, a first haircut for the little one. Care that feels personal, all under one
          roof in Andheri East.
        </p>
        <a className="text-link" href="#family">
          Meet your family’s salon <ArrowUpRight size={18} />
        </a>
        <div className="hair-art" aria-hidden="true">
          <svg viewBox="0 0 460 120" fill="none">
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                className="hair-strand"
                key={i}
                d={`M0 ${38 + i * 8} C90 ${140 + i * 3},130 ${-30 + i * 8},235 ${38 + i * 8} S370 ${130 - i * 5},460 ${28 + i * 8}`}
                stroke="currentColor"
                strokeWidth=".8"
              />
            ))}
          </svg>
          <Scissors className="scissor-drawing" size={39} strokeWidth={1} />
        </div>
      </div>
    </section>
  );
}
