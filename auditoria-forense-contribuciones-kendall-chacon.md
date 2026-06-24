# Auditoría forense de contribuciones — Kendall Chacón / `ackerman26lk`

Fecha de corte: 12 de junio de 2026 (último commit disponible en las refs locales).  
Fuente: historial Git local de todas las refs (`git log --all`) y árbol de trabajo local. No se consultaron datos autenticados de GitHub.

## Resumen ejecutivo

La evidencia local atribuye **150 commits**, **46 079 líneas añadidas**, **10 618 eliminadas** y **336 archivos únicos modificados** a la identidad unificada de Kendall Chacón / `ackerman26lk`. La contribución evoluciona desde flujos transaccionales de recompensas y paneles administrativos hasta una base completa de juegos, con especial profundidad en Bubble Shooter, y culmina con rediseños de perfil, home y catálogo.

La contribución combina PHP/Laravel modular, Vue/TypeScript, migraciones y pruebas automatizadas. El trabajo más demostrable para un portafolio es la implementación end-to-end de Bubble Shooter y su plataforma de configuración, sesiones y métricas.

## Alcance y atribución de identidad

| Identidad observada | Commits | Correo | Evidencia |
|---|---:|---|---|
| `ackerman26lk` | 111 | `kendallchacon4@gmail.com` | `git shortlog -sne --all`; `git config user.name/user.email` |
| Kendall Chacón | 39 | `kendallchacon4@gmail.com` | `git shortlog -sne --all` |
| **Identidad consolidada** | **150** | **mismo correo** | Coincidencia exacta de correo y configuración local `user.name=ackerman26lk` |

La consolidación está confirmada por el correo idéntico. Los datos de commit no permiten verificar cuentas de GitHub distintas ni autoría de comentarios/revisiones.

## Métricas generales

| Métrica | Resultado | Método / límite de evidencia |
|---|---:|---|
| Commits | 150 | Commits de autor con `kendallchacon4@gmail.com` en todas las refs locales |
| Líneas agregadas | 46 079 | Suma de `git log --numstat`; binarios cuentan como 0 |
| Líneas eliminadas | 10 618 | Suma de `git log --numstat`; binarios cuentan como 0 |
| Cambios netos | +35 461 | Añadidas − eliminadas |
| Toques de archivo | 772 | Entradas de archivos en los numstat de esos commits |
| Archivos únicos modificados | 336 | Rutas únicas de esos numstat |
| PRs con número referenciado | 33 | Números distintos `#...` en asuntos de commits atribuidos; no demuestra por sí solo que la persona creó cada PR |
| Merge commits que dicen `Merge pull request` | 9 | Evidencia local directa de integración de PR: #152, #162, #167, #169, #173, #176, #191, #193 y #195 |
| PRs creados | No verificable | Requiere metadatos de GitHub (autor del PR) |
| PRs revisados | No verificable | Requiere revisiones de GitHub |
| Issues creadas/cerradas | No verificable | El historial local no conserva autor/estado de issues |
| Comentarios | No verificable | El historial Git no conserva comentarios de GitHub |

### Actividad por mes

| Mes | Commits |
|---|---:|
| 2026-02 | 1 |
| 2026-03 | 8 |
| 2026-04 | 17 |
| 2026-05 | 124 |

### Módulos/rutas más trabajados

| Área | Toques | Añadidas | Eliminadas |
|---|---:|---:|---:|
| `resources/` | 454 | 32 774 | 9 901 |
| `app/` | 188 | 5 241 | 448 |
| `tests/` | 88 | 6 433 | 130 |
| `database/` | 20 | 820 | 22 |

Archivos con más toques: `bubbleShooter/scene.ts` (29), `BubbleShooterGameModule.vue` (21), `bubbleShooter/scene.test.ts` (21), `Client/Home/HomeHero.vue` (19) y `Client/Home/QuickAccess.vue` (16).

## Contribuciones por categoría

| Categoría | Contribuciones comprobadas | Evidencia representativa |
|---|---|---|
| Backend | Acciones, consultas, controladores, validaciones y rutas para recompensas, ubicaciones, usuarios y juegos. | `09d5cbe1`, `e312a18e`, `0a6b4a22`, `14196c00`, `7f037b67` |
| Frontend web | Vistas Vue, composables, layouts y componentes de home, perfil, recompensas, administración y juegos. | `23746e37`, `215dab5c`, `33c2bda0`, `c77de668` |
| Juegos / frontend interactivo | Módulo Bubble Shooter, escena Phaser, puente Vue–Phaser, UX móvil, reconciliación visual y cleanup. | `9b946671`, `19f23a16`, `48679644`, `0368f22b`, `11b1b3a1` |
| Base de datos | Migraciones de canje, direcciones, distritos, barrios, configuración y optimización para dashboard. | `09d5cbe1`, `667853ea`, `14196c00`, `7f037b67` |
| QA | Pruebas Feature/Unit y pruebas de escena; correcciones explícitas de bloqueantes QA. | `e312a18e`, `48bce6cf`, `19f23a16`, `90bb8ce7` |
| Gestión/documentación | Contratos y documentos de arquitectura para configuración de juegos. | `14196c00`: `docs/mb-676-game-config-contract.md`, `docs/mb-676-games-architecture.md` |

## Funcionalidades implementadas

El nivel indica la fuerza de la evidencia de implementación en commits propios, no exclusividad dentro del equipo.

| Funcionalidad | Descripción comprobada | Nivel | Evidencia y archivos involucrados |
|---|---|---|---|
| Detalle y canje de recompensas | Consulta del detalle, canje, tabla `user_rewards`, endpoints y experiencia cliente de confirmación/éxito. | Principal | `09d5cbe1` / PR #7; `RedeemReward.php`, `RedeemRewardApiController.php`, `Show.vue`, migraciones `user_rewards` |
| Dashboard administrativo y movimientos | Métricas, tabla de movimientos, detalle, filtros y exportación CSV. | Principal | `23746e37` / #24, `4c089068` / #38, `e312a18e` / #56; `GetAdminDashboardDataQuery.php`, `PointMovementsApiController.php`, `AdminExportPointMovementsCsvTest.php` |
| Ubicaciones INEC y dirección de usuario | Esquema distrito/barrio, seeder CSV, relaciones y alta/actualización de direcciones. | Principal | `667853ea` / #84, `0a6b4a22` / #88, `cdbf07a6` / #107; seeders, `UpsertUserAddressAction.php`, `UserAddressApiTest.php` |
| Verificación de correo y registro con teléfono | Controladores, solicitudes, páginas y pruebas para verificación por correo y registro OTP. | Principal | `48bce6cf` / #99, `c8ca0159` / #115; `VerifyEmailController.php`, `Register.vue`, `EmailVerificationTest.php` |
| Configuración y plataforma base de juegos | Configuración por juego, políticas, catálogo/partida cliente, sesión, shell y modo práctica. | Principal | `14196c00` / #104, `215dab5c` / #110; `GameConfig.php`, `UpdateGameConfigAction.php`, `useGameSession.ts`, `GameShell.vue` |
| Analítica administrativa de juegos | Consultas de actividad, métricas, razones de cero puntos, índice y seeder de demostración. | Principal | `7f037b67` / #123; `GetGamesDashboardMetricsQuery.php`, `Dashboard.vue`, `GamesDashboardApiTest.php` |
| Bubble Shooter end-to-end | Registro, escena, física/input, puntuación/validación, resumen, UX móvil, lifecycle y reconciliación visual. | Principal | #134 (`9b946671`), `19f23a16`, PRs #152/#162/#167/#169/#173; `scene.ts`, `BubbleShooterGameModule.vue`, `GameSettlementService.php`, `BubbleShooterGameResultValidator.php`, `scene.test.ts` |
| Gestión de perfil de cliente | Datos personales, teléfono, dirección, barrio por distrito y foto. | Principal | `f13f6664`, `bd43317f`, `54d1a41c`, `f3d88202`, `c787c590`, PR #176 (`da68d675`) |
| Rediseño del home del cliente | Contrato aditivo y componentes de hero, accesos rápidos, promociones, eventos y actividad reciente. | Principal | `0638ef5b`, `e3a5f303`, PR #191 (`33c2bda0`); `HomeHero.vue`, `QuickAccess.vue`, `ActivePromotion.vue` |
| Layout, catálogo de juegos y página Conócenos | Banner de verificación en layout, ajustes del catálogo, responsive y refinamiento de Conócenos. | Significativa | PR #193 (`9c48d1d2`), PR #195 (`c77de668`), `87b4933d`, `6e211651` |

## Timeline de participación

| Mes | Funcionalidades / evidencia | Lectura de evolución |
|---|---|---|
| Febrero | Canje y detalle de recompensas (#7). | Implementación vertical inicial: modelo, migración, API y UI. |
| Marzo | Dashboard admin, historial/detalle/filtros y exportación de movimientos (#24, #38, #46, #54, #56, #59). | Pasa a flujos administrativos y trazabilidad de datos. |
| Abril | Perfil admin, ubicaciones INEC, dirección, verificación de email, reglas, base y métricas de juegos (#77–#134). | Amplía responsabilidad a módulos transversales y plataforma de juegos. |
| Mayo | Bubble Shooter, scoring, UX móvil, lifecycle, perfil, home y catálogo (#142–#195). | Profundiza en interacción compleja, calidad y entrega de experiencia cliente. |

## Tecnologías utilizadas

No se dedujeron del manifiesto de dependencias: se identifican en archivos modificados.

### Dominantes

- **Vue Single-File Components y TypeScript:** 454 toques bajo `resources/`; archivos como `BubbleShooterGameModule.vue`, `HomeHero.vue`, `useGameSession.ts` y `scene.ts`.
- **PHP con arquitectura modular tipo Laravel:** 188 toques bajo `app/`; Actions, Queries, Controllers, Requests, Models y rutas en `app/Modules/*`.
- **Pruebas automatizadas PHP/TypeScript:** 88 toques bajo `tests/`, incluidos `ClientGameSessionsApiTest.php`, `GamesDashboardApiTest.php`, `BubbleShooterGameResultValidatorTest.php` y `scene.test.ts`.

### Secundarias

- **Phaser:** importado y tipado explícitamente en `resources/js/Components/Games/modules/bubbleShooter/scene.ts` y `BoardVisualReconciler.ts`; uso de escenas, Arcade Physics, WebGL y eventos de ciclo de vida.
- **Base de datos relacional y seeders:** 20 toques en `database/`, con migraciones para recompensas, ubicaciones, configuración y sesiones.
- **CSV:** exportación de movimientos y carga de ubicaciones INEC (`e312a18e`, `667853ea`).

### Herramientas de colaboración demostrables

Git, ramas/merge commits y Pull Requests están demostrados por el historial; hay 33 referencias locales a números de PR y 9 merge commits explícitos. GitHub Issues, revisiones y comentarios no pueden cuantificarse sin API/exportación de GitHub. Prettier y Pint aparecen en commits `061207e0`, `c78f9e9d` y `16e21a4a`.

## Impacto en el proyecto

1. **Bubble Shooter y robustez de su ciclo de vida.** La mayor concentración de cambios está en `scene.ts` (29 toques) y en el módulo Vue/las pruebas (21 cada uno); cubre gameplay, puntuación, móvil, limpieza y reconciliación visual.
2. **Plataforma configurable de juegos y analítica.** Reglas por juego, políticas de cliente, sesiones y dashboard administrativo conectan backend, base de datos, API, frontend y tests.
3. **Home y perfil del cliente.** Impacto directo sobre la experiencia de usuario, con componentes reutilizables, datos personales, dirección y foto.
4. **Ubicaciones y dirección.** Convierte información geográfica en datos estructurados, seeders y validaciones reutilizables por registro, perfil y canje.
5. **Recompensas y trazabilidad administrativa.** Flujo de canje más historial, filtros y exportación CSV; es sólido para demostrar trabajo full-stack orientado a operaciones.

Para un reclutador, los casos más fuertes son Bubble Shooter (interacción y lifecycle), la plataforma de juegos (diseño modular y políticas) y recompensas/movimientos (flujo transaccional completo con pruebas).

## Material para portafolio

### Resumen corto (50 palabras)

Desarrollé funcionalidades full-stack para Beto y Más: canje de recompensas, gestión de ubicaciones y perfiles, dashboards administrativos y una plataforma de juegos configurable. Lideré la implementación y estabilización de Bubble Shooter con Vue, TypeScript, Phaser, PHP, migraciones y pruebas automatizadas, además de rediseñar experiencias clave del cliente.

### Resumen profesional (150 palabras)

Contribuí de forma full-stack a Beto y Más, una plataforma web con experiencia de cliente, administración, recompensas y juegos. Implementé el flujo de detalle y canje de recompensas, paneles y exportación CSV para movimientos, y la gestión de ubicaciones y direcciones basada en datos INEC. También construí flujos de verificación de correo, configuración por juego, políticas de acceso, sesiones y métricas administrativas.

Mi contribución principal fue Bubble Shooter: registré el juego, desarrollé la escena interactiva con Phaser, conecté el módulo con Vue y TypeScript, implementé validación y liquidación de puntuaciones en backend, y mejoré la compatibilidad móvil, el cleanup del ciclo de vida y la reconciliación visual. Acompañé estas entregas con pruebas Feature, Unit y de escena. Finalmente, participé en el rediseño del home, perfil, layout y catálogo de juegos del cliente.

### Caso de estudio — Bubble Shooter y plataforma de juegos

**Contexto.** Beto y Más incorporaba juegos como parte de su experiencia de cliente y necesitaba un nuevo juego integrado con reglas y resultados consistentes.

**Problema.** La funcionalidad requería combinar una escena interactiva, soporte táctil, configuración administrativa, políticas/sesiones y un resultado validable en backend; además, la estabilidad al desmontar o navegar era importante.

**Solución.** Implementé y registré Bubble Shooter; conecté Vue con Phaser mediante un bridge, desarrollé la escena y el tablero, añadí validación y liquidación de puntuación, y posteriormente reforcé el lifecycle y la reconciliación visual.

**Tecnologías.** Vue SFC, TypeScript, Phaser, PHP/Laravel modular, migraciones y pruebas Feature/Unit/escena.

**Responsabilidades demostrables.** Juego cliente, escenas, input móvil, políticas, validadores, servicio de settlement, configuración, pruebas y correcciones de QA.

**Resultados verificables.** PRs #134, #152, #162, #167, #169 y #173 aparecen referenciados localmente; los archivos centrales son `scene.ts`, `BubbleShooterGameModule.vue`, `GameSettlementService.php` y sus pruebas. No hay métricas de usuarios o negocio en el repositorio local, por lo que no se reclaman resultados cuantitativos externos.

## Material para LinkedIn

### Descripción breve

Desarrollo full-stack en Beto y Más: juegos interactivos, recompensas, perfiles, ubicaciones y dashboards administrativos con Vue, TypeScript, Phaser y PHP/Laravel.

### Descripción profesional

Implementé funcionalidades end-to-end para Beto y Más, desde migraciones, acciones, consultas y APIs hasta interfaces Vue y pruebas automatizadas. Mi trabajo incluyó canje de recompensas, movimientos administrativos con filtros y exportación CSV, ubicaciones/direcciones, verificación de correo, perfiles y dashboards. Lideré la construcción y estabilización de Bubble Shooter: escena Phaser, integración Vue–TypeScript, validación de resultados, scoring y mejoras de UX móvil y lifecycle.

### Lista de logros

- Implementé Bubble Shooter de extremo a extremo e iteré su estabilidad, input móvil, scoring y reconciliación visual.
- Construí configuración, políticas, sesiones y dashboard analítico para el catálogo de juegos.
- Entregué flujos de recompensas, ubicación/direcciones, verificación de email y perfil de cliente.
- Implementé filtros, detalle y exportación CSV de movimientos administrativos.
- Añadí y actualicé pruebas Feature, Unit y de escena en entregas clave.

## Material para CV

| Versión | Español | English |
|---|---|---|
| 1 línea | Desarrollé funcionalidades full-stack para Beto y Más, destacando Bubble Shooter, plataforma de juegos, recompensas y dashboards con Vue, TypeScript, Phaser y PHP/Laravel. | Built full-stack features for Beto y Más, including Bubble Shooter, a game platform, rewards, and dashboards using Vue, TypeScript, Phaser, and PHP/Laravel. |
| 3 líneas | Implementé flujos end-to-end de recompensas, ubicaciones, perfiles y administración. Construí Bubble Shooter con Phaser y Vue, incluyendo scoring, validación backend, soporte móvil y lifecycle. Añadí pruebas y métricas administrativas de juegos. | Implemented end-to-end rewards, location, profile, and admin workflows. Built Bubble Shooter with Phaser and Vue, including scoring, backend validation, mobile support, and lifecycle handling. Added tests and game administration metrics. |
| 5 líneas | Contribuí con 150 commits atribuidos a Beto y Más. Implementé APIs, migraciones, componentes Vue y pruebas para canjes, movimientos administrativos, ubicaciones y perfiles. Construí configuración, políticas, sesiones y analítica para juegos. Lideré el desarrollo y estabilización de Bubble Shooter con Phaser/TypeScript. Participé en el rediseño del home y catálogo de juegos del cliente. | Contributed 150 attributed commits to Beto y Más. Implemented APIs, migrations, Vue components, and tests for rewards, administrative movements, locations, and profiles. Built game configuration, policies, sessions, and analytics. Led Bubble Shooter development and stabilization with Phaser/TypeScript. Contributed to client home and game-catalog redesigns. |

## Preguntas de entrevista

| Pregunta técnica | Respuesta sugerida basada en evidencia |
|---|---|
| ¿Cómo integraste un juego Phaser en una app Vue? | “Usé un módulo Vue y un bridge (`useBubbleShooterGameBridge.ts`) para crear, redimensionar y destruir la instancia. La escena vive en `scene.ts`; añadí cleanup para eventos, observers y canvas huérfanos.” |
| ¿Cómo evitaste que el resultado del juego dependiera solo del cliente? | “La liquidación pasó por `GameSettlementService.php` y un `BubbleShooterGameResultValidator.php`, con pruebas Feature y Unit para el registro de la sesión y la validación.” |
| ¿Cómo abordaste soporte táctil y estabilidad? | “Los commits de mayo incluyen ajustes de disparo táctil, prevención de disparos duplicados, cleanup y reconciliación visual. `scene.test.ts` contiene casos para touch y para listeners al destruir la escena.” |
| ¿Cómo estructuraste una funcionalidad full-stack? | “En recompensas y configuración de juegos separé Actions/Queries, Controllers, Requests, Models, rutas, migraciones, composables, páginas Vue y pruebas. Eso es visible en `09d5cbe1` y `14196c00`.” |
| ¿Cómo implementaste exportación de datos? | “Extendí la consulta y el controlador de movimientos administrativos, expuse la ruta y conecté el composable/página, con una prueba específica `AdminExportPointMovementsCsvTest.php` en `e312a18e`.” |
| ¿Qué hiciste para calidad? | “Incluí pruebas Feature, Unit y de escena, y documenté/atendí bloqueantes QA. Por ejemplo, el historial muestra `fix(bubble-shooter): corregir bloqueantes QA del reconciler` (`90bb8ce7`).” |

## Evidencia técnica

| Afirmación | Commit / PR local | Archivos que la respaldan |
|---|---|---|
| Canje de recompensas completo | `09d5cbe1` / #7 | `RedeemReward.php`, `RedeemRewardApiController.php`, `RewardDetailView.vue`, migración `create_user_rewards_table` |
| Dashboard de administración | `23746e37` / #24 | `GetAdminDashboardDataQuery.php`, `DashboardApiController.php`, `DashboardMetricCards.vue`, `AdminDashboardEndpointTest.php` |
| Exportación CSV de movimientos | `e312a18e` / #56 | `PointMovementsApiController.php`, `useAdminMovements.ts`, `AdminExportPointMovementsCsvTest.php` |
| Importación INEC y direcciones | `667853ea` / #84; `0a6b4a22` / #88 | `DistrictsAndNeighborhoodsSeeder.php`, `UpsertUserAddressAction.php`, `UserAddressApiTest.php` |
| Verificación de correo | `48bce6cf` / #99 | `VerifyEmailController.php`, `ResendVerificationEmailApiController.php`, `EmailVerificationTest.php` |
| Configuración por juego | `14196c00` / #104 | `UpdateGameConfigAction.php`, `GameConfig.php`, `Settings.vue`, `GameConfigApiTest.php` |
| Plataforma cliente de juegos | `215dab5c` / #110 | `GetClientGamePolicyQuery.php`, `GameShell.vue`, `useGameSession.ts`, `usePhaserGame.ts` |
| Dashboard de juegos | `7f037b67` / #123 | `GetGamesDashboardMetricsQuery.php`, `Dashboard.vue`, `GamesDashboardApiTest.php` |
| Bubble Shooter: registro y gameplay | `9b946671` / #134; #152 | `BubbleShooterGameModule.vue`, `scene.ts`, `SupportedClientGames.php`, `ClientGamesPageTest.php` |
| Bubble Shooter: scoring validado | `19f23a16`; #162 | `GameSettlementService.php`, `BubbleShooterGameResultValidator.php`, pruebas de sesiones y validador |
| Bubble Shooter: lifecycle/reconciliación | #169 (`0368f22b`), #173 (`11b1b3a1`) | `useGameCleanup.ts`, `BoardVisualReconciler.ts`, `scene.ts`, `scene.test.ts` |
| Rediseño de home | `e3a5f303`; #191 (`33c2bda0`) | `HomeHero.vue`, `QuickAccess.vue`, `ActivePromotion.vue`, `Index.vue` |

## Ranking de funcionalidades para portafolio

### Imprescindibles

1. **Bubble Shooter y plataforma de juegos.** Demuestra integración frontend interactiva, backend, validación, tests y manejo de lifecycle; concentra la evidencia técnica más profunda.
2. **Recompensas y movimientos administrativos.** Es un flujo de negocio completo con modelo de datos, API, interfaz, filtros y exportación CSV.

### Recomendadas

1. **Ubicaciones INEC y direcciones.** Muestra modelado relacional, seeders, validación y reutilización en flujos de usuario.
2. **Home y perfil de cliente.** Muestra calidad de producto y componentes frontend, pero conviene presentarlo junto con la evidencia funcional de perfil/dirección.
3. **Verificación de correo.** Expone manejo de autenticación y comunicación de estado en UI, aunque debe describirse sin atribuir requisitos de seguridad no visibles en el historial.

### Opcionales

1. **Ajustes de layout, Conócenos y catálogo.** Son buenos complementos visuales, pero tienen menos profundidad técnica demostrable que juegos, transacciones y datos.
2. **Commits de formateo/dependencias.** Útiles como señal de mantenimiento, no como caso principal.

## Conclusiones

La evidencia local respalda una contribución full-stack sostenida, concentrada en Vue/TypeScript y PHP modular, con pruebas y migraciones. El caso de mayor señal técnica es Bubble Shooter por su alcance vertical y por la posterior estabilización del ciclo de vida. El siguiente paso para completar las métricas de colaboración es exportar o consultar con permisos de GitHub los PRs, reviews, issues y comentarios; sin esos datos no es correcto atribuir sus conteos a una persona.
