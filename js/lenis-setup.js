// Lenis Smooth Scroll Setup - Ultra Premium Configuration
// Detect touch devices and small screens
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isSmallScreen = window.innerWidth < 768;

const lenis = new Lenis({
  duration: isTouchDevice || isSmallScreen ? 0.6 : 1.2,
  easing: (t) => {
    // Smooth easing curve - very fluid
    return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
  },
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: !(isTouchDevice || isSmallScreen), // Disable smooth scroll on touch/small devices
  smoothTouch: false, // Explicitly disable touch smoothing
  touchMultiplier: isTouchDevice || isSmallScreen ? 1 : 1.8,
  infinite: false,
  syncTouch: false, // Disable sync touch for better mobile behavior
  syncTouchLerp: 0.075,
});

// High-performance animation loop - only run if smooth scrolling is enabled
if (!(isTouchDevice || isSmallScreen)) {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Perfect integration between Lenis and ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Smooth ticker - only for non-touch devices
if (!(isTouchDevice || isSmallScreen)) {
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
}

// Disable default scroll behavior for ultra smoothness - only on desktop
if (!(isTouchDevice || isSmallScreen)) {
  document.documentElement.style.scrollBehavior = 'auto';
}

// Add mobile-specific scroll handling
if (isTouchDevice || isSmallScreen) {
  // Prevent momentum scrolling issues on mobile
  document.addEventListener('touchstart', () => {
    lenis.stop();
  }, { passive: true });

  document.addEventListener('touchend', () => {
    lenis.start();
  }, { passive: true });

  // Ensure natural scrolling on mobile
  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overscrollBehavior = 'none';
}
