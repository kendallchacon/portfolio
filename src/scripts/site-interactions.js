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

  let activeTrigger = null;

  const openItem = (trigger) => {
    const content = trigger.nextElementSibling;
    if (!(content instanceof HTMLElement)) return;
    activeTrigger = trigger;
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
    if (activeTrigger === trigger) activeTrigger = null;
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
    triggers.forEach((t) => closeItem(t));
    activeTrigger = null;
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
