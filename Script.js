// Simple carousel and small interactions for Template B
document.getElementById('year')?.textContent = new Date().getFullYear();

(function(){
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let i = 0;
  const total = tiles.length;

  function show(index){
    tiles.forEach((t, idx) => t.classList.toggle('active', idx === index));
    // update aria-live title for assistive tech (optional)
    const title = tiles[index]?.dataset?.title;
    if(title) document.title = `${title} — Rayan Khan`;
  }

  function nextSlide(){ i = (i + 1) % total; show(i); }
  function prevSlide(){ i = (i - 1 + total) % total; show(i); }

  if(next) next.addEventListener('click', nextSlide);
  if(prev) prev.addEventListener('click', prevSlide);

  // keyboard navigation (left/right)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // auto rotate, pause on hover
  let timer = setInterval(nextSlide, 6000);
  const carousel = document.getElementById('carousel');
  if(carousel){
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => timer = setInterval(nextSlide, 6000));
  }

  show(0);
})();
