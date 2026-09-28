import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '../utils/animation';

const strands = Array.from({ length: 25 }, (_, i) => {
  const x = 90 + i * 43;
  const cut = 135 + ((x - 40) * 35) / 1120;
  return { x, cut, bend: 18 + Math.sin(i * 0.6) * 25 };
});

export function Craft() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: '(min-width: 1000px) and (min-height: 700px)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          if (!context.conditions?.motion) return;
          const desktop = context.conditions.desktop;
          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              id: 'signature-cut',
              trigger: root.current,
              start: desktop ? 'top 82px' : 'top 60%',
              end: desktop ? () => `+=${Math.max(1000, window.innerHeight * 1.6)}` : 'bottom 30%',
              pin: desktop ? '.craft-stage' : false,
              scrub: desktop ? 0.7 : 0.35,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          timeline
            .fromTo(
              '.craft-shears',
              { x: 40, y: 135, rotation: 1.79 },
              {
                motionPath: {
                  path: [
                    { x: 40, y: 135 },
                    { x: 1160, y: 170 },
                  ],
                  autoRotate: true,
                },
                duration: 3,
              },
              0.2,
            )
            .fromTo(
              '.shear-upper',
              { attr: { transform: 'rotate(-17 0 0)' } },
              { attr: { transform: 'rotate(4 0 0)' }, duration: 0.15, repeat: 19, yoyo: true },
              0.2,
            )
            .fromTo(
              '.shear-lower',
              { attr: { transform: 'rotate(17 0 0)' } },
              { attr: { transform: 'rotate(-4 0 0)' }, duration: 0.15, repeat: 19, yoyo: true },
              0.2,
            )
            .fromTo(
              '.craft-trace',
              { scaleX: 0 },
              { scaleX: 1, transformOrigin: 'left center', duration: 3 },
              0.2,
            )
            .fromTo(
              '.craft-progress-fill',
              { scaleX: 0 },
              { scaleX: 1, transformOrigin: 'left center', duration: 3.6 },
              0,
            )
            .from('.craft-finish em', { y: 15, duration: 0.8 }, 2.7)
            .fromTo('.craft-orbit', { rotation: -18 }, { rotation: 18, duration: 3.6 }, 0);

          gsap.utils.toArray<SVGPathElement>('.strand-tail', root.current).forEach((strand, i) => {
            timeline.to(
              strand,
              {
                y: 140 + (i % 4) * 23,
                x: (i % 2 ? 1 : -1) * (15 + (i % 5) * 7),
                rotation: (i % 2 ? 1 : -1) * 12,
                opacity: 0,
                transformOrigin: 'center top',
                duration: 0.65,
                ease: 'power1.in',
              },
              0.2 + ((strands[i].x - 40) / 1120) * 3,
            );
          });
          gsap.utils.toArray<HTMLElement>('.craft-step-line', root.current).forEach((line, i) => {
            timeline.fromTo(
              line,
              { scaleX: 0 },
              { scaleX: 1, transformOrigin: 'left', duration: 1.1 },
              i * 1.15,
            );
          });
          return () => timeline.kill();
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="craft" ref={root} aria-labelledby="craft-title">
      <div className="craft-stage">
        <div className="craft-head section-shell">
          <div>
            <span className="section-label">
              <span /> The art of a fresh start
            </span>
            <h2 id="craft-title">
              A little off.
              <br />
              <em>A whole new feeling.</em>
            </h2>
          </div>
          <div className="craft-aside">
            <span className="craft-orbit" aria-hidden="true">
              ✳
            </span>
            <p>
              A considered cut.
              <br />A lighter feeling.
              <br />
              Entirely you.
            </p>
          </div>
        </div>
        <div className="craft-canvas" aria-hidden="true">
          <svg className="craft-art" viewBox="0 0 1200 380" fill="none">
            <defs>
              <linearGradient
                id="shear-metal"
                x1="-120"
                y1="-40"
                x2="140"
                y2="25"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5c455e" />
                <stop offset=".25" stopColor="#cbb9d0" />
                <stop offset=".45" stopColor="#fffdf9" />
                <stop offset=".58" stopColor="#8e7495" />
                <stop offset=".78" stopColor="#f2eaf4" />
                <stop offset="1" stopColor="#715a79" />
              </linearGradient>
              <linearGradient
                id="strand-tone"
                x1="0"
                y1="0"
                x2="0"
                y2="350"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#b09aa9" stopOpacity=".1" />
                <stop offset=".35" stopColor="#876578" stopOpacity=".55" />
                <stop offset="1" stopColor="#aa8494" stopOpacity=".15" />
              </linearGradient>
            </defs>
            <g stroke="url(#strand-tone)" strokeWidth="1.2">
              {strands.map(({ x, cut, bend }, i) => (
                <g key={i}>
                  <path d={`M${x - bend} -20 C${x + bend * 2} 40 ${x - bend} 85 ${x} ${cut}`} />
                  <path
                    className="strand-tail"
                    d={`M${x} ${cut} C${x + bend} ${cut + 70} ${x - bend * 2} 290 ${x + bend} 370`}
                  />
                </g>
              ))}
            </g>
            <path
              className="craft-trace"
              d="M40 135L1160 170"
              stroke="#a583aa"
              strokeWidth="1"
              strokeDasharray="2 8"
            />
            <g className="craft-shears" transform="translate(600 152)">
              <g className="shear-upper">
                <path
                  d="M-75-21C-49-19-24-10 0-8L174-4Q186-3 175 1L8 10C-17 11-45-4-79-11Z"
                  fill="url(#shear-metal)"
                  stroke="#806987"
                  strokeWidth=".75"
                />
                <ellipse
                  cx="-99"
                  cy="-23"
                  rx="31"
                  ry="23"
                  transform="rotate(15 -99 -23)"
                  stroke="url(#shear-metal)"
                  strokeWidth="10"
                />
                <path
                  d="M-119-43q-25-10-32 5"
                  stroke="url(#shear-metal)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path d="M17-4L161-3" stroke="#fff" strokeWidth="1.4" strokeOpacity=".8" />
              </g>
              <g className="shear-lower">
                <path
                  d="M-75 21C-49 19-24 10 0 8L174 4Q186 3 175-1L8-10C-17-11-45 4-79 11Z"
                  fill="url(#shear-metal)"
                  stroke="#806987"
                  strokeWidth=".75"
                />
                <ellipse
                  cx="-99"
                  cy="23"
                  rx="31"
                  ry="23"
                  transform="rotate(-15 -99 23)"
                  stroke="url(#shear-metal)"
                  strokeWidth="10"
                />
                <path d="M17 4L161 3" stroke="#fff" strokeWidth="1.4" strokeOpacity=".8" />
              </g>
              <circle r="9" fill="#cbbacf" stroke="#715a79" strokeWidth="1.5" />
              <circle r="4" fill="#e5dbe8" stroke="#806987" />
              <path d="M-3 3L3-3" stroke="#806987" />
            </g>
          </svg>
          <span className="craft-art-label">Every detail makes a difference.</span>
        </div>
        <div className="craft-bottom section-shell">
          <div className="craft-steps">
            {[
              ['01', 'We listen.'],
              ['02', 'We shape.'],
              ['03', 'You shine.'],
            ].map(([n, label]) => (
              <div className="craft-step" key={n}>
                <span className="craft-step-line" aria-hidden="true" />
                <span>{n}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
          <p className="craft-finish">
            <em>Ready for your fresh start?</em>
            <a href="#services" aria-label="Explore our salon services">
              <ArrowUpRight size={22} />
            </a>
          </p>
        </div>
        <div className="craft-progress" aria-hidden="true">
          <span className="craft-progress-fill" />
        </div>
        <span className="craft-scroll-hint" aria-hidden="true">
          <ArrowDown size={13} /> A little scroll. A fresh perspective.
        </span>
      </div>
    </section>
  );
}
