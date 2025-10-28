// YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// HERO ENTRANCE
(function heroIntro(){
  const panel = document.querySelector('.hero-name-panel');
  const subtitle = document.querySelector('.subtitle-futuristic');
  setTimeout(()=> panel && (panel.style.opacity=1), 500);
})();

// HERO PARALLAX
(function heroParallax(){
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', ()=> {
    if(heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.12}px) scale(1.02)`;
  });
})();

// HERO PARTICLES
(function heroParticles(){
  const canvas = document.getElementById('hero-particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  window.addEventListener('resize', ()=>{ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; });

  const particles = [];
  for(let i=0;i<80;i++){
    particles.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*2+1, dx:(Math.random()-0.5)/1.5, dy:(Math.random()-0.5)/1.5});
  }

  function animate(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>w)p.dx*=-1;
      if(p.y<0||p.y>h)p.dy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(88,166,255,0.25)';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// CAROUSEL
(function carousel(){
  const tiles = Array.from(document.querySelectorAll('.tile'));
  if(!tiles.length) return;
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let index = 0;

  function setActive(i){
    index = ((i % tiles.length) + tiles.length)%tiles.length;
    tiles.forEach((t,idx)=>t.classList.toggle('active', idx===index));
  }

  function showNext(){ setActive(index+1);}
  function showPrev(){ setActive(index-1);}
  nextBtn?.addEventListener('click',showNext);
  prevBtn?.addEventListener('click',showPrev);
  document.addEventListener('keydown', e=>{if(e.key==='ArrowRight') showNext(); if(e.key==='ArrowLeft') showPrev();});

  let timer = setInterval(showNext,6000);
  const carouselEl = document.getElementById('carousel');
  carouselEl?.addEventListener('mouseenter', ()=> clearInterval(timer));
  carouselEl?.addEventListener('mouseleave', ()=> timer = setInterval(showNext,6000));

  setActive(0);
})();

// REVEAL ON SCROLL
(function revealOnScroll(){
  const reveals = document.querySelectorAll('.panel, .tile, .tile-body');
  const obs = new IntersectionObserver((entries,o)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in-view'); o.unobserve(e.target);}
    });
  },{threshold:0.12});
  reveals.forEach(r=>obs.observe(r));
})();
