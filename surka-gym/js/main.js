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

// ── VIDEO: funciona en iOS y Android ──────────────────────────────
(function () {
  const v = document.getElementById('hero-video');
  if (!v) return;

  // Forzar atributos requeridos por iOS
  v.muted = true;
  v.setAttribute('muted', '');
  v.setAttribute('playsinline', '');
  v.setAttribute('webkit-playsinline', '');
  v.loop = true;

  const play = () => v.play().catch(() => {});

  // 1. Intentar apenas el DOM está listo
  play();

  // 2. Intentar al terminar de cargar la página
  window.addEventListener('load', play);

  // 3. Android: intentar cuando el video puede reproducirse
  v.addEventListener('canplay', play);
  v.addEventListener('canplaythrough', play);

  // 4. iOS: el primer gesto del usuario desbloquea el autoplay
  const unlock = () => {
    play();
    document.removeEventListener('touchstart', unlock);
    document.removeEventListener('touchend', unlock);
    document.removeEventListener('click', unlock);
  };
  document.addEventListener('touchstart', unlock, { passive: true });
  document.addEventListener('touchend', unlock, { passive: true });
  document.addEventListener('click', unlock);

  // 5. Reintentar cuando entra en pantalla (por si el usuario scrolleó primero)
  const vidObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) play();
  }, { threshold: 0.1 });
  vidObs.observe(v);

  // 6. Si se pausa solo (Low Power Mode en iOS), reintentar al scroll
  v.addEventListener('pause', () => {
    if (!v.ended) {
      document.addEventListener('scroll', play, { once: true, passive: true });
      document.addEventListener('touchstart', play, { once: true, passive: true });
    }
  });
})();
