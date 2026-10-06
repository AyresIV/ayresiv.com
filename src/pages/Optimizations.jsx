import React from 'react';
import Navigation from '../components/Navigation';
import NeonCard from '../components/NeonCard';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './optimizations-page.css';

const DISCORD_URL = 'https://discord.gg/spartagg';

const PlanCard = ({ plan }) => (
  <div className="package-content">
    {plan.highlight && <div className="highlight-badge">Best Value</div>}
    <h3 className="package-title">{plan.title}</h3>
    <p className="package-price">{plan.price}</p>
    <p className="package-description">{plan.description}</p>
    <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="package-book">
      <i className="fab fa-discord" aria-hidden="true"></i> Book on Discord
    </a>
  </div>
);

const Optimizations = () => {
  useDocumentTitle('Plans & Bundles — AyresIV');

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
      <Navigation />
      
      {/* Animated particles for Optimizations page */}
      <div className="page-particles optimizations-bg"></div>
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

      <section className="bundles-section">
        <div className="optimizations-container">
          <h2 className="optimizations-section-title">Bundle Deals</h2>
          <p className="optimizations-section-subtitle">The best value — everything combined at a lower price.</p>
          <div className="optimizations-grid bundles-grid">
            {bundles.map((bundle, idx) => (
              <NeonCard key={bundle.title} index={idx} className={bundle.highlight ? 'card-highlight' : ''}>
                <PlanCard plan={bundle} />
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <section className="optimizations-section">
        <div className="optimizations-container">
          <h2 className="optimizations-section-title">Individual Services</h2>
          <p className="optimizations-section-subtitle">Pick exactly what your PC needs.</p>
          <div className="optimizations-grid">
            {packages.map((pkg, idx) => (
              <NeonCard key={pkg.title} index={idx}>
                <PlanCard plan={pkg} />
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