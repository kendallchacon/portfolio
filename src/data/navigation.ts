// Ítems de la navegación principal. Única fuente de verdad para el orden, las
// etiquetas, las rutas y los iconos; el componente Navbar los consume tipados.
export interface NavItem {
  label: string;
  href: string;
  /** Nombre de icono Iconify (set heroicons). Usado en el menú móvil. */
  icon?: string;
}

export const navigationItems: NavItem[] = [
  { label: "Inicio", href: "/", icon: "heroicons:home" },
  { label: "Experiencia", href: "/experiencia", icon: "heroicons:briefcase" },
  { label: "Proyectos", href: "/proyectos", icon: "heroicons:rectangle-stack" },
  {
    label: "Certificaciones",
    href: "/certificaciones",
    icon: "heroicons:academic-cap",
  },
  { label: "Contacto", href: "/contacto", icon: "heroicons:envelope" },
];
