document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. SCROLL REVEAL (Surgimento suave)
     ========================================= */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    },
    {
      root: null,
      threshold: 0.12, // Dispara quando 12% do card aparece
      rootMargin: "0px 0px -30px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* =========================================
     2. EFEITO TILT 3D NOS CARDS (Desktop)
     ========================================= */
  const cards = document.querySelectorAll(".link-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calcula a rotação (máximo de 4 graus para ficar elegante e sutil)
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = "transform 0.1s ease";
    });

    // Quando o mouse sai, o card volta ao normal suavemente
    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = "transform 0.5s ease";
    });
  });

  /* =========================================
     3. PARALLAX DO FUNDO GRID
     ========================================= */
  const bgGrid = document.querySelector(".background-grid");

  window.addEventListener("scroll", () => {
    if (bgGrid) {
      const scrollY = window.scrollY;
      // Move o fundo 15% da velocidade do scroll real
      bgGrid.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  });
});
