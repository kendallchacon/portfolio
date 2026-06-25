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

export interface MetricaItem {
  valor: string;
  label: string;
}

export interface ContribucionItem {
  titulo: string;
  descripcion: string;
}

export interface GaleriaItem {
  imagen: string;
  label: string;
}

export interface DecisionItem {
  titulo: string;
  descripcion: string;
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

export const betoYMas = {
  nombre: "Beto y Más",
  tipo: "Plataforma web · Proyecto académico en equipo",
  periodo: "Febrero 2026 — Junio 2026",
  descripcion:
    "Contribuí de forma full-stack a Beto y Más, una plataforma web con experiencia de cliente, administración, recompensas y juegos. Implementé el flujo de detalle y canje de recompensas, paneles y exportación CSV para movimientos, y la gestión de ubicaciones y direcciones basada en datos INEC. También construí flujos de verificación de correo, configuración por juego, políticas de acceso, sesiones y métricas administrativas. Mi contribución principal fue Bubble Shooter: registré el juego, desarrollé la escena interactiva con Phaser, conecté el módulo con Vue y TypeScript, implementé validación y liquidación de puntuaciones en backend, y mejoré la compatibilidad móvil, el cleanup del ciclo de vida y la reconciliación visual.",
  stack: [
    { label: "Laravel", icon: "simple-icons:laravel", color: "text-red-400" },
    { label: "Vue", icon: "simple-icons:vuedotjs", color: "text-green-400" },
    { label: "TypeScript", icon: "simple-icons:typescript", color: "text-blue-400" },
    { label: "MySQL", icon: "simple-icons:mysql", color: "text-blue-300" },
    { label: "Inertia", icon: "simple-icons:inertia", color: "text-purple-400" },
    { label: "Git", icon: "simple-icons:git", color: "text-orange-400" },
  ],
  problema:
    "Un negocio necesitaba centralizar información de clientes, puntos y recompensas para administrar procesos dispersos y dar seguimiento a la fidelización desde un panel administrativo.",
  solucion:
    "Plataforma web con módulos para usuarios, roles, puntos, recompensas y reportes, conectando la lógica del backend con una interfaz administrativa en Vue.",
  image: "/images/beto-landing.jpg",
  imageAlt: "Vista previa de Beto y Más",
  cta: { label: "Ver experiencia →", href: "/experiencia" },
  contribuciones: [
    {
      titulo: "Bubble Shooter end-to-end",
      descripcion:
        "Escena interactiva con Phaser integrada a Vue y TypeScript mediante un bridge. Validación y liquidación de puntuaciones en backend con GameSettlementService y BubbleShooterGameResultValidator.",
    },
    {
      titulo: "Plataforma de juegos configurable",
      descripcion:
        "Configuración por juego, políticas de acceso, sesiones, catálogo cliente y dashboard analítico administrativo con métricas, razones de cero puntos y seeder de demostración.",
    },
    {
      titulo: "Recompensas y movimientos administrativos",
      descripcion:
        "Flujo de detalle y canje de recompensas, historial de movimientos con filtros, detalle individual, exportación CSV y pruebas automatizadas Feature/Unit.",
    },
    {
      titulo: "Ubicaciones INEC y gestión de perfiles",
      descripcion:
        "Datos geográficos INEC con seeders, esquema distrito/barrio, alta y actualización de direcciones, verificación de correo OTP, registro con teléfono y perfil completo de cliente.",
    },
    {
      titulo: "Rediseño de home y catálogo",
      descripcion:
        "Componentes Vue reutilizables para hero, accesos rápidos, promociones activas, eventos y actividad reciente. Layout, catálogo de juegos responsive y refinamiento de Conócenos.",
    },
  ] satisfies ContribucionItem[],
  galeria: [
    {
      imagen: "/images/beto-landing.jpg",
      label: "Landing pública — propuesta de valor al usuario",
    },
    {
      imagen: "/images/beto-inicio.jpg",
      label: "Dashboard cliente — puntos, progreso y accesos rápidos",
    },
    {
      imagen: "/images/beto-juegos.jpg",
      label: "Catálogo de juegos — Bubble Shooter destacado",
    },
  ] satisfies GaleriaItem[],
  decisiones: [
    {
      titulo: "Integración Vue + Phaser",
      descripcion:
        "Bridge dedicado para crear, redimensionar y destruir la instancia Phaser sin acoplar la escena al componente Vue.",
    },
    {
      titulo: "Validación server-side del juego",
      descripcion:
        "GameSettlementService y BubbleShooterGameResultValidator en backend — el resultado no depende solo del cliente.",
    },
    {
      titulo: "Arquitectura modular Laravel",
      descripcion:
        "Actions, Queries, Controllers, Requests y Models separados por responsabilidad en app/Modules/*.",
    },
    {
      titulo: "Pruebas automatizadas",
      descripcion:
        "Feature, Unit y pruebas de escena en cada entrega clave. 88 toques en tests/ a lo largo del proyecto.",
    },
  ] satisfies DecisionItem[],
  notaPrivacidad:
    "El código fuente es privado. La evidencia de contribución proviene del historial Git local verificado por commit, archivo y líneas atribuidas a kendallchacon4@gmail.com.",
};

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
    { name: "Tailwind", icon: "simple-icons:tailwindcss", color: "text-cyan-400" },
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
