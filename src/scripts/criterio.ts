/**
 * Criterio (Criterio.astro), "El hilo": el scroll recorre los cuatro criterios.
 * Solo en modo escenario (≥1024 px y sin reduced-motion; el CSS lo activa con `html.js`):
 * - Un único listener de scroll pasivo con rAF, conectado solo mientras la sección está en
 *   pantalla (IntersectionObserver). En scroll no lee layout: usa `scrollY` y medidas guardadas.
 *   Escribe `--t = p − i` en paneles y ramas, y en la guía `--fill` (0–1) y `--sel` (índice + u del
 *   cruce, para la selección); el CSS hace el resto.
 * - Activo = el panel más visible (cambia a mitad del cruce, u ≥ 0.5): los demás llevan `inert`
 *   y `aria-hidden`; su paso, `aria-current="step"`, y los anteriores, `data-done`. El contador
 *   de la guía muestra su número.
 * - Medidas (recorrido y ramas): al iniciar, al cambiar de tamaño (el stage o la página) y al
 *   cargar las fuentes; nunca durante el scroll.
 * - Pasos de la guía: enlaces a cada panel (sin JS o apilados funcionan solos); en el escenario
 *   llevan al reposo de su paso (p = i + 0.55), con el comentario ya visible.
 */
const root = document.querySelector<HTMLElement>("[data-criterio]");
const track = root?.querySelector<HTMLElement>("[data-cr-track]");
const stage = root?.querySelector<HTMLElement>("[data-cr-stage]");
const guide = root?.querySelector<HTMLElement>("[data-cr-guide]");

if (root && track && stage && guide) {
  const panels = [...root.querySelectorAll<HTMLElement>("[data-cr-panel]")];
  const steps = [...root.querySelectorAll<HTMLAnchorElement>("[data-cr-step]")];
  const branches = [...root.querySelectorAll<SVGPathElement>("[data-cr-branch]")];
  const nodes = steps.map((step) => step.querySelector<HTMLElement>("[data-cr-node]")!);
  const count = guide.querySelector<HTMLElement>("[data-cr-count]");
  const n = panels.length;
  const mode = matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

  let staged = false;
  let visible = !("IntersectionObserver" in window);
  let listening = false;
  let frame = 0;
  let active = -1;
  // Medidas guardadas: inicio del recorrido en el documento, top del sticky y px por paso.
  let start = 0;
  let step = 1;

  // Rama i: del nodo i (8 px a la derecha de su centro) al icono de comentario del panel i (4 px
  // antes de su borde izquierdo). Se mide por centros, que no cambian con la escala del nodo
  // activo ni con la del icono; coordenadas relativas al stage, sin el desplazamiento del panel.
  const NODE_R = 8;
  const ICON_R = 7;
  const drawBranches = () => {
    const box = stage.getBoundingClientRect();
    panels.forEach((panel, i) => {
      const node = nodes[i].getBoundingClientRect();
      const icon = panel.querySelector(".cw-ico")!.getBoundingClientRect();
      const shift = new DOMMatrix(getComputedStyle(panel).transform).m42;
      const x1 = node.left + node.width / 2 + NODE_R - box.left;
      const y1 = node.top + node.height / 2 - box.top;
      const x2 = icon.left + icon.width / 2 - ICON_R - 4 - box.left;
      const y2 = icon.top + icon.height / 2 - shift - box.top;
      const mid = (x1 + x2) / 2;
      branches[i].setAttribute("d", `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`);
    });
  };

  const measure = () => {
    if (!staged) return;
    const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
    step = (track.offsetHeight - stage.offsetHeight) / n;
    start = track.getBoundingClientRect().top + scrollY - stickyTop;
    drawBranches();
  };

  const setActive = (index: number) => {
    active = index;
    panels.forEach((panel, k) => {
      panel.inert = k !== index;
      if (k === index) panel.removeAttribute("aria-hidden");
      else panel.setAttribute("aria-hidden", "true");
    });
    steps.forEach((link, k) => {
      if (k === index) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
      link.toggleAttribute("data-done", k < index);
    });
    if (count) count.textContent = String(index + 1).padStart(2, "0");
  };

  const update = () => {
    frame = 0;
    const p = Math.min(n, Math.max(0, (scrollY - start) / step));
    panels.forEach((panel, i) => panel.style.setProperty("--t", (p - i).toFixed(4)));
    branches.forEach((branch, i) => branch.style.setProperty("--t", (p - i).toFixed(4)));
    guide.style.setProperty("--fill", (Math.min(p, n - 1) / (n - 1)).toFixed(4));
    // u del cruce, como en el CSS: smoothstep((t − 0.80) / 0.20) sobre el paso actual.
    const i = Math.floor(p);
    const x = Math.min(1, Math.max(0, (p - i - 0.8) / 0.2));
    const u = x * x * (3 - 2 * x);
    guide.style.setProperty("--sel", Math.min(n - 1, i + u).toFixed(4));
    const next = Math.min(n - 1, i + (u >= 0.5 ? 1 : 0));
    if (next !== active) setActive(next);
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const sync = () => {
    const listen = staged && visible;
    if (listen && !listening) {
      addEventListener("scroll", onScroll, { passive: true });
      listening = true;
      update();
    } else if (!listen && listening) {
      removeEventListener("scroll", onScroll);
      listening = false;
    }
  };

  // Fuera del escenario (móvil, reduced-motion): paneles apilados, sin estado.
  const reset = () => {
    active = -1;
    for (const el of [...panels, ...branches]) el.style.removeProperty("--t");
    guide.style.removeProperty("--fill");
    guide.style.removeProperty("--sel");
    if (count) count.textContent = "01";
    panels.forEach((panel) => {
      panel.inert = false;
      panel.removeAttribute("aria-hidden");
    });
    steps.forEach((link) => {
      link.removeAttribute("aria-current");
      link.removeAttribute("data-done");
    });
  };

  const setMode = () => {
    staged = mode.matches;
    if (staged) {
      measure();
      update();
    } else {
      reset();
    }
    sync();
  };

  if (!visible) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }).observe(root);
  }

  // El stage cambia con el viewport; la página, si cambia el contenido de arriba (p. ej. el
  // filtro de Experiencia). Ambos mueven el recorrido o las ramas.
  const remeasure = () => {
    measure();
    if (staged) update();
  };
  const resized = new ResizeObserver(remeasure);
  resized.observe(stage);
  resized.observe(document.body);
  document.fonts?.ready.then(remeasure);
  mode.addEventListener("change", setMode);
  setMode();

  guide.addEventListener("click", (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>("[data-cr-step]");
    if (!link || !staged || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    scrollTo({ top: start + (steps.indexOf(link) + 0.55) * step, behavior: "smooth" });
  });
}

export {};
