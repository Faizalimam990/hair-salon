import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import type { RefObject } from 'react';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);
export { gsap, ScrollTrigger, useGSAP };
export function useSectionMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current).forEach((el) =>
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          }),
        );
        gsap.utils.toArray<HTMLElement>('[data-image-reveal]', scope.current).forEach((el) =>
          gsap.from(el, {
            clipPath: 'inset(0 0 100% 0 round 8px)',
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }),
        );
      });
      return () => mm.revert();
    },
    { scope },
  );
}
