// Feedback visual de toque para mobile
document.querySelectorAll(".link-card").forEach((card) => {
  card.addEventListener("touchstart", () => {
    card.style.transform = "scale(0.97)";
  });

  card.addEventListener("touchend", () => {
    card.style.transform = "scale(1)";
  });
});

// Revelação suave ao carregar a página (efeito Fade-in)
window.addEventListener("load", () => {
  const main = document.querySelector(".mobile-wrapper");
  main.style.opacity = "0";
  main.style.transition = "opacity 0.8s ease";

  setTimeout(() => {
    main.style.opacity = "1";
  }, 100);
});
