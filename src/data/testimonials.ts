export type TestimonialLink = {
  label: string;
  href: string;
};

export type TestimonialEntry = {
  id: string;
  name: string;
  position?: string;
  company: string;
  companyUrl?: string;
  links?: TestimonialLink[];
  logoSrc?: string;
  logoAlt?: string;
  content: string;
  before: string;
  after: string;
  impact: string;
  result: string;
};

export const testimonials: TestimonialEntry[] = [
  {
    id: 'martina-papelera-pilar',
    name: 'Martina',
    position: 'Cajera y Atención al Cliente',
    company: 'Papelera Pilar Manualidades',
    companyUrl: 'https://www.papelerapilarmanualidades.com.ar/',
    logoSrc: '/img/testimonials/papelera-pilar.webp',
    logoAlt: 'Logo de Papelera Pilar Manualidades',
    content:
      'Desde que empezamos a usar ZinkERP, las ventas y los pagos se registran automáticamente. Antes lo hacíamos todo manual y perdíamos mucho tiempo. Ahora es super práctico y ágil, tanto para nosotros como para los clientes.',
    before: 'Registros manuales y pérdida de tiempo',
    after: 'Ventas y pagos automatizados',
    impact: 'Mayor rapidez en atención',
    result: 'Mostrador más ágil',
  },
  {
    id: 'antonella-limpieza-blue',
    name: 'Antonella',
    position: 'Gerente',
    company: 'Limpieza Blue Gualeguaychu',
    companyUrl: 'https://www.instagram.com/limpiezablue_gchu/',
    logoSrc: '/img/testimonials/limpieza-blue.png',
    logoAlt: 'Logo de Limpieza Blue Gualeguaychu',
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
    content:
      'Pasamos de tener todo disperso a manejar nuestras 3 sucursales desde un solo lugar. Ahora controlamos ventas, stock y caja en tiempo real, sin importar dónde estemos.',
    before: 'Sistemas separados para cada tarea',
    after: 'Todo integrado en una sola plataforma',
    impact: 'Control total entre sucursales',
    result: 'Gestión remota y centralizada',
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
      'Antes no estaba todo integrado y manejar varias sucursales implicaba demasiados pasos sueltos. Ahora pueden controlar stock, compras y operación desde un solo lugar, con una base mucho más preparada para sumar una nueva sucursal.',
    before: 'Información, stock y compras repartidos sin integración real entre sucursales',
    after: 'Operación centralizada para todas las sucursales desde un mismo sistema',
    impact: 'Más control multi-sucursal y mejor base para crecer',
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
