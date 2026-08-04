export type TestimonialLink = {
  label: string;
  href: string;
};

export type TestimonialEntry = {
  id: string;
  name: string;
  position?: string;
  company: string;
  industry?: string;
  companyUrl?: string;
  links?: TestimonialLink[];
  logoSrc?: string;
  logoAlt?: string;
  homeQuote?: string;
  content: string;
  before: string;
  after: string;
  impact: string;
  result: string;
};

export const featuredHomeTestimonialIds = [
  'martina-papelera-pilar',
  'antonella-limpieza-blue',
  'julieta-dieteticas-naturales',
] as const;

export const testimonials: TestimonialEntry[] = [
  {
    id: 'martina-papelera-pilar',
    name: 'Martina',
    position: 'Cajera y Atención al Cliente',
    company: 'Papelera Pilar Manualidades',
    companyUrl: 'https://www.papelerapilarmanualidades.com.ar/',
    logoSrc: '/img/testimonials/papelera-pilar.webp',
    logoAlt: 'Logo de Papelera Pilar Manualidades',
    industry: 'Papelería retail',
    homeQuote:
      'Las ventas y los pagos se registran automáticamente. La atención en mostrador es mucho más ágil y los controles, más simples.',
    content:
      'Desde que empezamos a usar ZinkERP, las ventas y los pagos se registran automáticamente. Antes lo hacíamos todo manual y perdíamos mucho tiempo. Ahora es super práctico y ágil, tanto para nosotros como para los clientes.',
    before: 'Registros manuales y pérdida de tiempo',
    after: 'Ventas y pagos automatizados',
    impact: 'Mayor rapidez en atención',
    result: 'Mostrador más ágil',
  },
  {
    id: 'mariela-papelera-pilar',
    name: 'Mariela',
    position: 'Dueña',
    company: 'Papelera Pilar Manualidades',
    companyUrl: 'https://www.papelerapilarmanualidades.com.ar/',
    logoSrc: '/img/testimonials/papelera-pilar.webp',
    logoAlt: 'Logo de Papelera Pilar Manualidades',
    content:
      'Con ZinkERP logramos ordenar mejor la operación diaria del local y entender mucho más claro la situación general del negocio. Hoy tenemos ventas, pagos, stock y caja mucho más conectados, y eso nos da control para decidir con mejor información.',
    before: 'Operación apoyada en tareas manuales, seguimiento disperso y poca visibilidad general',
    after: 'Ventas, pagos, stock y caja centralizados en un solo sistema',
    impact: 'Más claridad financiera y más control para decidir',
    result: 'Dueña con visión del negocio',
  },
  {
    id: 'antonella-limpieza-blue',
    name: 'Antonella',
    position: 'Gerente',
    company: 'Limpieza Blue Gualeguaychu',
    companyUrl: 'https://www.instagram.com/limpiezablue_gchu/',
    logoSrc: '/img/testimonials/limpieza-blue.png',
    logoAlt: 'Logo de Limpieza Blue Gualeguaychu',
    industry: 'Artículos de limpieza',
    homeQuote:
      'Stock, finanzas, ventas, proveedores y clientes en un solo lugar. Cada movimiento queda registrado automáticamente.',
    content:
      'ZinkERP nos permitió tener todo en un solo lugar: stock, finanzas, ventas, proveedores y clientes. Lo mejor es que cada movimiento queda registrado automáticamente. Es ideal tanto para emprendedores nuevos como para negocios con experiencia.',
    before: 'Información dispersa en varios lugares',
    after: 'Todo centralizado y controlado',
    impact: 'Control total del negocio',
    result: 'Operación más ordenada',
  },
  {
    id: 'julieta-dieteticas-naturales',
    name: 'Julieta',
    position: 'Encargada',
    company: 'Dietéticas Naturales - Sucursal Tortuguitas',
    companyUrl: 'https://www.instagram.com/dieteticasnaturales_/?hl=es',
    logoSrc: '/img/testimonials/dieteticas-naturales.jpeg',
    logoAlt: 'Logo de Dietéticas Naturales',
    industry: 'Dietética · Multi-sucursal',
    homeQuote:
      'Manejamos 3 sucursales desde un solo lugar. Controlamos ventas, stock y caja en tiempo real, sin importar dónde estemos.',
    content:
      'Pasamos de tener todo disperso a manejar nuestras 3 sucursales desde un solo lugar. Ahora controlamos ventas, stock y caja en tiempo real, sin importar dónde estemos.',
    before: 'Sistemas separados para cada tarea',
    after: 'Todo integrado en una sola plataforma',
    impact: 'Control total entre sucursales',
    result: 'Gestión remota y centralizada',
  },
  {
    id: 'gustavo-dieteticas-naturales',
    name: 'Gustavo',
    position: 'Dueño',
    company: 'Dietéticas Naturales',
    companyUrl: 'https://www.instagram.com/dieteticasnaturales_/?hl=es',
    logoSrc: '/img/testimonials/dieteticas-naturales.jpeg',
    logoAlt: 'Logo de Dietéticas Naturales',
    content:
      'Pasamos de tener todo disperso a manejar nuestras 3 sucursales desde un solo lugar. Hoy controlamos ventas, stock y caja en tiempo real, y además tenemos una visión mucho más clara de la situación general del negocio para tomar decisiones.',
    before: 'Datos dispersos, gestión presencial y poca visibilidad entre sucursales',
    after: 'Operación centralizada con control remoto y mejor lectura del negocio',
    impact: 'Más visibilidad financiera y más criterio para crecer con orden',
    result: 'Dueño con control total',
  },
  {
    id: 'juan-marota',
    name: 'Juan',
    position: 'Kiosco LO DEL MAROTA',
    company: 'Lo de Marota - 2 sucursales',
    companyUrl: 'https://www.instagram.com/marotas.sr/',
    logoSrc: '/img/testimonials/marota.jpeg',
    logoAlt: 'Logo de Lo de Marota',
    content:
      'Antes trabajábamos con 3 apps distintas y no teníamos una forma real de manejar las dos sucursales desde un mismo lugar. Con ZinkERP, la gestión de precios y la operación diaria dejaron de ser inmantenibles.',
    before: 'Precios y operación repartidos en 3 apps sin control multi-sucursal',
    after: 'Gestión centralizada para las 2 sucursales en un solo sistema',
    impact: 'Menos fricción operativa y más control diario',
    result: 'Multi-sucursal manejable',
  },
  {
    id: 'juan-ostuni-marotas',
    name: 'Juan Ostuni',
    position: 'Dueño',
    company: 'Marotas',
    companyUrl: 'https://www.instagram.com/marotas.sr/',
    logoSrc: '/img/testimonials/marota.jpeg',
    logoAlt: 'Logo de Marotas',
    content:
      'El acompañamiento de ZinkERP fue espectacular. Apostar por un equipo cercano, que entiende lo que necesitamos, fue la decisión correcta.',
    before: 'Buscando un sistema y un equipo que acompañe de verdad',
    after: 'Acompañamiento cercano de un equipo que entiende el negocio',
    impact: 'Más confianza para decidir e implementar',
    result: 'La decisión correcta',
  },
  {
    id: 'miguel-alberto-quimica',
    name: 'Miguel y Alberto',
    position: 'Dueños',
    company: 'Química Tortuguitas y El Cruce',
    links: [
      {
        label: 'Tortuguitas',
        href: 'http://www.quimicatortuguitas.com.ar/',
      },
      {
        label: 'El Cruce',
        href: 'http://quimicaelcruce.com.ar/',
      },
    ],
    logoSrc: '/img/testimonials/quimica-el-cruce.png',
    logoAlt: 'Logo de Química Tortuguitas y El Cruce',
    content:
      'Antes no estaba todo integrado y manejar varias sucursales implicaba demasiados pasos sueltos. Ahora pueden controlar stock, compras, caja y operación desde un solo lugar, con una visión más completa del negocio y una base mucho más preparada para sumar una nueva sucursal.',
    before: 'Información, stock y compras repartidos sin integración real entre sucursales',
    after: 'Operación centralizada para todas las sucursales desde un mismo sistema',
    impact: 'Más control multi-sucursal, más visibilidad general y mejor base para crecer',
    result: 'Escala con orden',
  },
];

export const testimonialsById = Object.fromEntries(
  testimonials.map((testimonial) => [testimonial.id, testimonial]),
) as Record<string, TestimonialEntry>;

export function getTestimonialsByIds(ids: string[]) {
  return ids
    .map((id) => testimonialsById[id])
    .filter((testimonial): testimonial is TestimonialEntry => Boolean(testimonial));
}

export function getFeaturedHomeTestimonials() {
  return getTestimonialsByIds([...featuredHomeTestimonialIds]);
}
