import React from 'react';
import Navigation from '../components/Navigation';
import NeonCard from '../components/NeonCard';
import './vouches-page.css';

const Vouches = () => {
  const vouches = [
    { text: "I paid him to optimize my pc once in 2022 ended up marrying the guy so you can clearly see it works.", client: "Devfox (Wife)" },
    { text: "Vouch, quick and easy optimization my pc no longer crashes randomly. One of the realest uncs I ever met, gotta show some love and appreciation to this man.", client: "Sung" },
    { text: "vouch, he helped me out reaching the potentials of my computer on top of being a cool and awesome mate love this guy for his work and friendship", client: "Jer" },
    { text: "big vouch, helped my pc with undervolting and optimization. game and pc feels butta smooth.", client: "Nest" },
    { text: "idk what to say i joined the discord yesterday and Ayres helped me out in no time i went from having 100fps in cod to 220 and he made pc a lot faster I VERY MUCH RECOMMEND", client: "Vik" },
    { text: "Biggest vouch, optimised multiple PCs for me and helped me troubleshoot issues countless time, best out there", client: "Pantho" },
    { text: "Had problems with fps and fps drops. Did a base optimization session and it ran much smoother afterwards. Also asked him for help from time to time and he always answers and helps out. Really recommended for any1 wanting to increase pc performance and fix issues.", client: "Evix" },
    { text: "Big vouch , he's always ready to answer questions and help , pc ran 10 times better after the optimization , actually the best out there.", client: "Shy" },
    { text: "BIG VOUCHER FROM ME IF U WANT TO BECOME AS GOOD AS ME THEN GO GET AN OPT BY AYRESS!!!!!!!!!!", client: "AlexApe" },
    { text: "Ayres does great work. Decided I wanted to swap over to windows 11. Played on that for about a week. Then had Ayres optimize my pc. Pc runs better than ever and my games run super smooth. 10/10 recommend.", client: "Silent" },
    { text: "He took my PC from barely booting properly to running at consistently at 200 fps at 4k so I mean I guess hes The Best...", client: "Comfy" }
  ];

  return (
    <>
      <Navigation isOptimizationsPage={true} />

      {/* Animated particles for Vouches page */}
      <div className="page-particles"></div>
      <div className="page-particle page-particle-1"></div>
      <div className="page-particle page-particle-2"></div>
      <div className="page-particle page-particle-3"></div>
      <div className="page-particle page-particle-4"></div>
      <div className="page-particle page-particle-5"></div>
      <div className="page-particle page-particle-6"></div>
      <div className="page-particle page-particle-7"></div>
      <div className="page-particle page-particle-8"></div>

      <section className="vouches-section">
        <div className="vouches-container">
          <div className="vouches-header">
            <h1 className="vouches-title">Client Vouches</h1>
            <div className="vouches-divider"></div>
          </div>

          <div className="vouches-grid">
            {vouches.map((vouch, idx) => (
              <NeonCard key={idx}>
                <div className="vouch-content">
                  <p className="vouch-text">"{vouch.text}"</p>
                  <p className="vouch-client">— {vouch.client}</p>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      <footer className="vouches-footer">
        <p>&copy; 2026 Ayres Optimizations. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Vouches;
