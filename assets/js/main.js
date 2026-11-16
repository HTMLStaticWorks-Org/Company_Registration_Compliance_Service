/* ==========================================================================
   VERDANT BUSINESS SERVICES - MAIN SITE CONTROLLER
   Sticky Navbar, Mobile Navigation Drawer, 3D Hover Tilt, Scroll Reveals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Sticky Navbar & Scroll Effects ---
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 2. Mobile Navigation Drawer ---
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Auto-close drawer if resized to desktop (> 1024px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 3. Desktop & Mobile Dropdown Handling ---
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  navDropdowns.forEach((dd) => {
    const btn = dd.querySelector('.nav-dropdown-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dd.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
      });
    }
  });

  document.addEventListener('click', () => {
    navDropdowns.forEach((dd) => {
      dd.classList.remove('open');
      const btn = dd.querySelector('.nav-dropdown-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  // --- 4. Active Nav Link Highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .dropdown-item, .mobile-sublink');

  // Check if current page is Home 1 or Home 2
  const isHome1 = currentPath === '' || currentPath === 'index.html';
  const isHome2 = currentPath === 'home-2.html';

  if (isHome1 || isHome2) {
    document.querySelectorAll('.nav-dropdown-btn, .mobile-dropdown-btn').forEach((b) => b.classList.add('active'));
    document.querySelectorAll(`.dropdown-item[href="${isHome1 ? 'index.html' : 'home-2.html'}"], .mobile-sublink[href="${isHome1 ? 'index.html' : 'home-2.html'}"]`).forEach((item) => item.classList.add('active'));
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop();
    if (linkPath && currentPath === linkPath) {
      link.classList.add('active');
    }
  });

  // --- 4. Animated Number Counters ---
  const counterEls = document.querySelectorAll('.counter-val');
  if (counterEls.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
            }, 30);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    counterEls.forEach((counter) => counterObserver.observe(counter));
  }

  // --- 5. 3D Card Tilt Interaction ---
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // --- 6. Scroll Reveals ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // --- 7. 3D Coverflow Suite Carousel Controller ---
  const suiteStage = document.getElementById('suiteStage');
  if (suiteStage) {
    const cards = suiteStage.querySelectorAll('.suite-card');
    const dots = document.querySelectorAll('.suite-dot');
    const prevBtn = document.querySelector('.suite-prev-btn');
    const nextBtn = document.querySelector('.suite-next-btn');
    const total = cards.length;
    let currentIndex = 0;

    function updateCoverflow(newIndex) {
      if (total === 0) return;
      currentIndex = ((newIndex % total) + total) % total;

      cards.forEach((card, i) => {
        card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
        const diff = (i - currentIndex + total) % total;

        if (diff === 0) {
          card.classList.add('is-active');
          card.setAttribute('aria-hidden', 'false');
        } else if (diff === 1) {
          card.classList.add('is-next');
          card.setAttribute('aria-hidden', 'true');
        } else if (diff === total - 1) {
          card.classList.add('is-prev');
          card.setAttribute('aria-hidden', 'true');
        } else {
          card.classList.add('is-hidden');
          card.setAttribute('aria-hidden', 'true');
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCoverflow(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCoverflow(currentIndex + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        updateCoverflow(idx);
      });
    });

    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        // If clicking a link/button inside the card, allow default navigation
        if (e.target.closest('a')) return;
        if (card.classList.contains('is-prev')) {
          e.preventDefault();
          updateCoverflow(currentIndex - 1);
        } else if (card.classList.contains('is-next')) {
          e.preventDefault();
          updateCoverflow(currentIndex + 1);
        }
      });
    });

    // Keyboard navigation when stage is focused
    const wrapper = suiteStage.closest('.suite-coverflow-wrapper');
    if (wrapper) {
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          updateCoverflow(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          updateCoverflow(currentIndex + 1);
        }
      });
    }

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    suiteStage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    suiteStage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (diffX < -40) {
        updateCoverflow(currentIndex + 1);
      } else if (diffX > 40) {
        updateCoverflow(currentIndex - 1);
      }
    }, { passive: true });

    // Initial state
    updateCoverflow(0);
  }

  // --- 8. 3D Flip Card Controller (Startup Packages) ---
  const flipCardItems = document.querySelectorAll('.flip-card-item');
  flipCardItems.forEach((card) => {
    const triggerBtns = card.querySelectorAll('.flip-trigger-btn');
    triggerBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        card.classList.toggle('is-flipped');
      });
    });

    // On touch devices / small screens, allow tapping outside buttons to toggle
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        return; // Let links and buttons execute
      }
      if (window.innerWidth <= 860) {
        card.classList.toggle('is-flipped');
      }
    });
  });
});

