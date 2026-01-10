import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Optimizations from './pages/Optimizations';
import About from './pages/About';
import Partners from './pages/Partners';
import Vouches from './pages/Vouches';
import Contact from './pages/Contact';
import './assets/styles/reset.css';
import './assets/styles/base.css';
import './assets/styles/theme.css';
import './assets/styles/structure.css';
import './globals.css';

function AppRoutes() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Handle GitHub Pages 404 redirect
    const redirect = sessionStorage.redirect;
    if (redirect && redirect !== '/') {
      delete sessionStorage.redirect;
      navigate(redirect);
    }
  }, [navigate]);

  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash screen has been shown in this session
    return !sessionStorage.getItem('splashShown');
  });
  const [fadeOut, setFadeOut] = useState(false);

  const handleEnter = () => {
    setFadeOut(true);
    
    setTimeout(() => {
      setShowSplash(false);
      // Mark splash screen as shown for this session
      sessionStorage.setItem('splashShown', 'true');
    }, 1000);
  };

  return (
    <>
      {showSplash ? (
        <div className={`splash-screen-wrapper ${fadeOut ? 'fade-out' : ''}`}>
          <SplashScreen onEnter={handleEnter} />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/optimizations" element={<Optimizations />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/vouches" element={<Vouches />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
