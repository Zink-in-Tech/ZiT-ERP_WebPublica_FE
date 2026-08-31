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
  title: 'Balanza Systel con ticket y POS | ZinkERP',
  metaDescription:
    'Procesá en ZinkERP los códigos variables impresos por tu balanza Systel y agiliza la venta de productos por peso desde el POS.',
  ogImageSrc: '/img/product-captures/pos-nuevo.png',
  ogImageAlt: 'Punto de venta de ZinkERP para leer el ticket de una balanza Systel',
  eyebrow: 'Balanza Systel + POS',
  heroTitle: 'Vendé productos pesados con balanza Systel sin cargar datos a mano',
  heroSubtitle:
    'La balanza Systel imprime el ticket, el cajero lee el código variable en ZinkERP y la venta continúa desde el POS.',
  valueProposition:
    'Vendé productos pesados con una balanza Systel con impresión de ticket y procesá el código variable desde el POS de ZinkERP, sin volver a cargar manualmente toda la información.',
  centralMessage: 'Del pesaje al ticket, del ticket al POS.',
  whatsappMessage:
    'Hola, tengo una balanza Systel con impresión de ticket y quiero consultar si puedo usarla con ZinkERP.',
  demoHref: '/agendar-demo',
  docsHref: SYSTEL_DOCS.hub,
} as const;

export const systelHeroFlow = [
  { title: 'Producto pesado' },
  { title: 'Balanza Systel' },
  { title: 'Ticket impreso' },
  { title: 'Código variable' },
  { title: 'POS ZinkERP' },
  { title: 'Venta y facturación' },
] as const;

export const systelProblems = {
  before: [
    'El cajero debe cargar manualmente el peso o el importe.',
    'Se producen errores de lectura o carga.',
    'El ticket de la balanza no se aprovecha en la venta.',
    'La operación en caja se vuelve lenta.',
    'Se dificulta mantener consistencia entre pesaje, venta y stock.',
  ],
  after: [
    'La balanza imprime el ticket.',
    'El ticket contiene el código variable.',
    'El cajero lo lee desde el POS.',
    'La venta continúa con la información interpretada.',
    'Se reducen pasos y carga manual.',
  ],
} as const;

export const systelSteps = [
  {
    title: 'Configurá el producto',
    phase: 'Configuración',
    text: 'En Administración → Productos definí el artículo, la unidad de medida, impuestos, stock y la lista por defecto. Activá Cód. variable y cargá el PLU de 6 dígitos, el mismo que usa la Systel. No guardes el EAN-13 completo del ticket.',
    href: SYSTEL_DOCS.productos,
    linkLabel: 'Guía de productos',
  },
  {
    title: 'Configurá la estructura del código',
    phase: 'Configuración',
    text: 'ZinkERP interpreta el ticket como [PLU 6 dígitos][valor 6 dígitos][verificador]. El valor central se lee como importe, no como peso. En Preferencias, Decimales del Código Variable debe coincidir con la impresión de esa Systel.',
    href: SYSTEL_DOCS.codigosVariables,
    linkLabel: 'Guía de códigos variables',
  },
  {
    title: 'Pesá el producto',
    phase: 'Operación',
    text: 'Se pesa el producto en la balanza Systel. La balanza genera el ticket con el código variable de esa pesada. ZinkERP no imprime el ticket, no envía precios y no cambia la programación del equipo.',
    href: SYSTEL_DOCS.balanzasSystel,
    linkLabel: 'Guía de balanzas Systel',
  },
  {
    title: 'Escaneá el ticket en ZinkERP',
    phase: 'Operación',
    text: 'El cajero toma el ticket e ingresa o lee los 13 dígitos en POS. El sistema busca el producto por los primeros 6 dígitos e interpreta el importe. Conviene validar primero en Ventas: ahí el circuito está más completo.',
    href: SYSTEL_DOCS.pos,
    linkLabel: 'Guía del POS',
  },
  {
    title: 'Cobrá y facturá',
    phase: 'Operación',
    text: 'Agregá otros productos si corresponde, elegí el medio de pago y cobrá. El comprobante electrónico se emite si ARCA ya está configurado; la venta se registra igual aunque la facturación todavía no esté activa.',
    href: SYSTEL_DOCS.arca,
    linkLabel: 'Guía de facturación ARCA',
  },
  {
    title: 'Consultá la operación',
    phase: 'Control',
    text: 'La venta entregada descuenta stock según la cantidad de la línea. El cobro queda en caja. Ventas, stock, caja e informes permiten revisar lo registrado. El kilo del ticket no se convierte, por sí solo, en la cantidad del ERP.',
    href: SYSTEL_DOCS.informes,
    linkLabel: 'Guía de informes',
  },
] as const;

export const systelBenefits = [
  'Menos carga manual en caja: el cajero no vuelve a tipear peso e importe.',
  'Menos pasos entre el pesaje y la venta.',
  'Mejor aprovechamiento del ticket impreso por la Systel.',
  'Operación más ágil para productos pesables, cuando el código está alineado.',
  'Ayuda a reducir errores de carga manual.',
  'El flujo continúa en cobro y, si corresponde, facturación ARCA.',
  'La información queda centralizada en ZinkERP: venta, stock, caja e informes.',
  'Hay guías específicas para configurar el circuito y resolver errores de lectura.',
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
  { label: 'Tener una balanza Systel con impresión de ticket.', confirmed: true },
  { label: 'Contar con productos configurados (unidad, impuestos, lista por defecto).', confirmed: true },
  { label: 'Definir la estructura del código variable: Cód. variable y PLU de 6 dígitos.', confirmed: true },
  { label: 'Alinear Decimales del Código Variable en Preferencias con esa Systel.', confirmed: true },
  { label: 'Realizar una prueba de impresión con un ticket real de esa balanza.', confirmed: true },
  { label: 'Validar producto e importe en Ventas y después repetir la lectura en POS.', confirmed: true },
  { label: 'Confirmar el producto y el importe contra el ticket impreso.', confirmed: true },
  { label: 'Probar el cobro y, si ARCA está configurado, la facturación.', confirmed: true },
  { label: 'Capacitar al operador de caja en el recorrido de lectura y cobro.', confirmed: true },
] as const;

export const systelErrors = [
  {
    problem: 'El código no se reconoce',
    review: 'Cód. variable activo y PLU igual a los primeros 6 dígitos del ticket.',
    action: 'Revisar la ficha del producto y no guardar los 13 dígitos.',
    href: SYSTEL_DOCS.problemasCodigos,
  },
  {
    problem: 'El producto no aparece',
    review: 'Producto, código o estado del artículo.',
    action: 'Comparar el PLU del ticket con el código cargado en ZinkERP.',
    href: SYSTEL_DOCS.productos,
  },
  {
    problem: 'El importe no coincide',
    review: 'Decimales del Código Variable y programación de esa Systel.',
    action: 'Comparar el ticket con Preferencias y validar en Ventas.',
    href: SYSTEL_DOCS.preferencias,
  },
  {
    problem: 'La lectura falla en caja',
    review: 'Código impreso, lector o ingreso manual de los 13 dígitos.',
    action: 'Probar lectura o ingreso en POS y comparar con Ventas.',
    href: SYSTEL_DOCS.pos,
  },
  {
    problem: 'El flujo no continúa',
    review: 'Configuración del producto, permiso de cobro o ítems cargados.',
    action: 'Consultar la guía de POS y la de códigos variables.',
    href: SYSTEL_DOCS.pos,
  },
] as const;

export const systelRelatedDocs = [
  { name: 'Productos', href: SYSTEL_DOCS.productos },
  { name: 'Códigos variables', href: SYSTEL_DOCS.codigosVariables },
  { name: 'Balanzas Systel', href: SYSTEL_DOCS.balanzasSystel },
  { name: 'POS', href: SYSTEL_DOCS.pos },
  { name: 'Preferencias', href: SYSTEL_DOCS.preferencias },
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
