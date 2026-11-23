/**
 * Interacción de Proyectos (Projects.astro), con un solo IntersectionObserver:
 * - Video de demo (`video[data-src]`, preload="none"): la fuente se asigna al entrar en vista;
 *   se reproduce dentro y se pausa fuera. Si play() falla (ahorro de datos, autoplay bloqueado)
 *   queda el poster, sin errores. Con reduced-motion no se observa: nunca se descarga.
 * - Pipeline del Lab (`[data-ci]`): el HTML trae el estado final. Con JS y sin reduced-motion,
 *   los pasos (`[data-job]`) se animan al entrar en vista (`.ci-run` en global.css) y el botón
 *   `[data-ci-rerun]` los vuelve a ejecutar. Con reduced-motion el botón deja el estado final.
 */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
// También activa el video de la cabecera de un caso (`[data-case]`, CaseContent.astro).
const video = document.querySelector<HTMLVideoElement>("#proyectos video[data-src], [data-case] video[data-src]");
const ci = document.querySelector<HTMLElement>("#proyectos [data-ci]");
const rerun = ci?.querySelector<HTMLButtonElement>("[data-ci-rerun]");
const VISIBLE = 0.25;
let timer = 0;

function runCI() {
  if (!ci || reduce) return;
  clearTimeout(timer);
  const jobs = [...ci.querySelectorAll("[data-job]")];
  jobs.forEach((j) => j.classList.remove("run", "done"));
  ci.classList.add("ci-run");
  let i = 0;
  const next = () => {
    jobs[i - 1]?.classList.replace("run", "done");
    if (i < jobs.length) {
      jobs[i++].classList.add("run");
      timer = window.setTimeout(next, 600 + Math.random() * 400);
    } else ci.classList.remove("ci-run");
  };
  next();
}

function play(v: HTMLVideoElement) {
  if (!v.src) v.src = v.dataset.src!;
  v.play().catch(() => {});
}

if (rerun) {
  rerun.hidden = false;
  rerun.addEventListener("click", runCI);
}

if ("IntersectionObserver" in window && !reduce) {
  // El pipeline espera en "pendiente" hasta verse (la tarjeta aún está oculta por el reveal).
  ci?.classList.add("ci-run");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const on = e.isIntersecting && e.intersectionRatio >= VISIBLE;
        if (e.target === ci) {
          if (!on) continue;
          io.unobserve(ci);
          runCI();
        } else if (on) play(video!);
        else video!.pause();
      }
    },
    { threshold: [0, VISIBLE] },
  );
  if (ci) io.observe(ci);
  if (video) io.observe(video);
}

export {};
