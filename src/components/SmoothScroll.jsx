import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useAccessibility } from '../context/accessibility';

// Keeps ScrollTrigger positions in step with Lenis on every scroll frame.
const ScrollTriggerSync = () => {
  useLenis(ScrollTrigger.update);
  return null;
};

// Lenis smooth (inertial) scrolling for the whole page, run off GSAP's ticker
// so Lenis and every ScrollTrigger animation update in the same frame.
// Switched off with "Reduce motion" (or the OS setting), leaving native scroll.
const SmoothScroll = ({ children }) => {
  const { reduceMotion } = useAccessibility();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const update = (time) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [reduceMotion]);

  if (reduceMotion) return children;

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.1, wheelMultiplier: 1, anchors: true, autoRaf: false }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
