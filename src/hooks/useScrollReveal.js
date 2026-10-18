import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { useAccessibility } from '../context/accessibility';

// Fades + lifts every [data-reveal] element inside `scope` as it scrolls into
// view. Elements entering together are staggered. Runs once per element.
// Opacity only (not visibility), so hidden links stay in the tab order.
export default function useScrollReveal(scope, key) {
  const { reduceMotion } = useAccessibility();

  useGSAP(
    () => {
      if (reduceMotion || !scope.current) return;
      const items = scope.current.querySelectorAll('[data-reveal]');
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y: 24 });
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.07,
            overwrite: true,
            clearProps: 'transform',
          }),
      });
    },
    { scope, dependencies: [key, reduceMotion], revertOnUpdate: true }
  );
}
