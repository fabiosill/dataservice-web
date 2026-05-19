/* =========================================================
   DataService – script.js
   Handles: responsive navbar, scroll shadow, smooth scroll
   ========================================================= */

(function () {
  'use strict';

  // --------------------------------------------------
  // 1. MOBILE NAVBAR TOGGLE
  // --------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when any nav link is clicked (mobile UX)
    navMenu.querySelectorAll('.navbar__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------
  // 2. NAVBAR SHADOW ON SCROLL
  // --------------------------------------------------
  const navbar = document.getElementById('navbar');

  if (navbar) {
    function handleNavbarShadow () {
      if (window.scrollY > 8) {
        navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.10)';
      } else {
        navbar.style.boxShadow = '0 1px 0 rgba(0,0,0,0.07)';
      }
    }

    window.addEventListener('scroll', handleNavbarShadow, { passive: true });
    handleNavbarShadow(); // run once on load
  }

  // --------------------------------------------------
  // 3. ANIMATE STATS ON SCROLL (Intersection Observer)
  // --------------------------------------------------
  function animateCounter (el, target, duration) {
    const start    = performance.now();
    const isFloat  = target % 1 !== 0;

    function update (now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = target * eased;
      el.textContent = isFloat
        ? current.toFixed(2) + '%'
        : Math.floor(current).toLocaleString('pt-BR') + el.dataset.suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Set final text with original suffix formatting
        el.textContent = el.dataset.final;
      }
    }

    requestAnimationFrame(update);
  }

  // Attach data attributes to stat values
  const statValues = [
    { selector: '.stat-item:nth-child(1) .stat-item__value', target: 10, suffix: 'M+', final: '10M+', label: 'Transações' },
    { selector: '.stat-item:nth-child(2) .stat-item__value', target: 99.99, suffix: '%', final: '99.99%', label: 'Uptime' },
    { selector: '.stat-item:nth-child(3) .stat-item__value', target: 500, suffix: '+', final: '500+', label: 'Enterprise' },
    { selector: '.stat-item:nth-child(4) .stat-item__value', target: 150, suffix: '+', final: '150+', label: 'Países' },
  ];

  statValues.forEach(function (item) {
    const el = document.querySelector(item.selector);
    if (el) {
      el.dataset.suffix = item.suffix;
      el.dataset.final  = item.final;
      el.dataset.target = item.target;
    }
  });

  // Observe stats section
  const statsSection = document.querySelector('.stats');
  if (statsSection && 'IntersectionObserver' in window) {
    let animated = false;

    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        statValues.forEach(function (item) {
          const el = document.querySelector(item.selector);
          if (el) {
            animateCounter(el, item.target, 1400);
          }
        });
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // --------------------------------------------------
  // 4. FADE-IN ON SCROLL (service cards, feature items)
  // --------------------------------------------------
  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll(
      '.service-card, .feature-item, .stat-item, .hero__content, .hero__image-wrap, .why__image-wrap, .why__content'
    );

    // Add initial hidden state via inline style
    fadeEls.forEach(function (el) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Stagger cards
    fadeEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.08 + 's';
      fadeObserver.observe(el);
    });
  }

})();
