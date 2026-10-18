import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import SmoothScroll from './components/SmoothScroll';
import SkipLink from './components/SkipLink';
import AccessibilityMenu from './components/AccessibilityMenu';
import useScrollReveal from './hooks/useScrollReveal';
// All page stylesheets load up front, in this order, even though the pages'
// JS is split out below. Lazy-loaded CSS would arrive after globals.css and
// override it, and several pages share rules (e.g. the nav) across these files.
import './assets/styles/base.css';
import './assets/styles/structure.css';
import './pages/home-page.css';
import './components/tune/tune.css';
import './pages/optimizations-page.css';
import './assets/styles/About.css';
import './assets/styles/nav.css';
import './pages/partners-page.css';
import './pages/vouches-page.css';
import './assets/styles/reset.css';
import './assets/styles/theme.css';
import './globals.css';
import './assets/styles/accessibility.css';

// Each page's JS is its own chunk, fetched when first visited. The rest are
// prefetched once the browser is idle so navigating stays instant.
const pages = {
  Home: () => import('./pages/Home'),
  Optimizations: () => import('./pages/Optimizations'),
  About: () => import('./pages/About'),
  Partners: () => import('./pages/Partners'),
  Vouches: () => import('./pages/Vouches'),
  FaqPage: () => import('./pages/FaqPage'),
  NotFound: () => import('./pages/NotFound'),
};
const Home = lazy(pages.Home);
const Optimizations = lazy(pages.Optimizations);
const About = lazy(pages.About);
const Partners = lazy(pages.Partners);
const Vouches = lazy(pages.Vouches);
const FaqPage = lazy(pages.FaqPage);
const NotFound = lazy(pages.NotFound);

const usePrefetchPages = () => {
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => Object.values(pages).forEach((load) => load()));
    return () => cancel(id);
  }, []);
};

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
  const pageRef = useRef(null);
  useScrollReveal(pageRef, location.pathname);
  return (
    <div className="route-fade" key={location.pathname} ref={pageRef}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/optimizations" element={<Optimizations />} />
        <Route path="/about" element={<About />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/vouches" element={<Vouches />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  // Only show the splash the first time the site is opened this session.
  // sessionStorage survives refreshes but clears when the tab/browser closes,
  // so a fresh visit shows the splash again while refreshes do not.
  // 'show' → 'leaving' (site mounts underneath and shows through) → 'done'
  const [splash, setSplash] = useState(() => (sessionStorage.getItem('splashSeen') ? 'done' : 'show'));
  usePrefetchPages();

  // Start fetching the landing page right away so it's ready when the splash leaves.
  useEffect(() => {
    if (splash === 'show') pages.Home();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSplashExit = () => {
    sessionStorage.setItem('splashSeen', '1');
    setSplash('leaving');
  };

  return (
    <Router>
      {splash !== 'done' && (
        <SplashScreen onExitStart={handleSplashExit} onExitEnd={() => setSplash('done')} />
      )}
      {splash !== 'show' && (
        <SmoothScroll>
          <SkipLink />
          <ScrollToTop />
          <Suspense fallback={null}>
            <AnimatedRoutes />
          </Suspense>
          <BackToTop />
        </SmoothScroll>
      )}
      <AccessibilityMenu />
    </Router>
  );
}

export default App;
