import { createContext, useContext } from 'react';

// Shared accessibility preferences; provided by <AccessibilityProvider>.
export const AccessibilityContext = createContext(null);

export const useAccessibility = () => useContext(AccessibilityContext);
