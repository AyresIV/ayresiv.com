import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>&copy; {year} AyresIV Optimizations. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
