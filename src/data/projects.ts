export interface Project {
  nombre: string;
  tipo: string;
  estado: "completado" | "en-desarrollo" | "proximo";
  problema: string;
  aporte: string;
  stack: string[];
  evidencia: string;
  cta: { label: string; href: string; disabled: boolean };
  image?: string;
  imageAlt?: string;
}

export const projects: Project[] = [
  {
    nombre: "Beto y Más",
    tipo: "Plataforma web · Proyecto académico en equipo",
    estado: "completado",
    problema:
      "Plataforma de fidelización con juegos, recompensas y administración sin un sistema unificado de lógica de negocio.",
    aporte:
      "Implementación full stack end-to-end — Bubble Shooter, plataforma de juegos configurable, recompensas, ubicaciones, verificación de correo y rediseño de experiencia cliente.",
    stack: ["Laravel", "Vue", "TypeScript", "MySQL", "Inertia", "Git"],
    evidencia: "Código privado · 150 commits verificados en historial Git",
    cta: { label: "Ver experiencia completa", href: "/experiencia", disabled: false },
    image: "/images/project-preview.jpg",
    imageAlt: "Sistema Beto y Más",
  },
  {
    nombre: "Aplicación móvil",
    tipo: "Aplicación móvil · Proyecto académico",
    estado: "en-desarrollo",
    problema: "Descripción disponible próximamente.",
    aporte: "Desarrollo móvil con .NET MAUI y Kotlin.",
    stack: [".NET MAUI", "Kotlin", "REST APIs"],
    evidencia: "En desarrollo",
    cta: { label: "Próximamente", href: "#", disabled: true },
  },
  {
    nombre: "Proyecto personal",
    tipo: "Por definir",
    estado: "proximo",
    problema: "Proyecto personal en planificación.",
    aporte: "Por definir.",
    stack: [],
    evidencia: "",
    cta: { label: "En planificación", href: "#", disabled: true },
  },
];

export const featuredPreview = {
  eyebrow: "Proyecto destacado",
  nombre: "Beto y Más",
  subtitulo: "Plataforma web de fidelización, juegos y recompensas",
  descripcion:
    "Sistema full stack con módulos de juegos configurables, recompensas, roles y panel administrativo.",
  stack: [
    { label: "Laravel", icon: "simple-icons:laravel", color: "text-red-400" },
    { label: "Vue", icon: "simple-icons:vuedotjs", color: "text-green-400" },
    { label: "TypeScript", icon: "simple-icons:typescript", color: "text-blue-400" },
    { label: "MySQL", icon: "simple-icons:mysql", color: "text-blue-300" },
    { label: "Inertia", icon: "simple-icons:inertia", color: "text-purple-400" },
  ],
  metrica: "150 commits verificados · Código privado",
  metricas: [
    { valor: "150+", label: "Commits verificados" },
    { valor: "6", label: "Módulos implementados" },
    { valor: "Feb–Jun 2026", label: "Período" },
  ],
  image: "/images/beto-landing.jpg",
  imageAlt: "Vista previa de Beto y Más",
  cta: { label: "Ver caso de estudio completo →", href: "/proyectos" },
};

export const featuredProject = {
  eyebrow: "Proyecto principal",
  title: "Beto y Más - Sistema de fidelización y gamificación",
  summary:
    "Caso de estudio centrado en un sistema web para administrar clientes, puntos, recompensas y procesos internos desde una plataforma con backend en Laravel.",
  image: "/images/project-preview.jpg",
  imageAlt: "Sistema Beto y Más",
  stack: [
    { name: "Laravel", icon: "simple-icons:laravel", color: "text-red-500" },
    { name: "Vue", icon: "simple-icons:vuedotjs", color: "text-green-400" },
    { name: "MySQL", icon: "simple-icons:mysql", color: "text-blue-500" },
    {
      name: "Tailwind",
      icon: "simple-icons:tailwindcss",
      color: "text-cyan-400",
    },
  ],
  overview: {
    title: "Plataforma para fidelización, puntos y recompensas",
    description:
      "Sistema web orientado a negocios que necesitan registrar clientes, controlar puntos acumulados, gestionar recompensas y consultar información administrativa en un mismo flujo.",
  },
  caseStudy: [
    {
      title: "Problema",
      description:
        "El negocio necesitaba centralizar información de clientes, puntos y recompensas para evitar procesos dispersos y dar seguimiento a la fidelización desde un panel administrativo.",
    },
    {
      title: "Solución",
      description:
        "Construcción de una plataforma web con módulos para usuarios, roles, puntos, recompensas y reportes, conectando la lógica del backend con una interfaz administrativa en Vue.",
    },
    {
      title: "Rol",
      description:
        "Participé como desarrollador full stack, con mayor peso en backend: modelado de datos, reglas de negocio, validaciones, control de roles e integración con la interfaz.",
    },
    {
      title: "Resultado",
      description:
        "El sistema ordena la operación de fidelización en una plataforma única y deja una base técnica preparada para agregar nuevas reglas de puntos, recompensas y reportes.",
    },
  ],
  modules: [
    "Usuarios y roles administrativos",
    "Registro y seguimiento de clientes",
    "Asignación y consulta de puntos",
    "Gestión de recompensas",
    "Panel administrativo con reportes",
  ],
  technicalDecisions: [
    "Separación por módulos para aislar responsabilidades de usuarios, puntos y recompensas",
    "APIs REST para comunicar la lógica backend con la interfaz",
    "Validaciones backend para proteger reglas de negocio antes de guardar datos",
    "Control de roles para limitar acciones administrativas",
    "Relaciones en MySQL entre users, customers, points, rewards y redemptions",
  ],
  database:
    "La base de datos relacional contempla entidades como users, roles, customers, points, rewards y redemptions para representar usuarios, clientes, saldos, recompensas y canjes.",
  security: [
    "Autenticación de usuarios",
    "Autorización por roles",
    "Validaciones de entrada en backend",
    "Separación de permisos para acciones administrativas",
  ],
};
