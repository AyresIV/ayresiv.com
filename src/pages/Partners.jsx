import React from 'react';
import Navigation from '../components/Navigation';
import Particles from '../components/Particles';
import NeonCard from '../components/NeonCard';
import Footer from '../components/Footer';
import usePageMeta from '../hooks/usePageMeta';
import { Twitch } from 'lucide-react';

import partners from '../data/partners';

const XLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.694L2.896 21.75H-1.232l7.732-8.835L-2.4 2.25h6.803l4.882 6.45L17.07 2.25h.174zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);

const Partners = () => {
  usePageMeta('/partners');


  return (
    <>
      <Navigation />

      {/* Animated particles for Partners page */}
      <Particles />

      <main id="main" tabIndex={-1} className="partners-section">
        <div className="partners-container">
          <div className="partners-header">
            <h1 data-reveal className="partners-title">My Partners</h1>
            <div data-reveal className="partners-divider"></div>
          </div>

          <div className="partners-grid">
            {partners.map((partner, idx) => (
              <NeonCard key={partner.name} index={idx}>
                <div className="partner-content">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="partner-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="partner-name">{partner.name}</h3>
                  
                  <div className="partner-links">
                    {partner.twitter && (
                      <a 
                        href={partner.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="partner-link"
                        aria-label={`${partner.name} on X`}
                      >
                        <XLogo />
                      </a>
                    )}
                    {partner.twitch && (
                      <a 
                        href={partner.twitch} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="partner-link"
                        aria-label={`${partner.name} on Twitch`}
                      >
                        <Twitch size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Partners;