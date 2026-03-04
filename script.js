document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os elementos que possuem a classe 'reveal'
  const reveals = document.querySelectorAll(".reveal");

  // Configuração do Observador de Rolagem
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15, // O elemento aparece quando 15% dele entra na tela
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Adiciona a classe que faz o elemento aparecer
        entry.target.classList.add("active");

        // Desconecta o observador após a animação rodar a primeira vez
        // (Isso melhora a performance no celular do usuário)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplica o observador em cada elemento
  reveals.forEach((reveal) => {
    revealOnScroll.observe(reveal);
  });
});
