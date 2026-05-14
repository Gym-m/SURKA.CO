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

// Video autoplay — funciona en todos los dispositivos
const video = document.querySelector('video.about-img-main');
if (video) {
  const playVideo = () => {
    video.play().catch(() => {
      // Si el autoplay falla, el poster ya se muestra — intentamos de nuevo al tocar
      const retry = () => { video.play(); document.removeEventListener('touchstart', retry); document.removeEventListener('click', retry); };
      document.addEventListener('touchstart', retry, { once: true });
      document.addEventListener('click', retry, { once: true });
    });
  };

  // Reproducir cuando el video entra en pantalla
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) playVideo();
      else video.pause();
    });
  }, { threshold: 0.2 });

  videoObserver.observe(video);

  // También intentar al cargar la página
  if (document.readyState === 'complete') {
    playVideo();
  } else {
    window.addEventListener('load', playVideo);
  }
}
