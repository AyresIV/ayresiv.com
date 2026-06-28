import React, { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import NeonCard from '../components/NeonCard';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './optimizations-page.css';

const Optimizations = () => {
  useDocumentTitle('Plans & Bundles — AyresIV');

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
    { title: "Base Optimization", price: "$75", description: "Essential Windows optimizations to improve system responsiveness, reduce input lag, and increase FPS. Includes disabling unnecessary services, optimizing power settings, and configuring graphics options for peak performance." },
    { title: "Ultimate Package", price: "$100", description: "Comprehensive optimization on your existing Windows install (no fresh install required). Includes BIOS Tuning, Simple RAM Tuning, CPU Overclock and GPU Overclock for a major all-around performance boost." },
    { title: "CPU Overclocking / Undervolting", price: "$30", description: "Safe and stable CPU overclocking to push your processor beyond factory settings, or undervolting to lower temperatures and power draw while keeping performance. Includes stress testing and temperature monitoring." },
    { title: "GPU Overclocking", price: "$20", description: "Boost your graphics card performance with safe overclocking tailored to your specific GPU model. Includes memory clock and core clock adjustments with stability testing." },
    { title: "Windows Debloat", price: "$25", description: "Removal of unnecessary pre-installed apps, background processes, and telemetry to free up system resources, reduce overhead, and improve overall responsiveness." },
    { title: "Full OBS Setup", price: "$30", description: "Complete OBS Studio configuration tuned to your hardware, including encoder settings, scenes, output resolution, and bitrate for high-quality streaming and recording with minimal performance impact." },
    { title: "BIOS Tuning", price: "$40", description: "Optimization of key BIOS/UEFI settings for stability and performance, including power, memory, and platform settings tailored to your hardware." },
    { title: "Simple RAM Tuning", price: "$40", description: "RAM frequency and primary timing adjustments to improve memory performance and reduce stutter, with stability testing to keep your system reliable." },
    { title: "Full RAM Tuning", price: "$80", description: "In-depth RAM tuning including detailed timing adjustments and extensive stability testing to extract maximum memory performance from your kit and motherboard." },
    { title: "Troubleshooting Session", price: "$25/h", description: "Personalized help to diagnose and resolve PC performance issues, crashes, or stability problems. Includes analysis of system logs, hardware diagnostics, and solution implementation." }
  ];

  const bundles = [
    { title: "Performance Package", price: "$150", description: "Ultimate Package combined with a Fresh Windows Install and debloat. Includes BIOS Tuning, Simple RAM Tuning, CPU Overclock (if possible), GPU Overclock, and full Windows + Game Optimization.", highlight: false },
    { title: "Supreme Package", price: "$250", description: "Everything I offer in one package: Fresh Windows Installation, Debloat, Windows & Game Optimization, BIOS Tuning, Full RAM Tuning, CPU Overclock / Undervolt, and GPU Overclocking — all with intensive testing.", highlight: true }
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
              <NeonCard key={idx} index={idx}>
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
          <h2 className="optimizations-section-title">Bundle Deals</h2>
          <div className="optimizations-grid">
            {bundles.map((bundle, idx) => (
              <NeonCard key={idx} index={idx}>
                <div 
                  className={`bundle-content ${bundle.highlight ? 'bundle-highlight' : ''}`}
                  onClick={() => handlePackageClick(bundle.title, bundle.price, bundle.description)}
                >
                  {bundle.highlight && <div className="highlight-badge">⭐ BEST VALUE</div>}
                  <h3 className="bundle-title">{bundle.title}</h3>
                  <p className="bundle-price">{bundle.price}</p>
                  <p className="bundle-description">{bundle.description}</p>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Optimizations;