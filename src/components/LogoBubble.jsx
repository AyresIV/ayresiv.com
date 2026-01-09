import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/mylogo.png';
import '../pages/home-page.css';

const LogoBubble = () => {
  return (
    <Link to="/" className="logo-bubble-link">
      <div className="logo-bubble">
        <img src={logo} alt="AyresIV Logo" className="hero-logo" />
      </div>
    </Link>
  );
};

export default LogoBubble;
