import { useRef } from 'react';
import { Scissors } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../utils/animation';

export function ScrollDetails() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1100px) and (prefers-reduced-motion: no-preference)', () => {
        const progress = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: 'max',
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
        progress
          .fromTo(
            '.scroll-thread-fill',
            { scaleY: 0 },
            { scaleY: 1, transformOrigin: 'top', ease: 'none' },
            0,
          )
          .fromTo(
            '.scroll-shears',
            { y: 0 },
            { y: () => (root.current?.clientHeight ?? 0) - 20, ease: 'none' },
            0,
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div className="scroll-thread" ref={root} aria-hidden="true">
      <span className="scroll-thread-fill" />
      <Scissors className="scroll-shears" size={20} strokeWidth={1.3} />
    </div>
  );
}

export function Ribbon() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.ribbon-track',
          { xPercent: -8 },
          {
            xPercent: -28,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
        gsap.to('.ribbon-spark', {
          rotation: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div
      className="brand-ribbon"
      role="group"
      ref={root}
      aria-label="Hair, skin, beauty and care for the whole family"
    >
      <div className="ribbon-track" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div className="ribbon-group" key={i}>
            {['Good hair', 'Glowing skin', 'A little confidence', 'For the whole family'].map(
              (text) => (
                <span className="ribbon-item" key={text}>
                  <span>{text}</span>
                  <span className="ribbon-spark">✳</span>
                </span>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Observe layout changes, not scroll frames, so tab/filter changes keep pins aligned. */
export function MotionCoordinator() {
  useGSAP(() => {
    let disposed = false;
    let refresh: ReturnType<typeof setTimeout>;
    const scheduleRefresh = () => {
      clearTimeout(refresh);
      refresh = setTimeout(() => {
        if (!disposed) ScrollTrigger.refresh();
      }, 180);
    };
    void document.fonts.ready.then(() => {
      if (!disposed) scheduleRefresh();
    });
    const observer = new ResizeObserver(scheduleRefresh);
    document
      .querySelectorAll('.service-grid, .family, .ritual-layout, .faq-list')
      .forEach((el) => observer.observe(el));
    const mm = gsap.matchMedia();
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = Array.from(
        document.querySelectorAll<HTMLElement>(
          '.hero-actions .MuiButton-root, .cta-actions .MuiButton-root',
        ),
      ).map((button) => {
        const x = gsap.quickTo(button, 'x', { duration: 0.4, ease: 'power3.out' });
        const y = gsap.quickTo(button, 'y', { duration: 0.4, ease: 'power3.out' });
        let rect: DOMRect;
        const enter = () => {
          rect = button.getBoundingClientRect();
        };
        const move = (event: PointerEvent) => {
          if (!rect) return;
          x((event.clientX - rect.left - rect.width / 2) * 0.06);
          y((event.clientY - rect.top - rect.height / 2) * 0.12);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        button.addEventListener('pointerenter', enter);
        button.addEventListener('pointermove', move);
        button.addEventListener('pointerleave', leave);
        button.addEventListener('blur', leave);
        return () => {
          button.removeEventListener('pointerenter', enter);
          button.removeEventListener('pointermove', move);
          button.removeEventListener('pointerleave', leave);
          button.removeEventListener('blur', leave);
        };
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    });
    return () => {
      disposed = true;
      clearTimeout(refresh);
      observer.disconnect();
      mm.revert();
    };
  });
  return null;
}
