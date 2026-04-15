// Scroll-triggered animations with GSAP ScrollTrigger - PREMIUM VERSION

// Detect mobile devices
const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

// ===== HERO ANIMATIONS =====
// Subtle parallax on hero elements during page load
gsap.to('.hero__decoration--1', {
  duration: 20,
  rotation: 360,
  repeat: -1,
  ease: 'none',
});

gsap.to('.hero__decoration--2', {
  duration: 25,
  rotation: -360,
  repeat: -1,
  ease: 'none',
});

// ===== STORY ANIMATIONS =====
// Fade in story content on scroll
gsap.utils.toArray('.story__content').forEach((element) => {
  ScrollTrigger.create({
    trigger: element,
    start: 'top 70%', // Moved down for mobile
    onEnter: () => {
      element.classList.add('visible');
    },
  });
});

// Parallax background effect on story - DISABLED ON MOBILE
if (!isMobile) {
  gsap.to('.story__background', {
    scrollTrigger: {
      trigger: '.story',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      markers: false,
    },
    y: 120,
    duration: 1,
  });
}

// ===== GOLDEN HOUR ANIMATIONS =====
gsap.utils.toArray('.golden-hour').forEach((element) => {
  ScrollTrigger.create({
    trigger: element,
    start: 'top 75%', // Moved down for mobile
    onEnter: () => {
      element.classList.add('visible');
    },
  });
});

// ===== GALLERY CAROUSEL ANIMATIONS =====
// Gallery carousel header animation
gsap.from('.gallery-carousel__header', {
  scrollTrigger: {
    trigger: '.gallery-carousel',
    start: 'top 80%', // Moved down for mobile
  },
  duration: 0.6, // Faster on mobile
  opacity: 0,
  y: 20, // Less movement on mobile
  ease: 'power2.out',
});

// ===== BOOKING SECTION ANIMATIONS =====
// Booking hero animations
gsap.from('.booking__hero', {
  scrollTrigger: {
    trigger: '.booking',
    start: 'top 80%', // Moved down for mobile
  },
  duration: 0.6, // Faster on mobile
  opacity: 0,
  y: 20, // Less movement on mobile
  ease: 'power2.out',
});

// Booking features stagger
gsap.from('.booking__feature', {
  scrollTrigger: {
    trigger: '.booking__features',
    start: 'top 60%',
  },
  duration: 0.8,
  opacity: 0,
  y: 50,
  stagger: 0.12,
  ease: 'power3.out',
});

// Booking CTA animations
gsap.from('.booking__cta', {
  scrollTrigger: {
    trigger: '.booking__cta',
    start: 'top 70%',
  },
  duration: 0.8,
  opacity: 0,
  y: 30,
  ease: 'power2.out',
});

// ===== BOOKING DECORATIONS =====
gsap.to('.booking__decoration--1', {
  duration: 30,
  rotation: 360,
  repeat: -1,
  ease: 'none',
});

gsap.to('.booking__decoration--2', {
  duration: 35,
  rotation: -360,
  repeat: -1,
  ease: 'none',
});

// ===== BUTTON HOVER ANIMATIONS =====
const bookingButton = document.querySelector('.booking__button');
if (bookingButton) {
  bookingButton.addEventListener('mouseenter', () => {
    gsap.to(bookingButton, {
      duration: 0.4,
      boxShadow: '0 0 50px rgba(212, 175, 55, 0.4), 0 0 100px rgba(212, 175, 55, 0.2)',
    });
  });

  bookingButton.addEventListener('mouseleave', () => {
    gsap.to(bookingButton, {
      duration: 0.6,
      boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)',
    });
  });
}

// ===== REFRESH ON LOAD =====
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  
  // Add a slight delay before refresh for smoother experience
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
});

// Refresh ScrollTrigger on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
