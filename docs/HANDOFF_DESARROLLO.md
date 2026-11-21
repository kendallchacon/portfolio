# Portafolio Kendall Chacón — handoff para el desarrollo

Prototipo aprobado: **v10** (21 nov 2026) — https://claude.ai/artifact/7JiMQ8FFLv7ZuTzeAigXfA
Copia local: carpeta `prototipo-v10/` (abrir `index.html` con un servidor local, p. ej. `npx serve prototipo-v10`).
Repositorio: https://github.com/kendallchacon/portfolio (Astro 6 + Tailwind 4, deploy en Vercel, rama por defecto `master`).

El prototipo es **referencia visual y de comportamiento**, no código para copiar tal cual: es un HTML único generado por scripts. En Astro se reconstruye por componentes y datos tipados.

---

## 1. Quién es y qué vende el sitio

- Kendall Chacón Molina — **Bachiller en Ingeniería en Sistemas (UNA, Sarapiquí)**, todos los cursos aprobados, **promedio ponderado 9,0**. Título en la graduación de 2027.
- **Práctica profesional concluida** en Flameware Technologies (ago–nov 2026), plataforma Costa Rica Homes Realty.
- Posicionamiento: **desarrollador backend y full stack disponible para proyectos y empleo** (Costa Rica / remoto). **No** decir que busca práctica.
- Tutorías: principalmente **Java** (Programación I y II). **No** Cálculo.
- Idiomas del sitio: español (por defecto) e inglés.

## 2. Dirección visual (aprobada)

- Tema oscuro de desarrollador, línea "git": rutas `~/seccion`, `$ cd ~/seccion`, `git log`, hashes, ramas de colores.
- Tipografía: **Geist** (UI) y **Geist Mono** (código y metadatos), vía `@fontsource-variable/geist` y `@fontsource-variable/geist-mono`.
- Tokens:
  - Fondo `#07080B`, superficies `#0B0D12 / #0F1217 / #151922 / #1D222D`, líneas `rgba(255,255,255,.08 / .14)`.
  - Texto `#EDEFF3`, secundario `#A3AAB8`, terciario `#6C7484`.
  - Acento `#5B8CFF`, éxito/commits `#3DDC97`, aviso `#F5B451`.
  - Ramas: profesional `#5B8CFF`, proyectos `#3DDC97`, logros `#F5B451`, docencia `#FF6B9A`, formación `#B58CFF`.
  - Radios 28 / 18 / 12 px. Easing `cubic-bezier(.2,.7,.2,1)`.
- Logos de tecnologías: oficiales (simple-icons) en su color de marca, dentro de un cuadro redondeado.
- Movimiento con propósito; todo respeta `prefers-reduced-motion`.

## 3. Estructura de la página (una sola página + casos)

1. **Navbar** flotante en cápsula: logo `kendall.dev`, secciones, buscador `Ctrl K` (paleta de comandos), selector ES/EN, botón CV. Indicador deslizante bajo la sección activa. Menú hoja en móvil.
2. **Portada** (100svh): estado "Disponible…", titular "Desarrollo backend y full stack que llega a producción.", texto, 2 botones, 8 logos.
   Fondo: **mapa de contribuciones decorativo** (canvas) que cubre toda la portada; aparece en onda desde el centro, se atenúa detrás del texto, celdas cambian lento, **brillo bajo el cursor**. No usa el historial real.
3. **Franja de evidencias** (debajo del pliegue): Bachillerato 9,0 · Práctica concluida · Plataforma en producción · 1.er lugar Infocontexto 2026.
4. **Servicios** (bento 3 columnas): Backend y APIs (log de API animado 200→201→409), Aplicaciones web, Apps móviles, Infraestructura y equipo (checks de CI). Cada uno con logos y **referencias** (repos, PRs, historias).
5. **Sobre mí**: foto + **terminal interactiva** (`whoami`, `cat sobre-mi.txt`, `git shortlog -sn`, `ls proyectos/`, `cat stack.json`, `contacto`, `help`, `clear`).
6. **Experiencia** como `git log --graph`: filtros por rama, hash, fecha, KPIs con contador, desplegable de historias, adjuntos (fotos/certificados) con visor ampliado.
7. **Proyectos** (tarjeta con info + escena):
   - MatchGo: 3 celulares en abanico (video al centro).
   - Beto y Más: 2 ventanas de navegador superpuestas.
   - CIMA: ventana de código real + fila de capas.
   - Lab: pipeline de GitHub Actions animado + `kubectl get pods`.
8. **Criterio**: 6 principios, cada uno con el archivo real en un visor fijo que cambia con el scroll (GiST, ADR 0003, ADR 0010, errores tipados, capas de matchgo-mobile, manifiesto k8s).
9. **Contacto**: correo con botón copiar, LinkedIn, GitHub, WhatsApp, CV.
10. **Casos completos** (MatchGo, Beto y Más, CIMA): en el prototipo son paneles superpuestos con `#hash`; en Astro deben ser **rutas reales** (`/proyectos/matchgo`, …) con View Transitions.

Efectos globales: títulos que se escriben (`$ cd ~/…`), revelado al hacer scroll (fade + blur + stagger), parallax leve en escenas, riel de progreso tipo commits (pantallas ≥1460 px), spotlight de celdas bajo el cursor en todo el sitio (capa CSS con máscara radial), borde que sigue al cursor en tarjetas, barra de progreso superior.

## 4. Contenido y datos verificados

- **Flameware** (del informe): 16 historias/tareas, 34 subtareas, 53 pruebas en validación de DTOs; historias CRH-117 (catálogo con filtros y moneda), CRH-135 (panel del propietario), CRH-150 (corte quincenal con vista previa), PR #17 (panel administrativo). Stack: PHP, MySQL, JavaScript, Docker, Jira, Symfony Validator.
- **MatchGo**: matchgo-mobile 170 commits de Kendall (65 %), 19 PRs integrados. Backend .NET 10, YARP, 4 servicios con PostgreSQL propio (PostGIS en Booking), RabbitMQ + MassTransit outbox/inbox, Flutter + Riverpod, Next.js admin. Solo demo local con Docker Compose. La restricción GiST la escribió Cristofer: **no atribuírsela a Kendall**.
- **CIMA**: cima-mobile 52 commits, cima-backend 40 (DevTeam-DAKFC, repos públicos). **Faltan capturas de la app.**
- **Beto y Más**: Laravel, Vue 3, TS, Inertia, MySQL, Phaser, PHPUnit; equipo de 5, 3 semestres, en producción (betoymas.com), código privado del cliente.
- **Lab**: github.com/kendallchacon/docker-kubernetes-lab (+ presentation).
- Hashes de Beto, logros, docencia y formación en el prototipo son **decorativos**.
- Repos privados (matchgo-*): en el sitio mostrar fragmentos cortos con aviso "repositorio privado", sin enlaces.

## 5. Problemas del sitio actual a corregir

- `site` en `astro.config.mjs` dice `portfolio-kendallchacon.vercel.app` (falta el guion): debe ser `https://portfolio-kendall-chacon.vercel.app`.
- `package.json` se llama `density-disk` (plantilla) → `portfolio`.
- Proyectos de relleno, JSON-LD, imágenes sin optimizar, typos, ruta del CV en README, enlace de Beto `share.google/...`.
- Páginas separadas (`perfil`, `experiencia`, `certificaciones`…) → pasan a una sola página + rutas de casos (dejar redirecciones).

## 6. Flujo de trabajo con Git

- `master` = producción (Vercel). **Nunca** se trabaja directo ahí.
- `dev` = integración. Se crea una vez desde `master`.
- Por cada iteración: rama desde `dev` con prefijo convencional → PR hacia `dev` → revisar el preview de Vercel → merge (squash).
  - `feat/…` funcionalidad, `fix/…` corrección, `chore/…` configuración, `content/…` textos/datos, `perf/…`, `docs/…`.
- Cuando `dev` está estable: PR `dev → master` (release), etiqueta `v2.0.0`, etc.
- Commits convencionales en inglés o español, pequeños: `feat(hero): add contribution grid background`.
- Protección de ramas en GitHub para `master` (y luego `dev`): requerir PR y que pase el build.
- CI mínimo (GitHub Actions): `npm ci`, `astro check`, `astro build` en cada PR.

## 7. Plan de iteraciones (una rama y un PR cada una)

| # | Rama | Alcance |
|---|------|---------|
| 0 | `chore/setup-dev-workflow` | Crear `dev`, CI de build, `CLAUDE.md`, plantilla de PR, corregir `site` y nombre del paquete, `docs/prototype/` (sin videos pesados ni PDF). |
| 1 | `feat/foundation` | Fuentes Geist, tokens en `global.css` (`@theme` de Tailwind 4), BaseLayout oscuro, utilidades (`.wrap`, botones, logos). i18n de Astro (`es` por defecto, `/en/`) y diccionario de UI. |
| 2 | `feat/data-model` | `src/data/*.ts` nuevo y bilingüe: perfil, servicios, experiencia (tipo commit), proyectos, criterio, contacto, tecnologías→logo. Borrar datos de relleno. |
| 3 | `feat/shell` | Navbar en cápsula, indicador, menú móvil, paleta `Ctrl K`, selector de idioma, barra de progreso, footer. |
| 4 | `feat/hero-services` | Portada + canvas de contribuciones (island ligera en TS) + franja de evidencias; bento de servicios con log de API animado y referencias. |
| 5 | `feat/about-experience` | Foto + terminal interactiva; git log con filtros, KPIs, desplegables y visor de adjuntos. |
| 6 | `feat/projects-cases` | Tarjetas de proyecto y escenas (celulares, navegadores, código, CI); rutas `/proyectos/[slug]` con View Transitions y contenido de cada caso. |
| 7 | `feat/judgment-contact` | Sección Criterio con visor sincronizado; contacto con copiar correo; borrar páginas viejas (`perfil`, `experiencia`, `certificaciones`…) y dejar redirecciones. |
| 8 | `feat/motion-polish` | Revelados, títulos que se escriben, spotlight global, bordes con cursor, riel de progreso, reduced-motion. |
| 9 | `perf/seo-a11y` | Imágenes con `astro:assets` (AVIF/WebP), videos livianos con poster, metadatos, JSON-LD Person, sitemap, Lighthouse ≥ 95, foco visible, contraste. |
| Release | `release` | PR `dev → master`, revisión final en Vercel, etiqueta. |

Si el diff de un PR pasa de unas 600 líneas, se divide en dos (candidatos: 5 y 6). `master` no se toca hasta terminar la iteración 9.

Criterio de "terminado" en cada PR: `npm run build` sin errores, se ve igual al prototipo en 1440 px y 390 px, ES/EN, sin errores de consola, reduced-motion correcto.

## 8. Cómo trabajar con Claude Code (prompts)

Abrir Claude Code en la raíz del repo. Un prompt por iteración. Plantilla:

```
Lee CLAUDE.md y docs/HANDOFF_DESARROLLO.md.
Iteración N: <nombre>. Crea la rama <rama> desde dev.
Referencia visual: docs/prototype/index.html, sección <sección> (selector/clases: …).
Alcance: <lista concreta>. Fuera de alcance: <lista>.
Usa los datos de src/data, no texto quemado en componentes. Componentes pequeños en src/components/<área>/.
JS solo donde haya interacción (script de Astro o island mínima), respeta prefers-reduced-motion.
Al terminar: npm run build, resume los cambios y propón los mensajes de commit (con los archivos de cada uno) y la descripción del PR. No hagas commits, push ni merge: los hago yo.
```

Prompt de arranque (iteración 0):

```
Lee docs/HANDOFF_DESARROLLO.md. Vamos con la iteración 0.

Antes de proponer el plan, revisa solo en lectura: git status (debe estar limpio salvo docs/ y prototipo-v10/, que copié sin versionar), package.json, package-lock.json, .gitignore, cuánto pesa prototipo-v10/ y si hay .mp4 ya versionados, y la versión de Node en engines/.nvmrc. Confirma que existen docs/HANDOFF_DESARROLLO.md, docs/CLAUDE.template.md y prototipo-v10/; si falta alguno, detente y avísame.

Tareas:
1) Crea la rama dev desde master y luego chore/setup-dev-workflow desde dev.
2) Agrega CLAUDE.md en la raíz con el contenido de docs/CLAUDE.template.md.
3) Agrega .github/workflows/ci.yml (checkout, setup-node con caché npm, npm ci, npx astro check, npm run build) en pull_request hacia dev y master, y .github/pull_request_template.md en español con el checklist de "terminado" del handoff (build, 1440 px y 390 px, ES/EN, consola limpia, reduced-motion).
4) Corrige site en astro.config.mjs a https://portfolio-kendall-chacon.vercel.app y el name de package.json a "portfolio". Actualiza también el name en package-lock.json para que npm ci no quede inconsistente. Haz grep de "portfolio-kendallchacon" y solo repórtame otras apariciones, no las corrijas.
5) Mueve prototipo-v10/ a docs/prototype/ (git mv si está versionado, mv si no). Agrega docs/prototype/media/*.mp4 y docs/prototype/*.pdf a .gitignore (el CV real irá en public/ más adelante). Si algún .mp4 ya está versionado, avísame en vez de resolverlo.

Reglas: cambios mínimos, nada fuera de este alcance. Si npx astro check necesita @astrojs/check y typescript y no están instalados, no los agregues: dímelo y propón la opción. Si astro check falla por código existente, no lo arregles: reporta los errores.
Commits pequeños y convencionales, en este orden: docs (incluye docs/HANDOFF_DESARROLLO.md y docs/CLAUDE.template.md, y CLAUDE.md), ci, fix(config), docs(prototype). No hagas push, merge ni PR.

Muéstrame el plan antes de tocar archivos. Al terminar: corre npm ci, npx astro check y npm run build, y dame resumen, git log --oneline de la rama y la descripción propuesta para el PR.
```

## 9. Pendientes de Kendall

- Capturas de CIMA (historial, comparativo, reportes).
- Capturas de Flameware (diapositivas 5–7 del informe final), si se pueden mostrar.
- Confirmar si se puede nombrar públicamente a Flameware / Costa Rica Homes Realty (el informe dice que sí, con referencias públicas).
- Consentimiento para avatares de terceros en capturas de MatchGo 09/10.
