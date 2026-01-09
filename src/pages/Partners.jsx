import React from 'react';
import Navigation from '../components/Navigation';
import NeonCard from '../components/NeonCard';
import { Twitch } from 'lucide-react';
import './partners-page.css';

const XLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.694L2.896 21.75H-1.232l7.732-8.835L-2.4 2.25h6.803l4.882 6.45L17.07 2.25h.174zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);

const Partners = () => {
  const partners = [
    { name: "Wallah", image: "Wallah.jpg", twitter: "https://x.com/saywallahbruhh", twitch: "https://www.twitch.tv/wallah" },
    { name: "Benny", image: "Benny.jpg", twitter: "https://x.com/ShmurdaBenny", twitch: "https://www.twitch.tv/benny" },
    { name: "BogOnMyDog", image: "Bog.jpg", twitter: "https://x.com/BogOnMyDog", twitch: "https://www.twitch.tv/bogonmydog" },
    { name: "Diffizzle", image: "Diffizzle.jpg", twitter: "https://x.com/TooDiffizzle", twitch: "https://www.twitch.tv/diffizzle" },
    { name: "Omlet", image: "Omlet.png", twitter: "https://x.com/iomlet", twitch: "https://www.twitch.tv/omlet" },
    { name: "PureChill", image: "PureChill.jpg", twitter: "https://x.com/PureChiLL", twitch: "https://www.twitch.tv/purechill" },
    { name: "Lanza", image: "lanza.jpg", twitter: "https://x.com/LanzaGB", twitch: "https://www.twitch.tv/lanza" },
    { name: "Sayariu", image: "Sayariu.jpg", twitter: "https://x.com/Sayariu", twitch: "https://www.twitch.tv/sayariu" },
    { name: "AlexApe", image: "Alex.png", twitter: "https://x.com/AIexApe", twitch: "https://www.twitch.tv/AlexApe" },
    { name: "TheSnazzzyRock", image: "Snazzy.jpg", twitter: "https://x.com/TheSnazzzyRock", twitch: "https://www.twitch.tv/thesnazzzyrock" },
    { name: "Hugz", image: "Hugz.jpg", twitter: "https://x.com/qHugzz", twitch: "https://www.twitch.tv/qHugz" },
    { name: "GuapoGary", image: "Gary.jpg", twitter: "https://x.com/GuapoGary_", twitch: "https://www.twitch.tv/guapogary" },
    { name: "Buincey", image: "Bui.jpg", twitter: "https://x.com/Buincey", twitch: "https://www.twitch.tv/buincey" },
    { name: "Pantho", image: "Pantho.jpg", twitter: "https://x.com/yPantho", twitch: "https://www.twitch.tv/pantho" }
  ];

  return (
    <>
      <Navigation isOptimizationsPage={true} />

      {/* Animated particles for Partners page */}
      <div className="page-particles"></div>
      <div className="page-particle page-particle-1"></div>
      <div className="page-particle page-particle-2"></div>
      <div className="page-particle page-particle-3"></div>
      <div className="page-particle page-particle-4"></div>
      <div className="page-particle page-particle-5"></div>
      <div className="page-particle page-particle-6"></div>
      <div className="page-particle page-particle-7"></div>
      <div className="page-particle page-particle-8"></div>

      <section className="partners-section">
        <div className="partners-container">
          <div className="partners-header">
            <h1 className="partners-title">My Partners</h1>
            <div className="partners-divider"></div>
          </div>

          <div className="partners-grid">
            {partners.map((partner, idx) => (
              <NeonCard key={idx}>
                <div className="partner-content">
                  <img 
                    src={`/src/assets/images/${partner.image}`} 
                    alt={partner.name} 
                    className="partner-image"
                  />
                  <h3 className="partner-name">{partner.name}</h3>
                  
                  <div className="partner-links">
                    {partner.twitter && (
                      <a 
                        href={partner.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="partner-link"
                        aria-label="X (Twitter)"
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
                        aria-label="Twitch"
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
      </section>

      <footer className="partners-footer">
        <p>&copy; 2026 Ayres Optimizations. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Partners;