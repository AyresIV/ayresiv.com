import React, { useState, useEffect } from 'react';
import logo from '../assets/images/mylogo.png';
import '../assets/styles/splash.css';

const SplashScreen = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [lightningKey, setLightningKey] = useState(0);

  const handleClick = (e) => {
    setIsExiting(true);
    setLightningKey(prev => prev + 1); // Force re-render of lightning element
    onEnter();
  };



  return (
    <div className="splash-screen-epic">
      {/* Lightning bolt element */}
      <div key={lightningKey} className="lightning-bolt-element"></div>
      
      {/* Animated background with Greek mythology theme */}
      <div className="splash-background">
        <div className="splash-gradient"></div>
        <div className="splash-particles"></div>
      </div>

      {/* Burst flash effect */}
      <div className="splash-burst-effect"></div>

      {/* Decorative circles */}
      <div className="splash-circle-1"></div>
      <div className="splash-circle-2"></div>
      <div className="splash-circle-3"></div>

      {/* Main content */}
      <div className="splash-content">
        <div className="splash-title-container">
          <h1 className="splash-title">AyresIV</h1>
          <div className="splash-subtitle-line"></div>
          <p className="splash-subtitle">PC Optimization Specialist</p>
        </div>

        <div className="splash-icon">
          <img src={logo} alt="AyresIV Logo" className="splash-logo-img" />
        </div>

        <button onClick={handleClick} className="splash-enter-button">
          <span className="button-text">Get Started</span>
          <span className="button-glow"></span>
        </button>

        <p className="splash-tagline">Unleash Your PC's True Power</p>
      </div>

      {/* Floating particles effect */}
      <div className="splash-particle splash-particle-1"></div>
      <div className="splash-particle splash-particle-2"></div>
      <div className="splash-particle splash-particle-3"></div>
    </div>
  );
};

export default SplashScreen;