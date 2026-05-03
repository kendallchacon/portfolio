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

const siteHeader = document.getElementById("site-header");
let lastScrollY = window.scrollY;
let ticking = false;

const updateHeaderVisibility = () => {
  if (!(siteHeader instanceof HTMLElement)) return;

  const currentScrollY = window.scrollY;
  const isScrollingDown = currentScrollY > lastScrollY;
  const isMobileMenuOpen =
    mobileMenuButton?.getAttribute("aria-expanded") === "true";

  if (currentScrollY < 80 || !isScrollingDown || isMobileMenuOpen) {
    siteHeader.classList.remove("-translate-y-full");
  } else {
    siteHeader.classList.add("-translate-y-full");
  }

  lastScrollY = Math.max(currentScrollY, 0);
  ticking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderVisibility);
      ticking = true;
    }
  },
  { passive: true },
);

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

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton instanceof HTMLButtonElement && mobileMenu) {
  const openIcon = mobileMenuButton.querySelector(".menu-open-icon");
  const closeIcon = mobileMenuButton.querySelector(".menu-close-icon");

  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileMenuButton.getAttribute("aria-expanded") === "true";

    mobileMenuButton.setAttribute("aria-expanded", String(!isOpen));
    mobileMenuButton.setAttribute(
      "aria-label",
      isOpen ? "Abrir navegación" : "Cerrar navegación",
    );
    mobileMenu.classList.toggle("hidden", isOpen);
    openIcon?.classList.toggle("hidden", !isOpen);
    closeIcon?.classList.toggle("hidden", isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuButton.setAttribute("aria-expanded", "false");
      mobileMenuButton.setAttribute("aria-label", "Abrir navegación");
      mobileMenu.classList.add("hidden");
      openIcon?.classList.remove("hidden");
      closeIcon?.classList.add("hidden");
    });
  });
}
