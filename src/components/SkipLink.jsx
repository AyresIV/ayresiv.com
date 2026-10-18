import { useLenis } from 'lenis/react';

// First focusable element on every page: lets keyboard users jump past the nav
// straight to the page's <main id="main">. Hidden until it receives focus.
const SkipLink = () => {
  const lenis = useLenis();

  const onClick = (e) => {
    const main = document.getElementById('main');
    if (!main) return;
    e.preventDefault();
    main.focus({ preventScroll: true });
    if (lenis) lenis.scrollTo(main, { immediate: true });
    else main.scrollIntoView();
  };

  return (
    <a href="#main" className="skip-link" onClick={onClick}>
      Skip to content
    </a>
  );
};

export default SkipLink;
