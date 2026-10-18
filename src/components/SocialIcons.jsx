import React from 'react';
import BrandIcon from './BrandIcon';

const LINKS = [
  { key: 'discord', label: 'Discord', href: 'https://discord.gg/spartagg' },
  { key: 'x', label: 'X', href: 'https://x.com/AyresIV' },
  { key: 'twitch', label: 'Twitch', href: 'https://twitch.tv/AyresIV' },
  { key: 'github', label: 'GitHub', href: 'https://github.com/AyresIV' },
];

const SocialIcons = () => (
  <div data-reveal className="social-links">
    {LINKS.map(({ key, label, href }) => (
      <a
        key={key}
        href={href}
        className={`social-link social-link--${key}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BrandIcon name={key} />
        <span>{label}</span>
      </a>
    ))}
  </div>
);

export default SocialIcons;
