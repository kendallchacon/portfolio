/**
 * Brillo del borde que sigue al cursor. Un solo listener por contenedor `[data-glow]`
 * (delegado): fija `--mx/--my` en la tarjeta `.glow` bajo el puntero. Solo con hover real.
 */
if (matchMedia("(hover: hover)").matches) {
  document.querySelectorAll<HTMLElement>("[data-glow]").forEach((box) =>
    box.addEventListener("pointermove", (e) => {
      const card = (e.target as Element).closest<HTMLElement>(".glow");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }),
  );
}
