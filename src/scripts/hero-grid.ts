/**
 * Cuadrícula decorativa de la portada (mapa de contribuciones). No usa datos reales.
 * - Aparece en onda desde el centro; las celdas cambian de nivel despacio.
 * - Con puntero fino, las celdas brillan bajo el cursor.
 * - Solo se repintan las celdas que cambian; fuera de la onda y del brillo solo se
 *   procesan las que están en transición. El bucle se detiene cuando no hay nada que
 *   animar, el canvas está fuera de pantalla o la pestaña está oculta.
 * - Con prefers-reduced-motion se pinta un único cuadro estático.
 */

const LEVELS = [0.025, 0.09, 0.16, 0.27, 0.4]; // opacidad de cada nivel de actividad
const FRAME_MS = 1000 / 30; // tope de cuadros por segundo
const SHUFFLE_MS = 1600; // cada cuánto cambian unas pocas celdas
const WAVE_END_S = 2.3; // la onda de entrada termina a los 2,3 s
const GLOW_RADIUS = 150; // px
const RESIZE_DEBOUNCE_MS = 150;

type Rgb = [number, number, number];

/** Lee un token de color (`--color-*`, `#rrggbb`) del documento. */
function token(name: string): Rgb {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return [255, 255, 255];
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Valor pseudoaleatorio estable en [0, 1): la cuadrícula no cambia al redimensionar. */
function noise(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function init(root: HTMLElement) {
  const foundCanvas = root.querySelector("canvas");
  const foundHero = root.parentElement;
  const foundCtx = foundCanvas?.getContext("2d");
  if (!foundCanvas || !foundHero || !foundCtx) return;
  // Re-enlazados con tipo no nulo para que valgan dentro de las funciones de abajo.
  const canvas: HTMLCanvasElement = foundCanvas;
  const hero: HTMLElement = foundHero;
  const ctx: CanvasRenderingContext2D = foundCtx;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const base = token("--color-ok");
  const neutral = token("--color-ink");

  // Geometría y estado por celda (índice = col * rows + row).
  let width = 0;
  let height = 0;
  let size = 12;
  let pitch = 16; // tamaño de celda + hueco
  let cols = 0;
  let rows = 0;
  let offsetX = 0;
  let offsetY = 0;
  let level = new Float32Array(0); // nivel actual
  let goal = new Float32Array(0); // nivel al que tiende
  let glow = new Float32Array(0); // brillo del cursor
  let shownAlpha = new Float32Array(0); // lo último que se pintó, para no repintar de más
  let shownSize = new Float32Array(0);
  let moving = new Set<number>(); // celdas cuyo nivel aún no llegó a su objetivo

  let startedAt = 0;
  let wavePlayed = false; // tras la onda, un redimensionado no la repite
  let repaintAll = true; // próximo cuadro: recorrer y pintar todas las celdas
  let glowing = false; // hay celdas con brillo (activo o apagándose)
  let pointer: { x: number; y: number } | null = null;
  let lastFrame = 0;
  let visible = false;
  let busy = true;
  let raf = 0;

  const canRun = () => visible && !document.hidden && !reduced.matches;

  function layout() {
    if (!width || !height) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const small = width < 760;
    size = small ? 9 : 12;
    const gap = small ? 3 : 4;
    pitch = size + gap;
    cols = Math.ceil(width / pitch) + 1;
    rows = Math.ceil(height / pitch) + 1;
    offsetX = (width - cols * pitch + gap) / 2;
    offsetY = (height - rows * pitch + gap) / 2;

    const count = cols * rows;
    level = new Float32Array(count);
    goal = new Float32Array(count);
    glow = new Float32Array(count);
    shownAlpha = new Float32Array(count).fill(-1);
    shownSize = new Float32Array(count);
    moving = new Set();
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const i = c * rows + r;
        // Manchas de actividad: ondas suaves más ruido.
        const cluster = Math.sin(c * 0.21 + r * 0.05) * 0.5 + Math.sin(c * 0.07 - r * 0.31 + 1.3) * 0.5;
        const p = noise(i) * 0.8 + (cluster > 0.4 ? 0.28 : 0);
        const lv = p < 0.68 ? 0 : p < 0.8 ? 1 : p < 0.89 ? 2 : p < 0.95 ? 3 : 4;
        level[i] = goal[i] = LEVELS[lv];
      }
    }
    startedAt = wavePlayed ? -Infinity : performance.now();
    repaintAll = true;
  }

  /** Pinta (o repinta) una celda. */
  function paint(i: number, x: number, y: number, alpha: number, s: number) {
    const dim = level[i] <= 0.035 && glow[i] < 0.05;
    const mix = glow[i] * 0.4; // con brillo, el color se aclara hacia el neutro
    const [r, g, b] = dim ? neutral : base.map((v, k) => v + (neutral[k] - v) * mix);
    const inset = (size - s) / 2;
    ctx.clearRect(x - 1, y - 1, size + 2, size + 2);
    ctx.fillStyle = `rgb(${r} ${g} ${b} / ${alpha})`;
    ctx.beginPath();
    ctx.roundRect(x + inset, y + inset, s, s, 2.5);
    ctx.fill();
  }

  /** Avanza una celda (aparición, nivel, brillo) y la repinta si cambió. Devuelve si su brillo sigue cambiando. */
  function step(i: number, t: number, settle: number, follow: number): boolean {
    const c = Math.floor(i / rows);
    const x = offsetX + c * pitch;
    const y = offsetY + (i - c * rows) * pitch;

    // Aparición en onda: más tarde cuanto más lejos del punto de origen (algo bajo el centro).
    let appear = 1;
    if (t < WAVE_END_S && !reduced.matches) {
      const dist = Math.hypot(x - width / 2, y - height * 0.62) / Math.hypot(width / 2, height * 0.62);
      appear = 1 - (1 - clamp01((t - 0.2 - dist * 1.4) / 0.6)) ** 3;
    }

    // Los niveles cambian despacio hacia su objetivo.
    if (level[i] !== goal[i]) {
      level[i] = Math.abs(goal[i] - level[i]) < 0.004 ? goal[i] : level[i] + (goal[i] - level[i]) * settle;
    }

    // El brillo sigue al cursor y se apaga al alejarse.
    let near = 0;
    if (pointer) {
      const d = Math.hypot(x + size / 2 - pointer.x, y + size / 2 - pointer.y);
      const k = clamp01(1 - d / GLOW_RADIUS);
      near = k * k * (3 - 2 * k);
    }
    if (glow[i] !== near) {
      glow[i] = Math.abs(near - glow[i]) < 0.003 ? near : glow[i] + (near - glow[i]) * follow;
    }

    const dim = level[i] <= 0.035 && glow[i] < 0.05;
    const alpha = dim ? 0.03 * appear : Math.min(0.9, (level[i] + glow[i] * 0.55) * appear);
    const s = size * (0.55 + 0.45 * appear) * (1 + glow[i] * 0.12);
    if (Math.abs(alpha - shownAlpha[i]) > 0.004 || Math.abs(s - shownSize[i]) > 0.05) {
      paint(i, x, y, alpha, s);
      shownAlpha[i] = alpha;
      shownSize[i] = s;
    }
    return glow[i] !== near;
  }

  /** Avanza la animación. Devuelve si queda algo por animar. */
  function render(now: number): boolean {
    const t = (now - startedAt) / 1000;
    const dt = Math.min(0.1, (now - lastFrame) / 1000);
    const settle = 1 - Math.exp(-dt / 0.35); // los niveles cambian despacio
    const follow = 1 - Math.exp(-dt / 0.09); // el brillo alcanza al cursor rápido

    if (repaintAll || t < WAVE_END_S || glowing) {
      // Onda, brillo o primer pintado: recorre todas las celdas.
      let glowChanging = false;
      for (let i = 0; i < level.length; i++) {
        if (step(i, t, settle, follow)) glowChanging = true;
        if (level[i] !== goal[i]) moving.add(i);
      }
      glowing = glowChanging;
      repaintAll = false;
      if (t >= WAVE_END_S) wavePlayed = true;
    } else {
      // En reposo solo las celdas en transición.
      for (const i of moving) {
        step(i, t, settle, follow);
        if (level[i] === goal[i]) moving.delete(i);
      }
    }
    return t < WAVE_END_S || glowing || moving.size > 0;
  }

  function frame(now: number) {
    raf = 0;
    if (!canRun()) return;
    if (now - lastFrame >= FRAME_MS - 1) {
      busy = render(now);
      lastFrame = now;
    }
    if (busy) raf = requestAnimationFrame(frame);
  }

  /** Arranca el bucle si estaba detenido. */
  function wake() {
    busy = true;
    if (!raf && canRun()) {
      lastFrame = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  /** Redibuja todo tras un cambio de tamaño o de preferencia de movimiento. */
  function redraw() {
    layout();
    if (reduced.matches) {
      pointer = null;
      render(performance.now());
    } else {
      wake();
    }
  }

  // El tamaño llega del ResizeObserver (no se lee del DOM, para no forzar un reflow). Su primera
  // notificación pinta; las siguientes, con debounce.
  let resizeTimer = 0;
  let firstSize = true;
  new ResizeObserver(([entry]) => {
    width = entry.contentRect.width;
    height = entry.contentRect.height;
    clearTimeout(resizeTimer);
    if (firstSize) redraw();
    else resizeTimer = window.setTimeout(redraw, RESIZE_DEBOUNCE_MS);
    firstSize = false;
  }).observe(canvas);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
  }).observe(canvas);

  document.addEventListener("visibilitychange", () => !document.hidden && wake());
  reduced.addEventListener("change", redraw);

  // Cada tanto, unas pocas celdas cambian de nivel.
  setInterval(() => {
    if (!canRun()) return;
    for (let n = 0; n < 3; n++) {
      const i = Math.floor(Math.random() * goal.length);
      goal[i] = LEVELS[Math.floor(Math.random() * LEVELS.length)];
      moving.add(i);
    }
    wake();
  }, SHUFFLE_MS);

  // Brillo bajo el cursor: solo con puntero fino y sin reduced-motion.
  if (matchMedia("(pointer: fine)").matches) {
    hero.addEventListener(
      "pointermove",
      (e) => {
        if (reduced.matches) return;
        const rect = canvas.getBoundingClientRect();
        pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        glowing = true;
        wake();
      },
      { passive: true },
    );
    hero.addEventListener("pointerleave", () => {
      pointer = null;
      glowing = true; // las celdas con brillo se apagan
      wake();
    });
  }
}

// El texto del hero no espera al canvas: se inicializa tras la carga, en un momento libre.
const root = document.querySelector<HTMLElement>("[data-hero-grid]");
if (root) {
  const start = () => init(root);
  const whenIdle = () =>
    "requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 200);
  if (document.readyState === "complete") whenIdle();
  else addEventListener("load", whenIdle, { once: true });
}
