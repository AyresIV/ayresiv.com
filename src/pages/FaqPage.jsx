import React from 'react';
import Navigation from '../components/Navigation';
import Particles from '../components/Particles';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import usePageMeta from '../hooks/usePageMeta';

const FaqPage = () => {
  usePageMeta('/faq');

  return (
    <>
      <Navigation />
      <Particles className="optimizations-bg" />
      <main id="main" tabIndex={-1}>
        <Faq asPage />
      </main>
      <Footer />
    </>
  );
};

export default FaqPage;
