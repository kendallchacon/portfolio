/**
 * Reveal por scroll y tecleo de rutas, reutilizable en cualquier sección:
 * - `[data-rv]`: el elemento entra al verse (estilos en global.css, bajo `html.rv`).
 * - `[data-rv-stagger]`: sus hijos entran en cascada (`--k` = índice).
 * - `[data-type]` dentro de un elemento revelado: su `.pt` se revela letra a letra. El texto
 *   completo sigue en el DOM; solo se recorta su ancho (en `ch`, la fuente es monoespaciada).
 * Sin IntersectionObserver todo se muestra al instante; sin JS nunca se oculta nada.
 */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function type(el: HTMLElement) {
  const pt = el.querySelector<HTMLElement>(".pt");
  if (!pt || reduce) return;
  const n = pt.textContent!.length;
  let i = 0;
  pt.style.cssText = "display:inline-block;overflow:hidden;white-space:nowrap;width:0";
  const t = setInterval(() => {
    pt.style.width = `${++i}ch`;
    if (i >= n) {
      clearInterval(t);
      pt.removeAttribute("style");
    }
  }, 32);
}

function show(el: Element) {
  el.classList.add("vis");
  el.querySelectorAll<HTMLElement>("[data-type]").forEach(type);
}

document.querySelectorAll("[data-rv-stagger]").forEach((group) =>
  [...group.children].forEach((child, i) => (child as HTMLElement).style.setProperty("--k", `${i}`)),
);

const targets = document.querySelectorAll("[data-rv],[data-rv-stagger]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        show(e.target);
        io.unobserve(e.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach(show);
}
