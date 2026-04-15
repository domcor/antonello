// Lenis Smooth Scroll Setup - Ultra Premium Configuration
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => {
    // Smooth easing curve - very fluid
    return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
  },
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: true,
  touchMultiplier: 1.8,
  infinite: false,
  syncTouch: true,
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
