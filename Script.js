// Year auto-update
document.getElementById('year').textContent = new Date().getFullYear();

// Carousel logic
const cards = document.querySelectorAll('.project-card');
const left = document.querySelector('.arrow.left');
const right = document.querySelector('.arrow.right');
let index = 0;

function showProject(i) {
  cards.forEach((card, idx) => {
    card.classList.remove('active');
    if (idx === i) card.classList.add('active');
  });
}

left.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  showProject(index);
});

right.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  showProject(index);
});
