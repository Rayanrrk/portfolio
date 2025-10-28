// YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// HERO TYPEWRITER + ENTRANCE
(function heroIntro(){
  const title = document.querySelector('.title');
  const subtitle = document.querySelector('.subtitle');
  const ctas = document.querySelector('.hero-ctas');

  // typewriter effect for title
  if(title){
    let text = title.textContent;
    title.textContent = '';
    let i=0;
    function type(){ 
      if(i<text.length){ 
        title.textContent += text[i++]; 
        setTimeout(type, 70); 
      } else {
        title.classList.add('title-in');
      }
    }
    type();
  }

  setTimeout(()=> { if(subtitle){ subtitle.classList.add('subtitle-in'); } }, 800);
  setTimeout(()=> { if(ctas){ ctas.classList.add('cta-in'); } }, 1200);
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

  // swipe support
  (function addSwipe(){
    if(!carouselEl) return;
    let startX = 0, startTime = 0;
    carouselEl.addEventListener('touchstart', e => {
      const t = e.touches[0];
      startX = t.clientX; startTime = Date.now();
    }, { passive:true });
    carouselEl.addEventListener('touchend', e => {
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dt = Date.now() - startTime;
      if(Math.abs(dx) > 50 && dt < 1000){
        dx<0? showNext(): showPrev();
      }
    }, { passive:true });
  })();

  let timer = setInterval(showNext, 6000);
  if(carouselEl){
    carouselEl.addEventListener('mouseenter', ()=> clearInterval(timer));
    carouselEl.addEventListener('mouseleave', ()=> timer = setInterval(showNext, 6000));
  }

  setActive(0);
})();

// REVEAL ON SCROLL
(function revealOnScroll(){
  const reveals = document.querySelectorAll('.panel, .tile, .tile-body, .pills span');
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

// PARTICLE BACKGROUND
(function particles(){
  const canvas = document.querySelector('.particle-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particlesArr=[];

  function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  class Particle{
    constructor(){ this.x=Math.random()*w; this.y=Math.random()*h; this.r=Math.random()*2+1; this.vx=Math.random()*0.3-0.15; this.vy=Math.random()*0.3-0.15;}
    draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,2*Math.PI); ctx.fillStyle='rgba(88,166,255,0.5)'; ctx.fill(); }
    update(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>w)this.vx*=-1; if(this.y<0||this.y>h)this.vy*=-1; this.draw(); }
  }

  for(let i=0;i<100;i++) particlesArr.push(new Particle());

  function animate(){
    ctx.clearRect(0,0,w,h);
    particlesArr.forEach(p=>p.update());
    requestAnimationFrame(animate);
  }
  animate();
})();
