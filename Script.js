// helper
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// PARALLAX for banner background
(function () {
  const bg = document.querySelector('.hero--banner .hero__bg');
  if (!bg) return;
  function onScroll() {
    const y = window.scrollY;
    // subtle parallax
    bg.style.transform = `translateY(${y * 0.12}px) scale(1.02)`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// HERO reveal (once)
(function () {
  const title = document.querySelector('.hero-title');
  const sub = document.querySelector('.hero-sub');
  if (!title) return;
  setTimeout(() => {
    title.classList.add('revealed');
    sub.classList.add('revealed');
  }, 140);
})();

// CARD reveal using IntersectionObserver
(function () {
  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.8s cubic-bezier(.2,.9,.2,1)';
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(c => {
    c.style.opacity = 0;
    c.style.transform = 'translateY(18px)';
    obs.observe(c);
  });
})();
