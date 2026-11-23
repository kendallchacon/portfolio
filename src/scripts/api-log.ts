/**
 * Muestra el log de API en cascada una sola vez, cuando entra en pantalla.
 * Solo añade `.run`: la transición y el caso reduced-motion viven en global.css.
 */
const logs = document.querySelectorAll<HTMLElement>("[data-api-log]");

if (!("IntersectionObserver" in window)) {
  logs.forEach((el) => el.classList.add("run"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("run");
        io.unobserve(e.target);
      }
    },
    { threshold: 0.35 },
  );
  logs.forEach((el) => io.observe(el));
}
