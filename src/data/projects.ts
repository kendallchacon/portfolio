import type { TechId } from "./tech";
import { both, type CodeSnippet, type HttpsUrl, type Localized, type MediaRef, type RepoRef } from "./types";

/** Cifra con contador animado. `decimals` y `suffix` solo afectan cómo se muestra. */
export type Metric = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: Localized;
};

/** Video corto de demo: `preload="none"`, con poster. Rutas relativas a `docs/prototype/media/`. */
export type VideoRef = { file: string; poster: MediaRef; alt: Localized };

export type PipelineStep = { id: string; detail: string };

/** Escena de la tarjeta de proyecto (unión discriminada por `type`). */
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
      snippet: CodeSnippet;
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
      deploy: { command: string; note: Localized };
      pods: readonly { name: string; ready: string }[];
    };

export type BrowserWindow = { url: string; shot: MediaRef };

/** Repositorio con su detalle. Los privados no llevan `url` (lo impone `RepoRef`). */
export type ProjectRepo = { repo: RepoRef; detail?: Localized };

export type ProjectLink = { label: string; href: HttpsUrl };

export type Project = {
  slug: string;
  name: string;
  summary: Localized;
  /** Qué hizo Kendall. */
  myPart?: Localized;
  /** Qué contiene el proyecto, cuando no hay "mi parte" (Lab). */
  contents?: Localized;
  /** `size` solo cuando es un dato confirmado. */
  team?: { size?: number; label: Localized };
  status?: Localized;
  tech: readonly TechId[];
  metrics: readonly Metric[];
  repos: readonly ProjectRepo[];
  /** Enlaces públicos (sitio en producción). Los repos públicos van en `repos`. */
  links: readonly ProjectLink[];
  scene: Scene;
};

const matchgoMobile: RepoRef = { name: "matchgo-mobile", visibility: "private" };

export const projects = [
  {
    slug: "matchgo",
    name: "MatchGo",
    summary: {
      es: "Plataforma multi-deporte para reservar canchas, retar equipos y organizar partidos.",
      en: "Multi-sport platform to book courts, challenge teams and organize matches.",
    },
    // VERIFICAR: si se confirma, agregar «y revisé el modelo de datos de los 4 servicios» /
    // «and reviewed the data model of the 4 services». Toca matchgo-backend, cuya contribución
    // de Kendall no está confirmada (handoff §4 y §9); lo respaldado es matchgo-mobile.
    myPart: {
      es: "Desarrollé la app móvil en Flutter",
      en: "Developed the Flutter mobile app",
    },
    team: {
      label: {
        es: "Proyecto final · 3 repositorios: backend, móvil y web",
        en: "Capstone · 3 repositories: backend, mobile and web",
      },
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
    // Repositorio privado: sin url. Solo matchgo-mobile tiene respaldo de la contribución de Kendall.
    repos: [{ repo: matchgoMobile, detail: both("19 PRs") }],
    links: [],
    scene: {
      type: "phones",
      // VERIFICAR: las capturas 01 y 06 muestran avatares de terceros; no renderizar sin consentimiento.
      left: { file: "01.jpg", alt: both(""), width: 720, height: 1560 },
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
    myPart: {
      es: "Full stack: Bubble Shooter de punta a punta, recompensas, ubicaciones y perfiles",
      en: "Full stack: Bubble Shooter end to end, rewards, locations and profiles",
    },
    team: {
      size: 5,
      label: { es: "5 personas · 3 semestres", en: "5 people · 3 semesters" },
    },
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
    links: [{ label: "betoymas.com", href: "https://betoymas.com/" }],
    scene: {
      type: "browsers",
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
      es: "Cliente Android: historial, comparativo, reportes y notificaciones",
      en: "Android client: history, comparison, reports and notifications",
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
      { value: 52, label: { es: "commits en cima-mobile", en: "commits in cima-mobile" } },
      { value: 40, label: { es: "commits en cima-backend", en: "commits in cima-backend" } },
      // Jira CIMA: 30 historias en 6 épicas (handoff §4).
      { value: 30, label: { es: "historias en Jira", en: "stories in Jira" } },
      { value: 6, label: { es: "épicas", en: "epics" } },
    ],
    repos: [
      {
        repo: {
          name: "cima-mobile",
          visibility: "public",
          url: "https://github.com/DevTeam-DAKFC/cima-mobile",
        },
      },
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
      // VERIFICAR: el fragmento usa `parsedMessage`, que no se define en él; confirmar si es
      // literal de cima-mobile (repo público) o está recortado.
      snippet: {
        kind: "kotlin",
        repo: {
          name: "cima-mobile",
          visibility: "public",
          url: "https://github.com/DevTeam-DAKFC/cima-mobile",
        },
        path: "core/network/NetworkCallAdapter.kt",
        lines: [
          "suspend fun <T> safeApiCall(",
          "    apiCall: suspend () -> Response<T>,",
          "): NetworkResult<T> {",
          "    return try {",
          "        val response = apiCall()",
          "        val body = response.body()",
          "",
          "        if (response.isSuccessful && body != null) {",
          "            NetworkResult.Success(body)",
          "        } else when (response.code()) {",
          "            401 -> NetworkResult.Unauthorized()",
          "            409 -> NetworkResult.Conflict(message = parsedMessage)",
          "            else -> NetworkResult.UnknownError(code = response.code())",
          "        }",
          "    } catch (exception: SocketTimeoutException) {",
          "        NetworkResult.NetworkError(",
          '            message = "La solicitud tardó demasiado. Intenta nuevamente.",',
          "        )",
          "    }",
          "}",
        ],
      },
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
    links: [],
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
      },
      pods: [
        { name: "frontend-7c9d8b-x2kq", ready: "1/1" },
        { name: "orders-service-5f6b9-m4tz", ready: "1/1" },
        { name: "orders-service-5f6b9-p8wn", ready: "1/1" },
      ],
    },
  },
] as const satisfies readonly Project[];

/** Slugs de proyecto, derivados de los datos. */
export type ProjectSlug = (typeof projects)[number]["slug"];
