import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

// Floating button that appears after scrolling down and smooth-scrolls to top.
const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`back-to-top ${show ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default BackToTop;
