import React from 'react';
import Navigation from '../components/Navigation';
import NeonCard from '../components/NeonCard';
import { Twitch } from 'lucide-react';
import './partners-page.css';

// Import all partner images
import WallahImg from '../assets/images/Wallah.jpg';
import BennyImg from '../assets/images/Benny.jpg';
import BogImg from '../assets/images/Bog.jpg';
import DiffizzleImg from '../assets/images/Diffizzle.jpg';
import OmletImg from '../assets/images/Omlet.png';
import PureChillImg from '../assets/images/PureChill.jpg';
import LanzaImg from '../assets/images/lanza.jpg';
import SayariuImg from '../assets/images/Sayariu.jpg';
import AlexImg from '../assets/images/Alex.png';
import SnazzyImg from '../assets/images/Snazzy.jpg';
import HugzImg from '../assets/images/Hugz.jpg';
import GaryImg from '../assets/images/Gary.jpg';
import BuiImg from '../assets/images/Bui.jpg';
import PanthoImg from '../assets/images/Pantho.jpg';

const XLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.694L2.896 21.75H-1.232l7.732-8.835L-2.4 2.25h6.803l4.882 6.45L17.07 2.25h.174zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);

const Partners = () => {
  const partners = [
    { name: "Wallah", image: WallahImg, twitter: "https://x.com/saywallahbruhh", twitch: "https://www.twitch.tv/wallah" },
    { name: "Benny", image: BennyImg, twitter: "https://x.com/ShmurdaBenny", twitch: "https://www.twitch.tv/benny" },
    { name: "BogOnMyDog", image: BogImg, twitter: "https://x.com/BogOnMyDog", twitch: "https://www.twitch.tv/bogonmydog" },
    { name: "Diffizzle", image: DiffizzleImg, twitter: "https://x.com/TooDiffizzle", twitch: "https://www.twitch.tv/diffizzle" },
    { name: "Omlet", image: OmletImg, twitter: "https://x.com/iomlet", twitch: "https://www.twitch.tv/omlet" },
    { name: "PureChill", image: PureChillImg, twitter: "https://x.com/PureChiLL", twitch: "https://www.twitch.tv/purechill" },
    { name: "Lanza", image: LanzaImg, twitter: "https://x.com/LanzaGB", twitch: "https://www.twitch.tv/lanza" },
    { name: "Sayariu", image: SayariuImg, twitter: "https://x.com/Sayariu", twitch: "https://www.twitch.tv/sayariu" },
    { name: "AlexApe", image: AlexImg, twitter: "https://x.com/AIexApe", twitch: "https://www.twitch.tv/AlexApe" },
    { name: "TheSnazzzyRock", image: SnazzyImg, twitter: "https://x.com/TheSnazzzyRock", twitch: "https://www.twitch.tv/thesnazzzyrock" },
    { name: "Hugz", image: HugzImg, twitter: "https://x.com/qHugzz", twitch: "https://www.twitch.tv/qHugz" },
    { name: "GuapoGary", image: GaryImg, twitter: "https://x.com/GuapoGary_", twitch: "https://www.twitch.tv/guapogary" },
    { name: "Buincey", image: BuiImg, twitter: "https://x.com/Buincey", twitch: "https://www.twitch.tv/buincey" },
    { name: "Pantho", image: PanthoImg, twitter: "https://x.com/yPantho", twitch: "https://www.twitch.tv/pantho" }
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
                    src={partner.image} 
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