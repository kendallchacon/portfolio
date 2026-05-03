# Portafolio de Kendall Chacón

Portafolio personal construido con Astro y Tailwind CSS para presentar perfil profesional, habilidades técnicas, proyectos destacados y medios de contacto.

El sitio está pensado como una base simple, clara y escalable para seguir agregando contenido sin duplicar estructura visual ni mezclar datos con marcado.

## Stack utilizado

- Astro 6
- Tailwind CSS 4
- TypeScript para datos estructurados del sitio
- astro-icon
- Iconify con colecciones Heroicons y Simple Icons
- MDX, disponible para futuras páginas de contenido

## Estructura del proyecto

```text
/
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── components/
│   │   ├── common/       # Componentes reutilizables de UI
│   │   ├── layout/       # Navegación y piezas de layout
│   │   └── sections/     # Secciones principales del portafolio
│   ├── data/             # Arrays y contenido estructurado
│   ├── layouts/          # Layout base del sitio
│   ├── pages/            # Rutas públicas de Astro
│   ├── scripts/          # Interacciones pequeñas del cliente
│   └── styles/           # Estilos globales y animaciones
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Instalación

```sh
npm install
```

## Ejecutar en desarrollo

```sh
npm run dev
```

Por defecto Astro levanta el servidor en `http://localhost:4321`.

## Build de producción

```sh
npm run build
```

El resultado se genera en `dist/`.

## Vista previa del build

```sh
npm run preview
```

## Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor local de desarrollo |
| `npm run build` | Genera el sitio para producción |
| `npm run preview` | Sirve localmente el build generado |
| `npm run astro` | Ejecuta comandos de la CLI de Astro |

## Decisiones técnicas principales

- Las páginas viven en `src/pages` para mantener rutas públicas claras: `/`, `/perfil`, `/habilidades`, `/proceso`, `/proyectos` y `/contacto`.
- Los componentes reutilizables se agrupan en `src/components/common` para evitar repetir botones, tags, cards y badges técnicos.
- El contenido repetible se centraliza en archivos `.ts` dentro de `src/data`, lo que facilita agregar tecnologías, contactos, experiencias o proyectos sin tocar demasiado HTML.
- Las secciones grandes se mantienen en `src/components/sections` para que la página principal pueda componerse de bloques legibles.
- Las animaciones globales y utilidades transversales viven en `src/styles/global.css`; la lógica pequeña del cliente se separó en `src/scripts/site-interactions.js`.
- El CV descargable se sirve desde `public/cv-kendall-chacon.pdf` para mantener una URL pública directa y simple.
- El layout base define metadatos SEO, URL canónica, Open Graph y Twitter Card para todas las páginas.
- La navegación incluye una versión móvil para mejorar la experiencia responsive en pantallas pequeñas.
- Se mantuvo el diseño visual principal y se priorizó una arquitectura simple, suficiente para un portafolio personal.

## Próximas mejoras

- Agregar proyectos reales adicionales con enlaces finales a demo y repositorio.
- Considerar contenido en MDX para escribir casos de estudio o notas técnicas.
