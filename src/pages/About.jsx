import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ayresImg from '../assets/images/Ayres.jpg';
import '../assets/styles/About.css';

const About = () => {
  useDocumentTitle('About — AyresIV');

  return (
    <>
      <Navigation isOptimizationsPage={true} />

      {/* Animated particles for About page */}
      <div className="page-particles"></div>
      <div className="page-particle page-particle-1"></div>
      <div className="page-particle page-particle-2"></div>
      <div className="page-particle page-particle-3"></div>
      <div className="page-particle page-particle-4"></div>
      <div className="page-particle page-particle-5"></div>
      <div className="page-particle page-particle-6"></div>
      <div className="page-particle page-particle-7"></div>
      <div className="page-particle page-particle-8"></div>

      <div className="about-page">
        <section className="about-section">
          <div className="about-layout">
            <div className="about-photo-wrap">
              <div className="about-photo-frame">
                <img
                  src={ayresImg}
                  alt="Ayres — founder of AyresIV Optimizations"
                  className="about-photo"
                />
              </div>
              <span className="about-photo-badge">Founder</span>
            </div>

            <div className="about-info">
              <p className="about-eyebrow">PC Optimization Specialist</p>
              <h1 className="about-title">About Me</h1>
              <div className="about-divider"></div>

              <div className="about-content">
                <p className="about-text">
                  Hello! My name is Ayres, and I am the founder of AyresIV Optimizations.
                  With a passion for technology and optimization, I specialize in helping individuals
                  and businesses achieve peak performance for their systems. I have worked with over
                  1000 PCs over the years. Whether it's general PC optimizations, overclocking,
                  undervolting, or troubleshooting, I provide tailored solutions to meet your needs.
                </p>
                <p className="about-text">
                  My journey began when I started facing PC problems at 11 years old, and I spent hours
                  trying to fix them. Over the years, I've honed my skills and developed a deep
                  understanding of system optimization. I'm excited to share my expertise with you and
                  help you get the most out of your technology.
                </p>
              </div>

              <div className="about-highlights">
                <div className="about-highlight">
                  <span className="about-highlight-num">1000+</span>
                  <span className="about-highlight-label">PCs Optimized</span>
                </div>
                <div className="about-highlight">
                  <span className="about-highlight-num">7+</span>
                  <span className="about-highlight-label">Years Experience</span>
                </div>
                <div className="about-highlight">
                  <span className="about-highlight-num">15</span>
                  <span className="about-highlight-label">Trusted Partners</span>
                </div>
              </div>

              <div className="about-cta">
                <Link to="/optimizations" className="about-btn about-btn--primary">
                  View Plans
                </Link>
                <a
                  href="https://discord.gg/spartagg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn about-btn--secondary"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
