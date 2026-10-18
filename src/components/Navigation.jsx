import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import LogoBubble from './LogoBubble';
import BrandIcon from './BrandIcon';
import { ScrollTrigger, useGSAP } from '../lib/gsap';
import { useAccessibility } from '../context/accessibility';

// Matches the CSS breakpoint (mobile layout is max-width: 767px).
const MOBILE_QUERY = '(max-width: 767px)';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  const { reduceMotion } = useAccessibility();
  const navRef = useRef(null);
  const menuOpenRef = useRef(false);

  // Track viewport size so the hamburger toggle stays correct on resize.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setIsMenuOpen(false); // collapse menu when growing to desktop
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // Never keep the bar hidden while its menu is open.
  useEffect(() => {
    menuOpenRef.current = isMenuOpen;
    if (isMenuOpen && navRef.current) navRef.current.dataset.hidden = 'false';
  }, [isMenuOpen]);

  // Scroll-aware bar: solid once the page has scrolled, tucks away while
  // scrolling down and comes back as soon as you scroll up. Written straight to
  // data-attributes so scrolling never re-renders React.
  useGSAP(
    () => {
      const nav = navRef.current;
      nav.dataset.scrolled = String(window.scrollY > 12);
      nav.dataset.hidden = 'false';
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          nav.dataset.scrolled = String(y > 12);
          const hide = !reduceMotion && !menuOpenRef.current && self.direction === 1 && y > 240;
          nav.dataset.hidden = String(hide);
        },
      });
    },
    { dependencies: [reduceMotion], revertOnUpdate: true }
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav__logo">
        <LogoBubble />
      </div>
      <button
        className="mobile-menu-toggle"
        onClick={toggleMenu}
        style={{ display: isMobile ? 'block' : 'none' }}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
      <ul className={`nav__list ${isMenuOpen ? 'active' : ''}`}>
        <li className="nav__item">
          <NavLink to="/about" className="nav__link" onClick={closeMenu}>About</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/optimizations" className="nav__link" onClick={closeMenu}>Plans and Bundles</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/vouches" className="nav__link" onClick={closeMenu}>Vouches</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/partners" className="nav__link" onClick={closeMenu}>Partners</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/faq" className="nav__link" onClick={closeMenu}>FAQ</NavLink>
        </li>
      </ul>
      <a href="https://discord.gg/spartagg" target="_blank" rel="noopener noreferrer" className="nav__discord" title="Join our Discord" aria-label="Join our Discord">
        <BrandIcon name="discord" size={22} />
      </a>
    </nav>
  );
};

export default Navigation;
