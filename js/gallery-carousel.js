// Gallery Carousel Controller

class GalleryCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 3;
    this.autoplayTimeout = null;
    this.isAutoplay = true;
    this.autoplayDelay = 6000; // 6 seconds

    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.showSlide(0);
    this.startAutoplay();
  }

  cacheElements() {
    this.slides = document.querySelectorAll('.gallery-carousel__slide');
    this.dots = document.querySelectorAll('.gallery-carousel__dot');
    this.container = document.querySelector('.gallery-carousel__container');
  }

  bindEvents() {
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Touch swipe support
    let touchStartX = 0;
    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    this.container.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) this.nextSlide();
      if (touchEndX - touchStartX > 50) this.previousSlide();
    });
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => slide.classList.remove('active'));
    this.dots.forEach((dot) => dot.classList.remove('active'));

    // Show selected slide
    this.slides[index].classList.add('active');
    this.dots[index].classList.add('active');

    this.currentSlide = index;
  }

  goToSlide(index) {
    this.stopAutoplay();
    this.showSlide(index);
    this.startAutoplay();
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(next);
  }

  previousSlide() {
    const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prev);
  }

  startAutoplay() {
    if (!this.isAutoplay) return;
    this.autoplayTimeout = setTimeout(() => {
      this.nextSlide();
      this.startAutoplay();
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    clearTimeout(this.autoplayTimeout);
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GalleryCarousel();
});
