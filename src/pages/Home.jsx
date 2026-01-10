import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from '../components/SocialIcons'
import Footer from '../components/Footer';
import logo from '../assets/images/mylogo.png';
import '../assets/styles/base.css';
import '../assets/styles/structure.css';
import './home-page.css';

const Home = () => {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    // Trigger entrance animations when component mounts
    setIsEntering(true);
  }, []);

  return (
    <>
      <div className={`landing home-landing ${isEntering ? 'entering' : ''}`}>
        {/* Lightning bolt element for entrance */}
        {isEntering && <div className="lightning-bolt-element home-lightning"></div>}
        {/* Animated particles */}
        <div className="home-particles"></div>
        <div className="home-particle home-particle-1"></div>
        <div className="home-particle home-particle-2"></div>
        <div className="home-particle home-particle-3"></div>
        <div className="home-particle home-particle-4"></div>
        <div className="home-particle home-particle-5"></div>
        <div className="home-particle home-particle-6"></div>
        <div className="home-particle home-particle-7"></div>
        <div className="home-particle home-particle-8"></div>
        <div className="home-particle home-particle-9"></div>
        <div className="home-particle home-particle-10"></div>
        <div className="home-particle home-particle-11"></div>
        <div className="home-particle home-particle-12"></div>
        <div className="home-particle home-particle-13"></div>
        <div className="home-particle home-particle-14"></div>
        <div className="home-particle home-particle-15"></div>
        
        <div className="home-hero">
          <div className="hero-content">
            <div className="logo-bubble">
              <img src={logo} alt="AyresIV Logo" className="hero-logo" />
            </div>
            <h1 className="hero-title">AyresIV</h1>
            <p className="hero-subtitle">PC Optimization & Performance Specialist</p>
            <p className="hero-description">
              Unlock your PC's full potential with expert optimization services. 
              From gaming to streaming, I'll transform your system for peak performance.
            </p>
            
            <div className="hero-cta">
              <Link to="/optimizations" className="cta-button secondary">
                Explore Packages
              </Link>
              <Link to="/partners" className="cta-button secondary">
                See Partners
              </Link>
            </div>

            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Boost FPS & reduce lag</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🎮</div>
                <h3>Gaming Ready</h3>
                <p>Optimized for competitive play</p>
              </div>
              <div className="feature">
                <div className="feature-icon">📊</div>
                <h3>Data Driven</h3>
                <p>7+ years of expertise</p>
              </div>
            </div>
          </div>
        </div>

        <div className="social-section">
          <p className="social-label">Connect With Me</p>
          <SocialIcons />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;