// Per-page <title> and description. Used by the pages (browser tab title) and
// by the build (vite.config.js writes a dist/<route>/index.html for each entry
// so link previews and search engines see the right tags without running JS).
export const SITE_URL = 'https://ayresiv.com';

const SEO = {
  '/': {
    title: 'AyresIV — PC Optimization & Performance Specialist',
    description:
      'AyresIV — expert PC optimization & performance tuning. Boost FPS, reduce input lag, overclocking, undervolting, debloating and more. 7+ years of experience, 1000+ PCs optimized.',
  },
  '/optimizations': {
    title: 'Plans & Bundles — AyresIV',
    description:
      'PC optimization plans from $20: Windows optimization, debloat, BIOS tuning, RAM tuning, CPU & GPU overclocking, OBS setup and full bundles. Book on Discord.',
  },
  '/about': {
    title: 'About — AyresIV',
    description:
      'Meet Ayres, founder of AyresIV Optimizations: 7+ years of PC tuning and 1000+ PCs optimized, from overclocking and undervolting to troubleshooting.',
  },
  '/vouches': {
    title: 'Vouches — AyresIV',
    description:
      'What clients say after an AyresIV optimization: higher FPS, fewer crashes and smoother, more responsive PCs.',
  },
  '/faq': {
    title: 'FAQ — AyresIV',
    description:
      'How AyresIV sessions work: remote tuning over RustDesk, how long it takes, safety, payment via PayPal, laptops and backing up before a fresh Windows install.',
  },
  '/partners': {
    title: 'Partners — AyresIV',
    description: 'Streamers and creators who trust AyresIV to keep their PCs running at peak performance.',
  },
};

export default SEO;
