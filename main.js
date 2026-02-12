/**
 * EduraZ waitlist landing — header scroll, scroll reveal, ripple, smooth scroll, form submit (Formspark).
 */
(function () {
  'use strict';

  var ROOT = document.documentElement;
  var HEADER = document.querySelector('.site-header');
  var REVEAL_ELEMENTS = document.querySelectorAll('.reveal');
  var CTA_BUTTONS = document.querySelectorAll('.cta-button');

  // ----- Reduce motion -----
  function initReduceMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ROOT.classList.add('reduce-motion');
    }
  }

  // ----- Header scroll state -----
  function initHeaderScroll() {
    if (!HEADER) return;
    var threshold = 80;
    function update() {
      if (window.scrollY > threshold) {
        HEADER.classList.add('is-scrolled');
      } else {
        HEADER.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', function () {
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  // ----- Scroll reveal (Intersection Observer) -----
  function initReveal() {
    if (!REVEAL_ELEMENTS.length) return;
    var reduced = ROOT.classList.contains('reduce-motion');
    var options = {
      root: null,
      rootMargin: reduced ? '0px' : '0px 0px -8% 0px',
      threshold: reduced ? 0.01 : 0.12
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, options);
    REVEAL_ELEMENTS.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ----- Button ripple effect -----
  function createRipple(e, button) {
    var rect = button.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var x = e.clientX - rect.left - size / 2;
    var y = e.clientY - rect.top - size / 2;
    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    button.appendChild(ripple);
    setTimeout(function () {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 650);
  }

  function initRipple() {
    CTA_BUTTONS.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        createRipple(e, btn);
      });
    });
  }

  // ----- Smooth scroll for same-page anchors -----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ----- Waitlist form (Formspark) -----
  var FORM_ENDPOINT = 'https://submit-form.com/0GZ7bh6uj';

  function initWaitlistForm() {
    var form = document.getElementById('waitlist-form');
    var successEl = document.getElementById('waitlist-success');
    var errorEl = document.getElementById('waitlist-error');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('[name="email"]');
      var submitBtn = form.querySelector('.waitlist-submit');
      var email = emailInput ? emailInput.value.trim() : '';

      if (!email) {
        if (errorEl) {
          errorEl.textContent = 'Please enter your email.';
          errorEl.hidden = false;
        }
        return;
      }

      if (errorEl) errorEl.hidden = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining…';
      }

      var nameInput = form.querySelector('[name="name"]');
      var skillInput = form.querySelector('[name="excited_skill"]');
      var challengeInput = form.querySelector('[name="learning_challenge"]');
      var payload = {
        email: email,
        name: nameInput ? nameInput.value.trim() : '',
        excited_skill: skillInput ? skillInput.value.trim() : '',
        learning_challenge: challengeInput ? challengeInput.value.trim() : ''
      };

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (res.ok) {
            form.hidden = true;
            if (successEl) {
              successEl.hidden = false;
              successEl.classList.add('is-visible');
            }
          } else {
            throw new Error('Submit failed');
          }
        })
        .catch(function () {
          if (errorEl) {
            errorEl.textContent = 'Something went wrong. Please try again or email Cliffpressoir5@gmail.com.';
            errorEl.hidden = false;
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join the Waitlist';
          }
        });
    });
  }

  // ----- Init -----
  function init() {
    initReduceMotion();
    initHeaderScroll();
    initReveal();
    initRipple();
    initSmoothScroll();
    initWaitlistForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
