// Portfolio script: hero entrance, carousel (arrows, keyboard, touch), reveal on scroll

// YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// HERO entrance
(function heroIntro(){
  const title = document.querySelector('.title');
  const subtitle = document.querySelector('.subtitle');
  const ctas = document.querySelector('.hero-ctas');
  const heroPanel = document.querySelector('.hero-name-panel');
  setTimeout(()=> { if(title){ title.classList.add('title-in'); } }, 120);
  setTimeout(()=> { if(subtitle){ subtitle.classList.add('subtitle-in'); } }, 260);
  setTimeout(()=> { if(ctas){ ctas.classList.add('cta-in'); } }, 420);
  setTimeout(()=> { if(heroPanel){ heroPanel.style.opacity='1'; } }, 500);
})();

// HERO PARALLAX on scroll
(function heroParallax(){
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', ()=> {
    if(heroBg){
      const y = window.scrollY * 0.12;
      heroBg.style.transform = `translateY(${y}px) scale(1.02)`;
    }
  });
})();

// CAROUSEL
(function carousel(){
  const tiles = Array.from(document.querySelectorAll('.tile'));
  if (!tiles.length) return;

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const carouselEl = document.getElementById('carousel');

  let index = 0;
  const total = tiles.length;

  function setActive(i){
    index = ((i % total) + total) % total;
    tiles.forEach((t, idx) => t.classList.toggle('active', idx === index));
    const tit = tiles[index]?.dataset?.title || tiles[index]?.querySelector('h3')?.textContent;
    if(tit) document.title = `${tit} — Rayan Khan`;
  }

  function showNext(){ setActive(index + 1); }
  function showPrev(){ setActive(index - 1); }

  if(nextBtn) nextBtn.addEventListener('click', showNext);
  if(prevBtn) prevBtn.addEventListener('click', showPrev);

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  (function addSwipe(){
    if(!carouselEl) return;
    let startX = 0, startTime = 0;
    carouselEl.addEventListener('touchstart', e => {
      const t = e.touches[0];
      startX = t.clientX; startTime = Date.now();
    }, { passive: true });
    carouselEl.addEventListener('touchend', e => {
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dt = Date.now() - startTime;
      if(Math.abs(dx) > 50 && dt < 1000){
        if(dx < 0) showNext(); else showPrev();
      }
    }, { passive: true });
  })();

  let timer = setInterval(showNext, 6000);
  if(carouselEl){
    carouselEl.addEventListener('mouseenter', ()=> clearInterval(timer));
    carouselEl.addEventListener('mouseleave', ()=> timer = setInterval(showNext, 6000));
  }

  setActive(0);
})();

// REVEAL ON SCROLL for panels/cards
(function revealOnScroll(){
  const reveals = document.querySelectorAll('.panel, .tile, .tile-body');
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        ent.target.classList.add('in-view');
        o.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));
})();
