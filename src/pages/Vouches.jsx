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
    { text: "He took my PC from barely booting properly to running at consistently at 200 fps at 4k so I mean I guess hes The Best...", client: "Comfy" },
    { text: "Very insightful, informative, and no bs. If your not using Ayres your kind of throwing. Thank you very much for the service.", client: "Anthrax1977" },
    { text: "I do have to say Ayres is the 🐐 quick, reliable guy and straight to the point. 10/10 would recommend again", client: "Poison" },
    { text: "Just had a great experience! 10/10 communication, service, flexibility, and support. Will absolutely recommend to everyone I know and will 100% continue to rely on Ayres for optimization services!", client: "Azrael" },
    { text: "A huge vouch for ayres. He's extremely knowledgeable and patient dealing with someone not pc savvy 😅. I thought my pc was pretty good, but the difference after the optimization is night and day. Worth every penny. Highly recommended 10000%. Thanks again bro!", client: "ImJustABlueBerry" },
    { text: "100/10 Ayres is amazing both fast and very professional and the system is already feeling so much better would highly recommend you don't wanna miss out on this experience", client: "Meliodas" },
    { text: "just got my new optimized by the goat @AyresIV once again❤️ he honestly never fails and always shows massive improvements and is the only person i would let tweak my pc", client: "S1ght" }
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
