/**
 * Media de las escenas de proyectos. Vive en `src/assets/projects/`; las capturas que ya usa
 * Servicios (01, 06, beto-juegos) se reutilizan desde `src/assets/services/`. El build no
 * depende de `docs/`. Si falta un archivo, el build falla.
 */
const images = import.meta.glob<{ default: ImageMetadata }>(
  "../../assets/{projects,services}/*.{jpg,jpeg,png,webp}",
  { eager: true },
);
const videos = import.meta.glob<string>("../../assets/projects/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
});

export function projectImage(file: string): ImageMetadata {
  const hit =
    images[`../../assets/projects/${file}`] ?? images[`../../assets/services/${file}`];
  if (!hit) throw new Error(`projects: falta la imagen ${file} en src/assets`);
  return hit.default;
}

export function projectVideo(file: string): string {
  const url = videos[`../../assets/projects/${file}`];
  if (!url) throw new Error(`projects: falta el video ${file} en src/assets/projects`);
  return url;
}
