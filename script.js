// script.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-links a");
  const logoLink = document.querySelector(".logo");
  const faqItems = document.querySelectorAll(".faq-item");
  const backToTopBtn = document.getElementById("backToTop");
  const sections = document.querySelectorAll("section");

  // 1. Mobile Navigation Toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 2. Close mobile menu on link or logo click
  const closeMenu = () => {
    if (navLinks) navLinks.classList.remove("active");
  };

  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  if (logoLink) {
    logoLink.addEventListener("click", closeMenu);
  }

  // 3. Scroll events: Active Section Highlight & Back to Top Button Visibility
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  });

  // 4. Back to Top Smooth Scroll Action
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 5. FAQ Accordion Toggle
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        faqItems.forEach((otherItem) => otherItem.classList.remove("active"));
        if (!isOpen) {
          item.classList.add("active");
        }
      });
    }
  });
});