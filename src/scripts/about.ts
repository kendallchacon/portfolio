/**
 * Terminal de Sobre mí (About.astro). Todo el texto viene del HTML del servidor:
 * - Las salidas se clonan de `[data-out]` (bloques <details> sin JS y el <template>).
 * - El intro (whoami + cat) ya está en el log; al entrar en vista se reescribe una sola vez
 *   con tecleo, salvo reduced-motion. Se cancela si el usuario actúa o enfoca el input.
 * - El log arranca con aria-live="off"; la primera acción del usuario lo pasa a "polite" y la
 *   salida se agrega un frame después para que sí se anuncie.
 * - Lo que escribe el usuario solo entra con textContent.
 */
const log = document.querySelector<HTMLElement>("[data-about-log]");
const tpl = document.querySelector<HTMLTemplateElement>("[data-about-tpl]");
const form = document.querySelector<HTMLFormElement>("[data-about-form]");
const input = form?.querySelector("input");

if (log && tpl && form && input) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const outs = new Map<string, Element>();
  for (const el of [...document.querySelectorAll("[data-out]"), ...tpl.content.querySelectorAll("[data-out]")]) {
    outs.set((el as HTMLElement).dataset.out!, el);
  }
  const cmdTpl = tpl.content.querySelector("[data-cmd]")!;
  const nfTpl = tpl.content.lastElementChild!;
  const intro = [...log.children].map((n) => n.cloneNode(true));
  const history: string[] = [];
  let hi = 0;
  let queue: string[] = [];
  let busy = false;
  let timer = 0;
  let introRunning = false;

  log.setAttribute("aria-live", "off");

  const later = (fn: () => void, ms: number) => {
    timer = window.setTimeout(fn, reduce ? 0 : ms);
  };
  const add = (n: Node) => {
    log.append(n);
    log.scrollTop = log.scrollHeight;
  };

  const run = (cmd: string) => {
    if (busy) return void queue.push(cmd);
    busy = true;
    const line = cmdTpl.cloneNode(true) as HTMLElement;
    const ty = line.querySelector("[data-ty]")!;
    add(line);
    let i = 0;
    const done = () => {
      line.querySelector("i")?.remove();
      if (cmd === "clear") {
        log.replaceChildren();
        return next();
      }
      const src = outs.get(cmd);
      let rows: Node[];
      if (src) rows = [...src.children].map((n) => n.cloneNode(true));
      else {
        const nf = nfTpl.cloneNode(true);
        nf.textContent = log.dataset.nf!.split("{cmd}").join(cmd);
        rows = [nf];
      }
      const step = () => {
        const row = rows.shift();
        if (!row) return next();
        add(row);
        later(step, 45);
      };
      step();
    };
    const type = () => {
      ty.textContent = reduce ? cmd : cmd.slice(0, ++i);
      if (reduce || i >= cmd.length) later(done, 180);
      else later(type, 38);
    };
    type();
  };

  const next = () => {
    busy = false;
    const cmd = queue.shift();
    if (cmd !== undefined) run(cmd);
    else introRunning = false;
  };

  // Si el intro sigue escribiéndose, lo deja completo al instante (como lo trae el servidor).
  const cancelIntro = () => {
    if (!introRunning) return;
    clearTimeout(timer);
    introRunning = busy = false;
    queue = [];
    log.replaceChildren(...intro.map((n) => n.cloneNode(true)));
  };

  const act = (raw: string) => {
    const cmd = raw.trim().replace(/\s+/g, " ");
    if (!cmd) return;
    cancelIntro();
    if (log.getAttribute("aria-live") === "polite") return run(cmd);
    log.setAttribute("aria-live", "polite");
    // Ocupado hasta el siguiente frame: lo que llegue antes se encola detrás.
    busy = true;
    requestAnimationFrame(() => {
      busy = false;
      run(cmd);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value;
    input.value = "";
    if (v.trim()) hi = history.push(v.trim());
    act(v);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    hi = Math.max(0, Math.min(history.length, hi + (e.key === "ArrowUp" ? -1 : 1)));
    input.value = history[hi] ?? "";
  });
  input.addEventListener("focus", cancelIntro);
  document.querySelectorAll<HTMLButtonElement>("[data-run]").forEach((b) =>
    b.addEventListener("click", () => act(b.dataset.run!)),
  );

  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (busy || log.getAttribute("aria-live") === "polite") return;
        introRunning = true;
        queue = [...log.querySelectorAll<HTMLElement>("[data-c]")].map((c) => c.dataset.c!);
        log.replaceChildren();
        next();
      },
      { threshold: 0.4 },
    );
    io.observe(log);
  }
}
