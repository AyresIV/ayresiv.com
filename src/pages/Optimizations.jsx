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
    { title: "CPU Overclocking", price: "$50", description: "Safe and stable CPU overclocking to push your processor beyond factory settings for better performance. Includes stress testing and temperature monitoring to ensure system stability." },
    { title: "CPU Undervolting", price: "$40", description: "Reduce CPU voltage to lower temperatures and power consumption while maintaining performance. Ideal for laptops and systems with thermal constraints. Includes stability testing to ensure reliability." },
    { title: "GPU Overclocking", price: "$30", description: "Boost your graphics card performance with safe overclocking tailored to your specific GPU model. Includes memory clock and core clock adjustments with stability testing." },
    { title: "RAM Overclocking", price: "$10", description: "Basic RAM frequency and timing adjustments to improve memory performance. Note: Results may vary based on RAM quality and motherboard capabilities." },
    { title: "RAM Overclocking + ISLC", price: "$10", description: "RAM overclocking combined with Intelligent Standby List Cleaner (ISLC) configuration to prevent memory leaks and stuttering in games, especially beneficial for systems with limited RAM." },
    { title: "Timer Resolution", price: "$10", description: "Optimization of Windows timer resolution to reduce input lag and improve frame pacing. Particularly beneficial for competitive gaming and high-refresh-rate systems." },
    { title: "OBS Optimizations (Settings Only)", price: "$15", description: "Basic OBS Studio configuration for optimal streaming/recording quality based on your hardware. Includes encoder settings, output resolution, and bitrate recommendations." },
    { title: "In-Depth OBS Optimizations", price: "$30", description: "Comprehensive OBS Studio setup including advanced settings, scene optimization, custom filters, and performance tuning to maximize stream quality while minimizing system impact." },
    { title: "In-Depth RAM Overclocking (Ryzen)", price: "$50", description: "Advanced RAM tuning specifically for AMD Ryzen systems, including Infinity Fabric optimization, detailed timing adjustments, and extensive stability testing to maximize performance." },
    { title: "Troubleshooting Session", price: "$15/h", description: "Personalized help to diagnose and resolve PC performance issues, crashes, or stability problems. Includes analysis of system logs, hardware diagnostics, and solution implementation." }
  ];

  const bundles = [
    { title: "Base + All Overclocked Package + OBS", price: "$150", description: "Complete system optimization package including Base optimizations, CPU/GPU/RAM overclocking, and OBS settings optimization. Perfect for streamers looking to maximize both gaming and streaming performance.", highlight: false },
    { title: "Base Plus + All Overclocked Package + OBS", price: "$170", description: "Enhanced version of the Base bundle with additional system tweaks from Base Plus, full component overclocking, and OBS optimization for professional streamers and content creators.", highlight: false },
    { title: "Ultimate + All Overclocked Package + OBS", price: "$195", description: "Premium package combining our most comprehensive system optimizations (Ultimate), full hardware overclocking, and advanced OBS configuration for the ultimate streaming and gaming setup.", highlight: false },
    { title: "Base + All Overclocked Package", price: "$140", description: "Essential system optimizations paired with CPU, GPU, and RAM overclocking for gamers who want maximum performance without streaming capabilities.", highlight: false },
    { title: "Base Plus + All Overclocked Package", price: "$160", description: "Advanced system optimizations combined with full hardware overclocking for competitive gamers and power users seeking every possible performance advantage.", highlight: false },
    { title: "Ultimate + All Overclocked Package", price: "$185", description: "Our most comprehensive performance package, combining the full Ultimate optimization suite with complete hardware overclocking for the absolute best gaming performance.", highlight: false },
    { title: "Base + OBS", price: "$60", description: "Entry-level package for new streamers, combining basic system optimizations with OBS setup to improve streaming performance without hardware overclocking.", highlight: false },
    { title: "Base Plus + OBS", price: "$80", description: "Improved streaming package with enhanced system optimizations (Base Plus) and OBS configuration for better stream quality and system performance.", highlight: false },
    { title: "Ultimate + OBS", price: "$105", description: "High-end streaming optimization package with our most thorough system optimizations (Ultimate) paired with OBS configuration for professional streamers.", highlight: false },
    { title: "Base + In-Depth OBS", price: "$70", description: "Basic system optimizations combined with advanced OBS configuration including custom filters and scene optimization for improved stream quality.", highlight: false },
    { title: "Base Plus + In-Depth OBS", price: "$90", description: "Enhanced system optimizations paired with professional-grade OBS configuration for serious content creators looking to improve both system and stream performance.", highlight: false },
    { title: "Ultimate + In-Depth OBS", price: "$115", description: "Top-tier package combining our most extensive system optimizations with professional OBS setup for streamers who demand the absolute best performance and quality.", highlight: false },
    { title: "Everything Overclocked", price: "$90", description: "Complete hardware overclocking package including CPU, GPU, and RAM overclocking for users who want to push their components to the limit without full system optimizations.", highlight: false },
    { title: "Everything Overclocked (In-Depth RAM Overclocking)", price: "$120", description: "Premium overclocking package with advanced RAM tuning (especially beneficial for Ryzen systems) in addition to CPU and GPU overclocking for maximum performance gains.", highlight: false },
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
          <h2 className="optimizations-section-title">Bundle Deals</h2>
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

      <footer className="optimizations-footer">
        <p>&copy; 2026 Ayres Optimizations. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Optimizations;