/**
 * Boh Animations — Purposeful, lightweight animation enhancements
 * 
 * Features:
 *   1. Scroll Reveal — gentle fade-up when elements enter viewport (IntersectionObserver)
 *   2. Countup — animate stat numbers from 0 to target (triggered on scroll into view)
 *   3. Staggered children — cards in grids reveal one-by-one with delay
 * 
 * Design principles:
 *   - Every animation has a PURPOSE (reveal = draws attention to new content,
 *     countup = emphasizes impressive numbers, stagger = shows hierarchy)
 *   - Mobile-first: all animations are fast (300ms) so they feel snappy on phones
 *   - Respects prefers-reduced-motion: no animation when user has reduced motion on
 *   - Content is ALWAYS visible even if JS fails (CSS defaults to visible)
 *   - No external dependencies
 */

(function () {
  'use strict';

  // ── Respect user preference ──
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. Scroll Reveal ──
  // Elements with classes: .reveal, .reveal-fade, .reveal-scale, .reveal-left, [data-reveal]
  // They start with opacity 0 + slight translateY via CSS class .boh-anim-hidden
  // When intersecting, we add .boh-anim-visible which transitions to final state
  
  function initBohScrollReveal() {
    if (prefersReducedMotion) {
      // Make sure everything is visible
      document.querySelectorAll('.reveal, .reveal-scale, .reveal-fade, .reveal-left, [data-reveal]').forEach(function (el) {
        el.classList.add('boh-anim-visible');
        el.classList.remove('boh-anim-hidden');
      });
      return;
    }

    var revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-fade, .reveal-left, [data-reveal]');
    
    if (!revealEls.length) return;
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      revealEls.forEach(function (el) {
        el.classList.add('boh-anim-visible');
      });
      return;
    }

    // Mark elements as hidden (ready for animation)
    revealEls.forEach(function (el) {
      // Don't hide if already visible (e.g. above the fold)
      if (!el.classList.contains('boh-anim-visible')) {
        el.classList.add('boh-anim-hidden');
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          
          // Check if this element is inside a stagger container (grid)
          var parent = el.parentElement;
          var staggerDelay = 0;
          if (parent && (parent.classList.contains('grid') || parent.classList.contains('boh-stagger'))) {
            var siblings = Array.prototype.filter.call(parent.children, function (child) {
              return child.classList.contains('boh-anim-hidden') || child.classList.contains('boh-anim-visible');
            });
            var idx = siblings.indexOf(el);
            if (idx > 0) {
              staggerDelay = idx * 80; // 80ms between each card
            }
          }

          if (staggerDelay > 0) {
            el.style.transitionDelay = staggerDelay + 'ms';
          }
          
          // Trigger the animation
          el.classList.remove('boh-anim-hidden');
          el.classList.add('boh-anim-visible');
          
          // Clean up delay after animation completes
          if (staggerDelay > 0) {
            setTimeout(function () {
              el.style.transitionDelay = '';
            }, staggerDelay + 500);
          }
          
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── 2. Countup Animation ──
  // Elements with data-countup="80" will animate from 0 to 80 when scrolled into view
  
  function initBohCountup() {
    var countEls = document.querySelectorAll('[data-countup]');
    if (!countEls.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // Just show final values
      countEls.forEach(function (el) {
        el.textContent = el.getAttribute('data-countup');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-countup'), 10);
          if (isNaN(target)) {
            el.textContent = el.getAttribute('data-countup');
            observer.unobserve(el);
            return;
          }
          
          animateCountup(el, target);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.3
    });

    countEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCountup(el, target) {
    var duration = Math.min(1200, Math.max(600, target * 15)); // 600–1200ms
    var startTime = null;
    var startValue = 0;

    // Easing: ease-out quad
    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easedProgress = easeOutQuad(progress);
      
      var current = Math.round(startValue + (target - startValue) * easedProgress);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    el.textContent = '0';
    requestAnimationFrame(step);
  }

  // ── 3. Hero entrance (one-time on page load) ──
  // Subtle fade-in for the hero card on the homepage
  
  function initHeroEntrance() {
    if (prefersReducedMotion) return;
    
    var heroCard = document.querySelector('.hero-news-card');
    if (!heroCard) return;
    
    heroCard.classList.add('boh-hero-entrance');
    // Trigger reflow then add active class
    void heroCard.offsetHeight;
    requestAnimationFrame(function () {
      heroCard.classList.add('boh-hero-entrance-active');
    });
  }

  // ── Bootstrap ──
  function initBohAnimations() {
    initHeroEntrance();
    initBohScrollReveal();
    initBohCountup();
  }

  // Expose for re-initialization after dynamic content loads
  window.initBohScrollReveal = initBohScrollReveal;
  window.initBohCountup = initBohCountup;
  window.initBohAnimations = initBohAnimations;

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBohAnimations);
  } else {
    initBohAnimations();
  }

  // Re-init on dynamic data updates (coach admin changes)
  window.addEventListener('boh:data-updated', function () {
    // Small delay to let DOM update
    setTimeout(function () {
      initBohScrollReveal();
      initBohCountup();
    }, 60);
  });

})();
