// Lenis Smooth Scroll Setup - Ultra Premium Configuration
// Detect touch devices and small screens
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isSmallScreen = window.innerWidth < 768;

// Completely disable Lenis on mobile for natural scrolling
if (isTouchDevice || isSmallScreen) {
  // Use native browser scrolling on mobile
  document.documentElement.style.scrollBehavior = 'smooth';
  document.documentElement.style.overscrollBehavior = 'contain';
  document.body.style.overscrollBehavior = 'contain';

  // Register ScrollTrigger with GSAP for animations only
  gsap.registerPlugin(ScrollTrigger);

  // Exit early - no Lenis on mobile
  console.log('Mobile device detected - using native scrolling');
} else {
  // Desktop smooth scrolling setup
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
    },
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1.8,
    infinite: false,
    syncTouch: false,
    syncTouchLerp: 0.075,
  });

  // High-performance animation loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Register ScrollTrigger with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Perfect integration between Lenis and ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Smooth ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable default scroll behavior for ultra smoothness
  document.documentElement.style.scrollBehavior = 'auto';
}
