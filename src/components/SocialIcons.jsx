import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Github, Twitch, Mail } from 'lucide-react';

const SocialIcons = () => {
  const XLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.694L2.896 21.75H-1.232l7.732-8.835L-2.4 2.25h6.803l4.882 6.45L17.07 2.25h.174zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );

  return (
    <div className="social-icons-container">
      <div className="social-icons">
        <Link to="/optimizations" className="social-icon optimizations-icon" title="Optimizations">
          <Settings size={28} />
        </Link>
        
        <a href="https://discord.gg/spartagg" className="social-icon discord-icon" target="_blank" rel="noopener noreferrer" title="Discord">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.317 4.492c-1.53-.742-3.17-1.297-4.885-1.515a.074.074 0 0 0-.079.036c-.211.378-.445.879-.607 1.27a18.566 18.566 0 0 0-5.487 0c-.163-.39-.395-.89-.607-1.27a.077.077 0 0 0-.079-.036c-1.715.217-3.354.773-4.885 1.515a.07.07 0 0 0-.034.03c-3.11 4.653-3.966 9.169-3.54 13.637a.08.08 0 0 0 .031.055c1.644 1.149 3.237 1.85 4.8 2.312a.077.077 0 0 0 .084-.027c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106c-.648-.245-1.266-.535-1.855-.88a.077.077 0 0 1-.008-.128c.124-.093.248-.19.368-.277a.075.075 0 0 1 .078-.01c3.89 1.778 8.117 1.778 11.955 0a.075.075 0 0 1 .079.009c.12.088.244.185.368.277a.077.077 0 0 1-.006.127c-.59.345-1.208.635-1.857.88a.077.077 0 0 0-.041.107c.354.699.764 1.365 1.226 1.994a.076.076 0 0 0 .084.028c1.563-.462 3.157-1.162 4.8-2.312a.077.077 0 0 0 .032-.054c.5-4.718-.838-8.812-3.549-13.637a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"/>
          </svg>
        </a>

        <a href="https://twitter.com/AyresIV" className="social-icon twitter-icon" target="_blank" rel="noopener noreferrer" title="Twitter/X">
          <XLogo />
        </a>

        <a href="https://twitch.tv/AyresIV" className="social-icon twitch-icon" target="_blank" rel="noopener noreferrer" title="Twitch">
          <Twitch size={28} />
        </a>

        <a href="https://github.com/AyresIV" className="social-icon github-icon" target="_blank" rel="noopener noreferrer" title="GitHub">
          <Github size={28} />
        </a>

        <Link to="/contact" className="social-icon contact-icon" title="Contact Me">
          <Mail size={28} />
        </Link>
      </div>
    </div>
  );
};

export default SocialIcons;