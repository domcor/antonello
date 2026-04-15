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

// ===== MOBILE NAVIGATION MENU =====
const mobileToggle = document.querySelector('.nav__mobile-toggle');
const mobileMenu = document.querySelector('.nav__menu--mobile');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('.nav__link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
}

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
let isProgrammaticScroll = false;

const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Immediately set this link as active
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav height
      
      isProgrammaticScroll = true;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Reset flag after scroll completes
      setTimeout(() => {
        isProgrammaticScroll = false;
      }, 1000); // Adjust timing as needed
    }
  });
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
function updateActiveNavLink() {
  // Skip update during programmatic scroll to preserve clicked link state
  if (isProgrammaticScroll) return;
  
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Offset for nav height
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Remove active class from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current section link
  if (currentSection) {
    const activeLink = document.querySelector(`.nav__link[href="#${currentSection}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

// Update active navigation on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Update on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Cinquecento Premium Site Loaded');
  
  // Initial active link update
  updateActiveNavLink();
  
  // Refresh ScrollTrigger for proper initialization
  ScrollTrigger.refresh();
});
