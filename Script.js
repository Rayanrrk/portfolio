// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Simple fade-up scroll animation
const fadeUps = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
fadeUps.forEach(el => observer.observe(el));
