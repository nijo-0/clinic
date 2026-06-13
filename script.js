/* ═══════════════════════════════════════════════════════════════
   KIZHAKKEVEETIL — script.js
   Handles: navbar scroll state, mobile menu, scroll animations
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR: scroll class ─────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ─── MOBILE MENU TOGGLE ───────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─── SCROLL FADE-IN ANIMATION ─────────────────────────────── */
  // Add .fade-in to all major sections and cards
  const fadeTargets = [
    '.service-card',
    '.team-card',
    '.review-card',
    '.gallery-item',
    '.contact-card',
    '.philosophy-quote',
    '.philosophy-body',
    '.section-title',
    '.philosophy-label',
    '.page-hero-content',
    '.cta-inner',
    '.map-section',
  ];

  const allFadeEls = document.querySelectorAll(fadeTargets.join(', '));
  allFadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  allFadeEls.forEach(el => observer.observe(el));

  /* ─── STAGGERED GRID CHILDREN ───────────────────────────────── */
  // Cards in a grid get staggered delay
  const grids = document.querySelectorAll('.services-grid, .reviews-grid, .contact-cards, .gallery-grid');
  grids.forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

});