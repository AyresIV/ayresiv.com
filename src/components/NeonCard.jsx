import { useEffect, useRef, useState } from 'react';

const NeonCard = ({ children, className = "", index = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cursor-following neon glow: expose the pointer position as CSS vars.
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  // Stagger the reveal per card for a cascade, but only until it has played
  // once — afterwards the delay is cleared so hover stays snappy.
  const revealDelay = visible && !revealed ? `${Math.min(index * 55, 350)}ms` : '0ms';

  return (
    <div
      ref={ref}
      className={`neon-card ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': revealDelay }}
      onMouseMove={handleMouseMove}
      onTransitionEnd={() => setRevealed(true)}
    >
      {children}
    </div>
  );
};

export default NeonCard;
