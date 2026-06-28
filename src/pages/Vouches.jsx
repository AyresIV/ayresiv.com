import React from 'react';
import Navigation from '../components/Navigation';
import NeonCard from '../components/NeonCard';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import PanthoImg from '../assets/images/Pantho.jpg';
import AlexImg from '../assets/images/Alex.png';
import './vouches-page.css';

// Clients who are also partners get their real avatar.
const avatarMap = {
  Pantho: PanthoImg,
  AlexApe: AlexImg,
};

const Vouches = () => {
  useDocumentTitle('Vouches — AyresIV');

  const vouches = [
    { text: "Will reccomended spartaOS to anyone pc 3000x better in performance also got free guidance on how to daisy chain fans", client: "guzzle" },
    { text: "For anyone trying to squeeze as much performance as possible out of your rig I would definitely recommend SpartaOS. PC feels very responsive and snappy, also for anyone with X3D chips there's a custom Power Plan with these CPUs in mind", client: "Jomey J" },
    { text: "SpartaOS is actually so god damn clean, normal windows is so horrible and the UI in this is perfect and makes everything so smooth when using", client: "s1ght" },
    { text: "Ayres did a great job on my PC improved my performance and was fast and very knowledgeable.", client: "Momac" },
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
            {vouches.map((vouch, idx) => {
              const avatar = avatarMap[vouch.client];
              return (
                <NeonCard key={idx} index={idx}>
                  <div className="vouch-content">
                    <div className="vouch-stars" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="vouch-text">{vouch.text}</p>
                    <div className="vouch-author">
                      {avatar ? (
                        <img src={avatar} alt={vouch.client} className="vouch-avatar" loading="lazy" />
                      ) : (
                        <div className="vouch-avatar vouch-avatar--initial">
                          {vouch.client.charAt(0)}
                        </div>
                      )}
                      <span className="vouch-client">{vouch.client}</span>
                    </div>
                  </div>
                </NeonCard>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Vouches;
