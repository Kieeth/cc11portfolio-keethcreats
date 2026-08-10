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

    // Close mobile menu on nav link click
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

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

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
     3. Back to Top Button
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
     4. Mini-Carousel Auto Cycling
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
        
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ----------------------------------------------------
     6. DevTools & Right-Click Security Protections
  ---------------------------------------------------- */
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }

    if (e.key === 'F12') {
      e.preventDefault();
    }

    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
    }

    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
    }
  });

  /* ----------------------------------------------------
     7. Pull-to-Refresh / Scroll Down Reload (Mobile Engine Support)
  ---------------------------------------------------- */
  let startY = 0;
  let pullDistance = 0;
  let isPulling = false;
  const PULL_THRESHOLD = 120;

  window.addEventListener('touchstart', (e) => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop <= 1) {
      startY = e.touches[0].clientY;
      isPulling = true;
      pullDistance = 0;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isPulling) return;
    const currentY = e.touches[0].clientY;
    pullDistance = currentY - startY;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (!isPulling) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollTop <= 5 && pullDistance > PULL_THRESHOLD) {
      window.location.reload();
    }

    isPulling = false;
    startY = 0;
    pullDistance = 0;
  });

  /* ----------------------------------------------------
     8. Dynamic Scroll-Spy Navbar Active Link Highlighting
  ---------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length > 0 && navAnchorLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navAnchorLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    });
  }

});