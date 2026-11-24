/**
 * Registro de tecnologías: id → etiqueta, icono y color de marca.
 *
 * Iconos (`astro-icon`):
 * - `simple-icons:*`  monocromo. Es el ÚNICO caso que usa `brandColor`: el logo se pinta
 *                     de blanco sobre un cuadro redondeado con el color de marca.
 *                     EXCEPCIÓN a la regla de tokens (colores solo en `global.css`):
 *                     son colores de marca de terceros y no pertenecen al diseño.
 * - `devicon:*`       multicolor. Conserva sus propios colores; NO usa `brandColor`.
 * - `local:*`         multicolor, SVG oficial en `src/icons/<nombre>.svg`; NO usa `brandColor`.
 *                     astro-icon lo resuelve sin prefijo: usa `iconName()`.
 * - `heroicons:*`     respaldo genérico cuando el proyecto no publica un logo vectorial
 *                     oficial. NO usa `brandColor`.
 *
 * Multicolor (no usan brandColor): java, postgis, efcore (devicon) y riverpod, phaser,
 * phpunit (local).
 */

type Monochrome = {
  label: string;
  icon: `simple-icons:${string}`;
  brandColor: `#${string}`;
};

type Multicolor = {
  label: string;
  icon: `devicon:${string}` | `local:${string}`;
  brandColor?: never;
};

type Fallback = {
  label: string;
  icon: `heroicons:${string}`;
  brandColor?: never;
};

type TechEntry = Monochrome | Multicolor | Fallback;

export const tech = {
  // ── Monocromo (simple-icons + color de marca) ──
  dotnet: { label: ".NET", icon: "simple-icons:dotnet", brandColor: "#512BD4" },
  laravel: { label: "Laravel", icon: "simple-icons:laravel", brandColor: "#FF2D20" },
  vue: { label: "Vue 3", icon: "simple-icons:vuedotjs", brandColor: "#4FC08D" },
  typescript: { label: "TypeScript", icon: "simple-icons:typescript", brandColor: "#3178C6" },
  kotlin: { label: "Kotlin", icon: "simple-icons:kotlin", brandColor: "#7F52FF" },
  flutter: { label: "Flutter", icon: "simple-icons:flutter", brandColor: "#02569B" },
  postgresql: { label: "PostgreSQL", icon: "simple-icons:postgresql", brandColor: "#4169E1" },
  docker: { label: "Docker", icon: "simple-icons:docker", brandColor: "#2496ED" },
  // Almacenamiento de objetos con API S3. En MatchGo corre local sobre LocalStack (compose.yml del
  // backend); la etiqueta es corta para que la píldora quepa en las tarjetas del stack.
  s3: { label: "S3", icon: "simple-icons:amazons3", brandColor: "#569A31" },
  mysql: { label: "MySQL", icon: "simple-icons:mysql", brandColor: "#4479A1" },
  rabbitmq: { label: "RabbitMQ", icon: "simple-icons:rabbitmq", brandColor: "#FF6600" },
  inertia: { label: "Inertia", icon: "simple-icons:inertia", brandColor: "#9553E9" },
  javascript: { label: "JavaScript", icon: "simple-icons:javascript", brandColor: "#F7DF1E" },
  dart: { label: "Dart", icon: "simple-icons:dart", brandColor: "#0175C2" },
  jetpackCompose: {
    label: "Jetpack Compose",
    icon: "simple-icons:jetpackcompose",
    brandColor: "#4285F4",
  },
  kubernetes: { label: "Kubernetes", icon: "simple-icons:kubernetes", brandColor: "#326CE5" },
  githubActions: {
    label: "GitHub Actions",
    icon: "simple-icons:githubactions",
    brandColor: "#2088FF",
  },
  git: { label: "Git", icon: "simple-icons:git", brandColor: "#F05032" },
  jira: { label: "Jira", icon: "simple-icons:jira", brandColor: "#0052CC" },
  php: { label: "PHP", icon: "simple-icons:php", brandColor: "#777BB4" },
  symfonyValidator: {
    label: "Symfony Validator",
    icon: "simple-icons:symfony",
    brandColor: "#1A171B",
  },
  nextjs: { label: "Next.js", icon: "simple-icons:nextdotjs", brandColor: "#000000" },
  jwt: { label: "JWT", icon: "simple-icons:jsonwebtokens", brandColor: "#D63AFF" },
  fcm: { label: "FCM", icon: "simple-icons:firebase", brandColor: "#F5820D" },
  // Sin logo propio: usa el de su familia.
  yarp: { label: "YARP", icon: "simple-icons:dotnet", brandColor: "#512BD4" },
  ghcr: { label: "GHCR", icon: "simple-icons:github", brandColor: "#24292F" },
  android: { label: "Android", icon: "simple-icons:android", brandColor: "#3DDC84" },
  room: { label: "Room", icon: "simple-icons:android", brandColor: "#3DDC84" },

  // ── Multicolor (devicon) ──
  java: { label: "Java", icon: "devicon:java" },
  postgis: { label: "PostGIS", icon: "devicon:postgis" },
  efcore: { label: "EF Core", icon: "devicon:entityframeworkcore" },

  // ── Multicolor (SVG oficial local en src/icons/) ──
  riverpod: { label: "Riverpod", icon: "local:riverpod" },
  phaser: { label: "Phaser", icon: "local:phaser" },
  phpunit: { label: "PHPUnit", icon: "local:phpunit" },

  // ── Respaldo genérico ──
  masstransit: { label: "MassTransit", icon: "heroicons:queue-list" }, // SIN LOGO OFICIAL
  retrofit: { label: "Retrofit", icon: "heroicons:arrows-right-left" }, // SIN LOGO OFICIAL
} as const satisfies Record<string, TechEntry>;

export type TechId = keyof typeof tech;

export type TechIcon = (typeof tech)[TechId]["icon"];

/** Nombre que espera `<Icon name=…>`: los SVG locales se piden sin prefijo. */
export function iconName(icon: TechIcon): string {
  return icon.startsWith("local:") ? icon.slice("local:".length) : icon;
}
