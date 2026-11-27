import type { TechId } from "./tech";
import { both, type CodeSnippet, type HttpsUrl, type Localized, type MediaRef, type RepoRef } from "./types";

/** Cifra con contador animado. `decimals` y `suffix` solo afectan cómo se muestra. */
export type Metric = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: Localized;
};

/**
 * Video corto de demo: `preload="none"`, con poster. Archivos en `src/assets/projects/`
 * (el build no depende de `docs/`).
 */
export type VideoRef = { file: string; poster: MediaRef; alt: Localized };

export type PipelineStep = { id: string; detail: string };

/** Escena de la tarjeta de proyecto (unión discriminada por `type`). Es decorativa. */
export type Scene =
  | {
      type: "phones";
      /** Tres celulares en abanico; el video va al centro. */
      left: MediaRef;
      center: VideoRef;
      right: MediaRef;
    }
  | {
      type: "browsers";
      /** Dos ventanas de navegador superpuestas: la de atrás y la de adelante. */
      windows: readonly [BrowserWindow, BrowserWindow];
    }
  | {
      type: "code";
      /** Extracto literal y contiguo de un repo público. */
      snippet: CodeSnippet;
      /** Enlace fijado a un commit, con el rango de líneas del extracto. */
      permalink: HttpsUrl;
      /** Rango de líneas tal como se muestra (p. ej. "L74–93"). */
      range: string;
      /** Fila de capas bajo el código, de arriba hacia abajo. */
      layers: readonly string[];
    }
  | {
      type: "pipeline";
      /** Archivo del workflow, que va en la barra de la ventana. */
      workflow: string;
      /** Comandos y nombre de la corrida, tal como se muestran. */
      trigger: string;
      run: string;
      steps: readonly PipelineStep[];
      /** Imagen publicada al final del job. */
      published: string;
      /** El workflow no despliega: `kubectl apply` es un paso manual. */
      deploy: { command: string; note: Localized; manual: true };
      /** Pods según los manifiestos; los sufijos de hash los genera Kubernetes (ilustrativos). */
      pods: readonly { name: string; ready: string }[];
    };

export type BrowserWindow = { url: string; shot: MediaRef };

/** Repositorio con su detalle. Los privados no llevan `url` (lo impone `RepoRef`). */
export type ProjectRepo = { repo: RepoRef; detail?: Localized };

/** Sitio público. La etiqueta es neutral: nombra el sitio, no afirma autoría. */
export type ProjectLink = { label: Localized; href: HttpsUrl };

/** Documento del repo (ADR) mostrado como etiqueta; sin enlace mientras no haya destino público. */
export type ProjectDoc = { label: Localized };

/** Chip flotante de la escena. */
export type Highlight = { icon: "live" | "commits" | "trophy"; label: Localized };

export type Project = {
  slug: string;
  name: string;
  summary: Localized;
  /** Qué hizo Kendall. */
  myPart?: Localized;
  /** Versión corta de `myPart` para la tarjeta de la portada; sin ella se usa `myPart`. La cabecera del caso usa siempre el largo. */
  myPartShort?: Localized;
  /** Qué contiene el proyecto, cuando no hay "mi parte" (Lab). */
  contents?: Localized;
  /** `size` solo cuando es un dato confirmado. */
  team?: { size?: number; label: Localized };
  /** Commits de Kendall con su contexto real (uno de N contribuyentes). */
  commits?: Localized;
  status?: Localized;
  /** Stack del proyecto (no son habilidades propias por sí solas). */
  tech: readonly TechId[];
  metrics: readonly Metric[];
  repos: readonly ProjectRepo[];
  /** Enlaces públicos (sitio en producción). Los repos públicos van en `repos`. */
  links: readonly ProjectLink[];
  docs?: readonly ProjectDoc[];
  /** Máximo 2. En móvil (≤560 px) solo se ve el primero. */
  highlights?: readonly Highlight[];
  scene: Scene;
};

const matchgoBackend: RepoRef = { name: "matchgo-backend", visibility: "private" };
const matchgoMobile: RepoRef = { name: "matchgo-mobile", visibility: "private" };
const cimaMobile: RepoRef = {
  name: "cima-mobile",
  visibility: "public",
  url: "https://github.com/DevTeam-DAKFC/cima-mobile",
};

export const projects = [
  {
    slug: "matchgo",
    name: "MatchGo",
    summary: {
      es: "Plataforma multi-deporte para reservar canchas, retar equipos y organizar partidos.",
      en: "Multi-sport platform to book courts, challenge teams and organize matches.",
    },
    // Contribución verificada (iteración 6): arranque de matchgo-backend (arquitectura base,
    // Docker Compose, ADR 0001–0003 en el commit de arranque), CI inicial (PR #1), auth (PR #24),
    // invitaciones y equipos (PR #29), moderación (PR #46), roles y permisos (PR #55, #79),
    // auth servicio a servicio (PR #80), directorio de miembros (PR #89); en matchgo-mobile,
    // base Flutter, lib/features/booking/ y dio_failure_mapper. No son de Kendall: restricción
    // GiST/esquema de Booking, reservas/disponibilidad/409, mensajería, S3, ADR 0010 ni el
    // modelo de emparejamiento (XGBoost/ONNX, ADR 0009): confirmación del autor, 23 nov 2026.
    // Que Kendall lo «propuso» no tiene evidencia verificable en los repos: no se escribe.
    // VERIFICAR: «revisé el modelo de datos de los 4 servicios» sigue sin confirmar.
    myPart: {
      es: "Arranqué el backend .NET (arquitectura base, Docker Compose, ADR y CI inicial) y desarrollé autenticación, equipos, moderación y permisos; en la app Flutter, la base y el módulo de reservas.",
      en: "Bootstrapped the .NET backend (base architecture, Docker Compose, ADRs and initial CI) and built authentication, teams, moderation and permissions; in the Flutter app, the foundation and the booking module.",
    },
    team: {
      label: {
        es: "Proyecto final · 3 repositorios: backend, móvil y web",
        en: "Capstone · 3 repositories: backend, mobile and web",
      },
    },
    // Fuente de las cifras: about.ts (gh api, rama dev, 23 nov 2026).
    commits: {
      es: "móvil: 170 (65 %) · backend: 13, uno de 4 contribuyentes",
      en: "mobile: 170 (65%) · backend: 13, one of 4 contributors",
    },
    status: {
      es: "Demo funcional con Docker Compose",
      en: "Working demo with Docker Compose",
    },
    tech: [
      "dotnet",
      "yarp",
      "postgresql",
      "postgis",
      "rabbitmq",
      "masstransit",
      "jwt",
      "flutter",
      "riverpod",
      "nextjs",
      "docker",
    ],
    metrics: [
      { value: 170, label: { es: "commits en matchgo-mobile", en: "commits in matchgo-mobile" } },
      { value: 19, label: { es: "PRs integrados", en: "merged PRs" } },
      { value: 65, suffix: "%", label: { es: "de los commits", en: "of commits" } },
    ],
    // Repos privados: sin url.
    repos: [
      { repo: matchgoBackend, detail: both("Identity · Competition · Community") },
      { repo: matchgoMobile, detail: both("19 PRs") },
    ],
    links: [],
    // ADR 0003 está en el commit de arranque de Kendall («chore: bootstrap backend architecture»).
    // Sin enlace hasta que exista #criterio (iteración 7). ADR 0010 no es de Kendall: no va.
    docs: [{ label: { es: "ADR 0003 · base por servicio", en: "ADR 0003 · database per service" } }],
    highlights: [
      { icon: "live", label: { es: "4 servicios · Docker Compose", en: "4 services · Docker Compose" } },
      { icon: "commits", label: both("170 commits · 19 PRs") },
    ],
    scene: {
      type: "phones",
      // Capturas 01 y 06 aprobadas por el autor (iteración 6). Copias en src/assets/services/.
      left: { file: "01.jpg", alt: both(""), width: 720, height: 1560 },
      // M3 re-codificado a ~470 KB (mismo recorte 540×1170, 40 s, sin audio). Revisado: datos de
      // demo, el avatar es la foto de Kendall, sin correos ni rostros de terceros.
      center: {
        file: "M3.mp4",
        poster: { file: "M3p.jpg", alt: both(""), width: 540, height: 1170 },
        alt: { es: "Demo de la app", en: "App demo" },
      },
      right: { file: "06.jpg", alt: both(""), width: 720, height: 1560 },
    },
  },
  {
    slug: "beto-y-mas",
    name: "Beto y Más",
    summary: {
      es: "Plataforma de fidelización con juegos, recompensas y panel administrativo para un negocio real.",
      en: "Loyalty platform with games, rewards and an admin panel for a real business.",
    },
    // Texto de «Mi parte» del caso (6B.2), dado por el autor. Sin cifras de PR (no se conocen).
    myPart: {
      es: "Implementé de punta a punta el juego Bubble Shooter (escena Phaser, integración con Vue y TypeScript, validación y liquidación del puntaje en el backend) y el flujo de recompensas con movimientos administrativos; en el cliente, ubicaciones, verificación de correo y el rediseño de home, perfil y catálogo.",
      en: "I built the Bubble Shooter game end to end (Phaser scene, Vue and TypeScript integration, score validation and settlement on the backend) and the rewards flow with administrative movements; on the client, locations, email verification and the redesign of home, profile and catalog.",
    },
    myPartShort: {
      es: "Implementé de punta a punta Bubble Shooter (Phaser, Vue y backend) y el flujo de recompensas con sus movimientos administrativos.",
      en: "I implemented Bubble Shooter end to end (Phaser, Vue and backend) and the rewards flow with its admin movements.",
    },
    team: {
      size: 5,
      label: { es: "5 personas · 3 semestres", en: "5 people · 3 semesters" },
    },
    // Fuente: about.ts (auditoría forense del repositorio, iteración 5B).
    commits: { es: "150 en un equipo de 5", en: "150 in a team of 5" },
    status: {
      es: "En producción · 1.er lugar Infocontexto 2026",
      en: "In production · 1st place Infocontexto 2026",
    },
    tech: ["laravel", "php", "vue", "typescript", "inertia", "mysql", "phaser", "phpunit"],
    metrics: [],
    // Código privado del cliente: sin url y sin nombre de repositorio inventado.
    repos: [
      {
        repo: { name: "Beto y Más", visibility: "private" },
        detail: { es: "código privado del cliente", en: "client's private code" },
      },
    ],
    links: [{ label: both("betoymas.com"), href: "https://betoymas.com/" }],
    highlights: [
      { icon: "live", label: { es: "En producción", en: "In production" } },
      { icon: "trophy", label: { es: "1.er lugar Infocontexto", en: "1st place Infocontexto" } },
    ],
    scene: {
      type: "browsers",
      // Revisadas: la cuenta y el avatar son de Kendall; sin datos de terceros.
      windows: [
        {
          url: "betoymas.com/juegos",
          shot: {
            file: "beto-juegos.jpg",
            alt: { es: "Catálogo de juegos de Beto y Más", en: "Beto y Más game catalog" },
            width: 1400,
            height: 732,
          },
        },
        {
          url: "betoymas.com",
          shot: {
            file: "beto-inicio.jpg",
            alt: { es: "Dashboard del cliente de Beto y Más", en: "Beto y Más customer dashboard" },
            width: 1400,
            height: 729,
          },
        },
      ],
    },
  },
  {
    slug: "cima",
    name: "CIMA",
    summary: {
      es: "Finanzas personales para jóvenes en Costa Rica: movimientos, comparativos mensuales y reportes.",
      en: "Personal finance for young people in Costa Rica: movements, monthly comparisons and reports.",
    },
    myPart: {
      es: "Full stack: presupuestos, gastos, historial, comparativo y reportes (Android y .NET)",
      en: "Full stack: budgets, expenses, history, comparison and reports (Android and .NET)",
    },
    team: {
      label: {
        es: "DevTeam-DAKFC · Jira con 30 historias",
        en: "DevTeam-DAKFC · Jira with 30 stories",
      },
    },
    status: { es: "En mejora continua", en: "Ongoing improvements" },
    tech: ["kotlin", "jetpackCompose", "retrofit", "dotnet", "efcore", "jira"],
    metrics: [
      // Fuente: ver `cima.kpis` en experience.ts (rama dev, `git shortlog -sne --all`, 24 nov 2026).
      { value: 60, label: { es: "commits en cima-mobile", en: "commits in cima-mobile" } },
      { value: 49, label: { es: "commits en cima-backend", en: "commits in cima-backend" } },
    ],
    repos: [
      { repo: cimaMobile },
      {
        repo: {
          name: "cima-backend",
          visibility: "public",
          url: "https://github.com/DevTeam-DAKFC/cima-backend",
        },
      },
    ],
    links: [],
    scene: {
      type: "code",
      // Extracto literal de NetworkCallAdapter.kt, líneas 74–93, en el commit c3a41de (rama dev).
      // `git blame -w` (23 nov 2026): 19 de 20 líneas son de Kendall (95 %); la línea 91 es de
      // otro integrante. El archivo completo es compartido (6 autores).
      snippet: {
        kind: "kotlin",
        repo: cimaMobile,
        path: "core/network/NetworkCallAdapter.kt",
        lines: [
          "    } catch (exception: SocketTimeoutException) {",
          "        NetworkResult.NetworkError(",
          '            message = "La solicitud tardó demasiado. Intenta nuevamente.",',
          "            cause = exception,",
          "        )",
          "    } catch (exception: IOException) {",
          "        NetworkResult.NetworkError(",
          "            message = exception.message.toFriendlyNetworkMessage(),",
          "            cause = exception,",
          "        )",
          "    } catch (exception: SSLException) {",
          "        NetworkResult.NetworkError(",
          '            message = "No se pudo conectar con el servidor.",',
          "            cause = exception,",
          "        )",
          "    } catch (exception: Exception) {",
          "        NetworkResult.UnknownError(",
          '            message = exception.message ?: "Ocurrió un error inesperado.",',
          "            cause = exception,",
          "        )",
        ],
      },
      permalink:
        "https://github.com/DevTeam-DAKFC/cima-mobile/blob/c3a41de87896ad4ee1595406f2895af4a9928c9a/app/src/main/java/com/dakfc/cima/core/network/NetworkCallAdapter.kt#L74-L93",
      range: "L74–93",
      // Capas verificadas en el árbol de cima-mobile (rama dev): ui/, domain/usecase,
      // domain/repository, data/repository, data/remote.
      layers: ["Compose", "ViewModel", "UseCase", "Repository", "Retrofit"],
    },
  },
  {
    slug: "lab",
    name: "Lab",
    summary: {
      es: "Docker y Kubernetes en la práctica: una tienda de dos servicios que se publica sola como imágenes y se despliega con manifiestos.",
      en: "Docker and Kubernetes in practice: a two-service store that publishes itself as images and deploys with manifests.",
    },
    // El prototipo también menciona UnaRoom (Room + FCM): se omite hasta que Kendall lo confirme.
    contents: {
      es: "Compose para desarrollo, GitHub Actions que publica en GHCR y manifiestos con readiness y liveness.",
      en: "Compose for development, GitHub Actions publishing to GHCR and manifests with readiness and liveness.",
    },
    // Fuente: about.ts (gh api, rama main, 23 nov 2026).
    commits: { es: "4 · único contribuyente", en: "4 · sole contributor" },
    tech: ["docker", "kubernetes", "githubActions", "ghcr"],
    metrics: [],
    repos: [
      {
        repo: {
          name: "docker-kubernetes-lab",
          visibility: "public",
          url: "https://github.com/kendallchacon/docker-kubernetes-lab",
        },
      },
      {
        repo: {
          name: "docker-kubernetes-presentation",
          visibility: "public",
          url: "https://github.com/kendallchacon/docker-kubernetes-presentation",
        },
      },
    ],
    links: [
      {
        label: { es: "Presentación del lab", en: "Lab presentation" },
        href: "https://docker-kubernetes-presentation.vercel.app/",
      },
    ],
    // Verificado contra .github/workflows/publish-images.yml y kubernetes/*-deployment.yaml
    // (rama main, 23 nov 2026).
    scene: {
      type: "pipeline",
      workflow: ".github/workflows/publish-images.yml",
      trigger: "git push origin main",
      run: "Publish container images · matrix: frontend, orders-service",
      steps: [
        { id: "checkout", detail: "actions/checkout@v4" },
        { id: "buildx", detail: "docker/setup-buildx-action@v3" },
        { id: "login", detail: "ghcr.io · GITHUB_TOKEN" },
        { id: "tags", detail: "latest · sha-{commit}" },
        { id: "push", detail: "frontend · orders-service" },
      ],
      published: "ghcr.io/kendallchacon/docker-kubernetes-lab-orders-service:latest",
      deploy: {
        command: "kubectl apply -f kubernetes/",
        note: {
          es: "readiness y liveness en /health",
          en: "readiness and liveness on /health",
        },
        manual: true,
      },
      // Deployments `frontend` y `orders-service`, `replicas: 1` cada uno.
      pods: [
        { name: "frontend-7c9d8b-x2kq", ready: "1/1" },
        { name: "orders-service-5f6b9-m4tz", ready: "1/1" },
      ],
    },
  },
] as const satisfies readonly Project[];

/** Slugs de proyecto, derivados de los datos. */
export type ProjectSlug = (typeof projects)[number]["slug"];
