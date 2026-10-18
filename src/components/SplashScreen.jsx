import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/images/mylogo.webp';
import { useAccessibility } from '../context/accessibility';
import '../assets/styles/splash.css';

// How long the intro holds before it leaves on its own (the progress line under
// the title fills over this time), and how long the exit takes.
const SPLASH_HOLD_MS = 1800;
const EXIT_MS = 700;

// First-visit intro. It enters, holds while the progress line fills, then
// dissolves. onExitStart fires as the exit begins so the site can mount
// underneath and show through; onExitEnd fires once the splash is gone.
const SplashScreen = ({ onExitStart, onExitEnd }) => {
  const [isExiting, setIsExiting] = useState(false);
  const exitingRef = useRef(false);
  const { reduceMotion } = useAccessibility();

  const exit = () => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setIsExiting(true);
    onExitStart();
    setTimeout(onExitEnd, reduceMotion ? 0 : EXIT_MS);
  };

  // Leave on its own once the intro has played; any click, key, scroll or tap
  // skips ahead. Reduced motion skips the intro entirely.
  useEffect(() => {
    const timer = setTimeout(exit, reduceMotion ? 0 : SPLASH_HOLD_MS);
    // Using the accessibility menu (shown over the splash) shouldn't count as "skip".
    const skip = (e) => {
      if (e.target instanceof Element && e.target.closest('.a11y')) return;
      exit();
    };
    const events = ['keydown', 'wheel', 'touchstart', 'pointerdown'];
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, skip));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`splash-screen-epic${isExiting ? ' is-exiting' : ''}`}
      style={{ '--splash-hold': `${SPLASH_HOLD_MS}ms`, '--splash-exit': `${EXIT_MS}ms` }}
    >
      <div className="splash-background" aria-hidden="true">
        <div className="splash-gradient"></div>
        <div className="splash-particles"></div>
      </div>

      <div className="splash-burst-effect" aria-hidden="true"></div>

      <div className="splash-circle-1" aria-hidden="true"></div>
      <div className="splash-circle-2" aria-hidden="true"></div>
      <div className="splash-circle-3" aria-hidden="true"></div>

      <div className="splash-content">
        <div className="splash-icon">
          <img src={logo} alt="" className="splash-logo-img" />
        </div>

        <h1 className="splash-title">AyresIV</h1>
        <p className="splash-subtitle">PC Optimization Specialist</p>

        {/* Doubles as a progress bar for the auto-advance */}
        <div className="splash-progress" aria-hidden="true">
          <span className="splash-progress-bar"></span>
        </div>

        <p className="splash-tagline">Unleash Your PC&apos;s True Power</p>
      </div>

      <button type="button" onClick={exit} className="splash-skip">
        Skip intro
      </button>

      <div className="splash-particle splash-particle-1" aria-hidden="true"></div>
      <div className="splash-particle splash-particle-2" aria-hidden="true"></div>
      <div className="splash-particle splash-particle-3" aria-hidden="true"></div>
    </div>
  );
};

export default SplashScreen;
