/**
 * Messboi Official Website - Vanilla JavaScript
 * Pure static client script for interactions, animations, lightbox, and FAQ accordion.
 */

// Placeholder URL for external review submission
const YOUR_REVIEW_FORM_URL = "https://forms.google.com/your-review-form";

/* ==========================================================================
   Robust Body Scroll Locking Utility (Zero Jump, Zero Leakage on iOS & Android)
   ========================================================================== */
let scrollYPosition = 0;
let isScrollLocked = false;

function lockBodyScroll() {
  if (isScrollLocked) return;
  scrollYPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollYPosition}px`;
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  isScrollLocked = true;
}

function unlockBodyScroll() {
  if (!isScrollLocked) return;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  window.scrollTo(0, scrollYPosition);
  isScrollLocked = false;
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initStickyHeader();
  initMobileMenu();
  initLightbox();
  initFaqAccordion();
  initReviewModal();
  initReviewSliderControls();
  initFeaturesSlider();
  initMealCalculator();
  initScrollSpy();
  initScrollAnimations();
  initShareFunctionality();
  initAccountModal();
  initHelplineWidget();
  initDownloadSystem();
});

/* ==========================================================================
   1. Sticky Header Effect
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. Mobile Hamburger Menu with Slide-In Drawer & Scroll Lock
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileCta = document.querySelector('.mobile-menu-cta');

  if (!hamburgerBtn || !mobileMenu) return;

  const openMenu = () => {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('open');
    lockBodyScroll();
  };

  const closeMenu = (callback) => {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('open');
    unlockBodyScroll();
    if (typeof callback === 'function') {
      callback();
    }
  };

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', () => {
      closeMenu();
    });
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', () => {
      closeMenu();
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetHref);
        closeMenu(() => {
          if (targetElement) {
            // Small settling timeout after unlocking body scroll
            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 60);
          }
        });
      } else {
        closeMenu();
      }
    });
  });

  if (mobileCta) {
    mobileCta.addEventListener('click', () => {
      closeMenu();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 860 && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. Screenshots Lightbox
   ========================================================================== */
function initLightbox() {
  const screenshotItems = document.querySelectorAll('.screenshot-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (!screenshotItems.length || !lightboxModal) return;

  let currentIndex = 0;
  const itemsData = [];

  screenshotItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const captionEl = item.querySelector('.screen-card-title, .screenshot-caption');
    const src = img ? img.getAttribute('src') : '';
    const caption = captionEl ? captionEl.textContent.trim() : `Screenshot ${index + 1}`;

    itemsData.push({ src, caption, element: item });

    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('open');
    lockBodyScroll();
  }

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    unlockBodyScroll();
  }

  function updateLightboxContent() {
    const data = itemsData[currentIndex];
    if (!data) return;
    lightboxImg.src = data.src;
    lightboxImg.alt = data.caption;
    if (lightboxCaption) {
      lightboxCaption.textContent = data.caption;
    }
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
    updateLightboxContent();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % itemsData.length;
    updateLightboxContent();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrev();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showNext();
    });
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop-click')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for a clean single-open accordion
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('active', !isActive);
      trigger.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
    });
  });
}

/* ==========================================================================
   5. Interactive Review Modal
   ========================================================================== */
function initReviewModal() {
  const openBtn = document.getElementById('openReviewModalBtn');
  const modal = document.getElementById('reviewModal');
  const closeBtn = document.getElementById('closeReviewModalBtn');
  const reviewForm = document.getElementById('reviewForm');
  const externalLink = document.getElementById('reviewExternalFormLink');

  if (externalLink && typeof YOUR_REVIEW_FORM_URL === 'string') {
    externalLink.href = YOUR_REVIEW_FORM_URL;
  }

  if (!modal || !openBtn) return;

  const openModal = () => {
    modal.classList.add('open');
    lockBodyScroll();
  };

  const closeModal = () => {
    modal.classList.remove('open');
    unlockBodyScroll();
  };

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedbackDiv = document.getElementById('reviewFeedbackNotice');
      const authorVal = document.getElementById('reviewAuthorName')?.value.trim() || 'মেস সদস্য';
      const roleVal = document.getElementById('reviewAuthorRole')?.value.trim() || 'যাচাইকৃত ইউজার';
      const textVal = document.getElementById('reviewContent')?.value.trim() || '';

      // Dynamically prepend user's review to the top marquee track
      if (textVal) {
        const track = document.getElementById('reviewsTrackLeft');
        if (track) {
          const firstChar = authorVal.charAt(0) || 'ম';
          const newCard = document.createElement('article');
          newCard.className = 'pic-review-card';
          newCard.innerHTML = `
            <div class="card-quote-watermark">”</div>
            <div class="pic-review-top">
              <div class="author-avatar" style="background: linear-gradient(135deg, #10b981, #059669);">
                <span>${firstChar}</span>
              </div>
              <div class="author-meta">
                <h4 class="author-name bangla-text">${escapeHtml(authorVal)}</h4>
                <span class="author-role-pill bangla-text">${escapeHtml(roleVal)}</span>
              </div>
              <div class="stars-gold">★★★★★</div>
            </div>
            <blockquote class="pic-review-quote bangla-text">
              “${escapeHtml(textVal)}”
            </blockquote>
            <div class="pic-review-bottom bangla-text">
              <span class="feature-tag">
                <span class="status-dot"></span>
                <span>নতুন রিভিউ</span>
              </span>
              <span class="verified-badge">যাচাইকৃত ব্যবহারকারী</span>
            </div>
          `;
          track.prepend(newCard);
        }
      }

      if (feedbackDiv) {
        feedbackDiv.style.display = 'block';
        feedbackDiv.textContent = 'ধন্যবাদ! আপনার রিভিউ সফলভাবে যুক্ত হয়েছে।';
      }
      setTimeout(() => {
        closeModal();
        reviewForm.reset();
        if (feedbackDiv) feedbackDiv.style.display = 'none';
      }, 2000);
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ==========================================================================
   5b. Review Marquee Slider Controls
   ========================================================================== */
function initReviewSliderControls() {
  const pauseBtn = document.getElementById('reviewsPauseToggleBtn');
  const trackLeft = document.getElementById('reviewsTrackLeft');
  const trackRight = document.getElementById('reviewsTrackRight');

  if (!pauseBtn || !trackLeft || !trackRight) return;

  const iconPause = pauseBtn.querySelector('.icon-pause');
  const iconPlay = pauseBtn.querySelector('.icon-play');
  const label = pauseBtn.querySelector('.ctrl-label');
  let isPaused = false;

  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
      trackLeft.classList.add('paused');
      trackRight.classList.add('paused');
      if (iconPause) iconPause.style.display = 'none';
      if (iconPlay) iconPlay.style.display = 'inline-block';
      if (label) label.textContent = 'স্লাইডার চালু করুন';
    } else {
      trackLeft.classList.remove('paused');
      trackRight.classList.remove('paused');
      if (iconPause) iconPause.style.display = 'inline-block';
      if (iconPlay) iconPlay.style.display = 'none';
      if (label) label.textContent = 'স্লাইডার পজ / প্লে';
    }
  });
}

/* ==========================================================================
   6. Live Interactive Meal & Expense Quick Calculator
   ========================================================================== */
function initMealCalculator() {
  const mealsInput = document.getElementById('calcMealsPerDay');
  const rateInput = document.getElementById('calcMealRate');
  const daysInput = document.getElementById('calcDaysCount');
  const otherExpenseInput = document.getElementById('calcOtherExpense');
  
  const totalMealsEl = document.getElementById('calcTotalMeals');
  const mealCostEl = document.getElementById('calcTotalMealCost');
  const grandTotalEl = document.getElementById('calcGrandTotal');

  if (!mealsInput || !rateInput || !totalMealsEl) return;

  function calculate() {
    const mealsPerDay = parseFloat(mealsInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;
    const days = parseFloat(daysInput.value) || 0;
    const other = parseFloat(otherExpenseInput ? otherExpenseInput.value : 0) || 0;

    const totalMeals = mealsPerDay * days;
    const mealCost = totalMeals * rate;
    const grandTotal = mealCost + other;

    totalMealsEl.textContent = totalMeals.toLocaleString('en-US');
    mealCostEl.textContent = `৳ ${mealCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}`;
    if (grandTotalEl) {
      grandTotalEl.textContent = `৳ ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}`;
    }
  }

  [mealsInput, rateInput, daysInput, otherExpenseInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', calculate);
    }
  });

  calculate();
}

/* ==========================================================================
   7. Scroll Spy for Active Navigation Links
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    if (isScrollLocked) return;
    const scrollY = window.scrollY + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   8. Scroll Reveal Animations & Feature Cards Observer
   ========================================================================== */
function initScrollAnimations() {
  const featureCards = document.querySelectorAll('.feature-card');

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-on-scroll, .feature-card').forEach((el) => {
      el.classList.add('revealed', 'in-view');
    });
    return;
  }

  // General reveal observer for sections
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el) => observer.observe(el));

  // Dedicated IntersectionObserver for feature cards with dynamic sequential stagger
  const cardObserver = new IntersectionObserver((entries, obs) => {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);

    visibleEntries.forEach((entry, index) => {
      const card = entry.target;
      // Stagger each card in the visible batch by 85ms
      const delayMs = index * 85;
      card.style.transitionDelay = `${delayMs}ms`;
      card.classList.add('in-view', 'revealed');

      // Clear delay after reveal so user hovers are instantaneous
      const clearDelay = (e) => {
        if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
          card.style.transitionDelay = '0s';
          card.removeEventListener('transitionend', clearDelay);
        }
      };
      card.addEventListener('transitionend', clearDelay);

      obs.unobserve(card);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  featureCards.forEach((card) => {
    cardObserver.observe(card);
  });
}

/* ==========================================================================
   9. Social Media & Link Sharing Functionality
   ========================================================================== */
function initShareFunctionality() {
  const shareAppBtn = document.getElementById('shareAppBtn');
  const shareModal = document.getElementById('shareModal');
  const closeShareModalBtn = document.getElementById('closeShareModalBtn');
  
  const quickWhatsapp = document.getElementById('quickShareWhatsapp');
  const quickFacebook = document.getElementById('quickShareFacebook');
  const quickCopyBtn = document.getElementById('quickShareCopy');

  const modalWhatsapp = document.getElementById('modalShareWhatsapp');
  const modalFacebook = document.getElementById('modalShareFacebook');
  const modalTelegram = document.getElementById('modalShareTelegram');
  const modalCopyBtn = document.getElementById('modalShareCopy');
  const copyInputUrlBtn = document.getElementById('copyInputUrlBtn');
  const shareUrlInput = document.getElementById('sharePageUrlInput');

  const shareTitle = 'Messboi – মেসের সব হিসাব, এক জায়গায়';
  const shareText = 'মেসের মিল ও খরচের নির্ভুল হিসাব রাখুন সম্পূর্ণ offline-এ Messboi Android অ্যাপ দিয়ে! ডাউনলোড করুন:';
  const getShareUrl = () => window.location.href.split('#')[0];

  const updateShareLinks = () => {
    const url = getShareUrl();
    if (shareUrlInput) shareUrlInput.value = url;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;

    if (quickWhatsapp) quickWhatsapp.href = whatsappUrl;
    if (quickFacebook) quickFacebook.href = facebookUrl;
    if (modalWhatsapp) modalWhatsapp.href = whatsappUrl;
    if (modalFacebook) modalFacebook.href = facebookUrl;
    if (modalTelegram) modalTelegram.href = telegramUrl;
  };

  updateShareLinks();

  const openShareModal = () => {
    updateShareLinks();
    if (shareModal) {
      shareModal.classList.add('open');
      lockBodyScroll();
    }
  };

  const closeShareModal = () => {
    if (shareModal) {
      shareModal.classList.remove('open');
      unlockBodyScroll();
    }
  };

  if (shareAppBtn) {
    shareAppBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = getShareUrl();
      if (navigator.share) {
        try {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: url
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            openShareModal();
          }
        }
      } else {
        openShareModal();
      }
    });
  }

  if (closeShareModalBtn) {
    closeShareModalBtn.addEventListener('click', closeShareModal);
  }

  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) {
        closeShareModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shareModal && shareModal.classList.contains('open')) {
      closeShareModal();
    }
  });

  const copyToClipboard = (onSuccess) => {
    const url = getShareUrl();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(onSuccess).catch(() => {
        fallbackCopyText(url, onSuccess);
      });
    } else {
      fallbackCopyText(url, onSuccess);
    }
  };

  function fallbackCopyText(text, cb) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (cb) cb();
    } catch (err) {
      console.warn('Copy fallback failed', err);
    }
    document.body.removeChild(textArea);
  }

  // Quick Copy Button in Download Section
  if (quickCopyBtn) {
    const copySvg = quickCopyBtn.querySelector('.copy-svg');
    const checkSvg = quickCopyBtn.querySelector('.check-svg');
    const label = quickCopyBtn.querySelector('.copy-text-label');

    quickCopyBtn.addEventListener('click', () => {
      copyToClipboard(() => {
        quickCopyBtn.classList.add('copied');
        if (copySvg) copySvg.style.display = 'none';
        if (checkSvg) checkSvg.style.display = 'block';
        if (label) label.textContent = 'Copied! ✓';

        setTimeout(() => {
          quickCopyBtn.classList.remove('copied');
          if (copySvg) copySvg.style.display = 'block';
          if (checkSvg) checkSvg.style.display = 'none';
          if (label) label.textContent = 'Copy Link';
        }, 2200);
      });
    });
  }

  // Modal Copy Button
  if (modalCopyBtn) {
    const modalBtnText = document.getElementById('modalCopyBtnText');
    modalCopyBtn.addEventListener('click', () => {
      copyToClipboard(() => {
        if (modalBtnText) modalBtnText.textContent = 'Copied! ✓';
        setTimeout(() => {
          if (modalBtnText) modalBtnText.textContent = 'Copy Link';
        }, 2200);
      });
    });
  }

  // Input Copy Button inside Modal
  if (copyInputUrlBtn) {
    copyInputUrlBtn.addEventListener('click', () => {
      copyToClipboard(() => {
        const origText = copyInputUrlBtn.textContent;
        copyInputUrlBtn.textContent = 'Copied! ✓';
        setTimeout(() => {
          copyInputUrlBtn.textContent = origText;
        }, 2200);
      });
    });
  }
}

/* ==========================================================================
   10. Account / Profile Modal (Offline Status Dialog)
   ========================================================================== */
function initAccountModal() {
  const accountBtn = document.getElementById('headerAccountBtn');
  const accountModal = document.getElementById('accountModal');
  const closeBtn1 = document.getElementById('closeAccountModalBtn');
  const closeBtn2 = document.getElementById('closeAccountModalBtn2');
  const downloadBtn = document.getElementById('accountModalDownloadBtn');

  if (!accountModal) return;

  const openModal = () => {
    accountModal.classList.add('open');
    lockBodyScroll();
  };

  const closeModal = () => {
    accountModal.classList.remove('open');
    unlockBodyScroll();
  };

  const openAccountDetailsBtn = document.getElementById('openAccountDetailsFromThemeBtn');
  if (openAccountDetailsBtn) {
    openAccountDetailsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (closeBtn1) closeBtn1.addEventListener('click', closeModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  accountModal.addEventListener('click', (e) => {
    if (e.target === accountModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && accountModal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   11. Floating Helpline Widget & Popover
   ========================================================================== */
function initHelplineWidget() {
  const btn = document.getElementById('floatingHelplineBtn');
  const popover = document.getElementById('helplinePopover');
  const closeBtn = document.getElementById('helplineCloseBtn');

  if (!btn || !popover) return;

  const togglePopover = (e) => {
    e.stopPropagation();
    const isOpen = popover.classList.contains('open');
    if (isOpen) {
      popover.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      popover.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  btn.addEventListener('click', togglePopover);

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      popover.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popover.classList.contains('open')) {
      popover.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   Features Slider (Carousel) Controls
   ========================================================================== */
function initFeaturesSlider() {
  const track = document.getElementById('featuresSliderTrack');
  const prevBtn = document.getElementById('featuresSliderPrevBtn');
  const nextBtn = document.getElementById('featuresSliderNextBtn');
  const dotsContainer = document.getElementById('featuresSliderDots');
  if (!track) return;

  const slides = track.querySelectorAll('.feature-slide');
  if (!slides.length) return;

  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  let totalPages = Math.max(1, slides.length - getVisibleCount() + 1);

  function getCardWidth() {
    const card = slides[0];
    const gap = 24;
    return card ? card.offsetWidth + gap : 320;
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    totalPages = Math.max(1, slides.length - getVisibleCount() + 1);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'features-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to feature slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToPage(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function goToPage(index) {
    const clampedIndex = Math.max(0, Math.min(index, totalPages - 1));
    const cardWidth = getCardWidth();
    track.scrollTo({
      left: clampedIndex * cardWidth,
      behavior: 'smooth'
    });
    updateActiveDot(clampedIndex);
  }

  function updateActiveDot(pageIndex) {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.features-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === pageIndex);
    });
  }

  function onScroll() {
    const cardWidth = getCardWidth();
    const currentPage = Math.round(track.scrollLeft / cardWidth);
    updateActiveDot(currentPage);
  }

  track.addEventListener('scroll', onScroll, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      const current = Math.round(track.scrollLeft / cardWidth);
      goToPage(current - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      const current = Math.round(track.scrollLeft / cardWidth);
      goToPage(current + 1);
    });
  }

  window.addEventListener('resize', () => {
    renderDots();
    onScroll();
  });

  renderDots();

  // Auto slide every 4.5s, pause on hover/touch
  let autoTimer = null;
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      const cardWidth = getCardWidth();
      const current = Math.round(track.scrollLeft / cardWidth);
      const next = (current + 1) >= totalPages ? 0 : current + 1;
      goToPage(next);
    }, 4500);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  track.addEventListener('touchstart', stopAuto, { passive: true });
  track.addEventListener('touchend', startAuto, { passive: true });

  startAuto();
}

/* ==========================================================================
   12. Premium Visual Theme System
   Themes: Default, Dr. Doom, Naruto, One Piece, E-Football
   ========================================================================== */
function initThemeSystem() {
  const accountBtn = document.getElementById('headerAccountBtn');
  const themePopup = document.getElementById('themePopupDropdown');
  const themeRows = document.querySelectorAll('.theme-option-row');
  const mobileThemeBtn = document.getElementById('mobileThemeToggleBtn');
  const mobileBadge = document.getElementById('mobileActiveThemeBadge');

  const THEMES = ['default', 'dr-doom', 'naruto', 'one-piece', 'efootball'];
  const THEME_NAMES = {
    'default': 'Default',
    'dr-doom': 'Dr. Doom',
    'naruto': 'Naruto',
    'one-piece': 'One Piece',
    'efootball': 'E-Football'
  };

  // Restore saved theme on startup
  const savedTheme = localStorage.getItem('messboi-theme') || 'default';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    const validTheme = THEMES.includes(theme) ? theme : 'default';
    document.documentElement.setAttribute('data-theme', validTheme);
    document.body.setAttribute('data-theme', validTheme);
    try {
      localStorage.setItem('messboi-theme', validTheme);
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Update active checkmarks in popup
    themeRows.forEach((row) => {
      const rowTheme = row.getAttribute('data-theme');
      const isSelected = rowTheme === validTheme;
      row.classList.toggle('active', isSelected);
      row.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });

    // Update mobile menu badge text
    if (mobileBadge) {
      mobileBadge.textContent = THEME_NAMES[validTheme] || 'Default';
    }
  }

  function openThemePopup() {
    if (!themePopup) return;
    themePopup.classList.add('open');
    themePopup.setAttribute('aria-hidden', 'false');
    if (accountBtn) accountBtn.setAttribute('aria-expanded', 'true');
  }

  function closeThemePopup() {
    if (!themePopup) return;
    themePopup.classList.remove('open');
    themePopup.setAttribute('aria-hidden', 'true');
    if (accountBtn) accountBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleThemePopup(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!themePopup) return;
    if (themePopup.classList.contains('open')) {
      closeThemePopup();
    } else {
      openThemePopup();
    }
  }

  if (accountBtn) {
    accountBtn.addEventListener('click', toggleThemePopup);
  }

  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Cycle through themes on mobile drawer tap
      const current = localStorage.getItem('messboi-theme') || 'default';
      const currentIndex = THEMES.indexOf(current);
      const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
      applyTheme(nextTheme);
    });
  }

  // Row selection inside theme popup
  themeRows.forEach((row) => {
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      const theme = row.getAttribute('data-theme');
      if (theme) {
        applyTheme(theme);
        // Subtle close after selection
        setTimeout(() => {
          closeThemePopup();
        }, 160);
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (themePopup && themePopup.classList.contains('open')) {
      if (!themePopup.contains(e.target) && accountBtn && !accountBtn.contains(e.target)) {
        closeThemePopup();
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && themePopup && themePopup.classList.contains('open')) {
      closeThemePopup();
    }
  });
}

/* ==========================================================================
   13. Unified Download & SHA-256 Verification System
   Ensures all buttons (APK, Play Store, App Store, CTA, footer, modal)
   directly download Messboi APK with verified SHA-256 integrity hash
   ========================================================================== */
function initDownloadSystem() {
  const SHA256_HASH = 'sha256:d72d6e503badcbd1ef00753e8c5f5b7241d98be9c657c9cd384fc59ce9831ffe';
  const APK_PATH = '/apk/Messboi-v1.0.0.apk';
  const APK_FILENAME = 'Messboi-v1.0.0.apk';

  // Create toast container if not present
  let toastContainer = document.querySelector('.download-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'download-toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastContainer);
  }

  function showDownloadToast(message, isSuccess = true) {
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `
      <svg class="download-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3800);
  }

  // Handle direct download trigger
  function handleDownloadAction(e) {
    const targetLink = e.currentTarget;
    
    // Ensure the href and download attributes are pointing to the APK
    if (targetLink && targetLink.tagName === 'A') {
      targetLink.setAttribute('href', APK_PATH);
      targetLink.setAttribute('download', APK_FILENAME);
      targetLink.setAttribute('data-sha256', SHA256_HASH);
    }

    showDownloadToast('Messboi APK ডাউনলোড শুরু হয়েছে... (v1.0.0 • SHA-256 Verified)');
  }

  // Select all download elements across the page
  const downloadSelectors = [
    'a[href*="Messboi-v1.0.0.apk"]',
    'a[data-sha256]',
    '.btn-header-download',
    '.mobile-menu-cta',
    '.btn-apk-download',
    '.app-store-btn',
    '.google-play-btn',
    '.footer-play-badge',
    '#accountModalDownloadBtn',
    '#stripDownloadAppStore',
    '#stripDownloadGooglePlay',
    '#mainDownloadApkBtn'
  ];

  const downloadButtons = document.querySelectorAll(downloadSelectors.join(','));
  downloadButtons.forEach((btn) => {
    btn.setAttribute('href', APK_PATH);
    btn.setAttribute('download', APK_FILENAME);
    btn.setAttribute('data-sha256', SHA256_HASH);
    btn.addEventListener('click', handleDownloadAction);
  });

  // SHA-256 Copy Button Handler
  const copyShaBtn = document.getElementById('copySha256Btn');
  const shaDisplay = document.getElementById('sha256HashDisplay');
  const copyShaText = document.getElementById('copyShaText');

  if (copyShaBtn && shaDisplay) {
    copyShaBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const textToCopy = SHA256_HASH;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        if (copyShaText) copyShaText.textContent = 'Copied!';
        copyShaBtn.style.background = '#059669';
        showDownloadToast('SHA-256 hash কপি করা হয়েছে!');

        setTimeout(() => {
          if (copyShaText) copyShaText.textContent = 'Copy';
        }, 2200);
      } catch (err) {
        showDownloadToast('Hash: ' + SHA256_HASH);
      }
    });
  }
}
