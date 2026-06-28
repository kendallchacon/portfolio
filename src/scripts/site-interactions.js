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

// --- Terminal del hero ---
// Tipeo de las líneas una sola vez (basado en requestAnimationFrame para
// garantizar una duración total acotada, independiente del nº de caracteres)
// más una status bar permanente con shimmer CSS.
// El contenido completo ya vive en el DOM, por lo que es legible sin JS.
// Respeta prefers-reduced-motion mostrando todo de forma estática.
const terminal = document.querySelector("[data-terminal]");

if (terminal instanceof HTMLElement) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // --- Limpieza explícita de la animación en curso ---
  let rafId = 0;

  const cleanup = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };

  // Cancela el tipeo si la página se descarta o navega (view transitions).
  window.addEventListener("pagehide", cleanup, { once: true });
  document.addEventListener("astro:before-swap", cleanup, { once: true });

  // --- Datos del tipeo ---
  const lineEls = Array.from(terminal.querySelectorAll(".term-line"));

  const setActive = (activeLine) => {
    lineEls.forEach((line) => line.classList.remove("is-active"));
    activeLine?.classList.add("is-active");
  };

  // Solo las líneas con texto se tipean; las "blank" sirven de separador.
  const segments = [];
  let charOffset = 0;
  lineEls.forEach((line) => {
    const txt = line.querySelector(".term-txt");
    if (!txt) return;
    const full = txt.textContent ?? "";
    segments.push({ line, txt, full, start: charOffset });
    charOffset += full.length;
  });
  const totalChars = charOffset;

  if (prefersReducedMotion || segments.length === 0) {
    // Sin animación: contenido completo visible y estático desde el inicio.
    setActive(lineEls[lineEls.length - 1]);
    terminal.setAttribute("data-terminal-state", "done");
  } else {
    // Tipeo con duración total acotada (< 3.5 s).
    const DURATION_MS = 3200;

    // Vaciamos el texto antes de revelar para que el tipeo empiece desde cero.
    segments.forEach((seg) => {
      seg.txt.textContent = "";
    });
    terminal.setAttribute("data-terminal-state", "running");

    let startTime = 0;
    const typeFrame = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min(1, (now - startTime) / DURATION_MS);
      const target = Math.round(progress * totalChars);

      let activeLine = segments[0].line;
      for (const seg of segments) {
        const reveal = Math.max(
          0,
          Math.min(seg.full.length, target - seg.start),
        );
        seg.txt.textContent = seg.full.slice(0, reveal);
        if (reveal > 0) activeLine = seg.line;
      }
      setActive(activeLine);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(typeFrame);
      } else {
        rafId = 0;
        setActive(segments[segments.length - 1].line);
        terminal.setAttribute("data-terminal-state", "done");
      }
    };

    rafId = window.requestAnimationFrame(typeFrame);
  }

  // --- Spotlight: la terminal sigue el puntero (solo pointer fino) ---
  if (window.matchMedia("(pointer: fine)").matches) {
    terminal.addEventListener(
      "pointermove",
      (event) => {
        const rect = terminal.getBoundingClientRect();
        terminal.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        terminal.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      },
      { passive: true },
    );
  }
}

// --- Acordeón de proyectos ---
const accordionEl = document.querySelector("[data-accordion]");

if (accordionEl instanceof HTMLElement) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const triggers = Array.from(accordionEl.querySelectorAll("[data-accordion-trigger]"));

  // Div flotante fijo — creado una vez, vive en <body>
  const floatingHeader = document.createElement("div");
  floatingHeader.id = "project-sticky-header";
  floatingHeader.style.cssText = `
    position: fixed; left: 0; right: 0; z-index: 49;
    background: rgb(2,8,23);
    border-bottom: 1px solid rgba(51,65,85,0.5);
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    padding: 12px 24px;
    opacity: 0; pointer-events: none;
    transform: translateY(-100%);
    transition: ${reducedMotion ? "none" : "opacity 300ms ease-out, transform 300ms ease-out"};
  `;
  document.body.appendChild(floatingHeader);

  let activeTrigger = null;
  let headerAbove = false;
  let floatingVisible = false;
  let scrollListenerActive = false;
  let acLastScrollY = window.scrollY;
  let headerObserver = null;

  const getNavbarHeight = () => {
    const nav = document.getElementById("site-header");
    return nav instanceof HTMLElement ? nav.offsetHeight : 64;
  };

  const showFloating = () => {
    if (floatingVisible) return;
    floatingHeader.style.top = getNavbarHeight() + "px";
    if (reducedMotion) {
      floatingHeader.style.transition = "none";
    } else {
      floatingHeader.style.transition = "opacity 300ms ease-out, transform 300ms ease-out";
    }
    floatingHeader.style.opacity = "1";
    floatingHeader.style.transform = "translateY(0)";
    floatingHeader.style.pointerEvents = "auto";
    floatingVisible = true;
  };

  const hideFloating = (fast = false) => {
    if (!floatingVisible) return;
    if (reducedMotion) {
      floatingHeader.style.transition = "none";
    } else {
      floatingHeader.style.transition = `opacity ${fast ? 150 : 200}ms ease-in, transform ${fast ? 150 : 200}ms ease-in`;
    }
    floatingHeader.style.opacity = "0";
    floatingHeader.style.transform = "translateY(-100%)";
    floatingHeader.style.pointerEvents = "none";
    floatingVisible = false;
  };

  const updateFloatingContent = (trigger) => {
    // Clone the trigger content and wire the click to close
    floatingHeader.innerHTML = trigger.innerHTML;
    // The cloned chevron rotates via aria-expanded on the original — mirror it
    const chevron = floatingHeader.querySelector("svg");
    if (chevron) chevron.style.transform = "rotate(180deg)";
    floatingHeader.style.cursor = "pointer";
    floatingHeader.onclick = () => {
      if (!activeTrigger) return;
      closeItem(activeTrigger);
      activeTrigger.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    };
  };

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - acLastScrollY;
    acLastScrollY = currentScrollY;
    if (!activeTrigger || !headerAbove) return;
    if (delta < -8 && !floatingVisible) showFloating();
    if (delta > 8 && floatingVisible) hideFloating();
  };

  const startScrollListener = () => {
    if (scrollListenerActive) return;
    acLastScrollY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    scrollListenerActive = true;
  };

  const stopScrollListener = () => {
    window.removeEventListener("scroll", onScroll);
    scrollListenerActive = false;
  };

  const disconnectObserver = () => {
    if (headerObserver) { headerObserver.disconnect(); headerObserver = null; }
  };

  const watchHeader = (trigger) => {
    disconnectObserver();
    headerObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      headerAbove = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      if (!headerAbove) hideFloating();
    }, { threshold: 0 });
    headerObserver.observe(trigger);
  };

  const openItem = (trigger) => {
    const content = trigger.nextElementSibling;
    if (!(content instanceof HTMLElement)) return;
    activeTrigger = trigger;
    headerAbove = false;
    trigger.setAttribute("aria-expanded", "true");
    if (reducedMotion) {
      content.style.transition = "none";
      content.style.maxHeight = "5000px";
      content.style.opacity = "1";
    } else {
      content.style.transition = "max-height 500ms ease-in-out, opacity 300ms ease-in-out 100ms";
      content.style.maxHeight = "5000px";
      content.style.opacity = "1";
    }
    updateFloatingContent(trigger);
    watchHeader(trigger);
    startScrollListener();
  };

  const closeItem = (trigger) => {
    const content = trigger.nextElementSibling;
    if (!(content instanceof HTMLElement)) return;
    trigger.setAttribute("aria-expanded", "false");
    if (reducedMotion) {
      content.style.transition = "none";
      content.style.maxHeight = "0";
      content.style.opacity = "0";
    } else {
      content.style.transition = "max-height 500ms ease-in-out, opacity 150ms ease-in-out";
      content.style.maxHeight = "0";
      content.style.opacity = "0";
    }
    if (activeTrigger === trigger) {
      activeTrigger = null;
      headerAbove = false;
      hideFloating(true);
      stopScrollListener();
      disconnectObserver();
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      triggers.forEach((t) => { if (t !== trigger) closeItem(t); });
      if (isOpen) closeItem(trigger);
      else openItem(trigger);
    });
  });

  const accordionCleanup = () => {
    hideFloating(true);
    stopScrollListener();
    disconnectObserver();
    activeTrigger = null;
    headerAbove = false;
    triggers.forEach((t) => closeItem(t));
  };
  window.addEventListener("pagehide", accordionCleanup, { once: true });
  document.addEventListener("astro:before-swap", accordionCleanup, { once: true });
}

// --- Carrusel de galería de proyectos ---
const carouselEl = document.querySelector("[data-carousel]");

if (carouselEl instanceof HTMLElement) {
  const slides = Array.from(carouselEl.querySelectorAll("[data-carousel-slide]"));
  const dots = Array.from(carouselEl.querySelectorAll("[data-carousel-dot]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DURATION = reducedMotion ? 0 : 1000;
  const AUTOPLAY_MS = 6000;

  let current = 0;
  let timer = 0;
  let isTransitioning = false;

  const goTo = (index) => {
    if (isTransitioning) return;
    current = (index + slides.length) % slides.length;

    if (DURATION) {
      isTransitioning = true;
      window.setTimeout(() => { isTransitioning = false; }, DURATION);
    }

    slides.forEach((s, i) => {
      s.style.transition = DURATION ? `opacity ${DURATION}ms ease-in-out` : "none";
      s.style.opacity = i === current ? "1" : "0";
    });

    dots.forEach((d, i) => {
      const isActive = i === current;
      d.style.width = isActive ? "1.5rem" : "0.5rem";
      d.style.opacity = isActive ? "1" : "0.4";
    });
  };

  const startAutoplay = () => {
    if (reducedMotion) return;
    timer = window.setInterval(() => goTo(current + 1), AUTOPLAY_MS);
  };

  const stopAutoplay = () => window.clearInterval(timer);

  dots.forEach((d, i) => d.addEventListener("click", () => { stopAutoplay(); goTo(i); startAutoplay(); }));

  carouselEl.addEventListener("mouseenter", stopAutoplay);
  carouselEl.addEventListener("mouseleave", startAutoplay);

  // Swipe táctil
  let touchStartX = 0;
  let touchStartY = 0;

  carouselEl.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  carouselEl.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX > 50) { stopAutoplay(); goTo(current - 1); startAutoplay(); }
    else if (deltaX < -50) { stopAutoplay(); goTo(current + 1); startAutoplay(); }
  }, { passive: true });

  const cleanup = () => stopAutoplay();
  window.addEventListener("pagehide", cleanup, { once: true });
  document.addEventListener("astro:before-swap", cleanup, { once: true });

  goTo(0);
  startAutoplay();
}

// --- Menú móvil accesible ---
// Cierra con: clic fuera (backdrop), Escape y al navegar (astro:after-swap).
// Atrapa el foco mientras está abierto y lo devuelve al botón al cerrar.
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");

if (mobileMenuButton instanceof HTMLButtonElement && mobileMenu) {
  const openIcon = mobileMenuButton.querySelector(".menu-open-icon");
  const closeIcon = mobileMenuButton.querySelector(".menu-close-icon");

  const isOpen = () => mobileMenuButton.getAttribute("aria-expanded") === "true";

  // Elementos enfocables del menú (incluye el botón para mantenerlo en el ciclo).
  const getFocusable = () => [
    mobileMenuButton,
    ...mobileMenu.querySelectorAll("a[href]"),
  ];

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusable();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  function openMenu() {
    mobileMenuButton.setAttribute("aria-expanded", "true");
    mobileMenuButton.setAttribute("aria-label", "Cerrar navegación");
    mobileMenu.classList.remove("hidden");
    openIcon?.classList.add("hidden");
    closeIcon?.classList.remove("hidden");

    document.addEventListener("keydown", onKeydown);

    // Foco al primer enlace del panel.
    const firstLink = mobileMenu.querySelector("a[href]");
    if (firstLink instanceof HTMLElement) firstLink.focus();
  }

  function closeMenu({ returnFocus = true } = {}) {
    if (!isOpen()) return;

    mobileMenuButton.setAttribute("aria-expanded", "false");
    mobileMenuButton.setAttribute("aria-label", "Abrir navegación");
    mobileMenu.classList.add("hidden");
    openIcon?.classList.remove("hidden");
    closeIcon?.classList.add("hidden");

    document.removeEventListener("keydown", onKeydown);

    if (returnFocus) mobileMenuButton.focus();
  }

  mobileMenuButton.addEventListener("click", () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  mobileMenuBackdrop?.addEventListener("click", () => closeMenu());

  // Cierra al seguir un enlace (sin robar el foco al destino).
  mobileMenu.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => closeMenu({ returnFocus: false }));
  });

  // Cierra tras una navegación con view transitions de Astro.
  document.addEventListener("astro:after-swap", () =>
    closeMenu({ returnFocus: false }),
  );
}
