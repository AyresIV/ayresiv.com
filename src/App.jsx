import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';
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

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  React.useEffect(() => {
    // Handle GitHub Pages 404 redirect
    const redirect = sessionStorage.redirect;
    if (redirect && redirect !== '/') {
      delete sessionStorage.redirect;
      window.history.replaceState(null, null, redirect);
    }
  }, []);

  const handleEnter = () => {
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/optimizations" element={<Optimizations />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/vouches" element={<Vouches />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
