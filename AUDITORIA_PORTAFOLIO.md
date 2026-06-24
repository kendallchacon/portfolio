# Auditoría del portafolio profesional

**Fecha:** 24 de junio de 2026  
**Alcance:** código fuente, contenido, arquitectura, SEO y experiencia inferida de la implementación. La compilación de producción finalizó correctamente (`npm run build`, 6 rutas estáticas).

## Resumen Ejecutivo

El portafolio comunica orden, criterio frontend y una orientación clara hacia backend/full stack. Está por encima de la media de un proyecto académico por su arquitectura Astro, su sistema visual consistente y la presentación de **Beto y Más** como caso de estudio. Sin embargo, todavía no ofrece suficiente evidencia verificable ni amplitud de experiencia para competir con fuerza por una vacante junior: hay un único proyecto, no se muestran resultados medibles, el posicionamiento cambia entre tecnologías y faltan elementos básicos de accesibilidad/SEO técnico.

La prioridad no es añadir más efectos. Es convertir el sitio de una buena presentación a una prueba convincente de capacidad: tres casos de estudio, aportes concretos, repositorios o evidencia equivalente, y una narrativa profesional más específica.

**Nota final: 7.2 / 10.** Buena base visual y técnica; aún insuficiente como carta de presentación completa para una búsqueda activa de empleo junior.

## Hallazgos Técnicos

### Stack y arquitectura

- Astro 6 genera un sitio estático de seis rutas; Tailwind CSS 4 resuelve el diseño; `astro-icon`/Iconify proveen iconografía; MDX está instalado pero todavía no se aprovecha.
- La organización es sana: `components/common`, `components/layout`, `components/sections`, `data`, `layouts`, `pages`, `scripts` y `styles` separan responsabilidades con claridad.
- `BaseLayout` centraliza navegación, footer y metadatos; los datos repetibles viven en módulos TypeScript; `Projects` y `Contact` se reutilizan entre inicio y rutas dedicadas. Es una complejidad adecuada, sin sobreingeniería.
- La construcción de producción funciona sin errores. No se observan pruebas automatizadas, linting ni formateo automatizado en los scripts disponibles.

### Fortalezas

- Componentes pequeños y comprensibles (`ButtonLink`, `Card`, `IconCard`, `SectionHeader`, `TechBadge`, `Tag`).
- Una sola fuente de verdad para contacto, navegación, habilidades y proyecto destacado.
- HTML semántico razonable: `header`, `nav`, `main`, `section`, jerarquía de títulos e imágenes con `alt`.
- Enlaces externos usan `rel="noreferrer"`; los CTA de correo y CV son directos.
- El sitio estático es una elección rápida, segura y económica para este caso.

### Debilidades y riesgos técnicos

- El contenido se tipa de forma implícita. `featuredProject`, enlaces y tecnologías no comparten interfaces/validación de esquema; al crecer a varios proyectos será fácil introducir datos inconsistentes.
- `site-interactions.js` contiene lógica para `#hero-word`, pero no existe ese elemento en el hero actual: código muerto y un intervalo innecesario.
- El observador de revelado nunca deja de observar elementos ya visibles; el coste es pequeño, pero `unobserve()` haría la intención más limpia.
- El menú móvil no se cierra con `Escape`, no mantiene el foco dentro ni devuelve el foco al botón. El encabezado además desaparece al hacer scroll: puede resultar sorpresivo para teclado, zoom o navegación lenta.
- Las imágenes no declaran `width`/`height` ni `loading`/`decoding`; aumenta el riesgo de *layout shift* y de descargar imágenes fuera de pantalla.
- No hay política de movimiento reducido. Todas las animaciones, el marquee y el scroll suave siguen activos para personas con sensibilidad al movimiento.
- El proyecto no tiene scripts de `check`, `lint`, test ni CI visible. Para un portafolio, una pequeña verificación automatizada es también evidencia de disciplina de ingeniería.

## Hallazgos UX/UI

| Aspecto | Nota | Evaluación |
| --- | ---: | --- |
| Jerarquía visual | 8 | Hero, título y CTA se entienden rápido; el caso de estudio ocupa el lugar correcto. |
| Diseño y consistencia | 8 | Paleta oscuro/cian, bordes, radios e iconos forman un sistema reconocible. |
| Uso del espacio | 7 | Buena respiración; el caso de estudio es largo para una primera visita. |
| Tipografía | 7 | Escala legible y sobria; falta una mayor diferenciación editorial en contenido clave. |
| Color y contraste | 7 | Fondo y texto principal funcionan; textos `slate-400/500` y bordes sutiles merecen comprobación WCAG real. |
| Accesibilidad | 5 | Base semántica correcta, pero faltan skip link, foco visible explícito, reducción de movimiento y comportamiento de menú robusto. |
| Responsive | 7 | Grid, breakpoints y menú móvil están bien planteados; requiere prueba con dispositivos reales y tamaños de texto aumentados. |
| Mobile | 7 | CTA en columna y tarjetas se adaptan; el marquee continuo aporta poco en pantallas pequeñas. |
| Desktop | 8 | La composición del hero y las tarjetas se ven pensadas para escritorio. |
| Impacto/identidad | 7 | Tiene personalidad técnica madura, aunque el motivo “terminal” es bastante común entre portfolios. |

### Qué transmite

Transmite un perfil metódico, técnico y orientado a sistemas administrativos. No parece amateur: parece un portafolio académico-profesional bien terminado. La sensación aún es más de “buen candidato en formación” que de “junior listo para entregar valor” por la falta de resultados, pruebas y variedad de proyectos.

## Evaluación para Reclutadores

### Primeros 10 segundos

Se entiende que Kendall busca práctica profesional y se posiciona en backend/full stack, APIs REST, Laravel y bases de datos. Los CTA son claros. La terminal visual refuerza el perfil técnico, aunque también puede sugerir habilidades que no están inmediatamente demostradas.

### Fortalezas que comunica

- Especialidad reconocible: lógica de negocio, APIs, roles, validaciones y datos relacionales.
- Un caso de estudio con problema, solución, rol, módulos, decisiones y seguridad.
- Interés en prácticas y disponibilidad explícita.
- Comunicación, liderazgo y enseñanza como complemento humano al perfil técnico.

### Información que falta

- Ubicación/zona horaria, modalidad buscada y fecha esperada de graduación o estado académico concreto.
- Nivel de dominio y experiencia real por tecnología; aparecen Node, Spring Boot, TypeScript, Docker y SQL Server sin prueba asociada.
- Enlaces de evidencia por proyecto: demo, repositorio (si es posible), video corto, capturas anotadas o documentación de arquitectura.
- Resultados: usuarios, tiempos ahorrados, módulos entregados, pruebas, issues/PRs, participación de equipo y restricciones reales.
- Inglés, educación (institución/periodo), certificaciones y un resumen de CV visible sin descargar un PDF.

### Secciones a ajustar y añadir

- **Reducir o reformular “Proceso”**: describe bien el portafolio, pero ocupa una ruta de navegación principal que un reclutador usaría mejor para **Proyectos**. Puede pasar a una nota breve o a GitHub.
- **Añadir Proyectos al menú**: existe la ruta `/proyectos`, pero no está en `navigationItems`.
- **Añadir “Sobre mí” condensado en inicio**, experiencia/educación verificable, certificaciones y una franja de disponibilidad.
- **Añadir una página por proyecto**, con contexto, responsabilidades exactas, arquitectura, decisiones, resultados y evidencia.

### Efecto sobre candidaturas

| Puesto | Impacto actual | Motivo |
| --- | --- | --- |
| Internship | Ayuda | Mensaje de práctica, base técnica y comunicación son sólidos. |
| Junior Developer | Ayuda con reservas | Necesita más proyectos y evidencia pública para diferenciarse. |
| Full Stack Junior | Neutro-positivo | Beto y Más encaja, pero un solo caso limita la credibilidad full stack. |
| Backend Junior | Positivo | El discurso backend es consistente; faltan endpoints, pruebas, arquitectura y métricas demostrables. |

## Revisión del Contenido

### Hero

El mensaje es claro y con buena propuesta de valor. “Sistemas web mantenibles” es un buen cierre. Mejoraría al sustituir generalidades por una promesa anclada a evidencia, por ejemplo: *“Convierto reglas de negocio en APIs Laravel, flujos de roles y datos que equipos pueden mantener.”* El CTA “Ver caso de estudio” es el mejor; el segundo debe decir “Hablemos de una práctica” para ser más humano y menos transaccional.

Hay una incoherencia a corregir: el hero enumera `Laravel | Node | Spring`, mientras el contexto objetivo incluye Vue, Inertia, Flutter, .NET y Kotlin. Muestra solo tecnología que pueda respaldarse con proyecto/enlace, o agrúpala por nivel/uso real.

### Perfil

La narrativa es profesional, concreta y evita adjetivos vacíos. Aun así, repite varias veces APIs, roles, validaciones y bases de datos. Conviene incorporar una breve historia: formación actual, tipo de problemas que disfruta resolver y colaboración concreta (Issues, PRs, QA). Cambiar “Actividades participadas” por “Experiencia de liderazgo y comunicación” mejora el peso profesional de las actividades.

### Habilidades

La presentación visual es limpia, pero una lista de logos no equivale a competencia. Agrupar por “Backend”, “Frontend”, “Mobile”, “Datos” y “Herramientas”, e indicar “aplicado en” con enlaces a proyectos. Evitar porcentajes de nivel sin metodología: las barras 90/72/82 se perciben arbitrarias.

### Proyecto: Beto y Más

Es el punto más fuerte. La descripción del problema, el rol y las decisiones técnicas generan una buena base de credibilidad. Para destacar de verdad necesita:

- Identificar contexto, equipo, duración y contribución individual sin divulgar información sensible.
- Sustituir “preparada para crecer” por resultados comprobables o límites declarados.
- Incorporar diagrama simple de flujo/entidades y 3–5 capturas con pies que expliquen qué decisión demuestran.
- Mostrar endpoints, estrategia de validación, permisos, casos borde y pruebas/QA realizados.
- Enlazar a demo, repositorio, video o, si es privado, un PDF técnico/capturas anonimizado. La frase de que el código no es público es honesta, pero sin evidencia alternativa debilita el caso.

## SEO y Rendimiento

### Estado actual

Hay `title`, descripción, canonical, Open Graph, Twitter Card y `lang="es"` compartidos desde el layout: muy buen punto de partida. Las rutas tienen títulos y descripciones propios. No se aprecia sitemap, `robots.txt`, datos estructurados Schema.org, favicon multiformato, manifest ni optimización explícita de imágenes.

### Mejoras priorizadas

1. **Alta:** confirmar que `project-preview.jpg` existe y es una imagen social 1200×630; definir OG específico y real para cada ruta importante.
2. **Alta:** añadir `@astrojs/sitemap`, `robots.txt` y JSON-LD `Person`/`WebSite`/`CreativeWork` para casos de estudio.
3. **Alta:** fijar dimensiones y carga diferida en fotos/capturas; servir formatos modernos optimizados y comprobar LCP/CLS con Lighthouse real.
4. **Alta:** añadir `@media (prefers-reduced-motion: reduce)` para desactivar scroll suave, marquee, revelados y animaciones de terminal.
5. **Media:** incluir skip link, estados `:focus-visible` de alto contraste y prueba automática con axe/Lighthouse CI.
6. **Media:** evitar dependencias/código cliente innecesario y eliminar la lógica `hero-word` muerta.
7. **Baja:** añadir `manifest.webmanifest` y favicon/íconos por plataforma.

## Animaciones y Experiencia Visual

Sí existen: entrada de página y secciones, fondos flotantes, terminal progresiva, barras de carga, marquee de tecnologías, hover de tarjetas/botones y ocultamiento del header. La mayoría aporta ritmo y se siente actual; la combinación completa roza el exceso porque varias son decorativas y no informan estado.

La evolución recomendada es deliberadamente discreta:

- Mantener microinteracciones de CTA y tarjetas; reducen fricción y dan respuesta.
- Conservar un solo efecto de entrada rápido en el hero y revelar contenido solo una vez al hacer scroll.
- Reemplazar el marquee por una matriz estática navegable en móvil y por filtros o enlaces “ver proyecto” si se desea interacción útil.
- No introducir GSAP ni Framer Motion en un sitio Astro estático solo para animar; CSS + `IntersectionObserver` ya cubre esta necesidad. Usarlos únicamente si un futuro caso de estudio requiere una visualización realmente interactiva.
- Añadir soporte `prefers-reduced-motion`; es requisito de madurez, no un detalle cosmético.

## Problemas Críticos

1. **Evidencia profesional insuficiente:** un único proyecto y sin enlaces de prueba equivalentes reducen la confianza para puestos junior.
2. **Posicionamiento demasiado amplio:** el sitio promete varias tecnologías, pero no establece qué domina ni dónde las aplicó.
3. **Accesibilidad de movimiento e interacción móvil incompleta:** falta reducción de movimiento, skip link y controles completos de menú.
4. **SEO técnico incompleto:** faltan sitemap, robots, Schema y validación de recursos OG/imágenes.

## Quick Wins

- Añadir “Proyectos” a la navegación y convertir la ruta existente en un índice de proyectos.
- Publicar el segundo y tercer proyecto con una tarjeta honesta aunque estén en progreso.
- Reemplazar barras de porcentajes por evidencia “usado en: proyecto X”.
- Añadir ubicación, estado académico, disponibilidad e idioma al perfil/contacto.
- Eliminar `hero-word` del script o incorporar el elemento correspondiente.
- Implementar `prefers-reduced-motion`, skip link, `focus-visible` y cierre del menú con `Escape`.
- Añadir dimensiones, `loading="lazy"` (excepto imagen LCP) y `decoding="async"` a imágenes.

## Roadmap de Mejoras

### Prioridad alta — antes de buscar empleo

1. Definir un posicionamiento único: “Backend/Full Stack junior con Laravel y Vue; experiencia complementaria móvil”, sustentado en proyectos reales.
2. Crear índice y páginas de caso de estudio para **Beto y Más**, el proyecto móvil .NET/Kotlin y el nuevo proyecto personal de alto impacto.
3. Para cada caso: problema, usuario/negocio, rol, equipo, stack, arquitectura, decisiones, QA/pruebas, resultado y demo/repo/evidencia alternativa.
4. Completar datos profesionales y certificados; actualizar CV y enlace de GitHub/LinkedIn.
5. Resolver accesibilidad y SEO de alta prioridad; realizar Lighthouse y prueba manual móvil antes de publicar.

### Prioridad media

1. Tipar el modelo de proyecto/contacto/habilidad y crear datos por proyecto en vez de un `featuredProject` único.
2. Añadir `astro check`, lint/formato y una acción CI que construya el sitio.
3. Crear contenido MDX para artículos breves: decisiones de API, QA visual o aprendizajes del proyecto móvil.
4. Añadir capturas optimizadas, diagrama de arquitectura y video de 60–90 segundos por proyecto.

### Prioridad baja

1. Modo claro solo si se diseña y prueba como sistema completo, no como un toggle decorativo.
2. Página de notas técnicas/blog.
3. Métricas de visitas respetuosas de privacidad.
4. Animaciones avanzadas solo si narran una arquitectura o flujo concreto.

## Diseño Recomendado

### Estructura y orden

1. **Hero:** nombre, posicionamiento específico, disponibilidad, CTA a proyectos y CV.
2. **Prueba rápida:** tres estadísticas honestas o chips de evidencia (proyectos, colaboración/PRs, QA), nunca porcentajes arbitrarios.
3. **Proyectos destacados:** Beto y Más, móvil .NET/Kotlin, proyecto personal de alto impacto. Cada tarjeta debe llevar problema, aporte y resultado; no solo logos.
4. **Cómo trabajo:** backend, frontend, mobile, datos, colaboración y QA; vinculado a evidencia.
5. **Sobre mí / trayectoria:** formación, experiencia, comunicación y objetivo profesional, en pocas líneas.
6. **Certificaciones:** emisor, fecha, credencial/enlace y competencia demostrada.
7. **Contacto:** disponibilidad, ubicación/modalidad, LinkedIn, GitHub, correo y CTA.

### Estrategia visual

Mantener el tema oscuro con cian: ya constituye una identidad consistente. Dar más protagonismo a pantallas reales y diagramas que a las tarjetas decorativas de terminal. Usar una retícula más editorial para proyectos (captura grande, contexto corto, tres datos clave) y reservar el monoespaciado para fragmentos técnicos verificables. En móvil, priorizar lectura y CTA; cualquier movimiento debe ser opcional.

## Benchmark Profesional

Frente a un portafolio junior exitoso, esta versión ya cumple con claridad, navegación, contacto y una buena primera historia técnica. Para competir necesita lo que diferencia a los perfiles contratables: variedad de proyectos terminados, aportes individuales comprobables, resultados, repositorios/demos, y una lectura de 30 segundos que conecte las habilidades con impacto. Frente a portfolios full-stack modernos, la principal brecha no es estética ni framework: es profundidad de evidencia y estrategia de contenido.

## Calificación Final

**7.2 / 10.** El proyecto está bien diseñado, compila correctamente y refleja criterio de arquitectura frontend. Es una base muy aprovechable para conseguir prácticas. La nota no sube aún porque el portafolio afirma más de lo que demuestra en público, depende de un solo caso de estudio y tiene pendientes de accesibilidad/SEO que un portfolio profesional debe cubrir. Con tres proyectos bien documentados, evidencia de colaboración/QA y los quick wins de acceso/SEO, puede situarse con realismo en el rango **8.5–9/10** para una candidatura junior.
