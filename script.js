/* Hogar La Presencia de Jehová — interacciones ligeras */
(function () {
  'use strict';

  // ----- Menú móvil -----
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cerrar al pulsar un enlace
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  // ----- Reveal al hacer scroll -----
  var reveals = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ----- Carrusel -----
  var carousel = document.querySelector('.carousel');
  if (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.slide'));
    var prevBtn = carousel.querySelector('.carousel-btn.prev');
    var nextBtn = carousel.querySelector('.carousel-btn.next');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var index = 0;
    var timer = null;

    // Crear puntos
    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
      b.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(b);
      return b;
    });

    function update() {
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === index);
        d.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }
    function go(i) { index = (i + slides.length) % slides.length; update(); }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    nextBtn.addEventListener('click', function () { next(); restart(); });
    prevBtn.addEventListener('click', function () { prev(); restart(); });

    function start() {
      if (reduceMotion || slides.length < 2) { return; }
      timer = window.setInterval(next, 6000);
    }
    function restart() { window.clearInterval(timer); start(); }

    carousel.addEventListener('mouseenter', function () { window.clearInterval(timer); });
    carousel.addEventListener('mouseleave', start);

    // Soporte de deslizar (touch)
    var startX = 0;
    carousel.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); restart(); }
    }, { passive: true });

    update();
    start();
  }

  // ----- Año en el pie -----
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();
