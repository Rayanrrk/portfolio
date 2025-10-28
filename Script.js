// Parallax & reveals for Template A
document.getElementById('year')?.textContent = new Date().getFullYear();

// parallax background
(function(){
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  const onScroll = () => {
    const y = window.scrollY;
    bg.style.transform = `translateY(${y * 0.08}px) scale(1.02)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// hero entrance
(function(){
  const title = document.querySelector('.title');
  const lead = document.querySelector('.lead');
  setTimeout(()=> { if(title){ title.style.opacity = 1; title.style.transform='translateY(0)';} }, 140);
  setTimeout(()=> { if(lead){ lead.style.opacity = 1; lead.style.transform='translateY(0)'; } }, 320);
})();

// reveal sections
(function(){
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries, o)=> {
    entries.forEach(e=> {
      if(e.isIntersecting){ e.target.classList.add('in-view'); o.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(i=> obs.observe(i));
})();
