# Portafolio Kendall Chacón — handoff para el desarrollo

Prototipo aprobado: **v10** (21 nov 2026) — https://claude.ai/artifact/7JiMQ8FFLv7ZuTzeAigXfA
Copia local: carpeta `prototipo-v10/` (abrir `index.html` con un servidor local, p. ej. `npx serve prototipo-v10`).
Repositorio: https://github.com/kendallchacon/portfolio (Astro 7 + Tailwind 4, deploy en Vercel, rama por defecto `master`).

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
- Logos de tecnologías: oficiales, en su color de marca, dentro de un cuadro redondeado (ver §10 para fuentes y casos especiales).
- Movimiento con propósito; todo respeta `prefers-reduced-motion`.

## 3. Estructura de la página (una sola página + casos)

1. **Navbar** flotante en cápsula: logo `~/kendall`, secciones, buscador `Ctrl K` (paleta de comandos), selector ES/EN, botón CV. Indicador deslizante bajo la sección activa. Menú hoja en móvil.
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
- **MatchGo**: matchgo-mobile 170 commits de Kendall (65 %), 19 PRs integrados. Backend .NET 10, YARP, 4 servicios con PostgreSQL propio (PostGIS en Booking), RabbitMQ + MassTransit outbox/inbox, Flutter + Riverpod, Next.js admin. Solo demo local con Docker Compose. La restricción GiST la escribió un compañero: **no atribuírsela a Kendall**. Contribución a `matchgo-backend` confirmada: arranque de la arquitectura y funcionalidades de Identity, Competition y Community; no son de Kendall el esquema de Booking, la mensajería ni S3.
- **CIMA**: cima-mobile 52 commits, cima-backend 40 (DevTeam-DAKFC, repos públicos). Jira `CIMA` con 30 historias en 6 épicas. **Faltan capturas de la app.**
- **Beto y Más**: Laravel, Vue 3, TS, Inertia, MySQL, Phaser, PHPUnit; equipo de 5, 3 semestres, en producción (betoymas.com), código privado del cliente.
- **Lab**: github.com/kendallchacon/docker-kubernetes-lab (+ presentation).
- Todos los hashes del git log (Flameware, MatchGo, CIMA, Beto, logros, docencia y formación) son **decorativos**.
- Repos privados (matchgo-*): en el sitio mostrar fragmentos cortos con aviso "repositorio privado", sin enlaces.

## 5. Problemas del sitio actual a corregir

- ~~`site` en `astro.config.mjs`~~ y ~~nombre del paquete~~: corregidos en la iteración 0.
- Proyectos de relleno, JSON-LD, imágenes sin optimizar, typos, ruta del CV en README, enlace de Beto `share.google/...`.
- Páginas separadas (`perfil`, `experiencia`, `certificaciones`…) → pasan a una sola página + rutas de casos (dejar redirecciones).

## 6. Flujo de trabajo con Git

- `master` = producción (Vercel). **Nunca** se trabaja directo ahí.
- `dev` = integración. Se crea una vez desde `master`.
- Por cada iteración: rama desde `dev` con prefijo convencional → PR hacia `dev` → revisar el preview de Vercel → merge (squash).
  - `feat/…` funcionalidad, `fix/…` corrección, `chore/…` configuración, `content/…` textos/datos, `perf/…`, `docs/…`.
- Cuando `dev` está estable: PR `dev → master` (release), etiqueta `v2.0.0`, etc.
- Commits convencionales en inglés, pequeños: `feat(hero): add contribution grid background`, con cuerpo `Work done: …`.
- Protección de ramas en GitHub para `master` (y luego `dev`): requerir PR y que pase el build.
- CI mínimo (GitHub Actions): `npm ci`, `astro check`, `astro build` en cada PR.

## 7. Plan de iteraciones (una rama y un PR cada una)

| # | Rama | Alcance |
|---|------|---------|
| 0 | `chore/setup-dev-workflow` | Hecha (PR #2): `dev`, CI, `CLAUDE.md`, plantilla de PR, `site`, nombre del paquete, `docs/prototype/`. |
| 1 | `feat/foundation` | Hecha (PR #4): fuentes Geist, tokens, BaseLayout oscuro, utilidades, i18n de Astro y diccionario de UI. |
| 2A | `feat/data-model` | Hecha (PR #5): datos viejos a `src/data/legacy/`; `types`, `tech` (con iconos), `profile`, `services`, `contact`. |
| 2B | `feat/data-model-content` | Hecha (PR #6 y #7): `projects`, `experience`, `criterio` (y el tipo `Branch`). Solo lo confirmado; lo demás con `// VERIFICAR`. |
| 3A | `feat/shell` | Hecha (PR #8): navbar en cápsula con indicador, menú móvil (incluye CV), selector de idioma, barra de progreso, footer; páginas viejas con `layout="legacy"`. |
| 3B | `feat/shell-palette` | Hecha (PR #9): paleta `Ctrl K` / `Cmd K`. |
| 4A | `feat/hero` | Hecha: portada, canvas de contribuciones y franja de evidencias. |
| 4B | `feat/services` | Hecha: bento de servicios con log de API (cascada única), panel de CI y chips de referencia; capturas activadas por decisión del autor; reveal, tecleo y brillo como el prototipo. |
| 5A | `feat/experience` | Hecha: git log de experiencia con filtro por rama, KPIs con contador, historias desplegables y visor de adjuntos. |
| 5B | `feat/about` | Hecha: foto + terminal interactiva (Sobre mí) con salidas derivadas de los datos y lectura sin JS. |
| 6 | `feat/projects-cases` | Tarjetas de proyecto y escenas (celulares, navegadores, código, CI); rutas `/proyectos/[slug]` con View Transitions y contenido de cada caso. |
| 7 | `feat/judgment-contact` | Sección Criterio con visor sincronizado; contacto con copiar correo; borrar páginas viejas y `src/data/legacy/`, y dejar redirecciones. |
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
Muéstrame el plan antes de tocar archivos.
Al terminar: npm run build y npx astro check, resume los cambios y propón los mensajes de commit (en inglés, con cuerpo "Work done: …" y los archivos de cada uno) y la descripción del PR (en español, sin mencionar a Claude ni el plan de iteraciones). No hagas commits, push, merge ni PR: los hago yo.
```

(El prompt de arranque de la iteración 0 ya se usó y se retiró de este documento.)

## 9. Pendientes de Kendall

- **Bloqueante del release (PR `dev → master`):** los KPIs de CIMA en `experience.ts` y `projects.ts` (52 commits en cima-mobile, 40 en cima-backend) no son de Kendall: en GitHub coinciden con otros autores y a Kendall le aparecen 60 y 49 (sin confirmar por identidades de correo). Corregirlos con `git shortlog -sne` o dejarlos como `// VERIFICAR` (sin renderizar). Se rehace al reestructurar el proyecto CIMA.
- CV: el botón del navbar descarga un solo PDF por ahora; habrá versiones es/en cuando Kendall las entregue.
- Capturas de CIMA (historial, comparativo, reportes).
- Capturas de Flameware (diapositivas 5–7 del informe final), si se pueden mostrar.
- Consentimiento para avatares de terceros en capturas de MatchGo 01, 06, 09 y 10.
- Confirmar: Flameware (tres practicantes, remoto, seguridad de cuentas, CRM de agentes), fechas del tutor, "lideré la app móvil", UnaRoom (Room + FCM) en el Lab, y si los fragmentos de repos privados son literales o adaptados.

## 10. Notas técnicas acumuladas

**Datos y contenido**
- Todo dato dudoso lleva `// VERIFICAR` en `src/data/`. Un dato con `VERIFICAR` no se renderiza hasta resolverlo. Antes de cada iteración que renderice datos, `grep -rn VERIFICAR src/data` sobre los archivos que usa debe quedar vacío o con lo pendiente retirado de la vista.
- `src/data/legacy/` contiene los datos del sitio anterior y se elimina en la iteración 7 junto con las páginas viejas. No copiar nada de ahí (por ejemplo, el copy "busco práctica").
- Los repos privados no pueden tener `url` (lo impone el tipo `RepoRef`), y los fragmentos de código tienen un máximo de líneas por tipo (`SNIPPET_MAX_LINES`).

**Iconos de tecnologías** (`src/data/tech.ts`)
- Solo los `simple-icons:*` (monocromo) usan `brandColor`. Los de `devicon:*` y los SVG locales de `src/icons/` son multicolor y conservan sus colores.
- Sin logo vectorial oficial: MassTransit y Retrofit usan un icono genérico de heroicons. YARP, GHCR y Room usan el logo de su familia (.NET, GitHub, Android).
- **Phaser**: su política de marca (phaser.io/download/trademark) prohíbe modificar el logo, salvo escalarlo. No recolorear ni editar el SVG; si se pierde sobre fondo oscuro, mostrarlo sobre un chip claro.
- Los SVG de Phaser y PHPUnit traen `<style>` con clases genéricas (`.cls-N`, `.st0`–`.st3`) e ids repetidos (`clippath`, `radial-gradient`, `Layer_1`). Al renderizarlos hay que aislarlos (por ejemplo como imagen con `astro:assets`) sin editar el archivo.
- Baldosas casi negras contra el fondo (Next.js, Symfony Validator, GHCR) necesitan borde visible. Glifos blancos sobre baldosa clara (JavaScript, Android, Room, Vue) se resuelven en el componente, como en el prototipo (glifo `#0B0D12` en JavaScript y Android).
- PHPUnit es una insignia apaisada (2,5:1), no cuadrada.

**Entorno**
- Astro 7: `compressHTML: 'jsx'` no renderiza espacios entre elementos en línea; separarlos con `gap`/flex o `{' '}`.
- Node ≥ 22.23.4. El CI usa `node-version: 22`.

**Shell (iteración 3)**
- `BaseLayout` tiene la prop `layout` (`"legacy"` | `"full"`); se elimina en la iteración 7.
- La navbar usa el breakpoint `min-[980px]`. Por debajo, menú hoja con foco atrapado y el CV como último ítem.
- La paleta de comandos se monta una sola vez en `BaseLayout`.
- Pendientes: el selector de idioma pierde el `#hash`, y `hreflang` asume que toda página tiene su par `/en/`.

**Servicios (iteración 4B)**
- `SectionHead` (`common/`) es el encabezado de sección nuevo; `SectionHeader` es legacy y se borra en la iteración 7.
- Las capturas de servicios se leen de `src/assets/services/` (no de `docs/`): captura de web y dos teléfonos de mobile, activadas por decisión del autor.
- `experienceHref()` (`i18n/ui.ts`) devuelve `undefined` mientras no haya anclas `#xp-<id>`; al publicar la experiencia (iteración 5), agregar los ids a `publishedExperience` y los chips pasan a ser enlaces.
- El log (`matchgo · api · /api/v1`, rutas relativas a esa base) muestra dos flujos verificados en `matchgo-backend`, separados por comentarios visibles: Identity (`/api/v1/auth/login`, `/refresh`, `/logout`: 200, 200, 204) y Competition (`POST /api/v1/teams/{teamId}/invitations`, mostrado como `/teams/{id}/invitations`: 201 Created y 403 Forbidden cuando quien invita no es capitán, `TeamInvitationsController`). La cascada usa `html.js` y `api-log.ts`.
- Desviación pedida por el autor: bajo el panel de CI de ops hay una franja estática con lo que publica `docker-kubernetes-lab` (`publish-images.yml`): push a main → imágenes Docker → GHCR → manifiestos K8s, que solo referencian esas imágenes (no hay despliegue automático). La franja es una lista vertical con conectores decorativos; ninguna fila del log hace wrap a 390, 1000 ni 1440 px.
- Fidelidad al prototipo: columnas texto | panel `1fr 1.05fr`, h3 de Infraestructura en dos líneas, refs a 6 px de los logos en las tarjetas anchas y al fondo en web/mobile, CI en dos columnas.
- Etiquetas del CI acortadas para no hacer wrap a 1180 px ("build", "tests + PG", "compose cfg"); las notas del log van en `ink-2` (AA), no en `ink-3`.
- Íconos de tarjetas y referencias: set `lucide` (`@iconify-json/lucide`); solo se incluyen los usados. Las referencias de experiencia aceptan `icon: "pr" | "issue"`.
- Tokens `term`, `term-bar`, `term-line`, `term-ink` para ventanas de terminal y chips (`term-ink` sobre `term-bar`: contraste ≈ 5:1).
- Interacciones reutilizables: `src/scripts/reveal.ts` (`data-rv`, `data-rv-stagger`, tecleo con `data-type` + `.pt`) y `src/scripts/glow.ts` (un listener por `[data-glow]`, solo `(hover:hover)`). El reveal solo oculta con `html.rv` (inline en `<head>` si hay IntersectionObserver) y sin reduced-motion; sin JS todo es visible. La iteración 8 solo debe añadir los atributos al resto de secciones.
- Navbar: el indicador ya no lleva `-translate-y-1/2` (con el `transform` del script quedaba desplazado 17 px hacia arriba).

**Experiencia (iteración 5A)**
- `ExperienceLog` (`sections/`) con `experience/CommitEntry` y `experience/AttachmentViewer`; interacción en `src/scripts/experience.ts` (filtro, ancla, contador y visor; ≈2,5 KB minificado).
- `publishedExperience` (`i18n/ui.ts`) tiene los 12 ids: todos los chips de experiencia de Servicios son enlaces a `#xp-<id>`. Si se agrega una entrada, sumar su id ahí.
- Las imágenes de los adjuntos se leen de `src/assets/experience/` (no de `docs/`); miniaturas WebP de 168 a 640 px y versión completa WebP para el visor (y para el enlace sin JS).
- `cert-diplomado.jpg` tiene la línea "Identificación" borrada en los píxeles (también en `public/images/` y `docs/prototype/media/`). El historial de git conserva la versión anterior.
- Valores por defecto de los VERIFICAR que siguen abiertos: MatchGo usa la fecha "2026" y el título y el cuerpo sin la revisión del modelo de datos; la entrada del tutor va sin fecha (`both("")`, el componente omite la fecha vacía).
- Logo de la organización: campo opcional `logo` (PNG, JPG, WebP o SVG en `src/assets/experience/logos/`), solo en Flameware (`flameware.png`, copia del PNG del prototipo). Tile de 92×46 sobre `paper` (#fff), radio 10 y padding 6×8, igual en móvil; `<Image>` de 76×36 con densidades 1,5x/2x/3x y `alt=""`. Sin `logo` no hay tile.
- Sin enlace "Abrir el caso" hasta que existan las rutas `/proyectos/<slug>` (iteración 6); el campo `project` sigue en los datos.
- Los tokens `--color-branch-*` van en un `@theme static`: se usan desde `style` (`--bc`) y Tailwind descarta las variables que ninguna clase referencia. Token nuevo `ink-soft` (#C9CFDA) para descripciones e historias.
- Reveal lateral con `data-rv="x"` (misma utilidad reveal.ts, solo cambia el desplazamiento). Contador de KPIs con observer propio; el valor final ya está en el HTML (sin JS y con reduced-motion no cambia).
- Notas, fechas y contadores en `ink-2` (AA); el prototipo usaba `ink-3` (≈4:1).
- Filtro: la región `aria-live` arranca vacía y solo anuncia tras usar el filtro. Un enlace a una entrada oculta devuelve el filtro a `--all` antes del scroll. En móvil las entradas llevan `scroll-margin-top` extra por la barra de filtro sticky.

**Sobre mí (iteración 5B)**
- `About` (`sections/`) con `about/TermLine`; datos en `src/data/about.ts` (whoami, stack, `ls` y contacto se derivan de profile, experience, projects y contact). Script `src/scripts/about.ts` (≈2,2 KB minificado).
- Sin JS: el log trae whoami y `cat sobre-mi.txt`; el resto de comandos va en `<details>`. Con JS, el script clona esas salidas (nada de copy en el script).
- El log arranca con `aria-live="off"` y pasa a `polite` en la primera acción del usuario (la salida se agrega un frame después). El retecleo del intro corre una vez y se cancela al actuar o enfocar el input.
- `cat stack.json`: cada tecnología lista como evidencia los ids de experiencia que la usan; si no hay evidencia, el build falla.
- Shortlog: matchgo-mobile 170, Beto y Más 150 (auditoría forense), matchgo-backend 13 (rama dev, 1 de 4 contribuyentes). VERIFICAR: cima-mobile 52 / cima-backend 40 (en GitHub coinciden con otros autores; los commits de Kendall serían 60 y 49) y docker-kubernetes-lab 4.
- Foto en `src/assets/about/` (WebP 360/480/720, sin EXIF). `WindowBar` acepta `size="md"`; `SectionHead` acepta `tight`. Token `term-text`.

**Pulido pendiente (iteración 9)**
- Espacio de no separación en "full stack" de los titulares y `text-wrap: balance` en el `h1` (en inglés queda "production." sola a 1440 px).
- La píldora de disponibilidad hace wrap a 390 px.
- Forced reflow de ~34 ms (probablemente `offsetWidth` en la navbar).
- CLS de 0,022 en `/en/` por el cambio de fuente.
- Terminal de Sobre mí: aceptar `ls proyectos` además de `ls proyectos/` (normalizar la barra final al buscar el comando).