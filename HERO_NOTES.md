# Hero V2 — notas de decisiones

Rama: `feat/hero-v2`. Bloque: rediseño completo de la sección Hero.

## Estructura

Dos columnas en desktop (`lg:grid-cols-[1.05fr_0.95fr]`), una sola en mobile.

- **Izquierda — posicionamiento y CTA:** badge de disponibilidad, nombre,
  título específico (Backend & Full Stack · Laravel · Vue · TypeScript),
  descripción de 2 líneas centrada en lo que construye, dos CTA
  (`Ver proyectos` → `/proyectos`, `Descargar CV` → PDF local) y tres chips de
  métricas honestas.
- **Derecha — terminal interactiva:** ventana con header (tres puntos + nombre
  de archivo) que tipea `whoami` y un `perfil.json` resumido.

Todos los datos viven tipados en [`src/data/hero.ts`](src/data/hero.ts)
(`HeroContent`), no hardcodeados en el componente.

## Terminal: decisiones de tipeo

- El contenido completo se renderiza en el DOM. **Sin JavaScript el hero es
  legible** (texto visible, sin animación) y accesible a lectores de pantalla.
- Con JS, [`site-interactions.js`](src/scripts/site-interactions.js) vacía cada
  línea y la re-escribe carácter a carácter **una sola vez**. No hay loops de
  re-tipeo: al terminar, el cursor queda parpadeando estático en la última línea.
- **Presupuesto < 3 s:** `perCharMs` se calcula a partir del total de caracteres
  con objetivo de 2.8 s (`TARGET_MS`), acotado a 5–22 ms por carácter.
- **Anti-parpadeo:** un `<script is:inline>` en el `<head>` marca `html.js`.
  Solo entonces el CSS oculta `.term-txt` mientras el estado es `idle`. Si el JS
  está desactivado, `html.js` no existe y el texto nunca se oculta.
- **`prefers-reduced-motion: reduce`:** el script muestra el contenido completo
  de inmediato sin tipear; el cursor no parpadea (la animación va dentro de
  `@media (prefers-reduced-motion: no-preference)`).
- El cursor sigue a la línea activa durante el tipeo (clase `.is-active`) y
  termina en la última línea.

## Patrones de referencia

- **spotlight-card:** aplicado en la tarjeta de la terminal (`.spotlight-card`).
  Adaptado de React a Astro + CSS: el contenedor sigue el puntero
  (`--spot-x/--spot-y`) y muestra un resplandor cian radial sutil en hover, con
  una leve elevación. Solo se activa con `pointer: fine`. Aporta profundidad sin
  ser decorativo en exceso.
- **glowing-card:** su efecto original (bucle `@keyframes moveDot`, punto
  orbitando sin fin) sigue **descartado** por chocar con las restricciones (sin
  animaciones continuas ni gradientes pulsantes). En la 2.ª pasada se toma solo
  la *idea* de glow de borde como un **glow base permanente y de baja
  intensidad** (`.terminal-card box-shadow`), estático y sin hover, que no
  compite con el contenido.

## Accesibilidad y limpieza

- Foco visible explícito en los dos CTA (`focus-visible:ring` en `ButtonLink`).
- Política global `@media (prefers-reduced-motion: reduce)` en `global.css`
  (desactiva animaciones continuas, marquee, floats y scroll suave).
- Eliminado el código muerto de `#hero-word` (script) y sus estilos
  (`.hero-word`, animaciones de terminal v1) ahora sin uso.
- Tema oscuro con acento cian conservado, consistente con V1.

---

# Segunda pasada — impacto y jerarquía

Objetivo: corregir el problema visual de la 1.ª versión (la terminal perdió
protagonismo y el nombre dominaba sin aportar jerarquía).

## Columna izquierda — jerarquía corregida

Orden de mayor a menor peso visual:

1. **Titular profesional** (`h1`, dominante): qué hace, no quién es —
   "Backend & Full Stack — APIs, lógica de negocio y datos que equipos pueden
   mantener."
2. **Descripción** (2 líneas): qué construye, con stack concreto.
3. **CTA**: `Ver proyectos` (primario) · `Descargar CV` (secundario).
4. **Métricas** honestas (3 chips).
5. **Nombre + disponibilidad**: ahora subordinados, en una línea de texto
   pequeña (`text-sm`). El `AvailabilityBadge` se rediseñó como texto discreto
   (un punto cian + texto, **sin fondo ni borde**), corrigiendo el ruido visual
   del chip anterior.

La columna izquierda se centra verticalmente (`justify-center`) para equilibrar
con la altura de la terminal.

## Columna derecha — terminal dominante

- La grilla usa `items-stretch` y la terminal es `flex h-full min-h-120
  flex-col`, por lo que **ocupa toda la altura de la columna** y ancla el lado
  derecho (ya no se ve pequeña ni flotante). El cuerpo es `flex-1`.
- Glow base permanente de baja intensidad en el borde (ver glowing-card arriba).

### FASE 1 — typing de trabajo real

- Contenido que narra trabajo verificable: `whoami`, `git log --oneline -3`
  (commits reales de Beto y Más), `cat stack.json` y `./run-tests.sh` (Feature,
  Unit y Scene tests).
- **Implementado con `requestAnimationFrame`** en vez de `setTimeout` por
  carácter: el progreso se calcula contra una **duración fija (`DURATION_MS =
  3600`, < 4 s)**, así el total no depende del nº de caracteres. El cursor sigue
  a la línea activa y termina parpadeando estático en la última línea. No se
  repite.
- Líneas `blank` actúan como separadores entre bloques (no se tipean).

### FASE 2 — estado vivo

- **Status bar permanente** con indicador `● READY · branch: main · 150 commits
  · tests: passing` y **shimmer en CSS puro** (`@keyframes statusShimmer`, sin
  JS), gated en `prefers-reduced-motion: no-preference`.
- **Logs ocasionales** (3 distintos, sin repetición): aparecen con fade-in cada
  8–12 s tras el typing, **permanecen visibles y no hacen scroll**. Sin JS o con
  movimiento reducido se muestran estáticos desde el inicio.

## Datos y limpieza

- Todo el contenido nuevo (comandos, `statusBar`, `logs`) vive tipado en
  [`src/data/hero.ts`](src/data/hero.ts) (`TerminalStatusBar`, arrays de
  `TerminalLine` y `logs: string[]`).
- **Cleanup de timers explícito:** los `setTimeout` se registran en un `Set` y
  se cancelan (junto al `requestAnimationFrame`) en `pagehide` y
  `astro:before-swap`.
- **`prefers-reduced-motion: reduce`:** sin typing, sin logs rotativos (todos
  visibles), sin shimmer, sin parpadeo de cursor. Todo el contenido estático
  desde el inicio.
- El hero sigue renderizando completo sin JavaScript.

---

# Tercera pasada — limpieza, respiración y enfoque project-independent

Objetivo: dar respiración entre columnas, quitar ruido y desacoplar el hero de
cualquier proyecto concreto (Beto y Más).

## Columna izquierda — menos es más

- **Eliminado** el párrafo descriptivo de tecnologías/módulos: era demasiado
  específico y ataba el perfil a un solo proyecto.
- **Eliminada** la línea "Kendall Chacón · Disponible para prácticas · Costa
  Rica" (ruido). La identidad ahora vive en la terminal (`whoami →
  kendall-chacon`), lo que la hace redundante en la columna.
- El componente `AvailabilityBadge.astro` quedó huérfano y **se eliminó** para
  no dejar código muerto.
- Jerarquía resultante: **titular → CTA → métricas**. Más directa y orientada a
  conversión.
- **CTA actualizados** a conversión: primario `Ver proyectos` → `/proyectos`,
  secundario `Contactar` → `/contacto` (ya no descarga de CV).

## Separación entre columnas

- `gap-12 lg:gap-16`: en desktop la terminal deja de verse pegada al texto.

## Terminal — contenido independiente de proyecto

- **Eliminado** `git log --oneline -3` (commits de un proyecto concreto),
  `./run-tests.sh` con su output y los **logs rotativos `[info]`**.
- Nueva secuencia (≤ 3.2 s, `DURATION_MS = 3200`): `whoami`, `cat stack.json` y
  `cat enfoque.md` (describe *forma de trabajar*, no logros: arquitectura
  modular, APIs con validación/políticas/pruebas, datos relacionales).
- `fileName` cambiado de `kendall@dev — beto-y-mas` a `kendall@portfolio: ~`.
- **Status bar** con valores genéricos de perfil: `● READY · stack: full-stack ·
  enfoque: backend · disponible: true`. El shimmer CSS se mantiene como único
  indicador de "terminal viva" (los logs ya no son necesarios).

## Terminal en mobile — altura fija

- El contenedor padre fija la altura en mobile (`h-72`, 288px) y `sm:h-80`
  (320px); en desktop vuelve a `lg:h-auto` + `lg:min-h-120` para estirarse y
  anclar el lado derecho.
- El cuerpo usa `min-h-0 overflow-hidden`: el contenido que no cabe **se corta
  limpiamente, sin scroll interno**. Header y status bar siempre visibles.

## Limpieza de timers

- Al eliminarse los logs ya no hay `setTimeout`; el único recurso asíncrono es el
  `requestAnimationFrame` del tipeo. Se **mantiene** la limpieza en `pagehide` y
  `astro:before-swap`, ahora cancelando el `rafId` (se retiró el `Set` de timers
  por innecesario). Se eliminaron también las clases CSS `.term-log` sin uso.

---

# Cuarta pasada — contenido y mobile sin corte

Ajustes de contenido y comportamiento mobile. No se tocó estructura, layout de
dos columnas, efectos visuales ni lógica de tipeo.

## Columna izquierda

- **Eliminados los tres MetricChips** ("150+ commits", "Pruebas automatizadas",
  "Stack full stack verificable") del hero, de `hero.ts` (campo `metrics` e
  interfaz `HeroMetric`) y el componente `MetricChip.astro` (huérfano, **se
  eliminó**).
- **Etiqueta de especialidad** (kicker) sobre el `h1`:
  `Backend · APIs REST · Laravel · Bases de datos` — `text-xs`/`sm:text-sm`,
  `uppercase`, `tracking-[0.2em]`, **cian apagado** (`text-cyan-500`, no el cian
  brillante del acento). Discreta, no compite con el titular.
- **Párrafo descriptivo** entre `h1` y CTA: "Construyo sistemas con lógica de
  negocio clara, …" (`text-base`/`sm:text-lg`, `text-slate-300`, `max-w-xl`).
- La etiqueta y el párrafo viven tipados en `hero.ts` (`eyebrow`,
  `description`), siguiendo el principio de copy data-driven; no se hardcodean.

## Terminal — contenido

- `cat stack.json` actualizado: backend pasa a
  `["Laravel", "Spring Boot", ".NET", "MySQL"]` y se **elimina la sección
  `mobile`** (`.NET MAUI`/`Kotlin`). `frontend` y `tools` sin cambios.
- `cat enfoque.md`: se mantienen solo las **tres viñetas**. Nota: el estado
  previo ya no contenía ninguna línea de "componentes Vue" (no existía); se
  retiró además el encabezado `## Cómo trabajo` para dejar exactamente las tres
  líneas indicadas.

## Terminal en mobile — sin corte (revierte la 3.ª pasada)

- Se **elimina la altura fija** mobile (`h-72`/`sm:h-80`) del contenedor: ahora
  `relative flex` con **altura natural**, así la terminal muestra todo su
  contenido en cualquier pantalla.
- El cuerpo pierde `min-h-0 overflow-hidden` → ya **no recorta**. El
  `overflow-hidden` del root se conserva solo por motivo técnico (recorte a las
  esquinas redondeadas y contención del glow del spotlight), no del contenido.
- En desktop se mantiene `lg:min-h-120` + `items-stretch` para anclar el lado
  derecho a altura completa.
