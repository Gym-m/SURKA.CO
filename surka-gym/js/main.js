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

// VIDEO — iPhone Safari requiere muted + playsinline en HTML y muted=true en JS
const v = document.getElementById('hero-video');
if (v) {
  v.muted = true;

  // Safari iOS: play() después de que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function () {
    v.play().catch(function () {});
  });

  // Si el autoplay igual falla, al primer toque se activa
  v.addEventListener('click', function () { v.play(); });
  document.addEventListener('touchstart', function () {
    if (v.paused) v.play().catch(function () {});
  }, { once: true, passive: true });
}
