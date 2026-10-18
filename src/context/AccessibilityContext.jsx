import React, { useCallback, useEffect, useState } from 'react';
import { AccessibilityContext } from './accessibility';

// Visitor accessibility preferences. Each one is applied as a data-attribute on
// <html> (see assets/styles/accessibility.css) and saved in localStorage.
// Reduce motion is off until the visitor turns it on; high contrast follows the
// OS setting until the visitor changes it.

const STORAGE_KEY = 'a11y-prefs';

const DEFAULTS = {
  textSize: 'default',
  reduceMotion: false, // off by default, even if the OS asks for reduced motion
  highContrast: null, // null = follow the OS setting
  readableFont: false,
  highlightLinks: false,
};

const loadPrefs = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object') return DEFAULTS;
    // Older saves used null ("follow the OS") for reduce motion; that now means off.
    return { ...DEFAULTS, ...saved, reduceMotion: Boolean(saved.reduceMotion) };
  } catch {
    return DEFAULTS;
  }
};

// Live boolean for a media query, e.g. the OS "reduce motion" switch.
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

// Atkinson Hyperlegible is only downloaded once someone turns on "Readable font".
const loadReadableFont = () => {
  if (document.getElementById('a11y-readable-font')) return;
  const link = document.createElement('link');
  link.id = 'a11y-readable-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap';
  document.head.appendChild(link);
};

export const AccessibilityProvider = ({ children }) => {
  const [prefs, setPrefs] = useState(loadPrefs);
  const systemHighContrast = useMediaQuery('(prefers-contrast: more)');

  const reduceMotion = Boolean(prefs.reduceMotion);
  const highContrast = prefs.highContrast ?? systemHighContrast;

  useEffect(() => {
    const root = document.documentElement;
    const toggle = (name, on) => (on ? root.setAttribute(name, '') : root.removeAttribute(name));
    root.setAttribute('data-text-size', prefs.textSize);
    toggle('data-reduce-motion', reduceMotion);
    toggle('data-high-contrast', highContrast);
    toggle('data-readable-font', prefs.readableFont);
    toggle('data-highlight-links', prefs.highlightLinks);
    if (prefs.readableFont) loadReadableFont();
  }, [prefs, reduceMotion, highContrast]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Private mode / blocked storage: settings still work for this visit.
    }
  }, [prefs]);

  const setPref = useCallback((key, value) => setPrefs((p) => ({ ...p, [key]: value })), []);
  const reset = useCallback(() => setPrefs(DEFAULTS), []);

  const isCustomized = JSON.stringify(prefs) !== JSON.stringify(DEFAULTS);

  return (
    <AccessibilityContext.Provider
      value={{ ...prefs, reduceMotion, highContrast, setPref, reset, isCustomized }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
