/* ==========================================================================
   VERDANT BUSINESS SERVICES - INTERACTIVE COMPONENTS & MODALS
   Service Detail Modals, Enquiry Modals, FAQ Accordion, Toast Alerts
   ========================================================================== */

(function () {
  'use strict';

  // --- Toast Notification Utility ---
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
  window.showToast = showToast;

  // --- Service Detail Data Store ---
  const serviceDetails = {
    'pvt-ltd': {
      title: 'Private Limited Company Incorporation',
      badge: 'Most Popular for Startups',
      description: 'The preferred legal entity for high-growth startups, equity investment, and limited liability protection. Recognized by MCA and DPIIT.',
      docs: ['Identity Proof (PAN & Passport/Voter ID/Driving License)', 'Address Proof (Bank Statement/Electricity Bill < 2 mos)', 'Passport-sized photographs', 'Registered Office Address Proof (NOC & Utility Bill)'],
      deliverables: ['Digital Signature Certificates (DSC - Class 3)', 'Director Identification Number (DIN)', 'Name Approval Certificate (RUN/SPICe+)', 'Certificate of Incorporation (COI)', 'Company PAN & TAN', 'Drafted e-MoA and e-AoA', 'Bank Account Opening Assistance'],
      timeline: '7 - 10 Working Days (subject to ROC/MCA approvals)'
    },
    'llp': {
      title: 'Limited Liability Partnership (LLP)',
      badge: 'Best for Professional Firms',
      description: 'Combines the flexibility of an informal partnership with the corporate status and limited liability of a private company.',
      docs: ['PAN card of all designated partners', 'Identity & Address proof of partners', 'Proof of registered registered office premise', 'Drafted LLP Agreement signed by partners'],
      deliverables: ['Partner DPIN/DIN issuance', 'LLP Name Reservation', 'LLP Incorporation Certificate', 'LLP Agreement Drafting & Filing (Form 3)', 'LLP PAN & TAN'],
      timeline: '8 - 12 Working Days'
    },
    'opc': {
      title: 'One Person Company (OPC)',
      badge: 'Ideal for Solo Founders',
      description: 'A distinct corporate entity created with a single shareholder, offering 100% ownership control alongside corporate limited liability.',
      docs: ['PAN Card of Founder & Nominee', 'Identity & Address Proof of both parties', 'Consent of Nominee in Form INC-3', 'Registered Office Utility Bill with NOC'],
      deliverables: ['DSC & DIN for Solo Director', 'OPC Name Approval', 'Certificate of Incorporation', 'Company PAN & TAN', 'Bank Account Resolution'],
      timeline: '6 - 9 Working Days'
    },
    'gst': {
      title: 'Goods & Services Tax (GST) Registration',
      badge: 'Mandatory Tax Compliance',
      description: 'Official 15-digit GSTIN registration for businesses supplying goods or services across state lines or exceeding statutory turnover thresholds.',
      docs: ['PAN of Business & Promoters', 'Aadhaar authentication consent', 'Business Address Proof & Bank Account details', 'Digital Signature / Authorisation letter'],
      deliverables: ['GSTIN Certificate (Form GST REG-06)', 'Login credentials for GST Portal', 'HSN/SAC Code classification sheet', 'First-month filing guidance'],
      timeline: '3 - 5 Working Days'
    },
    'annual-roc': {
      title: 'Annual ROC Compliance & Filing',
      badge: 'Year-Round Secretarial Retainer',
      description: 'Mandatory annual secretarial compliance under Companies Act, including AOC-4 (Financial Statements), MGT-7 (Annual Return), and DIR-3 KYC.',
      docs: ['Audited Financial Statements & Balance Sheet', 'Director reports and Board resolutions', 'Shareholder register details', 'DSC of Directors for e-filing'],
      deliverables: ['Preparation & Filing of Form AOC-4', 'Preparation & Filing of Form MGT-7/7A', 'Director KYC (DIR-3 KYC) for all directors', 'Statutory Registers Update & MCA acknowledgements'],
      timeline: 'Comprehensive Annual Schedule'
    },
    'trademark': {
      title: 'Trademark Registration & Brand Protection',
      badge: 'Intellectual Property Asset',
      description: 'Safeguard your brand name, corporate logo, and commercial slogan with nationwide legal exclusivity under the Trade Marks Act.',
      docs: ['Brand name / Logo artwork (JPEG/PNG)', 'Applicant identity & address proof', 'Power of Attorney / TM-48 form', 'User Affidavit for prior usage claim'],
      deliverables: ['Comprehensive TM Search Report', 'Class Selection (1-45 Classes)', 'Filing of Form TM-A with IP Office', 'Official TM Application Number (instant ™ usage)', 'Examination response tracking'],
      timeline: 'Filing in 24-48 Hours; Registration 6-12 Months'
    },
    'partnership': {
      title: 'Partnership Firm Registration',
      badge: 'Traditional Co-ownership',
      description: 'Ideal for 2 or more partners who want straightforward operational governance governed by the Indian Partnership Act, 1932.',
      docs: ['Identity & Address proof of all partners', 'Registered partnership deed draft', 'PAN of all partners', 'Premises utility bill with NOC'],
      deliverables: ['Custom Partnership Deed Drafting', 'Deed Notarization & Stamp Duty Payment', 'Registrar of Firms (ROF) Registration', 'Firm PAN & Bank Account Letter'],
      timeline: '4 - 7 Working Days'
    },
    'proprietorship': {
      title: 'Sole Proprietorship Registration',
      badge: 'Simple Solo Business',
      description: 'The quickest structure for individual consultants, merchants, and freelancers to establish commercial legitimacy with government certificates.',
      docs: ['Proprietor PAN & Aadhaar Card', 'Registered Office Address Proof (Utility Bill)', 'Bank account statement or canceled cheque'],
      deliverables: ['MSME / Udyam Certificate Registration', 'Goods & Services Tax (GSTIN) Enrollment', 'Current Bank Account Documentation', 'Official Business Letterhead & Seal'],
      timeline: '2 - 4 Working Days'
    },
    'startup': {
      title: 'Startup India (DPIIT) Registration Suite',
      badge: 'Government Recognition & Tax Exemptions',
      description: 'Official DPIIT recognition unlocking 3-year Section 80-IAC income tax exemptions, patent fast-tracking, and priority government tender access.',
      docs: ['Certificate of Incorporation / Registration', 'Pitch Deck / Business write-up', 'Product/Service innovation brief', 'Director credentials & website link'],
      deliverables: ['DPIIT Recognition Certificate', 'Section 80-IAC Tax Exemption Application', 'Section 56 Angel Tax Exemption Filing', 'GeM Portal Onboarding Assistance'],
      timeline: '5 - 8 Working Days'
    }
  };

  // --- Initialize Modal Interactions ---
  document.addEventListener('DOMContentLoaded', () => {
    const modalBackdrop = document.querySelector('#serviceModal');
    const modalTitle = document.querySelector('#modalTitle');
    const modalBadge = document.querySelector('#modalBadge');
    const modalDesc = document.querySelector('#modalDesc');
    const modalDocsList = document.querySelector('#modalDocsList');
    const modalDeliverables = document.querySelector('#modalDeliverables');
    const modalTimeline = document.querySelector('#modalTimeline');
    const modalCloseBtn = document.querySelector('#modalCloseBtn');

    // Open Service Modal
    document.querySelectorAll('[data-service-modal]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const key = trigger.getAttribute('data-service-modal');
        const data = serviceDetails[key] || serviceDetails['pvt-ltd'];

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalBadge) modalBadge.textContent = data.badge;
        if (modalDesc) modalDesc.textContent = data.description;
        if (modalTimeline) modalTimeline.textContent = data.timeline;

        if (modalDocsList) {
          modalDocsList.innerHTML = data.docs.map((doc) => `<li>• ${doc}</li>`).join('');
        }
        if (modalDeliverables) {
          modalDeliverables.innerHTML = data.deliverables.map((item) => `<li>✓ ${item}</li>`).join('');
        }

        if (modalBackdrop) {
          modalBackdrop.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close Modal
    function closeModal() {
      if (modalBackdrop) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-accordion-item');
    faqItems.forEach((item) => {
      const header = item.querySelector('.faq-header');
      if (header) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          faqItems.forEach((other) => other.classList.remove('active'));
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });

    // --- Newsletter Form Submission ---
    document.querySelectorAll('.newsletter-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value.trim()) {
          showToast(`Thank you! Subscription confirmed for ${input.value.trim()}`, 'success');
          input.value = '';
        } else {
          showToast('Please provide a valid email address.', 'warning');
        }
      });
    });

    // --- Consultation / Enquiry Form Handler ---
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('#fullName')?.value || 'Client';
        showToast(`Thank you, ${name}! Your business enquiry has been logged successfully. Our compliance advisor will contact you shortly.`, 'success');
        contactForm.reset();
      });
    }

    // --- Hero Dynamic Background Image Switcher (Different Images) ---
    const bgSlides = document.querySelectorAll('.hero-bg-slide');
    const bgButtons = document.querySelectorAll('.bg-ctrl-btn');
    if (bgSlides.length > 0 && bgButtons.length > 0) {
      let activeSlideIndex = 0;
      let slideInterval = null;

      function switchSlide(idx) {
        bgSlides.forEach((slide, i) => {
          slide.classList.toggle('active', i === idx);
        });
        bgButtons.forEach((btn, i) => {
          btn.classList.toggle('active', i === idx);
        });
        activeSlideIndex = idx;
      }

      function nextSlide() {
        switchSlide((activeSlideIndex + 1) % bgSlides.length);
      }

      function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 5500);
      }

      function stopSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
      }

      bgButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          switchSlide(idx);
          startSlideShow();
        });
      });

      startSlideShow();
    }

    // --- 3D Coverflow Carousel Initializer (Supports Multiple Carousels: Reviews & Industry) ---
    const coverflowWrappers = document.querySelectorAll('.coverflow-carousel-wrapper');
    coverflowWrappers.forEach(coverflowWrapper => {
      const cards = Array.from(coverflowWrapper.querySelectorAll('.coverflow-card'));
      if (cards.length === 0) return;
      const prevBtn = coverflowWrapper.querySelector('.coverflow-nav-btn.prev-btn');
      const nextBtn = coverflowWrapper.querySelector('.coverflow-nav-btn.next-btn');
      const container = coverflowWrapper.closest('.container') || coverflowWrapper.parentElement;
      const dots = Array.from(container.querySelectorAll('.coverflow-dot'));
      const counterEl = container.querySelector('.coverflow-current-idx') || document.querySelector('#coverflowCurrentIdx');
      let currentIndex = 0;
      const totalCards = cards.length;
      let autoPlayTimer = null;

      function updateCoverflow(newIndex) {
        currentIndex = (newIndex + totalCards) % totalCards;

        cards.forEach((card, i) => {
          card.classList.remove('active', 'prev', 'next', 'hidden');
          if (i === currentIndex) {
            card.classList.add('active');
            card.setAttribute('aria-hidden', 'false');
          } else if (i === (currentIndex - 1 + totalCards) % totalCards) {
            card.classList.add('prev');
            card.setAttribute('aria-hidden', 'true');
          } else if (i === (currentIndex + 1) % totalCards) {
            card.classList.add('next');
            card.setAttribute('aria-hidden', 'true');
          } else {
            card.classList.add('hidden');
            card.setAttribute('aria-hidden', 'true');
          }
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });

        if (counterEl) {
          counterEl.textContent = String(currentIndex + 1).padStart(2, '0');
        }
      }

      function nextSlide() {
        updateCoverflow(currentIndex + 1);
      }

      function prevSlide() {
        updateCoverflow(currentIndex - 1);
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          nextSlide();
          resetTimer();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          prevSlide();
          resetTimer();
        });
      }

      // Card click handlers: clicking prev or next card activates it!
      cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
          // If clicking action button or close icon
          if (e.target.closest('.coverflow-action-btn') || e.target.closest('.coverflow-close-icon') || e.target.closest('.industry-action-circle')) {
            e.stopPropagation();
            const title = card.querySelector('.coverflow-title')?.textContent || card.querySelector('.industry-title')?.textContent || 'Industry Framework';
            showToast(`Tailored Compliance Framework for ${title} • Ready to Deploy`, 'info');
            return;
          }

          if (card.classList.contains('prev')) {
            prevSlide();
            resetTimer();
          } else if (card.classList.contains('next')) {
            nextSlide();
            resetTimer();
          }
        });
      });

      // Pagination dots click handler
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          updateCoverflow(idx);
          resetTimer();
        });
      });

      // Keyboard navigation (ArrowLeft and ArrowRight) when wrapper focused
      coverflowWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetTimer();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          resetTimer();
        }
      });

      // Touch swipe support for mobile devices
      let touchStartX = 0;
      let touchStartY = 0;
      coverflowWrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      coverflowWrapper.addEventListener('touchend', (e) => {
        if (e.changedTouches.length === 1) {
          const diffX = e.changedTouches[0].clientX - touchStartX;
          const diffY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
              prevSlide();
            } else {
              nextSlide();
            }
            resetTimer();
          }
        }
      }, { passive: true });

      // Autoplay with pause on hover
      function startTimer() {
        if (!autoPlayTimer) {
          autoPlayTimer = setInterval(nextSlide, 5000);
        }
      }

      function stopTimer() {
        if (autoPlayTimer) {
          clearInterval(autoPlayTimer);
          autoPlayTimer = null;
        }
      }

      function resetTimer() {
        stopTimer();
        startTimer();
      }

      coverflowWrapper.addEventListener('mouseenter', stopTimer);
      coverflowWrapper.addEventListener('mouseleave', startTimer);

      // Initialize
      updateCoverflow(0);
      startTimer();
    });
  });
})();

