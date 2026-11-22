/** Minúsculas y sin diacríticos: "Sobre mí" → "sobre mi". Lo comparten el servidor y la paleta. */
export const normalize = (text: string): string =>
  text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
