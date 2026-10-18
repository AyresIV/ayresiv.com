import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Particles from '../components/Particles';
import Footer from '../components/Footer';

// Catch-all for unknown URLs (GitHub Pages' 404.html sends them back into the app).
const NotFound = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Page not found — AyresIV';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <Navigation />
      <Particles />
      <main id="main" tabIndex={-1} className="not-found">
        <p data-reveal className="not-found__code">404</p>
        <h1 data-reveal className="not-found__title">This page doesn&apos;t exist</h1>
        <p data-reveal className="not-found__text">
          The link may be old or mistyped. Here&apos;s where you probably wanted to go:
        </p>
        <div data-reveal className="hero-cta not-found__actions">
          <Link to="/" className="cta-button primary">Home</Link>
          <Link to="/optimizations" className="cta-button secondary">Plans &amp; Bundles</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
