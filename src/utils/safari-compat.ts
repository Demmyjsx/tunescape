// Safari compatibility utilities
export const isSafari = () => {
  if (typeof window === 'undefined') return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const addSafariSupport = () => {
  if (typeof window === 'undefined') return;
  
  // Add Safari-specific CSS class for targeting
  if (isSafari()) {
    document.documentElement.classList.add('is-safari');
  }

  // Polyfill for backdrop-filter support detection
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') || 
                                  CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
  
  if (!supportsBackdropFilter) {
    document.documentElement.classList.add('no-backdrop-filter');
  }
};

export const handleVideoAutoplay = (videoElement: HTMLVideoElement) => {
  if (!videoElement) return;
  
  // Safari specific video handling
  videoElement.muted = true;
  videoElement.setAttribute('playsinline', 'true');
  videoElement.setAttribute('webkit-playsinline', 'true');
  
  // Force play for Safari
  const playPromise = videoElement.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Autoplay prevented:', error);
      // Fallback: show play button or handle gracefully
    });
  }
};