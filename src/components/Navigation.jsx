import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoBubble from './LogoBubble';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);

  // Track viewport size so the hamburger toggle stays correct on resize.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handleChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setIsMenuOpen(false); // collapse menu when growing to desktop
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="nav">
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
      </ul>
      <a href="https://discord.gg/spartagg" target="_blank" rel="noopener noreferrer" className="nav__discord" title="Join our Discord" aria-label="Join our Discord">
        <i className="fab fa-discord" aria-hidden="true"></i>
      </a>
    </nav>
  );
};

export default Navigation;