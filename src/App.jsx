import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Optimizations from './pages/Optimizations';
import About from './pages/About';
import Partners from './pages/Partners';
import Vouches from './pages/Vouches';
import './assets/styles/reset.css';
import './assets/styles/base.css';
import './assets/styles/theme.css';
import './assets/styles/structure.css';
import './globals.css';

// Restore the deep-link path BEFORE React Router reads the URL.
// On GitHub Pages a refresh of e.g. /partners hits 404.html, which stores the
// path and redirects to /. We put the real path back here so Router mounts on
// the correct route instead of falling back to Home.
const redirect = sessionStorage.redirect;
if (redirect && redirect !== '/') {
  delete sessionStorage.redirect;
  window.history.replaceState(null, '', redirect);
}

// Routes wrapped so each navigation replays a subtle fade/slide-in.
// Keying the wrapper by pathname remounts it, which re-triggers the animation.
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div className="route-fade" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/optimizations" element={<Optimizations />} />
        <Route path="/about" element={<About />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/vouches" element={<Vouches />} />
      </Routes>
    </div>
  );
}

function App() {
  // Only show the splash the first time the site is opened this session.
  // sessionStorage survives refreshes but clears when the tab/browser closes,
  // so a fresh visit shows the splash again while refreshes do not.
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashSeen'));
  const [fadeOut, setFadeOut] = useState(false);

  const handleEnter = () => {
    sessionStorage.setItem('splashSeen', '1');
    setFadeOut(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 500);
  };

  return (
    <ThemeProvider>
      <Router>
        {showSplash ? (
          <div className={fadeOut ? 'splash-screen fade-zoom-out' : ''}>
            <SplashScreen onEnter={handleEnter} />
          </div>
        ) : (
          <>
            <ScrollToTop />
            <AnimatedRoutes />
            <BackToTop />
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
