// Main interactions and event handlers

// ===== VIDEO LOOP SMOOTH TRANSITION =====
const heroVideo = document.querySelector('.hero__video');
if (heroVideo) {
  heroVideo.addEventListener('ended', () => {
    // Smooth fade effect when video ends and restarts
    gsap.to(heroVideo, {
      opacity: 0.7,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        // Reset to full opacity as it loops
        gsap.to(heroVideo, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      },
    });
  });
}

// ===== BOOKING BUTTON =====
const bookingButton = document.querySelector('.booking__button');
if (bookingButton) {
  bookingButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Ripple effect on click
    gsap.to(bookingButton, {
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
    console.log('Book Experience clicked');
    // Add your booking logic here (modal, redirect, etc.)
  });
}

// ===== VIDEO ERROR HANDLING =====
const videos = document.querySelectorAll('video');
videos.forEach((video) => {
  video.addEventListener('error', () => {
    console.error('Video failed to load:', video.src);
    // Fallback or error handling
  });

  // Ensure video plays
  video.addEventListener('loadstart', () => {
    video.muted = true; // Ensure muted for autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Video autoplay failed:', error);
      });
    }
  });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    console.log('Close modals or menus if needed');
  }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Cinquecento Premium Site Loaded');

  // Refresh ScrollTrigger for proper initialization
  ScrollTrigger.refresh();
});

// ===== PERFORMANCE: Refresh ScrollTrigger on resize =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
