// script.js
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------
     1. Mobile Hamburger Menu Toggle
  ---------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  /* ----------------------------------------------------
     2. Lightbox Fullscreen Modal Functionality
  ---------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption) {
          lightboxCaption.textContent = img.alt || '';
        }
      }
    });
  });

  // Close Lightbox on Close Button Click
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close Lightbox on Background Click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  }

  /* ----------------------------------------------------
     3. Back to Top Button Functionality
  ---------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ----------------------------------------------------
     4. Mini-Carousel Auto Cycling (Gallery Cards)
  ---------------------------------------------------- */
  const carousels = document.querySelectorAll('.mini-carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.gallery-img');
    if (images.length > 1) {
      let currentIndex = 0;
      setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
      }, 3000);
    }
  });

  /* ----------------------------------------------------
     5. FAQ Accordion Interactivity
  ---------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other open FAQ items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ----------------------------------------------------
     6. DevTools & Right-Click Security Protections
  ---------------------------------------------------- */
  // Disable Right Click Context Menu
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable Keyboard Shortcuts for DevTools & View Source
  document.addEventListener('keydown', (e) => {
    // Prevent Escape Key from Closing Lightbox if hit, or pass through
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }

    // Prevent F12 key
    if (e.key === 'F12') {
      e.preventDefault();
    }

    // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Inspect Element / Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
    }

    // Prevent Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
    }
  });

});