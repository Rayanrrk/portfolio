// Simple carousel for Template B
(function(){
  const tiles = Array.from(document.querySelectorAll('.tile'));
  let i = 0;
  function show(index){
    tiles.forEach((t,idx)=> t.classList.toggle('active', idx===index));
  }
  document.getElementById('next').addEventListener('click', ()=> { i = (i+1)%tiles.length; show(i); });
  document.getElementById('prev').addEventListener('click', ()=> { i = (i-1+tiles.length)%tiles.length; show(i); });

  // auto-rotate every 6s
  setInterval(()=> { i=(i+1)%tiles.length; show(i); }, 6000);

  // initial
  show(0);
})();
