/* vahidgh.github.io — small progressive enhancements. The page works without JavaScript. */
(function () {
  'use strict';

  var root = document.documentElement;

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); } else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function () {
    /* ---- Mobile menu ---- */
    var btn = document.querySelector('.menu-btn');
    var nav = document.getElementById('site-nav');
    if (btn && nav) {
      root.classList.add('nav-ready');
      var setOpen = function (open) {
        nav.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      };
      btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
      nav.addEventListener('click', function (e) { if (e.target.closest('a')) { setOpen(false); } });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });
      document.addEventListener('click', function (e) {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) { setOpen(false); }
      });
    }

    /* ---- Header border after scrolling ---- */
    var header = document.querySelector('.site-header');
    var onScroll = function () { if (header) { header.classList.toggle('scrolled', window.scrollY > 8); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Footer year ---- */
    var year = document.getElementById('year');
    if (year) { year.textContent = String(new Date().getFullYear()); }

    /* ---- Photo fallback: show initials if the picture is missing ---- */
    var photo = document.querySelector('.portrait img');
    if (photo) {
      var hide = function () { photo.style.display = 'none'; };
      if (photo.complete && photo.naturalWidth === 0) { hide(); }
      photo.addEventListener('error', hide);
    }

    if (!('IntersectionObserver' in window)) { return; }

    /* ---- Highlight the current section in the menu ---- */
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (a) { a.classList.remove('active'); a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

  });
})();
