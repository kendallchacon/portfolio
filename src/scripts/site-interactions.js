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
