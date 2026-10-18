import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { gsap, useGSAP } from '../lib/gsap';
import { useAccessibility } from '../context/accessibility';
import { Zap, Gamepad2, ShieldCheck, ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Particles from '../components/Particles';
import SocialIcons from '../components/SocialIcons';
import Footer from '../components/Footer';
import TuneSection from '../components/tune/TuneSection';
import CountUp from '../components/CountUp';
import partners from '../data/partners';
import usePageMeta from '../hooks/usePageMeta';
import logo from '../assets/images/mylogo.webp';

const Home = () => {
  usePageMeta('/');
  const lenis = useLenis();
  const { reduceMotion } = useAccessibility();
  const landingRef = useRef(null);

  // As the hero scrolls away it drifts up and fades, handing off to the
  // "What I tune" section instead of sliding out as a flat block.
  useGSAP(
    () => {
      if (reduceMotion) return;
      gsap.to('.home-hero', {
        y: -90,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: landingRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: landingRef, dependencies: [reduceMotion], revertOnUpdate: true }
  );

  const scrollToTune = () => {
    if (lenis) lenis.scrollTo('#what-i-tune');
    else document.getElementById('what-i-tune')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1}>
      <div className="landing home-landing" ref={landingRef}>
        {/* Animated particles */}
        <Particles variant="home" count={15} />
        
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
              <Link to="/optimizations" className="cta-button primary">
                Explore Packages
              </Link>
              <Link to="/partners" className="cta-button secondary">
                See Partners
              </Link>
            </div>

            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon"><Zap size={26} /></div>
                <h3>Lightning Fast</h3>
                <p>Boost FPS & reduce lag</p>
              </div>
              <div className="feature">
                <div className="feature-icon"><Gamepad2 size={26} /></div>
                <h3>Gaming Ready</h3>
                <p>Optimized for competitive play</p>
              </div>
              <div className="feature">
                <div className="feature-icon"><ShieldCheck size={26} /></div>
                <h3>Safe & Stable</h3>
                <p>Every tweak stress-tested</p>
              </div>
            </div>

            <div className="home-stats">
              <div className="stat">
                <span className="stat-number"><CountUp end={1000} suffix="+" /></span>
                <span className="stat-label">PCs Optimized</span>
              </div>
              <div className="stat">
                <span className="stat-number"><CountUp end={7} suffix="+" /></span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number"><CountUp end={partners.length} /></span>
                <span className="stat-label">Trusted Partners</span>
              </div>
            </div>

            <button
              type="button"
              className="scroll-cue"
              onClick={scrollToTune}
            >
              <span className="scroll-cue__label">See what I tune</span>
              <span className="scroll-cue__icon"><ChevronDown size={20} /></span>
            </button>
          </div>
        </div>

      </div>
      <TuneSection />
      <section className="social-section social-strip">
        <div className="social-inner">
          <div data-reveal className="social-copy">
            <h2 className="social-heading">Let&apos;s connect</h2>
            <p className="social-text">Questions before booking? Reach out on Discord or follow along on socials.</p>
          </div>
          <SocialIcons />
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;