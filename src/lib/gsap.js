import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Single place GSAP plugins get registered. Import gsap / ScrollTrigger /
// useGSAP from here rather than from the packages directly.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Lenis is driven from GSAP's ticker (see SmoothScroll), so never let GSAP
// "catch up" after a dropped frame — that would make the scroll jump.
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger, useGSAP };
