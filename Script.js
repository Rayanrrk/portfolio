const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.style.opacity = entry.isIntersecting ? 1 : 0;
    entry.target.style.transform = entry.isIntersecting
      ? "translateY(0)"
      : "translateY(20px)";
  });
});

cards.forEach((card) => {
  card.style.transition = "all 0.6s ease";
  observer.observe(card);
});
