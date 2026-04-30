document.addEventListener('DOMContentLoaded', () => {
  // Hero slider logic
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let heroTimer;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
        slide.style.pointerEvents = i === index ? "auto" : "none";
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-white", i === index);
        dot.classList.toggle("bg-white/40", i !== index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
      showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startHeroAuto() {
      clearInterval(heroTimer);
      heroTimer = setInterval(nextSlide, 6000);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        startHeroAuto();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        startHeroAuto();
      });
    }

    showSlide(0);
    startHeroAuto();
  }

  // Portfolio filters logic
  const mainBtns = document.querySelectorAll(".portfolio-main-btn");
  const subBtns = document.querySelectorAll(".portfolio-sub-btn");
  const items = document.querySelectorAll(".portfolio-item");

  if (items.length > 0) {
    let activeMain = "all";
    let activeSub = "all";

    function applyFilters() {
      items.forEach(item => {
        const main = item.dataset.main;
        const sub = item.dataset.sub;
        const visibleMain = activeMain === "all" || main === activeMain;
        const visibleSub = activeSub === "all" || sub === activeSub;
        item.style.display = (visibleMain && visibleSub) ? "block" : "none";
      });
    }

    if (mainBtns) {
      mainBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          activeMain = btn.dataset.main;
          mainBtns.forEach(b => {
            b.classList.remove("bg-primary", "text-white");
            b.classList.add("border-primary/20");
          });
          btn.classList.add("bg-primary", "text-white");
          btn.classList.remove("border-primary/20");
          applyFilters();
        });
      });
    }

    if (subBtns) {
      subBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          activeSub = btn.dataset.sub;
          subBtns.forEach(b => b.classList.remove("bg-primary", "text-white"));
          btn.classList.add("bg-primary", "text-white");
          applyFilters();
        });
      });
    }

    applyFilters();
  }
});
