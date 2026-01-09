import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoBubble from './LogoBubble';

const Navigation = ({ isOptimizationsPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  if (!isOptimizationsPage) return null;

  return (
    <nav className="nav">
      <div className="nav__logo">
        <LogoBubble />
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMenu} style={{ display: window.innerWidth > 768 ? 'none' : 'block' }}>
        {isMenuOpen ? '✕' : '☰'}
      </button>
      <ul className={`nav__list ${isMenuOpen ? 'active' : ''}`}>
        <li className="nav__item">
          <Link to="/about" className="nav__link" onClick={closeMenu}>About</Link>
        </li>
        <li className="nav__item">
          <Link to="/optimizations" className="nav__link" onClick={closeMenu}>Plans and Bundles</Link>
        </li>
        <li className="nav__item">
          <Link to="/vouches" className="nav__link" onClick={closeMenu}>Vouches</Link>
        </li>
        <li className="nav__item">
          <Link to="/partners" className="nav__link" onClick={closeMenu}>Partners</Link>
        </li>
        <li className="nav__item">
          <Link to="/contact" className="nav__link" onClick={closeMenu}>Contact</Link>
        </li>
      </ul>
      <a href="https://discord.gg/spartagg" target="_blank" rel="noopener noreferrer" className="nav__discord" title="Join our Discord">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.3671C18.7975 3.5928 17.1448 3.128 15.4728 2.9535C15.2501 3.3282 14.9701 3.997 14.7377 4.511C12.9677 4.2265 11.2152 4.2265 9.47524 4.511C9.24291 3.997 8.95741 3.3282 8.73516 2.9535C7.06343 3.128 5.41077 3.5928 3.89127 4.3671C0.555723 9.46344 -0.309971 14.4024 0.0981328 19.2916C2.25099 21.0833 4.36621 22.0842 6.44125 22.6565C6.98233 21.9218 7.46725 21.1357 7.87402 20.296C7.03908 20.0076 6.23149 19.6357 5.47818 19.1957C5.69541 19.0274 5.90814 18.8547 6.11474 18.6783C10.88 21.3195 16.259 21.3195 20.8538 18.6783C21.0604 18.8547 21.2731 19.0274 21.4903 19.1957C20.7369 19.6357 19.9293 20.0076 19.0944 20.296C19.5012 21.1357 19.9861 21.9218 20.5272 22.6565C22.6022 22.0842 24.7174 21.0833 26.8703 19.2916C27.3868 13.8456 26.0545 8.98092 20.317 4.3671ZM8.02202 15.8754C6.8375 15.8754 5.86314 14.8171 5.86314 13.507C5.86314 12.1969 6.8185 11.1386 8.02202 11.1386C9.21553 11.1386 10.1899 12.1969 10.1899 13.507C10.1899 14.8171 9.22392 15.8754 8.02202 15.8754ZM15.9774 15.8754C14.7929 15.8754 13.8185 14.8171 13.8185 13.507C13.8185 12.1969 14.7739 11.1386 15.9774 11.1386C17.1709 11.1386 18.1453 12.1969 18.1453 13.507C18.1453 14.8171 17.1709 15.8754 15.9774 15.8754Z"/>
        </svg>
      </a>
    </nav>
  );
};

export default Navigation;