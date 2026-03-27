/* ===================================
   HENDRICK'S ANOTHER — ANOTHERLAND
   Scroll Storytelling Interactions
   =================================== */

(function () {
  'use strict';

  // --- SCROLL REVEAL (Intersection Observer) ---
  function initRevealAnimations() {
    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- PROGRESS NAV DOTS ---
  function initProgressNav() {
    var dots = document.querySelectorAll('.progress-dot');
    var sections = [];

    dots.forEach(function (dot) {
      var href = dot.getAttribute('href');
      var section = document.querySelector(href);
      if (section) sections.push({ el: section, dot: dot });
    });

    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          dots.forEach(function (d) { d.classList.remove('active'); });
          var match = sections.find(function (s) { return s.el === entry.target; });
          if (match) match.dot.classList.add('active');
        }
      });
    }, {
      threshold: 0.3
    });

    sections.forEach(function (s) {
      observer.observe(s.el);
    });
  }

  // --- SMOOTH SCROLL FOR NAV DOTS ---
  function initSmoothScroll() {
    document.querySelectorAll('.progress-dot').forEach(function (dot) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- PARALLAX FOR HERO ---
  function initHeroParallax() {
    var hero = document.querySelector('.section--hero');
    var heroContent = document.querySelector('.hero__content');
    var vines = document.querySelectorAll('.hero__vine');
    if (!hero || !heroContent) return;

    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        var scrollY = window.scrollY;
        var heroHeight = hero.offsetHeight;

        if (scrollY < heroHeight) {
          var progress = scrollY / heroHeight;
          heroContent.style.opacity = 1 - progress * 1.5;
          heroContent.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';

          vines.forEach(function (vine) {
            vine.style.transform = 'translateY(' + (scrollY * -0.15) + 'px)';
          });
        }

        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- IMAGE SCENE PARALLAX (subtle) ---
  function initSceneParallax() {
    var sceneImages = document.querySelectorAll('.act__scene-img img, .act3__discover-img img');
    if (!sceneImages.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.dataset.parallax = 'active';
        } else {
          entry.target.dataset.parallax = '';
        }
      });
    }, { threshold: 0 });

    sceneImages.forEach(function (img) {
      img.style.transition = 'transform 0.1s linear';
      observer.observe(img);
    });

    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        sceneImages.forEach(function (img) {
          if (img.dataset.parallax !== 'active') return;

          var rect = img.getBoundingClientRect();
          var viewH = window.innerHeight;
          var center = rect.top + rect.height / 2;
          var offset = (center - viewH / 2) / viewH;
          img.style.transform = 'scale(1.08) translateY(' + (offset * -20) + 'px)';
        });

        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- HERO SCROLL ARROW HIDE ON SCROLL ---
  function initScrollArrowHide() {
    var arrow = document.querySelector('.hero__scroll-indicator');
    if (!arrow) return;

    var hidden = false;

    function onScroll() {
      if (window.scrollY > 100 && !hidden) {
        arrow.style.opacity = '0';
        arrow.style.transition = 'opacity 0.5s ease';
        hidden = true;
      } else if (window.scrollY <= 100 && hidden) {
        arrow.style.opacity = '1';
        hidden = false;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- INIT ---
  function init() {
    initRevealAnimations();
    initProgressNav();
    initSmoothScroll();
    initHeroParallax();
    initSceneParallax();
    initScrollArrowHide();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
