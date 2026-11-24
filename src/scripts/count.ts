/**
 * Contador de cifras (`[data-count]`, con `data-dec` y `data-suf`). El valor final ya está en el
 * HTML; aquí solo se anima desde 0 al asomar en vista, sin reduced-motion. Es el contador de los
 * KPIs de Experiencia (experience.ts), extraído sin cambios para reutilizarlo en los casos.
 */
export function countUp(scope: ParentNode) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
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
  for (const el of scope.querySelectorAll<HTMLElement>("[data-count]")) io.observe(el);
}
