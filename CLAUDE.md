# CLAUDE.md — Portafolio Kendall Chacón

## Contexto
Portafolio personal en Astro 6 + Tailwind 4, desplegado en Vercel. Diseño aprobado en `docs/prototype/index.html` y especificado en `docs/HANDOFF_DESARROLLO.md`. Léelos antes de cambiar UI.

## Ramas y commits
- No trabajes ni hagas commit en `master` ni en `dev`. Cada tarea va en su rama desde `dev` (`feat/`, `fix/`, `chore/`, `content/`, `perf/`, `docs/`).
- No hagas commits, push, merge ni PR: los hace Kendall. Deja los cambios sin commitear en la rama de trabajo.
- Propón los mensajes de commit, pequeños y convencionales (`tipo(área): descripción`), cada uno con la lista de archivos que incluye. Nunca agregues `Co-Authored-By` ni menciones a Claude en commits o PR.

## Arquitectura
- Datos tipados en `src/data/*.ts`; los componentes no tienen texto quemado. Todo texto visible es bilingüe (`{ es, en }`).
- Componentes por área: `src/components/{layout,common,sections,projects,cases}`.
- Estilos: tokens en `src/styles/global.css` (`@theme`). Nada de colores sueltos fuera de los tokens.
- JavaScript solo para interacción, en `<script>` de Astro o una island mínima; sin frameworks extra salvo justificación.
- Imágenes con `astro:assets`; videos con `preload="none"`, poster y carga diferida.
- Todo efecto respeta `prefers-reduced-motion` y no bloquea la lectura.
- Con compressHTML 'jsx' (Astro 7) no se renderizan los espacios entre elementos en línea: sepáralos con gap/flex o {' '} explícito.

## Contenido (no inventar)
- Kendall es bachiller (promedio 9,0), práctica concluida en Flameware, disponible para empleo y proyectos. No decir que busca práctica.
- Tutorías: Java. No Cálculo.
- No atribuir a Kendall trabajo de compañeros (p. ej. la restricción GiST de MatchGo).
- Repositorios privados: fragmentos cortos, sin enlaces.

## Verificación antes de entregar
- `npm run build` y `npx astro check` sin errores.
- Revisar 1440 px y 390 px, ES y EN, consola limpia.
- Resumir cambios y proponer mensaje de commit y descripción de PR.
