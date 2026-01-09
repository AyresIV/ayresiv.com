# AyresIV - PC Optimization Specialist Portfolio

> A modern, high-performance portfolio website showcasing PC optimization services and partnerships

**Live Site:** [https://ayresiv.com](https://ayresiv.com)

## 🚀 Overview

AyresIV is a professional portfolio website built with React and Vite, featuring:

- **Stunning UI/UX** with glassmorphism design and animated particles
- **Modern Tech Stack** for fast performance and reliability
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Fast Deployment** with GitHub Actions CI/CD pipeline
- **SEO Optimized** with proper meta tags and Open Graph support

## 📋 Features

- 🎨 **Modern Design** - Neon glassmorphism aesthetic with smooth animations
- ⚡ **Lightning Fast** - Built with Vite for instant HMR and optimized production builds
- 📱 **Fully Responsive** - Works perfectly on all devices and screen sizes
- 🎬 **Smooth Animations** - Epic splash screen, particle effects, and page transitions
- 🔗 **Easy Navigation** - Intuitive routing with React Router
- 🌙 **Dark Theme** - Eye-friendly dark mode throughout
- 🔄 **Auto Deployment** - GitHub Actions automatically builds and deploys on push

## 🛠️ Technology Stack

- **Frontend:** React 19.2.0, React Router 7.12.0
- **Build Tool:** Vite 5.4.21 with Rolldown
- **Styling:** Custom CSS with modern features (backdrop-filter, gradients, animations)
- **Icons:** Lucide React
- **Deployment:** GitHub Pages with GitHub Actions
- **Domain:** Custom domain (ayresiv.com)

## 📁 Project Structure

```
src/
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── About.jsx             # About/Bio page
│   ├── Optimizations.jsx     # Services page
│   ├── Partners.jsx          # Partner showcase
│   └── Vouches.jsx           # Testimonials
├── components/
│   ├── Navigation.jsx        # Main navigation bar
│   ├── SplashScreen.jsx      # Epic intro screen
│   ├── NeonCard.jsx          # Reusable card component
│   ├── Footer.jsx            # Footer section
│   ├── LogoBubble.jsx        # Logo component
│   ├── SocialIcons.jsx       # Social media links
│   └── ThemeToggle.jsx       # Theme switcher
├── context/
│   └── ThemeContext.jsx      # Theme management
├── assets/
│   ├── images/               # Partner images and logos
│   └── styles/               # Global and page-specific styles
└── App.jsx                   # Main app component
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AyresIV/ayresiv.com.git
cd ayresiv.com

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5175`

## 📦 Build & Deploy

### Local Build

```bash
npm run build
```

Builds the optimized production version in the `dist/` folder.

### Production Deployment

Automatic deployment via GitHub Actions:
1. Push changes to the `main` branch
2. GitHub Actions workflow automatically:
   - Installs dependencies
   - Builds the project
   - Deploys to GitHub Pages
3. Live within 2-3 minutes at https://ayresiv.com

## 🔍 ESLint

```bash
npm run lint
```

Lints the codebase for code quality and style consistency.

## 🎨 Design Features

### Color Palette
- **Primary:** `#bb86fc` (Neon Purple)
- **Secondary:** `#ff79c6` (Neon Pink)
- **Background:** `#0a0a0a` (Deep Black)
- **Accent:** `#0066ff` (Discord Blue)

### Animations
- Particle system with orbital movements
- Smooth page transitions
- Glassmorphism effects
- Hover interactions and neon glows

## 📄 Pages

| Page | Purpose |
|------|---------|
| **Home** | Landing page with call-to-action |
| **About** | Personal bio and mission statement |
| **Optimizations** | PC optimization services and plans |
| **Partners** | Showcase of streaming/content creator partners |
| **Vouches** | Client testimonials and reviews |

## 🔗 Navigation

- Home - `/`
- About - `/about`
- Optimizations - `/optimizations`
- Partners - `/partners`
- Vouches - `/vouches`

## 📞 Contact & Social

- **Discord:** AyresIV
- **Twitter/X:** [@AyresIV](https://x.com/AyresIV)
- **Website:** https://ayresiv.com

## 📝 License

© 2026 Ayres Optimizations. All rights reserved.

## 🙏 Acknowledgments

Built with ❤️ for PC optimization enthusiasts and content creators worldwide.
