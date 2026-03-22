document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. PARALLAX DO FUNDO GRID E TILT 3D (Desktop)
     ========================================= */
  const bgGrid = document.querySelector(".background-grid");

  window.addEventListener("scroll", () => {
    if (bgGrid) {
      const scrollY = window.scrollY;
      bgGrid.style.transform = `translateY(${scrollY * 15}px)`;
    }
  });

  const cards = document.querySelectorAll(".link-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = "transform 0.1s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = "transform 0.5s ease";
    });
  });

  /* =========================================
     2. CRONÓMETRO DE ESCASSEZ CORRIGIDO
     ========================================= */
  const timerDisplay = document.querySelector(".top-urgency-bar strong");

  if (timerDisplay) {
    // Declarar a variável AQUI FORA para ela diminuir corretamente
    let timeInSeconds = 15 * 60; // 15 minutos em segundos

    const updateTimer = () => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;

      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      timerDisplay.textContent = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;

      if (timeInSeconds > 0) {
        timeInSeconds--;
      } else {
        clearInterval(timerInterval); // Para quando chegar a zero
      }
    };

    updateTimer(); // Atualiza a primeira vez sem atraso
    const timerInterval = setInterval(updateTimer, 1000); // Roda a cada 1 segundo
  }

  /* =========================================
     3. SCROLL SUAVE PARA OS BOTÕES (ÂNCORAS)
     ========================================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* =========================================
     4. EFEITO REVEAL UNIFICADO (Aparecer ao rolar)
     ========================================= */
  // Seleciona tanto os antigos .reveal quanto os novos .reveal-element
  const revealElements = document.querySelectorAll(".reveal, .reveal-element");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          entry.target.classList.add("active"); // Caso o CSS antigo precise disto
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  revealElements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
    revealObserver.observe(el);
  });

  /* =========================================
     5. SISTEMA DE NOTIFICAÇÕES (Vendas Falsas)
     ========================================= */
  const notification = document.getElementById("sales-notification");
  const notifyName = document.getElementById("notify-name");
  const notifyTime = document.getElementById("notify-time");

  const buyers = [
    { name: "Carlos S.", city: "São Paulo, SP", time: "Há 2 minutos" },
    { name: "Mariana L.", city: "Rio de Janeiro, RJ", time: "Há 5 minutos" },
    { name: "Rui M.", city: "Belo Horizonte, MG", time: "Há 12 minutos" },
    { name: "Ana P.", city: "Curitiba, PR", time: "Há 1 hora" },
    { name: "Felipe T.", city: "Porto Alegre, RS", time: "Há 4 minutos" },
    { name: "Juliana C.", city: "Salvador, BA", time: "Há 25 minutos" },
    { name: "Pedro H.", city: "Brasília, DF", time: "Há 8 minutos" },
    { name: "Camila R.", city: "Florianópolis, SC", time: "Há 3 horas" },
    { name: "Lucas F.", city: "Goiânia, GO", time: "Há 15 minutos" },
    { name: "Beatriz N.", city: "Recife, PE", time: "Há 1 minuto" },
  ];

  let currentBuyerIndex = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(buyers);

  function showNotification() {
    if (!notification) return;

    const buyer = buyers[currentBuyerIndex];
    notifyName.innerHTML = `<strong>${buyer.name}</strong> (${buyer.city})`;
    notifyTime.textContent = buyer.time;

    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");

      currentBuyerIndex++;
      if (currentBuyerIndex >= buyers.length) {
        currentBuyerIndex = 0;
        shuffleArray(buyers);
      }

      const nextDelay = Math.floor(Math.random() * (15000 - 8000 + 1) + 8000);
      setTimeout(showNotification, nextDelay);
    }, 5000);
  }

  setTimeout(showNotification, 4000);
});
