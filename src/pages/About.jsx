import React from 'react';
import Navigation from '../components/Navigation';
import '../assets/styles/About.css';

const About = () => {
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
          <h1 className="about-title">About Me</h1>
          <div className="about-divider"></div>
          <div className="about-content">
            <p className="about-text">
              Hello! My name is Ayres, and I am the founder of Ayres Optimizations. 
              With a passion for technology and optimization, I specialize in helping individuals 
              and businesses achieve peak performance for their systems. I have worked with over 1000 PCs over the years.
              Whether it's general PC optimizations, overclocking, 
              undervolting, or troubleshooting, I provide tailored solutions to meet your needs.
            </p>
            <p className="about-text">
              My journey began when I started facing PC problems at 11 years old, and I spent hours
              trying to fix them. Over the years, I've honed my skills and 
              developed a deep understanding of system optimization. I'm excited to share my 
              expertise with you and help you get the most out of your technology.
            </p>
          </div>
        </section>

        <footer className="about-footer">
          <p>&copy; 2026 Ayres Optimizations. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default About;
