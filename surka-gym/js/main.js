// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) el.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Hamburger menu
const burger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// VIDEO
(function () {
  const v = document.getElementById('hero-video');
  if (!v) return;

  v.muted = true;
  v.setAttribute('muted', '');

  // Intentar reproducir — funciona en Android y en iOS con muted+playsinline
  v.play().catch(function () {
    // Si el navegador bloqueó el autoplay, intentar al primer toque del usuario
    document.addEventListener('touchstart', function () {
      v.play().catch(function () {});
    }, { once: true, passive: true });
  });

  // Si se pausa solo (Low Power Mode iOS), retomar al tocar la pantalla
  v.addEventListener('pause', function () {
    if (!v.ended) {
      document.addEventListener('touchstart', function () {
        v.play().catch(function () {});
      }, { once: true, passive: true });
    }
  });
})();
