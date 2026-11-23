/**
 * Git log de experiencia (ExperienceLog.astro):
 * - Filtro por rama: `aria-pressed`, `hidden` en las entradas que no coinciden y anuncio
 *   "Mostrando N de M" solo tras usar el filtro (la región arranca vacía).
 * - Un enlace a `#xp-<id>` oculto por el filtro lo devuelve a `--all` antes del scroll nativo.
 * - KPIs: el valor final está en el HTML; aquí solo se anima desde 0 al verse (sin reduced-motion).
 * - Visor de adjuntos con `<dialog>`: Esc nativo, ←/→ dentro de la entrada, foco de vuelta a la miniatura.
 */
const root = document.querySelector<HTMLElement>("[data-xp]");

if (root) {
  const commits = [...root.querySelectorAll<HTMLLIElement>("li[data-b]")];
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("button[data-b]")];
  const brf = root.querySelector("[data-xp-brf]")!;
  const status = root.querySelector<HTMLElement>("[data-xp-status]")!;

  const filter = (button: HTMLButtonElement, announce: boolean) => {
    const key = button.dataset.b;
    let shown = 0;
    for (const b of buttons) b.setAttribute("aria-pressed", `${b === button}`);
    brf.textContent = key === "all" ? "--all" : `--branch=${button.dataset.label}`;
    for (const c of commits) {
      c.hidden = key !== "all" && c.dataset.b !== key;
      if (!c.hidden) shown++;
    }
    status.textContent = announce ? status.dataset.tpl!.replace("{n}", `${shown}`) : "";
  };
  for (const b of buttons) b.addEventListener("click", () => filter(b, true));

  const unhide = (hash: string) => {
    const target = hash.startsWith("#xp-") && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target && target.hidden) filter(buttons[0], false);
  };
  // En captura: corre antes de que el navegador haga scroll al ancla.
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element).closest?.<HTMLAnchorElement>("a[href*='#xp-']");
      if (a && a.pathname === location.pathname) unhide(a.hash);
    },
    true,
  );
  addEventListener("hashchange", () => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target?.hidden) {
      unhide(location.hash);
      target.scrollIntoView();
    }
  });

  // Contador de KPIs.
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const lang = document.documentElement.lang;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          const to = +el.dataset.count!;
          const dec = +el.dataset.dec!;
          const nf = new Intl.NumberFormat(lang, { minimumFractionDigits: dec, maximumFractionDigits: dec });
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / 1200);
            el.textContent = nf.format(to * (1 - (1 - p) ** 3)) + el.dataset.suf;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      // Arranca en cuanto asoma: así nunca queda un "0" visible si el KPI no llega a verse entero.
      { threshold: 0 },
    );
    for (const el of root.querySelectorAll<HTMLElement>("[data-count]")) io.observe(el);
  }
}

// Visor de adjuntos.
const viewer = document.querySelector<HTMLDialogElement>("[data-xp-viewer]");

if (root && viewer) {
  const img = viewer.querySelector("img")!;
  const caption = viewer.querySelector("figcaption")!;
  const steps = [...viewer.querySelectorAll<HTMLButtonElement>("[data-step]")];
  let list: HTMLAnchorElement[] = [];
  let index = 0;
  let opener: HTMLAnchorElement | undefined;

  const show = (i: number) => {
    index = (i + list.length) % list.length;
    const a = list[index];
    img.width = +a.dataset.w!;
    img.height = +a.dataset.h!;
    img.src = a.href;
    img.alt = caption.textContent = a.dataset.alt!;
  };

  root.addEventListener("click", (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>("a[data-att]");
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    opener = a;
    list = [...a.closest("li")!.querySelectorAll<HTMLAnchorElement>("a[data-att]")];
    for (const s of steps) s.hidden = list.length < 2;
    show(list.indexOf(a));
    viewer.showModal();
  });

  viewer.addEventListener("click", (e) => {
    const t = e.target as Element;
    const step = t.closest<HTMLElement>("[data-step]");
    if (step) show(index + +step.dataset.step!);
    else if (t === viewer || t.closest("[data-close]")) viewer.close();
  });

  viewer.addEventListener("keydown", (e) => {
    if (list.length < 2 || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
    e.preventDefault();
    show(index + (e.key === "ArrowRight" ? 1 : -1));
  });

  viewer.addEventListener("close", () => {
    img.removeAttribute("src");
    opener?.focus();
  });
}

export {};
