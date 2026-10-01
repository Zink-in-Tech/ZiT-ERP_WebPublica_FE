export const SYSTEL_DOCS = {
  hub: 'https://docs.zinkerp.com/rubros/zinkerp-para-locales-con-balanza/',
  productos: 'https://docs.zinkerp.com/administracion/productos/',
  codigosVariables: 'https://docs.zinkerp.com/guias/codigos-variables/',
  balanzasSystel: 'https://docs.zinkerp.com/guias/balanzas-systel-y-codigos-variables/',
  problemasCodigos: 'https://docs.zinkerp.com/guias/problemas-frecuentes-codigos-variables/',
  pos: 'https://docs.zinkerp.com/ventas/pos/',
  preferencias: 'https://docs.zinkerp.com/configuracion/preferencias/',
  arca: 'https://docs.zinkerp.com/integraciones/arca/',
  inventario: 'https://docs.zinkerp.com/inventario/',
  caja: 'https://docs.zinkerp.com/finanzas/caja-diaria/',
  informes: 'https://docs.zinkerp.com/informes/',
} as const;

export const systelLanding = {
  slug: 'balanza-systel',
  path: '/funcionalidades/balanza-systel',
  title: 'Escaneá el ticket de la balanza y vendé | ZinkERP',
  metaDescription:
    'Escaneá el ticket de tu balanza Systel en el POS de ZinkERP y vendé por peso sin cargar datos a mano.',
  eyebrow: 'Balanza Systel + POS',
  heroTitle: 'Escaneá el ticket de la balanza y vendé',
  heroSubtitle:
    'La Systel ya imprimió producto e importe. En caja se lee y se cobra, sin tipear de nuevo.',
  valueProposition:
    'Para dietéticas, almacenes y comercios que ya pesan en Systel.',
  disclaimer:
    'Pensado para balanzas Systel que imprimen ticket. Si no estás seguro del modelo, escribinos y lo vemos juntos.',
  centralMessage: 'El ticket de la balanza, aprovechado en caja.',
  checklistTitle: 'Sacale más a la balanza que ya tenés',
  checklistLead:
    'El ticket ya sale impreso. El cajero deja de reescribir peso e importe, y la venta sigue en ZinkERP.',
  whatsappMessage:
    'Hola, tengo una balanza Systel con impresión de ticket y quiero consultar si puedo usarla con ZinkERP.',
  demoHref: '/agendar-demo',
  docsHref: SYSTEL_DOCS.hub,
} as const;

export const systelProblems = {
  before: [
    'El cajero vuelve a tipear el peso o el importe.',
    'Una carga mal hecha se cobra mal.',
    'El ticket de la balanza no entra a la venta.',
    'La fila de caja se traba en cada pesada.',
    'Pesaje, venta y stock no cierran juntos.',
  ],
  after: [
    'El cajero lee el ticket y sigue.',
    'Producto e importe salen de la pesada, no de la memoria.',
    'Menos pasos entre la balanza y el cobro.',
    'La caja atiende más rápido los productos por peso.',
    'La venta queda en ZinkERP: cobro, stock e informes.',
  ],
} as const;

export const systelSteps = [
  {
    title: 'Creá el producto',
    text: 'Con código de barras variable, el mismo que en la balanza.',
  },
  {
    title: 'Pesá e imprimí',
    text: 'Pesá el producto e imprimí la etiqueta.',
  },
  {
    title: 'Escaneá y cobrá',
    text: 'Escaneá la etiqueta y cobrá el monto impreso.',
  },
] as const;

export const systelAudiences = [
  { title: 'Dietéticas', text: 'Venta de mostrador con productos por kilo o a granel.' },
  { title: 'Almacenes', text: 'Mostrador mixto: góndola y mercadería pesada.' },
  { title: 'Autoservicios', text: 'Caja que necesita leer el ticket sin reescribir datos.' },
  { title: 'Comercios de alimentos', text: 'Locales que fraccionan y venden por peso.' },
  { title: 'Locales que venden por peso', text: 'Kilo, gramo o litro etiquetados en balanza.' },
  { title: 'Negocios con Systel y ticket', text: 'Ya usan una balanza Systel con impresión de ticket.' },
] as const;

export const systelChecklist = [
  {
    group: 'have',
    title: 'Ya está en tu local',
    text: 'Si esto te suena, la balanza ya hizo la parte cara.',
    items: [
      'Una Systel que imprime ticket.',
      'Productos que se venden por peso.',
      'Un cajero que hoy reescribe lo que la balanza ya calculó.',
    ],
  },
  {
    group: 'gain',
    title: 'Pasás a esto',
    text: 'El beneficio en caja, no el manual de implementación.',
    items: [
      'El ticket se lee y aparecen producto e importe.',
      'El cajero confirma y cobra, sin tipear de nuevo.',
      'La factura sigue si ARCA ya está configurado.',
    ],
  },
] as const;

export const systelRelatedDocs = [
  { name: 'Productos', href: SYSTEL_DOCS.productos },
  { name: 'Códigos variables', href: SYSTEL_DOCS.codigosVariables },
  { name: 'Balanzas Systel', href: SYSTEL_DOCS.balanzasSystel },
  { name: 'POS', href: SYSTEL_DOCS.pos },
  { name: 'Configuración → Preferencias', href: SYSTEL_DOCS.preferencias },
  { name: 'Facturación ARCA', href: SYSTEL_DOCS.arca },
  { name: 'Stock', href: SYSTEL_DOCS.inventario },
  { name: 'Caja', href: SYSTEL_DOCS.caja },
  { name: 'Informes', href: SYSTEL_DOCS.informes },
  { name: 'Problemas frecuentes', href: SYSTEL_DOCS.problemasCodigos },
  { name: 'Guía del circuito completo', href: SYSTEL_DOCS.hub },
] as const;

export const systelInternalLinks = [
  { name: 'Ventas y POS', href: '/producto/ventas-y-pos' },
  { name: 'Facturación', href: '/producto/facturacion' },
  { name: 'Inventario', href: '/producto/inventario' },
  { name: 'Integración ARCA', href: '/integraciones/arca' },
  { name: 'Caso: dietéticas', href: '/casos-de-uso/dieteticas' },
] as const;
