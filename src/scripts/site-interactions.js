const revealElements = document.querySelectorAll(".reveal");

// IntersectionObserver evita animar elementos antes de que entren al viewport.
const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => revealOnScroll.observe(element));

const heroWords = ["ideas", "negocios", "sistemas", "usuarios"];
let heroWordIndex = 0;
const heroWord = document.getElementById("hero-word");

if (heroWord instanceof HTMLElement) {
  heroWord.classList.add("show");

  setInterval(() => {
    heroWord.classList.remove("show");
    heroWord.classList.add("hide");

    setTimeout(() => {
      heroWordIndex = (heroWordIndex + 1) % heroWords.length;
      heroWord.textContent = heroWords[heroWordIndex];

      heroWord.classList.remove("hide");
      heroWord.classList.add("show");
    }, 500);
  }, 3000);
}
