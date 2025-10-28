/* Lightweight animations:
   - Parallax background on scroll
   - Hero text entrance on load
   - Staggered reveal for .reveal sections
   - Chevron subtle loop (CSS fallback exists)
*/

// PARALLAX background
(function(){
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  function onScroll(){
    // subtle translate upward slower than page to give depth
    const y = window.scrollY;
    bg.style.transform = `translateY(${y * 0.08}px) scale(1.02)`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// HERO entrance
(function(){
  const title = document.querySelector('.hero-title');
  const sub = document.querySelector('.hero-sub');
  const ctas = document.querySelector('.hero-ctas');
  if (!title) return;

  // small staged entrance
  setTimeout(()=> {
    title.style.opacity = '1';
    title.style.transform = 'translateY(0)';
    title.classList.add('title-in');
  }, 140);
  setTimeout(()=> { if(sub) { sub.style.opacity='1'; sub.style.transform='translateY(0)'; } }, 260);
  setTimeout(()=> { if(ctas) ctas.style.opacity='1'; }, 420);
})();

// STAGGERED reveal for sections and cards
(function(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in-view');
        // reveal child cards with small delay
        const cards = el.querySelectorAll('.card');
        if (cards.length) {
          cards.forEach((c, i) => {
            c.style.transitionDelay = `${i * 80}ms`;
            c.classList.add('in-view');
          });
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.16 });

  items.forEach(it => observer.observe(it));
})();

// small tilt effect for cards on pointermove (desktop)
(function(){
  const supportsPointer = window.matchMedia('(hover: hover)').matches;
  if (!supportsPointer) return;
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      const rx = (e.clientX - rect.left) / rect.width;
      const ry = (e.clientY - rect.top) / rect.height;
      const tiltX = (ry - 0.5) * 6; // degrees
      const tiltY = (rx - 0.5) * -6;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0) scale(1.01)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
})();
