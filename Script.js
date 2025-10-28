// Small hero reveal + gentle parallax for the image on scroll
(function(){
  const title = document.querySelector('.hero-headline');
  const lead = document.querySelector('.hero-lead');
  const img = document.querySelector('.hero-visual img');
  const chev = document.querySelector('.chev');

  // headline reveal
  setTimeout(()=> {
    if(title) {
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }
    if(lead) {
      lead.style.opacity = '1';
      lead.style.transform = 'translateY(0)';
    }
  }, 140);

  // parallax (subtle)
  if(img){
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      // move image slightly slower for parallax
      img.style.transform = `translateY(${y * 0.03}px) scale(1.04)`;
    }, { passive: true });
  }

  // animate chevron loop
  if(chev){
    let up = true;
    setInterval(()=> {
      chev.style.transform = up ? 'translateY(6px)' : 'translateY(0)';
      up = !up;
    }, 800);
  }
})();
