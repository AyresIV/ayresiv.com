import React, { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import NeonCard from '../components/NeonCard';
import './optimizations-page.css';

const Optimizations = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const selectedPackageRef = useRef(null);

  const handlePackageClick = (title, price, description) => {
    setSelectedPackage({ title, price, description });
    // Scroll to selected package with a small delay to ensure state updates
    setTimeout(() => {
      selectedPackageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const packages = [
    { title: "Base Optimization", price: "$50", description: "Essential Windows optimizations to improve system responsiveness, reduce input lag, and increase FPS. Includes disabling unnecessary services, optimizing power settings, and configuring graphics options for peak performance." },
    { title: "Base Plus", price: "$75", description: "Enhanced version of Base Optimization with additional tweaks for competitive gaming. Includes all Base features plus registry optimizations, advanced system tuning, and game-specific optimizations for popular titles." },
    { title: "Ultimate Package", price: "$100", description: "Comprehensive system overhaul for maximum performance. Includes all Base Plus optimizations plus driver updates, advanced system debloating, SSD optimization, and personalized settings based on your hardware configuration." },
    { title: "CPU OC + Undervolting", price: "$30", description: "Combined CPU optimization package where you choose your preference: CPU Overclocking only for maximum performance, or CPU Overclocking + Undervolting to balance performance with lower temperatures and power consumption. Includes stress testing and temperature monitoring to ensure system stability." },
    { title: "GPU Overclocking", price: "$20", description: "Boost your graphics card performance with safe overclocking tailored to your specific GPU model. Includes memory clock and core clock adjustments with stability testing." },
    { title: "OBS Complete Setup", price: "$30", description: "Complete OBS Studio configuration combining basic settings and advanced optimization. Includes encoder settings, output resolution, bitrate recommendations, scene optimization, custom filters, and performance tuning to maximize stream quality while minimizing system impact." },
    { title: "Troubleshooting Session", price: "$20/h", description: "Personalized help to diagnose and resolve PC performance issues, crashes, or stability problems. Includes analysis of system logs, hardware diagnostics, and solution implementation." }
  ];

  const bundles = [
    { title: "BONUS: Ultimate + Clean Windows Reinstallation", price: "$150", description: "Guarantees peak performance (requires fresh Windows reinstallation and drive formatting). My most thorough service that starts with a clean slate, removing all bloatware and potential software conflicts, followed by our Ultimate optimization package for a like-new system experience.", highlight: true }
  ];

  return (
    <>
      <Navigation isOptimizationsPage={true} />
      
      {/* Animated particles for Optimizations page */}
      <div className="page-particles"></div>
      <div className="page-particle page-particle-1"></div>
      <div className="page-particle page-particle-2"></div>
      <div className="page-particle page-particle-3"></div>
      <div className="page-particle page-particle-4"></div>
      <div className="page-particle page-particle-5"></div>
      <div className="page-particle page-particle-6"></div>
      <div className="page-particle page-particle-7"></div>
      <div className="page-particle page-particle-8"></div>
      
      <section className="optimizations-hero">
        <div className="optimizations-hero-content">
          <h1 className="optimizations-hero-title">Get The Most Out of Your PC</h1>
          <p className="optimizations-hero-subtitle">More Frames, Less Input Lag, and Latency</p>
          <p className="optimizations-hero-guarantee">7+ Years of PC Optimization Experience</p>
        </div>
      </section>

      <section className="optimizations-selected" ref={selectedPackageRef}>
        <div className="optimizations-container">
          {selectedPackage ? (
            <div className="selected-package">
              <h2 className="selected-title">{selectedPackage.title}</h2>
              <p className="selected-price">{selectedPackage.price}</p>
              <p className="selected-description">{selectedPackage.description}</p>
              <a href="https://discord.gg/spartagg" target="_blank" rel="noopener noreferrer" className="discord-button">
                <i className="fab fa-discord"></i> Join Discord to Proceed
              </a>
            </div>
          ) : (
            <div className="selected-placeholder">
              <p>Select a package or bundle to see details</p>
            </div>
          )}
        </div>
      </section>

      <section className="optimizations-section">
        <div className="optimizations-container">
          <h2 className="optimizations-section-title">Optimization Packages</h2>
          <div className="optimizations-grid">
            {packages.map((pkg, idx) => (
              <NeonCard key={idx}>
                <div 
                  className="package-content"
                  onClick={() => handlePackageClick(pkg.title, pkg.price, pkg.description)}
                >
                  <h3 className="package-title">{pkg.title}</h3>
                  <p className="package-price">{pkg.price}</p>
                  <p className="package-description">{pkg.description}</p>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bundles-section">
        <div className="optimizations-container">
          <h2 className="optimizations-section-title">Premium Packages</h2>
          <div className="optimizations-grid">
            {bundles.map((bundle, idx) => (
              <NeonCard key={idx}>
                <div 
                  className={`bundle-content ${bundle.highlight ? 'bundle-highlight' : ''}`}
                  onClick={() => handlePackageClick(bundle.title, bundle.price, bundle.description)}
                >
                  {bundle.highlight && <div className="highlight-badge">⭐ BONUS</div>}
                  <h3 className="bundle-title">{bundle.title}</h3>
                  <p className="bundle-price">{bundle.price}</p>
                  <p className="bundle-description">{bundle.description}</p>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bundles-section">
        <div className="optimizations-container">
          <h2 className="optimizations-section-title">BIOS Tuning</h2>
          <div className="coming-soon-card">
            <div className="coming-soon-content">
              <h3 className="coming-soon-title">Advanced BIOS Configuration</h3>
              <p className="coming-soon-description">
                Unlock your system's true potential through expert BIOS tuning. This service includes advanced motherboard settings optimization, memory timings refinement, power delivery tuning, and thermal profile configuration. Perfect for enthusiasts looking to maximize performance and stability at the hardware level.
              </p>
              <div className="coming-soon-badge">🚀 Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bundles-section">
        <div className="optimizations-container">
          <h2 className="optimizations-section-title">RAM Tuning</h2>
          <div className="coming-soon-card">
            <div className="coming-soon-content">
              <h3 className="coming-soon-title">Professional RAM Optimization</h3>
              <p className="coming-soon-description">
                Maximize your RAM's performance with precision tuning. This comprehensive service covers frequency optimization, timing adjustments, voltage tuning, and stability validation across all memory configurations. Ideal for systems where every bit of performance matters, from gaming to content creation.
              </p>
              <div className="coming-soon-badge">🚀 Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="optimizations-footer">
        <p>&copy; 2026 Ayres Optimizations. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Optimizations;