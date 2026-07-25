/* Hogar La Presencia de Jehová — interacciones ligeras */
(function () {
  'use strict';

  // ----- Respaldo de imágenes (sin manejadores en línea, compatible con CSP) -----
  // Ejecuta cb si la imagen falló (ya sea ahora o cuando falle al cargar).
  function onImgError(img, cb) {
    if (img.complete && img.naturalWidth === 0) {
      cb.call(img);
    } else {
      img.addEventListener('error', function handler() {
        img.removeEventListener('error', handler);
        cb.call(img);
      });
    }
  }

  // Logo: si assets/logo.png no carga, usa el emblema SVG (data-fallback)
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    onImgError(img, function () {
      var fb = this.getAttribute('data-fallback');
      if (fb && this.getAttribute('src') !== fb) { this.src = fb; }
    });
  });

  // Carrusel: foto que no carga -> muestra marcador; fondo difuminado -> se elimina
  document.querySelectorAll('.slide-photo').forEach(function (img) {
    onImgError(img, function () {
      var slide = this.closest('.slide');
      if (slide) { slide.classList.add('is-placeholder'); }
    });
  });
  document.querySelectorAll('.slide-bg').forEach(function (img) {
    onImgError(img, function () { this.remove(); });
  });

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

  // ----- Formulario de contacto: envía automáticamente al correo del hogar (FormSubmit) -----
  var form = document.getElementById('contactForm');
  if (form) {
    var status = document.getElementById('formStatus');
    var submitBtn = form.querySelector('button[type="submit"]');
    var email = form.getAttribute('data-email');
    var endpoint = 'https://formsubmit.co/ajax/' + encodeURIComponent(email);

    var setStatus = function (text, isError) {
      if (!status) { return; }
      status.hidden = false;
      status.classList.toggle('is-error', !!isError);
      status.textContent = text;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // La validación nativa (required) ya bloquea envíos incompletos.
      if (submitBtn) { submitBtn.disabled = true; }
      setStatus('Enviando tu mensaje…', false);

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (res) {
          var ok = res && (res.success === true || res.success === 'true');
          if (!ok) { throw new Error('no-ok'); }
          setStatus('¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.', false);
          form.reset();
        })
        .catch(function () {
          setStatus('No pudimos enviar el mensaje. Llámanos al 787-962-4875 o escríbenos por WhatsApp.', true);
        })
        .then(function () {
          if (submitBtn) { submitBtn.disabled = false; }
        });
    });
  }

  // ----- Año en el pie -----
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();
