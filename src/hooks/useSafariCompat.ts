'use client';
import { useEffect } from 'react';

export const useSafariCompat = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isSafari) {
        document.documentElement.classList.add('is-safari');
      }

      // Check backdrop-filter support
      const supportsBackdropFilter = 
        CSS.supports('backdrop-filter', 'blur(1px)') || 
        CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
      
      if (!supportsBackdropFilter) {
        document.documentElement.classList.add('no-backdrop-filter');
      }
    }
  }, []);
};

// Tailwind-friendly Safari compatibility class names
export const getSafariCompatClasses = () => {
  return {
    // For gradient text that works in Safari
    gradientText: "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400",
    
    // For backdrop blur with Safari support
    backdropBlur: "backdrop-blur-lg safari-backdrop-blur",
    
    // For smooth animations
    fadeInUp: "animate-fade-in-up",
    
    // For gradient animation
    gradientShift: "animate-gradient-shift bg-200",
  };
};