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
